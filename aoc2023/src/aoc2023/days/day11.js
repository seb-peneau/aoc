const getEmptyIndexes = (universe) => {
    let emptyRowsIndex = universe.map((line, index) => {
        if (line.indexOf("#") == -1) {
            return index
        } else {
            return -1
        }
    }).filter(e => e >= 0)
    universe = universe.map(line => line.split(""))
    let transposedUniverse = universe[0].map((_, colIndex) => universe.map(row => row[colIndex]))
    let emptyColsIndex = transposedUniverse.map((line, index) => {
        if (line.indexOf("#") == -1) {
            return index
        } else {
            return -1
        }
    }).filter(e => e >= 0)
    return {"emptyRowsIndexes": emptyRowsIndex, "emptyColsIndex": emptyColsIndex}
}

const resolveWith = (input, expansion) => {
    let universe = input.split("\n")
    let emptyIndex = getEmptyIndexes(universe)
    //console.log(emptyIndex)
    
    let galaxys = []
    universe.forEach((line, y) => {
        let regex = /#/gi, result;
        while ((result = regex.exec(line)) ) {
            galaxys.push({"y":y, "x":result.index})
        }
    })
    //console.log(galaxys)

    let distances = new Map()

    galaxys.forEach((g, index) => {
        galaxys.forEach((g2, index2) => {
            if (index != index2) {
                let label = ""
                if (index > index2) {
                    label = index2 + "-" + index
                } else {
                    label = index + "-" + index2
                }
                if (!distances.has(label)) {
                    let d = Math.abs(g.x - g2.x) + Math.abs(g.y - g2.y)
                    emptyIndex.emptyColsIndex.forEach(index => {
                        if ((g.x > g2.x && index > g2.x && index < g.x)
                            || (g.x < g2.x && index > g.x && index < g2.x)) {
                            d = d + expansion
                        }
                    })
                    emptyIndex.emptyRowsIndexes.forEach(index => {
                        if ((g.y > g2.y && index > g2.y && index < g.y)
                            || (g.y < g2.y && index > g.y && index < g2.y)) {
                            d = d + expansion
                        }
                    })                    
                    distances.set(label, d)
                }
            }
        })
    })
    distances = Array.from(distances, ([_, value]) => (value));
    return distances.reduce((acc, current) => acc+current, 0)
}

const part1 = (input) => {
    return resolveWith(input, 1)
}

const part2 = (input) => {
    return resolveWith(input, 999999)
}

exports.part1 = part1
exports.part2= part2
exports.resolveWith = resolveWith