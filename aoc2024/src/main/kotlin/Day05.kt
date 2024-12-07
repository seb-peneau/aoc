import utils.Processor
import java.util.Collections
import javax.sound.sampled.Line
import kotlin.collections.mutableMapOf
import kotlin.time.ExperimentalTime

object Day5 {
    fun star1(input: String) : Int {
        val rules = mutableListOf<String>()
        return input.lines().mapNotNull { line ->
            if (line.contains("|")) {
                rules.add(line)
                null
            } else if(line.contains(",")) {
                testLine(line, rules)
            } else {
                null
            }
        }.sum()
    }

    private fun testLine(
        line: String,
        rules: List<String>
    ): Int? {
        val l = line.split(",")
        l.forEachIndexed { index, pageNumber ->
            rules.filter { it.contains("$pageNumber|") }.forEach {
                val lf = it.split(("|")).last()
                if (l.indexOf(lf) >= 0 && index > l.indexOf(lf)) {
                    return null
                }
            }
        }
        return l[l.size / 2].toInt()
    }

    fun star2(input: String) : Int {
        val rules = mutableListOf<String>()
        return input.lines().mapNotNull { line ->
            if (line.contains("|")) {
                rules.add(line)
                null
            } else if(line.contains(",")) {
                if (testLine(line, rules) == null) {
                    sanitizeLine(line, rules)
                } else { null }
            } else {
                null
            }
        }.sum()
    }

    private fun sanitizeLine(
        line: String,
        rules: List<String>
    ): Int? {
        val l : MutableList<String> = line.split(",") as MutableList<String>
        l.forEachIndexed { index, pageNumber ->
            rules.filter { it.contains("$pageNumber|") }.forEach {
                val lf = it.split(("|")).last()
                val li = l.indexOf(lf)
                if (li >= 0 && index > li) {
                    Collections.swap(l, index, li)
                }
            }
        }
        val rt = testLine(l.joinToString(","), rules)
        return if (rt != null && rt >= 0) { rt } else { sanitizeLine(l.joinToString(","), rules) }
    }
}

@ExperimentalTime
fun main() {
    Processor.processDay(5, Day5::star1, Day5::star2)
}