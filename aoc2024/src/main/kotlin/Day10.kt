import utils.Processor
import kotlin.time.ExperimentalTime

object Day10 {
    fun star1(input: String) : Int {
        val matrix = input.lines().map {
            it.split("").filter { !it.isEmpty() }.map { if (it == ".") { -1 } else { it.toInt() } }
        }
        val startPoints = mutableSetOf<Pair<Int, Int>>()
        matrix.forEachIndexed { y, line ->
            line.forEachIndexed { x, number ->
                if (number == 0) {
                    startPoints.add(Pair(x, y))
                }
            }
        }
        val res = startPoints.map { sp ->
            val pointsToTest = mutableSetOf<Pair<Int, Int>>(sp)
            var pathes = 0
            while(pointsToTest.size > 0) {
                val stp = pointsToTest.map { it }
                stp.forEach { startPoint ->
                    pointsToTest.remove(startPoint)
                    if (matrix[startPoint.second][startPoint.first] == 9) {
                        pathes++
                    } else {
                        val cv = matrix[startPoint.second][startPoint.first]
                        try {
                            if (matrix[startPoint.second+1][startPoint.first] == cv+1) { pointsToTest.add(Pair(startPoint.first, startPoint.second+1)) }
                        } catch (e: Exception) {}
                        try {
                            if (matrix[startPoint.second-1][startPoint.first] == cv+1) { pointsToTest.add(Pair(startPoint.first, startPoint.second-1)) }
                        } catch (e: Exception) {}
                        try {
                            if (matrix[startPoint.second][startPoint.first+1] == cv+1) { pointsToTest.add(Pair(startPoint.first+1, startPoint.second)) }
                        } catch (e: Exception) {}
                        try {
                            if (matrix[startPoint.second][startPoint.first-1] == cv+1) { pointsToTest.add(Pair(startPoint.first-1, startPoint.second)) }
                        } catch (e: Exception) {}
                    }
                }
            }
            pathes
        }
        return res.sum()
    }


    fun star2(input: String) : Int {
        val matrix = input.lines().map {
            it.split("").filter { !it.isEmpty() }.map { if (it == ".") { -1 } else { it.toInt() } }
        }
        val startPoints = mutableSetOf<Pair<Int, Int>>()
        matrix.forEachIndexed { y, line ->
            line.forEachIndexed { x, number ->
                if (number == 0) {
                    startPoints.add(Pair(x, y))
                }
            }
        }
        val res = startPoints.map { sp ->
            val pointsToTest = mutableListOf<Pair<Int, Int>>(sp)
            var pathes = 0
            while(pointsToTest.size > 0) {
                val stp = pointsToTest.map { it }
                stp.forEach { startPoint ->
                    pointsToTest.remove(startPoint)
                    if (matrix[startPoint.second][startPoint.first] == 9) {
                        pathes++
                    } else {
                        val cv = matrix[startPoint.second][startPoint.first]
                        try {
                            if (matrix[startPoint.second+1][startPoint.first] == cv+1) { pointsToTest.add(Pair(startPoint.first, startPoint.second+1)) }
                        } catch (e: Exception) {}
                        try {
                            if (matrix[startPoint.second-1][startPoint.first] == cv+1) { pointsToTest.add(Pair(startPoint.first, startPoint.second-1)) }
                        } catch (e: Exception) {}
                        try {
                            if (matrix[startPoint.second][startPoint.first+1] == cv+1) { pointsToTest.add(Pair(startPoint.first+1, startPoint.second)) }
                        } catch (e: Exception) {}
                        try {
                            if (matrix[startPoint.second][startPoint.first-1] == cv+1) { pointsToTest.add(Pair(startPoint.first-1, startPoint.second)) }
                        } catch (e: Exception) {}
                    }
                }
            }
            pathes
        }
        return res.sum()
    }
}

@ExperimentalTime
fun main() {
    Processor.processDay(10, Day10::star1, Day10::star2)
}