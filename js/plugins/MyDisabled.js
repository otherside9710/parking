$.component("[disable-if]",[],{
    DISABLE_IF:"disable-if",
    EVENT:"event",
    DEFAULT_EVENT:"change",
    PARENT:"parent",
    VALIDATE_REQUIRE:"validate-required",
    init: ($self)=> {
        $self.$disable_if = $self.$.attr($self.DISABLE_IF);
        $self.$validate_require = $self.$.attr($self.VALIDATE_REQUIRE);

        $self.$.attr("disabled","");
        $self.$event = $self.$.attr($self.EVENT);
        $self.events();
        $self.refresh();
    },

    events: ($self)=> {
        var event = $self.$event ? $self.$event : $self.DEFAULT_EVENT;
        $self.getParent().on(event, ()=> {
            $self.refresh();
        });
    },

    getParent: ($self) => {
        var $parent = $self.$.attr($self.PARENT);
        return $($parent);
    },

    refresh: $.anottate($.Export, ($self) => {
        try {
            var evaluated = eval($self.$disable_if);
            if (evaluated) {
                $self.$.attr("disabled", "").trigger("chosen:updated");
                if ($self.$validate_require){
                    $self.$.removeAttr("required");
                }
            } else {
                if ($self.$validate_require){
                    $self.$.attr("required","");
                }
                $self.$.removeAttr("disabled").trigger("chosen:updated");

            }
        } catch (e) {
            console.error('No se pudo interpretar el siguiente comando', $self.$disable_if, e);
        }
    }),
});