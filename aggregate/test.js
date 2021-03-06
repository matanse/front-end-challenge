const select = require("./select.js");

const items = [
  { id: 8, playTime: 500, auto: false },
  { id: 7, playTime: 1500, auto: true },
  { id: 1, playTime: 100, auto: true },
  { id: 7, playTime: 1000, auto: false },
  { id: 7, playTime: 2000, auto: false },
  { id: 2, playTime: 2000, auto: true },
  { id: 2, playTime: 2000, auto: true }
]

test("select() returns input array when request options are not defined", () => {
  const actual = select(items);
  const expected = [
    { id: 8, playTime: 500, auto: false },
    { id: 7, playTime: 1500, auto: true },
    { id: 1, playTime: 100, auto: true },
    { id: 7, playTime: 1000, auto: false },
    { id: 7, playTime: 2000, auto: false },
    { id: 2, playTime: 2000, auto: true },
    { id: 2, playTime: 2000, auto: true },
  ]
  expect(actual).toEqual(expected);
});

test("select() filters items by id", () => {
  const actual = select(items, { id: 2 });
  const expected = [
    { id: 2, playTime: 2000, auto: true },
    { id: 2, playTime: 2000, auto: true },
  ];
  expect(actual).toEqual(expected);
});

test("select() filter by minPlayTime:4000, no results should be found!", () => {
  const actual = select(items, { minPlayTime: 4000 });
  const expected = [];
  expect(actual).toEqual(expected)
})

test("select() filter by minPlayTime:2000, 3 results!", () => {
  const actual = select(items, { minPlayTime: 2000 });
  const expected = [
    { id: 7, playTime: 2000, auto: false },
    { id: 2, playTime: 2000, auto: true },
    { id: 2, playTime: 2000, auto: true },
  ];
  expect(actual).toEqual(expected)
})

test("select() passed merge as true.", ()=>{
  const actual = select(items, { merge: true });
  const expected = [
  { id: 8, playTime: 500, auto: false },
  { id: 1, playTime: 100, auto: true },
  { id: 7, playTime: 4500, auto: false },
  { id: 2, playTime: 4000, auto: true },
];
expect(actual).toEqual(expected)
})

test("'merge:true' and minPlayTime were set.", ()=>{
  const actual = select(items, { merge: true, minPlayTime: 4000 })
  const expected = [
    { id: 7, playTime: 4500, auto: false },
    { id: 2, playTime: 4000, auto: true  }
]
expect(actual).toEqual(expected)
})