package days

import utils.Processor
import kotlin.math.max

object Day8 {
    fun star1(input: String) : Int {
        val grid = mutableListOf<MutableList<Int>>()
        input
            .lines()
            .forEachIndexed { y, xlist ->
                val xItems = mutableListOf<Int>()
                xlist.forEachIndexed { x, c ->
                    xItems.add(x, c.toString().toInt())
                }
                grid.add(y, xItems)
            }
        var count = 0
        for (y in 1 until grid.size - 1) {
            for (x in 1 until grid[1].size - 1) {
                count += testPoint(y, x, grid)
            }
        }
        return count + 2*grid.size + 2*(grid[1].size - 2)
    }

    private fun testPoint(y: Int, x: Int, grid: MutableList<MutableList<Int>>): Int {
        var visible = true
        //test y from up to bottom
        for (vy in 0 until y) {
            if (grid[vy][x] >= grid[y][x]) {
                visible = false
            }
        }
        if (visible) return 1
        visible = true
        //test y from bottom to up
        for (vy in grid.size-1 downTo y+1) {
            if (grid[vy][x] >= grid[y][x]) {
                visible = false
            }
        }
        if (visible) return 1
        visible = true
        //test x from left to right
        for (vx in 0 until x) {
            if (grid[y][vx] >= grid[y][x]) {
                visible = false
            }
        }
        if (visible) return 1
        visible = true
        //test y from right to left
        var xx = grid[1].size-1
        while (xx > x) {
            if (grid[y][xx] >= grid[y][x]) {
                visible = false
            }
            xx -= 1
        }
        return if (visible) 1 else 0
    }

    private fun computePoint(y: Int, x: Int, grid: MutableList<MutableList<Int>>): Int {
        var count = 1
        //test y from TO UP
        var visible = false
        var c = 0
        for (vy in y-1 downTo  0) {
            if (grid[vy][x] < grid[y][x] && !visible) {
                c++
            } else {
                if (!visible) {c += 1}
                visible = true
            }
        }
        if (c > 0) count *= c
        //test y from bottom to up
        visible = false
        c = 0
        for (vy in y+1 until grid.size) {
            if (grid[vy][x] < grid[y][x] && !visible) {
                c++
            } else {
                if (!visible) {c += 1}
                visible = true
            }
        }
        if (c > 0) count *= c
        //test x from left to right
        visible = false
        c = 0
        for (vx in x-1 downTo  0) {
            if (grid[y][vx] < grid[y][x] && !visible) {
                c++
            } else {
                if (!visible) {c += 1}
                visible = true
            }
        }
        if (c > 0) count *= c
        //test y from right to left
        visible = false
        c = 0
        for (vx in x+1 until grid[1].size) {
            if (grid[y][vx] < grid[y][x] && !visible) {
                c++
            } else {
                if (!visible) {c += 1}
                visible = true
            }
        }
        if (c > 0) count *= c
        return count
    }


    fun star2(input: String) : Int {
        val grid = mutableListOf<MutableList<Int>>()
        input
            .lines()
            .forEachIndexed { y, xlist ->
                val xItems = mutableListOf<Int>()
                xlist.forEachIndexed { x, c ->
                    xItems.add(x, c.toString().toInt())
                }
                grid.add(y, xItems)
            }
        var max = 0
        for (y in 1 until grid.size - 1) {
            for (x in 1 until grid[1].size - 1) {
                max = max(computePoint(y, x, grid), max)
            }
        }
        return max
    }
}

@kotlin.time.ExperimentalTime
fun main() {
    Processor.processDay(8, Day8::star1, Day8::star2)
}