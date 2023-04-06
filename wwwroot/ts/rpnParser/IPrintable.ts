// mko, 9.1.2023
export default interface IPrintable {
    // Erzeugt den Ausdruck in der Zielsparache, in die RPN übersetzt wird (z.B. HTML)
    print(): string,

    // Erzeugt den Ausdruck in der originalen RPN- Sprache
    printRPN(): string
}