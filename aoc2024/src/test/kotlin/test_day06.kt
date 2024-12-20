import org.junit.jupiter.api.Test
import kotlin.test.assertEquals


object Test_day6 {
    @Test
    fun star1(): Unit {
        val data = """....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#..."""
        assertEquals(41, Day6.star1(data))
    }

    @Test
    fun star2() {
        val data = """....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#..."""
        assertEquals(6, Day6.star2(data))
    }
}


