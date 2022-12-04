import days.Day4
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class Day4Test {

    @Test
    fun star1() {
        val data = """2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8"""
        assertEquals(2, Day4.star1(data))
    }

    @Test
    fun star2() {
        val data = """2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8"""
        assertEquals(4, Day4.star2(data))
    }
}