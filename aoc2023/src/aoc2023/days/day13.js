function transpose(matrix) {
return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

const getDiff = (input1, input2) => {
    let count = 0
    for (let i = 0; i < input1.length; i++) {
        if (input1[i] != input2[i]) {
            count++
        }
    }
    return count
}

const getReflectionIndex = (pattern, smudge) => {
    let r = []
    for (let i=0.5; i < pattern.length -1 ; i++) {
       //console.log("---------")
        let isOk = true
        let nbdiffs = 0
        pattern.every((el, index) => {
            let ni = i + (i - index)
            if (index > i) {
                return false
            }
            if (ni >= 0 && ni < pattern.length) {
                //console.log(i, ni, index, pattern[ni], el, getDiff(pattern[ni], el))
                nbdiffs = nbdiffs + getDiff(pattern[ni], el)
            }
            //console.log(ni, i, pattern.length, index, nbdiffs)
            if (nbdiffs > smudge) {
                return false
            } else {
                return true
            }
        })
        if (nbdiffs == smudge && isOk == true) {
            r.push(i + 0.5)
        }
    }
    console.log(r)
    if (r.length == 1) {
        return r[0]
    } else if (r.length > 1) {
        console.log("ouooouououououjjjjjj")
        return r[0]
    } else {
        return 0
    }
}


const findReflection = (pattern, smudge) => {
    pattern = pattern.split("\n")
    let tdPattern = transpose(pattern.map(e => e.split(""))).map(e => e.join(""))

    let rows = getReflectionIndex(pattern, smudge)
    let cols = getReflectionIndex(tdPattern, smudge)
    console.log("rows", rows, "cols", cols)
    if (cols > 0) {
        return cols
    } else if (rows > 0) {
        return 100*rows
    } else {
        return 0
    }
}
/*let answer = 0
const aa = (pattern) => {
    const rows = pattern
    const grid = rows.map((rows) => rows.split(""));
    const flipped = grid[0].map((col,c) => grid.map((row, r) => grid[r][c]));
    const cols = flipped.map((col) => col.join(""));

    let fr = 0; let fc = 0;
    //hunt for reflection
    for(let c=1;c<cols.length;c++) {
        let maxLength = Math.min(c, cols.length - c);
        let left = cols.slice(c-maxLength,c);
        let right = cols.slice(c,c+maxLength);
        right.reverse();
        if(left.toString() === right.toString()) {
            if(fc != 0) {
                console.log("TWO COLUMN REFLECTIONS", fc, c);
            }
            answer += c;
            fc = c;
        }
    }        
    for(let r=1;r<rows.length;r++) {
        let maxLength = Math.min(r, rows.length - r);
        let top = rows.slice(r-maxLength,r);
        let bottom = rows.slice(r,r+maxLength);
        bottom.reverse();
        if(top.toString() === bottom.toString()) {
            if(fr != 0) {
                console.log("TWO ROW REFLECTIONS", fr, r);
            }
            answer += (r * 100);
            fr = r;
        }
    }

    if(fr != 0 && fc != 0) {
        console.log("HERE");
    }
    if(fr == 0 && fc == 0) {
        console.log(`\n${p} NO REFLECTIONS\n`, pattern);
    }
    console.log(fr, fc, answer);
    //console.log("\n\n");
}*/


const part1 = (input) => {
    let patterns = input.split("\n\n")
    let s = patterns
        .map((e, index) => {
            return findReflection(e, 0)
        })

    //console.log(s)

    s = s    
        .reduce((acc, current) => acc+current, 0)
    return s
}

const part2 = (input) => {
    let patterns = input.split("\n\n")
    let s = patterns
        .map((e, index) => {
            return findReflection(e, 1)
        })

    //console.log(s)

    s = s    
        .reduce((acc, current) => acc+current, 0)
    return s
}

exports.part1 = part1
exports.part2= part2
