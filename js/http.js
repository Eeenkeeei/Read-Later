export class Http {
    constructor(url) {
        this.url = url;
    }

    getAll() {
        return fetch(this.url);
    }

    save(item) {
        return fetch(this.url, {
            body: JSON.stringify(item),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    add (item) {
        return fetch(`${this.url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
    }

    removeById(id) {
        return fetch(`${this.url}/${id}`, {
            method: 'DELETE'
        });
    }

    changeLink(item){
        return fetch(`${this.url}/${item}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
    }

    deleteAll(){
        return fetch(`${this.url}`, {
            method: 'DELETE'
        });
    }

}