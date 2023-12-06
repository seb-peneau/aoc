const part1 = (input) => {
    let lines = input.split("\n")
    let times = lines[0].replace("Time:","").split(" ").filter(e => e!="").map(e => parseInt(e))
    let records = lines[1].replace("Distance:","").split(" ").filter(e => e!="").map(e => parseInt(e))
    return times
        .map((time, index) => {
            let beatn = 0
            for (let i = 1; i < time; i++) {
                let d = (time-i)*i
                if (d > records[index]) {
                    beatn++
                }
            }
            return beatn
        })
        .reduce((acc, current) => acc*current, 1)
}

const part2 = (input) => {
    let lines = input.split("\n")
    let time = parseInt(lines[0].replace("Time:","").replaceAll(" ", ""))
    let record = parseInt(lines[1].replace("Distance:","").replaceAll(" ", ""))
    let beatn = 0
    for (let i = 1; i < time; i++) {
        let d = (time-i)*i
        if (d > record) {
            beatn++
        }
    }
    return beatn
}

exports.part1 = part1
exports.part2= part2