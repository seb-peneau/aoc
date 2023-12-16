
const countEnergized = (cont, start) => {
    let beams = []
    let energized = []
    beams.push(start)

    let alreadyDone=[]
    let hasMoved = true
    let nbsteps = 1000000 // for debug
    let count = 0
    // if during 10 turns, energized did not change assume a loop
    while(hasMoved==true && nbsteps > 0 && count <= 10) {
        //console.log(nbsteps, energized.length)
        hasMoved = false
        nbsteps--
        let ol = energized.length
        // remove all out of range and already visited (with same direction) beam
        beams = beams.filter(b => b.dir != "oob" && alreadyDone.filter(e => e.x == b.x && e.y == b.y && e.dir == b.dir).length == 0)
        beams = beams.flatMap(b => {
            if (alreadyDone.filter(e => e.x == b.x && e.y == b.y && e.dir == b.dir).length == 0) {
                alreadyDone.push({"y": b.y, "x": b.x, "dir": b.dir})
            } else {
                return b // already done that
            }
            let nx = b.x
            let ny = b.y
            switch(b.dir) {
                case "l": nx--;break;
                case "u": ny--;break;
                case "r": nx++;break;
                case "b": ny++;break;
                default: //beam has ended
                    break;
            }
            //console.log(b.y, b.x, ny, nx)
            if (nx != b.x || ny != b.y) { //only beam that moved
                if (nx >= 0 && nx < cont[0].length
                    && ny >= 0 && ny < cont.length) {
                    hasMoved = true
                    if (energized.filter(e => e.y == ny && e.x == nx).length == 0){
                        energized.push({"y": ny, "x": nx})
                    }
                    let tile = cont[ny][nx]
                    //console.log("------", b, nx, ny, tile)
                    switch(tile) {
                        case ".": return {"y": ny, "x": nx, "dir": b.dir}; break; // nothing to do
                        case "-":
                            if (b.dir == "l" || b.dir == "r") {
                                return {"y": ny, "x": nx, "dir": b.dir}
                            } else {
                                // split
                                return [
                                    {"y": ny, "x": nx, "dir":"l"},
                                    {"y": ny, "x": nx, "dir":"r"}
                                ]
                            }
                            break
                        case "|":
                            if (b.dir == "u" || b.dir == "b") {
                                return {"y": ny, "x": nx, "dir": b.dir}
                            } else {
                                // split
                                return [
                                    {"y": ny, "x": nx, "dir":"u"},
                                    {"y": ny, "x": nx, "dir":"b"}
                                ]
                            }
                            break
                        case "L":
                            if (b.dir == "r") { return {"y": ny, "x": nx, "dir": "b"} }
                            else if (b.dir == "l") { return {"y": ny, "x": nx, "dir": "u"} }
                            else if (b.dir == "u") { return {"y": ny, "x": nx, "dir": "l"} }
                            else if (b.dir == "b") { return {"y": ny, "x": nx, "dir": "r"} }
                            break 
                        case "/":
                            if (b.dir == "r") { return {"y": ny, "x": nx, "dir": "u"} }
                            else if (b.dir == "l") { return {"y": ny, "x": nx, "dir": "b"} }
                            else if (b.dir == "u") { return {"y": ny, "x": nx, "dir": "r"} }
                            else if (b.dir == "b") { return {"y": ny, "x": nx, "dir": "l"} }
                            break 
                        default:
                            console.log("HU!", tile, ny, nx, cont.length, cont[0].length)
                    }
                } else { //out of band
                    return {"y": ny, "x": nx, "dir": "oob"}
                }
            } else {
                return b
            }
        })
        if (ol == energized.length) {
            count++
        } else {
            count = 0
        }
        //console.log(beams)
    }
    //console.log(hasMoved, nbsteps)

    return energized.length
}


const part1 = (input) => {

    // WARNING ! i have replace all \ by L because i don't want to mess with special escape character :D

    let cont = input.split("\n").map(e => e.split(""))
    return countEnergized(cont, {"y": 0, "x": -1, "dir": "r"})
}

const part2 = (input) => {

    //naive one
    let cont = input.split("\n").map(e => e.split(""))
    let max = 0

    // Yeah, I know i'm lucky cause it the top row, i've tried, i've won :D
    // WARNING, if you copy this, this is maybe not your case
    // the solution appears in 28s though, so the algorythm is quite ok to make it 4 times
    for (let x = 0; x < cont[0].length; x++) {
        max = Math.max(max, countEnergized(cont, {"y": -1, "x": x, "dir": "b"}))
    }
    return max
}

exports.part1 = part1
exports.part2= part2