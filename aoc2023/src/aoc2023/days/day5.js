
const getMin = (input, seeds) => {
    let newElementIndex = 1
    let transformed = []
    input.split("\n")
        .forEach((element, index) => {
            if (element.indexOf("-to-") != -1) {
                newElementIndex = index
                transformed = []
            }
            if (index > newElementIndex) {
                let parseRange = element.split(" ").map(e => parseInt(e))
                seeds = seeds.map((seed, index) => {
                    if (transformed.indexOf(index) == -1 
                        && seed >= parseRange[1] 
                        && seed < parseRange[1] + parseRange[2]) {
                        transformed.push(index)
                        return parseRange[0] + (seed - parseRange[1])
                    } else {
                        return seed
                    }
                })
            }
        })

    return Math.min(...seeds)
}

const part1 = (input) => {
    let seeds = input.split("\n")[0].replace("seeds : ", "").split(" ").filter(e => !isNaN(e)).map(e => parseInt(e))
    return getMin(input, seeds)
}

const getMin2 = (transforms, seed) => {
    let _s = seed
    transforms.forEach(rules => {
        let transformed = false
        rules.forEach(rule => {
            if (transformed == false 
                && _s >= rule.rangestart 
                && _s < rule.rangestart  + rule.range) {
                transformed = true
                _s = rule.dest + (_s - rule.rangestart)
            }
        })
    })
    return _s
}


const part2 = (input) => {
    let seeds = input.split("\n")[0].replace("seeds : ", "").split(" ").filter(e => !isNaN(e)).map(e => parseInt(e))
    let s = new Map()
    let max = 1
    let min = 99999999999

    let newElementIndex = 1
    let rules = []
    let transforms = []
    input.split("\n")
        .forEach((element, index) => {
            if (element.indexOf("-to-") != -1) {
                if (rules.length>0) transforms.push(rules)
                newElementIndex = index
                rules = []
            }
            if (index > newElementIndex) {
                if (element.length > 2) {
                    let parseRange = element.split(" ").map(e => parseInt(e))
                    rules.push({"rangestart":parseRange[1], "range": parseRange[2], "dest": parseRange[0]})    
                } 
            }
        })
    if (rules.length>0) transforms.push(rules)
    console.log(transforms)

    seeds.forEach((seed, index) => {
        if (index%2 == 0) {
            let start = seed
            let end = seed + seeds[index+1]
            let current = start
            let nb = 0
            while(current < end) {
                min = Math.min(min, getMin2(transforms,current))
                current = current+1
                nb++
            }
        }
    })
   
    return min
}

exports.part1 = part1
exports.part2= part2