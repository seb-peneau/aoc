
const currentDay = 15

const day = require("../aoc2023/days/day"+currentDay)

let input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`

test('day'+currentDay+'::part1', () => {
    expect(day.part1(input)).toBe(1320);
});

test('day'+currentDay+'::part2', () => {
    expect(day.part2(input)).toBe(145);
});