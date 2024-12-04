import utils.Processor
import kotlin.text.lines
import kotlin.time.ExperimentalTime

object Day4 {
    fun star1(input: String) : Int {
        return input
            .lines()
            .mapIndexed { y, line ->
                line
                    .split("")
                    .mapIndexed { x,letter ->
                        if (letter != "X") {
                            0
                        } else {
                            checkLetter(input, x, y)
                        }
                    }.sum()
            }.sum()
    }

    private fun checkLetter(input: String, x: Int, y: Int): Int {
        var count = 0
        val matrix = input.lines().map { it.split("") }
        if ((x+3 < matrix[0].size) && matrix[y][x+1] == "M" && matrix[y][x+2] == "A" && matrix[y][x+3] == "S") { count++ }
        if ((x-3 >= 0) && matrix[y][x-1] == "M" && matrix[y][x-2] == "A" && matrix[y][x-3] == "S") { count++ }
        if ((y-3 >= 0) && matrix[y-1][x] == "M" && matrix[y-2][x] == "A" && matrix[y-3][x] == "S") { count++ }
        if ((y+3 < matrix.size) && matrix[y+1][x] == "M" && matrix[y+2][x] == "A" && matrix[y+3][x] == "S") { count++ }
        if ((x+3 < matrix[0].size) && (y+3 < matrix.size) && matrix[y+1][x+1] == "M" && matrix[y+2][x+2] == "A" && matrix[y+3][x+3] == "S") { count++ }
        if ((y-3 >= 0) && (x-3 >= 0) && matrix[y-1][x-1] == "M" && matrix[y-2][x-2] == "A" && matrix[y-3][x-3] == "S") { count++ }
        if ((y-3 >= 0) && (x+3 < matrix[0].size) && matrix[y-1][x+1] == "M" && matrix[y-2][x+2] == "A" && matrix[y-3][x+3] == "S") { count++ }
        if ((y+3 < matrix.size) && (x-3 >= 0) && matrix[y+1][x-1] == "M" && matrix[y+2][x-2] == "A" && matrix[y+3][x-3] == "S") { count++ }
        return count
    }

    fun star2(input: String) : Int {
        return input
            .lines()
            .mapIndexed { y, line ->
                line
                    .split("")
                    .mapIndexed { x,letter ->
                        if (letter != "A") {
                            0
                        } else {
                            checkLetterStar2(input, x, y)
                        }
                    }.sum()
            }.sum()    }

    private fun checkLetterStar2(input: String, x: Int, y: Int): Int {
        val matrix = input.lines().map { it.split("") }
        if ((x-1 >= 0 && y-1 >= 0 && x+1 < matrix[y].size && y+1 < matrix.size)) {
            if (
                ((matrix[y-1][x-1] == "M" && matrix[y+1][x+1] == "S") || ((matrix[y-1][x-1] == "S" && matrix[y+1][x+1] == "M")))
                && ((matrix[y-1][x+1] == "M" && matrix[y+1][x-1] == "S") || ((matrix[y-1][x+1] == "S" && matrix[y+1][x-1] == "M")))
                ) {
                return 1
            }
        }
        return 0
    }
}

@ExperimentalTime
fun main() {
    Processor.processDay(4, Day4::star1, Day4::star2)
}