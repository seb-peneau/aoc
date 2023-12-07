const computeType = (e) => {
    let elem = e
    let hand = elem.hand
    if (hand.split("").filter(e => e != hand[0]).length == 0) { // Five of a kind
        elem.type = 1
        return elem
    }
    let h = hand.split("")
    for(let i in h) {
        let char = h[i]
        var regexp = new RegExp(char, "g")
        var count = (hand.match(regexp, ) || []).length
        if (count == 4) {
            elem.type = 2
            return elem
        } else if (count == 3) {
            let remaining = hand.split("").filter(e => e != char)
            if (remaining[0] == remaining[1]) {
                elem.type = 3
                return elem
            } else {
                elem.type = 4
                return elem
            }
        }        
    }
    for(let i in h) {
        let char = h[i]
        var regexp = new RegExp(char, "g")
        var count = (hand.match(regexp, ) || []).length
        if (count == 2) {
            let remaining = hand.split("").filter(e => e != char)
            if (remaining[0] == remaining[1]
                || remaining[1] == remaining[2]
                || remaining[0] == remaining[2]) {
                elem.type = 5
                return elem
            } else {
                elem.type = 6
                return elem
            }
        }     
    }
    elem.type = 7
    return elem
}

const replaceChar = (char) => {
    switch(char) {
        case "A": return 14; break;
        case "K": return 13; break;
        case "Q": return 12; break;
        case "J": return 11; break;
        case "T": return 10; break;
        default: return parseInt(char); break;
    }
}

const replaceChar2 = (char) => {
    switch(char) {
        case "A": return 14; break;
        case "K": return 13; break;
        case "Q": return 12; break;
        case "J": return 1; break;
        case "T": return 10; break;
        default: return parseInt(char); break;
    }
}

const sortCards = (a,b,method) => {
    if (a.type > b.type) {
        return -1
    } else if (a.type < b.type) {
        return 1
    } else { //equality
        let aRep = a.hand.split("").map(char => method(char))
        let bRep = b.hand.split("").map(char => method(char))
        for (let i = 0; i < aRep.length; i++) {
            if (aRep[i]>bRep[i]) {
                return 1
            } else if (aRep[i] < bRep[i]) {
                return -1
            }
        }
    }
}

const part1 = (input) => {
    let i = input.split("\n")
        .map(line => {
            let l = line.split(" ")
            return {"hand": l[0], "bid": parseInt(l[1]), "type": -1}
        })
        .map(elem => computeType(elem))
        .sort((a,b) => sortCards(a,b,replaceChar))
        .reduce((acc, currentValue, currentIndex) => acc+(currentValue.bid * (currentIndex+1)), 0)
    return i
}

const part2 = (input) => {
    let i = input.split("\n")
        .map(line => {
            let l = line.split(" ")
            return {"hand": l[0], "bid": parseInt(l[1]), "type": -1}
        })
        .map(elem => {
            if (elem.hand.indexOf("J") != -1) {
                let types = []
                for(let v of ["A","K","Q","T","9","8","7","6","5","4","3","2"]) {
                    let e = {"hand": elem.hand, "bid": elem.bid, "type": elem.type, "orig": elem.hand}
                    e.hand = e.hand.replaceAll("J", v)
                    types.push(computeType(e))
                }
                var first = types.sort((a,b) => a.type - b.type)[0]
                return {"hand": first.orig, "bid": first.bid, "type": first.type}
            } else {
                return computeType(elem)
            }
        })
        .sort((a,b) => sortCards(a,b,replaceChar2))
        .reduce((acc, currentValue, currentIndex) => acc+(currentValue.bid * (currentIndex+1)), 0)
    return i
}

exports.part1 = part1
exports.part2= part2