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

import IPrintable from "../IPrintable";
import RPNclass from "../RPN"; 
import RPNHtmlClass from "./RPNHtml";
import StringHlpClass from "../StringHlp"


export default class Parser {

    constructor() {
        this.StringHlp = new StringHlpClass();
        this.Html = new RPNHtmlClass();
        this.RPN = this.Html.RPN;        
    }
      
    StringHlp: StringHlpClass;
    RPN: RPNclass;
    Html: RPNHtmlClass;

    test: number;

    public Parse(inTxt: string)
        : {
            html: string,
            Rest: string,
            Stack: IPrintable[]
        } {
        let strTokens = this.StringHlp.tokenize(inTxt);
        let stack: IPrintable[] = [];           

        for (let pos = 0; pos < strTokens.length; pos++) {

            if (this.Html.isBlockFuncToken(strTokens[pos])) {

                let fname = this.RPN.ExtractFuncName(strTokens[pos]);
                this.Html.BlockFuncs[fname](stack);

            } else if (this.Html.isInlineFuncToken(strTokens[pos])) {

                let fname = this.RPN.ExtractFuncName(strTokens[pos]);
                this.Html.InlineFuncs[fname](stack, this.RPN.ArgCount(strTokens[pos]));

            } else {
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
            } else {
                break;
            }
        }

        // Die Argumente von noch nicht aufgelösten Blockfunktionen wieder in die RPN- Schreibweise umwandeln
        for (let j = i; j < stack.length; j++) {
            Rest += stack[j].printRPN() + " ";
        }

        // Noch nicht aufgelöste Blockfunktionen aus Stack löschen
        while (stack.length > i ) {
            stack.pop();
        }

        let ret = {
            html: htmlText as string,
            Rest: Rest as string,
            Stack: stack as IPrintable[]
        };
         
        return ret;
    }
}
