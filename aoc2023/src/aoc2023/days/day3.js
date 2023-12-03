const part1 = (input) => {
    let symbols = []
    input = input.split("\n")
    input
        .forEach((line, y) => {
            line.split("").forEach((char, x) => {
                if (char != "." && isNaN(char)) {
                    symbols.push({"x": x, "y": y})
                }
            })
        })

    input = input.map(line => line.split(""))

    let numbers = []

    symbols.forEach(symbol => {
        for (var ix = symbol.x-1; ix <= symbol.x+1; ix ++) {
            for (var iy = symbol.y-1; iy <= symbol.y+1; iy ++) {
                if (ix >= 0 && ix < input[0].length && iy >= 0 && iy < input.length) {
                    if (!isNaN(input[iy][ix])) {
                        var number = input[iy][ix]
                        let startx = ix
                        let nx = ix - 1
                        while(nx >= 0 && nx < input[0].length && !isNaN(input[iy][nx])) {
                            number = input[iy][nx] + number
                            startx--
                            nx -= 1
                        }
                        nx = ix + 1
                        while(nx >= 0 && nx < input[0].length && !isNaN(input[iy][nx])) {
                            number = number += input[iy][nx]
                            nx += 1
                        }
                        number = parseInt(number)
                        let alreadyIn = numbers.filter(elem => elem.n == number && elem.x == startx && elem.y == iy)
                        if (alreadyIn.length == 0) {
                            numbers.push({"n": number, "x": startx, "y": iy})
                        }
                    }
                }
            }
        }
    })
    return numbers.reduce((acc, current) => acc + current.n, 0)
}

const part2 = (input) => {
    let symbols = []
    input = input.split("\n")
    input
        .forEach((line, y) => {
            line.split("").forEach((char, x) => {
                if (char != "." && char == "*") {
                    symbols.push({"x": x, "y": y})
                }
            })
        })

    input = input.map(line => line.split(""))

    let numbers = []

    let ns = []

    symbols.forEach(symbol => {
        for (var ix = symbol.x-1; ix <= symbol.x+1; ix ++) {
            for (var iy = symbol.y-1; iy <= symbol.y+1; iy ++) {
                if (ix >= 0 && ix < input[0].length && iy >= 0 && iy < input.length) {
                    if (!isNaN(input[iy][ix])) {
                        var number = input[iy][ix]
                        let startx = ix
                        let nx = ix - 1
                        while(nx >= 0 && nx < input[0].length && !isNaN(input[iy][nx])) {
                            number = input[iy][nx] + number
                            startx--
                            nx -= 1
                        }
                        nx = ix + 1
                        while(nx >= 0 && nx < input[0].length && !isNaN(input[iy][nx])) {
                            number = number += input[iy][nx]
                            nx += 1
                        }
                        number = parseInt(number)
                        let alreadyIn = numbers.filter(elem => elem.n == number && elem.x == startx && elem.y == iy)
                        if (alreadyIn.length == 0) {
                            numbers.push({"n": number, "x": startx, "y": iy})
                            if (! ns[symbol.y+"_"+symbol.x]) {
                                ns[symbol.y+"_"+symbol.x] = []
                            } 
                            ns[symbol.y+"_"+symbol.x].push(number)
                        }
                    }
                }
            }
        }
    })
    let total = 0
    for (x in ns) {
        if (ns[x].length == 2) {
            total += ns[x][0] * ns[x][1]
        }
    }
    return total
}

exports.part1 = part1
exports.part2= part2