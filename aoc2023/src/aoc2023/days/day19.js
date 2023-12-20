
const applyRules = (input, rules, rule) => {
    let r = rules.get(rule).split(",")
    let gr = ""
    for (condition of r) {
        if (condition.indexOf(":") != -1) {
            let cs = condition.split(":")
            cs[0] = "input."+cs[0]
            if (eval(cs[0]) == true) {
                gr = cs[1]
                break
            }
        } else {
            gr = condition
        }
    }
    switch (gr) {
        case "R":
            return 0
        case "A":
            return input.x + input.m + input.a + input.s;
        default :
            return applyRules(input, rules, gr)
    }
}

const part1 = (input) => {
    let rules = new Map()
    let inputs = []
    input.split("\n\n")
        .forEach((part, i) => {
            if (i == 0) {
                part.split("\n")
                    .forEach(rule => {
                        rules.set(rule.substring(0, rule.indexOf("{")), rule.substring(rule.indexOf("{")+1, rule.indexOf("}")))
                    })
            }
            else { inputs = part.split("\n").map(e => {
                let r = {"x": 0, "m": 0, "a": 0, "s": 0}
                e = e.split(",").forEach(el => {
                    if (el.indexOf("x") != -1) { r.x = parseInt(el.substring(el.indexOf("=")+1))}
                    if (el.indexOf("m") != -1) { r.m = parseInt(el.substring(el.indexOf("=")+1))}
                    if (el.indexOf("a") != -1) { r.a = parseInt(el.substring(el.indexOf("=")+1))}
                    if (el.indexOf("s") != -1) { r.s = parseInt(el.substring(el.indexOf("=")+1), el.substring(el.indexOf("}")))}
                })
                return r
            })}
        })
    let result = inputs.map(input => applyRules(input, rules, "in"))
    return result.reduce((acc, current) => acc + current, 0)
}

let calls = 0
let pathes = []
const computeComb = (rules, rule, currentPath, calls) => {
    calls++
    let r = rules.get(rule).split(",")
    let gr = ""
    let els = 0
    let n1 = 0
    for (condition of r) {
        let cp = currentPath.map(e => e)
        console.log(calls, condition)
        let cs = []
        if (condition.indexOf(":") != -1) {
            cs = condition.split(":")

            gr = cs[1]
            if (cs[0].indexOf(">") != -1) {
                let x = cs[0].split(">")
                console.log(parseInt(x[1]))
                console.log(parseInt(x[1]) + 1)
                n1 = parseInt(x[1]) + 1
                els = els + (4000 - n1)
            } else {
                console.log(cs[0])
                let x = cs[0].split("<")
                console.log(parseInt(x[1]) + 1)
                n1 = parseInt(x[1]) - 1
                els = els + (4000 - n1)
            }
            if (gr == "A") {
                cp.push({"gr": rule, "letter":cs[0][0], "limit": n1})
                pathes.push(cp.map(e => e))
            } else if (gr == "R") {
            } else {
                cp.push({"gr": rule, "letter":cs[0][0], "limit": n1})
                computeComb(rules, gr, cp, calls)
            } 
        } else {
            gr = condition
            if (gr == "A") {
                cp.push({"gr": rule, "letter":"", "limit": els})
                pathes.push(cp.map(e => e))
            } else if (gr == "R") {
            } else {
                cp.push({"gr": rule, "letter":"", "limit": els})
                computeComb(rules, gr, cp, calls)
            }

        }

    }
}

