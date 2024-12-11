import org.junit.jupiter.api.Test
import kotlin.test.assertEquals


object Test_day10 {

    @Test
    fun star1_test1() {
        val data = """...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9"""
        assertEquals(2, Day10.star1(data))
    }

    @Test
    fun star1_test2(): Unit {
        val data = """..90..9
...1.98
...2..7
6543456
765.987
876....
987...."""
        assertEquals(4, Day10.star1(data))
    }

    @Test
    fun star1_test3(): Unit {
        val data = """10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01"""
        assertEquals(3, Day10.star1(data))
    }

    @Test
    fun star1(): Unit {
        val data = """89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732"""
        assertEquals(36, Day10.star1(data))
    }

    @Test
    fun star2() {
        val data = """89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732"""
        assertEquals(81, Day10.star2(data))
    }
}
