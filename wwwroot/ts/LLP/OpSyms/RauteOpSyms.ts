// mko, 29.3.2023
// **Lukasiewicz List Processor**

import IOpSym from "../IOpSym";

export default class RauteOpSyms implements IOpSym {
    rpnFuncPrefix: "#";
    rpnBoolType: "#b";
    rpnComment: "#/";
    rpnNumType: "#n";    
    rpnIntType: "#i";
    rpnListEnd: "#.";
    rpnListStart: "#_";
    rpnNoneToken: "#*";
    rpnSingleLineComment: "#//";
    rpnStrType: "#s"; 
    rpnFuncHeadPrefix: "#f";
}