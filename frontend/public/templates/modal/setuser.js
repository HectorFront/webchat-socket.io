const templateModalSetUser =
`<div class="wrapper__modal">
    <div class="box__modal__default__chat">
        <div class="group__input__modal">
            <img src="../../assets/images/logo_fullcam.png" width="60%" height="auto" alt="Logo FullCam"/>
            <label style="margin-bottom: 10px">Cadastre-se para enviar uma mensagem</label>
            <input type="text" id="username" class="input__set__name__chat input__default" placeholder="Nome" />
            <input type="email" id="email" class="input__set__email__chat input__default" placeholder="Email" />
            <input type="password" id="password" class="input__set__senha__chat input__default" placeholder="Senha" />
            <input type="password" id="cfpassword" class="input__set__cfsenha__chat input__default" placeholder="Confirmar senha" />
            <div class="group__button__submit">
                <button id="btn__register__user" type="submit" class="btn__default__modal">Cadastrar&nbsp;<i class="fas fa-user"></i></button>
                <button id="btn__login" class="btn__default__modal btn__secondary">Ja tenho uma conta&nbsp;<i class="fas fa-lock-open"></i></button>
            </div>
        </div>
    </div>
</div>`;