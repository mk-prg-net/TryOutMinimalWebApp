// mko, 29.3.2023
// **Lukasiewicz List Processor**

import IOpSym from "./IOpSym";
import IFunction from "./IFunction";
import IToken from "./IToken";
import IIntToken from "./IIntToken";
import INumToken from "./INumToken";
import IStrToken from "./IStrToken";
import IListToken from "./IListToken";
import IBoolToken from "./IBoolToken";
import ICommentToken from "./ICommentToken";
import IListEndToken from "./IListEndToken";
import IListStartToken from "./IListStartToken";
import IFunctionHeadToken from "./IFunctionHeadToken";

export default class StackElemStructs {

    opSym: IOpSym;

    constructor(opSym: IOpSym) {
        this.opSym = opSym;
    }

    // Definiert Klassenfabriken für Strukturen, die im Stack verwaltet werden

    CreateNoneToken(): IToken {
        return {
            tokOpSym: this.opSym.rpnNoneToken
        };
    }

    CreateIntToken(i: bigint): IIntToken {
        return {
            tokOpSym: this.opSym.rpnIntType,
            intValue: i
        }
    }

    CreateDblToken(dbl: number): INumToken {
        return {
            tokOpSym: this.opSym.rpnNumType,
            numValue: dbl
        }
    }

    CreateBoolToken(bool: boolean): IBoolToken {
        return {
            tokOpSym: this.opSym.rpnStrType,
            booValue: bool
        }
    }

    CreateStrToken(str: string): IStrToken {
        return {
            tokOpSym: this.opSym.rpnStrType,
            strValue: str
        }
    }

    CreateCommentToken(str: string): ICommentToken {
        return {
            tokOpSym: this.opSym.rpnStrType,
            comment: str
        }
    }


    CreateListEndToken(pos: number) : IListEndToken {
        return {
            tokOpSym: this.opSym.rpnListEnd,
            ListEndPos: pos
        };
    }

    CreateListStartToken(pos: number): IListStartToken {
        return {
            tokOpSym: this.opSym.rpnListEnd,
            ListBeginPos: pos
        };
    }

    CreateListToken(listElems: IToken[]): IListToken {
        return {
            tokOpSym: this.opSym.rpnListStart,
            listElems: listElems
        }
    }

    isToken(stackElem): boolean {
        return "tokOpSym" in stackElem;
    }

    isFunc(stackElem: IToken, fnName: string): boolean {
        // Prädikat, gibt true zurück, wenn auf dem Stack eine Blockfunktion liegt.        
        if (stackElem.tokOpSym === this.opSym.rpnFuncPrefix && ("fnName" in stackElem) && ("Args" in stackElem)) {
            let func = stackElem as IFunction;
            return func.fnName === fnName;
        }
        else {
            return false;
        }
    }

    CreateFunctionHeadToken(functionName: string, pos: number): IFunctionHeadToken {
        // Klassenfabrik für ein Token, das einen Funktionskopf markiert
        return {
            tokOpSym: this.opSym.rpnFuncHeadPrefix,
            FunctionName: functionName,
            FuntionHeadPos: pos
        };
    }

    CreateFunc(fnName: string, args: IToken[]): IFunction {
        // Klassenfabrik für Stack- Elemente, die Inlinefunktionen darstellen

        let thisStackElemStructs = this;

        if (args.length > 0) {
            return {
                tokOpSym: this.opSym.rpnFuncPrefix,
                fnName: fnName,
                Args: args
            };
        } else {
            return {
                tokOpSym: this.opSym.rpnFuncPrefix,
                fnName: fnName,
                Args: []
            };
        }
    }

    CreateFuncUno(fnName: string, arg: IToken): IFunction {
        // Klassenfabrik für Stack- Elemente, die Inlinefunktionen darstellen

        let thisStackElemStructs = this;

            return {
                tokOpSym: this.opSym.rpnFuncPrefix,
                fnName: fnName,
                Args: [arg]
            };
    }

    CreateFuncDue(fnName: string, arg1: IToken, arg2: IToken): IFunction {
        // Klassenfabrik für Stack- Elemente, die Inlinefunktionen darstellen

        let thisStackElemStructs = this;

        return {
            tokOpSym: this.opSym.rpnFuncPrefix,
            fnName: fnName,
            Args: [arg1, arg2]
        };
    }

    CreateFuncTri(fnName: string, arg1: IToken, arg2: IToken, arg3: IToken): IFunction {
        // Klassenfabrik für Stack- Elemente, die Inlinefunktionen darstellen

        let thisStackElemStructs = this;

        return {
            tokOpSym: this.opSym.rpnFuncPrefix,
            fnName: fnName,
            Args: [arg1, arg2, arg3]
        };
    }

    CreateFuncQuattro(fnName: string, arg1: IToken, arg2: IToken, arg3: IToken, arg4: IToken): IFunction {
        // Klassenfabrik für Stack- Elemente, die Inlinefunktionen darstellen

        let thisStackElemStructs = this;

        return {
            tokOpSym: this.opSym.rpnFuncPrefix,
            fnName: fnName,
            Args: [arg1, arg2, arg3, arg4]
        };
    }


}
