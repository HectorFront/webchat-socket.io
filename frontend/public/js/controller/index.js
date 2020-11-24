const INITIAL_FILE = {
    fileName: null,
    objectStorage: null
};

const INITIAL_INFO_REGISTER = {
    username: null,
    email: null,
    password: null,
    cfpassword: null
};

const INITIAL_INFO_LOGIN = {
    email: null,
    password: null
};

class Controller {
    /**
     * @author Hector Rodrigues Da Silva
     * @class Controller
     */
    constructor() {
        this.view = new View();
        this.model = new Model();
        this.alert = new Alert();
        this.platform = new Platform();
        this.storage = new LocalStorage();
        this.ERROR_HTTP = new TratativeError();
        this.socket = io(`http://${location.hostname}:7002`);
        this.initializeSocket();
        this.initialListeners(true)
        this.infoRegister = { ...INITIAL_INFO_REGISTER }
        this.infoLogin = { ...INITIAL_INFO_LOGIN }
        this.message = null;
    }

    /**
     * @public
     * @param element
     * @param event
     * @param directory
     */
    onImageConversationHover(element, event, directory) {
        element.addEventListener(event, () => {
            element.src = directory;
        });
    }

    /**
     * @public
     * @param element
     * @param event
     * @param directory
     */
    onMapImageConversationHover(element, event, directory) {
        element.forEach(item => item.addEventListener(event, () => {
            item.src = directory;
        }));
    }

    /**
     * @public
     * @param element
     * @param event
     * @param directory
     * @param resolution
     */
    onImagePresentationHover(element, event, directory, resolution) {
        element.addEventListener(event, () => {
            element.src = directory;
            element.width = resolution.width;
            element.height = resolution.height;
        });
    }

    /**
     * @public
     * @param event
     */
    onChangeInput(event, info) {
        this[info][event.target.id] = event.target.value;
    }

    /**
     *
     * @param event
     */
    onChangeMessage(event) {
        if(event.target.value.length > 999){
            this.alert.error('Você atingiu a quantidade de caracteres de mensagem');
        } else {
            this.message = event.target.value;
        }
    }

    /**
     * @public
     * @param {*}
     */
    loginUser(typeLogin) {
        const logged = this.storage.get('logged');
        this.alert.clear();
        if(typeLogin === 'login' && !logged){
            const { email, password } = this.infoLogin;

            !email && this.alert.warning('Preencha o campo de email');
            !password && this.alert.warning('Digite sua senha');

            if(email && password) {
                this.model.loginUser(this.infoLogin)
                    .then((response) => {
                        if(response.length > 0) {
                            this.storage.set('logged', true);
                            this.storage.set('name', response[0].name_user);
                            this.storage.set('id_user', response[0].id);
                            this.renderChat();
                            this.renderInformationConversation(null, null, true);
                            this.chatListeners();
                        } else {
                            this.alert.error('Usuário/Senha inválidos');
                        }
                    }).catch(error => this.ERROR_HTTP.default(error.status));
            }
        } else if (typeLogin === 'register' && !logged){
            const { username, email, cfpassword, password } = this.infoRegister;

            if(!username || !email || !cfpassword || !password) {
                this.alert.warning('Preencha todos os campos para se registrar');
            };

            if (username && email && password && cfpassword && password === cfpassword) {
                this.model.setUser(this.infoRegister)
                    .then((response) => {
                        if(response.status === 409) {
                            this.alert.warning('Usuário já existente, tente novamente com dados novos');
                        } else {
                            delete this.infoRegister.cfpassword;
                            this.storage.set('logged', true);
                            this.storage.set('type_submit', 'logged')
                            this.storage.set('name', this.infoRegister.username);
                            this.storage.set('id_user', response.insertId)
                            this.renderChat();
                            this.renderInformationConversation(null, null, true);
                            this.chatListeners();
                        }
                    }).catch(error => this.ERROR_HTTP.default(error.status));
            }
        }
    }

