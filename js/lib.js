export class Link {
    constructor(name, tag, tagsForList, link, location) {
        this.name = name;
        this.tag = tag.split("#");
        this.link = link;
        this.location = location;
        this.tagsForList = tagsForList;

    }
}

export class LinkList {
    constructor(storage) {
        this.storage = storage;
    }

    get items() {                       // getter
        return this.storage.items;
    }

    add(item) {
        this.storage.add(item);
    }

    remove(item) {
        this.storage.remove(item);
    }

    removeAll(){
        this.storage.removeAll();
    }

    changeLocation(item){
        this.storage.changeLocation(item);
    }

}