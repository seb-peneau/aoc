
const currentDay = 10

const day = require("../aoc2023/days/day"+currentDay)


test('day'+currentDay+'::part1', () => {
    let input = `.....
.S-7.
.|.|.
.L-J.
.....`;    
    expect(day.part1(input)).toBe(4);
});

test('day'+currentDay+'::part1.2', () => {
    let input = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;    
    expect(day.part1(input)).toBe(4);
});

test('day'+currentDay+'::part1.3', () => {
    let input = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;    
    expect(day.part1(input)).toBe(8);
});

test('day'+currentDay+'::part1.4', () => {
    let input = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;    
    expect(day.part1(input)).toBe(8);
});

test('day'+currentDay+'::part2', () => {
    let input = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;       
    expect(day.part2(input)).toBe(4);
});

test('day'+currentDay+'::part2.1', () => {
    let input = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`;
    expect(day.part2(input)).toBe(8);
});

test('day'+currentDay+'::part2.1', () => {
    let input = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;
    expect(day.part2(input)).toBe(10);
});