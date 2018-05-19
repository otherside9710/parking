var MyRegex = $.import("/v4/plugins/MyRegex.js");
$.component(".MyTagsInputs",[MyRegex],{
    DISABLE_IF:"disable-if",
    init:($self) => {
        $self.initialize();
        $self.$input = $self.$.tagsinput('input');
        $self.clone();
        $self.$input.attr("regex","phone");
        $self.event();
    },

    initialize:($self) => {
        $self.$.tagsinput({
            tagClass: 'label label-info'
        });
    },

    clone:($self) => {
        var disable = $self.$.attr($self.DISABLE_IF);
        if (disable){
            $self.$input.attr("disable-if", disable);
        }
    },

    update:($self) => {
        $($self.$input).blur();
        $($self.$input).focus();
    },

    event:($self) => {
        $self.$input.on("keydown", function (e) {
            if (e.keyCode == 13) {
                $self.update();
                return false;
            }
        });
    }

});