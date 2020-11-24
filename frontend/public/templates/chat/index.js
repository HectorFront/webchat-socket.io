const templateBoxChat =
`<div class="fullscreen__upload__preview">
    <i class="fas fa-compress icon__compress__preview"></i>
 </div>
<div class="box__chat">
    <aside class="aside__conversations">
        <header class="header__conversations" style="border-left: 0; border-right: 0;">
            <div class="image__profile">
                <img class="image__user__profile__header" src="./assets/images/user_default_profile.jpg" height="35px" width="35px" />
                <span class="name__user__profile"></span>
            </div>
            <div class="actions__in__chat">
                <span class="icon__menu__chat"><i class="fas fa-ellipsis-v"></i></span>
            </div>
        </header>
        <div class="content__conversations">
            <div class="contact__coversation aside__contact__coversation">
                <div class="name__image__conversation aside__name__image__conversation">
                    <img class="image__chat__conversation" src="./assets/images/fullcam_group_static_image.png"
                        height="50px" width="50px" />
                    <div class="name__conversation aside__name__conversation">
                        <h6>FullCam</h6>
                        <span class="latest__message__conversation"></span>
                    </div>
                </div>
                <div class="informations__conversations aside__informations__conversations">
                    <span class="hour__message__or__day"></span>
                    <span class="total__messages"></span>
                </div>
            </div>
            <div class="content__main__chat">
                <div class="presentation__whats__fullcam">
                    <figure>
                        <img class="example__app__image" src="./assets/images/whats_presentation.png" width="180px" height="180px" alt="WhatsApp FullCam" />
                    </figure>
                    <h1 class="title__presentation__whatsapp">WhatsApp Web <strong>FullCam</strong></h1>
                    <span class="line"></span>
                    <h4 class="version__whatsapp_description">Clone WhatsApp Web - FullCam. Dark Mode v1.0.0 – year 2020. by Hector Silva</h4>
                </div>
            </div>
        </div>
    </aside>
<div class="wrapper__chat__actions">
    <div class="template__informations__header">
        <header class="header__conversations"
            style="border-left: 0; border-right: 0; position: relative; z-index: 10; width: auto;">
            <div class="name__image__conversation">
                <img class="image__chat__conversation" src="./assets/images/fullcam_group_static_image.png"
                    height="50px" width="50px" style="border-radius: 100%; cursor: pointer;" />
                <div class="name__conversation">
                    <h6>FullCam</h6>
                    <span class="names_group"></span>
                </div>
            </div>
            <div class="actions__in__chat">
                <span id="logout_chat" class="icon__menu__chat"><i class="fas fa-power-off"></i></span>
            </div>
        </header>
    </div>
    <div class="content__box__main">
        <div class="conversations__group"></div>
    </div>
    <footer class="sent__message__box">
        <div class="container__upload"></div>
        <div class="row__message__box">
            <div class="content__footer__box">
                <div class="group__input__send">
                    <input class="input__send__message" type="text" placeholder="Digite uma mensagem"  value=""/>
                    <button class="send_icon">
                        <i class="fas fa-paper-plane" title="Enviar mensagem"></i>
                    </button>
                </div>
            </div>
            <div class="actions__message__chat">
                <ul>
                    <li class="btn__emoji"><i class="fas fa-laugh-beam" title="Escolher emoji"></i></li>
                    <li class="btn__upload"><i class="fas fa-paperclip" title="Fazer upload"></i></li>
                </ul>
            </div>
        </div>
    </footer>
</div>`;