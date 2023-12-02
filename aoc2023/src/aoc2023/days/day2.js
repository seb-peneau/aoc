
const parseLine = (line) => {
    let blue = 0
    let green = 0
    let red = 0
    line = line.split(":")
    let game = parseInt(line[0].replace(/\D/g,''))
    line[1].split(";").forEach(colors => {
        colors.split(",").forEach(ballset => {
            if (ballset.indexOf("blue") != -1) {
                blue = Math.max(blue, parseInt(ballset.replace(/\D/g,'')))
            } else if (ballset.indexOf("red") != -1) {
                red = Math.max(red, parseInt(ballset.replace(/\D/g,'')))
            } else if (ballset.indexOf("green") != -1) {
                green = Math.max(green, parseInt(ballset.replace(/\D/g,'')))
            }
        })
    })
    return {"game": game, "blue": blue, "green": green, "red": red}
}

const part1 = (input) => {
    return input.split("\n")
        .map(line => parseLine(line))
        .filter(elem => elem.blue <= 14 && elem.green <= 13 && elem.red <= 12)
        .reduce((acc, current) => acc + current.game, 0)
}

const part2 = (input) => {
    return input.split("\n")
        .map(line => parseLine(line))
        .map(elem => {
            return {"game": elem.game, "power": elem.red * elem.green * elem.blue}
        })
        .reduce((acc, current) => acc + current.power, 0)
}

exports.part1 = part1
exports.part2= part2