import days.Day2
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class Day2Test {

    @Test
    fun star1() {
        val data = """A Y
B X
C Z"""
        assertEquals(15, Day2.star1(data))
    }

    @Test
    fun star2() {
        val data = """A Y
B X
C Z"""
        assertEquals(12, Day2.star2(data))
    }
}