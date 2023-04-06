// mko, 29.3.2023
// **Lukasiewicz List Processor**
define(["require", "exports", "./StackElemStructs", "./RC/RCwithValue"], function (require, exports, StackElemStructs_1, RCwithValue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StackOps {
        constructor(opSym) {
            this.stackStructs = new StackElemStructs_1.default(opSym);
        }
        NewStack() {
            return [];
        }
        Peek(stack) {
            // Liefert den obersten Eintrag im Stack.
            if (stack.length > 0)
                return new RCwithValue_1.default(true, "ok", stack[stack.length - 1]);
            else
                return new RCwithValue_1.default(false, "stack is empty", this.stackStructs.CreateNoneToken());
        }
        Pop(stack) {
            // Liefert den obersten Eintrag im Stack.
            if (stack.length > 0)
                return new RCwithValue_1.default(true, "ok", stack.pop());
            else
                return new RCwithValue_1.default(false, "stack is empty", this.stackStructs.CreateNoneToken());
        }
        Push(stack, token) {
            stack.push(token);
            return true;
        }
    }
    exports.default = StackOps;
});
//# sourceMappingURL=StackOps.js.map