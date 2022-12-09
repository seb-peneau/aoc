import days.Day2
import days.Day9
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class Day9Test {

    @Test
    fun star1() {
        var data = """R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2"""
        assertEquals(13, Day9.star1(data))
    }

    @Test
    fun star2() {
        var data = """R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2"""
        assertEquals(1, Day9.star2(data))

        data = """R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20"""
        assertEquals(36, Day9.star2(data))
    }
}