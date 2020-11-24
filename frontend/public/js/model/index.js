class Model {
    /**
     * @author Hector Rodrigues Da Silva
     * @class Model
     */
    constructor() {
        this.url = API_URL;
        this.headersJSON = { 'Content-Type': 'application/json' };
    }

    /**
     * @public
     * @param messageObject
     */
    setMessage(messageObject) {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/post/chat/fullcam/message`, {
                headers: this.headersJSON,
                method: 'post',
                body: JSON.stringify(messageObject)
            })
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    }

    /**
     * @public
     * @param userObject
     */
    setUser(userObject) {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/post/chat/fullcam/user`, {
                headers: this.headersJSON,
                method: 'post',
                body: JSON.stringify(userObject)
            })
                .then(response => response.json())
                .then(results => resolve(results))
                .catch(error => reject(error));
        })
    }

    /**
     * @public
     * @param {*}
     */
    getUsers() {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/get/chat/fullcam/user/all`)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }

    /**
     *
     * @param userObject
     * @returns {Promise<unknown>}
     */
    loginUser(userObject) {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/post/chat/fullcam/login`, {
                headers: this.headersJSON,
                method: 'post',
                body: JSON.stringify(userObject)
            })
                .then(response => response.json())
                .then(results => resolve(results))
                .catch(error => reject(error))
        })
    }

    /**
     * @public
     * @param imageObject
     */
    uploadImageMessage(imageObject) {
        return new Promise((resolve, reject) => {
            console.log(imageObject)
            fetch(`${this.url}/post/chat/fullcam/upload/image`, {
                body: imageObject,
                method: 'post'
            })
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    }

    /**
     * @public
     * @param imageObject
     */
    uploadVideoMessage(videoObject) {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/post/chat/fullcam/upload/video`, {
                body: videoObject,
                method: 'post'
            })
                .then(response => resolve(response))
                .catch(error => reject(error));
        })
    }

    updateUser(objectUser, idUser) {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/patch/chat/fullcam/user/${idUser}`, {
                headers: this.headersJSON,
                method: 'patch',
                body: JSON.stringify(objectUser)
            })
                .then(response => resolve(response))
                .catch(error => reject(error));
        })
    }

    /**
     * @public
     * @param {*}
     */
    getMessagesAll() {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/get/chat/fullcam/message/all`)
                .then(response => response.json())
                .then(messages => {

                    let dates = [], reduced = [];
                    messages.map(message => dates.push({ date: message.data_message, messages: [] }));

                    dates.forEach(item => {
                        let duplicated  = reduced.findIndex(redItem => {
                            return item.date === redItem.date;
                        }) > -1;
                        if(!duplicated) reduced.push(item);
                    });

                    messages.map(message => {
                        reduced.map(date => {
                            if(message.data_message === date.date) date.messages.push(message);
                        });
                    });

                    resolve(reduced);
                })
                .catch(error => reject(error));
        });
    }

    /**
     * @public
     * @param {*}
     */
    getLatestMessage() {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/get/chat/fullcam/message/all`)
                .then(response => response.json())
                .then(messages => resolve(messages))
                .catch(error => reject(error));
        });
    }

    /**
     * @public
     * @param {*}
     */
    getCountMessages() {
        return new Promise((resolve, reject) => {
            fetch(`${this.url}/get/chat/fullcam/message/count`)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error));
        })
    }
}
