
const debug = (minX, maxX, minY, maxY, edges, visited) => {
    console.clear()
    let c = 0
    for (let i = minY; i <= maxY; i++) {
        let temp = []
        for (let j = minX; j <= maxX; j++) {
            if (edges.filter(x => x.x == j && x.y == i).length != 0) {
                c++
                temp.push("#")
            } else if (visited.filter(x => x.x == j && x.y == i).length != 0) {
                c++
                temp.push("i")
            } else temp.push(".") 
        }
        console.log(temp.join(""))
    }
    return c
}

const part1 = (input) => {
    let edges = []
    let current = {"x": 0, "y": 0}
    let ed = []
    //edges.push(current)
    input.split("\n").forEach(line => {
        let l = line.split(" ")
        let dir = l[0]
        let n = parseInt(l[1])
        if (dir == "R") {
            ed.push({"x": current.x + n, "y": current.y})
            current = {"x": current.x + n, "y": current.y}
        }
        if (dir == "L") {
            ed.push({"x": current.x - n, "y": current.y})
            current = {"x": current.x - n, "y": current.y}
        }
        if (dir == "U") {
            ed.push({"x": current.x, "y": current.y+n})
            current = {"x": current.x, "y": current.y+n}
        }
        if (dir == "D") {
            ed.push({"x": current.x, "y": current.y-n})
            current = {"x": current.x, "y": current.y-n}
        }
        /*for (let i = 0; i < n; i++) {
            let c = {"x": current.x, "y":current.y}
            if (dir == "R") { c.x++ }
            if (dir == "U") { c.y-- }
            if (dir == "L") { c.x-- }
            if (dir == "D") { c.y++ }
            edges.push(c)
            current = c
        }*/
    })

    /*let minX = Math.min(...edges.map(x => x.x))
    let maxX = Math.max(...edges.map(x => x.x))
    let minY = Math.min(...edges.map(x => x.y))
    let maxY = Math.max(...edges.map(x => x.y))*/
    
    let row1 = 0
    let perimeter = 0
    ed.forEach((e, index) => {
        if (index < ed.length-1) {
            row1 = row1 + (((ed[index+1].x * e.y) - (e.x * ed[index+1].y)))
            perimeter += Math.sqrt(Math.pow(ed[index+1].x - e.x, 2) + Math.pow(ed[index+1].y - e.y, 2))
        } else {
            row1 = row1 + (((ed[0].x * e.y) - (e.x * ed[0].y)))
            perimeter += Math.sqrt(Math.pow(ed[0].x - e.x, 2) + Math.pow(ed[0].y - e.y, 2))
        }
        
    })

    /*let doCountX = false
    let c = 0
    let visited = []
    for (let i = minY; i <= maxY; i++) {
        doCountX = false
        let topOpen = false
        let downOpen = false
        //console.log("newLIne", i, maxY)
        for (let j = minX; j <= maxX; j++) {

            let current = "."
            elem = edges.filter(x => x.y == i && x.x == j)
            if (elem.length > 0) {
                current = "#"
            }
            if (current == "#") {
                let tCurrent = "."
                elem = edges.filter(x => x.y == i-1 && x.x == j)
                if (elem.length > 0) {
                    tCurrent = "#"
                }
                let dCurrent = "."
                elem = edges.filter(x => x.y == i+1 && x.x == j)
                if (elem.length > 0) {
                    dCurrent = "#"
                }
                if (tCurrent == current) {
                    topOpen = !topOpen
                }
                if (dCurrent == current) {
                    downOpen = !downOpen
                }                
            }
            //doCountX = open1 == true || open2 == true || open3 == true
            //console.log(j, i, current, topOpen, downOpen)

            if (current != "#" && topOpen == true && downOpen == true) {
                visited.push({"x": j, "y":i})
                c++
            }
        }
    }*/
    //debug(minX, maxX, minY, maxY, edges, visited)
    return (row1 / 2) + perimeter / 2 +1
    //return c + edges.length
}

const part2 = (input) => {
    let ed = []
    let current = {"x": 0, "y": 0}
    input.split("\n").forEach(line => {
        let l = line.split(" ")
        let hexa = l[2].substring(2, l[2].length-2)
        let dir = l[2].substring(l[2].length-2, l[2].length-1)
        if (parseInt(dir) == 0) { dir = "R" }
        if (parseInt(dir) == 1) { dir = "D" }
        if (parseInt(dir) == 2) { dir = "L" }
        if (parseInt(dir) == 3) { dir = "U" }
        let n = parseInt(hexa, 16)
        if (dir == "R") {
            ed.push({"x": current.x + n, "y": current.y})
            current = {"x": current.x + n, "y": current.y}
        }
        if (dir == "L") {
            ed.push({"x": current.x - n, "y": current.y})
            current = {"x": current.x - n, "y": current.y}
        }
        if (dir == "U") {
            ed.push({"x": current.x, "y": current.y+n})
            current = {"x": current.x, "y": current.y+n}
        }
        if (dir == "D") {
            ed.push({"x": current.x, "y": current.y-n})
            current = {"x": current.x, "y": current.y-n}
        }
    })

    let row1 = 0
    let perimeter = 0
    ed.forEach((e, index) => {
        if (index < ed.length-1) {
            row1 = row1 + (((ed[index+1].x * e.y) - (e.x * ed[index+1].y)))
            perimeter += Math.sqrt(Math.pow(ed[index+1].x - e.x, 2) + Math.pow(ed[index+1].y - e.y, 2))
        } else {
            row1 = row1 + (((ed[0].x * e.y) - (e.x * ed[0].y)))
            perimeter += Math.sqrt(Math.pow(ed[0].x - e.x, 2) + Math.pow(ed[0].y - e.y, 2))
        }
        
    })
    return (row1 / 2) + perimeter / 2 +1

}

exports.part1 = part1
exports.part2= part2

/*console.log(part1(`R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`))*/