import utils.Processor

object Day0 {
    fun star1(input: String) : Int {
        return 0
    }
    fun star2(input: String) : Int {
        return 0
    }
}

@kotlin.time.ExperimentalTime
fun main() {
    Processor.processDay(0, Day1::star1, Day1::star2)
}