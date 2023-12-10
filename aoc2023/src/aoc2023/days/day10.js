const findS = (map) => {
    let ys = -1
    let xs = -1    
    for (let y = 0; y < map.length; y++) {
        if (map[y].indexOf("S") != -1) {
            ys = y
            xs = map[y].indexOf("S")
            y = map.length
        }
    }
    return {"y": ys, "x": xs}
}

const findLoop = (map, previousNode, currentNode, loop) => {
    if (currentNode.y >= map.length
         || currentNode.x >= map[0].length
         || currentNode.y < 0 || currentNode.x < 0) { // out of band
            console.log("outofband")
            return []
    }
    let val = map[currentNode.y][currentNode.x]
    currentNode.val = val
    if (map[currentNode.y][currentNode.x] == "S") {
        return loop
    }
    if (val == ".") { // no loop with .
        return []
    } else if (previousNode.x - currentNode.x < 0) {
        // coming from east to west
        switch(val) {
            case "-":
                loop.push(currentNode)
                return findLoop(map, currentNode, {"y": currentNode.y, "x":currentNode.x + 1}, loop)
            case "J":
                loop.push(currentNode)
                return findLoop(map, currentNode, {"y": currentNode.y-1, "x":currentNode.x}, loop)
            case "7":
                loop.push(currentNode)
                return findLoop(map, currentNode, {"y": currentNode.y+1, "x":currentNode.x}, loop)
            default: // not possible
                return []
        }
    } else if (previousNode.x - currentNode.x > 0) {
        // coming from west to east
        switch(val) {
            case "-":
                loop.push(currentNode)
                return findLoop(map, currentNode, {"y": currentNode.y, "x":currentNode.x - 1}, loop)
            case "F":
                loop.push(currentNode)
                return findLoop(map, currentNode, {"y": currentNode.y+1, "x":currentNode.x}, loop)
            case "L":
                loop.push(currentNode)
                return findLoop(map, currentNode, {"y": currentNode.y-1, "x":currentNode.x}, loop)
            default: // not possible
                return []
        }
    } else if (previousNode.y - currentNode.y < 0) {
        // coming from north to south
        switch(val) {
            case "|":
                loop.push(currentNode)
                return findLoop(map, currentNode, {"y": currentNode.y+1, "x":currentNode.x}, loop)
            case "L":
                loop.push(currentNode)
                return findLoop(map, currentNode, {"y": currentNode.y, "x":currentNode.x+1}, loop)
            case "J":
                loop.push(currentNode)
                return findLoop(map, currentNode, {"y": currentNode.y, "x":currentNode.x-1}, loop)
            default: // not possible
                return []
        }
    } else if (previousNode.y - currentNode.y > 0) {
        // coming from south to north
        switch(val) {
            case "|":
                loop.push(currentNode)
                return findLoop(map, currentNode, {"y": currentNode.y-1, "x":currentNode.x}, loop)
            case "F":
                loop.push(currentNode)
                return findLoop(map, currentNode, {"y": currentNode.y, "x":currentNode.x+1}, loop)
            case "7":
                loop.push(currentNode)
                return findLoop(map, currentNode, {"y": currentNode.y, "x":currentNode.x-1}, loop)
            default: // not possible
                return []
        }
    }

}

const part1 = (input) => {
    let map = input.split("\n")
        .map(lines => lines.split(""))

    let S = findS(map)

    var loop = findLoop(map, S, {"y": S.y, "x": S.x - 1}, [])
    if (loop.length == 0) {
        loop = findLoop(map, S, {"y": S.y, "x": S.x + 1}, [])
    }
    if (loop.length == 0) {
        loop = findLoop(map, S, {"y": S.y + 1, "x": S.x}, [])
    }
    if (loop.length == 0) {
        loop = findLoop(map, S, {"y": S.y - 1, "x": S.x}, [])
    }
    loop = loop.map((_, index) => Math.min(index+1, loop.length-index))
    return Math.max(...loop)
}

const part2 = (input) => {
    let map = input.split("\n")
        .map(lines => lines.split(""))

    let S = findS(map)

    var loop = findLoop(map, S, {"y": S.y, "x": S.x - 1}, [])
    if (loop.length == 0) {
        loop = findLoop(map, S, {"y": S.y, "x": S.x + 1}, [])
    }
    if (loop.length == 0) {
        loop = findLoop(map, S, {"y": S.y + 1, "x": S.x}, [])
    }
    if (loop.length == 0) {
        loop = findLoop(map, S, {"y": S.y - 1, "x": S.x}, [])
    }
    loop = loop.map((e, index) => {
        e.dist = Math.min(index+1, loop.length-index)
        return e
    })

    loop.push({"y": S.y, "x": S.x, "val": "S", "dist":0})

    let count = 0
    let zeroMap = map.map(e => e)
    let open = false
    for (let y = 0; y < map.length; y++) {
        open = false
        for (let x = 0; x < map[0].length; x++) {
            let e = loop.filter(e => e.x == x && e.y == y)
            if (e.length == 1) {
                e = e[0]
                if (e.val == "|" || e.val == "7" || e.val == "F" || e.val == "S") {
                    open = !open
                }
                zeroMap[y][x] = e.val
            } else {
                if (!open) {
                    zeroMap[y][x] = 0
                } else {
                    zeroMap[y][x] = 1
                    count++
                }
            }
        }
    }
    return count
}

exports.part1 = part1
exports.part2= part2