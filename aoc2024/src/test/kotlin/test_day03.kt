import org.junit.jupiter.api.Test
import kotlin.test.assertEquals


object Test_day3 {
    @Test
    fun star1(): Unit {
        val data = """xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"""
        assertEquals(161, Day3.star1(data))
    }

    @Test
    fun star2() {
        val data = """xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"""
        assertEquals(48, Day3.star2(data))
    }

    @Test
    fun star2_2() {
        val data = """xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))don'tdon't()_mul(5,5)"""
        assertEquals(48, Day3.star2(data))
    }
}


