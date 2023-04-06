// Ausprobieren der Module
/// <reference path ="../../typings/jquery.d.ts"/> 
// Konfigurieren der Laufzeitumgebung von Require
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '../../js'
});

requirejs(['mod/WocHeaderCtrl/SetUp', 'mod/LLP/OpSyms/RauteOpSyms', 'mod/LLP/StackOps', 'mod/LLP/StackElemStructs'],
    function(WocHeaderCtrlSetUp, OpSyms, StackOps, StackElemStructs) {

        let opSyms = new OpSyms.default();
        let stackOps = new StackOps.default(opSyms);
        let stackElemStructs = new StackElemStructs.default(opSyms);

        WocHeaderCtrlSetUp.default($, "ts/", stackOps, stackElemStructs);

        var llpStack = stackOps.NewStack();
        $.ajax({
            cache: false
        });

        $('#woc-descriptor').WocHeaderCtrl({llpStack: llpStack});

    });