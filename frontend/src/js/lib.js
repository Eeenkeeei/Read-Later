export class Link {
    constructor(id, name, tag, link, location) {
        this.name = name;
        this.tag = tag.split("#");
        this.link = link;
        this.location = location;
        this.id = id;
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

    editElement (item, editLinkName, editLinkTag, editLink){
        this.storage.editElement (item, editLinkName, editLinkTag, editLink);
    }

    sync (){
        this.storage.sync();
    }
}
