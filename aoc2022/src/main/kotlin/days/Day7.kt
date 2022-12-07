package days

import utils.Processor

object Day7 {
    fun star1(input: String) : Int {
        val directories = generateDirectories(input)
        return directories.filterValues { size -> size <= 100000 }.values.sum()
    }

    private fun generateDirectories(input: String): MutableMap<String, Int> {
        val directories = mutableMapOf<String, Int>()
        val currentDir = mutableListOf<String>()
        input
            .lines()
            .forEach { command ->
                when {
                    command.startsWith("$ cd") -> {
                        command.replace("$ cd ", "").let {
                            if (it == "..") {
                                currentDir.removeLast()
                            } else {
                                currentDir.add(it)
                                directories.plus(Pair(currentDir.joinToString("/"), 0))
                            }
                        }
                    }

                    command.startsWith("$ ls") || command.startsWith("dir ") -> {
                        // do nothing
                    }

                    else -> { // is files
                        val size = command.split(" ").first().toInt()
                        var iterator: String = currentDir.first()
                        var itIndex = 0
                        while (itIndex < currentDir.size) {
                            directories[iterator] = directories[iterator]?.plus(size) ?: size
                            itIndex++
                            iterator = currentDir.filterIndexed { index, s -> index <= itIndex }.joinToString("/")
                        }
                    }
                }
            }
        return directories
    }

    fun star2(input: String) : Int {
        val directories = generateDirectories(input)
        val occupiedSpace = directories.toList().sortedByDescending { (_, value) -> value }.first().second
        val freeSpace = 70000000 - occupiedSpace
        val neededSpace = 30000000 - freeSpace
        return directories.values.filter { it - neededSpace > 0 }.sorted().first()
    }
}

@kotlin.time.ExperimentalTime
fun main() {
    Processor.processDay(7, Day7::star1, Day7::star2)
}