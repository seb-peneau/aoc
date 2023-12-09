const computeNextValue = (line) => {
    let lin = line.split(" ").map(e => parseInt(e))
    let lastValues = []
    lastValues.push(lin[lin.length - 1])
    let current = lin.map(e => e)
    while(current.filter(e => e != 0).length > 0) {
        let temp = []
        current.forEach((v, index) => {
            if (index > 0) {
                temp.push(v - current[index-1])
            }
        })
        lastValues.splice(0, 0, temp[temp.length-1])
        current = temp
    }
    return lastValues.reduce((acc, current) => current+acc, 0)
}

const part1 = (input) => {
    return input
        .split("\n")
        .map(computeNextValue)
        .reduce((acc, current) => acc+current, 0)
}

const computeFirstValue = (line) => {
    let lin = line.split(" ").map(e => parseInt(e))
    let firstValues = []
    firstValues.push(lin[0])
    let current = lin.map(e => e)
    while(current.filter(e => e != 0).length > 0) {
        let temp = []
        current.forEach((v, index) => {
            if (index > 0) {
                temp.push(v - current[index-1])
            }
        })
        firstValues.splice(0, 0, temp[0])
        current = temp
    }
    return firstValues.reduce((acc, current) => current-acc, 0)
}

const part2 = (input) => {
    return input
        .split("\n")
        .map(computeFirstValue)
        .reduce((acc, current) => acc+current, 0)
}

exports.part1 = part1
exports.part2= part2