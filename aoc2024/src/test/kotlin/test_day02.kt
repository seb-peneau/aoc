import org.junit.jupiter.api.Test
import kotlin.test.assertEquals


object Test_day2 {
    @Test
    fun star1(): Unit {
        val data = """7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9"""
        assertEquals(2, Day2.star1(data))
    }

    @Test
    fun star2() {
        val data = """7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9"""
        assertEquals(4, Day2.star2(data))
    }
}


