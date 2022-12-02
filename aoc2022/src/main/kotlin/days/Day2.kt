package days

import utils.Processor


object Day2 {

    enum class RPS() {
        X, Y, Z
    }

    fun star1(input: String) : Int {
        return input
            .lines().sumOf { playRound(it) }
    }

    private fun playRound(round: String) : Int {
        round
            .split(" ")
            .let {
                val me = RPS.valueOf(it[1]).ordinal + 1
                val score = getScore(it[0], it[1])
                return me + score
            }
    }

    private fun getScore(op: String, me: String): Int {
        return if (op == "A") { if (me == "X") { 3 } else if (me == "Y") { 6 } else { 0 } }
        else if (op == "B") { if (me == "X") { 0 } else if (me == "Y") { 3 } else { 6 } }
        else { if (me == "X") { 6 } else if (me == "Y") { 0 } else { 3 } }
    }

    fun star2(input: String) : Int {
        return input
            .lines().sumOf { playRound2(it) }
    }

    private fun playRound2(round: String) : Int {
        round
            .split(" ")
            .let {
                val me = RPS.valueOf(guessMyPlay(it[0], it[1])).ordinal + 1
                val score = if (it[1] == "X") { 0 } else if (it[1] == "Y") { 3 } else { 6 }
                return me + score
            }
    }

    private fun guessMyPlay(op: String, final: String): String {
        return if (op == "A") { if (final == "X") { "Z" } else if (final == "Y") { "X" } else { "Y" } }
        else if (op == "B") { if (final == "X") { "X" } else if (final == "Y") { "Y" } else { "Z" } }
        else { if (final == "X") { "Y" } else if (final == "Y") { "Z" } else { "X" } }
    }
}

@kotlin.time.ExperimentalTime
fun main() {
    Processor.processDay(2, Day2::star1, Day2::star2)
}