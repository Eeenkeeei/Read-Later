export class LinksLocalStorage {
    constructor() {
        const items = this.items = JSON.parse(localStorage.getItem('links'));
        if (items !== null) {
            this.items = items;
        } else {
            this.items = [];
        }
    }

    add(item) {
        this.items.push(item);
        item.tag.shift();
        this.save();
    }


    remove(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
            this.save();
        }
    }

    removeAll() {
        this.items = [];
        this.save();
    }

    changeLocation (item) {
        if (item.location === "read") {
            item.location = "toRead"
        } else
       item.location = "read";
        this.save();
    }


    save() {
        localStorage.setItem('links', JSON.stringify(this.items)) // stringify - преобразование объекта в строку
    }
}

