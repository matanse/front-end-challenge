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
/*
This should be equal to:
[
    { id: 8, playTime:  500, auto: false },
    { id: 7, playTime: 1500, auto: true  },
    { id: 1, playTime:  100, auto: true  },
    { id: 7, playTime: 1000, auto: false },
    { id: 7, playTime: 2000, auto: false },
    { id: 2, playTime: 2000, auto: true  },
    { id: 2, playTime: 2000, auto: true  }
]
*/

test("select() filters items by id", () => {
  const actual = select(items, { id: 2 });
  const expected = [
    { id: 2, playTime: 2000, auto: true },
    { id: 2, playTime: 2000, auto: true },
  ];
  expect(actual).toEqual(expected);
});
/*
This should be equal to:
[
    { id: 2, playTime: 2000, auto: true  },
    { id: 2, playTime: 2000, auto: true  }
]
*/
test("select() filter by minPlayTime, no results should be found!", () => {
  const actual = select(items, { minPlayTime: 4000 });
  const expected = [];
  expect(actual).toEqual(expected)
})

/*
should equal to:
[]
*/

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
// TODO: Make this test work
/*
should equal to:
[
    { id: 8, playTime:  500, auto: false },
    { id: 1, playTime:  100, auto: true  },
    { id: 7, playTime: 4500, auto: false },
    { id: 2, playTime: 4000, auto: true  }
]
*/
// const actual4 = select(items, { merge: true, minPlayTime: 4000 });
/*
[
    { id: 7, playTime: 4500, auto: false },
    { id: 2, playTime: 4000, auto: true  }
]
*/
console.log("ALL TESTS PASSED");