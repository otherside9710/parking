$.component('.MyEval', [], {
    ATTR_NAME: "attr-name",
    ATTR_VALUE: "attr-value",
    init: ($self) => {
        $self.$attr_name = $self.$.attr($self.ATTR_NAME);
        $self.$attr_value = $self.$.attr($self.ATTR_VALUE);
        $self.setAttr();
    },

    setAttr: ($self) => {
        var value = eval($self.$attr_value);
        $self.$.attr($self.$attr_name, value);
    }
});