import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useParams } from 'react-router-dom';

const QuizUnit = ({ unitData }) => {
  const { id } = useParams(); // 從網址列取得目前是第幾單元
  const unitId = `unit_${id}`;
  const currentUnitData = unitData[id - 1]; // 根據 ID 抓取對應的題目資料

  const { progress, saveUnitProgress } = useApp();
  
  // 狀態初始化：如果 LocalStorage 有存這單元的紀錄，就拿出來用；沒有就給 5 個空位
  const savedState = progress[unitId] || { slots: Array(5).fill(null), submitted: false, score: 0 };
  
  const [slots, setSlots] = useState(savedState.slots);
  const [submitted, setSubmitted] = useState(savedState.submitted);
  const [unitScore, setUnitScore] = useState(savedState.score);

  // 當切換單元時，重新讀取該單元的進度
  useEffect(() => {
    const newState = progress[`unit_${id}`] || { slots: Array(5).fill(null), submitted: false, score: 0 };
    setSlots(newState.slots);
    setSubmitted(newState.submitted);
    setUnitScore(newState.score);
  }, [id, progress]);

  // 拖曳邏輯
  const handleDragStart = (e, imgId) => {
    e.dataTransfer.setData("imageId", imgId);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (submitted) return; // 提交後禁止拖曳
    
    const imgId = parseInt(e.dataTransfer.getData("imageId"));
    const newSlots = [...slots];
    newSlots[index] = imgId;
    
    setSlots(newSlots);
    // 即時存檔：此時還沒提交，只存拖曳狀態，不顯示對錯 UI
    saveUnitProgress(unitId, newSlots, false, 0); 
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = () => {
    // 檢查是否所有空格都填滿了
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
    // 提交存檔：紀錄為已提交，寫入分數，並觸發上傳 Firebase
    saveUnitProgress(unitId, slots, true, score); 
  };

  if (!currentUnitData) return <div>找不到此單元</div>;

  // 計算下方圖片庫還剩下哪些圖片沒被拖上去
  const availableImages = currentUnitData.images.filter(img => !slots.includes(img.id));

  return (
    <div className="quiz-container fade-in">
      <div className="quiz-header">
        <h2>{currentUnitData.title}</h2>
        <p>請將下方的項目拖曳到正確的位置中。完成後點擊提交。</p>
      </div>

      {/* 分數提示區塊 */}
      {submitted && (
        <div className={`score-banner ${unitScore === 5 ? 'perfect' : 'normal'}`}>
          單元得分: <span>{unitScore}</span> / 5 分
        </div>
      )}

      {/* 放置區 (Slots) */}
      <div className="slots-area">
        {slots.map((slotImgId, index) => {
           // 只有在 submitted 為 true 時，才計算並顯示對錯的 CSS class
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
              {imgData ? <div className="slot-content">{imgData.content}</div> : <span className="placeholder-text">拖曳至此</span>}
            </div>
           );
        })}
      </div>

      {/* 下方圖片庫 */}
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
              {img.content}
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