package utils

import java.nio.charset.Charset

object Data {
    fun getData(day: Int) : String {
        val lines = object {}.javaClass.getResourceAsStream("../input/day${day}.txt")?.readAllBytes()
            ?.toString(Charset.defaultCharset()).orEmpty()
        if (lines.isEmpty()) {
            throw IllegalAccessError("Input file for day${day} is not found")
        }
        return lines
    }
}