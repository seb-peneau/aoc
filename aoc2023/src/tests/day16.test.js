
const currentDay = 16

const day = require("../aoc2023/days/day"+currentDay)

let input = `.|...L....
|.-.L.....
.....|-...
........|.
..........
.........L
..../.LL..
.-.-/..|..
.|....-|.L
..//.|....`

test('day'+currentDay+'::part1', () => {
    expect(day.part1(input)).toBe(46);
});

test('day'+currentDay+'::part2', () => {
    //expect(day.part2(input)).toBe(145);
});