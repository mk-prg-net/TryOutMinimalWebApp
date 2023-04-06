// mko, 9.1.2023
import IToken from "./IToken";

// mko, 29.3.2023
// **Lukasiewicz List Processor**
// 
export default interface IFunction extends IToken  {
    fnName: string,
    Args: IToken[]
}