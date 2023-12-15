
const currentDay = 13

const day = require("../aoc2023/days/day"+currentDay)

let input = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`

test('day'+currentDay+'::part1', () => {
    expect(day.part1(input)).toBe(405);
});

test('day'+currentDay+'::part2', () => {
    expect(day.part2(input)).toBe(400);
});