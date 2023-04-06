// mko, 1.4.2023
// **Lukasiewicz List Processor**

import IRC from "../IRC";

export default class RC implements IRC {

    constructor(success: boolean, errMsg: string) {
        this.ErrorMsgIfNotSuccesful = errMsg;
        this.Success = success;
    }
    
    Success: boolean;
    ErrorMsgIfNotSuccesful: string;
}