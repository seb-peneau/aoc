package days

import utils.Processor

object Day5 {
    fun star1(input: String) : String {
        return input
            .createStacks()
            .followInstructions(input.getInstructions())
            .map { it.last() }
            .joinToString("")
    }
    fun star2(input: String) : String {
        return input
            .createStacks()
            .followInstructions2(input.getInstructions())
            .map { it.last() }
            .joinToString("")
    }
}

private fun String.getInstructions(): List<List<Int>> {
    return this.lines()
        .filter { it.contains("move") }
        .map { it.replace("move ", "") }
        .map { it.replace(" from ", ",") }
        .map { it.replace(" to ", ",") }
        .map { it.replace(" ", "") }
        .map { it.split(",") }
        .map { it.map { c -> c.toInt() } }
}

private fun List<MutableList<String>>.followInstructions(instructions: List<List<Int>>) : List<List<String>>{
    instructions.forEach { instruction ->
        for (i in 0 until instruction[0]) {
            this[instruction[2]-1].add(this[instruction[1]-1].last())
            this[instruction[1]-1].removeAt(this[instruction[1]-1].lastIndex)
        }
    }
    return this
}

private fun List<MutableList<String>>.followInstructions2(instructions: List<List<Int>>) : List<List<String>>{
    instructions.forEach { instruction ->
        val lastIndex = this[instruction[1]-1].lastIndex + 1
        val i = this[instruction[1]-1].subList(lastIndex-instruction[0], lastIndex)
        this[instruction[2]-1].addAll(i)
        for (j in lastIndex-1 downTo  lastIndex-instruction[0]) {
            this[instruction[1]-1].removeAt(j)
        }
    }
    return this
}


private fun String.createStacks() : List<MutableList<String>> {
    val crates : MutableList<MutableList<String>> = mutableListOf()
    this
        .lines()
        .filter { it.isNotEmpty() && !it.contains("move") && !it.contains("1") }
        .map { it.replace("         ", "--") }
        .map { it.replace("     ", "-") }
        .map { it.replace("    ", "-") }
        .map { it.replace("[", "") }
        .map { it.replace("]", "") }
        .map { it.replace(" ", "") }
        .map { l ->
            l.forEachIndexed { index, c ->
                if (!crates.indices.contains(index)) {
                    crates.add(index, mutableListOf())
                }
                if (c != '-') crates[index].add(0, c.toString())
            }
        }
    return crates
}

@kotlin.time.ExperimentalTime
fun main() {
    Processor.processDay(5, Day5::star1, Day5::star2)
}