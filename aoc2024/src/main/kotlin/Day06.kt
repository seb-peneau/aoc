import utils.Processor
import kotlin.collections.mutableListOf
import kotlin.time.ExperimentalTime

object Day6 {
    fun star1(input: String) : Int {
        val obstacles = mutableListOf<Pair<Int, Int>>()
        var guard = Pair(0,0)
        input.lines().forEachIndexed { y, line ->
            line.split("").filter { !it.isEmpty() }.forEachIndexed { x, char ->
                if (char == "#") { obstacles.add(Pair(x, y)) }
                if (char == "^") {
                    guard = Pair(x, y)
                }
            }
        }
        var direction = "up"
        var directionHistory = mutableListOf<String>()
        val visited = mutableSetOf<Pair<Int, Int>>()
        var lastVisitedSize = -1
        var loopSize = 0
        //println(obstacles)
        while (loopSize < 2 && direction != "stars") {
            if (lastVisitedSize == visited.size) {
                loopSize++
            } else {
                loopSize = 0
            }
            lastVisitedSize = visited.size
            directionHistory.add(direction)
            //println("Direction $direction, visited $visited")
            //prettyprint(visited, input.lines().get(0).split("").size-1, input.lines().size-1)
            when(direction) {
                "up" -> {
                    val firstObstacle = obstacles.filter { it -> it.first == guard.first && it.second < guard.second }.sortedBy { it.second }
                    if (firstObstacle.size > 0) {
                        firstObstacle.last().let {
                            //println("-- guard: $guard obstacle: $it")
                            for (i in guard.second downTo it.second+1) {
                                visited.add(Pair(it.first, i))
                            }
                            guard = Pair(guard.first, it.second + 1)
                            direction = "right"
                        }
                    } else {
                        for (i in guard.second downTo 0) {
                            visited.add(Pair(guard.first, i))
                        }
                        direction = "stars"
                    }
                }
                "down" -> {
                    val firstObstacle = obstacles.filter { it -> it.first == guard.first && it.second > guard.second }.sortedBy { it.second }
                    if (firstObstacle.size > 0) {
                        firstObstacle.first().let {
                            //println("-- guard: $guard obstacle: $it")
                            for (i in guard.second until it.second) {
                                visited.add(Pair(it.first, i))
                            }
                            guard = Pair(guard.first, it.second - 1)
                            direction = "left"
                        }
                    } else {
                        for (i in guard.second until input.lines().size) {
                            visited.add(Pair(guard.first, i))
                        }
                        direction = "stars"
                    }

                }
                "right" -> {
                    val firstObstacle = obstacles.filter { it -> it.second == guard.second && it.first > guard.first }.sortedBy { it.first }
                    //println(firstObstacle)
                    if (firstObstacle.size > 0) {
                        firstObstacle.first().let {
                            //println("-- guard: $guard obstacle: $it")
                            for (i in guard.first until it.first) {
                                visited.add(Pair(i, it.second))
                            }
                            guard = Pair(it.first - 1, guard.second)
                            direction = "down"
                        }
                    } else {
                        for (i in guard.first until input.lines().get(0).split("").size) {
                            visited.add(Pair(i, guard.second))
                        }
                        direction = "stars"
                    }
                }
                "left" -> {
                    val firstObstacle = obstacles.filter { it -> it.second == guard.second && it.first < guard.first }.sortedBy { it.first }
                    if (firstObstacle.size > 0) {
                        firstObstacle.last().let {
                            //println("-- guard: $guard obstacle: $it")
                            for (i in guard.first downTo it.first+1) {
                                visited.add(Pair(i, it.second))
                            }
                            guard = Pair(it.first + 1, guard.second)
                            direction = "up"
                        }
                    } else {
                        for (i in guard.first downTo 0) {
                            visited.add(Pair(i, guard.second))
                        }
                        direction = "stars"
                    }

                }
            }
        }
        //prettyprint(visited, input.lines().get(0).split("").size, input.lines().size)
        return if (lastVisitedSize == visited.size) {
            //println("loop with direction $directionHistory")
            -1
        } else visited.size
    }

    private fun prettyprint(
        visited: MutableSet<Pair<Int, Int>>,
        maxX: Int,
        maxY: Int
    ) {
        for(y in 0 until maxY) {
            //println("")
            for (x in 0 until maxX) {
                if (visited.contains(Pair(x, y))) {
                    print("v")
                } else {
                    print(".")
                }
            }
        }


    }

    fun star2(input: String) : Int {
        val matrix = input.lines().map { line -> line.split("") }
        var count = 0
        val maxY = matrix.size
        var maxX = matrix.get(0).filter { !it.isEmpty() }.size
        for (i in 0 until maxY) {
            for (j in 0 until maxX) {
                //println("-----------")
                //println("--- for $i $j")
                val input2 = input.lines().mapIndexed { y, line ->
                    line.split("").filter { !it.isEmpty() }
                        .mapIndexed { x, char ->
                            if (char == "." && y == i && x == j) {
                                "#"
                            } else char
                        }.joinToString("")
                }.joinToString("\n")
                if (input2 != input) {
                    //println(input2)
                    if (star1(input2) == -1) {
                        count++
                    }
                }
            }
        }
        return count
    }
}

@ExperimentalTime
fun main() {
    Processor.processDay(6, Day6::star1, Day6::star2)
}