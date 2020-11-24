
class TratativeError {
    constructor() {
        this.platform = new Platform();
        this.alert = new Alert();
    }

    /**
     *
     * @param err
     */
    default(err, callback) {
        switch (err) {
            case 200:
                callback;
            case 401:
                this.platform.logout();
                break;
            case 403:
                this.alert.error('Sem permissão para visualizar');
                break;
            case 409:
                this.alert.warning('Dados já existentes, tente novamente com novos dados!');
                break;
            case 500:
                this.alert.error('Erro interno no servidor. Tente novamente mais tarde');
                break;
        }
    }
}

new TratativeError();