//<unit_header>
//----------------------------------------------------------------
//
// Martin Korneffel: IT Beratung/Softwareentwicklung
// Stuttgart, den 5.1.2016
//
//  Projekt.......: ArticleEdit
//  Name..........: StringHlp.js
//  Aufgabe/Fkt...: Hilfsfunktionen für die String- Verarbeitung
//                  
//
//
//
//
//<unit_environment>
//------------------------------------------------------------------
//  Zielmaschine..: PC 
//  Betriebssystem: Windows 7 mit .NET 4.5
//  Werkzeuge.....: Visual Studio 2013
//  Autor.........: Martin Korneffel (mko)
//  Version 1.0...: 
//
// </unit_environment>
//
//<unit_history>
//------------------------------------------------------------------
//
//  Version.......: 1.1
//  Autor.........: Martin Korneffel (mko)
//  Datum.........: 9.1.2023
//  Änderungen....: Mit Typescript erwleitert
//
//</unit_history>
//</unit_header> 

export default class StringHlp
{
    
    eatWhiteSpace(inString: string): string {
        // Entfernt alle führenden Leerraumzeichen im übergeben String
        return inString.replace(/^\s+/, "");
    }
    
    tokenize(inString: string): string[] {
        // Zerlegt einen String in alle Worte und Wortzeichen

        // Separation der Worte
        let newString = inString.trim()
                                .replace("\n", " ")
                                .replace(/\,\s/g, " , ")
                                .replace(/\.\s/g, " . ")
                                .replace(/\?\s/g, " ? ")
                                .replace(/\!\s/g, " ! ")
                                .replace(/\=/g, " = ")

                                .replace(/\(/g, " ( ")
                                .replace(/\)/g, " ) ")

                                .replace(/\{/g, " { ")
                                .replace(/\}/g, " } ")

                                .replace(/\[/g, " [ ")
                                .replace(/\]/g, " ] ")

                                .replace(/\+/g, " + ")
                                .replace(/\*/g, " * ")
                                .replace(/\-/g, " - ")
                                .replace(/\//g, " / ")
                                .replace(/#+/g, " $&");

        let tokens = newString.split(/\s+/g);

        // Ein führendes Leerwort entfernen
        if (tokens.length > 0 && tokens[0] === "") {
            tokens.shift();
        }

        return tokens;
    }
}