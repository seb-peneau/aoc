import org.junit.jupiter.api.Test
import kotlin.test.assertEquals


object Test_day9 {
    @Test
    fun star1(): Unit {
        val data = """2333133121414131402"""
        assertEquals(1928, Day9.star1(data))
    }

    @Test
    fun star2_1() {
        @Test
        fun star2() {
            val data = """2333133121414131402"""
            assertEquals(2858, Day9.star2(data))
        }
    }

    @Test
    fun star2() {
        val data = """2333133121414131402"""
        assertEquals(2858, Day9.star2(data))
    }
}


