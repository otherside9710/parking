var MyAjax = $.import("/v4/plugins/MyAjax.js");

$.component(".MyInput", [MyAjax], {
    PARENT:"parent",
    CACHE: "cache",
    FILTER:"filter",
    init:($self) =>
    {
        $self.loadComponent();

    },

    loadComponent:($self) =>
    {
        var $parent = $self.getParent();
        $self.parentEvents($parent);
    },

    /**
     * @param cache
     * @param filter
     */
    setValue:($self, cache, filter) =>
    {
        if(cache && cache !== "")
        {
            var cacheParsed = $.parseJSON(cache);

            if (filter)
            {
                $self.$.val(cacheParsed[filter]);
            }
        }
    },

    /**
     * @param parent
     *
     */
    parentEvents:($self, $ui) =>
    {
        if ($ui.prop("tagName") === "SELECT")
        {
            $ui.on("change", function () {
                //find propertie
                var search = " option:selected";
                //get id
                var id = "#" + $ui.attr("id");
                //get cache from parent
                var cache = $(id + search).attr($self.CACHE);
                //get field to assign it from the variable 'cache'
                var filter = $self.$.attr($self.FILTER);
                $self.setValue(cache, filter);
            });
        }
    },

    /**
     * @return parent as jQuery Object
     */
    getParent:($self) =>
    {
        var parent = $self.$.attr($self.PARENT);
        return $( parent );
    },

    getParentValue:($self) =>
    {
        var data = {};
        var value;
        var key;
        var parent_field;
        var ajaxData = $self.$.attr("ajaxData");
        if (ajaxData) {
            ajaxData = ajaxData.split(",");
            for (var i in ajaxData) {
                if (ajaxData[i].includes(".")) {
                    parent_field = ajaxData[i].split(".");
                    value = $(parent_field[0]).val() !== "0" ? $(parent_field[0]).val() : false;
                    if (value) {
                        data[parent_field[1]] = value;
                    }
                } else {
                    return false;
                }
            }
        }
        else {
            return false;
        }
        return data;
    },

    conf: $.anottate($.Override, ($self) => {
        var fields = $self.$.attr($self.FIELDS);
        var filter = $self.$.attr($self.FILTER);
        var ajax = $self.$.attr($self.AJAX);
        return {
            'url':ajax,
            'type':'GET',
            'success': function (response) {
                //parser to Json Object
                if (!(typeof response === "object")) {
                    response = $.parseJSON(response);
                }

                var datain = $self.$.attr("datain");
                if (datain) {
                    response = response[datain];
                }

                //fill data in the component
                $self.content(response, fields, filter);
            },

            'error':function (jqXHR,error,errorThrown) {
                if (jqXHR.responseJSON){
                    alert(jqXHR.responseJSON.error);
                }
                else {
                    alert("No se puede acceder al servicio web MYASESOR..!");
                }
            }
        };
    })
});