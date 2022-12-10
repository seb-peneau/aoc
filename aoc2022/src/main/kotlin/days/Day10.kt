package days

import utils.Processor

object Day10 {
    fun star1(input: String) : Int {
        val instructionsToCycles = input
            .lines()
            .flatMap { cyclesForInstruction(it) }
        val xvalues = mutableListOf<Int>()
        instructionsToCycles.forEachIndexed { index, i ->
                if (index == 0) { xvalues.add(1) } else { xvalues.add(xvalues[index-1] + i) }
            }
        xvalues.add(0, 1)
        return listOf(
            xvalues[19] * 20,
            xvalues[59] * 60,
            xvalues[99] * 100,
            xvalues[139] * 140,
            xvalues[179] * 180,
            xvalues[219] * 220)
            .sum()
    }

    private fun cyclesForInstruction(inst: String) : List<Int> {
        return if (inst.contains("noop")) {
            listOf(0)
        } else if (inst.contains("addx")) {
            listOf(0, inst.replace("addx ", "").toInt())
        } else {
            listOf()
        }
    }

    fun star2(input: String) : Int {
        val instructionsToCycles = input
            .lines()
            .flatMap { cyclesForInstruction(it) }
        val xvalues = mutableListOf<Int>()
        instructionsToCycles.forEachIndexed { index, i ->
            if (index == 0) { xvalues.add(1) } else { xvalues.add(xvalues[index-1] + i) }
        }
        xvalues.add(0, 1)
        var z = 0
        for (k in 1 .. 6) {
            for (i in 0..39) {
                val j = xvalues[z]
                if (i == j || i == j-1 || i == j+1) { print("#") }
                else { print(".") }
                z++
            }
            println("")
        }
        return 0
    }
}

@kotlin.time.ExperimentalTime
fun main() {
    Processor.processDay(10, Day10::star1, Day10::star2)
}