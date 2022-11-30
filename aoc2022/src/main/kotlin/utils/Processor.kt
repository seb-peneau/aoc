package utils

import kotlin.time.Duration
import kotlin.time.ExperimentalTime
import kotlin.time.measureTimedValue

@ExperimentalTime
object Processor {
    fun processDay(day: Int, star1: (input: String) -> Int, star2: (input: String) -> Int) {
        val data = Data.getData(day)
        val (resultStar1: Int, timeStar1: Duration) =  measureTimedValue {
            star1(data)
        }
        val (resultStar2: Int, timeStar2: Duration) = measureTimedValue {
            star2(data)
        }
        println("Day${day}::star1 : " + resultStar1 + " in " + timeStar1.inWholeMilliseconds + "ms")
        println("Day${day}::star2 : " + resultStar2 + " in " + timeStar2.inWholeMilliseconds + "ms")
    }
}