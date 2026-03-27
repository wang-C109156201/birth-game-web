import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import '../css/QuizUnit.css';

// 輔助函式：計算該單元總共有幾個格子
const getQuestionCount = (data) => {
  if (!data) return 5;
  if (data.type === 'category' || data.type === 'inline-category') {
    return data.categories.reduce((sum, cat) => sum + cat.slotCount, 0);
  }
  if (data.type === 'free') return data.slotCount || 5;
  return data.correctOrder?.length || 5;
};

const QuizUnit = ({ unitData }) => {
  const { id } = useParams();
  const unitId = `unit_${id}`;
  const currentUnitData = unitData[id - 1];

  const { progress, saveUnitProgress } = useApp();

  const unitType = currentUnitData?.type || 'exact';
  const questionCount = getQuestionCount(currentUnitData);

  const savedState = progress[unitId] || { slots: Array(questionCount).fill(null), submitted: false, score: 0 };

  const [slots, setSlots] = useState(savedState.slots);
  const [submitted, setSubmitted] = useState(savedState.submitted);
  const [unitScore, setUnitScore] = useState(savedState.score);
  const [draggingId, setDraggingId] = useState(null);

  useEffect(() => {
    if (!currentUnitData) return;
    const qCount = getQuestionCount(currentUnitData);
    const newState = progress[`unit_${id}`] || { slots: Array(qCount).fill(null), submitted: false, score: 0 };
    setSlots(newState.slots);
    setSubmitted(newState.submitted);
    setUnitScore(newState.score);
  }, [id, progress, currentUnitData]);

  if (!currentUnitData) return <div style={{ padding: '20px' }}>找不到此單元資料。</div>;

  const handleDragStart = (e, imgId, sourceIndex = null) => {
    // sourceIndex 如果是 null，代表從下方題庫拖出來；如果有數字，代表從某個格子拖出來
    e.dataTransfer.setData("application/json", JSON.stringify({ imgId, sourceIndex }));
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => setDraggingId(imgId), 0);
  };

  const handleDragEnd = () => setDraggingId(null);

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (submitted) return;
    
    try {
      // 解析傳遞過來的 JSON 資料
      const data = JSON.parse(e.dataTransfer.getData("application/json"));
      const { imgId, sourceIndex } = data;
      if (isNaN(imgId)) return;

      const newSlots = [...slots];

      if (sourceIndex !== null) {
        // 👉 情境 A：從「格子 A」拖到「格子 B」-> 互相交換 (Swap)
        const temp = newSlots[index]; // 記下目標格子原本的內容 (可能是圖片或 null)
        newSlots[index] = imgId;      // 目標格子放入新拖來的圖片
        newSlots[sourceIndex] = temp; // 原本的格子放入目標格子退下來的內容
      } else {
        // 👉 情境 B：從「下方題庫」拖進來 -> 直接覆蓋
        newSlots[index] = imgId;
      }
      
      setSlots(newSlots);
      saveUnitProgress(unitId, newSlots, false, 0); 
      setDraggingId(null); 
    } catch (err) {
      console.log("非預期的拖曳內容");
    }
  };

  const handleBankDrop = (e) => {
    e.preventDefault();
    if (submitted) return;
    try {
      const data = JSON.parse(e.dataTransfer.getData("application/json"));
      if (data.sourceIndex !== null) {
        const newSlots = [...slots];
        newSlots[data.sourceIndex] = null; // 清空原本的格子
        setSlots(newSlots);
        saveUnitProgress(unitId, newSlots, false, 0);
      }
      setDraggingId(null);
    } catch (err) {}
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrag = (e) => {
    if (e.clientY === 0) return;
    const edgeSize = 80;
    const scrollSpeed = 10;
    if (e.clientY < edgeSize) window.scrollBy(0, -scrollSpeed);
    else if (window.innerHeight - e.clientY < edgeSize) window.scrollBy(0, scrollSpeed);
  };

  // 👉 重寫的提交邏輯：支援三種模式的給分方式
  const handleSubmit = () => {
    if (slots.includes(null)) {
      alert("請將所有圖片拖曳到框框內再提交喔！");
      return;
    }

    let score = 0;
    slots.forEach((slotImgId, index) => {
      if (unitType === 'category' || unitType === 'inline-category') {
        let passedSlots = 0;
        let currentCat = null;
        const categories = currentUnitData.categories || []; // 防呆
        
        for (let cat of categories) {
          const count = cat.slotCount || 1; // 防呆：如果沒寫 slotCount 就當作 1
          if (index < passedSlots + count) { currentCat = cat; break; }
          passedSlots += count;
        }
        // 防呆：確認 currentCat 存在且 acceptIds 有包含該圖片
        if (currentCat && currentCat.acceptIds?.includes(slotImgId)) score += 1;
      } 
      else if (unitType === 'free') {
        score += 1;
      } 
      else {
        if (slotImgId === currentUnitData.correctOrder[index]) score += 1;
      }
    });
    
    setUnitScore(score);
    setSubmitted(true);
    saveUnitProgress(unitId, slots, true, score); 
  };

  // 👉 格子渲染器
  const renderSlot = (index) => {
    const slotImgId = slots[index];
    let statusClass = "slot-empty";
    if (slotImgId) statusClass = "slot-filled";
    
    let currentCat = null; 

    if (unitType === 'category' || unitType === 'inline-category') {
      let passedSlots = 0;
      const categories = currentUnitData.categories || []; // 防呆
      
      for (let cat of categories) {
        const count = cat.slotCount || 1; // 防呆：如果沒寫 slotCount 就當作 1
        if (index < passedSlots + count) { currentCat = cat; break; }
        passedSlots += count;
      }
      
      if (submitted && currentCat) { // 👉 關鍵修復：確保 currentCat 不是 null 才去讀取
        const isCorrect = currentCat.acceptIds?.includes(slotImgId);
        statusClass = isCorrect ? "slot-correct" : "slot-wrong";
      }
    } else if (submitted && unitType === 'free') {
      statusClass = "slot-free-done"; 
    } else if (submitted) {
      const isCorrect = slotImgId === currentUnitData.correctOrder[index];
      statusClass = isCorrect ? "slot-correct" : "slot-wrong";
    }
    
   const imgData = currentUnitData.images.find(img => img.id === slotImgId);

    const slotElement = (
      <div className={`grid-box drop-slot ${statusClass}`} onDrop={(e) => handleDrop(e, index)} onDragOver={handleDragOver}>
        {unitType !== 'free' && unitType !== 'inline-category'}
        {/* 👉 這裡要傳入 index，告訴它這是哪個格子 */}
        {imgData ? renderItemContent(imgData, index) : <span className="placeholder-text">拖曳至此</span>}
      </div>
    );

    if (unitType === 'inline-category' && currentCat) {
      return (
        <div key={index} className="inline-slot-wrapper">
          <div className="inline-slot-label">{currentCat.title}</div>
          {slotElement}
        </div>
      );
    }

    return <React.Fragment key={index}>{slotElement}</React.Fragment>;
  };
  const availableImages = currentUnitData.images.filter(img => !slots.includes(img.id));

  // 👉 3. 升級圖片渲染：如果圖片已經在格子裡，要幫它包裝一層可以拖曳的外衣
  const renderItemContent = (imgData, sourceIndex = null) => {
    const isBeingDragged = draggingId === imgData.id;
    const content = imgData.imgSrc ? (
      <img src={imgData.imgSrc} alt="選項" className="draggable-image" draggable="false" />
    ) : (
      <span className="slot-text">{imgData.content}</span>
    );

    // 如果這張圖片已經被放在格子裡，且還沒提交，就可以再次被拖曳
    if (sourceIndex !== null && !submitted) {
      return (
        <div 
          draggable 
          onDragStart={(e) => handleDragStart(e, imgData.id, sourceIndex)}
          onDragEnd={handleDragEnd}
          className={`slot-drag-wrapper ${isBeingDragged ? 'is-dragging' : ''}`}
        >
          {content}
        </div>
      );
    }
    return content;
  };

  return (
    <div className="quiz-container fade-in">
      <div className="quiz-header compact-header">
        <h2>{currentUnitData.title}</h2>
        <p>
          {unitType === 'free' ? "自由發揮，將你覺得合適的項目拖曳至虛線框。" : "請將圖片拖曳至對應虛線框。完成後點擊提交。"}
        </p>
      </div>

      {submitted && (
        <div className={`score-banner ${unitScore === questionCount ? 'perfect' : 'normal'}`}>
          {unitType === 'free' ? (
            <span>🎉 作答完成！已紀錄你的選擇。</span>
          ) : (
            <>單元得分: <span>{unitScore}</span> / {questionCount} 分</>
          )}
        </div>
      )}

      {/* 👉 根據模式渲染不同排版的放置區 */}
      {/* 找到這一段並替換 */}
      {unitType === 'category' ? (
        <div className="category-layout">
          {(() => {
            let globalIndex = 0;
            return currentUnitData.categories.map(cat => {
              const catSlots = [];
              for (let i = 0; i < cat.slotCount; i++) {
                catSlots.push(renderSlot(globalIndex));
                globalIndex++;
              }

              // 👉 新增這行：計算「實際顯示欄數」，最多不超過 5 欄
              const columns = Math.min(cat.slotCount, 5);

              return (
                <div 
                  key={cat.id} 
                  className="category-group" 
                  // 👉 把原本的 cat.slotCount 改成 columns
                  style={{ flex: `1 1 calc(${columns * 20}% - 20px)` }}
                >
                  <h4 className="category-title">{cat.title}</h4>
                  {/* 👉 把原本的 cat.slotCount 改成 columns */}
                  <div className="unified-grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                    {catSlots}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      ) : (
        <div className="unified-grid">
          {slots.map((_, index) => renderSlot(index))}
        </div>
      )}

      {/* 👉 5. 讓下方題庫也變成可以放置的區域 (onDrop) */}
      <div 
        className="image-bank"
        onDrop={handleBankDrop}
        onDragOver={handleDragOver}
      >
        <h4>待選項：</h4>
        <div className="unified-grid">
          {availableImages.map(img => {
            const isBeingDragged = draggingId === img.id;
            return (
              <div 
                key={img.id} 
                className={`grid-box drag-item ${submitted ? 'disabled' : ''} ${isBeingDragged ? 'is-dragging' : ''}`}
                draggable={!submitted}
                onDragStart={(e) => handleDragStart(e, img.id, null)} /* 這裡傳入 null 代表從題庫來 */
                onDragEnd={handleDragEnd}
              >
                {renderItemContent(img)}
              </div>
            );
          })}
          {availableImages.length === 0 && <p className="all-used-text" style={{gridColumn: '1 / -1', textAlign:'center'}}>所有項目都已放上去了！</p>}
        </div>
      </div>

      <hr className="divider" />

      <div className="action-area">
        {!submitted ? (
          <button className="ui-button submit-btn" onClick={handleSubmit}>✅ 提交答案</button>
        ) : (
          <button className="ui-button secondary-btn" disabled>已作答完畢，無法再修改</button>
        )}
      </div>
    </div>
  );
};

export default QuizUnit;