const part2 = (input) => {
    let rules = new Map()
    input.split("\n\n")
        .forEach((part, i) => {
            if (i == 0) {
                part.split("\n")
                    .forEach(rule => {
                        rules.set(rule.substring(0, rule.indexOf("{")), rule.substring(rule.indexOf("{")+1, rule.indexOf("}")))
                    })
            }
        })

    //(rules, "in", [], calls)
    /*console.log(pathes)
    pathes = pathes.map(el => el.reduce((acc, current) => acc*current.limit, 1))
    console.log(pathes)
    pathes.forEach(e => console.log(e > 167409079868000))
    let r = pathes.reduce((acc, current) => acc + current, 0)
    console.log(r > 167409079868000)*/

    let ranges = [{"sx":1, "ex":4000, "sm":1, "em":4000, "sa":1, "ea":4000, "ss":1, "es": 4000, "label": "in"}]
    //console.log(rules.get("in"))

    var els = null

    /*rules.get("in").split(",").forEach(rule => {
        //console.log(rule)
        let r = ranges.filter(e => e.label == "in")[0]
        ranges = ranges.filter(e => e.label != "in")
        if (rule.indexOf(":") != -1) {
            let cs = rule.split(":")
            if (cs[0].indexOf("s<") != -1) {
                let r2 = {"sx":r.sx, "ex":r.ex, "sm":r.sm, "em":r.em, "sa":r.sa, "ea":r.ea, "ss":r.ss, "es": parseInt(cs[0].substring(2)) - 1, "label": cs[1]}
                ranges.push(r2)
                let r3 = {"sx":r.sx, "ex":r.ex, "sm":r.sm, "em":r.em, "sa":r.sa, "ea":r.ea, "ss":parseInt(cs[0].substring(2)), "es": r.es, "label": cs[1]}
                els = r3
            }
        } else {
            if (els != null) {
                els.label = rule
                ranges.push(els)
                els = null
            }
        }
    })*/

    let rae = ranges.filter(e => e.label != "A" && e.label != "R")

    while (rae.length > 0) {
        let lab = rae[0].label
        els = null
        rules.get(lab).split(",").forEach(rule => {
            let r = ranges.filter(e => e.label == lab)[0]
            ranges = ranges.filter(e => e.label != lab)
            if (rule.indexOf(":") != -1) {
                if (els != null) {
                    r = els
                }
                //console.log("rule", rule, r)
                let cs = rule.split(":")
                if (cs[0].indexOf("x<") != -1) {
                    let r2 = {"sx":r.sx, "ex":parseInt(cs[0].substring(2)) - 1, "sm":r.sm, "em":r.em, "sa":r.sa, "ea": r.ea, "ss":r.ss, "es": r.es, "label": cs[1]}
                    ranges.push(r2)
                    let r3 = {"sx":parseInt(cs[0].substring(2)), "ex":r.ex, "sm":r.sm, "em":r.em, "sa":r.sa, "ea":r.ea, "ss": r.ss, "es": r.es, "label": cs[1]}
                    els = r3
                }            
                if (cs[0].indexOf("m<") != -1) {
                    let r2 = {"sx":r.sx, "ex":r.ex, "sm":r.sm, "em":parseInt(cs[0].substring(2)) - 1, "sa":r.sa, "ea":r.ea, "ss":r.ss, "es": r.es, "label": cs[1]}
                    ranges.push(r2)
                    let r3 = {"sx":r.sx, "ex":r.ex, "sm":parseInt(cs[0].substring(2)), "em":r.em, "sa":r.sa, "ea":r.ea, "ss":r.ss, "es": r.es, "label": cs[1]}
                    els = r3
                }
                if (cs[0].indexOf("a<") != -1) {
                    let r2 = {"sx":r.sx, "ex":r.ex, "sm":r.sm, "em":r.em, "sa":r.sa, "ea":parseInt(cs[0].substring(2)) - 1, "ss":r.ss, "es": r.es, "label": cs[1]}
                    ranges.push(r2)
                    let r3 = {"sx":r.sx, "ex":r.ex, "sm":r.sm, "em":r.em, "sa":parseInt(cs[0].substring(2)), "ea":r.ea, "ss": r.ss, "es": r.es, "label": cs[1]}
                    els = r3
                }            
                if (cs[0].indexOf("s<") != -1) {
                    let r2 = {"sx":r.sx, "ex":r.ex, "sm":r.sm, "em":r.em, "sa":r.sa, "ea":r.ea, "ss":r.ss, "es": parseInt(cs[0].substring(2)) - 1, "label": cs[1]}
                    ranges.push(r2)
                    let r3 = {"sx":r.sx, "ex":r.ex, "sm":r.sm, "em":r.em, "sa":r.sa, "ea":r.ea, "ss":parseInt(cs[0].substring(2)), "es": r.es, "label": cs[1]}
                    els = r3
                }
                if (cs[0].indexOf("x>") != -1) {
                    let r2 = {"sx":parseInt(cs[0].substring(2))+1, "ex":r.ex, "sm":r.sm, "em":r.em, "sa":r.sa, "ea":r.ea, "ss": r.ss, "es": r.es, "label": cs[1]}
                    ranges.push(r2)
                    let r3 = {"sx":r.sx, "ex":parseInt(cs[0].substring(2)), "sm":r.sm, "em":r.em, "sa":r.sa, "ea": r.ea, "ss":r.ss, "es": r.es, "label": cs[1]}
                    els = r3
                }            
                if (cs[0].indexOf("m>") != -1) {
                    let r2 = {"sx":r.sx, "ex":r.ex, "sm":parseInt(cs[0].substring(2))+1, "em":r.em, "sa":r.sa, "ea":r.ea, "ss":r.ss, "es": r.es, "label": cs[1]}
                    ranges.push(r2)
                    let r3 = {"sx":r.sx, "ex":r.ex, "sm":r.sm, "em":parseInt(cs[0].substring(2)), "sa":r.sa, "ea":r.ea, "ss":r.ss, "es": r.es, "label": cs[1]}
                    els = r3
                }
                if (cs[0].indexOf("a>") != -1) {
                    let r2 = {"sx":r.sx, "ex":r.ex, "sm":r.sm, "em":r.em, "sa":parseInt(cs[0].substring(2))+1, "ea":r.ea, "ss": r.ss, "es": r.es, "label": cs[1]}
                    ranges.push(r2)
                    let r3 = {"sx":r.sx, "ex":r.ex, "sm":r.sm, "em":r.em, "sa":r.sa, "ea":parseInt(cs[0].substring(2)), "ss":r.ss, "es": r.es, "label": cs[1]}
                    els = r3
                }            
                if (cs[0].indexOf("s>") != -1) {
                    let r2 = {"sx":r.sx, "ex":r.ex, "sm":r.sm, "em":r.em, "sa":r.sa, "ea":r.ea, "ss":parseInt(cs[0].substring(2))+1, "es": r.es, "label": cs[1]}
                    ranges.push(r2)
                    let r3 = {"sx":r.sx, "ex":r.ex, "sm":r.sm, "em":r.em, "sa":r.sa, "ea":r.ea, "ss":r.ss, "es": parseInt(cs[0].substring(2)), "label": cs[1]}
                    els = r3
                }            
            } else {
                if (els != null) {
                    els.label = rule
                    ranges.push(els)
                    els = null
                }
            }
        })
        rae = ranges.filter(e => e.label != "A" && e.label != "R")
    }

    let count = 0
    let countr = 0
    //console.log(ranges)
    ranges
        .filter(e => e.label == "A")
        .forEach(e => count = count + ((e.ex - e.sx + 1) * (e.em - e.sm + 1) * (e.ea - e.sa + 1) * (e.es - e.ss + 1)))

    ranges
        .filter(e => e.label == "R")
        .forEach(e => countr = countr + ((e.ex - e.sx) * (e.em - e.sm) * (e.ea - e.sa) * (e.es - e.ss)))        
    
    //console.log(count, count == 167409079868000, Math.pow(4000, 4) - countr, Math.pow(4000, 4), count+countr == Math.pow(4000, 4))

    return count
}

exports.part1 = part1
exports.part2= part2

/*console.log(part2(`px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`))*/

/*console.log(part2(`px{m>500:A,R}
in{x<1000:px,A}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`))

console.log(part2(`px{a>500:A,R}
in{x<1000:px,A}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`))

console.log(part2(`px{s>500:A,R}
in{m<1000:px,A}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`))*/

/*console.log(part2(`px{x>500:A,R}
in{a<1000:px,A}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`))*/