import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import '../css/QuizUnit.css';

const QuizUnit = ({ unitData }) => {
  const { id } = useParams();
  const unitId = `unit_${id}`;
  const currentUnitData = unitData[id - 1];

  const { progress, saveUnitProgress } = useApp();
  
  const questionCount = currentUnitData?.correctOrder?.length || 5;
  const savedState = progress[unitId] || { slots: Array(questionCount).fill(null), submitted: false, score: 0 };
  
  const [slots, setSlots] = useState(savedState.slots);
  const [submitted, setSubmitted] = useState(savedState.submitted);
  const [unitScore, setUnitScore] = useState(savedState.score);
  
  // 👉 追蹤正在拖曳的圖片 ID
  const [draggingId, setDraggingId] = useState(null);

  useEffect(() => {
    if (!currentUnitData) return;
    const qCount = currentUnitData.correctOrder.length;
    const newState = progress[`unit_${id}`] || { slots: Array(qCount).fill(null), submitted: false, score: 0 };
    setSlots(newState.slots);
    setSubmitted(newState.submitted);
    setUnitScore(newState.score);
  }, [id, progress, currentUnitData]);

  if (!currentUnitData) return <div style={{padding: '20px'}}>找不到此單元資料，請確認網址。</div>;

  const handleDragStart = (e, imgId) => {
    e.dataTransfer.setData("imageId", imgId);
    e.dataTransfer.effectAllowed = "move";
    
    // 👉 關鍵技巧：使用 setTimeout 讓瀏覽器先抓取完整的圖片當作「拖曳殘影」，
    // 然後再把原本留在格子裡的圖片變成半透明 (is-dragging 狀態)
    setTimeout(() => {
      setDraggingId(imgId);
    }, 0);
  };

  const handleDragEnd = () => {
    setDraggingId(null); // 拖曳結束（不論成功失敗）都清空狀態
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (submitted) return;
    
    const imgId = parseInt(e.dataTransfer.getData("imageId"));
    if (isNaN(imgId)) return; // 防止拖曳非圖片的怪東西

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

  const handleSubmit = () => {
    if (slots.includes(null)) {
      alert("請將所有圖片拖曳到框框內再提交喔！");
      return;
    }

    let score = 0;
    slots.forEach((slotImgId, index) => {
      if (slotImgId === currentUnitData.correctOrder[index]) {
        score += 1;
      }
    });
    
    setUnitScore(score);
    setSubmitted(true);
    saveUnitProgress(unitId, slots, true, score); 
  };

  const availableImages = currentUnitData.images.filter(img => !slots.includes(img.id));

  // 渲染圖片的輔助函式 (禁止圖片自己被原生拖曳，交給外層 div 處理)
  const renderItemContent = (imgData) => {
    if (imgData.imgSrc) {
      return <img src={imgData.imgSrc} alt="選項" className="draggable-image" draggable="false" />;
    }
    return <span className="slot-text">{imgData.content}</span>;
  };

  return (
    <div className="quiz-container fade-in">
      <div className="quiz-header unit-header">
        <h2>{currentUnitData.title}</h2>
        <p>請長按圖片（電腦請直接拖曳）至對應虛線框。完成後點擊提交。</p>
      </div>

      {submitted && (
        <div className={`score-banner ${unitScore === questionCount ? 'perfect' : 'normal'}`}>
          單元得分: <span>{unitScore}</span> / {questionCount} 分
        </div>
      )}

      {/* 👉 上方放置區 */}
      <div className="unified-grid">
        {slots.map((slotImgId, index) => {
           let statusClass = "slot-empty";
           if (slotImgId) statusClass = "slot-filled";
           if (submitted) {
             const isCorrect = slotImgId === currentUnitData.correctOrder[index];
             statusClass = isCorrect ? "slot-correct" : "slot-wrong";
           }
           const imgData = currentUnitData.images.find(img => img.id === slotImgId);

           return (
            <div 
              key={index}
              className={`grid-box drop-slot ${statusClass}`}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={handleDragOver}
            >
              <div className="slot-number">{index + 1}</div>
              {imgData ? renderItemContent(imgData) : <span className="placeholder-text">拖曳至此</span>}
            </div>
           );
        })}
      </div>

      <hr className="divider" />

      {/* 👉 下方圖片庫 */}
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
                onDragEnd={handleDragEnd}
              >
                {renderItemContent(img)}
              </div>
            );
          })}
          {availableImages.length === 0 && <p className="all-used-text" style={{gridColumn: '1 / -1', textAlign:'center'}}>所有項目都已放上去了！</p>}
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