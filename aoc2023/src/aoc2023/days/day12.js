const clean = (str) => {
    let orig = str
    let old = str.replace(/\.\./g, '.')
    while (orig != old) {
        orig = old
        old = old.replace(/\.\./g, '.')
    }
    if (old[0] == ".") {
        old = old.substring(1)
    }
    if (old[old.length-1] == ".") {
        old = old.substring(0, old.length-1)
    }
    return old
}

let count = 0
let hashes = new Map()
const process = (springs, sizes, tab, log, alreadyTested) => {
    let acc = 0
    if (log != false) {
        console.log(tab, springs, sizes)
    }
    springs = springs.filter(e => e && e != "")

    if (hashes.has(springs+sizes)) {
        if (log != false) {
            console.log(tab, springs, sizes, "fromcache", hashes.get(springs+sizes), log)
        }
        return hashes.get(springs+sizes)
    }
    let s = springs.join(".")

    if (s.indexOf("?") != -1) {
        let doNext = true
        if (springs.length > 1) {
            let acct = 1
            for (let i = 0; i < springs.length; i++) {
                if (springs[i].indexOf("?") == -1) {
                    let t = process([springs[i]], [sizes[i]], tab+"  |  ", log, alreadyTested)
                    if (t == 0) {
                        doNext = false
                        break
                    }
                } else {
                    break // but continue
                }
            }
        }
        if (doNext == true) {
            let acct = 0
            let t = 0
            if (log != false) {
                console.log("test", s.replace("?", "."))
            }
            t = process(clean(s.replace("?",  ".")).split("."), sizes, tab + "  |  ", log)
            acct = acct + t
            t = 0
            if (log != false) {
                console.log("test", s.replace("?", "#"))
            } 
            t = process(clean(s.replace("?",  "#")).split("."), sizes, tab + "  |  ", log)
            acct = acct + t
    
            acc = acc + acct
        }
    } else {
        // no more ? here
        if (springs.length == sizes.length) { // should be ok
            if (springs.length > 1) {
                let acct = 1
                for (let i = 0; i < springs.length; i++) {
                    let t = process([springs[i]], [sizes[i]], tab+"  |  ", log, alreadyTested)
                    acct = acct * t
                    if (t == 0) {
                        break
                    }
                }
                acc = acc + acct
            } else if (springs.length == 1) {
                if ((springs[0].split("").filter(e => e == "#").length == sizes[0])) {
                    hashes.set(springs+sizes, 1)
                    acc = 1
                }
            }
        } else { // abnormal case : springs.length should be equal to size one when
                // there is no ? in string
            acc = 0
        }
    }

    if (log != false) {
        console.log(tab, springs, sizes, acc, count)
    }

    hashes.set(springs+sizes, acc)
    return acc
}

const part1 = (input,  log = false) => {
    let t = input.split("\n").map((e, index) => {
        let inputs = e.split(" ")
        let springs = clean(inputs[0]).split(".")
        let sizes = inputs[1].split(",")
        return process(springs, sizes, "  |  ", log, [])
    }).reduce((acc, current) => acc + current, 0)
    return t
}

const part2 = (input) => {
    return input.split("\n")
        .map(e => {
            return e.split(" ").map((a, i) => {
                if (i == 0) {
                    return a + "?" + a + "?" + a + "?" + a + "?" + a
                } else {
                    return a + "," + a + "," + a + "," + a + "," + a
                }
            }).join(" ")
        })
        .map((e, index) => {
            let log = false
            let inputs = e.split(" ")
            let springs = clean(inputs[0]).split(".")
            let sizes = inputs[1].split(",")
            return process(springs, sizes, "  |  ", log, [])
        }).reduce((acc, current) => acc + current, 0)
}
// edge cases
/*console.log(part1(`?###???????? 3,2,1`, true) == 10) // 5
console.log(part1(`????.######..#####. 1,6,5`, false) == 4) // 5
console.log(part1(`???.### 1,1,3`, false) == 1) // first
console.log(part1(`????.#...#... 4,1,1`, false) == 1) // 4
console.log(part1(`?#?#?#?#?#?#?#? 1,3,1,6`, false) == 1) // 3
console.log(part1(`.??..??...?##. 1,1,3`, false) == 4) // second
console.log(part1(`#?? 2`, false) == 1)
console.log(part1(`?? 1`, false) == 2)
console.log(part1(`?? 2`, false) == 1)*/

exports.part1 = part1
exports.part2= part2