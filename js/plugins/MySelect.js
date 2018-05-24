/**
 *
 */

var MyAjax = $.import("/js/plugins/MyAjax.js");
var MySelectActive = $.import("/js/plugins/MySelectActive.js");

$.component('.MySelect', [MyAjax, MySelectActive],{
    TYPE: "type",
    FIELDS: "fields",
    FILTER: "filter",
    PARENT: "parent",
    AJAX: "ajax",
    NODISABLED:"nodisable",
    SELECTVALUE: "selected-value",
    LOAD:"load",
    BIND_VAL: "bind-val",
    ON_SUCCESS:"on-success-component",
    ON_SUCCESS_ERROR:"on-success-error",
    ON_ERROR:"on-error-component",
    init:($self) => {
        $.super(MyAjax, $self).init();
        $self.$parent = $self.$.attr($self.PARENT);
        $self.$bindval = $self.$.attr($self.BIND_VAL);
        $self.loadAjax();
        $self.$fill_when = $self.LOAD;
        $.super(MySelectActive, $self).events();
        $self.$future_val = $self.$.get(0).pre_val;
    },

    loadAjax: ($self, data_obj) => {
        if (data_obj){
            var conf = $self.conf();
            $self.load(conf.update({
                data: data_obj
            }));
        }else {
            $self.load();
        }
    },

    parent_is_complete: ($self, $parent) => {
        var complete = true;
        $parent.each(function (index, ui) {
           if ($(this).val() === "0") {
               complete = false;
           }
        });
        return complete;
    },

    add_data_obj: ($self, data_obj, $parent) => {
        var data = $ui.attr("data");
        var parent_is_complete = $self.parent_is_complete($parent);

        if (parent_is_complete) {
            if (data) {
                //convert data to array
                var datas = data.split(",");
                for(var i in datas){
                    var data_in = datas[i];
                    var cache;
                    var json_cache;
                    if (data_in.includes(".")) {
                        var parts = data_in.split(".");
                        cache = $(parts[0]).val();
                        if (cache !== "0") {
                            cache = $(parts[0]).find(":selected").attr("cache");
                            json_cache = JSON.parse(cache);
                            data_obj[parts[1]] = json_cache[parts[1]];
                        }
                    }
                    else {
                        cache = $parent.find(":selected").attr("cache");
                        if (cache) {
                            json_cache = JSON.parse(cache);
                            data_obj[data_in] = json_cache[data_in];
                        }
                    }
                }
            }
        }
        else {
            $self.clean();
        }
        return data_obj;
    },

    content: ($self, response, fields, filter) => {
        fields = fields.split(",");
        $self.clean();
        if (!$.isEmptyObject(fields) && !$.isEmptyObject(response)) {
            for (var i in response){
                var str="";
                for (var j in fields){
                    if (j > 0){
                        str += " - ";
                    }
                    str += response[i][fields[j]];
                }

                var $option = new Option(
                     str
                    ,response[i][filter]
                    ,response[i][filter] == $self.$future_val
                    ,false//para dar soporte bind
                );
                $option.setAttribute("cache", JSON.stringify(response[i]));
                $self.$.append($option);
            }
            var selectd = $self.$.attr($self.SELECTVALUE);
            if (selectd && selectd !== "") {
                $self.$.val(selectd);
            }
            $self.$.trigger($self.LOAD);
            $self.$.trigger('change');
            $self.$.trigger('complete-load');
        }

    },

    clean: ($self) => {
        $self.$.find('option:not([value="0"])').remove();
    },

    conf: $.anottate($.Override, ($self) => {
        var fields = $self.$.attr($self.FIELDS);
        var filter = $self.$.attr($self.FILTER);
        var ajax = $self.$.attr($self.AJAX);

        return {
            'url':ajax,
            'type':'GET',
            'success': function (response) {
                if (typeof response === "string"){
                    response = $.parseJSON(response);
                }
                if(typeof response === "object") {

                    var datain = $self.$.attr("datain");
                    if (datain) {
                        response = response[datain];
                    }
                    //fill data in the component
                    $self.content(response, fields, filter);
                    $self.$.trigger($self.ON_SUCCESS);
                }
                else {
                    $self.$.trigger($self.ON_SUCCESS_ERROR);
                }
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
                $self.$.trigger($self.ON_ERROR, error_text ? error_text.replace(/-/g, " "): error_text);
            }
        };
    })
});