    changeModalToLogin() {
        this.storage.set('type_submit', 'login');
        this.view.renderModalLoginUser();
        let inputEmailLogin = document.querySelector('.input__login__email__chat');
        let inputPasswordLogin = document.querySelector('.input__login__senha__chat');

        let submitLoginUser = document.querySelector('#submit_login');
        let backToRegisterUser = document.querySelector('#back_register');

        // INPUTS LOGIN
        inputEmailLogin.addEventListener('keyup', (event) => this.onChangeInput(event, 'infoLogin'));
        inputPasswordLogin.addEventListener('keyup', (event) => this.onChangeInput(event, 'infoLogin'));

        // SUBMIT LOGIN
        submitLoginUser.addEventListener('click', () => this.loginUser('login'));
        // CHANGE MODAL TO LOGIN
        backToRegisterUser.addEventListener('click', () => {
            this.storage.set('type_submit', 'register');
            this.view.renderModalRegisterUser();
            this.initialListeners(false);
        });
    }

    onTypeSubmitInitial() {
        let typeSubmit = this.storage.get('type_submit');

        switch (typeSubmit) {
            case 'register':
                this.loginUser('register');
                break;
            case 'login':
                this.loginUser('login');
                break;
            default:
                this.storage.set('type_submit', 'register');
                this.loginUser('register');
                break;
        }
    }

    validateEventSubmit(event) {
        event.keyCode === 13 && this.onTypeSubmitInitial();
    }

    /**
     * @public
     * @param {*}
     */
    initialListeners(initialScreenRender) {
        const nameUser = this.storage.get('name');
        const idUser = this.storage.get('id_user');
        this.storage.removeItem('latestname_message');
        this.storage.removeItem('type_upload');
        if (nameUser && idUser) {
            this.renderChat();
        } else {
            this.storage.clear();
            this.view.renderModalRegisterUser();
            let inputUsernameRegister = document.querySelector('.input__set__name__chat');
            let inputEmailRegister = document.querySelector('.input__set__email__chat');
            let inputPasswordRegister = document.querySelector('.input__set__senha__chat');
            let inputCfPasswordRegister = document.querySelector('.input__set__cfsenha__chat');
            let submitRegisterUser = document.querySelector('#btn__register__user');
            let changeToLoginUser = document.querySelector('#btn__login');

            // INPUTS REGISTER
            inputUsernameRegister.addEventListener('keyup', (event) => this.onChangeInput(event, 'infoRegister'));
            inputEmailRegister.addEventListener('keyup', (event) => this.onChangeInput(event, 'infoRegister'));
            inputPasswordRegister.addEventListener('keyup', (event) => this.onChangeInput(event, 'infoRegister'));
            inputCfPasswordRegister.addEventListener('keyup', (event) => this.onChangeInput(event, 'infoRegister'));
            submitRegisterUser.addEventListener('click', () => this.loginUser('register'));
            // CHANGE MODAL TO LOGIN
            changeToLoginUser.addEventListener('click', () => this.changeModalToLogin());

            // SUBMIT REGISTER & LOGIN
            if(initialScreenRender) {
                document.addEventListener("keyup", this.validateEventSubmit.bind(this), true);
            } else {
                document.removeEventListener('keyup', this.validateEventSubmit.bind(this), true);
            }
        }
    }

    /**
     * @public
     * @param {*}
     */
    initializeSocket() {
        // this.socket.on('previousMessages', (message) => {
        //     for (message of messages) {
        //         this.renderInformationConversation();
        //         this.view.renderMessage(message);
        //     }
        // });
        this.socket.on('receivedMessage', (message) => {
            this.renderInformationConversation(null, null, true);
            this.view.renderMessage(message, false);
            this.storage.set('latestname_message', message.author);
        });
    }

