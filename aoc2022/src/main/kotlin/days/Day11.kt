package days

import utils.Processor
import java.math.BigDecimal
import java.math.BigInteger

data class Monkey(val id: Int) {
    var packets = mutableListOf<Int>()
    var operations = Pair("", -1)
    var divider = 0
    var monkeyIfTrue = -1
    var monkeyIfFalse = -1
}

object Day11 {
    fun star1(input: String) : Int {
        val inspected = mutableListOf<Int>()
        var j = input.lines().parseData()
        j.forEach { monkey -> inspected.add(0) }
        for (i in 0..19) { j = j.playRound(inspected) }
        return inspected.sortedDescending().take(2).let { it[0] * it[1] }
    }
    fun star2(input: String) : Long {
        val inspected = mutableListOf<Int>()
        var j = input.lines().parseData()
        j.forEach { monkey -> inspected.add(0) }
        for (i in 0..100) {
            if (i == 1 || i == 2 || i == 3 || i == 4 || i == 40) {
                println("")
                println("round : $i")
                println(inspected)
            }
            j = j.playRound(inspected, true)
        }

        return inspected.sortedDescending().take(2).let { it[0].toLong() * it[1].toLong() }
    }
}

private fun List<Monkey>.playRound(inspected: MutableList<Int>, isRound2 : Boolean = false) : List<Monkey> {
    this
        .forEach { monkey ->
            inspected[monkey.id] += monkey.packets.size
            while (monkey.packets.size > 0) {
                var packetToSend = monkey.packets.removeAt(0)
                val second = if (monkey.operations.second == -1) {
                    packetToSend
                } else {
                    monkey.operations.second
                }
                when (monkey.operations.first) {
                    "*" -> packetToSend *= second
                    "+" -> packetToSend += second
                }
                val div3 = if (isRound2) packetToSend.mod(monkey.divider) else packetToSend.div(3)
                val divMf : Float = div3.toFloat() / monkey.divider
                val divMi = div3 / monkey.divider
                if (divMi.toFloat() == divMf) {
                    this[monkey.monkeyIfTrue].packets.add(div3)
                } else {
                    this[monkey.monkeyIfFalse].packets.add(div3)
                }
            }
        }
    return this
}

private fun List<String>.parseData(): List<Monkey> {
    val monkeys = mutableListOf<Monkey>()
    var currentIndex = 0
    var currentMonkey = Monkey(currentIndex)
    var k =0
    this.forEach { inst ->
        if (inst.isEmpty()) {
            k = 0
            monkeys.add(currentMonkey)
            currentIndex++
            currentMonkey = Monkey(currentIndex)
        } else {
            when (k) {
                0 -> currentMonkey.packets = inst.split(",").map { it.toInt() }.toMutableList()
                1 -> {
                    val i = inst.split(" ")
                    val multiplicator = if (i[1] == "old") -1 else i[1].toInt()
                    currentMonkey.operations = Pair(i[0], multiplicator)
                }
                2 -> {
                    currentMonkey.divider = inst.toInt()
                }
                3 -> {
                    currentMonkey.monkeyIfTrue = inst.toInt()
                }
                4 -> {
                    currentMonkey.monkeyIfFalse = inst.toInt()
                }
            }
            k++
        }
    }
    monkeys.add(currentMonkey)
    return monkeys
}

@kotlin.time.ExperimentalTime
fun main() {
    Processor.processDay(11, Day11::star1, Day11::star2)
}