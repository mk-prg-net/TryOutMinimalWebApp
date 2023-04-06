// mko, 13.1.2023
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StackElemStructs {
        // Definiert Klassenfabriken für Strukturen, die im Stack verwaltet werden
        CreateToken(token) {
            return {
                tok: token,
                // IPrintable Schnittstelle implementieren
                print: function () { return this.tok; },
                printRPN: function () { return this.tok; }
            };
        }
        isToken(stackElem) {
            return "tok" in stackElem;
        }
        isFunc(stackElem, Tag) {
            // Prädikat, gibt true zurück, wenn auf dem Stack eine Blockfunktion liegt.        
            if (("Tag" in stackElem) && ("Args" in stackElem)) {
                let func = stackElem;
                return func.Tag === Tag;
            }
            else {
                return false;
            }
        }
        isBlockContent(stackElem) {
            // Liefert true, wenn das Element zum Inhalt einer Blockfunktion gehört
            return this.isToken(stackElem)
                || this.isFunc(stackElem, "b")
                || this.isFunc(stackElem, "i")
                || this.isFunc(stackElem, "sub")
                || this.isFunc(stackElem, "sup");
        }
        CreateInlineFunc(TagName, args) {
            // Klassenfabrik für Stack- Elemente, die Inlinefunktionen darstellen
            let thisStackElemStructs = this;
            if (args.length > 0) {
                return {
                    Tag: TagName,
                    Args: args,
                    print: function () {
                        return "<" + this.Tag + ">"
                            + this.Args.map(arg => arg.print()).join(" ")
                            + "</" + this.Tag + ">";
                    },
                    printRPN: function () {
                        // Die Anzahl der Argumente wird bei Inline- Funktionen durch wiederholte # kodiert
                        return "\n" + this.Args.map(arg => arg.printRPN()).join(" ")
                            + "\n"
                            + "#".repeat(this.Args.length)
                            + this.Tag
                            + "\n\n";
                    }
                };
            }
            else {
                return {
                    Tag: TagName,
                    Args: [this.CreateToken("")],
                    print: function () {
                        return "<" + this.Tag + "></" + this.Tag + ">\n";
                    },
                    printRPN: function () {
                        return "\n#" + this.Tag + "\n\n";
                    }
                };
            }
        }
        CreateBlockFunc(TagName, args) {
            // Klassenfabrik für Stack- Elemente, die Blockfunktionen darstellen
            let thisStackElemStructs = this;
            if (args.length > 0) {
                return {
                    Tag: TagName,
                    Args: args,
                    print() {
                        return "<" + this.Tag + ">\n"
                            + this.Args.map(function (arg) { return arg.print(); }).join(" ")
                            + "\n</" + this.Tag + ">\n";
                    },
                    printRPN() {
                        return "\n" + this.Args.map(function (arg) { return arg.printRPN(); }).join(" ")
                            + "\n#" + this.Tag + "\n\n";
                    }
                };
            }
            else {
                return {
                    Tag: TagName,
                    Args: [thisStackElemStructs.CreateToken("")],
                    print: function () {
                        return "<" + this.Tag + "></" + this.Tag + ">\n";
                    },
                    printRPN: function () {
                        return "\n#" + this.Tag + "\n\n";
                    }
                };
            }
        }
    }
    exports.default = StackElemStructs;
});
//# sourceMappingURL=StackElemStructs.js.map