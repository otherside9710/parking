$.component(".MyAutocomplete", [], {
    DELIMITER: ",",
    AJAX:  "ajax",
    PARAM: "param",
    FIELDS:"fields",
    FILTER:"filter",
    CONDITION:"condition",
    SPLIT: "split",
    CACHE: "cache",
    NEW:"new",
    ON_ERROR:"on-error-component",

    init: ($self) => {
        $self.condicion = $self.$.attr($self.CONDITION);
        $self.separator = $self.$.attr($self.SPLIT);
        $self.filter = $self.$.attr($self.FILTER);
        $self.ajax = $self.$.attr($self.AJAX);
        $self.param = $self.$.attr($self.PARAM);
        $self.param = $self.param ? $self.param : "query";
        $self.events();
        $self.load();

    },

    events:($self) => {
        $('body').on('click', '.autocomplete-suggestions', function () {
            $self.$click = true;
        });
        $self.$.on("blur", function () {
            var value = $self.$.val();
            if (value != '') {
                setTimeout(function () {
                    if (!$self.$click) {
                        $('.autocomplete-suggestions').hide();
                        $self.keydownEvent();
                    }
                    $self.$click = false;
                }, 150);
            }
        });
    },

    load: ($self) => {
        if ($self.ajax) {
            $self.$.autocomplete({
                paramName: $self.param ? $self.param : "query",
                ajaxSettings:{
                    url:$self.ajax,
                    type:"GET",
                    error:function (jqXHR) {
                        if (jqXHR.status != 0) {
                            var error_text;
                            if ("responseJSON" in jqXHR) {
                                if ("message" in jqXHR.responseJSON) {
                                    if (jqXHR.responseJSON.message.length > 0 || jqXHR.responseJSON.message) {
                                        error_text = jqXHR.responseJSON.message;
                                        $self.$.attr("data-error", JSON.stringify(jqXHR.responseJSON.message));
                                    }
                                }
                            }
                            else if ("responseText" in jqXHR) {
                                $self.$.attr("text-error", jqXHR.responseText);
                                error_text = jqXHR.responseText;
                            }
                            $self.$.trigger($self.ON_ERROR, error_text);
                        }
                    }
                },
                delimiter: $self.DELIMITER,
                noCache: true,

                transformResult: function(response) {
                    var data = $self.transformResult(response);
                    $self.$.attr("buffer", JSON.stringify(data.suggestions));
                    return data;
                },
                width:"400",
                groupBy:$self.condicion ? "category" : null,

                formatGroup: function(suggestion, category) {
                    return $self.formatGroup(suggestion, category);
                },

                beforeRender:function (container, suggestion) {
                    $self.beforeRender(container,suggestion);
                },

                onSelect:function(data) {
                    $self.onSelect(data);
                }
            });
        }
    },

    transformResult: ($self,response) => {
        if (!(typeof response === "object")) {
            response = $.parseJSON(response);
        }
        $self.$.attr("cache", "");
        var data = {};
        data["suggestions"] = $self.suggestions(response);
        return data;

    },

    suggestions: ($self,response) => {
        var fields = $self.$.attr($self.FIELDS);
        fields = fields.split(",");
        var map = $.map(response, function(item){
            var value = "";
            for (var index in fields) {
                if (index > 0) {
                    value += " - ";
                }
                value += item[fields[index]];
            }
            item['value'] = value;
            item["data"] = {'category': value};
            return item;
        });
        return map;
    },

    formatGroup: ($self,suggestion, category) => {
        var div="";
        if($self.condition(suggestion)){
            div = "<div style='padding: 5px 5px; white-space: nowrap; overflow: hidden; display: none; font-size: 11px; font-weight: bold'>" + suggestion["value"] + "</div>";
        }
        else {
            div = "<div style='padding: 5px 5px; white-space: nowrap; overflow: hidden; font-size: 11px; font-weight: bold'>" + suggestion["value"] + "</div>";
        }
        return div;
    },

    condition: ($self, suggestion) => {
        if ($self.condicion){
            var dymscript = "";
            for (var dymvar in suggestion) {
                dymscript += "var " + dymvar + " = '" + suggestion[dymvar] + "';";
            }
            eval(dymscript);
            var response = eval($self.condicion);
            return response;
        }
        return true;
    },

    beforeRender: ($self, container, suggestion) => {
        var new_index = 0;
        container.find(".autocomplete-suggestion").each(function (index, ui) {
            if (!$self.condition(suggestion[index])) {
                $(ui).hide();
            }
            $(ui).css({
                "cursor": "pointer"
            });
        });
    },

    onSelect: ($self, data) => {
        $self.$.attr("cache", JSON.stringify(data));
        if ($self.filter) {
            $self.$.val(data[$self.filter]);
        }
        $self.$.trigger("complete");
    },

    keydownEvent:($self) => {
        var buffer = $self.$.attr("buffer");
        var condition = $self.$.attr("condition");
        var filter = $self.$.attr("filter");
        if (buffer) {
            buffer = $.parseJSON(buffer);
            if (!$.isEmptyObject(buffer)) {
                if (!condition) {
                    $self.$.val(buffer[0][filter]);
                    $self.$.attr("cache", JSON.stringify(buffer[0]));
                    //$self.$.blur();
                }
                else {
                    var response;
                    for (var i in buffer) {
                        response = $self.condition(buffer[i]);
                        if (response) {
                            $self.$.val("");
                            $self.$.val(buffer[i][filter]);
                            $self.$.attr("cache", JSON.stringify(buffer[i]));
                            //$self.$.blur();
                            break;
                        }
                    }
                    if (!response) {
                        $self.$.val("");
                    }
                }
                $self.$.trigger("complete");
            }
            else {
                $self.$.removeAttr("cache");
                var nuevo = $self.$.attr("new");
                if (!nuevo) {
                    $self.$.val("");
                }
            }
        }
        else {
            $self.$.focus();
        }
    }

});