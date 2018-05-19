$.component(".MyShowIf",[],{
    SHOW_IF: "show-if",
    init:($self) => {
        $self.$show_if = $self.$.attr($self.SHOW_IF);
        $("input, select, textarea").change(function () {
            $self.refresh();
        });
        $self.refresh();
    },

    refresh: $.anottate($.Export, ($self) => {
        var evaluated = eval($self.$show_if);
        if (evaluated){
            $self.$.css({
                'display': 'block'
            })
        }
        else {
            $self.$.css({
                'display': 'none'
            })
        }
    })

});