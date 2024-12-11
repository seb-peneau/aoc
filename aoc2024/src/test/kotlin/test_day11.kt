import org.junit.jupiter.api.Test
import kotlin.test.assertEquals


object Test_day11 {

    @Test
    fun star1(): Unit {
        val data = """125 17"""
        assertEquals(55312, Day11.star1(data))
    }

    @Test
    fun star2() {
        val data = """"""
        assertEquals(0, Day11.star2(data))
    }
}


