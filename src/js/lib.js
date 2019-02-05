export class Link {
    constructor(name, price) {
        this.name = name;
        this.price = price;

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

    sum(item){
        this.storage.sum(item);
        return this.storage.priceall;
    }

    remove(item) {
        this.storage.remove(item);
    }

    maxPrice() {
        this.storage.maxPrice();
        return this.storage.max_item_price;
    }

    maxName() {
        this.storage.maxName();
        return this.storage.max_item_name;
    }

    removeAll(){
        this.storage.removeAll();
    }

}
