const computeHash = (hash) => {
    let currentValue = 0
    hash.split("")
        .forEach(c => {
            currentValue = currentValue + c.charCodeAt(0)
            //console.log(currentValue)
            currentValue = currentValue * 17
            //console.log(currentValue)
            currentValue = currentValue % 256
            //console.log(currentValue)
        })
    //console.log(currentValue)
    return currentValue
}

//console.log(computeHash("HASH") == 52)

const part1 = (input) => {
    return input.split(",")
        .map(computeHash)
        .reduce((acc, currentValue) => acc + currentValue, 0)
}

const part2 = (input) => {
    const boxes = []
    input.split(",")
        .forEach(inst => {
            if (inst.indexOf("=") != -1) {
                let addInst = inst.split("=")
                let boxNumber = computeHash(addInst[0])
                if (!boxes[boxNumber] || boxes[boxNumber].length == 0) {
                    boxes[boxNumber] = []
                }
                let rIndex = -1
                boxes[boxNumber].forEach((e, index) => {
                    if (e.label == addInst[0]) {
                        rIndex = index
                    }
                })
                if (rIndex != -1) {
                    boxes[boxNumber].splice(rIndex, 1, {"label": addInst[0], "value": parseInt(addInst[1])})
                } else {
                    boxes[boxNumber].push({"label": addInst[0], "value": parseInt(addInst[1])})
                }
            } else if (inst.indexOf("-") != -1) {
                let addInst = inst.split("-")
                let boxNumber = computeHash(addInst[0])
                if (!boxes[boxNumber] || boxes[boxNumber].length == 0) {
                    boxes[boxNumber] = []
                }
                let rIndex = -1
                boxes[boxNumber].forEach((e, index) => {
                    if (e.label == addInst[0]) {
                        rIndex = index
                    }
                })
                if (rIndex != -1) {
                    boxes[boxNumber].splice(rIndex, 1)
                }
            }
            //console.log(boxes)
        })

    return boxes
        .map((elems, boxIndex) => {
            if (!elems || elems.length == 0) {
                return 0
            } else {
                return elems
                    .map((elem, slot) => {
                        //console.log(boxIndex, slot, (boxIndex+1) + (slot+1) + elem.value)
                        return (boxIndex+1) * (slot+1) * elem.value
                    })
                    .reduce((acc, e) => acc+e, 0)
            }
        })
        .reduce((acc, e) => acc+e, 0)
}

exports.part1 = part1
exports.part2= part2