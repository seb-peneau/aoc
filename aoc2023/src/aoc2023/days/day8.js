const part1 = (input) => {
    const lines = input.split("\n")
    const inst = lines[0].split("")

    let map = new Map()
    lines
        .filter(l => l.indexOf(" = ") != -1)
        .forEach(element => {
            let es = element.replaceAll(" ","").split("=")
            let dir = es[1].replaceAll("(","").replaceAll(")","").split(",")
            map.set(es[0], dir)
        })

    let currentNode = "AAA"
    let steps = 0

    while (currentNode != "ZZZ") {
        inst.forEach(i => {
            steps++
            if (i == "L") {
                currentNode = map.get(currentNode)[0]
            } else {
                currentNode = map.get(currentNode)[1]
            }
            if (currentNode == "ZZZ") {
                return
            }
        })
    }
    return steps
}

function lcm(numbers) {
    function gcd(a, b) {
      // If the second argument is 0, return the first argument (base case)
      if (b === 0) {
        return a;
      }
      // Otherwise, recursively call gcd with arguments b and the remainder of a divided by b
      return gcd(b, a % b);
    }
    // Reduce the array of numbers by multiplying each number together and dividing by their gcd
    // This finds the Least Common Multiple (LCM) of the numbers in the array
    return numbers.reduce((a, b) => a * b / gcd(a, b));
  }

const part2 = (input) => {
    const lines = input.split("\n")
    const inst = lines[0].split("")
    let map = new Map()
    lines
        .filter(l => l.indexOf(" = ") != -1)
        .forEach(element => {
            let es = element.replaceAll(" ","").split("=")
            let dir = es[1].replaceAll("(","").replaceAll(")","").split(",")
            map.set(es[0], dir)
        })

    let currentNodes = [...map.keys()].filter(e => e.endsWith("A"))
    let occ = currentNodes.map(e => {
        return -1
    })
    let steps = 0
    while (
            occ.filter(e => e == -1).length > 0
        ) {
        inst.forEach(i => {
            steps++
            if (i == "L") {
                currentNodes = currentNodes.map(node => map.get(node)[0])
            } else {
                currentNodes = currentNodes.map(node => map.get(node)[1])
            }
            if (currentNodes.filter(node => node.endsWith("Z")).length > 0) {
                currentNodes.forEach((node, index) => {
                    if (node.endsWith("Z")) {
                        if (occ[index] == -1) {
                            occ[index] = steps
                        }
                    }
                })
            }
            if (occ.filter(e => e == -1).length == 0) {
                return
            }
        })
    }
    return lcm(occ)
}

exports.part1 = part1
exports.part2= part2