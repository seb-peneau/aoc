const part1 = (input) => {
    let result = input
        .split("\n")
        .map(line => {
            let val = line.replace(/\D/g,'')
            val = val[0] + val[val.length-1]
            return parseInt(val)
        })
        .reduce((accumulator, currentValue) => accumulator+currentValue, 0)
    return result
}

const part2 = (input) => {
    let hum = [
        "zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"
    ]
    let result = input
        .split("\n")
        .map(line => {
            let val = line
            let newVal = ""
            val.split("").forEach((element, index) => {
                if (isNaN(element) == false) { //its a number
                    newVal += element
                } else {
                    for (var i = index; i <= val.length; i++) {
                        let v = val.substring(index, i)
                        if (hum.indexOf(v) != -1) {
                            newVal += hum.indexOf(v)
                        }
                    }
                }
            })
            val = newVal.replace(/\D/g,'')
            val = val[0] + val[val.length-1]
            return parseInt(val)
        })
        .reduce((accumulator, currentValue) => accumulator+currentValue, 0)

    return result
}

exports.part1 = part1
exports.part2= part2