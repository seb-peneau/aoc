import utils.Processor
import kotlin.time.ExperimentalTime

object Day3 {
    fun star1(input: String) : Int {
        val regexp = Regex(pattern = "mul\\([0-9]+,[0-9]+\\)")
        return regexp.findAll(input)
            .map { it.value.replace("mul(", "").replace(")","").split(",") }
            .map { v : List<String> -> v[0].toInt() * v[1].toInt() }
            .sum()
    }

    fun star2(input: String) : Int {
        return input.split("don't()")
            .mapIndexed { index, line ->
                if (index == 0) {
                    star1(line)
                } else {
                    if (line.contains("do()")) {
                        line.split("do()").mapIndexed { doi, dov ->
                            if (doi == 0) { 0 } else { star1(dov) }
                        }.sum()
                    } else {
                        0
                    }
                }
            }.sum()
    }
}

@ExperimentalTime
fun main() {
    Processor.processDay(3, Day3::star1, Day3::star2)
}
