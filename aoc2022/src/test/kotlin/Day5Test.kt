import days.Day5
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class Day5Test {

    @Test
    fun star1() {
        val data = """    [D]
[N] [C]
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2"""
        assertEquals("CMZ", Day5.star1(data))
    }

    @Test
    fun star2() {
        val data = """    [D]
[N] [C]
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2"""
        assertEquals("MCD", Day5.star2(data))
    }
}