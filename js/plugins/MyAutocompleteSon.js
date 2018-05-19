$.component(".MyAutocompleteSon", [], {
    PARENT:"parent",
    CACHE: "cache",
    CACHE_SRC: "cache-src",
    FILTER:"filter",
    FIELD:"field",
    NODISABLED:"nodisabled",
    SPLIT:"split",
    NEW:"new",
    REQUIRED_DISABLED:"required-disabled",
    POSITION:"position",

    init:($self) =>
    {

        $self.no_disabled = $self.$.attr($self.NODISABLED);
        $self.$split = $self.$.attr($self.SPLIT);
        $self.$new = $self.$.attr($self.NEW);
        $self.$position = $self.$.attr($self.POSITION);
        $self.$field = $self.$.attr($self.FIELD);
        $self.$required_disabled = $self.$.attr($self.REQUIRED_DISABLED);
        $self.loadComponent();
    },

    loadComponent:($self) =>
    {
        $self.$parent = $self.getParent();
        if (!$self.no_disabled) {
            $self.$.attr("disabled", "").trigger("chosen:updated");
        }
        $self.events($self.$parent);

        $self.$.on("focus", function () {
            $(this).select();
        });
    },

    events:($self, $parent) => {
        $parent.on("blur", function () {
            var value = $parent.val();
            var nuevo = $self.$.attr($self.NEW);
            if (value === "") {
                if (!nuevo) {
                    $self.$.val("");
                }
                $self.$.attr("disabled", "").trigger("chosen:updated");
            }else {
                if (nuevo) {
                    $self.$.prop("disabled", false);
                    $self.$.trigger("on-new");
                }
            }
        });

        $parent.on("complete", function () {
            var filter = $self.$.attr($self.FILTER);
            var cache_src = $self.$.attr($self.CACHE_SRC);
            var $parent = $self.$parent;
            if (cache_src){
                $parent = $parent.find(cache_src);
            }
            $self.setValue($parent, filter);
        });
    },

    assign: ($self, value) => {
        if ($self.$.attr('multiple')) {
            $self.$.get(0).setValue(value);
        }
        else {
            $self.$.val(value);
        }
    },

    setValue:($self, $parent, filter) =>
    {
        var cache = $parent.attr($self.CACHE);
        if (cache && cache !== "")
        {
            var parsedCache = $.parseJSON(cache);
            if ((filter && $self.$field) || filter) {
                var value = parsedCache[filter];
                value = (value == null || value == undefined) ?  parsedCache[$self.$field] : value;
                if ($self.$split) {
                    value = value ? value.split($self.$split) : "";
                    if ($self.$position){
                        $self.assign(value[parseInt($self.$position)]);
                    }
                    else {
                        if ($.isArray(value)) {
                            value = value.join(" ");
                        }
                        $self.assign(value);
                    }
                }
                else{
                    if($self.$.attr("type") == 'checkbox') {
                        var  check_value = $self.$.val();
                        if ($.trim(value) == check_value){
                            $self.$.prop("checked", true);
                        }
                        else {
                            $self.$.prop("checked", false);
                        }
                    }
                    else {
                        $self.assign($.trim(value));
                    }
                }
            }
            $self.$.trigger("change");
        }
    },

    getParent:($self) =>
    {
        var parent = $self.$.attr($self.PARENT);
        return $(parent);
    }
});