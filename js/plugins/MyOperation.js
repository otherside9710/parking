$.component('[value_is]', [], {
    VALUE_IS: 'value_is',
    init: ($self) => {
        $self.$values_is = $self.$.attr($self.VALUE_IS);
        $("input, select, textarea, ul").change(function () {
            $self.refresh();
        });
        $self.refresh();
    },

    refresh: $.anottate($.Export, ($self) => {
        var evaluated = eval($self.$values_is);
        $self.$.val(evaluated);
        $self.$.trigger("operationComplete");
    })
});