    /**
     * @public
     * @param type
     * @param fileValue
     */
    prepareUpload(type, fileValue, fileName) {
        return new Promise((resolve, reject) => {
            let data = new FormData();
            data.append(type, fileValue, `${fileName}${fileValue.name}`);
            resolve(data);
        });
    }

    /**
     * @public
     * @param {*}
     */
    clearSendAfterDataMessage(inputMessage) {
        file = INITIAL_FILE;
        this.storage.removeItem('type_upload');
        this.message = null;
        if(inputMessage) inputMessage.value = '';
    }

    /**
     * @public
     * @param inputMessageElement
     */
    sendMesssageSocket = (inputMessageElement) => {
        const author = this.storage.get('name');
        const dataUpload = JSON.parse(this.storage.get('type_upload'));
        const { objectStorage, fileName } = file;

        const setMessage = (dataMessage) => {
            this.view.sendMesssage(dataMessage);
            this.socket.emit('sendMessage', dataMessage);
            this.model.setMessage(dataMessage)
                .then(() => this.renderInformationConversation(null, null, true))
                .catch((error) => this.ERROR_HTTP.default(error.status));
        }

        if (author && this.message || dataUpload && objectStorage) {
            const messageObject = {
                author: author,
                message: !this.message ? '' : this.message,
                data_message: moment(new Date()).format("YYYY-MM-DD"),
                hour_message: moment(new Date()).format("HH:mm"),
                type_upload: !dataUpload ? '' : dataUpload.type,
                directory_upload: !objectStorage ? '' : dataUpload.type === 'image' ? `./upload/images/${fileName}${objectStorage.name}` : `./upload/videos/${fileName}${objectStorage.name}`
            };

            if(dataUpload) {
                let containerPreviewUpload = document.querySelector('.arquive__upload');
                this.view.createLoaderUpload(containerPreviewUpload);
                objectStorage && this.prepareUpload(dataUpload.type === 'image' ? 'file' : 'video', objectStorage, fileName)
                    .then((formData) =>
                        this.model[dataUpload.type === 'image' ? 'uploadImageMessage' : 'uploadVideoMessage'](formData)
                            .then((response) => {
                                console.log({ success: `file ${dataUpload.type}`, results: response });
                                setMessage(messageObject);
                                this.view.removeLoaderUpload();
                            })
                            .catch((error) => this.ERROR_HTTP.default(error.status)));
            };

            if(!dataUpload && !objectStorage){
                 setMessage(messageObject);
            };
            this.clearSendAfterDataMessage(inputMessageElement);
        }
    };

    /**
     * @public
     * @param {*}
     */
    renderChat() {
        this.storage.removeItem('preview');
        this.model.getMessagesAll()
            .then((messages) => {
                this.view.renderChat();
                this.chatListeners();

                const informationsUserChat = (messages) => {
                    this.model.getUsers()
                        .then(usersGroup => this.renderInformationConversation(messages, usersGroup, false))
                        .catch(error => this.ERROR_HTTP.default(error));
                };

                if(messages.length <= 0) {
                    informationsUserChat([]);
                } else {
                    messages.map(itemMessage =>  {
                        informationsUserChat(itemMessage.messages);
                        this.view.renderDataGroupedMessages(itemMessage.date);
                        this.view.renderDataMessages(itemMessage.messages);
                    });
                }
            }).catch(error => this.ERROR_HTTP.default(error.status));
    }

