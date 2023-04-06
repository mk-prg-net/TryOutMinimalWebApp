define(["require", "exports", "../StringHlp", "../RPN", "./RPNHtml", "./Parser"], function (require, exports, StringHlp_1, RPN_1, RPNHtml_1, Parser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // 2. Starten der Anwendung
    function RPNTest($, QUnit) {
        let StringHlp = new StringHlp_1.default();
        let RPN = new RPN_1.default();
        let RPNHtml = new RPNHtml_1.default();
        let Parser = new Parser_1.default();
        const { test } = QUnit;
        QUnit.module("RPNTests");
        test("Test der StringHlp", assert => {
            let txt = "     \n\t \f    3.14   ";
            let res = StringHlp.eatWhiteSpace(txt);
            assert.equal(res, "3.14   ", "eatWhitespace sollte [     \n\t \f    3.14   ] -> [3.14   ] wandeln");
            txt = "Hallo Welt #h1";
            let resTok = StringHlp.tokenize(txt);
            assert.equal(resTok.length, 3, "Der Text [" + txt + "] sollte in 3 token aufgesplittet werden");
            txt = "(3+5+9)*2 #code #br";
            resTok = StringHlp.tokenize(txt);
            assert.equal(resTok.length, 11, "Der Text [" + txt + "] sollte in 12 token aufgesplittet werden");
            txt = "(3.14+2,72+9)*2 #code #br";
            resTok = StringHlp.tokenize(txt);
            assert.equal(resTok.length, 11, "Der Text [" + txt + "] sollte in 12 token aufgesplittet werden");
            txt = "Hallo Welt#h1\nDas ist ein Text der in html RPN##b notiert wird. RPN steht für R#_ everse##1 P#_ olish##1 N#_notation##1###i.";
            resTok = StringHlp.tokenize(txt);
        });
        test("Test der RPN- Funktionen", assert => {
            let txt = "Hallo Welt#h1\nDas ist ein Text der in html RPN##b notiert wird. RPN steht für R#_ everse##1 P#_ olish##1 N#_notation##1###i.";
            let res = StringHlp.tokenize(txt);
            // Zählen aller Funktionen
            let countFuncs = res.map(function (tok) { return RPN.isFuncName(tok); })
                .filter(function (res) { return res; })
                .length;
            assert.equal(countFuncs, 9, "Der Text [" + txt + "] sollte 9 RPN- Funktionen enthalten");
            let funcs = res.filter(function (tok) { return RPN.isFuncName(tok); });
            assert.equal(funcs.length, countFuncs, "Im Text sollten " + countFuncs.toString() + " Funktionen gefunden werden");
            let funcName = RPN.ExtractFuncName(funcs[0]);
            let argCount = RPN.ArgCount(funcs[0]);
            assert.equal(funcName, "h1", "Der Funktionsname sollte h1 lauten");
            assert.equal(argCount, 1, "Die Anzhahl der Argumente von #h1 ist 1");
            funcName = RPN.ExtractFuncName(funcs[1]);
            argCount = RPN.ArgCount(funcs[1]);
            assert.equal(funcName, "b", "Der Funktionsname sollte b lauten");
            assert.equal(argCount, 2, "Die Anzhahl der Argumente von ##b ist 2");
            // Einzelschritte des Parsers testen
            txt = "Hallo Welt ##b";
            let tokens = StringHlp.tokenize(txt);
            let stack = [];
            RPNHtml.Token(stack, tokens[0]);
            RPNHtml.Token(stack, tokens[1]);
            RPNHtml.InlineFuncs[RPN.ExtractFuncName(tokens[2])](stack, RPN.ArgCount(tokens[2]));
            assert.ok(RPN.StackElemStructs.isFunc(RPN.Peek(stack), "b"), "Eine b- Funktion wurde auf dem Stack erwartet");
            stack = [];
            txt = "Grußformeln in Programmierwelten #h1";
            tokens = StringHlp.tokenize(txt);
            RPNHtml.Token(stack, tokens[0]);
            RPNHtml.Token(stack, tokens[1]);
            RPNHtml.Token(stack, tokens[2]);
            RPNHtml.BlockFuncs[RPN.ExtractFuncName(tokens[3])](stack, RPN.ArgCount(tokens[3]));
            assert.ok(RPN.StackElemStructs.isFunc(RPN.Peek(stack), "h1"), "Eine h1- Funktion wurde auf dem Stack erwartet");
            // Parser- Integrationstest
            let pres = Parser.Parse(txt);
            $("#result").html(pres.html);
            assert.equal($("#result h1").length, 1, "Das Ergebnis [" + pres.html + "] enthält genau eine h1");
            assert.equal($("#result h1").text().trim(), "Grußformeln in Programmierwelten", "[" + txt + "] soll in <h1> ... <h1> gewandelt werden");
            // 
            txt = "Hallo Welt #sub ##b #h1";
            pres = Parser.Parse(txt);
            $("#result").html(pres.html);
            assert.ok($("#result h1").length === 1
                && $("#result h1 b").length === 1, "Das Ergebnis [" + pres.html + "] sollte die Struktur <h1><b><sub></sub></b></h1> aufweisen");
            //
            txt = "Grußformeln in Programmierwelten #h1 Hallo Welt #sub ##b #p";
            pres = Parser.Parse(txt);
            $("#result").html(pres.html);
            assert.ok($("#result h1").length === 1
                && $("#result p").length === 1
                && $("#result p b").length === 1
                && $("#result p b sub").length === 1
                && $("#result p b sub").text() === "Welt", "Das Ergebnis [" + pres.html + "] sollte die Struktur <h1></h1><p><b><sub></sub></b></p> aufweisen");
            // 
            txt = "Eins #li Zwei #b #li Drei #i #li #ol";
            pres = Parser.Parse(txt);
            $("#result").html(pres.html);
            assert.ok($("#result ol").length === 1
                && $("#result ol li").length === 3, "Das Ergebnis [" + pres.html + "] sollte die Struktur <ol><li x 3></ol> aufweisen");
            txt = "#ol";
            pres = Parser.Parse(txt);
            $("#result").html(pres.html);
            assert.ok($("#result > ol").length === 1
                && $("#result > ol > li").length === 0, "Das Ergebnis [" + pres.html + "] sollte die Struktur <ol></ol> aufweisen");
            txt = "Test Liste in Liste #h1\n"
                + "a 1 #li\n"
                + "a 2 #li\n"
                + "#ol #li\n"
                + " Zwei #b #li\n"
                + " Drei #i #li\n"
                + " #ol\n";
            pres = Parser.Parse(txt);
            $("#result").html(pres.html);
            assert.ok($("#result h1").length === 1
                && $("#result > ol").length === 1
                && $("#result > ol > li").length === 3
                && $("#result > ol > li > ol").length === 1
                && $("#result > ol > li > ol > li").length === 2, "Das Ergebnis [" + pres.html + "] sollte die Struktur <ol><li><ol><li x 2></li><li></li><li></li></ol> aufweisen");
            txt = "Eins #li Zwei #b #li Drei #i #li #ul";
            pres = Parser.Parse(txt);
            $("#result").html(pres.html);
            assert.ok($("#result ul").length === 1
                && $("#result ul li").length === 3, "Das Ergebnis [" + pres.html + "] sollte die Struktur <ul><li x 3></ul> aufweisen");
        });
        // start QUnit.
        //QUnit.load();
        QUnit.start();
    }
    exports.default = RPNTest;
});
//# sourceMappingURL=RPNTests.js.map