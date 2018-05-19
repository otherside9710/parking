/*
 * @author: Julio Peña
 */
var MyLoading = $.import('/v4/plugins/MyLoading.js');

$.component('.MyLoadingEvents', [MyLoading], {
    EVENT_START: "event-start",
    EVENT_END: "event-end",
    EVENT_STOP: "event-stop",
    PARENT: "parent",
    init: ($self) => {
        $self.$event_start = $self.$.attr($self.EVENT_START);
        $self.$event_end = $self.$.attr($self.EVENT_END);
        $self.$event_stop = $self.$.attr($self.EVENT_STOP);
        $self.$parent = $($self.$.attr($self.PARENT));
        $self.events();
    },

    events: ($self) => {
        $self.$parent.on($self.$event_start, function () {
            $self.cargarGif();
        });

        $self.$parent.on($self.$event_end, function () {
            $self.removeLoad();
        });

        $self.$parent.on($self.$event_stop, function () {
            $self.removeLoad();
        });
    }
});