import days.Day1
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class Day1Test {

    @Test
    fun star1() {
        val data = """1000
2000
3000

4000

5000
6000

7000
8000
9000

10000"""
        assertEquals(24000, Day1.star1(data))
    }

    @Test
    fun star2() {
        val data = """1000
2000
3000

4000

5000
6000

7000
8000
9000

10000"""
        assertEquals(45000, Day1.star2(data))
    }
}