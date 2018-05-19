$.component("",[],{
    CONF_CLASS:"class-conf",
    CONF_ID:"id-conf",
    CONF_ATTR:"attr-conf",
    init:($self) => {
        $self.$conf_class = $self.$.attr($self.CONF_CLASS);
        $self.$conf_id = $self.$.attr($self.CONF_ID);
        $self.$conf_attr = $self.$.attr($self.CONF_ATTR);
    },

    callFunctionResponse: ($self, response) => {

    },

    setObjectToHtml:($self, $object) => {
        //clean container
        $self.$.html("");
        //adding table
        $self.$.append($object);
    },

    getDataFromStr:($self, string) => {
        var attr_Array = string.split(",");
        var str = "";
        for (var i in  attr_Array) {
            str += attr_Array[i] + " ";
        }
        return str;
    },

    config:($self, $object_str) => {
        //replace id
        if ($self.$conf_id) {
            $object_str = $object_str.replace("{{id}}", $self.$conf_id);
        }else {
            $object_str = $object_str.replace("{{id}}","");
        }
        //replace class name
        if ($self.$conf_class) {
            let class_name = $self.getDataFromStr($self.$conf_class);
            $object_str = $object_str.replace("{{class}}", class_name);
        }else {
            $object_str = $object_str.replace("{{class}}","");
        }
        //replace attributes for component
        if ($self.$conf_attr) {
            let attr = $self.getDataFromStr($self.$conf_attr);
            $object_str = $object_str.replace("{{attr}}", attr);
        }else {
            $object_str = $object_str.replace("{{attr}}","");
        }

        return $object_str;
    },

    findData: ($self, url, data) => {
        if (url) {
            $.ajax({
                'url': url,
                'type': 'GET',
                'data': data ? data : '',
                'success': function (response) {
                    if (typeof response !== "object") {
                        response = $.parseJSON(response);
                    }
                    if ($.isArray(response) && response.length > 0) {
                        $self.callFunctionResponse(response);
                    }
                    else {
                        alert("no se encontro datos para el formato seleccionado");
                    }
                },

                'error': function (jqXHR) {
                    console.error("error the request -> ", jqXHR.responseText);
                }
            });
        }
    }
});