
const currentDay = 9

const day = require("../aoc2023/days/day"+currentDay)

let input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`

test('day'+currentDay+'::part1', () => {
    expect(day.part1(input)).toBe(114);
});

test('day'+currentDay+'::part2', () => {
    expect(day.part2(input)).toBe(2);
});