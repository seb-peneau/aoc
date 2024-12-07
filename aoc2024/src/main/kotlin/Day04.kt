import utils.Processor
import kotlin.text.lines
import kotlin.time.ExperimentalTime

object Day4 {
    fun star1(input: String) : Int {
        val matrix = input.lines().map { it.split("") }
        var res = 0
        matrix.forEachIndexed { y, line ->
            line.forEachIndexed { x, letter ->
                if (letter == "X") {
                    res += checkLetter(matrix, x, y)
                }
            }
        }
        return res
    }

    private fun checkLetter(matrix: List<List<String>>, x: Int, y: Int): Int {
        var count = 0
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
        val matrix = input.lines().map { it.split("") }
        var res = 0
        for (y in 0..matrix.size-1) {
            for(x in 0..matrix[y].size-1) {
                if (matrix[y][x] == "A") {
                    res += checkLetterStar2(matrix, x, y)
                }
            }
        }
        return res
    }


    private fun checkLetterStar2(matrix: List<List<String>>, x: Int, y: Int): Int {
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