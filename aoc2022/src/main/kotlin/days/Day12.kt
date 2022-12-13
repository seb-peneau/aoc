package days

import utils.Processor
import kotlin.math.min

object Day12 {
    fun star1(input: String) : Int {
        val grid = mutableListOf<MutableList<Int>>()
        var weights = mutableListOf<MutableList<Int>>()
        var updateds: MutableList<Pair<Int, Int>>
        var xE = 0
        var yE = 0
        var xS = 0
        var yS = 0
        input.lines().forEachIndexed { y, s ->
            grid.add(y, mutableListOf())
            weights.add(y, mutableListOf())
            s.forEachIndexed { x, char ->
                if (char == 'E') {
                    grid[y].add(x, 'z'.code + 1) ///// boooooooh
                } else {
                    grid[y].add(x, char.code)
                }
                if (char == 'S') {
                    weights[y].add(x, 0)
                    xS = x
                    yS = y
                } else if (char == 'E') {
                    weights[y].add(x, 9999)
                    xE = x
                    yE = y
                } else {
                    weights[y].add(x, 9999)
                }
            }
        }

        val t =  test(xS, yS, grid, weights)
        weights = t.first
        updateds = t.second
        while (updateds.size > 0) {
            var toto = mutableListOf<Pair<Int, Int>>()
            updateds.forEachIndexed { index, pair ->
                val t =  test(pair.second, pair.first, grid, weights)
                weights = t.first
                toto.addAll(t.second)
            }
            updateds = toto
        }
        return weights[yE][xE]
    }
    fun star2(input: String) : Int {
        val grid = mutableListOf<MutableList<Int>>()
        var weights = mutableListOf<MutableList<Int>>()
        var updateds: MutableList<Pair<Int, Int>>
        var everyA = mutableListOf<Pair<Int, Int>>()
        var xE = 0
        var yE = 0
        input.lines().forEachIndexed { y, s ->
            grid.add(y, mutableListOf())
            weights.add(y, mutableListOf())
            s.forEachIndexed { x, char ->
                if (char == 'E') {
                    grid[y].add(x, 'z'.code + 1) ///// boooooooh
                } else {
                    grid[y].add(x, char.code)
                }
                if (char == 'S' || char == 'a') {
                    weights[y].add(x, 9999)
                    everyA.add(Pair(x, y))
                } else if (char == 'E') {
                    weights[y].add(x, 9999)
                    xE = x
                    yE = y
                } else {
                    weights[y].add(x, 9999)
                }
            }
        }

        return everyA.map { pair ->
            var weightFor = weights.map { it.toMutableList() }.toMutableList()
            weightFor[pair.second][pair.first] = 1
            val t =  test(pair.first, pair.second, grid, weightFor)
            weightFor = t.first
            updateds = t.second
            while (updateds.size > 0) {
                var toto = mutableListOf<Pair<Int, Int>>()
                updateds.forEachIndexed { index, pair ->
                    val t =  test(pair.second, pair.first, grid, weightFor)
                    weightFor = t.first
                    toto.addAll(t.second)
                }
                updateds = toto
            }
            weightFor[yE][xE]
        }.min() - 1
    }

    private fun test(x: Int, y: Int, grid: List<List<Int>>, weights: MutableList<MutableList<Int>>) :  Pair<MutableList<MutableList<Int>>,MutableList<Pair<Int, Int>>> {
        val updateds = mutableListOf<Pair<Int,Int>>()
        if (x < (grid[0].size - 1) && (grid[y][x] + 1 == grid[y][x+1] || grid[y][x] >= grid[y][x+1] || grid[y][x] == 'S'.code) ) {
            val lastWeight = weights[y][x+1]
            weights[y][x+1] = min(weights[y][x+1], weights[y][x] + 1)
            if (weights[y][x+1] != lastWeight) {
                updateds.add(Pair(y, x+1))
            }
        }
        if (x > 0 && (grid[y][x] + 1 == grid[y][x-1] || grid[y][x] >= grid[y][x-1] || grid[y][x] == 'S'.code) ) {
            val lastWeight = weights[y][x-1]
            weights[y][x-1] = min(weights[y][x-1], weights[y][x] + 1)
            if (weights[y][x-1] != lastWeight) {
                updateds.add(Pair(y, x-1))
            }
        }
        if (y > 0 && (grid[y][x] + 1 == grid[y-1][x] || grid[y][x] >= grid[y-1][x] || grid[y][x] == 'S'.code) ) {
            val lastWeight = weights[y-1][x]
            weights[y-1][x] = min(weights[y-1][x], weights[y][x] + 1)
            if (weights[y-1][x] != lastWeight) {
                updateds.add(Pair(y-1, x))
            }
        }
        if (y < grid.size - 1 && (grid[y][x] + 1 == grid[y+1][x] || grid[y][x] >= grid[y+1][x] || grid[y][x] == 'S'.code) ) {
            val lastWeight = weights[y+1][x]
            weights[y+1][x] = min(weights[y+1][x], weights[y][x] + 1)
            if (weights[y+1][x] != lastWeight) {
                updateds.add(Pair(y+1, x))
            }
        }
        return Pair(weights, updateds.toMutableList())
    }


}

@kotlin.time.ExperimentalTime
fun main() {
    Processor.processDay(12, Day12::star1, Day12::star2)
}