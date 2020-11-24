class Platform {
    constructor() {
        this.storage = new LocalStorage();
    }

    logout() {
       this.storage.clear();
       location.reload();
    }
}

new Platform();