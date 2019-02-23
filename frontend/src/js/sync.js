import {Http} from "./http.js";
import {LinksLocalStorage} from "./storage.js";

const http = new Http('http://localhost:7777/items');

const linksListStorage = new LinksLocalStorage();

export class Sync {
    constructor(url) {
        this.url = url;
    }

    async pushStorage() {
        try {
            const items = linksListStorage.items;
            await http.getAll();
            for (const item of items) {
                await http.add(item);
            }

        }
        catch (e) {
            console.log(e);
        }
    }

    async clearStorage() {
        try {
            await http.deleteAll()
        }
        catch (e) {
            console.log(e)
        }
    }

}
//
// async function pushStorage() {
//     try {
//
//         const items = linksListStorage.items;
//
//         await http.getAll();
//         for (const item of items) {
//             await http.add(item);
//         }
//
//         await http.deleteAll();
//
//     }
//     catch (e) {
//         console.log(e);
//     }
// }



