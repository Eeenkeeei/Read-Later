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
        const tags = [];
        for (const tag of item.tag) {
            tags.push(tag.trim());
        }
        item.tag = tags;
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
    
    finder (findName) {
        const names = [];
        const resultIndexes = [];
        for (const item of this.items) {
            names.push(item.name);
        }

        // фильтр по findName
        const filterItems = (query) => {
            return names.filter((el) =>
                el.toLowerCase().indexOf(query.toLowerCase()) > -1);

        };
        let result = filterItems(findName); // массив названий с совпадением с findName

        // проверка на наличие
        if (result.length === 0){
            console.log('error');
            return;
        }

        // достать объекты с совпадением
        for (const names1 of result) {
            for (const item of this.items) {
                if (names1 === item.name){
                    resultIndexes.push(item);
                }
            }
        }
    console.log('Совпадения:', resultIndexes);
    }

}

