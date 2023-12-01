
const currentDay = 1

const day = require("../aoc2023/days/day"+currentDay)

test('day'+currentDay+'::part1', () => {
    let input = `1abc2
    pqr3stu8vwx
    a1b2c3d4e5f
    treb7uchet`
    expect(day.part1(input)).toBe(142);
});

test('day'+currentDay+'::part2 twoklhndseven6jdhcsccjgp68twonelb', () => {
    let input = `twoklhndseven6jdhcsccjgp68twonelb`
    expect(day.part2(input)).toBe(21);
});

test('day'+currentDay+'::part2', () => {
    let input = `two1nine
    eightwothree
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen`
    expect(day.part2(input)).toBe(281);
});