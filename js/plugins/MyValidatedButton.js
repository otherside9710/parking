/**
 *
 */

$.component('.MyValidatedButton', [], {
    PARENT: "parent",
    init: ($self) => {
        $self.$parent = $($self.$.attr($self.PARENT));
        $self.events();
    },

    events: ($self) => {
        $self.$.on('click', function (event) {
            var valid = $self.$parent.find("[name]:visible").valid();
            if (!valid) {
                event.stopPropagation();
            }
        });
    }

});