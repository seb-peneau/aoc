package days

import utils.Processor

object Day14 {
    fun star1(input: String) : Int {

        val rocks = input
            .lines()
            .createRocksCoordinates()
            .toMutableList()

        val maxY = rocks.sortedByDescending { pair -> pair.second }.first().second

        var sand = Pair(500, 0)
        var possible = true
        var nbSand = 0

        while (possible) {
            if (sand.second > maxY) {
                return nbSand
            }
            if (!rocks.contains(Pair(sand.first, sand.second+1))) {
                sand = Pair(sand.first, sand.second+1)
                possible = true
            } else if (! rocks.contains(Pair(sand.first-1, sand.second+1))) {
                sand = Pair(sand.first-1, sand.second+1)
                possible = true
            } else if (! rocks.contains(Pair(sand.first+1, sand.second+1))) {
                sand = Pair(sand.first+1, sand.second+1)
                possible = true
            } else {
                if (rocks.contains(sand)) {
                    possible = false
                } else {
                    rocks.add(sand)
                    nbSand++
                    sand = Pair(500, 0)
                }
            }

        }
        return nbSand
    }
    fun star2(input: String) : Int {

        val rocks = input
            .lines()
            .createRocksCoordinates()
            .toMutableList()

        val maxY = rocks.sortedByDescending { pair -> pair.second }.first().second

        for (i in -1000 until 1000) {
            rocks.add(Pair(i, maxY+2))
        }

        var sand = Pair(500, 0)
        var possible = true
        var nbSand = 0

        while (possible) {
            if (!rocks.contains(Pair(sand.first, sand.second+1))) {
                sand = Pair(sand.first, sand.second+1)
                possible = true
            } else if (! rocks.contains(Pair(sand.first-1, sand.second+1))) {
                sand = Pair(sand.first-1, sand.second+1)
                possible = true
            } else if (! rocks.contains(Pair(sand.first+1, sand.second+1))) {
                sand = Pair(sand.first+1, sand.second+1)
                possible = true
            } else {
                if (rocks.contains(sand)) {
                    possible = false
                } else {
                    if (sand == Pair(500, 0)) {
                        nbSand++
                        return nbSand
                    } else {
                        rocks.add(sand)
                        nbSand++
                        sand = Pair(500, 0)
                    }
                }
            }

        }
        return nbSand
    }
}

private fun List<String>.createRocksCoordinates(): List<Pair<Int, Int>> {
    val lineRocks = mutableListOf<Pair<Int, Int>>()
    val lineSE = mutableListOf<Pair<Int, Int>>()
    this.forEach { line ->
        lineSE.clear()
        line.split(" -> ").forEach { cc ->
            cc.split(",").map { it.toInt() }.let {
                lineSE.add(Pair(it[0], it[1]))
            }
        }
        lineSE.forEachIndexed { index, pair ->
            if (index < lineSE.size - 1) {
                for (i in pair.first until lineSE[index+1].first) {
                    if (!lineRocks.contains(Pair(i, pair.second))) lineRocks.add(Pair(i, pair.second))
                }
                for (i in pair.second until lineSE[index+1].second) {
                    if (!lineRocks.contains(Pair(pair.first, i))) lineRocks.add(Pair(pair.first, i))
                }
                for (i in lineSE[index+1].first until pair.first) {
                    if (!lineRocks.contains(Pair(i, lineSE[index+1].second))) lineRocks.add(Pair(i, lineSE[index+1].second))
                }
                for (i in lineSE[index+1].second until pair.second) {
                    if (!lineRocks.contains(Pair(lineSE[index+1].first, i))) lineRocks.add(Pair(lineSE[index+1].first, i))
                }
                if (!lineRocks.contains(Pair(lineSE[index+1].first, lineSE[index+1].second))) lineRocks.add(Pair(lineSE[index+1].first, lineSE[index+1].second))
                if (!lineRocks.contains(pair)) lineRocks.add(pair)
            }
        }
    }
    return lineRocks
}

@kotlin.time.ExperimentalTime
fun main() {
    Processor.processDay(14, Day14::star1, Day14::star2)
}