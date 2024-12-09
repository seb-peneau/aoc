import jdk.internal.org.jline.utils.Colors.s
import jdk.javadoc.internal.doclets.formats.html.markup.HtmlStyle.index
import utils.Processor
import java.util.Collections
import kotlin.time.ExperimentalTime

object Day9 {
    fun star1(input: String) : Long {
        var currentIndex = 0
        var mem = input.flatMapIndexed { index, char ->
            var l = mutableListOf<Int>()
            if (index % 2 == 0) {
                for (i in 0 until char.digitToInt()) {
                    l.add(currentIndex)
                }
                currentIndex++
            } else {
                for (i in 0 until char.digitToInt()) {
                    l.add(-1)
                }
            }
            l
        }
        var indexStart = 0
        var indexEnd =  mem.size - 1

        while(indexStart <= indexEnd) {
            if (mem.get(indexStart) >= 0) {
                indexStart++
            } else {
                if (mem.get(indexEnd) < 0) {
                    indexEnd--
                } else {
                    Collections.swap(mem, indexStart, indexEnd)
                }
            }
        }
        return mem.mapIndexedNotNull { index, i ->
            if (i < 0) {
                null
            } else {
                index * i.toLong()
            }
        }.sumOf { it }
    }

    fun star2(input: String) : Long {
        var currentIndex = 0
        var mem = input.mapIndexedNotNull { index, char ->
            var l = mutableListOf<Int>()
            if (index % 2 == 0) {
                for (i in 0 until char.digitToInt()) {
                    l.add(currentIndex)
                }
                currentIndex++
            } else {
                for (i in 0 until char.digitToInt()) {
                    l.add(-1)
                }
            }
            l
        } as MutableList

        mem = mem.filter { it.size > 0 }.toMutableList()

        var indexEnd =  mem.size - 1

        val alreadyTreated = mutableListOf<Int>()

        while (indexEnd > 0) {
            if (mem[indexEnd][0] < 0 || alreadyTreated.contains(mem[indexEnd][0])) { // free space
                indexEnd--
            } else {
                alreadyTreated.add(mem[indexEnd][0])
                val blockSize = mem[indexEnd].size
                for (i in 0 until indexEnd) {
                    if(mem[i][0] == -1 && blockSize <= mem[i].size) {
                        val freeSpace = mem[i].size
                        val elemToInsert = mem[indexEnd]
                        var sl = mutableListOf<Int>()
                        for (j in 0 until elemToInsert.size) {
                            sl.add(-1)
                        }
                        mem.removeAt(indexEnd)
                        mem.add(indexEnd, sl)
                        mem.removeAt(i)
                        if (blockSize < freeSpace) {
                            var sl = mutableListOf<Int>()
                            for (j in 0 until (freeSpace - blockSize)) {
                                sl.add(-1)
                            }
                            mem.add(i, sl)
                        }
                        mem.add(i, elemToInsert)
                        break
                    }
                }
            }
        }
        val newMem = mutableListOf<Int>()
        mem.forEach { l ->
            l.forEach { elem ->
                newMem.add(elem)
            }
        }
        var currentI = 0
        return newMem.mapIndexedNotNull { index, i ->
            if (i < 0) {
                null
            } else {
                index * i.toLong()
            }
        }.sumOf { it }
    }
}

@ExperimentalTime
fun main() {
    Processor.processDay(9, Day9::star1, Day9::star2)
}