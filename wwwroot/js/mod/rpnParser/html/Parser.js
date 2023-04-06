//<unit_header>
//----------------------------------------------------------------
//
// Martin Korneffel: IT Beratung/Softwareentwicklung
// Stuttgart, den 5.1.2015
//
//  Projekt.......: ArticleEdit
//  Name..........: Parser.js
//  Aufgabe/Fkt...: Parsen von Html- Text in der RPN- Form.
//                  
//
//
//
//
//<unit_environment>
//------------------------------------------------------------------
//  Zielmaschine..: PC 
//  Betriebssystem: Windows 7 mit .NET 4.5
//  Werkzeuge.....: Visual Studio 2013
//  Autor.........: Martin Korneffel (mko)
//  Version 1.0...: 
//
// </unit_environment>
//
//<unit_history>
//------------------------------------------------------------------
//
//  Version.......: 1.1
//  Autor.........: Martin Korneffel (mko)
//  Datum.........: 13.1.2023
//  Änderungen....: Umgestellt auf Typescript
//
//</unit_history>
//</unit_header>   
define(["require", "exports", "./RPNHtml", "../StringHlp"], function (require, exports, RPNHtml_1, StringHlp_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Parser {
        constructor() {
            this.StringHlp = new StringHlp_1.default();
            this.Html = new RPNHtml_1.default();
            this.RPN = this.Html.RPN;
        }
        Parse(inTxt) {
            let strTokens = this.StringHlp.tokenize(inTxt);
            let stack = [];
            for (let pos = 0; pos < strTokens.length; pos++) {
                if (this.Html.isBlockFuncToken(strTokens[pos])) {
                    let fname = this.RPN.ExtractFuncName(strTokens[pos]);
                    this.Html.BlockFuncs[fname](stack);
                }
                else if (this.Html.isInlineFuncToken(strTokens[pos])) {
                    let fname = this.RPN.ExtractFuncName(strTokens[pos]);
                    this.Html.InlineFuncs[fname](stack, this.RPN.ArgCount(strTokens[pos]));
                }
                else {
                    this.Html.Token(stack, strTokens[pos]);
                }
            }
            // Nach dem Parsen und Evaluieren der Html- Funktionen stehen im Stack aufgelöste Blockfunktionen und Argumente 
            // noch später aufzulösender Blockfunktionen.
            let htmlText = "";
            let Rest = "";
            let i = 0;
            for (; i < stack.length; i++) {
                if (!this.RPN.StackElemStructs.isBlockContent(stack[i]) && !this.RPN.StackElemStructs.isFunc(stack[i], "li")) {
                    htmlText += stack[i].print() + " ";
                }
                else {
                    break;
                }
            }
            // Die Argumente von noch nicht aufgelösten Blockfunktionen wieder in die RPN- Schreibweise umwandeln
            for (let j = i; j < stack.length; j++) {
                Rest += stack[j].printRPN() + " ";
            }
            // Noch nicht aufgelöste Blockfunktionen aus Stack löschen
            while (stack.length > i) {
                stack.pop();
            }
            let ret = {
                html: htmlText,
                Rest: Rest,
                Stack: stack
            };
            return ret;
        }
    }
    exports.default = Parser;
});
//# sourceMappingURL=Parser.js.map