// 這裡定義不同單元的內容
export const RAW_DATA = [
  {
    id: 1,
    title: '接近生產的跡象',
    type: 'category', // 👉 告訴系統這是「分類模式」
    categories: [
      { id: 'catA', title: '選三個接近生產的跡象', acceptIds: [15, 16, 17], slotCount: 3 }, // slotCount代表這個區塊有幾個格子
    ],
    images: [
      { id: 11, imgSrc: '/image/unit-1/unit生產跡象假-1.jpg' },
      { id: 12, imgSrc: '/image/unit-1/unit生產跡象假-2.jpg' },
      { id: 13, imgSrc: '/image/unit-1/unit生產跡象假-3.jpg' },
      { id: 14, imgSrc: '/image/unit-1/unit生產跡象假-4.png' },
      { id: 15, imgSrc: '/image/unit-1/unit生產跡象真-5.png' },
      { id: 16, imgSrc: '/image/unit-1/unit生產跡象真-6.png' },
      { id: 17, imgSrc: '/image/unit-1/unit生產跡象真-7.png' },
    ],
  },
  {
    id: 2,
    title: '啟動產程的原因',
    type: 'category', 
    categories: [
      { id: 'catA', title: '自然啟動(產兆)', acceptIds: [21, 22, 23], slotCount: 3 }, // slotCount代表這個區塊有幾個格子
      { id: 'catB', title: '醫療啟動', acceptIds: [24, 25, 26, 27, 28], slotCount: 5 }
    ],
    images: [
      { id: 21, imgSrc: '/image/unit-2/1-1.jpg' }, { id: 22, imgSrc: '/image/unit-2/1-2.jpg' }, { id: 23, imgSrc: '/image/unit-2/1-3.jpg' },
      { id: 24, imgSrc: '/image/unit-2/1-4.jpg' }, { id: 25, imgSrc: '/image/unit-2/1-5.jpg' }, { id: 26, imgSrc: '/image/unit-2/1-6.jpg' }, { id: 27, imgSrc: '/image/unit-2/1-7.jpg' }, { id: 28, imgSrc: '/image/unit-2/1-8.jpg' }
    ],
  },
  {
    id: 3, title: '宮縮',
    type: 'inline-category',
    categories: [
      { id: 31, title: '0CM', acceptIds: [31], slotCount: 1 },
      { id: 32, title: '0-6CM', acceptIds: [32], slotCount: 1 },
      { id: 33, title: '7-10CM', acceptIds: [33], slotCount: 1 },
      { id: 34, title: '全開10CM到胎兒娩出', acceptIds: [34], slotCount: 1 }
    ],
    images: [
      { id: 31, imgSrc: '/image/unit-3/unit-uterine-contraction-1.jpg' },
      { id: 32, imgSrc: '/image/unit-3/unit-uterine-contraction-2.jpg' },
      { id: 33, imgSrc: '/image/unit-3/unit-uterine-contraction-3.jpg' },
      { id: 34, imgSrc: '/image/unit-3/unit-uterine-contraction-4.png' },
    ],
  },
  {
    id: 4, title: '子宮頸的開口',
    type: 'inline-category',
    categories: [
      { id: 41, title: '0CM', acceptIds: [41], slotCount: 1 },
      { id: 42, title: '3CM', acceptIds: [42], slotCount: 1 },
      { id: 43, title: '7CM', acceptIds: [43], slotCount: 1 },
      { id: 44, title: '10CM', acceptIds: [44], slotCount: 1 },
      { id: 45, title: '全開10CM到胎兒娩出', acceptIds: [45], slotCount: 1 }
    ],
    images: [
      { id: 41, imgSrc: '/image/unit-4/unit開口-1.jpg' },
      { id: 42, imgSrc: '/image/unit-4/unit開口-2.jpg' },
      { id: 43, imgSrc: '/image/unit-4/unit開口-3.jpg' },
      { id: 44, imgSrc: '/image/unit-4/unit開口-4.jpg' },
      { id: 45, imgSrc: '/image/unit-4/unit開口-5.jpg' }
    ],
  },
  {
    id: 5, title: '落紅',
    type: 'inline-category',
    categories: [
      { id: 51, title: '無宮縮', acceptIds: [51], slotCount: 1 },
      { id: 52, title: '子宮頸口開0-6CM', acceptIds: [52], slotCount: 1 },
      { id: 53, title: '子宮頸口開7-10CM', acceptIds: [53], slotCount: 1 },
      { id: 54, title: '第二產程', acceptIds: [54], slotCount: 1 }
    ],

    images: [
      { id: 51, imgSrc: '/image/unit-5/unit落紅-1.jpg' },
      { id: 52, imgSrc: '/image/unit-5/unit落紅-2.jpg' },
      { id: 53, imgSrc: '/image/unit-5/unit落紅-3.jpg' },
      { id: 54, imgSrc: '/image/unit-5/unit落紅-4.jpg' }
    ],
    correctOrder: [51, 52, 53, 54] // 👉 這個單元的正確答案順序（給系統判分用）
  },
  {
    id: 6, title: '破水',
    type: 'category', 
    categories: [
      { id: 'catA', title: '正常羊水', acceptIds: [61, 63, 64, 65], slotCount: 4 }, 
      { id: 'catB', title: '胎便染色', acceptIds: [62, 66, 67 ,68], slotCount: 4 }
    ],
    images: [
      { id: 61, imgSrc: '/image/unit-6/unit-amniotic-fluid-1.jpg' },
      { id: 62, imgSrc: '/image/unit-6/unit-amniotic-fluid-2.jpg' },
      { id: 63, imgSrc: '/image/unit-6/unit-amniotic-fluid-3.jpg' },
      { id: 64, imgSrc: '/image/unit-6/unit-amniotic-fluid-4.jpg' },
      { id: 65, imgSrc: '/image/unit-6/unit-amniotic-fluid-5.png' },
      { id: 66, imgSrc: '/image/unit-6/unit-amniotic-fluid-6.png' },
      { id: 67, imgSrc: '/image/unit-6/unit-amniotic-fluid-7.png' },
      { id: 68, imgSrc: '/image/unit-6/unit-amniotic-fluid-8.png' },
    ],
  },
  {
    id: 7, title: '情緒反應',
    type: 'inline-category',
    categories: [
      { id: 71, title: '0CM', acceptIds: [71], slotCount: 1 },
      { id: 72, title: '7CM', acceptIds: [72], slotCount: 1 },
      { id: 73, title: '10CM', acceptIds: [73], slotCount: 1 },
      { id: 74, title: '全開10CM到胎兒娩出', acceptIds: [74], slotCount: 1 },
    ],
    images: [
      { id: 71, imgSrc: '/image/unit-7/unit臉-2.jpg' },
      { id: 72, imgSrc: '/image/unit-7/unit臉-3.jpg' },
      { id: 73, imgSrc: '/image/unit-7/unit臉-4.jpg' },
      { id: 74, imgSrc: '/image/unit-7/unit臉-5.jpg' },
    ],
  },
  {
    id: 8, title: '疼痛位置',
    type: 'category',
    categories: [
      { id: 'catA', title: '第一產程早期', acceptIds: [81, 82], slotCount: 2 },
      { id: 'catB', title: '第一產程晚期', acceptIds: [83, 84 ], slotCount: 2 },
      { id: 'catC', title: '第二產程胎兒娩出', acceptIds: [85, 86, 87], slotCount: 3 },
    ],
    images: [
      { id: 81, imgSrc: '/image/unit-8/unit位置-1.jpg' },
      { id: 82, imgSrc: '/image/unit-8/unit位置-2.jpg' },
      { id: 83, imgSrc: '/image/unit-8/unit位置-3.jpg' },
      { id: 84, imgSrc: '/image/unit-8/unit位置-4.jpg' },
      { id: 85, imgSrc: '/image/unit-8/unit位置-5.jpg' },
      { id: 86, imgSrc: '/image/unit-8/unit位置-6.jpg' },
      { id: 87, imgSrc: '/image/unit-8/unit位置-7.jpg' },
    ],
  },
  {
    id: 9, title: '第二產程徵象',
    type: 'category',
    categories: [
      { id: 'catA', title: '選擇符合第二產程的徵象', acceptIds: [91, 92, 93, 94, 95], slotCount: 5 },
    ],
    images: [
      { id: 91, imgSrc: '/image/unit-9/unit徵象-1.png' },
      { id: 92, imgSrc: '/image/unit-9/unit徵象-2.jpg' },
      { id: 93, imgSrc: '/image/unit-9/unit徵象-3.jpg' },
      { id: 94, imgSrc: '/image/unit-9/unit徵象-4.jpg' },
      { id: 95, imgSrc: '/image/unit-9/unit徵象-5.png' },
      { id: 96, imgSrc: '/image/unit-9/unit徵象-6.jpg' },
      { id: 97, imgSrc: '/image/unit-9/unit徵象-7.jpg' },
      { id: 98, imgSrc: '/image/unit-9/unit徵象-8.jpg' },
      { id: 99, imgSrc: '/image/unit-9/unit徵象-9.jpg' },
    ],
  },
  {
    id: 10, title: '第一到第四產程',
    type: 'inline-category',
    categories: [
      { id: 101, title: '第一產程子宮頸0CM', acceptIds: [91], slotCount: 1 },
      { id: 102, title: '第一產程子宮頸10CM', acceptIds: [92], slotCount: 1 },
      { id: 103, title: '第二產程胎兒娩出', acceptIds: [93], slotCount: 1 },
      { id: 104, title: '第三產程胎盤娩出', acceptIds: [94], slotCount: 1 },
      { id: 105, title: '第四產程產後肌膚接觸', acceptIds: [95], slotCount: 1 },
    ],
    images: [
      { id: 101, imgSrc: '/image/unit-10/unit流程-1.jpg' },
      { id: 102, imgSrc: '/image/unit-10/unit流程-2.jpg' },
      { id: 103, imgSrc: '/image/unit-10/unit流程-3.jpg' },
      { id: 104, imgSrc: '/image/unit-10/unit流程-4.jpg' },
      { id: 105, imgSrc: '/image/unit-10/unit流程-5.jpg' },
    ],
  },
  {
    id: 11, title: '0-10公分前的情況',
    type: 'category', 
    categories: [
      { id: 'catA', title: '0-10公分前的醫療處置', acceptIds: [1123, 1124, 1125, 1126, 1127, 1128, 1129, 1130, 1131, 1132, 1133, 1134], slotCount: 12 },
      { id: 'catB', title: '0-10公分生理和舒適需求', acceptIds: [1113, 1114, 1115, 1116, 1117, 1118, 1119, 1120, 1121, 1122], slotCount: 10 },
    ],
    // type: 'free',     // 👉 告訴系統這是「自由模式」(不分對錯)
    // slotCount: 8,     // 告訴系統要產生幾個空格讓學生填
    images: [
      { id: 1113, imgSrc: '/image/unit-11/unit需求-1.jpg' },
      { id: 1114, imgSrc: '/image/unit-11/unit需求-2.jpg' },
      { id: 1115 , imgSrc: '/image/unit-11/unit需求-3.jpg' },
      { id: 1116, imgSrc: '/image/unit-11/unit需求-4.jpg' },
      { id: 1117, imgSrc: '/image/unit-11/unit需求-5.jpg' },
      { id: 1118, imgSrc: '/image/unit-11/unit需求-6.jpg' },
      { id: 1119, imgSrc: '/image/unit-11/unit需求-7.jpg' },
      { id: 1120, imgSrc: '/image/unit-11/unit需求-8.jpg' },
      { id: 1121, imgSrc: '/image/unit-11/unit需求-9.jpg' },
      { id: 1122, imgSrc: '/image/unit-11/unit需求-10.jpg' },
      { id: 1123, imgSrc: '/image/unit-11/unit生產前醫療處置-1.jpg' },
      { id: 1124, imgSrc: '/image/unit-11/unit生產前醫療處置-2.png' },
      { id: 1125, imgSrc: '/image/unit-11/unit生產前醫療處置-3.jpg' },
      { id: 1126, imgSrc: '/image/unit-11/unit生產前醫療處置-4.jpg' },
      { id: 1127, imgSrc: '/image/unit-11/unit生產前醫療處置-5.jpg' },
      { id: 1128, imgSrc: '/image/unit-11/unit生產前醫療處置-6.jpg' },
      { id: 1129, imgSrc: '/image/unit-11/unit生產前醫療處置-7.jpg' },
      { id: 1130, imgSrc: '/image/unit-11/unit生產前醫療處置-8.jpg' },
      { id: 1131, imgSrc: '/image/unit-11/unit生產前醫療處置-9.jpg' },
      { id: 1132, imgSrc: '/image/unit-11/unit生產前醫療處置-10.jpg' },
      { id: 1133, imgSrc: '/image/unit-11/unit生產前醫療處置-11.jpg' },
      { id: 1134, imgSrc: '/image/unit-11/unit生產前醫療處置-12.jpg' },
    ],
  },
  {
    id: 12, title: '生產時的情況',
    type: 'category', 
    categories: [
      { id: 'catC', title: '生產時的醫療處置', acceptIds: [129, 1210, 1211, 1212], slotCount: 4 },
      { id: 'catD', title: '生產姿勢', acceptIds: [126, 127, 128], slotCount: 3 },
      { id: 'catE', title: '生產時的友善措施', acceptIds: [121, 122, 123, 124, 125], slotCount: 5 }
    ],
    images: [
      { id: 121, imgSrc: '/image/unit-11/unit友善措施-1.jpg' },
      { id: 122, imgSrc: '/image/unit-11/unit友善措施-2.jpg' },
      { id: 123, imgSrc: '/image/unit-11/unit友善措施-3.jpg' },
      { id: 124, imgSrc: '/image/unit-11/unit友善措施-4.jpg' },
      { id: 125, imgSrc: '/image/unit-11/unit友善措施-5.jpg' },
      { id: 126, imgSrc: '/image/unit-11/unit生產姿勢-1.jpg' },
      { id: 127, imgSrc: '/image/unit-11/unit生產姿勢-2.jpg' },
      { id: 128, imgSrc: '/image/unit-11/unit生產姿勢-3.jpg' },
      { id: 129, imgSrc: '/image/unit-11/unit生產醫療處置-1.jpg' },
      { id: 1210, imgSrc: '/image/unit-11/unit生產醫療處置-2.jpg' },
      { id: 1211, imgSrc: '/image/unit-11/unit生產醫療處置-3.jpg' },
      { id: 1212, imgSrc: '/image/unit-11/unit生產醫療處置-4.jpg' },
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