package days

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import utils.Processor

object Day13 {
    fun star1(input: String) : Int {
        val itemType = object : TypeToken<List<Any>>() {}.type
        val i = input
            .lines()
            .mapNotNull { Gson().fromJson<List<Any>>(it, itemType) }
            .transformToPairs()
            .compareElements()
            .mapIndexedNotNull  { index, i ->
                if (i == 1) {
                    return@mapIndexedNotNull index+1
                } else null
            }

        return i.sum()
    }
    fun star2(input: String) : Int {
        val itemType = object : TypeToken<List<Any>>() {}.type
        val comparator = Comparator { list1: List<Any>, list2: List<Any> ->
            val r = compare(list1, list2)
            if (r == -1) {
                return@Comparator 0
            } else if (r == 0) {
                return@Comparator 1
            } else {
                return@Comparator -1
            }
        }
        var i = input
            .lines()
            .mapNotNull { Gson().fromJson<List<Any>>(it, itemType) }
        i = i.toMutableList()
        i.addAll(listOf(arrayListOf<Double>(2.0), arrayListOf<Double>(6.0)))
        return i
            .toList()
            .sortedWith(comparator)
            .mapIndexedNotNull { index, anies ->
                val a = anies as ArrayList
                if (a.contains(2.0) || a.contains(6.0)) {
                    index + 1
                } else null
            }.let {
                it.first() * it.last()
            }
    }


}

private fun List<Pair<Any, Any>>.compareElements(): List<Int> {
    val r = mutableListOf<Int>()
    this.mapIndexed { index, pair ->
        println("compare-----------------")
        val firstArray = pair.first as List<Any>
        val secondArray = pair.second as List<Any>
        r.add(index, compare(firstArray, secondArray))
        println("$index : ${r[index]}" )
    }
    return r
}

fun compare(firstArray: List<Any>, secondArray: List<Any>): Int {
    println("compare")
    println(firstArray)
    println(secondArray)

    var rc = -1 // -1 : unknown, 1 : true, 0 : false

    // first compare values
    firstArray.forEachIndexed { i, item ->
        if (item is Double
            && secondArray.indices.contains(i)
            && secondArray[i] is Double) {
            val g = secondArray[i] as Double
            if (item > g) {
                println("false $item > $g")
                println("return 0")
                return 0
            } else if (item < g) {
                println("true $item < $g")
                println("return 1")
                return 1
            }
        } else if (item is ArrayList<*>
            && secondArray.indices.contains(i)
            && secondArray[i] is ArrayList<*>) {
            rc = compare(item, secondArray[i] as ArrayList<*>)
        } else if ((item is Double && secondArray.indices.contains(i) && secondArray[i] is ArrayList<*>)
            || (item is ArrayList<*> && secondArray.indices.contains(i) && secondArray[i] is Double)) {
            if (item is Double) {
                rc = compare(listOf(item), secondArray[i] as ArrayList<*>)
            } else {
                rc = compare(item as ArrayList<*>, listOf(secondArray[i] as Double))
            }
        }
        if (rc == 0 || rc == 1) {
            return rc
        }
    }
    if (rc == -1) {
        if (firstArray.size > secondArray.size) { rc = 0 }
        if (firstArray.size < secondArray.size) { rc = 1 }
    }
    println("return $rc")
    return rc
}

private fun List<Any>.transformToPairs() : List<Pair<Any, Any>>{
    return this.mapIndexed { index, list ->
        if (index.mod(2) == 0) {
            Pair(list, this[index+1])
        } else null
    }.filterNotNull()
}

@kotlin.time.ExperimentalTime
fun main() {
    Processor.processDay(13, Day13::star1, Day13::star2)
}