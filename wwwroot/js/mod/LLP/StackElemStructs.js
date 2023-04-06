// mko, 29.3.2023
// **Lukasiewicz List Processor**
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StackElemStructs {
        constructor(opSym) {
            this.opSym = opSym;
        }
        // Definiert Klassenfabriken für Strukturen, die im Stack verwaltet werden
        CreateNoneToken() {
            return {
                tokOpSym: this.opSym.rpnNoneToken
            };
        }
        CreateIntToken(i) {
            return {
                tokOpSym: this.opSym.rpnIntType,
                intValue: i
            };
        }
        CreateDblToken(dbl) {
            return {
                tokOpSym: this.opSym.rpnNumType,
                numValue: dbl
            };
        }
        CreateBoolToken(bool) {
            return {
                tokOpSym: this.opSym.rpnStrType,
                booValue: bool
            };
        }
        CreateStrToken(str) {
            return {
                tokOpSym: this.opSym.rpnStrType,
                strValue: str
            };
        }
        CreateCommentToken(str) {
            return {
                tokOpSym: this.opSym.rpnStrType,
                comment: str
            };
        }
        CreateListEndToken(pos) {
            return {
                tokOpSym: this.opSym.rpnListEnd,
                ListEndPos: pos
            };
        }
        CreateListStartToken(pos) {
            return {
                tokOpSym: this.opSym.rpnListEnd,
                ListBeginPos: pos
            };
        }
        CreateListToken(listElems) {
            return {
                tokOpSym: this.opSym.rpnListStart,
                listElems: listElems
            };
        }
        isToken(stackElem) {
            return "tokOpSym" in stackElem;
        }
        isFunc(stackElem, fnName) {
            // Prädikat, gibt true zurück, wenn auf dem Stack eine Blockfunktion liegt.        
            if (stackElem.tokOpSym === this.opSym.rpnFuncPrefix && ("fnName" in stackElem) && ("Args" in stackElem)) {
                let func = stackElem;
                return func.fnName === fnName;
            }
            else {
                return false;
            }
        }
        CreateFunctionHeadToken(functionName, pos) {
            // Klassenfabrik für ein Token, das einen Funktionskopf markiert
            return {
                tokOpSym: this.opSym.rpnFuncHeadPrefix,
                FunctionName: functionName,
                FuntionHeadPos: pos
            };
        }
        CreateFunc(fnName, args) {
            // Klassenfabrik für Stack- Elemente, die Inlinefunktionen darstellen
            let thisStackElemStructs = this;
            if (args.length > 0) {
                return {
                    tokOpSym: this.opSym.rpnFuncPrefix,
                    fnName: fnName,
                    Args: args
                };
            }
            else {
                return {
                    tokOpSym: this.opSym.rpnFuncPrefix,
                    fnName: fnName,
                    Args: []
                };
            }
        }
        CreateFuncUno(fnName, arg) {
            // Klassenfabrik für Stack- Elemente, die Inlinefunktionen darstellen
            let thisStackElemStructs = this;
            return {
                tokOpSym: this.opSym.rpnFuncPrefix,
                fnName: fnName,
                Args: [arg]
            };
        }
        CreateFuncDue(fnName, arg1, arg2) {
            // Klassenfabrik für Stack- Elemente, die Inlinefunktionen darstellen
            let thisStackElemStructs = this;
            return {
                tokOpSym: this.opSym.rpnFuncPrefix,
                fnName: fnName,
                Args: [arg1, arg2]
            };
        }
        CreateFuncTri(fnName, arg1, arg2, arg3) {
            // Klassenfabrik für Stack- Elemente, die Inlinefunktionen darstellen
            let thisStackElemStructs = this;
            return {
                tokOpSym: this.opSym.rpnFuncPrefix,
                fnName: fnName,
                Args: [arg1, arg2, arg3]
            };
        }
        CreateFuncQuattro(fnName, arg1, arg2, arg3, arg4) {
            // Klassenfabrik für Stack- Elemente, die Inlinefunktionen darstellen
            let thisStackElemStructs = this;
            return {
                tokOpSym: this.opSym.rpnFuncPrefix,
                fnName: fnName,
                Args: [arg1, arg2, arg3, arg4]
            };
        }
    }
    exports.default = StackElemStructs;
});
//# sourceMappingURL=StackElemStructs.js.map