/*Dev By Julio Peña*/

$.component(".MyAssignValue", [], {
    PARENT: "parent",
    EVENT: "event",

    init: ($self) => {
        $self.$parent = $($self.$.attr($self.PARENT));
        $self.$event = $self.$.attr($self.EVENT);
        $self.merge();
    },

    merge: ($self) => {
        var $value = $($self.$parent).val();
        $self.$.val($value);
        $self.$parent.on($self.$event, function () {
            var $fromValue = $($self.$parent).val();
            $self.$.val($fromValue);
        });
    }
  
});