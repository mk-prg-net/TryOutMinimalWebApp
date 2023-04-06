// mko, 29.3.2023
// Liste der Operatorsymbole
export default interface IOpSym
{
    // Kennzeichnet einen boolean in RPN, z.B. true #bool
    rpnBoolType: string;

    // Kennzeichnet einen Integer in RPN, z.B. 99 #int
    rpnIntType: string;

    // Kennzeichnet einen double in RPN, z.B. 3.14 #dbl
    rpnDblType: string;

    // Kennzeichnet einen String in RPN, z.B. #$ Hallo Welt #.
    rpnStrType: string;

    // Kennzeichnet einen Listenbegin in RPN, z.B. #_
    rpnListStart: string;

    // KEnnzeichnet ein Listenende in RPN, z.B. #.
    rpnListEnd: string;

    // Kennzeichnet ganz allgemein ein Funktionsprefix, z.B. #
    rpnFuncPrefix: string; 

    // Kennzeicnet ganz allgemein einen Kommentar, z.B. #/ Ein Kommentar #.
    rpnComment: string

    rpnSingleLineComment: string
}