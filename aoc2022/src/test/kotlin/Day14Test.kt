import days.Day14
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class Day14Test {

    @Test
    fun star1() {
        val data = """498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9"""
        assertEquals(24, Day14.star1(data))
    }

    @Test
    fun star2() {
        val data = """498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9"""
        assertEquals(93, Day14.star2(data))
    }
}