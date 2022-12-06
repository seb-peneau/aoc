import days.Day6
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class Day6Test {

    @Test
    fun star1() {
        var data = """mjqjpqmgbljsphdztnvjfqwrcgsmlb"""
        assertEquals(7, Day6.star1(data))
        data = """bvwbjplbgvbhsrlpgdmjqwftvncz"""
        assertEquals(5, Day6.star1(data))
        data = """nppdvjthqldpwncqszvftbrmjlhg"""
        assertEquals(6, Day6.star1(data))
        data = """nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"""
        assertEquals(10, Day6.star1(data))
        data = """zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"""
        assertEquals(11, Day6.star1(data))
    }

    @Test
    fun star2() {
        var data = """mjqjpqmgbljsphdztnvjfqwrcgsmlb"""
        assertEquals(19, Day6.star2(data))
        data = """bvwbjplbgvbhsrlpgdmjqwftvncz"""
        assertEquals(23, Day6.star2(data))
        data = """nppdvjthqldpwncqszvftbrmjlhg"""
        assertEquals(23, Day6.star2(data))
        data = """nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"""
        assertEquals(29, Day6.star2(data))
        data = """zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"""
        assertEquals(26, Day6.star2(data))
    }
}