export class Link {
    constructor(name, tag, link, location) {
        this.name = name;
        this.tag = tag.split("#");
        this.link = link;
        this.location = location;
    }
}

export class LinkList {
    constructor(storage) {
        this.storage = storage;
    }

    get items() {                     
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
    
    finder (findName){
        this.storage.finder(findName);
    }

}
