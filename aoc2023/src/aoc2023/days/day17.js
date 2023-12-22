const {execSync} = require('child_process');

let visited = new Set()
let queue = [{"x":0, "y":0, "hl": 0, "dir":"S", "hop":-1}]

const part1 = (input) => {
    let ctmap = input
        .split("\n")
        .map((e, y) => e.split(""))
        .map(e => e.map(x => {return parseInt(x)}))

    while(queue.length > 0) {
        queue = queue.sort((a,b) => a.hl - b.hl)
        let node = queue.splice(0,1)[0]
        //console.log("current", node)
        if (visited.has(node.x+"-"+node.y+"-"+node.dir+"-"+node.hop)) {
            continue
        } 
        visited.add(node.x+"-"+node.y+"-"+node.dir+"-"+node.hop)

        let nx = node.x
        let ny = node.y

        if (node.x == ctmap[0].length-1 && node.y == ctmap.length-1) {
            //console.log(visited)
            //console.log(node.hl)
            queue = []
            return node.hl
        }

        let dir = node.dir

        switch (dir) {
            case "N":
                if (nx < ctmap[0].length - 1) { // east
                    queue.push({"x": nx+1, "y": ny, "hl": node.hl + ctmap[ny][nx+1], "dir": "E", "hop": 0})
                }
                if (nx > 0) { // west
                    queue.push({"x": nx-1, "y": ny, "hl": node.hl + ctmap[ny][nx-1], "dir": "W", "hop": 0})
                }
                if (ny > 0) { // north
                    if (node.hop < 2) {
                        queue.push({"x": nx, "y": ny-1, "hl": node.hl + ctmap[ny-1][nx], "dir": "N", "hop": node.hop+1})
                    }
                }
                break
            case "S":
                if (nx < ctmap[0].length - 1) { // east
                    queue.push({"x": nx+1, "y": ny, "hl": node.hl + ctmap[ny][nx+1], "dir": "E", "hop": 0})
                }
                if (nx > 0) { // west
                    queue.push({"x": nx-1, "y": ny, "hl": node.hl + ctmap[ny][nx-1], "dir": "W", "hop": 0})
                }
                if (ny < ctmap.length - 1) { // south
                    if (node.hop < 2) {
                        queue.push({"x": nx, "y": ny+1, "hl": node.hl + ctmap[ny+1][nx], "dir": "S", "hop": node.hop+1})
                    }
                }
                break
            case "E":
                if (ny < ctmap.length - 1) { // south
                    queue.push({"x": nx, "y": ny+1, "hl": node.hl + ctmap[ny+1][nx], "dir": "S", "hop": 0})
                }
                if (ny > 0) {  // north
                    queue.push({"x": nx, "y": ny-1, "hl": node.hl + ctmap[ny-1][nx], "dir": "N", "hop": 0})
                }
                if (nx < ctmap[0].length - 1) { // east
                    if (node.hop < 2) {
                        queue.push({"x": nx+1, "y": ny, "hl": node.hl + ctmap[ny][nx+1], "dir": "E", "hop": node.hop+1})
                    }
                }
                break             
            case "W":
                if (ny < ctmap.length - 1) { // south
                    queue.push({"x": nx, "y": ny+1, "hl": node.hl + ctmap[ny+1][nx], "dir": "S", "hop": 0})
                }
                if (ny > 0) {  // north
                    queue.push({"x": nx, "y": ny-1, "hl": node.hl + ctmap[ny-1][nx], "dir": "N", "hop": 0})
                }
                if (nx > 0) { // west
                    if (node.hop < 2) {
                        queue.push({"x": nx-1, "y": ny, "hl": node.hl + ctmap[ny][nx-1], "dir": "W", "hop": node.hop+1})
                    }
                }
                break                          
        }
    }
    
    return 0
}

