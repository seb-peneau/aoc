import utils.Processor
import kotlin.math.abs

object Day1 {
    fun star1(input: String) : Int {
        val leftCol = mutableListOf<Int>()
        val rightCol = mutableListOf<Int>()
        input
            .lines()
            .forEach {
                val entries = it.split("   ").map { it.toInt() }
                leftCol.add(entries.get(0))
                rightCol.add(entries.get(1))
            }
        leftCol.sort()
        rightCol.sort()

        return leftCol.mapIndexed { index, i ->
            abs(i - rightCol.get(index))
        }.sum()
    }

    fun star2(input: String) : Int {
        val leftCol = mutableListOf<Int>()
        val rightCol = mutableListOf<Int>()
        input
            .lines()
            .forEach {
                val entries = it.split("   ").map { it.toInt() }
                leftCol.add(entries.get(0))
                rightCol.add(entries.get(1))
            }
        return leftCol.map { num ->
            num * rightCol.filter { it == num }.size
        }.sum()
    }
}

@kotlin.time.ExperimentalTime
fun main() {
    Processor.processDay(1, Day1::star1, Day1::star2)
}