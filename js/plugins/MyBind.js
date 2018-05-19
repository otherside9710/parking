

$.component(".MyBind", [], {
    ATTR_NAME : "attr_name",
    REBIND : "rebind",

    init: function ($self) {
        $self.$attr_name = $self.$.attr($self.ATTR_NAME);
        $self.$rebind = $self.$.attr($self.REBIND);
    },

    bind: $.anottate($.Export,function ($self, data) {
        var attr_name = $self.$attr_name ? $self.$attr_name : "name";
        $self.$.find('[' + attr_name + ']').each(function (index, ui) {

            if ($self.$rebind || !$(ui).attr("bind")) {
                var name = $(ui).attr(attr_name);
                var value = data[name];
                $(ui).val(value);
                $(ui).attr("bind", "true");
                $(ui).trigger('change');
            }
        });
    }),

});