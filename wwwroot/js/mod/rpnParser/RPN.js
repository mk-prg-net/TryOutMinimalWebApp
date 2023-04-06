//<unit_header>
//----------------------------------------------------------------
//
// Martin Korneffel: IT Beratung/Softwareentwicklung
// Stuttgart, den 5.12.2016
//
//  Projekt.......: ArticleEdit
//  Name..........: RPN.js
//  Aufgabe/Fkt...: Hilfsfunktionen für einen Reverse Polish Notation Parser und Evaluator
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
//  Datum.........: 9.1.2023
//  Änderungen....: Mit Typescript erweitert
//
//</unit_history>
//</unit_header> 
define(["require", "exports", "./StackElemStructs"], function (require, exports, StackElemStructs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RPN {
        constructor() {
            this.StackElemStructs = new StackElemStructs_1.default();
        }
        isFuncName(inString) {
            // true, wenn das Token den Namen einer RPN- Funktion darstellt,  sonst false
            return inString.length > 0 && inString.substring(0, 1) === '#';
        }
        ExtractFuncName(token) {
            // Separiert den Funktionsnamen von den #...# Präfix
            return token.substring(token.lastIndexOf("#") + 1);
        }
        ArgCount(rpnFuncName) {
            // Legt eine Funktion ihreb Parameterzahl duch Anzahl der # fest, dann werden 
            // die # hier gezählt
            return rpnFuncName.lastIndexOf('#') + 1;
        }
        isFuncOfTypeToken(strToken, FuncType) {
            // Hilfsfunktion. Liefert true zurück, wenn das Token dem Namen einer Funktion entspricht,
            // die den erwarteten Funktionstyp hat.
            // FuncType ist ein JavaScript Objekt mit potentiellen Funktionen
            var res = false;
            if (this.isFuncName(strToken)) {
                // Abschneiden aller führender #
                let FuncName = this.ExtractFuncName(strToken);
                // Prüfen, ob token einem bekannten Funktionsnamen entspricht
                res = (FuncName in FuncType);
            }
            return res;
        }
        ;
        Peek(stack) {
            // Liefert den obersten Eintrag im Stack.
            if (stack.length > 0)
                return stack[stack.length - 1];
            else
                // Rückgabe eines Default IPrintable, falls der Stack leer ist.
                return {
                    print: () => "",
                    printRPN: () => ""
                };
        }
        EvalInlineFunc(stack, Tag, argc) {
            // Alle zur Funktion gehörenden Parameter vom Stack entfernen
            let stackElems = [];
            for (let i = 0; i < argc; i++) {
                stackElems.unshift(stack.pop());
            }
            // Inline- Funktion als IPrintable Objekt erzeugen und auf den Stack legen
            let newStackElem = this.StackElemStructs.CreateInlineFunc(Tag, stackElems);
            stack.push(newStackElem);
        }
        EvalBlockFunc(stack, Tag, isArgTypeTest) {
            // Alle zur OL gehörenden li vom Stack entfernen
            let stackElems = [];
            while (isArgTypeTest(this.Peek(stack))) {
                stackElems.unshift(stack.pop());
            }
            // Token in einem p- Element verpacken und auf den Stack legen.
            let newStackElem = this.StackElemStructs.CreateBlockFunc(Tag, stackElems);
            stack.push(newStackElem);
        }
    }
    exports.default = RPN;
    ;
});
//# sourceMappingURL=RPN.js.map