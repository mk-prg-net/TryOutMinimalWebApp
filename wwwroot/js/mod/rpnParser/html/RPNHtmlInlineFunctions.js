// mko, 13.1.2023
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InlineFunctions {
        constructor(rpn) {
            this.RPN = rpn;
        }
        b(stack, argc) {
            this.RPN.EvalInlineFunc(stack, "b", argc);
        }
        i(stack, argc) {
            this.RPN.EvalInlineFunc(stack, "i", argc);
        }
        sub(stack, argc) {
            this.RPN.EvalInlineFunc(stack, "sub", argc);
        }
        sup(stack, argc) {
            this.RPN.EvalInlineFunc(stack, "sup", argc);
        }
    }
    exports.default = InlineFunctions;
});
//# sourceMappingURL=RPNHtmlInlineFunctions.js.map