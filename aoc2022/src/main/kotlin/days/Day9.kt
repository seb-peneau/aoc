package days

import utils.Processor

object Day9 {
    fun star1(input: String) : Int {
        var head : Pair<Int, Int> = Pair(0, 0)
        var tail : Pair<Int, Int> = Pair(0, 0)
        val visitedPositions = mutableListOf<Pair<Int, Int>>()

        input
            .lines()
            .forEach { instruction ->
                val (direction, step) = instruction.split(" ")
                for (iStep in 0 until step.toInt()) {
                    val saveHead = Pair(head.first, head.second)
                    when (direction) {
                        "R" -> { head = Pair(saveHead.first + 1, saveHead.second) }
                        "L" -> { head = Pair(saveHead.first - 1, saveHead.second) }
                        "U" -> { head = Pair(saveHead.first, saveHead.second + 1) }
                        "D" -> { head = Pair(saveHead.first, saveHead.second - 1) }
                        else -> println("NOTPOSSIBLE")
                    }
                    if (!isAdjacent(head, tail)) {
                        val mx = if (head.first == tail.first) 0 else if ((head.first - tail.first) > 0) 1 else -1
                        val my = if (head.second == tail.second) 0 else if ((head.second - tail.second) > 0) 1 else -1
                        tail = Pair(tail.first+mx, tail.second+my)
                        if (! visitedPositions.contains(tail)) {
                            visitedPositions.add(tail)
                        }
                    }
                }
            }
        return visitedPositions.size + 1 // start position + moves
    }

    private fun isAdjacent(head: Pair<Int, Int>, tail: Pair<Int, Int>): Boolean {
        for (i in head.first - 1 until head.first + 2) {
            for (j in head.second - 1 until head.second+2) {
                if (tail == Pair(i, j)) {
                    return true
                }
            }
        }
        return false
    }

    fun star2(input: String) : Int {
        var head : Pair<Int, Int> = Pair(0, 0)
        var tail : Pair<Int, Int> = Pair(0, 0)
        var tails = mutableListOf<Pair<Int, Int>>()
        var allTails = mutableListOf<MutableList<Pair<Int, Int>>>()

        for (i in 0..8) {
            tails.add(Pair(0,0))
            allTails.add(mutableListOf(Pair(0,0)))
        }

        input
            .lines()
            .forEach { instruction ->
                val (direction, step) = instruction.split(" ")
                for (iStep in 0 until step.toInt()) {
                    when (direction) {
                        "R" -> { head = Pair(head.first + 1, head.second) }
                        "L" -> { head = Pair(head.first - 1, head.second) }
                        "U" -> { head = Pair(head.first, head.second + 1) }
                        "D" -> { head = Pair(head.first, head.second - 1) }
                        else -> println("NOTPOSSIBLE")
                    }
                    for (i in 0..8) {
                        val h = if (i == 0) head else tails[i-1]
                        if (!isAdjacent(h, tails[i])) {
                            val mx = if (h.first == tails[i].first) 0 else if ((h.first - tails[i].first) > 0) 1 else -1
                            val my = if (h.second == tails[i].second) 0 else if ((h.second - tails[i].second) > 0) 1 else -1
                            tails[i] = Pair(tails[i].first+mx, tails[i].second+my)
                            if (!allTails[i].contains(tails[i])) {
                                allTails[i].add(tails[i])
                            }
                        }
                    }

                }
            }
        return allTails[8].size // start position + moves
    }
}

@kotlin.time.ExperimentalTime
fun main() {
    Processor.processDay(9, Day9::star1, Day9::star2)
}