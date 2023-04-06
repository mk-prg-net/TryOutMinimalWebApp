// mko, 1.4.2023
// **Lukasiewicz List Processor**

// Schnittstelle für allgemeine Rückgabewerte
export default interface IRC
{
    Success: boolean;
    ErrorMsgIfNotSuccesful: string;
}