const part1 = (input, nbSteps = 64) => {
    let stepsh = []
    let s = {"y":-1, "x": -1}
    let map = input.split("\n")
        .map(e => e.split(""))
    map.forEach((line, y) => {
        line.forEach((el, x) => {
            if (el == "S") {
                s.x = x
                s.y = y
            }
        })
    })
    stepsh.push(s)
    while(nbSteps > 0) {
        nbSteps--
        let visited = new Set()
        stepsh = stepsh.flatMap(e => {
            let r = []
            for (let dx of [-1, 1]) {
                if (e.x+dx >= 0 && e.x+dx < map[0].length && map[e.y][e.x+dx] != "#") {
                    if (!visited.has("x"+(e.x+dx)+"-y-"+(e.y))) {
                        visited.add("x"+(e.x+dx)+"-y-"+(e.y))
                        r.push({"y": e.y, "x": e.x+dx})
                    }
                }
            }
            for (let dy of [-1, 1]) {
                if (e.y+dy >= 0 && e.y+dy < map.length && map[e.y+dy][e.x] != "#") {
                    if (!visited.has("x"+(e.x)+"-y-"+(e.y+dy))) {
                        visited.add("x"+(e.x)+"-y-"+(e.y+dy))
                        r.push({"y": e.y+dy, "x": e.x})
                    }
                }
            }
            return r
        })
        // too long use an index instead
        /*stepsh.forEach(e => {
            if (stepsh.filter(x => x.x == e.x && x.y == e.y).length > 1) {
                stepsh = stepsh.filter(x => !(x.x == e.x && x.y == e.y))
                stepsh.push(e)
            }
        })*/
        //console.log(stepsh.sort((a,b) => a.y - b.y))
    }
    return stepsh.length
}

//https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
Number.prototype.mod = function (n) {
    "use strict";
    return ((this % n) + n) % n;
};

const makeStep = (map, s, stepsh) => {
    let visited = new Set()
    stepsh = stepsh.flatMap(e => {
        let r = []
        for (let dx of [-1, 1]) {
            let nx = e.x+dx
            let ny = e.y
            if (nx > map[0].length - 1 || nx < 0) {nx = nx.mod(map[0].length)}
            if (ny > map.length - 1 || ny < 0) {ny = ny.mod(map.length)}
            if (map[ny][nx] != "#") {
                if (!visited.has("x"+(e.x+dx)+"-y"+(e.y))) {
                    visited.add("x"+(e.x+dx)+"-y"+(e.y))
                    r.push({"y": e.y, "x": e.x+dx})
                }
            }
        }
        for (let dy of [-1, 1]) {
            let nx = e.x
            let ny = e.y+dy
            if (nx > map[0].length - 1 || nx < 0) {nx = nx.mod(map[0].length)}
            if (ny > map.length - 1 || ny < 0) {ny = ny.mod(map.length)}          
            if (map[ny][nx] != "#") {
                if (!visited.has("x"+(e.x)+"-y"+(e.y+dy))) {
                    visited.add("x"+(e.x)+"-y"+(e.y+dy))
                    r.push({"y": e.y+dy, "x": e.x})
                }
            }
        }
        return r
    })
    return stepsh
}

const run = (input, nbSteps) => {
    let r = []
    let s = {"y":-1, "x": -1}
    let map = input.split("\n")
        .map(e => e.split(""))
    map.forEach((line, y) => {
        line.forEach((el, x) => {
            if (el == "S") {
                s.x = x
                s.y = y
            }
        })
    })
    let ns = 0
    r.push(s)
    while(ns < nbSteps) {
        ns++
        r = makeStep(map, s, r)
    }
    return r.length
}


//https://www.reddit.com/r/adventofcode/comments/18nevo3/comment/keb6a53/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
//https://pastebin.com/d0tD8Uwx
const simplifiedLagrange = (values) => {
    return {
      a: values[0] / 2 - values[1] + values[2] / 2,
      b: -3 * (values[0] / 2) + 2 * values[1] - values[2] / 2,
      c: values[0],
    };
  };

const part2 = (input, maxSteps = 26501365) => {

    let map = input.split("\n")
        .map(e => e.split(""))
    let magicNumber = maxSteps % map.length

    //let values = [part1(input, magicNumber), part1(input, magicNumber + map.length), part1(input, magicNumber + (2 * map.length))]
    let values = [run(input, magicNumber), run(input, magicNumber + map.length), run(input, magicNumber + 2 * map.length) ]
    let sl = simplifiedLagrange(values)

    let target = (maxSteps - magicNumber) / map.length

    return (sl.a * target * target) + (sl.b * target) + sl.c
}

exports.part1 = part1
exports.part2= part2

/*console.log(part1(`...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`, 6))*/

/*console.log(part2(`...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`, 500))*/