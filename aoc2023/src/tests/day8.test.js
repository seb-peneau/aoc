
const currentDay = 8

const day = require("../aoc2023/days/day"+currentDay)

test('day'+currentDay+'::part1', () => {
    let input = `RL

    AAA = (BBB, CCC)
    BBB = (DDD, EEE)
    CCC = (ZZZ, GGG)
    DDD = (DDD, DDD)
    EEE = (EEE, EEE)
    GGG = (GGG, GGG)
    ZZZ = (ZZZ, ZZZ)`    
    expect(day.part1(input)).toBe(2);
});

test('day'+currentDay+'::part1', () => {
    let input = `LLR

    AAA = (BBB, BBB)
    BBB = (AAA, ZZZ)
    ZZZ = (ZZZ, ZZZ)`
    expect(day.part1(input)).toBe(6);
});


test('day'+currentDay+'::part2', () => {
    let input = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`
    expect(day.part2(input)).toBe(6);
});