    /**
     * @public
     * @param {*}
     */
    renderInformationConversation(dataMessages, usersGroup, refreshData) {
        this.model.getCountMessages()
            .then((dataCount) => {

                const validateNullMessages = (dataArray, property, textValidate) => {
                    let typeUpload = !dataArray.length ? null : dataArray[dataArray.length - 1].type_upload;

                    if(dataArray.length <= 0) {
                        return textValidate;
                    }
                    if(property === 'message' && typeUpload){
                        return `<i class="fas fa-${typeUpload === 'image' ? 'camera' : 'video'}"></i> ${typeUpload === 'image' ? 'imagem' : 'vídeo'}`;
                    }
                    return dataArray[dataArray.length - 1][property];
                };

                let infoConversation = {
                    count: !dataCount[0].message ? 0 : dataCount[0].message,
                    latesthour: null,
                    latestmessage: null,
                    latestauthor: null,
                };

                const separateInfoUser = (messages, users) => {
                    let latestHourMessages = validateNullMessages(messages,'hour_message', '--:--');
                    let latestMessages = validateNullMessages(messages,'message', '');
                    let latestAuthorMessages = validateNullMessages(messages,'author', '');

                    infoConversation.latesthour = latestHourMessages;
                    infoConversation.latestmessage = latestMessages;
                    infoConversation.latestauthor = latestAuthorMessages;
                    this.view.renderInfoConversation(infoConversation, users);
                };

                if(!refreshData) {
                     separateInfoUser(dataMessages, usersGroup);
                } else {
                    this.model.getLatestMessage()
                        .then(messages => {
                            this.model.getUsers()
                                .then(users => separateInfoUser(messages, users))
                                .catch(error => this.ERROR_HTTP.default(error));
                        }).catch(error => this.ERROR_HTTP.default(error));
                }
            }).catch((error) => this.ERROR_HTTP.default(error.status));
    }

    /**
     * @public
     * @param {*}
     */
    chatListeners() {
        let elementSendMessage = document.querySelector('.send_icon');
        let inputMessage = document.querySelector('.input__send__message');
        let btnUpload = document.querySelector('.btn__upload');
        let btnEmoji = document.querySelector('.btn__emoji');
        let btnLogout = document.querySelector('#logout_chat');
        let btnMenuUser = document.querySelector('.icon__menu__chat');
        let divScrollConversations = document.querySelector('.content__box__main');

        document.addEventListener("keyup", (event) => event.keyCode === 13 && this.sendMesssageSocket(inputMessage));
        elementSendMessage.addEventListener('click', () => this.sendMesssageSocket(inputMessage));
        inputMessage.addEventListener('change', (event) => this.onChangeMessage(event));
        btnUpload.addEventListener('click', () => this.view.renderModalUploadArquives());
        btnEmoji.addEventListener('click', () => this.view.renderModalSetEmoji());
        btnLogout.addEventListener('click', () => this.platform.logout());
        btnMenuUser.addEventListener('click', () => {
            this.view.renderModalUpdateUser();
            let btnUpdateUser = document.querySelector('#btn_update_user');
            btnUpdateUser.addEventListener('click', () => {
                let newNameUser = document.querySelector('#username_update').value;
                let idUser = this.storage.get('id_user');
                this.model.updateUser({ username: newNameUser }, idUser)
                    .then(response => response.length > 0 && this.alert.success('Nome de usuário atualizado com sucesso'))
                    .catch(_=> this.alert.error('Falha ao atualizar nome de usuário, tente novamente mais tarde!'));
            });
        });
        divScrollConversations.addEventListener('scroll', (event) => this.view.onChangeScrollMessages(divScrollConversations, event));

        let imageConversation = document.querySelectorAll('.image__chat__conversation');
        let imagePresentationApp = document.querySelector('.example__app__image');
        // hover animation image conversation
        this.onMapImageConversationHover(imageConversation, 'mouseover', './assets/images/fullcam_group_image.gif');
        this.onMapImageConversationHover(imageConversation, 'mouseout', './assets/images/fullcam_group_static_image.png');
        // hover animation image presentation app
        this.onImagePresentationHover(imagePresentationApp, 'mouseover', './assets/images/fullcam_example.png', { width: 300, height: 300 });
        this.onImagePresentationHover(imagePresentationApp, 'mouseout', './assets/images/whats_presentation.png', { width: 180, height: 180 });
    }
}

new Controller();