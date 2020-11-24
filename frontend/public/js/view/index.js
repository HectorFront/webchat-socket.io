class View {
    /**
     * @author Hector Rodrigues Da Silva
     * @class View
     */
    constructor() {
        this.storage = new LocalStorage();
        this.containerMain = document.querySelector('.content__wrapper__chat');
    }

    /**
     * @public
     * @param template
     */
    parseDOM_HTML(template) {
        return new DOMParser().parseFromString(template, 'text/html').querySelector('body').children[0];
    }

    /**
     * @public
     * @param {*}
     */
    removeElement(className) {
        let element = document.querySelector(`.${className}`);
        element && element.remove();
    }

    /**
     * @public
     * @param {*}
     */
    renderModalRegisterUser() {
        let templateSetUser = this.parseDOM_HTML(templateModalSetUser);
        this.containerMain.innerHTML = '';
        this.containerMain.appendChild(templateSetUser);
    }

    /**
     * @public
     * @param {*}
     */
    renderModalLoginUser() {
        let templateLoginUser = this.parseDOM_HTML(templateModalLoginUser);
        this.containerMain.innerHTML = '';
        this.containerMain.appendChild(templateLoginUser);
    }

    /**
     * @public
     * @param {*}
     */
    renderModalUpdateUser() {
        let templateUpdateUser = this.parseDOM_HTML(templateModalUpdateUser);
        this.containerMain.appendChild(templateUpdateUser);

        let inputUpdateUser = document.querySelector('#username_update');
        let iconCloseModal = document.querySelector('#close__modal__update__user');

        inputUpdateUser.value = this.storage.get('name');
        iconCloseModal.addEventListener('click', () => this.removeElement('wrapper__modal'));
    }

    /**
     * @public
     * @param {*}
     */
    renderModalUploadArquives() {
        let wrapperModal = document.querySelector('.wrapper__modal__upload');
        if (wrapperModal) {
            this.removeElement('wrapper__modal__upload');
        } else {
            let containerChat = document.querySelector('.wrapper__chat__actions');
            let templateUpload = this.parseDOM_HTML(templateModalUpload);
            containerChat.appendChild(templateUpload);

            let inputUploadVideo = document.querySelector('.file__upload__video');
            let inputUploadImage = document.querySelector('.file__upload__image');

            let btnUploadVideo = document.querySelector('.upload_video_button');
            let btnUploadImage = document.querySelector('.upload_image_button');

            inputUploadVideo.addEventListener('mouseover', () => btnUploadVideo.style.backgroundColor = '#cc2f64');
            inputUploadImage.addEventListener('mouseover', () => btnUploadImage.style.backgroundColor = '#b066c8');
            inputUploadImage.addEventListener('change', () => this.previewUploadImage(inputUploadImage));

            inputUploadVideo.addEventListener('mouseout', () => btnUploadVideo.style.backgroundColor = '#c72057');
            inputUploadImage.addEventListener('mouseout', () => btnUploadImage.style.backgroundColor = '#ac44cf');
            inputUploadVideo.addEventListener('change', () => this.previewUploadVideo(inputUploadVideo));
        }
    }

    /**
     * @public
     * @param {*}
     */
    renderModalSetEmoji() {
        let wrapperModal = document.querySelector('.wrapper__modal__emoji__message');
        if(wrapperModal) {
            this.removeElement('wrapper__modal__upload');
        } else {
            let containerChat = document.querySelector('.wrapper__chat__actions');
            let templateEmoji = this.parseDOM_HTML(templateModalMessageEmoji);
            containerChat.appendChild(templateEmoji);
        }
    }

    /**
     * @public
     * @param {*}
     */
    randomHash() {
        let hash = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 15; i++)
            hash += possible.charAt(Math.floor(Math.random() * possible.length));
        return hash;
    }

    /**
     * @public
     * @param elementInput
     */
    previewUploadImage(elementInput) {
        this.removeElement('wrapper__modal__upload');
        this.removeExistentTemplateUpload();

        let valueUploadImage = elementInput.files[0];

        let containerUpload = document.querySelector('.container__upload');
        let templatePreviewUpload = this.parseDOM_HTML(templatePreviewUploadImage);
        containerUpload.appendChild(templatePreviewUpload);

        let btnClosePreview = document.querySelector('.close__pre__visualization');
        let previewArquive = document.querySelector('.arquive__upload');
        let imgPreview = document.createElement('img');

        imgPreview.setAttribute('class', 'upload__preview__user');
        imgPreview.setAttribute('width', '60%');
        imgPreview.setAttribute('heigth', '100%');
        imgPreview.setAttribute('alt', 'Carregando imagem...');
        btnClosePreview.addEventListener('click', () => this.removeElement('preview__upload'));

        let reader = new FileReader();
        reader.onloadend = () => {
            file.objectStorage = valueUploadImage;
            file.fileName = this.randomHash();
            let dataPreview = { type: 'image', dataPreview: reader.result };

            this.storage.setObject('preview', dataPreview);
            this.storage.setObject('type_upload', { type: 'image' });

            imgPreview.src = reader.result;
        }

        if (valueUploadImage) {
            reader.readAsDataURL(valueUploadImage);
            previewArquive.appendChild(imgPreview);
        } else {
            preview.src = "";
        }

        let btnFullscreenPreview = document.querySelector('.fullscreen__preview');
        btnFullscreenPreview.addEventListener('click', () => this.renderFullscreenPreview());
    }

    /**
     * @public
     * @param elementInput
     */
    previewUploadVideo(elementInput) {
        this.removeElement('wrapper__modal__upload');
        this.removeExistentTemplateUpload();

        let valueUploadVideo = elementInput.files[0];

        let containerUpload = document.querySelector('.container__upload');
        let templatePreviewUpload = this.parseDOM_HTML(templatePreviewUploadImage);
        containerUpload.appendChild(templatePreviewUpload);

        let btnClosePreview = document.querySelector('.close__pre__visualization');
        let previewArquive = document.querySelector('.arquive__upload');
        let videoPreview = document.createElement('video');

        videoPreview.setAttribute('class', 'upload__preview__user');
        videoPreview.setAttribute('width', '100%');
        videoPreview.setAttribute('heigth', '100%');
        videoPreview.setAttribute('controls', true);
        videoPreview.setAttribute('alt', 'Carregando vídeo...');
        btnClosePreview.addEventListener('click', () => this.removeElement('preview__upload'));

        file.objectStorage = valueUploadVideo;
        file.fileName = this.randomHash();
        let dataPreview = { type: 'video', dataPreview: URL.createObjectURL(valueUploadVideo) };

        this.storage.setObject('preview', dataPreview);
        this.storage.setObject('type_upload', { type: 'video' });

        if (valueUploadVideo) {
            videoPreview.src = URL.createObjectURL(valueUploadVideo);
            previewArquive.appendChild(videoPreview);
        } else {
            preview.src = "";
        }

        let btnFullscreenPreview = document.querySelector('.fullscreen__preview');
        btnFullscreenPreview.addEventListener('click', () => {
            videoPreview.pause();
            this.renderFullscreenPreview()
        });
    }

    /**
     * @public
     * @param {*}f
     */
    removeExistentTemplateUpload() {
        let templatePreviewUploadExistent = document.querySelector('.preview__upload');
        let imgPreviewExistent = document.querySelector('.img__preview__user');
        let videoPreviewExistent = document.querySelector('.video__preview__user');

        templatePreviewUploadExistent && templatePreviewUploadExistent.remove();
        imgPreviewExistent && imgPreviewExistent.remove();
        videoPreviewExistent && videoPreviewExistent.remove();
    }

    /**
     * @public
     * @param {*}
     */
    removeFullscreenPreview() {
        let containerPreview = document.querySelector('.fullscreen__upload__preview');
        containerPreview.style.zIndex = 0;
        containerPreview.style.display = 'none';
    }

    /**
     * @public
     * @param {*}
     */
    renderFullscreenPreview() {
        let dataPreview = JSON.parse(this.storage.get('preview'));
        this.removeElement('upload__fullscreen__preview__user')

        let containerPreview = document.querySelector('.fullscreen__upload__preview');
        containerPreview.style.zIndex = 1000;
        containerPreview.style.display = 'flex';
        containerPreview.style.backgroundColor = 'rgb(0 0 0 / 82%)';

        const removeFullscreen = () => {
            let compressPreview = document.querySelector('.icon__compress__preview');
            compressPreview.addEventListener('click', () => this.removeFullscreenPreview());
        };

        if (dataPreview.type === 'image') {
            let imgPreviewFullscreen = document.createElement('img');
            imgPreviewFullscreen.setAttribute('src', dataPreview.dataPreview);
            imgPreviewFullscreen.setAttribute('class', 'upload__fullscreen__preview__user');
            imgPreviewFullscreen.setAttribute('width', 'auto');
            imgPreviewFullscreen.setAttribute('heigth', '80vh');
            imgPreviewFullscreen.setAttribute('alt', 'Carregando imagem...');

            containerPreview.appendChild(imgPreviewFullscreen);
            removeFullscreen();

        } else if (dataPreview.type === 'video') {
            let videoPreviewFullscreen = document.createElement('video');
            videoPreviewFullscreen.setAttribute('src', dataPreview.dataPreview);
            videoPreviewFullscreen.setAttribute('class', 'upload__fullscreen__preview__user');
            videoPreviewFullscreen.setAttribute('width', '80%');
            videoPreviewFullscreen.setAttribute('heigth', '100%');
            videoPreviewFullscreen.setAttribute('controls', true);
            videoPreviewFullscreen.setAttribute('alt', 'Carregando vídeo...');

            containerPreview.appendChild(videoPreviewFullscreen);
            removeFullscreen();
        }
    }

    /**
     * @public
     * @param {*}
     */
    renderMyName() {
        let spanNameUserProfile = document.querySelector('.name__user__profile');
        let imgUserProfile = document.querySelector('.image__user__profile__header');

        spanNameUserProfile.innerHTML = this.storage.get('name');
        imgUserProfile.setAttribute('title', this.storage.get('name'));
    }

    /**
     * @public
     * @param {*}
     */
    renderChat() {
        this.containerMain.innerHTML = templateBoxChat;
        this.renderMyName();
    }

    /**
     * @public
     * @param infoConversation
     */
    renderInfoConversation(infoConversation, usersGroup) {
        let spanCountMessagesGroup = document.querySelector('.total__messages');
        spanCountMessagesGroup.innerHTML = infoConversation.count;

        let spanLatestHourMessages = document.querySelector('.hour__message__or__day');
        spanLatestHourMessages.innerHTML = infoConversation.latesthour;

        let spanLatestMessage = document.querySelector('.latest__message__conversation');
        spanLatestMessage.innerHTML = infoConversation.latestauthor.length <= 0 && infoConversation.latestmessage.length <= 0
            ? '' : `${infoConversation.latestauthor}: ${infoConversation.latestmessage}`;

        let spanNamesGroup = document.querySelector('.names_group');
        let namesGroup = '';
        usersGroup.map(user => {
            namesGroup += usersGroup.length === 1 || user.name_user === usersGroup[usersGroup.length - 1].name_user ? user.name_user : `${user.name_user}, `;
        });
        spanNamesGroup.innerHTML = namesGroup;
    }

    /**
     * @public
     * @param message
     */
    renderDataMessages(dataMessages) {
        let myUsername= this.storage.get('name');

        dataMessages.map((message, i) => {
            myUsername !== message.author ? this.renderMessage(message) : this.sendMesssage(message);
            this.storage.set('latestname_message', message.author);
        });
    }

    /**
     * @public
     * @param {*}
     */
    onChangeScrollMessages(elementMessages, { target: { scrollHeight }}) {
        const valueEqualScrollHeader = 853;
        const templateButtonDropDown = this.parseDOM_HTML(`<button class="drop__to__bottom__messages"><i class="fas fa-chevron-down"></i></button>`);
        const htmlButtonDropDown = document.querySelector('.drop__to__bottom__messages');

        let heightScrollElement = scrollHeight - valueEqualScrollHeader;
        let heightChangeScrollElement = elementMessages.scrollTop;

        if(heightChangeScrollElement == heightScrollElement || String(heightChangeScrollElement).substr(0, 1) == String(heightScrollElement).substr(0, 1)) {
            htmlButtonDropDown && htmlButtonDropDown.remove();
        }

        if(heightChangeScrollElement < heightScrollElement) {
            htmlButtonDropDown && htmlButtonDropDown.remove();
            elementMessages.appendChild(templateButtonDropDown);
            document.querySelector('.drop__to__bottom__messages').addEventListener('click', () => this.scrollWrapperChatToBottom());
        }
    }

    /**
     * @public
     * @param {*}
     */
    scrollWrapperChatToBottom() {
        let wrapperChat = document.querySelector('.content__box__main');
        wrapperChat.scrollTop = wrapperChat.scrollHeight;
    }

    /**
     *
     * @param typeTag
     * @param ObjectMessage
     * @returns {any}
     */
    createViewUploadMessage(typeTag, ObjectMessage) {
        let elementUploadMessage = document.createElement(typeTag);
        elementUploadMessage.setAttribute('src', ObjectMessage.directory_upload);
        elementUploadMessage.setAttribute('width', '100%')
        elementUploadMessage.setAttribute('heigth', 'auto');
        elementUploadMessage.setAttribute('alt', `${typeTag} message of user "${ObjectMessage.author}"`);
        elementUploadMessage.style.marginTop = '10px';
        elementUploadMessage.style.borderRadius = '5px';
        elementUploadMessage.style.cursor = 'pointer';
        typeTag === 'img' && elementUploadMessage.addEventListener('mouseover', () => elementUploadMessage.style.opacity = '0.7');
        typeTag === 'img' && elementUploadMessage.addEventListener('mouseout', () => elementUploadMessage.style.opacity = '1');
        typeTag === 'img' && elementUploadMessage.addEventListener('click', () => window.open(ObjectMessage.directory_upload));
        typeTag === 'video' && elementUploadMessage.setAttribute('controls', true);

        return elementUploadMessage;
    };

    /**
     *
     * @param container
     */
    createLoaderUpload(container) {
        let loader = document.createElement('div');
        loader.classList.add('loader');

        container.appendChild(loader);
    }

    /**
     * @public
     * @param {*}
     */
    removeLoaderUpload() {
        let loader = document.querySelector('.loader')
        loader && loader.remove();
    }

    /**
     *
     * @param dateMessage
     */
    renderDataGroupedMessages(dateMessage) {
        let groupListMessages = document.querySelector('.conversations__group');

        let containerDateMessages = document.createElement('div');
        let spanDateMessages = document.createElement('span');
        containerDateMessages.classList.add('content__data__mounth__messages');
        spanDateMessages.classList.add('info__data__messages');

        let formatDataMoment = dateMessage.split('-', 3); // format date YYYY-MM-DD
        formatDataMoment[1] = formatDataMoment[1] - 1; // validate correct quantity numbers mounth's

        spanDateMessages.innerHTML = moment(formatDataMoment).locale('pt-br').format('DD [de] MMMM YYYY');
        containerDateMessages.appendChild(spanDateMessages);

        groupListMessages.appendChild(containerDateMessages);
    }

    /**
     * @public
     * @param message
     */
    renderMessage = (ObjectMessage) => {
        const latestname = this.storage.get('latestname_message');

        // element main of elements
        let divContentMessage = document.createElement('div');
        divContentMessage.classList.add('content__message__default');

        // element main username and message
        let divConversationUser = document.createElement('div');
        divConversationUser.classList.add('item__conversation__user');

        // element name of user
        let spanNameUser = document.createElement('span');

        // element message
        let spanMessageUser = document.createElement('span');
        spanMessageUser.classList.add('message__user__conversation');

        if (ObjectMessage.type_upload === 'image' && ObjectMessage.directory_upload) {

            let viewUploadImage = this.createViewUploadMessage('img', ObjectMessage);
            viewUploadImage.addEventListener('load', () => {
                spanMessageUser.appendChild(viewUploadImage);
                ObjectMessage.message && spanMessageUser.append(ObjectMessage.message);
                this.removeLoaderUpload();
                this.scrollWrapperChatToBottom();
            });
            viewUploadImage.addEventListener('error', () => {
                this.createLoaderUpload(spanMessageUser);
                this.scrollWrapperChatToBottom();
            });

        } else if (ObjectMessage.type_upload === 'video' && ObjectMessage.directory_upload) {

            let viewUploadVideo = this.createViewUploadMessage('video', ObjectMessage);
            viewUploadVideo.addEventListener('loadeddata', () => {
                spanMessageUser.appendChild(viewUploadVideo);
                ObjectMessage.message && spanMessageUser.append(ObjectMessage.message);
                this.removeLoaderUpload();
                this.scrollWrapperChatToBottom();
            });
            viewUploadVideo.addEventListener('error', () => {
                this.createLoaderUpload(spanMessageUser);
                this.scrollWrapperChatToBottom();
            });

        } else {
            spanMessageUser.innerHTML = ObjectMessage.message;
        }

        if (latestname === ObjectMessage.author) {
            divConversationUser.style.marginTop = '2px';
            divConversationUser.style.borderTopLeftRadius = '10px';
            divConversationUser.style.borderBottomLeftRadius = '10px';
            divConversationUser.append(spanNameUser);
            divConversationUser.classList.add('null_user');
            spanNameUser.classList.add('null__name__user__conversation');
            spanNameUser.innerHTML = ObjectMessage.hour_message;
        } else {
            divConversationUser.append(spanNameUser);
            spanNameUser.classList.add('name__user__conversation');
            spanNameUser.innerHTML = `${ObjectMessage.author}&nbsp;<span class="hour__message">${ObjectMessage.hour_message}</span>`;
        }
        divConversationUser.append(spanMessageUser);
        divContentMessage.append(divConversationUser);

        let groupListMessages = document.querySelector('.conversations__group');
        groupListMessages.appendChild(divContentMessage);
        this.scrollWrapperChatToBottom();
    };


    /**
     * @public
     * @param message
     */
    sendMesssage = (ObjectMessage) => {
        const latestname = this.storage.get('latestname_message');
        // element main of elements
        let divContentMessageMy = document.createElement('div');
        divContentMessageMy.classList.add('content__message__my');
        // element main username and message
        let divConversationUserMy = document.createElement('div');
        divConversationUserMy.classList.add('my__item__conversation__user');
        divConversationUserMy.setAttribute('id', ObjectMessage.author);
        if(latestname !== ObjectMessage.author) {
            divConversationUserMy.style.marginTop = '30px';
        }
        // element name of user
        let spanNameUserMy = document.createElement('span');
        spanNameUserMy.classList.add('null__name__user__conversation');
        // element message
        let spanMessageUserMy = document.createElement('span');
        spanMessageUserMy.classList.add('message__user__conversation');
        spanNameUserMy.innerHTML = `${moment(new Date()).format("HH:mm")}`;

        if (ObjectMessage.type_upload === 'image' && ObjectMessage.directory_upload) {

            let viewUploadImage = this.createViewUploadMessage('img', ObjectMessage);
            viewUploadImage.addEventListener('load', () => {
                ObjectMessage.message && spanMessageUserMy.append(ObjectMessage.message);
                spanMessageUserMy.appendChild(viewUploadImage);
                this.removeLoaderUpload();
                this.scrollWrapperChatToBottom();
            });
            viewUploadImage.addEventListener('error', () => {
                this.createLoaderUpload(spanMessageUserMy);
                this.scrollWrapperChatToBottom();
            });

        } else if (ObjectMessage.type_upload === 'video' && ObjectMessage.directory_upload) {

            let viewUploadVideo = this.createViewUploadMessage('video', ObjectMessage);
            viewUploadVideo.addEventListener('loadeddata', () => {
                ObjectMessage.message && spanMessageUserMy.append(ObjectMessage.message);
                spanMessageUserMy.appendChild(viewUploadVideo);
                this.removeLoaderUpload();
                this.scrollWrapperChatToBottom();
            });
            viewUploadVideo.addEventListener('error', () => {
                this.createLoaderUpload(spanMessageUserMy);
                this.scrollWrapperChatToBottom();
            });

        } else {
            spanMessageUserMy.innerHTML = ObjectMessage.message;
        }

        divConversationUserMy.append(spanNameUserMy);
        divConversationUserMy.append(spanMessageUserMy);
        divContentMessageMy.append(divConversationUserMy);

        let groupListMessages = document.querySelector('.conversations__group');
        groupListMessages.appendChild(divContentMessageMy);

        if (ObjectMessage.directory_upload) {
            this.removeElement('preview__upload');
            this.storage.removeItem('preview');
        }
        this.storage.set('latestname_message', ObjectMessage.author);
        this.scrollWrapperChatToBottom();
    };

}