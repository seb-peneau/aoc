
const currentDay = 11

const day = require("../aoc2023/days/day"+currentDay)

let input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`

test('day'+currentDay+'::part1', () => {
    expect(day.part1(input)).toBe(374);
});

test('day'+currentDay+'::part2', () => {
    expect(day.resolveWith(input, 9)).toBe(1030);
});

test('day'+currentDay+'::part2.2', () => {
    expect(day.resolveWith(input, 99)).toBe(8410);
});