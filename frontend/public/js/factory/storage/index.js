/**
 * @author Hector Rodrigues Da Silva
 * @class LocalStorage
 */
class LocalStorage {
    
    /**
     *
     * @param key
     */
    get(key) {
        if(!localStorage.getItem(btoa(String(key)))) {
            return null;
        } else {
            return atob(localStorage.getItem(btoa(String(key))));
        }
    }

     /**
     *
     * @param {String} key
     * @param value
     */
    set(key, value) {
        localStorage.setItem(btoa(String(key)), btoa(value));
    }

    /**
     * set object in storage
     *
     * @param key
     * @param value
     */
    setObject(key, value) {
        localStorage.setItem(btoa(String(key)), btoa(JSON.stringify(value)));
    }

    /**
     * remove item do storage
     *
     * @param key
     */
    removeItem(key) {
        localStorage.removeItem(btoa(String(key)));
    }

    /**
     * Clear storage
     */
    clear() {
        localStorage.clear();
    }
}

new LocalStorage();