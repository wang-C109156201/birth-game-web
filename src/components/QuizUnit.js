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

  const handleDragStart = (e, imgId) => {
    e.dataTransfer.setData("imageId", imgId);
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => setDraggingId(imgId), 0);
  };

  const handleDragEnd = () => setDraggingId(null);

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (submitted) return;

    const imgId = parseInt(e.dataTransfer.getData("imageId"));
    if (isNaN(imgId)) return;

    const newSlots = [...slots];
    newSlots[index] = imgId;

    setSlots(newSlots);
    saveUnitProgress(unitId, newSlots, false, 0);
    setDraggingId(null);
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
        {unitType !== 'free' && unitType !== 'inline-category' && <div className="slot-number">{index + 1}</div>}
        {imgData ? renderItemContent(imgData) : <span className="placeholder-text">拖曳至此</span>}
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

  const renderItemContent = (imgData) => {
    if (imgData.imgSrc) return <img src={imgData.imgSrc} alt="選項" className="draggable-image" draggable="false" />;
    return <span className="slot-text">{imgData.content}</span>;
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
              return (
                <div key={cat.id} className="category-group">
                  <h4 className="category-title">{cat.title}</h4>
                  <div className="unified-grid">{catSlots}</div>
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

      <hr className="divider" />

      {/* 下方圖片庫 */}
      <div className="image-bank">
        <h4>待選項：</h4>
        <div className="unified-grid">
          {availableImages.map(img => {
            const isBeingDragged = draggingId === img.id;
            return (
              <div
                key={img.id}
                className={`grid-box drag-item ${submitted ? 'disabled' : ''} ${isBeingDragged ? 'is-dragging' : ''}`}
                draggable={!submitted}
                onDragStart={(e) => handleDragStart(e, img.id)}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
              >
                {renderItemContent(img)}
              </div>
            );
          })}
          {availableImages.length === 0 && <p className="all-used-text" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>所有項目都已放上去了！</p>}
        </div>
      </div>

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