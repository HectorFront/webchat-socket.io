class Alert {
    constructor() {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    };

    /**
     *
     * @param message
     * @param callback
     */
    success(message, callback) {
        toastr.success(message);
        callback;
    }

    /**
     *
     * @param message
     * @param callback
     */
    error(message, callback) {
        toastr.error(message);
        callback;
    }

    /**
     *
     * @param message
     * @param callback
     */
    info(message, callback) {
        toastr.info(message);
        callback;
    }

    /**
     *
     * @param message
     * @param callback
     */
    warning(message, callback) {
        toastr.warning(message);
        callback;
    }

    clear() {
        toastr.clear();
    }
}

new Alert();