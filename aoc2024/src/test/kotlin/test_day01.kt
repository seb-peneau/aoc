import org.junit.jupiter.api.Test
import kotlin.test.assertEquals


object Test_day1 {
    @Test
    fun star1(): Unit {
        val data = """3   4
4   3
2   5
1   3
3   9
3   3"""
        assertEquals(11, Day1.star1(data))
    }

    @Test
    fun star2() {
        val data = """3   4
4   3
2   5
1   3
3   9
3   3"""
        assertEquals(31, Day1.star2(data))
    }
}


