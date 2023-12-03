const fs = require('fs')
const path = require('path')
const days = [
    "./days/day1",
    "./days/day2",
    "./days/day3",
].map(require);

const runParameter = process.argv[2]

const run = (day, script) => {
    let input1 = fs.readFileSync(path.resolve(__dirname, './ressources/day'+day+'.txt'), 'utf8')
    let start = new Date()
    let part1 = script.part1(input1)
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