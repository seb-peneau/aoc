package days

import utils.Processor

object Day6 {
    fun star1(input: String) : Int {
        input
            .forEachIndexed { index, c ->
                if (index + 4 < input.length) {
                    val sublist = input.substring(index, index + 4)
                    val group = sublist.groupBy { it.code }
                    if (group.size == 4) {
                        return index + 4
                    }
                } else {
                    return -1
                }
            }
        return -1
    }


    fun star2(input: String) : Int {
        input
            .forEachIndexed { index, c ->
                if (index + 14 < input.length) {
                    val sublist = input.substring(index, index + 14)
                    val group = sublist.groupBy { it.code }
                    if (group.size == 14) {
                        return index + 14
                    }
                } else {
                    return -1
                }
            }
        return -1
    }
}

@kotlin.time.ExperimentalTime
fun main() {
    Processor.processDay(6, Day6::star1, Day6::star2)
}