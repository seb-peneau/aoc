import utils.Processor

object Day2 {
    fun star1(input: String) : Int {
        return input
            .lines()
            .filter { respectRules(it) }
            .size
    }

    private fun respectRules(line: String): Boolean {
        var isIncreasing = true
        var lastNum = -1
        line
            .split(" ")
            .map { it.toInt() }
            .forEachIndexed { index, num ->
                if (index != 0) {
                    if (index == 1) {
                        if (num == lastNum) {
                            return false
                        }
                        isIncreasing = num > lastNum
                    } else {
                        if (isIncreasing && num <= lastNum) {
                            return false
                        } else if (!isIncreasing && num >= lastNum) {
                            return false
                        }
                    }
                    if (isIncreasing && num - lastNum > 3) {
                        return false
                    } else if (!isIncreasing && lastNum - num > 3) {
                        return false
                    }
                }
                lastNum = num
            }
        return true
    }

    fun star2(input: String) : Int {
        return input
            .lines()
            .filter {
                if (respectRules(it)) {
                    true
                } else {
                    val nl = it
                        .split(" ")
                        .map { it.toInt() }
                    nl.forEachIndexed { index, i -> 
                        val gl = nl.filterIndexed { index2, i2 ->
                            index2 != index
                        }
                        if (respectRules(gl.joinToString(" "))) {
                            println("Remove $index from $it")
                            return@filter true
                        }
                    }
                    false
                }
            }
            .size
    }
}

@kotlin.time.ExperimentalTime
fun main() {
    Processor.processDay(2, Day2::star1, Day2::star2)
}