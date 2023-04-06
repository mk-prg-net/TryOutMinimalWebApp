// mko, 9.1.2023

import IPrintable from "./IPrintable";
import IToken from "./IToken";

export default interface IFunction extends IPrintable {
    Tag: string,
    Args: IPrintable[]
}