// mko, 13.1.2023

import IPrintable from "../IPrintable";
import IFunction from "../IFunction";
import RPNclass from "../RPN";
import StackElemStructsClass from "../StackElemStructs"

export default class InlineFunctions {

    constructor(rpn: RPNclass) {
        this.RPN = rpn;
    }

    RPN: RPNclass;

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