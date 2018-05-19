$.component(".MySelectActive", [], {
    SELECTVALUE:"selected-value",
    FILL_WHEN: "fill-when",
    init:($self) => {
        $self.$fill_when = $self.$.attr($self.FILL_WHEN);
        $self.events();

    },

    events: ($self) => {
        if ($self.$fill_when){
            $self.$.on($self.$fill_when, function () {
                $self.defaultValue();
            })
        } else {
            $self.defaultValue();
        }
    },

    defaultValue:($self) => {
        var selectd = $self.$.attr($self.SELECTVALUE);
        if (selectd && selectd !== ""){
            $self.$.val(selectd);
            selectd= null;
            $self.$.trigger("change");
        }
    },
});