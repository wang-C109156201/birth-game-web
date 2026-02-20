// 這裡定義 5 個不同單元的內容
export const ALL_UNITS_DATA = [
  {
    id: 1, 
    title: '單元 1：基礎分類',
    bgImage: '/images/bg-unit1.jpg', // 指向 public/images/ 裡的背景圖
    images: [
      { id: 11, imgSrc: '/images/apple.png' }, 
      { id: 12, imgSrc: '/images/banana.png' }, 
      { id: 13, imgSrc: '/images/cabbage.png' }, 
      { id: 14, imgSrc: '/images/water-spinach.png' }, 
      { id: 15, imgSrc: '/images/grape.png' }
    ],
    correctOrder: [11, 12, 13, 14, 15]
  },
  {
    id: 2, title: '單元 2：進階配對',
    images: [{ id: 21, content: 'A' }, { id: 22, content: 'B' }, { id: 23, content: 'C' }, { id: 24, content: 'D' }, { id: 25, content: 'E' }],
    correctOrder: [21, 22, 23, 24, 25]
  },
  {
    id: 3, title: '單元 3：邏輯排序',
    images: [{ id: 31, content: '步驟一' }, { id: 32, content: '步驟二' }, { id: 33, content: '步驟三' }, { id: 34, content: '步驟四' }, { id: 35, content: '步驟五' }],
    correctOrder: [31, 32, 33, 34, 35]
  },
  {
    id: 4, title: '單元 4：實務操作',
    images: [{ id: 41, content: '圖4-1' }, { id: 42, content: '圖4-2' }, { id: 43, content: '圖4-3' }, { id: 44, content: '圖4-4' }, { id: 45, content: '圖4-5' }],
    correctOrder: [41, 42, 43, 44, 45]
  },
  {
    id: 5, title: '單元 5：綜合測驗',
    images: [{ id: 51, content: '觀念A' }, { id: 52, content: '觀念B' }, { id: 53, content: '觀念C' }, { id: 54, content: '觀念D' }, { id: 55, content: '觀念E' }],
    correctOrder: [51, 52, 53, 54, 55]
  }
];
