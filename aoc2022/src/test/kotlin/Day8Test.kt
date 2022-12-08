import days.Day8
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class Day8Test {

    @Test
    fun star1() {
        val data = """30373
25512
65332
33549
35390"""
        assertEquals(21, Day8.star1(data))
    }

    @Test
    fun star2() {
        val data = """30373
25512
65332
33549
35390"""
        assertEquals(8, Day8.star2(data))
    }
}