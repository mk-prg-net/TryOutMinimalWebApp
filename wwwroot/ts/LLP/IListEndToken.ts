// mko, 4.4.2023
// **Lukasiewicz List Processor**

import IToken from "./IToken";


export default interface IListEndToken extends IToken {

    ListEndPos: number;
    
}