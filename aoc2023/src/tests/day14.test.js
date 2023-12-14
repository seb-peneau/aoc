
const currentDay = 14

const day = require("../aoc2023/days/day"+currentDay)

let input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`

test('day'+currentDay+'::part1', () => {
    expect(day.part1(input)).toBe(136);
});