import jdk.javadoc.internal.doclets.formats.html.markup.HtmlStyle.index
import utils.Processor
import kotlin.time.ExperimentalTime

object Day7 {
    fun star1(input: String) : Long {
        return input.lines().map { line ->
            line.isPossible()
        }.sum()
    }
    fun star2(input: String) : Long {
        return input.lines().map { line ->
            line.isPossiblePart2()
        }.sum()
    }

    fun String.isPossible() : Long {

        this.split(":").let { r ->
            val result = r[0].trim().toLong()
            val numbers = r[1].split(" ").filter { !it.isEmpty() }.map { it.toLong() }.toMutableList()
            println("test $result with $numbers")

            var possible = mutableListOf<List<Long>>()
            possible.add(numbers)

            var completed = false

            while(completed == false) {
                completed = true
                possible = possible.flatMap { nbList ->
                    if (nbList.size > 1) {
                        completed = false
                        mutableListOf<List<Long>>(
                            nbList.mapIndexedNotNull { index, elem ->
                                if (index == 0) {
                                    null
                                } else if (index == 1) {
                                    elem * nbList[0]
                                } else {
                                    elem
                                }
                            },
                            nbList.mapIndexedNotNull { index, elem ->
                                if (index == 0) {
                                    null
                                } else if (index == 1) {
                                    elem + nbList[0]
                                } else {
                                    elem
                                }
                            })
                    } else {
                        mutableListOf(nbList)
                    }
                } as MutableList<List<Long>>
            }
            var results = possible.map { it.get(0) }
            println(results)
            if (results.contains(result)) {
                return result
            } else {
                return 0
            }
        }

        return 0
    }

    fun String.isPossiblePart2() : Long {

        this.split(":").let { r ->
            val result = r[0].trim().toLong()
            val numbers = r[1].split(" ").filter { !it.isEmpty() }.map { it.toLong() }.toMutableList()
            println("test $result with $numbers")

            var possible = mutableListOf<List<Long>>()
            possible.add(numbers)

            var completed = false

            while(completed == false) {
                completed = true
                possible = possible.flatMap { nbList ->
                    if (nbList.size > 1) {
                        completed = false
                        mutableListOf<List<Long>>(
                            nbList.mapIndexedNotNull { index, elem ->
                                if (index == 0) {
                                    null
                                } else if (index == 1) {
                                    elem * nbList[0]
                                } else {
                                    elem
                                }
                            },
                            nbList.mapIndexedNotNull { index, elem ->
                                if (index == 0) {
                                    null
                                } else if (index == 1) {
                                    elem + nbList[0]
                                } else {
                                    elem
                                }
                            },
                            nbList.mapIndexedNotNull { index, elem ->
                                if (index == 0) {
                                    null
                                } else if (index == 1) {
                                    val s = listOf<Long>(nbList[0], elem).joinToString("")
                                    s.toLong()
                                } else {
                                    elem
                                }
                            })
                    } else {
                        mutableListOf(nbList)
                    }
                } as MutableList<List<Long>>
            }
            var results = possible.map { it.get(0) }
            if (results.contains(result)) {
                return result
            } else {
                return 0
            }
        }

        return 0
    }
}

@ExperimentalTime
fun main() {
    Processor.processDay(7, Day7::star1, Day7::star2)
}