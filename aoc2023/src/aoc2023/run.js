const fs = require('fs')
const path = require('path')
const days = [
    "./days/day1",
    "./days/day2",
    "./days/day3",
    "./days/day4",
    "./days/day5",
    "./days/day6",
    "./days/day7",
    "./days/day8",
    "./days/day9",
    "./days/day10",
].map(require);

const runParameter = process.argv[2]

const run = (day, script) => {
    let input1 = fs.readFileSync(path.resolve(__dirname, './ressources/day'+day+'.txt'), 'utf8')
    let start = new Date()
    let part1 = script.part1(input1)
    if (day == 10) {
        console.warn("Should be call with node --stack-size=20000 ./src/aoc2023/run.js 10")
    }
    console.log("day" + day + " part 1 :", part1, "in", new Date() - start, "ms")
    start = new Date()
    let part2 = script.part2(input1)
    console.log("day" + day + " part 2 :", part2, "in", new Date() - start, "ms")
}


if (runParameter != "all") {
    run(runParameter, days[parseInt(runParameter)-1])
} else {
    days.forEach((day, index) => {
        run(index+1, day)
    })
}