package days

import utils.Processor


object Day1 {

    fun star1(input: String) : Int { return 0 }

    fun star2(input: String) : Int { return 0 }
}
@kotlin.time.ExperimentalTime
fun main() {
    Processor.processDay(1, Day1::star1, Day1::star2)
}