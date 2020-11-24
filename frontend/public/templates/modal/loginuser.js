const templateModalLoginUser =
    `<div class="wrapper__modal">
    <div class="box__modal__default__chat">
        <div class="group__input__modal">
            <img src="../../assets/images/logo_fullcam.png" width="60%" height="auto" alt="Logo FullCam"/>
            <label style="margin-bottom: 10px">Entrar com seu login</label>
            <input type="email" id="email" class="input__login__email__chat input__default" placeholder="Email" />
            <input type="password" id="password" class="input__login__senha__chat input__default" placeholder="Senha" />
            <div class="group__button__submit">
                <button id="submit_login" type="submit" class="btn__default__modal">Entrar&nbsp;<i class="fas fa-user"></i></button>
                <button id="back_register" class="btn__default__modal btn__secondary">Não tenho uma conta&nbsp;<i class="fas fa-user-alt-slash"></i></button>
            </div>
        </div>
    </div>
</div>`;