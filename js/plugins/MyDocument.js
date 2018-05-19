var MyAjax = $.import("/v4/plugins/MyAjax.js");

$.component(".MyConsecutivo" , [MyAjax],{
    PARENT:"parent",
    AJAX:"ajax",
    FIELDS:"fields",
    CACHE:"cache",
    FILTER:"filter",
    PLUS: "plus",
    ON_ERROR:"on-error-component",
    ON_SUCCESS:"on-success-component",
    init:($self)=>{
        $self.$fields = $self.$.attr($self.FIELDS);
        $self.$parents = $self.$.attr($self.PARENT);
        $self.$ajax = $self.$.attr($self.AJAX);
        $self.$filter = $self.$.attr($self.FILTER);
        $self.$plus = $self.$.attr($self.PLUS);

        $self.events();
        $self.refresh();

    },

    refresh: ($self) => {
        var parent = $self.getParent();
        $self.$data = {};
        var value;
        var field = $self.$fields.split(",");
        for (var i in parent) {
            value = $self.getData(parent[i]);
            if (value != 0 && value !== "----") {
                $self.$data[field[i]] = value;
            }
        }

        if (Object.keys($self.$data).length == 2) {
            $self.load();
        }
    },

    events:($self)=>{
        var parent = $self.getParent();
        for (var index in parent) {
            $(parent[index]).on("change", function () {
                $self.refresh();
            });
        }
    },

    getData:($self, $parent)=>{
        return $parent.val();
    },

    getParent:($self)=>{
        var parents = $self.$parents;
        var array=[];
        if (parents.includes(",")){
            parents = parents.split(",");
        }
        for (var i in parents){
            array.push($(parents[i]));
        }
        return array;
    },

    conf:($self)=>{
        if ($self.$ajax){
            var conf = new Conf();
            return conf.update({
                'url': $self.$ajax,
                'type': 'GET',
                'data': $self.$data,

                'success': function (response) {
                    if ( typeof (response) !== "object") {
                        response = $.parseJSON(response);
                    }
                    var value = parseInt(response[$self.$filter]) + new Number($self.$plus);
                    $self.$.val(value);
                    $self.$.trigger($self.ON_SUCCESS);
                },

                'error':function(jqXHR){
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
                    $self.$.trigger($self.ON_ERROR, error_text);
                }
            });
        }

    }
});