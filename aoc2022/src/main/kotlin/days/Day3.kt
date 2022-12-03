package days

import utils.Processor
import java.util.*

object Day3 {
    fun star1(input: String) : Int {
        return input
            .lines()
            .getItems()
            .getCommonLetter()
            .convertToInt()
            .sum()
    }
    fun star2(input: String) : Int {
        return input
            .lines()
            .chunked(3)
            .getCommonLetter2()
            .convertToInt()
            .sum()
    }
}

private fun List<Char>.convertToInt(): List<Int> {
    val lower = "abcdefghijklmnopqrstuvwxyz"
    val list = this
        .map { char ->
            if (lower.contains(char)) {
                return@map lower.indexOf(char) + 1
            } else {
                return@map lower.uppercase(Locale.getDefault()).indexOf(char) + 27
            }
        }
    return list
}

private fun List<List<String>>.getCommonLetter(): List<Char> {
    return this
        .map {
            val l = it[0].filter { letter -> it[1].contains(letter) }
            return@map l.first()
        }
}

private fun List<List<String>>.getCommonLetter2(): List<Char> {
    return this
        .map {
            val l = it[0]
                .filter { letter -> it[1].contains(letter) }
                .filter { letter -> it[2].contains(letter) }
            return@map l.first()
        }
}

private fun List<String>.getItems(): List<List<String>> {
    return this.map { it.chunked(it.length/2) }
}

@kotlin.time.ExperimentalTime
fun main() {
    Processor.processDay(3, Day3::star1, Day3::star2)
}