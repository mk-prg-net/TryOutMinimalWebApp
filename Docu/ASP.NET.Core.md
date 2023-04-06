# Moderne, schlanke  Webanwendungen mit Typescript & .NET 6
[ASP.NET Core DirStructure]: https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/directory-structure?view=aspnetcore-6.0

[NET Docu]: https://learn.microsoft.com/de-de/dotnet/fundamentals/

[NET6 SDK]: https://dotnet.microsoft.com/en-us/download/dotnet/6.0

[NET 6 Minimal Web Api]: https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/overview?view=aspnetcore-6.0

[OmniSharp VSCode]: https://stackoverflow.com/questions/29975152/intellisense-not-automatically-working-vscode

[NodeJS]: https://nodejs.org/en

[Visual Studio Code]: https://code.visualstudio.com/

[NET CLI]: https://learn.microsoft.com/de-de/dotnet/core/tools/

[New Folder Struct For min WebApi]: https://timdeschryver.dev/blog/maybe-its-time-to-rethink-our-project-structure-with-dot-net-6#a-domain-driven-api

[Decalre a App- Folder in csproj]: https://inthetechpit.com/2020/02/12/how-to-add-folders-in-net-core-webapi-to-publish-directory/

[csproj folder include]: https://stackoverflow.com/questions/54762744/net-core-include-folder-in-publish

[server static files]: https://learn.microsoft.com/en-us/aspnet/core/fundamentals/static-files?view=aspnetcore-6.0

[Request- Uri bestimmen]: https://swimburger.net/blog/dotnet/how-to-get-the-full-public-url-of-aspdotnet-core

[wwwroot definieren]: https://learn.microsoft.com/de-de/aspnet/core/fundamentals/minimal-apis?view=aspnetcore-7.0

[npm]: https://www.npmjs.com

[JavaScript]: http://mk-prg-net.de/Woc/woc?wocId=js.html

[TypeScript]: https://www.typescriptlang.org/docs/

[npm Typescript Compiler]: https://www.npmjs.com/package/typescript

[ts cli]: https://www.typescriptlang.org/docs/handbook/compiler-options.html

[jquery definitely typed]: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jquery

[JQuery]: https://jquery.com/

[QUnit]: https://qunitjs.com/

[RequireJS]: https://requirejs.org/

## NET 6 

**.NET 6** ist das aktuelle Framework von Microsoft mit **LongTerm Support**. Das SDK kann [hier][NET6 SDK] heruntergeladen werden.

### [NET 6 Minimal Web Api]

Der Zugriff auf die Resourcen des Servers wird über eine **Web API** bereitgestellt. Diese kann mit der [NET 6 Minimal Web Api] implementiert werden. 
Vorteile

- sehr schlanker Code analog [NodeJS]
- transparente API
- sehr leistungsstark

## [Visual Studio Code] als IDE

Das klassische **Visual Studio** ist in der **WPF** programmiert. In letzter Zeit scheint sich die Entwicklung hier zu verlangsamen, da der Code wohl extrem komplex ist. **Visaul Stuodio** ist zudem extrem ressourcenfressend und behäbig im Alltag.

Als Alternative etabliert sich wohl [Visual Studio Code]. Dieser baut auf Web- Technologien auf, ist "schlank", erweiterbar und stellt insbesondere für Webentwicklung unter [NET 6][NET Docu] eine Leistungsfähige IDE bereit.

Noch zu lösende Probleme:
- Wie können viele Projekte analog einer Solution in **Visual Studio** verwaltet werden
- Git Tools noch nicht ausgereift

### [OmniSharp VSCode] Plugin für C# Projete laden

### [NET CLI]

Die neue Philosophie ist eine uralte: Alle Macht der Kommandozeile!

Das [NET6 SDK] bringt spezielle Kommandozeilentools für:

1. Anlegen neuer Projekte, z.B. `dotnet new web`
2. Kompilieren und Linken, z.B. `dotnet build`
3. Starten von Testumgebungen, z.B. `dotnet run`

Die Syntax ist einfach und leicht zu erlernen. Die Kommandos können direkt in [Visual Studio Code] gestartet werden. 

Auch Abseits von [NET 6][NET Docu] ist die Kommandozeile wieder zurück, so z.B. bei [NodeJS] und [npm].

## Meine erstes [NET 6 Minimal Web Api] Projekt

Hallo Welt im Browser.

[Request- Uri bestimmen] für die Webanwendung.

### [Die Verzeichnisstruktur][ASP.NET Core DirStructure]

## Web Clients mit [TypeScript] programmieren

Die Programmierung von Webanwendungen mit [JavaScript] ist heute der Standard. Da JavaScript *untypisiert* ist, und damit der Code nicht ausreichend durch einen Compiler auf Einhaltung der Typregeln geprüft werden kann, ist die Entwicklung hochqualitativer  [JavaScript] schwierig und zeitintensiv.

Abhilfe schafft hier [TypeScript]. 
[TypeScript] kann als Erweiterung der Sprache um das Konzept von Datentypen verstanden werden. [TypeScript] wird in [JavaScript] kompiliert. Die Erwleiterung von [JavaScript] um Datentypen gelingt dabei [TypeScript] in einer Form, die Prinzipien und Syntax von [JavaScript] nahezu 1:1 erhält. Das macht [TypeScript] sehr attraktiv für Programmierer mit [JavaScript] Kennntnissen.

### [TypeScript] installieren via [npm]

### [TypeScript] CLI

Auch Typescript bringt eine [TS CLI][ts cli] mit. Diese müssen wir auch in [Visual Studio Code] nutzen, um unsere [JavaScript] Quellen zu übersetzen.

### wwwroot- Ordner für Client- Programmierung anlegen

Die Quellcodes und Ressourcen für die Clientseite definieren wir im **wwwroot** Verzeichnis.

```
wwwroot     // Direkt im Ordner befinden sich die HTML- Dateien
 +- css
 +- js      // Allgemeine Javascript- Dateien 
 |   +- lib // JavaScript Bibliotheken wie Require, JQuery und QUnit
 |   +- mod // Ausgaben des TypeScript- Compilers
 +- ts      // TypeScript Quellcodes
```

Der **wwwroot** muss in der [NET 6 Minimal Web Api] Anwendung zu beginn deklariert werden, sonst kann diese nicht darauf zugreifen

```c#
using Microsoft.AspNetCore.Http.Extensions;
// Martin Korneffel, Feb.2023
// SPA- Grundgerüst auf Basis von minimal WebApi entwickeln

// Konfigurieren des Builders
var builder = WebApplication.CreateBuilder(
    new WebApplicationOptions
    {
        Args = args,
        ApplicationName = typeof(Program).Assembly.FullName,
        ContentRootPath = Directory.GetCurrentDirectory(),
        EnvironmentName = Environments.Staging,

        // Hier wird das Wurzelverzeichnis für den statischen Content definiert (html, css, scripte)
        WebRootPath = "wwwroot"  
    }
); 
```

## Einbinden von [JavaScript] Bibliotheken

- **DOM** Zuigriff mit [JQuery]
- *Modularisieren mit [RequireJS]
- Testen mit [QUnit]

### [JQuery] und [RequireJS] in das Projekt integrieren

Für die [TypeScript] Einbindung von [JQuery] wird eine zusätzliche Lib benötigt: die [jquery definitely typed]



```html
<html>
    <head>
        <script src="{*}/js/lib/jquery.js"></script>
        <script src="{*}/js/lib/require.js" data-main="{*}/js/startup.edit.js"></script>
    </head>
    <body>

    </body>
</html>

```

### Testen mit [QUnit]



