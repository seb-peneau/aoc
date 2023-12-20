let nbLow = 0
let nbHigh = 0
let count = 0
let countRx = 0
let previouses = new Map()
const sendHigh = (map, target, orig) => {
    nbHigh++
    let targets = []
    target = target.replaceAll(" ", "")
    let bd = map.get(target)
    
    //cycle detection for part2
    if (target == "gf") { 
        previouses.set(orig, count)
    }
    //console.log(orig, "high", target)
    if (!bd) {
        if (target == "rx") {
            //countRx++
        }
        return [] 
    }
    switch(bd.type) {
        case "none":
            targets.push({"signal": 1, "orig": target})
            break
        case "flipflop": // nothing happens
            break
        case "inverter":
            bd.memory.set(orig, 1)
            map.set(target, bd)
            let re = true
            bd.memory.forEach((value, key) => {
                if (value == 0) {
                    re = false
                }
            })
            if (re == true) {
                targets.push({"signal": 0, "orig": target})
            } else {
                targets.push({"signal": 1, "orig": target})
            }
    }
    return targets
}

const sendLow = (map, target, orig) => {
    nbLow++
    let targets = []
    target = target.replaceAll(" ", "")
    let bd = map.get(target)
    //console.log(orig, "low", target)
    if (!bd) {
        if (target == "rx") {
            countRx++
        }
        return [] 
    }
    switch(bd.type) {
        case "none":
            targets.push({"signal": 0, "orig": target})
            //bd.dests.forEach(d => sendLow(map, d, target))
            break
        case "flipflop":
            bd.state = !bd.state
            map.set(target, bd)
            if (bd.state == true) targets.push({"signal": 1, "orig": target})
            else targets.push({"signal": 0, "orig": target})
            break
        case "inverter":
            bd.memory.set(orig, 0)
            map.set(target, bd)
            let re = true
            bd.memory.forEach((value, key) => {
                if (value == 0) {
                    re = false
                }
            })
            if (re == true) {
                targets.push({"signal": 0, "orig": target})
            } else {
                targets.push({"signal": 1, "orig": target})
            }
    }
    return targets
}


const push = (map) => {
    let targets = []
    sendLow(map, "broadcaster", "").forEach(e => {
        targets.push(e)
    })
    while(targets.length > 0) {
        let tgs = targets.map(e => e)
        targets = []
        for (let t of tgs) {
            let bd = map.get(t.orig)
            if (t.signal == 0) {
                bd.dests.forEach(d => sendLow(map, d, t.orig).forEach(e => targets.push(e)))
            } else {
                bd.dests.forEach(d => sendHigh(map, d, t.orig).forEach(e => targets.push(e)))
            }
        }
    }
}


const part1 = (input) => {
    let map = new Map()
    let is = input.split("\n")
    is.forEach(line => {
            let command = line.split(" -> ")
            let dests = command[1].replaceAll(" ", "").split(",")
            if (command[0].indexOf("%") != -1) { // flipflop
                map.set(command[0].substring(1), {"type":"flipflop", "state": false, "dests": dests})
            } else if (command[0].indexOf("&") != -1) { // inverter
                let memory = new Map()
                is.forEach(line => {
                    let t = line.split(" -> ")
                    if (t[1].indexOf(command[0].substring(1)) != -1) {
                        memory.set(t[0].substring(1), 0)
                    }
                })
                map.set(command[0].substring(1), {"type":"inverter", "memory": memory, "dests": dests})
            }  else {
                map.set(command[0].substring(0), {"type":"none", "dests": dests})
            }
        })

    //console.log(map)
    for (let i = 0; i < 1000; i++) {
        push(map)
    }
    return nbHigh * nbLow
}

const part2 = (input) => {
    let map = new Map()
    let is = input.split("\n")
    is.forEach(line => {
            let command = line.split(" -> ")
            let dests = command[1].replaceAll(" ", "").split(",")
            if (command[0].indexOf("%") != -1) { // flipflop
                map.set(command[0].substring(1), {"type":"flipflop", "state": false, "dests": dests})
            } else if (command[0].indexOf("&") != -1) { // inverter
                let memory = new Map()
                is.forEach(line => {
                    let t = line.split(" -> ")
                    if (t[1].indexOf(command[0].substring(1)) != -1) {
                        memory.set(t[0].substring(1), 0)
                    }
                })
                map.set(command[0].substring(1), {"type":"inverter", "memory": memory, "dests": dests})
            }  else {
                map.set(command[0].substring(0), {"type":"none", "dests": dests})
            }
        })
    count = 0
    previouses = new Map()
    //console.log(map)
    while(previouses.size != 4) { // yeah I know :)
        count++
        push(map)
        //console.log(previouses.size)
    }

    let r = 1
    previouses.forEach((value, _) => {
        r = r * value
    })
    return r
}

exports.part1 = part1
exports.part2= part2

/*console.log(part1(`broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`))*/

/*console.log(part1(`broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`))*/