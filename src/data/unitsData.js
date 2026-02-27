// 這裡定義 5 個不同單元的內容
export const ALL_UNITS_DATA = [
  {
    id: 1, 
    title: '單元 1：啟動產程的原因',
    bgImage: '/images/bg-unit1.jpg', // 指向 public/images/ 裡的背景圖
    images: [
      { id: 11, imgSrc: '/image/unit-1/1-1.jpg' }, 
      { id: 12, imgSrc: '/image/unit-1/1-2.jpg' }, 
      { id: 13, imgSrc: '/image/unit-1/1-3.jpg' }, 
      { id: 14, imgSrc: '/image/unit-1/1-4.jpg' }, 
      { id: 15, imgSrc: '/image/unit-1/1-5.jpg' },
      { id: 16, imgSrc: '/image/unit-1/1-6.jpg' },
      { id: 17, imgSrc: '/image/unit-1/1-7.jpg' },
      { id: 18, imgSrc: '/image/unit-1/1-8.jpg' }
    ],
    correctOrder: [11, 12, 13, 14, 15, 16, 17, 18]
  },
  {
    id: 2, title: '單元 2：宮縮',
    images: [{ id: 21, content: 'A' }, { id: 22, content: 'B' }, { id: 23, content: 'C' }, { id: 24, content: 'D' }, { id: 25, content: 'E' }],
    correctOrder: [21, 22, 23, 24, 25]
  },
  {
    id: 3, title: '單元 3：子宮頸的開口',
    images: [{ id: 31, content: '步驟一' }, { id: 32, content: '步驟二' }, { id: 33, content: '步驟三' }, { id: 34, content: '步驟四' }, { id: 35, content: '步驟五' }],
    correctOrder: [31, 32, 33, 34, 35]
  },
  {
    id: 4, title: '單元 4：落紅',
    images: [{ id: 41, content: '圖4-1' }, { id: 42, content: '圖4-2' }, { id: 43, content: '圖4-3' }, { id: 44, content: '圖4-4' }, { id: 45, content: '圖4-5' }],
    correctOrder: [41, 42, 43, 44, 45]
  },
  {
    id: 5, title: '單元 5：破水',
    images: [{ id: 51, content: '觀念A' }, { id: 52, content: '觀念B' }, { id: 53, content: '觀念C' }, { id: 54, content: '觀念D' }, { id: 55, content: '觀念E' }],
    correctOrder: [51, 52, 53, 54, 55]
  }
];
