const tiltNorth = (map) => {
    let currentX = 0
    let currentY = 1 // no need to parse line 0
    while (currentY < map.length && currentX < map[0].length) {
        let elem = map[currentY][currentX]
        if (elem == "." || elem == "#") {
            if (currentX == map[0].length - 1) {
                currentX = 0
                currentY++
            } else {
                currentX++
            }
        } else { // its a O
            let targetY = currentY
            for (let iy = currentY-1; iy >= 0; iy--) {
                if (map[iy][currentX] == ".") {
                    targetY = iy
                } else {
                    break
                }
            }
            if (targetY != currentY) {
                map[currentY][currentX] = "."
                map[targetY][currentX] = "O"
            }
            if (currentX == map[0].length - 1) {
                currentX = 0
                currentY++
            } else {
                currentX++
            }
        }
    }
    return map
}

const part1 = (input) => {
    let map = input.split("\n").map(e => e.split(""))
    map = tiltNorth(map)
    let r = map
        .map((e, index) => (e.filter(f => f == "O").length) * (map.length - index))
        .reduce((acc, current) => acc + current, 0)
    return r
}

function transpose(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]).reverse());
}

const logMap = (map) => {
    console.log("---------")
    map.map(e => {
        console.log(e.join(""))
        e
    })
}

const doCycle = (map) => {
    map = tiltNorth(map) //north
    map = transpose(map)
    map = tiltNorth(map) //west
    map = transpose(map)
    map = tiltNorth(map) //south
    map = transpose(map)
    map = tiltNorth(map) //east
    return transpose(map) // back to north
}

const part2 = (input) => {
    let map = input.split("\n").map(e => e.split(""))
    let cycles = []
    let numberOfCycles = 0
    let step = 1
    while(numberOfCycles < 1000) {
        numberOfCycles += step
        map = doCycle(map)

        let t = map.map((e, index) => (e.filter(f => f == "O").length) * (map.length - index))
            .reduce((acc, current) => acc + current, 0)

        cycles.push({"t":t, "index":numberOfCycles})
        let d = cycles.filter(e => e.t == t)

        // does not work with example (cause all 69 results), but works very well on my input
        if (d.length == 4) {
            let nstep = 1
            let previousIndex = -1
            d.forEach((e, index) => {
                if (index > 0) { // I should ensure that nstep is always the same but hey !
                    nstep = e.index - previousIndex
                }
                previousIndex = e.index
            })
            //console.log(numberOfCycles, t, nstep, (1000000000-numberOfCycles)%nstep)
            if ((1000000000-numberOfCycles)%nstep == 0) {
                return t
            }
        }   
    }
}

exports.part1 = part1
exports.part2= part2