// mko, 29.3.2023
// **Lukasiewicz List Processor**

import IOpSym from "./IOpSym";
import IFunction from "./IFunction";
import IToken from "./IToken";
import IRC from "./IRC";
import IRCwithValue from "./IRCwithValue";
import RC from "./RC/RC";
import RCwithVal from "./RC/RCwithValue";
import IIntToken from "./IIntToken";
import INumToken from "./INumToken";
import IStrToken from "./IStrToken";
import IListToken from "./IListToken";
import IBoolToken from "./IBoolToken";
import ICommentToken from "./ICommentToken";

import StackElemStructsClass from "./StackElemStructs";
import RCwithValue from "./RC/RCwithValue";

export default class StackOps
{
    stackStructs: StackElemStructsClass;

    constructor(opSym: IOpSym)
    {
        this.stackStructs = new StackElemStructsClass(opSym);
    }

    NewStack(): IToken[]
    {
        return [];
    }

    Peek(stack: IToken[]): RCwithValue<IToken>
    {
        // Liefert den obersten Eintrag im Stack.
        if (stack.length > 0)
            return new RCwithValue<IToken>(true, "ok", stack[stack.length-1]);
        else
            return new RCwithValue<IToken>(false, "stack is empty", this.stackStructs.CreateNoneToken());
    }

    Pop(stack: IToken[]): RCwithValue<IToken>
    {
        // Liefert den obersten Eintrag im Stack.
        if (stack.length > 0)
            return new RCwithValue<IToken>(true, "ok", stack.pop());
        else
            return new RCwithValue<IToken>(false, "stack is empty", this.stackStructs.CreateNoneToken());
    }

    Push(stack: IToken[], token: IToken) : boolean
    {
        stack.push(token);
        return true;
    }
}