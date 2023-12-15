
const currentDay = 12

const day = require("../aoc2023/days/day"+currentDay)

let input = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`

test('day'+currentDay+'::part1', () => {
    expect(day.part1(input)).toBe(21);
});

test('day'+currentDay+'::part2', () => {
    expect(day.part2(input)).toBe(525152);
});