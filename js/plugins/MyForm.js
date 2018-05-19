var MyAjax = $.import("/v4/plugins/MyAjax.js");

$.component(".MyForm", [MyAjax], {
    AJAX: "action",
    TYPE: "method",
    SON: "son",
    NODISABLED: "nodisabled",
    ON_SUCCESS: "on-success",
    ON_SUCCESS_DATA: "on-success-data",
    ON_ERROR: "on-error",
    ON_ERROR_OBJECT: "on-error-object",
    ON_ERROR_RESPONSE: "on-error-response",
    ON_ANULAR: "on-anular",
    ON_DEFAULT: "on-default",
    ERROR_LISTEN: "error-listen",
    NO_TRIGGER: "no-trigger",

    init: ($self) => {
        $self.$on_success = $self.$.attr($self.ON_SUCCESS);
        $self.$notrigger = $self.$.attr($self.NO_TRIGGER);
        $self.submitForm();
    },

    submitForm: ($self) => {
        $self.getForm().on("submit", function () {
            $self.load();
            return false;
        });
    },

    getForm: ($self) => {
        return $self.$;
    },

    serializeForm: ($self) => {
        var type = $self.$.attr($self.TYPE);
        var nodisabled = $self.$.attr($self.NODISABLED);
        var object;
        if (type && type.toLowerCase() === 'get') {
            object = $.serialize($self.getForm(), nodisabled);
        }
        else {
            object = $.serializeObject($self.getForm(), true, nodisabled);
            if (object) {
                object = JSON.stringify(object);
            }
        }
        return object;
    },

    conf: $.anottate($.Override, ($self) => {
        var conf = new Conf();
        var type = $self.$.attr($self.TYPE);
        var ajax = $self.$.attr($self.AJAX);
        var data = $self.serializeForm();
        if (data) {
            $self.$.trigger("on-default");
            return conf.update({
                url: ajax,
                type: type,
                data: data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    if (typeof (response) === "object") {
                        //si existe la respuesta activamos un flag en el form para verificacion.
                        if (!$.isEmptyObject(response) || response) {
                            $self.$.attr("response", "response");
                        }
                        eval($self.$on_success);
                        $self.$.trigger($self.ON_DEFAULT);
                        if (!$self.$.attr("no-trigger")) {
                            $self.$.trigger($self.ON_SUCCESS_DATA, response);
                            $self.$.trigger($self.ON_SUCCESS, undefined);
                        }
                    }
                },
                error: function (jqXHR) {
                    var error_text;
                    if ("responseJSON" in jqXHR) {
                        if ("message" in jqXHR.responseJSON) {
                            if (jqXHR.responseJSON.message.length > 0 || jqXHR.responseJSON.message) {
                                error_text = jqXHR.responseJSON.message;
                                $self.$.attr("data-error", JSON.stringify(jqXHR.responseJSON.message));
                            }
                        }
                        else if("error" in jqXHR.responseJSON){
                            error_text = jqXHR.responseJSON.error;
                        }
                    }
                    else if ("responseText" in jqXHR) {
                        $self.$.attr("text-error", jqXHR.responseText);
                        error_text = jqXHR.responseText;
                    }

                    if (error_text && typeof (error_text) === "object") {
                        $self.$.trigger($self.ON_ERROR_OBJECT);
                    }
                    else {
                        $self.$.trigger($self.ON_ERROR, error_text ? error_text.replace(/-/g, " ") : "");
                        $self.$.trigger($self.ON_ERROR_RESPONSE, !error_text ? jqXHR.responseJSON : error_text.replace(/-/g, " "));
                        $self.$.trigger($self.ON_ANULAR, error_text);
                    }

                }
            })
        }
        else {
            $self.$.trigger($self.ON_ANULAR, "Form no serialized correctly");
        }
    })

});