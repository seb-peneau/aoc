import org.junit.jupiter.api.Test
import kotlin.test.assertEquals


object Test_day4 {
    @Test
    fun star1(): Unit {
        val data = """MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX"""
        assertEquals(18, Day4.star1(data))
    }

    @Test
    fun star2() {
        val data = """MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX"""
        assertEquals(9, Day4.star2(data))
    }
}


