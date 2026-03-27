// 這裡定義不同單元的內容
export const RAW_DATA = [
  {
    id: 1,
    title: '單元 1：啟動產程的原因',
    bgImage: '/images/bg-unit1.jpg',
    type: 'category', // 👉 告訴系統這是「分類模式」
    categories: [
      { id: 'catA', title: '自然啟動(產兆)', acceptIds: [11, 12, 13], slotCount: 3 }, // slotCount代表這個區塊有幾個格子
      { id: 'catB', title: '醫療啟動', acceptIds: [14, 15, 16, 17, 18], slotCount: 5 }
    ],
    images: [
      { id: 11, imgSrc: '/image/unit-1/1-1.jpg' }, { id: 12, imgSrc: '/image/unit-1/1-2.jpg' }, { id: 13, imgSrc: '/image/unit-1/1-3.jpg' },
      { id: 14, imgSrc: '/image/unit-1/1-4.jpg' }, { id: 15, imgSrc: '/image/unit-1/1-5.jpg' }, { id: 16, imgSrc: '/image/unit-1/1-6.jpg' }, { id: 17, imgSrc: '/image/unit-1/1-7.jpg' }, { id: 18, imgSrc: '/image/unit-1/1-8.jpg' }
    ],
  },
  {
    id: 2, title: '單元 2：宮縮',
    type: 'inline-category',
    categories: [
      { id: 21, title: '0CM', acceptIds: [21], slotCount: 1 },
      { id: 22, title: '0-6CM', acceptIds: [22], slotCount: 1 },
      { id: 23, title: '7-10CM', acceptIds: [23], slotCount: 1 },
      { id: 24, title: '全開10CM到胎兒娩出', acceptIds: [24], slotCount: 1 }
    ],
    images: [
      { id: 21, imgSrc: '/image/unit-2/unit宮縮-1.jpg' },
      { id: 22, imgSrc: '/image/unit-2/unit宮縮-2.jpg' },
      { id: 23, imgSrc: '/image/unit-2/unit宮縮-3.jpg' },
      { id: 24, imgSrc: '/image/unit-2/unit宮縮-4.png' },
    ],
  },
  {
    id: 3, title: '單元 3：子宮頸的開口',
    type: 'inline-category',
    categories: [
      { id: 31, title: '0CM', acceptIds: [31], slotCount: 1 },
      { id: 32, title: '3CM', acceptIds: [32], slotCount: 1 },
      { id: 33, title: '7CM', acceptIds: [33], slotCount: 1 },
      { id: 34, title: '10CM', acceptIds: [34], slotCount: 1 },
      { id: 35, title: '全開10CM到胎兒娩出', acceptIds: [35], slotCount: 1 }
    ],
    images: [
      { id: 31, imgSrc: '/image/unit-3/unit開口-1.jpg' },
      { id: 32, imgSrc: '/image/unit-3/unit開口-2.jpg' },
      { id: 33, imgSrc: '/image/unit-3/unit開口-3.jpg' },
      { id: 34, imgSrc: '/image/unit-3/unit開口-4.jpg' },
      { id: 35, imgSrc: '/image/unit-3/unit開口-5.jpg' }
    ],
  },
  {
    id: 4, title: '單元 4：落紅',
    type: 'inline-category',
    categories: [
      { id: 41, title: '無宮縮', acceptIds: [41], slotCount: 1 },
      { id: 42, title: '子宮頸口開0-6CM', acceptIds: [42], slotCount: 1 },
      { id: 43, title: '子宮頸口開7-10CM', acceptIds: [43], slotCount: 1 },
      { id: 44, title: '第二產程', acceptIds: [44], slotCount: 1 }
    ],

    images: [
      { id: 41, imgSrc: '/image/unit-4/unit落紅-1.jpg' },
      { id: 42, imgSrc: '/image/unit-4/unit落紅-2.jpg' },
      { id: 43, imgSrc: '/image/unit-4/unit落紅-3.jpg' },
      { id: 44, imgSrc: '/image/unit-4/unit落紅-4.jpg' }
    ],
    correctOrder: [41, 42, 43, 44, 45]
  },
  {
    id: 5, title: '單元 5：破水',
    type: 'category', 
    categories: [
      { id: 'catA', title: '正常羊水', acceptIds: [51, 53, 54, 55], slotCount: 4 }, 
      { id: 'catB', title: '胎便染色', acceptIds: [52, 56, 57 ,58], slotCount: 4 }
    ],
    images: [
      { id: 51, imgSrc: '/image/unit-5/unit羊水-1.jpg' },
      { id: 52, imgSrc: '/image/unit-5/unit羊水-2.jpg' },
      { id: 53, imgSrc: '/image/unit-5/unit羊水-3.jpg' },
      { id: 54, imgSrc: '/image/unit-5/unit羊水-4.jpg' },
      { id: 55, imgSrc: '/image/unit-5/unit羊水-5.png' },
      { id: 56, imgSrc: '/image/unit-5/unit羊水-6.png' },
      { id: 57, imgSrc: '/image/unit-5/unit羊水-7.png' },
      { id: 58, imgSrc: '/image/unit-5/unit羊水-8.png' },
    ],
  },
  {
    id: 6, title: '單元 6：情緒反應',
    type: 'inline-category',
    categories: [
      { id: 61, title: '0CM', acceptIds: [61], slotCount: 1 },
      { id: 62, title: '7CM', acceptIds: [62], slotCount: 1 },
      { id: 63, title: '10CM', acceptIds: [63], slotCount: 1 },
      { id: 64, title: '全開10CM到胎兒娩出', acceptIds: [64], slotCount: 1 },
    ],
    images: [
      { id: 61, imgSrc: '/image/unit-6/unit臉-2.jpg' },
      { id: 62, imgSrc: '/image/unit-6/unit臉-3.jpg' },
      { id: 63, imgSrc: '/image/unit-6/unit臉-4.jpg' },
      { id: 64, imgSrc: '/image/unit-6/unit臉-5.jpg' },
    ],
  },
  {
    id: 7, title: '單元 7：疼痛位置',
    type: 'category',
    categories: [
      { id: 'catA', title: '第一產程早期', acceptIds: [71, 72], slotCount: 2 },
      { id: 'catB', title: '第一產程晚期', acceptIds: [73, 74 ], slotCount: 2 },
      { id: 'catC', title: '第二產程胎兒娩出', acceptIds: [75, 76, 77], slotCount: 3 },
    ],
    images: [
      { id: 71, imgSrc: '/image/unit-7/unit位置-1.jpg' },
      { id: 72, imgSrc: '/image/unit-7/unit位置-2.jpg' },
      { id: 73, imgSrc: '/image/unit-7/unit位置-3.jpg' },
      { id: 74, imgSrc: '/image/unit-7/unit位置-4.jpg' },
      { id: 75, imgSrc: '/image/unit-7/unit位置-5.jpg' },
      { id: 76, imgSrc: '/image/unit-7/unit位置-6.jpg' },
      { id: 77, imgSrc: '/image/unit-7/unit位置-7.jpg' },
    ],
  },
  {
    id: 8, title: '單元 8：第二產程徵象',
    type: 'category',
    categories: [
      { id: 'catA', title: '選擇符合第二產程的徵象', acceptIds: [81, 82, 83, 84, 85], slotCount: 5 },
    ],
    images: [
      { id: 81, imgSrc: '/image/unit-8/unit徵象-1.png' },
      { id: 82, imgSrc: '/image/unit-8/unit徵象-2.jpg' },
      { id: 83, imgSrc: '/image/unit-8/unit徵象-3.jpg' },
      { id: 84, imgSrc: '/image/unit-8/unit徵象-4.jpg' },
      { id: 85, imgSrc: '/image/unit-8/unit徵象-5.png' },
      { id: 86, imgSrc: '/image/unit-8/unit徵象-6.jpg' },
      { id: 87, imgSrc: '/image/unit-8/unit徵象-7.jpg' },
      { id: 88, imgSrc: '/image/unit-8/unit徵象-8.jpg' },
      { id: 89, imgSrc: '/image/unit-8/unit徵象-9.jpg' },
    ],
  },
  {
    id: 9, title: '單元 9：第一到第四產程',
    type: 'inline-category',
    categories: [
      { id: 91, title: '第一產程子宮頸0CM', acceptIds: [91], slotCount: 1 },
      { id: 92, title: '第一產程子宮頸10CM', acceptIds: [92], slotCount: 1 },
      { id: 93, title: '第二產程胎兒娩出', acceptIds: [93], slotCount: 1 },
      { id: 94, title: '第三產程胎盤娩出', acceptIds: [94], slotCount: 1 },
      { id: 95, title: '第四產程產後肌膚接觸', acceptIds: [95], slotCount: 1 },
    ],
    images: [
      { id: 91, imgSrc: '/image/unit-9/unit流程-1.jpg' },
      { id: 92, imgSrc: '/image/unit-9/unit流程-2.jpg' },
      { id: 93, imgSrc: '/image/unit-9/unit流程-3.jpg' },
      { id: 94, imgSrc: '/image/unit-9/unit流程-4.jpg' },
      { id: 95, imgSrc: '/image/unit-9/unit流程-5.jpg' },
    ],
  },
  {
    id: 10, title: '單元10：生產地圖',
    type: 'category', 
    categories: [
      { id: 'catA', title: '0-10公分前的醫療處置', acceptIds: [1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034], slotCount: 12 },
      { id: 'catB', title: '0-10公分生理和舒適需求', acceptIds: [1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022], slotCount: 10 },
      { id: 'catC', title: '生產時的醫療處置', acceptIds: [108, 109, 1010, 1011], slotCount: 4 },
      { id: 'catD', title: '生產姿勢', acceptIds: [106, 107, 108], slotCount: 3 },
      { id: 'catE', title: '生產時的友善措施', acceptIds: [101, 102, 103, 104, 105], slotCount: 5 }
    ],
    // type: 'free',     // 👉 告訴系統這是「自由模式」(不分對錯)
    // slotCount: 8,     // 告訴系統要產生幾個空格讓學生填
    images: [
      { id: 101, imgSrc: '/image/unit-10/unit友善措施-1.jpg' },
      { id: 102, imgSrc: '/image/unit-10/unit友善措施-2.jpg' },
      { id: 103, imgSrc: '/image/unit-10/unit友善措施-3.jpg' },
      { id: 104, imgSrc: '/image/unit-10/unit友善措施-4.jpg' },
      { id: 105, imgSrc: '/image/unit-10/unit友善措施-5.jpg' },
      { id: 106, imgSrc: '/image/unit-10/unit生產姿勢-1.jpg' },
      { id: 107, imgSrc: '/image/unit-10/unit生產姿勢-2.jpg' },
      { id: 108, imgSrc: '/image/unit-10/unit生產姿勢-3.jpg' },
      { id: 109, imgSrc: '/image/unit-10/unit生產醫療處置-1.jpg' },
      { id: 1010, imgSrc: '/image/unit-10/unit生產醫療處置-2.jpg' },
      { id: 1011, imgSrc: '/image/unit-10/unit生產醫療處置-3.jpg' },
      { id: 1012, imgSrc: '/image/unit-10/unit生產醫療處置-4.jpg' },
      { id: 1013, imgSrc: '/image/unit-10/unit需求-1.jpg' },
      { id: 1014, imgSrc: '/image/unit-10/unit需求-2.jpg' },
      { id: 1015 , imgSrc: '/image/unit-10/unit需求-3.jpg' },
      { id: 1016, imgSrc: '/image/unit-10/unit需求-4.jpg' },
      { id: 1017, imgSrc: '/image/unit-10/unit需求-5.jpg' },
      { id: 1018, imgSrc: '/image/unit-10/unit需求-6.jpg' },
      { id: 1019, imgSrc: '/image/unit-10/unit需求-7.jpg' },
      { id: 1020, imgSrc: '/image/unit-10/unit需求-8.jpg' },
      { id: 1021, imgSrc: '/image/unit-10/unit需求-9.jpg' },
      { id: 1022, imgSrc: '/image/unit-10/unit需求-10.jpg' },
      { id: 1023, imgSrc: '/image/unit-10/unit生產前醫療處置-1.jpg' },
      { id: 1024, imgSrc: '/image/unit-10/unit生產前醫療處置-2.png' },
      { id: 1025, imgSrc: '/image/unit-10/unit生產前醫療處置-3.jpg' },
      { id: 1026, imgSrc: '/image/unit-10/unit生產前醫療處置-4.jpg' },
      { id: 1027, imgSrc: '/image/unit-10/unit生產前醫療處置-5.jpg' },
      { id: 1028, imgSrc: '/image/unit-10/unit生產前醫療處置-6.jpg' },
      { id: 1029, imgSrc: '/image/unit-10/unit生產前醫療處置-7.jpg' },
      { id: 1030, imgSrc: '/image/unit-10/unit生產前醫療處置-8.jpg' },
      { id: 1031, imgSrc: '/image/unit-10/unit生產前醫療處置-9.jpg' },
      { id: 1032, imgSrc: '/image/unit-10/unit生產前醫療處置-10.jpg' },
      { id: 1033, imgSrc: '/image/unit-10/unit生產前醫療處置-11.jpg' },
      { id: 1034, imgSrc: '/image/unit-10/unit生產前醫療處置-12.jpg' },
    ],
  },
];

// 2. 👉 網頁載入時，直接在這裡把所有單元的 images 洗牌一次，然後再輸出！
export const ALL_UNITS_DATA = RAW_DATA.map(unit => {
  return {
    ...unit,
    // 複製一份圖片陣列並隨機打亂順序
    images: [...unit.images].sort(() => Math.random() - 0.5)
  };
});