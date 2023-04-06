// mko, 13.1.2023
define(["require", "exports", "../RPN"], function (require, exports, RPN_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // import StackElemStructsClass from "./StackElemFuncs"
    class BlockFuncs {
        constructor() {
            this.RPN = new RPN_1.default();
        }
        p(stack) {
            let that = this;
            this.RPN.EvalBlockFunc(stack, "p", 
            //this.RPN.StackElemStructs.isBlockContent.bind(this.RPN.StackElemStructs));
            stackElem => that.RPN.StackElemStructs.isBlockContent(stackElem));
        }
        pre(stack) {
            throw new Error("nicht implementiert");
        }
        ol(stack) {
            let that = this;
            this.RPN.EvalBlockFunc(stack, "ol", 
            // Achtung: this ist hier das this von function. Deshalb anstatt this that
            stackElem => that.RPN.StackElemStructs.isFunc(stackElem, "li"));
        }
        ul(stack) {
            let that = this;
            this.RPN.EvalBlockFunc(stack, "ul", 
            // Achtung: this ist hier das this von function. Deshalb anstatt this that
            stackElem => that.RPN.StackElemStructs.isFunc(stackElem, "li"));
        }
        li(stack) {
            if (this.RPN.StackElemStructs.isFunc(this.RPN.Peek(stack), "ol") || this.RPN.StackElemStructs.isFunc(this.RPN.Peek(stack), "ul")) {
                let liElem = this.RPN.StackElemStructs.CreateBlockFunc("li", [stack.pop()]);
                stack.push(liElem);
            }
            else {
                let that = this;
                this.RPN.EvalBlockFunc(stack, "li", 
                //this.RPN.StackElemStructs.isBlockContent.bind(this.RPN.StackElemStructs));
                stackElem => that.RPN.StackElemStructs.isBlockContent(stackElem));
            }
        }
        h1(stack) {
            let that = this;
            this.RPN.EvalBlockFunc(stack, "h1", 
            //this.RPN.StackElemStructs.isBlockContent.bind(this.RPN.StackElemStructs));
            stackElem => that.RPN.StackElemStructs.isBlockContent(stackElem));
        }
        h2(stack) {
            let that = this;
            this.RPN.EvalBlockFunc(stack, "h2", 
            //this.RPN.StackElemStructs.isBlockContent.bind(this.RPN.StackElemStructs));
            stackElem => that.RPN.StackElemStructs.isBlockContent(stackElem));
        }
        h3(stack) {
            let that = this;
            this.RPN.EvalBlockFunc(stack, "h3", 
            // this.RPN.StackElemStructs.isBlockContent.bind(this.RPN.StackElemStructs));
            stackElem => that.RPN.StackElemStructs.isBlockContent(stackElem));
        }
        h4(stack) {
            let that = this;
            this.RPN.EvalBlockFunc(stack, "h4", 
            //this.RPN.StackElemStructs.isBlockContent.bind(this.RPN.StackElemStructs));
            stackElem => that.RPN.StackElemStructs.isBlockContent(stackElem));
        }
        h5(stack) {
            let that = this;
            this.RPN.EvalBlockFunc(stack, "h5", 
            //this.RPN.StackElemStructs.isBlockContent.bind(this.RPN.StackElemStructs));
            stackElem => that.RPN.StackElemStructs.isBlockContent(stackElem));
        }
        h6(stack_) {
            let that = this;
            this.RPN.EvalBlockFunc(stack_, "h6", 
            //this.RPN.StackElemStructs.isBlockContent.bind(this.RPN.StackElemStructs));
            stackElem => that.RPN.StackElemStructs.isBlockContent(stackElem));
        }
    }
    exports.default = BlockFuncs;
});
//# sourceMappingURL=RPNHtmlBlockFunctions.js.map