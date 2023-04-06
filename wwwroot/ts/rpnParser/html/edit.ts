/// <reference path ="../../../typings/jquery.d.ts"/> 

import RPNHtmlClass from "./RPNHtml"
import ParserClass from "./Parser"

export default function Edit($: JQueryStatic) {

    let main_data = [];
    let pos = 0;

    let rpnHtml = new RPNHtmlClass();
    let parser = new ParserClass();


    //RPNHtml.Token(main_data, "Bitte Text eingeben !");
    rpnHtml.Token(main_data, "Bitte Text eingeben !");


    $("#edit_text").keydown(function () {

        if ((<KeyboardEvent>window.event).keyCode == 13 && (<KeyboardEvent>window.event).ctrlKey) {
            // Ctrl+Enter: Neuen Text übernehmen

            let txt = $(this).html();
            txt = txt.replace(/\&nbsp;/gi, " ")
                .replace(/<div>/gi, " ")
                .replace(/<\/div>/gi, " ")
                .replace(/<p>/gi, " ")
                .replace(/<\/p>/gi, " ")
                .replace(/<br>/gi, " ")
                .replace(/<br\/>/gi, " ");
            let res = parser.Parse(txt);

            let spliceargs = [];
            spliceargs.push(pos);
            spliceargs.push(1);
            res.Stack.forEach(elem => spliceargs.push(elem));

            main_data.splice.apply(main_data, spliceargs);
            pos = pos + res.Stack.length;

            // Analyse des Textes hier
            $("#pre_text").html(main_data.slice(0, pos).map(fn => fn.print()).join(" "));

            $(this).text(res.Rest);

            $("#post_text").html(main_data.slice(pos + 1, main_data.length).map(fn =>fn.print()).join(" "));

        } else if ((<KeyboardEvent>window.event).keyCode == 38 && (<KeyboardEvent>window.event).ctrlKey) {
            // Ctrl+Arrow Up: Vorausgehenden Textabschnitt bearbeiten                

            if (pos > 0) pos--;

            if (pos > 0) {
                $("#pre_text").html(main_data.slice(0, pos).map(fn =>  fn.print()).join(" "));
            } else {
                $("#pre_text").html("");
            }

            $(this).text(main_data[pos].printRPN());

            if (main_data.length > pos + 1) {
                $("#post_text").html(main_data.slice(pos + 1, main_data.length).map(fn => fn.print()).join(" "));
            } else {
                $("#post_text").html("");
            }

        } else if ((<KeyboardEvent>window.event).keyCode == 40 && (<KeyboardEvent>window.event).ctrlKey) {
            // Ctrl+Arrow Down: Vorausgehenden Textabschnitt bearbeiten                

            if (pos < main_data.length - 1) pos++;

            if (pos > 0) {
                $("#pre_text").html(main_data.slice(0, pos).map(fn => fn.print()).join(" "));
            } else {
                $("#pre_text").html("");
            }

            $(this).text(main_data[pos].printRPN());

            if (main_data.length > pos + 1) {
                $("#post_text").html(main_data.slice(pos + 1, main_data.length).map(fn => fn.print()).join(" "));
            } else {
                $("#post_text").html("");
            }
        }
    })
}
