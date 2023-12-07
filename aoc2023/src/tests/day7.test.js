
const currentDay = 7

const day = require("../aoc2023/days/day"+currentDay)

let input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

test('day'+currentDay+'::part1', () => {
    expect(day.part1(input)).toBe(6440);
});

test('day'+currentDay+'::part2', () => {
    expect(day.part2(input)).toBe(5905);
});