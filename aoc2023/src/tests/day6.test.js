
const currentDay = 6

const day = require("../aoc2023/days/day"+currentDay)

let input = `Time:      7  15   30
Distance:  9  40  200`

test('day'+currentDay+'::part1', () => {
    expect(day.part1(input)).toBe(288);
});

test('day'+currentDay+'::part2', () => {
    expect(day.part2(input)).toBe(71503);
});