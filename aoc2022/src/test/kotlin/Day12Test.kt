import days.Day12
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class Day12Test {

    @Test
    fun star1() {
        val data = """Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi"""
        assertEquals(31, Day12.star1(data))
    }

    @Test
    fun star2() {
        val data = """Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi"""
        assertEquals(29, Day12.star2(data))
    }
}