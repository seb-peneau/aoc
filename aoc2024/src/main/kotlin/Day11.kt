import utils.Processor
import kotlin.collections.mutableMapOf
import kotlin.time.ExperimentalTime

object Day11 {
    fun star1(input: String) : Int {
        var stones = input.split(" ").map { it.toInt().toLong() }.toList()
        for (i in 1..25) {
            stones = blink(stones)
        }
        return stones.size
    }

    private fun blink(stones: List<Long>): List<Long> = stones.flatMap { stone ->
        if (stone == 0L) {
            listOf(1)
        } else if (stone.toString().length % 2 == 0) {
            val size = stone.toString().length / 2
            listOf(stone.toString().substring(0, size).toLong(), stone.toString().substring(size, size * 2).toLong())
        } else {
            listOf(stone * 2024)
        }
    }

    val cache = mutableMapOf<Long, MutableMap<Int, Long>>()

    fun bl(currentValue: Long, currentIndex: Int) : Long {
        if (cache.get(currentValue) == null) {
            cache[currentValue] = mutableMapOf<Int, Long>()
        }
        if (currentIndex == 75) {
            return blink(listOf(currentValue)).size.toLong()
        } else {
            if (cache[currentValue] != null && cache[currentValue]?.contains(currentIndex) == true && cache[currentValue]?.get(currentIndex) != null) {
                return cache[currentValue]!!.get(currentIndex)!!
            } else {
                val v = blink(listOf(currentValue)).map {
                    bl(it, currentIndex+1)
                }.sum()
                cache[currentValue]?.set(currentIndex, v)
                return v
            }
        }
    }

    fun star2(input: String) : Long {
        var stones = input.split(" ").map { it.toLong() }.toList()
        return stones.map {
            bl(it, 1)
        }.sum()
    }
}

@ExperimentalTime
fun main() {
    Processor.processDay(11, Day11::star1, Day11::star2)
}