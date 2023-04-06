// mko, 29.3.2023
// **Lukasiewicz List Processor**

import IToken from "./IToken";

export default interface INumToken extends IToken {
    numValue: number
}
