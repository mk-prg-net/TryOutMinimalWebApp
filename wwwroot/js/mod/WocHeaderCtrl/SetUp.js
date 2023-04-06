/// <reference path ="../../typings/jquery.d.ts"/>
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // mko, 4.4.2023
    // Installiert ein JQuery- Plugin für das editieren von WocId's
    function WocHeaderCtrlSetUp($, urlTSRoot, stackOps, stackElemStructs) {
        // JQuery Collection Plugin.
        // Die hier definierte Funktion wird für jeden selektierten Knoten aufgerufen.
        // Jeder selektierte Knoten wird durch **this** repräsentiert. Durch $(this) wird der 
        // Knoten von einem JQuery- Objekt umhüllt. Es können dann alle JQuery- Funktionen auf diesem ausgeführt werden
        // An den selektierten Knoten wird ein WocIdEdit- Fenster eingefügt.
        // 
        $.fn.WocHeaderCtrl = function (options) {
            options = $.extend({ llpStack: stackOps.NewStack() }, options || {});
            const c_wocHeaderCtrlId = "#WocHeaderCtrl";
            // Prüfen, ob die EditWocId- Struktur bereits in den Kindfenstern eingefügt wurde
            let searchRes = $(this).find(c_wocHeaderCtrlId);
            if (searchRes.length === 0) {
                let that = this;
                $(document).ajaxComplete(function (evt, xmlReq, ajaxOptions) {
                    // Zugriff auf das Ctrl
                    let wocHeaderCtrl = $(that).find(c_wocHeaderCtrlId).first();
                    // Elemente ausuchen, an die Eventhandler zu binden sind
                    // Button mit dem 
                    let btnDef = $(wocHeaderCtrl).find("button").first();
                    $(btnDef).text("Testinhalt");
                    $(btnDef).click(function () {
                        // Validates the Input fields 
                        // Link to the input elements
                        let inTitle = $(wocHeaderCtrl).find("#WocHeaderCtrl-input-title").first();
                        let inTitleErrMsg = $(wocHeaderCtrl).find("#WocHeaderCtrlInputTitleValidate").first();
                        let inAuthor = $(wocHeaderCtrl).find("#WocHeaderCtrl-input-author").first();
                        let inAuthorErrMsg = $(wocHeaderCtrl).find("#WocHeaderCtrl-input-author-validate").first();
                        $(inTitleErrMsg).html("");
                        $(inAuthorErrMsg).html("");
                        if (!$(inTitle).val()) {
                            // Title was not defined
                            $(inTitleErrMsg).html("↯ title is not defined");
                        }
                        else if (!$(inAuthor).val()) {
                            // Author is not defined
                            $(inAuthorErrMsg).html("↯ author is not defined");
                        }
                        else {
                            // Create the initial Stack with the woc header
                            let wocHeader = stackElemStructs.CreateFuncDue("WocHeader", stackElemStructs.CreateFuncUno("WocTitle", stackElemStructs.CreateStrToken($(inTitle).val())), stackElemStructs.CreateFuncUno("WocAuthor", stackElemStructs.CreateStrToken($(inAuthor).val())));
                            let myOptions = options;
                            stackOps.Push(myOptions.llpStack, wocHeader);
                            // Remove the the control, after the woc header was successful defined
                            $(wocHeaderCtrl).remove();
                        }
                    });
                }).ajaxError(function (evt, jqXHR, ajaxSettings, thrownError) {
                    alert("Error");
                });
                // Ctrl ist noch nicht definiert- wird geladen und in das DOM integriert
                $(this).load(`${urlTSRoot}/WocHeaderCtrl/View.htm`);
            }
        };
    }
    exports.default = WocHeaderCtrlSetUp;
});
//# sourceMappingURL=SetUp.js.map