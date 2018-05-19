
$.component('.MySteps', [], {
    PARENT: "parent",
    FINISH: "finish",

    init: ($self) => {
        $self.$parent = $($self.$.attr($self.PARENT));
        $self.$.steps();
        $self.events();
    },

    events: ($self) => {
        $self.$.find('.actions li:last-child').on('click', function () {
            $self.$parent.trigger('submit');
            $self.$.trigger($self.FINISH);
        });
    }
});