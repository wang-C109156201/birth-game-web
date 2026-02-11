import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

// 假設這是一個通用的單元元件，透過 props 傳入單元 ID 和圖片資料
const QuizUnit = ({ unitId, images, correctOrder }) => {
  const { updateScore, scores } = useApp();
  
  // 紀錄目前每個放置區塊(Slot)放了哪個圖片ID
  const [slots, setSlots] = useState(Array(5).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [unitScore, setUnitScore] = useState(0);

  // 檢查是否此單元已經做過 (功能 7: 復原進度)
  useEffect(() => {
    if (scores[unitId] !== undefined) {
      // 實務上如果要完全復原拖曳位置，也需要存 slots 到 localStorage
      // 這裡簡化為：若已計分，顯示已完成分數
      setUnitScore(scores[unitId]);
      setSubmitted(true);
    }
  }, [scores, unitId]);

  // 簡單的拖曳處理 (HTML5 DnD)
  const handleDragStart = (e, imgId) => {
    e.dataTransfer.setData("imageId", imgId);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const imgId = parseInt(e.dataTransfer.getData("imageId"));
    const newSlots = [...slots];
    newSlots[index] = imgId;
    setSlots(newSlots);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = () => {
    let score = 0;
    // 比對邏輯
    slots.forEach((slotImgId, index) => {
      if (slotImgId === correctOrder[index]) {
        score += 1; // 功能 4: 正確位置得 1 分
      }
    });
    
    setUnitScore(score);
    setSubmitted(true);
    updateScore(unitId, score); // 存入 Context 並上傳
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>單元 {unitId} 測驗</h2>
      {submitted && <h3>你的分數: {unitScore} / 5</h3>}
      
      {/* 圖片庫區 (尚未拖曳的) */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', minHeight: '100px', border: '1px dashed #ccc' }}>
         {images.map(img => (
           <div 
             key={img.id} 
             draggable={!submitted}
             onDragStart={(e) => handleDragStart(e, img.id)}
             style={{ width: '80px', height: '80px', background: '#eee', cursor: 'grab' }}
           >
             {img.content}
           </div>
         ))}
      </div>

      {/* 放置區 (Slots) */}
      <div style={{ display: 'flex', gap: '20px' }}>
        {slots.map((slotImgId, index) => {
           const isCorrect = submitted && slotImgId === correctOrder[index];
           const isWrong = submitted && slotImgId !== null && slotImgId !== correctOrder[index];
           
           return (
            <div 
              key={index}
              onDrop={(e) => !submitted && handleDrop(e, index)}
              onDragOver={handleDragOver}
              style={{ 
                width: '100px', height: '100px', border: '2px solid black',
                // 功能 4: UI 示意對錯
                borderColor: isCorrect ? 'green' : (isWrong ? 'red' : 'black'),
                background: isCorrect ? '#dff0d8' : (isWrong ? '#f2dede' : 'white')
              }}
            >
              {slotImgId ? `圖片 ID: ${slotImgId}` : `位置 ${index + 1}`}
            </div>
           );
        })}
      </div>

      {!submitted && <button onClick={handleSubmit} style={{ marginTop: '20px', padding: '10px 20px' }}>提交答案</button>}
    </div>
  );
};

export default QuizUnit;