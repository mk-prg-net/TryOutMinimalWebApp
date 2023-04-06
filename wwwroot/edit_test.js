// 1. Konfigurieren von RequireJS
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: '/js'
});


// QUnit muss als Modul eingebunden werden
// JQuery wurde zuvor via Script- Tag global eingebunden.
requirejs(['mod/rpnParser/html/EditTest', 'lib/qunit'],
    function(EditTest, QUnit) {
        EditTest.default($, QUnit);
    });