// src/components/QuizUnit.js
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useParams } from 'react-router-dom';

const QuizUnit = ({ unitData }) => {
  const { id } = useParams();
  const unitId = `unit_${id}`;
  const currentUnitData = unitData[id - 1];

  const { progress, saveUnitProgress } = useApp();
  const savedState = progress[unitId] || { slots: Array(5).fill(null), submitted: false, score: 0 };
  
  const [slots, setSlots] = useState(savedState.slots);
  const [submitted, setSubmitted] = useState(savedState.submitted);
  const [unitScore, setUnitScore] = useState(savedState.score);

  useEffect(() => {
    const newState = progress[`unit_${id}`] || { slots: Array(5).fill(null), submitted: false, score: 0 };
    setSlots(newState.slots);
    setSubmitted(newState.submitted);
    setUnitScore(newState.score);
  }, [id, progress]);

  const handleDragStart = (e, imgId) => {
    e.dataTransfer.setData("imageId", imgId);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (submitted) return;
    
    const imgId = parseInt(e.dataTransfer.getData("imageId"));
    const newSlots = [...slots];
    newSlots[index] = imgId;
    
    setSlots(newSlots);
    saveUnitProgress(unitId, newSlots, false, 0); 
  };

  const handleDragOver = (e) => e.preventDefault();

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

  if (!currentUnitData) return <div>找不到此單元</div>;

  const availableImages = currentUnitData.images.filter(img => !slots.includes(img.id));

  // 用來動態設定背景圖的樣式
  const containerStyle = {
    backgroundImage: currentUnitData.bgImage ? `url(${currentUnitData.bgImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // 加上一點半透明覆蓋，確保文字和框框還是看得清楚
    backgroundColor: currentUnitData.bgImage ? 'rgba(255, 255, 255, 0.85)' : 'var(--card-bg)',
    backgroundBlendMode: 'overlay',
  };

  // 渲染圖片或文字的輔助函式
  const renderItemContent = (imgData) => {
    if (imgData.imgSrc) {
      return <img src={imgData.imgSrc} alt="選項" className="draggable-image" draggable="false" />;
    }
    return <span className="slot-text">{imgData.content}</span>;
  };

  return (
    <div className="quiz-container fade-in" style={containerStyle}>
      <div className="quiz-header">
        <h2>{currentUnitData.title}</h2>
        <p>請將下方的圖片拖曳到正確的位置中。完成後點擊提交。</p>
      </div>

      {submitted && (
        <div className={`score-banner ${unitScore === 5 ? 'perfect' : 'normal'}`}>
          單元得分: <span>{unitScore}</span> / 5 分
        </div>
      )}

      <div className="slots-area">
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
              className={`drop-slot ${statusClass}`}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={handleDragOver}
            >
              <div className="slot-number">{index + 1}</div>
              {imgData ? renderItemContent(imgData) : <span className="placeholder-text">拖曳至此</span>}
            </div>
           );
        })}
      </div>

      <div className="image-bank">
        <h4>待選項：</h4>
        <div className="draggable-items">
          {availableImages.map(img => (
            <div 
              key={img.id} 
              className={`drag-item ${submitted ? 'disabled' : ''}`}
              draggable={!submitted}
              onDragStart={(e) => handleDragStart(e, img.id)}
            >
              {renderItemContent(img)}
            </div>
          ))}
          {availableImages.length === 0 && <p className="all-used-text">所有項目都已放上去了！</p>}
        </div>
      </div>

      <div className="action-area">
        {!submitted ? (
          <button className="ui-button submit-btn" onClick={handleSubmit}>✅ 提交答案</button>
        ) : (
          <button className="ui-button secondary-btn" disabled>已完成此單元</button>
        )}
      </div>
    </div>
  );
};

export default QuizUnit;