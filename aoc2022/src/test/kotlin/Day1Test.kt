import days.Day1
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class Day1Test {

    @Test
    fun star1() {
        val data = """199
200
208
210
200
207
240
269
260
263"""
        assertEquals(7, Day1.star1(data))
    }
}