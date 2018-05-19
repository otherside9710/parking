var MySelect = $.import("/v4/plugins/MySelect.js");
$.component(".MyFormat", [MySelect], {
    BUTTON_NAME:"button-name",
    NAME:"input-name",
    ON_ERROR:"on-error",
    ON_SUCCESS:"on-success",
    init:($self)=>
    {
        $self.loadComponent();
        $self.loadAjax({});
    },

    loadComponent:($self)=>
    {
        var $parent = $self.$.parent();
        var btn_name = $self.$.attr($self.BUTTON_NAME);
        var name = $self.$.attr($self.NAME);
        var hidden = '<input id="hidden-format" name="' + name + '" type="hidden" />';
        var button = '<button title="Escoja el formato para impresion" data-toggle="dropdown" id="dropdown"' +
                        'class="btn btn-default dropdown-toggle" aria-expanded="false"><i class="fa fa-print"></i>' +
                        btn_name+'  <span class="caret"></span>' +
                    '</button>';
        $parent.append(button);
        $parent.append(hidden);
    },

    content:$.anottate($.Override, ($self, response, fields, filter) =>
    {
        //array of keys to get on response [key1, key2,..]
        var keys = fields.split(",");
        var str;

        if (keys) {
            if (!$.isEmptyObject(fields) && !$.isEmptyObject(response)) {
                for (var i in  response) {
                    for (var j in keys) {
                        if (j > 0) {
                            str += " - " + response[i][keys[j]];
                        }
                        else {
                            str = response[i][keys[j]];
                        }
                    }

                    var li = '<li>' +
                        '<a id="item-dropdown-'+ i +'" value="' + response[i][filter] + '">' +
                        str +
                        '</a>' +
                        '</li>';
                    $self.$.append(li);
                    $("#item-dropdown-"+i).on("click", function () {
                        var value = $( this ).attr("value");
                        $self.$.attr("value",value);
                        $("#hidden-format").val(value);
                        $("#dropdown").html($( this ).text() + '  <span class="caret"></span>');
                        $self.$.trigger("change");
                    });
                }
            }
        }
    }),

    conf:$.anottate($.Override, ($self) =>
    {
        var conf = new Conf();
        var ajax = $self.$.attr($self.AJAX);
        var fields = $self.$.attr($self.FIELDS);
        var filter = $self.$.attr($self.FILTER);
        
        return conf.update({
            'url':ajax,
            'type':'GET',
            
            'success':function (response) {
                if (!(typeof response == "object")){
                    response = $.parseJSON(response);
                }

                if ("error" in response) {
                    $self.$.trigger($self.ON_ERROR);
                    console.error("[MyFormat]: error obteniendo los formatos");
                }
                else {
                    $self.content(response, fields, filter);
                }
                $self.$.trigger($self.ON_SUCCESS);
            },

            'error':function (jqXHR) {
                var error_text;
                if ("responseJSON" in jqXHR) {
                    if ("message" in jqXHR.responseJSON) {
                        if (jqXHR.responseJSON.message.length > 0 || jqXHR.responseJSON.message) {
                            error_text = jqXHR.responseJSON.message;
                            $self.$.attr("data-error", JSON.stringify(jqXHR.responseJSON.message));
                        }
                    }
                }
                else if("responseText" in jqXHR) {
                    $self.$.attr("text-error", jqXHR.responseText);
                    error_text = jqXHR.responseText;
                }
                $self.$.trigger($self.ON_ERROR, error_text ? error_text.replace(/-/g, " "):error_text);
            }
        });
    })
});