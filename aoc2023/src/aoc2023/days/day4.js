
const computePoints = (winning, current) => {
    var points = 0
    winning = winning.split(" ").filter(value => value != "")
    current = current.split(" ").filter(value => value != "")
    let t = winning
        .filter(value => current.includes(value))
        .map((_, index) => {
            if (index == 0) {
                points = 1
            } else {
                points = points * 2
            }
            return points
        })
    if (t.length > 0) {
        return Math.max(...t)
    } else return 0
    
}

const part1 = (input) => {
    return input
        .split("\n")
        .map(line => line.split(":")[1].split("|"))
        .map(cards => computePoints(cards[0], cards[1]))
        .reduce((acc, current) => acc+current, 0)
}


const matchingNumbers = (winning, current) => {
    winning = winning.split(" ").filter(value => value != "")
    current = current.split(" ").filter(value => value != "")
    let t = winning
        .filter(value => current.includes(value))
    return t.length
}

const part2 = (input) => {
    const cardNumbers = Array(input.split("\n").length).fill(1)
    input
        .split("\n")
        .map(line => line.split(":")[1].split("|"))
        .forEach((cards, index) => {
            for (var i = 1  ; i <= matchingNumbers(cards[0], cards[1]); i++) {
                if (!cardNumbers[index+i]) {
                    cardNumbers[index+i] = 1
                } else {
                    cardNumbers[index+i] = cardNumbers[index+i] + cardNumbers[index]
                }
            }
        })
    return cardNumbers.reduce((acc, current) => acc+current, 0)
}

exports.part1 = part1
exports.part2= part2