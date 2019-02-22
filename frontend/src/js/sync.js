import {Http} from "./http.js";
import {LinksLocalStorage} from "./storage.js";

const http = new Http('http://localhost:7777/items');

const linksListStorage = new LinksLocalStorage();

console.log(linksListStorage.items);

setTimeout(sync, 1000);

async function sync() {
    try {
        // const response = await http.getAll(); // getAll -> получает Promise
        // const data = await response.json();
        // for (const item of linksListStorage.items) {
        //     await http.add(item);
        // }
        const items = linksListStorage.items;
        const itemsMaxLength = items.length;

        // todo: делать удаление

        await http.getAll();
        for (const item of items) {
            await http.add(item);
        }


    }
    catch (e) {
        console.log(e);
    }
}



