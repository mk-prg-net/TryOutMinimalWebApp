
// mko, 1.4.2023
//

import IRC from "./IRC";
import IRCwithValue from "./IRCwithValue";
import IToken from "./IToken"

// Schnittstelle eines Tokenizers, der Texte in der der Reverse Polish Notation (RPN), in die Grundbausteine
// wie Konstanten und Funktionsnamen auflöst.
// Die Tokens werden als IToken- Objekte zurückgegeben.
export default interface ITokenizer {

    // Eine Zeile wird in Token aufgelöst. Wenn die Zeile nicht in Token aufgelöst 
    // werden kann, dann wird ein qualifizierter Fehler gemeldet
    TokenizeLine(lineTxt: string): IRCwithValue<IToken[]>;

}
