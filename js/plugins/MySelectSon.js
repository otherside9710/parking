var MyAjax = $.import("/v4/plugins/MyAjax.js");

$.component(".MySelectSon", [MyAjax], {
    PARENT: "parent",
    CACHE: "cache",
    AJAX: "ajax",
    AJAXDATA: "ajax-data",
    FIELDS: "fields",
    FILTER: "filter",
    SELECTVALUE: "selected-value",
    NODISABLE: "nodisable",
    BIND_VAL: "bind-val",
    DEFAULT_EVENT:"change",
    EVENT:"event",

    init: ($self) => {
        $self.$event = $self.$.attr($self.EVENT);
        $self.$nodisable = $self.$.attr($self.NODISABLE);
        $self.$bindval = $self.$.attr($self.BIND_VAL);
        $self.$.attr("disabled", "");
        $self.$parent = $self.getParent();
        $self.event();
        $self.$future_val = $self.$.get(0).pre_val;
        $.super(MyAjax, $self).init();
    },

    setValue: $.anottate($.Export, ($self, value) => {
        if ($self.$bindval) {
            $self.$future_val = value;
        }
    }),

    event: ($self) => {
        $self.$parent.on(!$self.$event ? $self.DEFAULT_EVENT : $self.$event, function () {
            $self.$data = $self.getData($self.$parent);
            if ($self.$data) {
                $self.load();
            } else {
                $self.clean();
                $self.$.prop("disabled", true);
            }
        });
    },

    getParent: ($self) => {
        return $($self.$.attr($self.PARENT));
    },

    getData: ($self, $parent) => {
        if ($parent.val() == 0) {
            $self.$.attr("disabled", "");
        }
        else {
            //keys a filtrar en el cache del padre "campo , campo2 ,..."
            var ajax_data = $self.$.attr($self.AJAXDATA);
            var $option = $parent.find("option:selected");
            var cache;
            if ($option.length > 0) {
                cache = $option.attr($self.CACHE);
            }
            else {
                cache = $parent.attr($self.CACHE);
            }

            var object = {};

            if (cache) {
                if (!(typeof cache == "object")) {
                    cache = $.parseJSON(cache);
                }

                if (ajax_data) {
                    //convertimos en array ajax_data [campo , campo2 ,...]
                    ajax_data = ajax_data.split(",");

                    for (var i in ajax_data) {
                        object[ajax_data[i]] = cache[ajax_data[i]];
                    }
                    return object;
                }
            }
        }
    },

    content: ($self, response, fields, filter) => {
        fields = fields.split(",");
        $self.clean();
        $self.$.attr("disabled","");
        if (!$.isEmptyObject(fields) && !$.isEmptyObject(response)) {
            for (var i in response) {
                var str = "";
                for (var j in fields) {
                    if (j > 0) {
                        str += " - ";
                    }
                    str += response[i][fields[j]];
                }

                var $option = $("<option value='" + response[i][filter] + "'>" + str + "</option>");
                if (response[i][filter] == $self.$future_val) {
                    $option.attr("selected", "selected");
                }
                $option.attr("cache", JSON.stringify(response[i]));
                $self.$.append($option);
            }
            var selectd = $self.$.attr($self.SELECTVALUE);
            if (selectd && selectd !== "") {
                $self.$.val(selectd);
            }

            $self.$.removeAttr("disabled");
            $self.$.trigger("change");
            $self.onFill();

        }
    },

    onFill: ($self) => {
    },

    clean: ($self) => {
        $self.$.find('option:not([value="0"])').remove();
    },

    conf: $.anottate($.Override, ($self) => {
        var conf = new Conf();
        var url = $self.$.attr($self.AJAX);
        //data
        var fields = $self.$.attr($self.FIELDS);
        var filter = $self.$.attr($self.FILTER);

        return conf.update({
            'url': url,
            'type': 'GET',
            'data': $self.$data,

            'success': function (response) {
                if (typeof response === "string"){
                    response = $.parseJSON(response);
                }
                if(typeof response === "object") {
                    //fill data in the component
                    $self.content(response, fields, filter);
                }else {
                    alert(typeof response);
                }
            },
            'error': function (jqXHR) {
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
                $self.$.trigger($self.ON_ERROR, error_text ? error_text: error_text.replace(/-/g, " "));
                $self.$.trigger("on-response", jqXHR.status);
            }
        });

    })
});