package days

import utils.Processor


object Day1 {

    fun star1(input: String) : Int {
        return input
            .prepareData()
            .computeElfPack()
            .max() // get max value
    }

    fun star2(input: String) : Int {
        return input
            .prepareData()
            .computeElfPack()
            .getThreeMax()
            .sum()
    }
}

private fun List<Int>.getThreeMax(): List<Int> {
    return this.sortedDescending()
        .filterIndexed { index, i -> index < 3 }
}

private fun List<String>.computeElfPack(): List<Int> {
    return this.map { elfPack ->
        elfPack.split(",").sumOf { it.toInt() } // map with the sum of food
    }
}

private fun String.prepareData(): List<String> {
    return this.lines() // read all lines
        .joinToString(",") // create a string without lines
        .split(",,") // split on empty values
}

@kotlin.time.ExperimentalTime
fun main() {
    Processor.processDay(1, Day1::star1, Day1::star2)
}