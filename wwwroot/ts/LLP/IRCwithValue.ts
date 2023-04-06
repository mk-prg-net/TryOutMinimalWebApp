// mko, 1.4.2023
// **Lukasiewicz List Processor**
// Schnittstelle für allgemeine Rückgabewerte mit Werten

import { extend } from "jquery";
import IRC from "./IRC";

export default interface IRCwithValue<TValue> extends IRC
{
    ReturnValue: TValue;

}
