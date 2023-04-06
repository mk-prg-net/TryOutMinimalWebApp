//<unit_header>
//----------------------------------------------------------------
//
// Martin Korneffel: IT Beratung/Softwareentwicklung
// Stuttgart, den 5.1.2016
//
//  Projekt.......: ArticleEdit
//  Name..........: Html.js
//  Aufgabe/Fkt...: 
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
//  Datum.........: 12.1.2023
//  Änderungen....: Umgestellt auf Typescript
//
//</unit_history>
//</unit_header>   



//import StringHlp from "./StringHlp";
import IPrintable from "../IPrintable";
import RPNclass from "../RPN";
//import StackElemStructsClass from "./StackElemFuncs";
import InlineFunctionsClass from "./RPNHtmlInlineFunctions"
import BlockFunctionsClass from "./RPNHtmlBlockFunctions";


export default class RPNHtml {

    constructor() 
    {
        this.RPN = new RPNclass();
        this.InlineFuncs = new InlineFunctionsClass(this.RPN);
        this.BlockFuncs = new BlockFunctionsClass();
    }

    public RPN : RPNclass;
    InlineFuncs: InlineFunctionsClass;
    BlockFuncs: BlockFunctionsClass;

    isBlockFuncToken(strToken: string): boolean {
        return this.RPN.isFuncOfTypeToken(strToken, this.BlockFuncs);
    }

    isInlineFuncToken(strToken: string): boolean {
        return this.RPN.isFuncOfTypeToken(strToken, this.InlineFuncs);
    }

    Token(stack, tok) {
        stack.push(this.RPN.StackElemStructs.CreateToken(tok));
    }
}

