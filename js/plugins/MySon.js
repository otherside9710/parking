var MySelecctSon = $.import("/v4/plugins/MySelectSon.js");
var MyAutocompleteSon = $.import("/v4/plugins/MyAutocompleteSon.js");

$.component(".MySon",[MySelecctSon,MyAutocompleteSon],{
    PARENT_AUTO: "parent-auto",
    PARENT_SELECT: "parent-select",
    FIELD: "field",
    init:($self) => {
        $self.$parent_select = $self.$.attr($self.PARENT_SELECT);
        $self.$parent = $($self.$parent_select);
        $.super(MySelecctSon, $self).event();
    },

    onFill: ($self) => {
        $self.$parent_auto = $self.$.attr($self.PARENT_AUTO);
        $self.$field = $self.$.attr($self.FIELD);
        var $parent = $($self.$parent_auto);
        $.super(MyAutocompleteSon, $self).setValue($parent, $self.$field);
    },

});