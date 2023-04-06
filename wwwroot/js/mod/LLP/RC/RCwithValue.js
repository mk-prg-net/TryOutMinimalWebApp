// mko, 1.4.2023
// **Lukasiewicz List Processor**
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RCwithValue {
        constructor(success, errMsg, value) {
            this.ErrorMsgIfNotSuccesful = errMsg;
            this.Success = success;
            this.ReturnValue = value;
        }
    }
    exports.default = RCwithValue;
});
//# sourceMappingURL=RCwithValue.js.map