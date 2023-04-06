// mko, 1.4.2023
// **Lukasiewicz List Processor**
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RC {
        constructor(success, errMsg) {
            this.ErrorMsgIfNotSuccesful = errMsg;
            this.Success = success;
        }
    }
    exports.default = RC;
});
//# sourceMappingURL=RC.js.map