export class LinksLocalStorage {
    constructor() {
        const items = this.items = JSON.parse(localStorage.getItem('links'));
        if (items !== null) {
            this.items = items;
        } else {
            this.items = [];
        }
        this.resultObjects = [];
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

    changeLocation(item) {
        if (item.location === true) {
            item.location = false;
        } else
            item.location = true;
        this.save();
    }

    save() {
        localStorage.setItem('links', JSON.stringify(this.items)) // stringify - преобразование объекта в строку
    }

    // todo: переделать чтобы искать точные совпадения
    finder(findName) {
        this.resultObjects = [];
        if (findName.charAt(0) !== '#') {
            const names = [];
            for (const item of this.items) {
                names.push(item.name);
            }

            // фильтр по findName
            const filter = (query) => {
                return names.filter( (el) =>
                    el.toLowerCase().indexOf(query.toLowerCase()) > -1
                );

            };
            let result = filter(findName); // массив названий с совпадением с findName
            // проверка на наличие
            if (result.length === 0) {
                return false;
            }

            // достать объекты с совпадением
            for (const names of result) {
                for (const item of this.items) {
                    if (names === item.name) {
                        this.resultObjects.push(item);
                    }
                }
            }
        }
        if (findName.charAt(0) === '#') {
            findName = findName.slice(1); // удаление решетки для поиска
            findName.toLowerCase();
            const tags = [];
            for (const item of this.items) {
                tags.push(item.tag.join());
            }
            // фильтр по findName
            const filter = (query) => {
                return tags.filter( (el) =>
                    el.toLowerCase().indexOf(query.toLowerCase()) > -1
                );
            };
            let result = filter(findName); // массив названий с совпадением с findName
            // проверка на наличие
            if (result.length === 0) {
                return false;
            }

            for (const tags of result) {
                for (const item of this.items) {
                    if (tags === item.tag.join()) {
                        this.resultObjects.push(item);
                    }
                }
            }
        }
    }

    editElement (item, editLinkName, editLinkTag, editLink) {
        item.name = editLinkName;
        editLinkTag = editLinkTag.split("#");
        item.tag = editLinkTag;
        item.tag.shift();
        const tags = [];
        for (const tag of item.tag) {
            tags.push(tag.trim());
        }
        item.tag = tags;
        item.link = editLink;
        this.save();
    }
}

