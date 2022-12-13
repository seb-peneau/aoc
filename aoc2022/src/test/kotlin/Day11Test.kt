import days.Day11
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class Day11Test {

    @Test
    fun star1() {
        var data = """79,98
* 19
23
2
3

54,65,75,74
+ 6
19
2
0

79,60,97
* -1
13
1
3

74
+ 3
17
0
1"""
        assertEquals(10605, Day11.star1(data))
    }

    @Test
    fun star2() {
        val data = """79,98
* 19
23
2
3

54,65,75,74
+ 6
19
2
0

79,60,97
* -1
13
1
3

74
+ 3
17
0
1"""
        assertEquals(2713310158L, Day11.star2(data))
    }
}