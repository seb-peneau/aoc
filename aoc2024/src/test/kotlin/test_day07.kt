import org.junit.jupiter.api.Test
import kotlin.test.assertEquals


object Test_day7 {
    @Test
    fun star1(): Unit {
        val data = """190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20"""
        assertEquals(3749, Day7.star1(data))
    }

    @Test
    fun star2() {
        val data = """190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20"""
        assertEquals(11387, Day7.star2(data))
    }
}


