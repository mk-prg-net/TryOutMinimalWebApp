# DocuTerm Composer

**DocuTerme** bilden eine formale Sprache für  Fehler-, Warn- und Hinweismeldungen in Ausnahmen und Rückgabewerten von Funktionen.

Ein Programmzustand wie ein mißglückter Methodenaufruf kann durchh einen *DocuTerm* direkt ausgedrückt werden:

``````
    ᛖ Methodenname 
        ᚹ 
            ᛜ Parametername_1 Parameterwert_1
            :
            ᛜ Parametername_N Parameterwert_N

            ᛏ
                ᚹ
                    ᛪ fails
                ᛩ
        ᛩ
``````        
