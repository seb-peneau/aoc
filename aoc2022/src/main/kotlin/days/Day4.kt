package days

import utils.Processor

object Day4 {
    fun star1(input: String) : Int {
        return input
            .lines()
            .createLists()
            .filterToGetOverlap()
            .size
    }
    fun star2(input: String) : Int {
        return input
            .lines()
            .createLists()
            .filterToGetDistinct()
            .size
    }
}

private fun List<List<MutableList<Int>>>.filterToGetDistinct(): List<List<MutableList<Int>>> {
    return this
        .filter { elfSections ->
            for (i in elfSections[0]) {
                if (elfSections[1].contains(i)) {
                    return@filter true
                }
            }
            false
        }
}

private fun List<List<MutableList<Int>>>.filterToGetOverlap() : List<List<MutableList<Int>>> {
    return this
        .filter { elfSections ->
            var overlapList1 = true
            for (i in elfSections[0]) {
                if (!elfSections[1].contains(i)) {
                    overlapList1 = false
                }
            }
            var overlapList2 = true
            for (i in elfSections[1]) {
                if (!elfSections[0].contains(i)) {
                    overlapList2 = false
                }
            }
            overlapList1 || overlapList2
        }
}

private fun List<String>.createLists() : List<List<MutableList<Int>>> {
    return this
        .map { elfPair ->
            elfPair
                .split(",")
                .map { elfSection ->
                    val section = elfSection.split(("-"))
                    val list = mutableListOf<Int>()
                    for (i in section[0].toInt().rangeTo(section[1].toInt())) {
                        list.add(i)
                    }
                    return@map list
                }
        }
}

@kotlin.time.ExperimentalTime
fun main() {
    Processor.processDay(4, Day4::star1, Day4::star2)
}