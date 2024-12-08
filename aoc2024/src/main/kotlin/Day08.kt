import utils.Processor
import kotlin.time.ExperimentalTime

object Day8 {
    fun star1(input: String) : Int {
        val nodes = mutableMapOf<String, MutableList<Pair<Int, Int>>>()
        val allnodes = mutableSetOf<Pair<Int, Int>>()
        val l = input.lines().forEachIndexed { y, line ->
            line.split("").filter { !it.isEmpty() }.forEachIndexed { x, char ->
                if (char != ".") {
                    if (nodes.keys.contains(char)) {
                        nodes.get(char)?.add(Pair(x, y))
                    } else {
                        nodes.put(char, mutableListOf(Pair(x, y)))
                    }
                    allnodes.add(Pair(x, y))
                }
            }
        }
        val antinodes = mutableListOf<Pair<Int, Int>>()
        val maxX = input.lines().get(0).split("").filter { !it.isEmpty() }.size
        val maxY = input.lines().size

        nodes.forEach { char, charList ->
            for (i in charList) {
                for (j in charList) {
                    if (i !== j) {
                        val dx = i.first - j.first
                        val dy = i.second - j.second
                        if (
                            i.first + dx >= 0 && i.first + dx <= maxX
                            && i.second + dy >= 0 && i.second + dy < maxY
                            && !allnodes.contains(Pair(i.first+dx, i.second+dy))) {
                            antinodes.add(Pair(i.first+dx, i.second+dy))
                        }
                    }
                }
            }
        }
        return antinodes.size
    }
    fun star2(input: String) : Int {
        val nodes = mutableMapOf<String, MutableList<Pair<Int, Int>>>()
        val allnodes = mutableSetOf<Pair<Int, Int>>()
        val l = input.lines().forEachIndexed { y, line ->
            line.split("").filter { !it.isEmpty() }.forEachIndexed { x, char ->
                if (char != ".") {
                    if (nodes.keys.contains(char)) {
                        nodes.get(char)?.add(Pair(x, y))
                    } else {
                        nodes.put(char, mutableListOf(Pair(x, y)))
                    }
                    allnodes.add(Pair(x, y))
                }
            }
        }
        val antinodes = mutableSetOf<Pair<Int, Int>>()
        val maxX = input.lines().get(0).split("").filter { !it.isEmpty() }.size
        val maxY = input.lines().size

        nodes.forEach { char, charList ->
            for (i in charList) {
                for (j in charList) {
                    if (i !== j) {
                        val dx = i.first - j.first
                        val dy = i.second - j.second
                        var echo = i
                        var oldEcho = Pair(-1, -1)
                        while (oldEcho != echo) {
                            oldEcho = echo
                            if (echo.first + dx >= 0 && echo.first + dx < maxX
                                && echo.second + dy >= 0 && echo.second + dy < maxY) {
                                if (!allnodes.contains(Pair(echo.first+dx, echo.second+dy))) {
                                    antinodes.add(Pair(echo.first+dx, echo.second+dy))
                                }
                                echo = Pair(echo.first+dx, echo.second+dy)
                            }
                        }

                    }
                }
            }
        }
        var count = 0
        nodes.forEach { char, l ->
            if (l.size > 1) {
                count += l.size
            }
        }
        return antinodes.size + count
    }
}

@ExperimentalTime
fun main() {
    Processor.processDay(8, Day8::star1, Day8::star2)
}