const part2 = (input) => {
    visited = new Set()
    queue = [{"x":0, "y":0, "hl": 0, "dir":"S", "hop":-1}]

    let ctmap = input
        .split("\n")
        .map((e, y) => e.split(""))
        .map(e => e.map(x => {return parseInt(x)}))

    let maxHop = 10
    let dhop = 4

    while(queue.length > 0) {
        //queue = queue.sort((a,b) => a.hl - b.hl)
        let node = queue.splice(0,1)[0]
        if (visited.has(node.x+"-"+node.y+"-"+node.dir+"-"+node.hop)) {
            continue
        } 
        visited.add(node.x+"-"+node.y+"-"+node.dir+"-"+node.hop)

        //console.log(node)

        let nx = node.x
        let ny = node.y

        if (node.x == ctmap[0].length-1 && node.y == ctmap.length-1) {
            queue = []
            return node.hl
        }
        //console.log(node)
        let dir = node.dir
        let hl = node.hl
        switch (dir) {
            case "N":
                if (nx < ctmap[0].length - 4) { // east
                    for (i of [1,2,3,4]) {hl += ctmap[ny][nx+i] }
                    queue.push({"x": nx+4, "y": ny, "hl": hl, "dir": "E","hop": dhop})
                    queue = queue.sort((a,b) => a.hl - b.hl)
                }
                hl = node.hl
                if (nx > 4) { // west
                    for (i of [1,2,3,4]) {hl += ctmap[ny][nx-i] }
                    queue.push({"x": nx-4, "y": ny, "hl": hl, "dir": "W","hop": dhop})
                    queue = queue.sort((a,b) => a.hl - b.hl)
                }
                hl = node.hl
                if (ny > 1) { // north
                    if (node.hop < maxHop && node.hop > 3) {
                        for (i of [1]) {hl += ctmap[ny-i][nx] }
                        queue.push({"x": nx, "y": ny-1, "hl": hl, "dir": "N", "hop": node.hop+1})
                        queue = queue.sort((a,b) => a.hl - b.hl)
                    }
                }
                break
            case "S":
                if (nx < ctmap[0].length - 4) { // east
                    for (i of [1,2,3,4]) {hl += ctmap[ny][nx+i] }
                    queue.push({"x": nx+4, "y": ny, "hl": hl, "dir": "E","hop": dhop})
                    queue = queue.sort((a,b) => a.hl - b.hl)
                }
                hl = node.hl
                if (nx > 4) { // west
                    for (i of [1,2,3,4]) {hl += ctmap[ny][nx-i] }
                    queue.push({"x": nx-4, "y": ny, "hl": hl, "dir": "W","hop": dhop})
                    queue = queue.sort((a,b) => a.hl - b.hl)
                }
                hl = node.hl
                if (ny < ctmap.length - 1) { // south
                    if (node.hop < maxHop && node.hop > 3) {
                        for (i of [1]) {hl += ctmap[ny+i][nx] }
                        queue.push({"x": nx, "y": ny+1, "hl": hl, "dir": "S", "hop": node.hop+1})
                        queue = queue.sort((a,b) => a.hl - b.hl)
                    } else if (node.hop == -1) {
                        for (i of [1,2,3,4]) {hl += ctmap[ny+i][nx] }
                        queue.push({"x": nx, "y": ny+4, "hl": hl, "dir": "S", "hop": dhop})
                        queue = queue.sort((a,b) => a.hl - b.hl)
                    }
                }
                break
            case "E":
                if (ny < ctmap.length - 4) { // south
                    for (i of [1,2,3,4]) {hl += ctmap[ny+i][nx] }
                    queue.push({"x": nx, "y": ny+4, "hl": hl, "dir": "S","hop": dhop})
                    queue = queue.sort((a,b) => a.hl - b.hl)
                }
                hl = node.hl
                if (ny > 4) {  // north
                    for (i of [1,2,3,4]) {hl += ctmap[ny-i][nx] }
                    queue.push({"x": nx, "y": ny-4, "hl": hl, "dir": "N","hop": dhop})
                    queue = queue.sort((a,b) => a.hl - b.hl)
                }
                hl = node.hl
                if (nx < ctmap[0].length - 1) { // east
                    if (node.hop < maxHop && node.hop > 3) {
                        for (i of [1]) {hl += ctmap[ny][nx+i] }
                        queue.push({"x": nx+1, "y": ny, "hl": hl, "dir": "E", "hop": node.hop+1})
                        queue = queue.sort((a,b) => a.hl - b.hl)
                    }
                }
                break             
            case "W":
                if (ny < ctmap.length - 4) { // south
                    for (i of [1,2,3,4]) {hl += ctmap[ny+i][nx] }
                    queue.push({"x": nx, "y": ny+4, "hl": hl, "dir": "S","hop": dhop})
                    queue = queue.sort((a,b) => a.hl - b.hl)
                }
                hl = node.hl
                if (ny > 4) {  // north
                    for (i of [1,2,3,4]) {hl += ctmap[ny-i][nx] }
                    queue.push({"x": nx, "y": ny-4, "hl": hl, "dir": "N","hop": dhop})
                    queue = queue.sort((a,b) => a.hl - b.hl)
                }
                hl = node.hl
                if (nx > 1) { // west
                    if (node.hop < maxHop && node.hop > 3) {
                        for (i of [1]) {hl += ctmap[ny][nx-i] }
                        queue.push({"x": nx-1, "y": ny, "hl": hl, "dir": "W", "hop": node.hop+1})
                        queue = queue.sort((a,b) => a.hl - b.hl)
                    }
                }
                break                          
        }
    }
    return 0
}

exports.part1 = part1
exports.part2= part2

/*part1(`2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`)*/

/*console.log(part1(`11199
12199
99199
99131
99111`) == 9)

console.log(part1(`111
991
991`) == 4)*/

/*console.log(part1(`111111111111
999999999991
999999999991
999999999991
999999999991`))*/

/*console.log(part2(`111111111111
999999999991
999999999991
999999999991
999999999991`)) // 71

console.log(part2(`1111119999
9111111111
9199919991
9199919991
9199919991
9111119991
9999999991
9999999991
9999999991
9999999991`)) // 34 x5y0:5 x5y5:10 x1y5:14 x1y1:18 x9y1:26 xendy9: 34

console.log(part2(`2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`)) // 94

console.log(part2(`1111199999999999
9999199999999999
9999199999999999
9999199999999999
9999111111111111`)) */ // 51 x5y0 = 13 x5y4 41

/*console.log(part2(`19999
19999
19999
19999
11111`))*/ // 8