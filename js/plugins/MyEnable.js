$.component("[disable-if], .MyEnable", [], {
    DISABLE_IF: "disable-if",
    LIVE: "live",
    DISABLE_EVENT: "disable-event",
    DISABLE_PARENT: "disable-parent",
    NOTME: "not-me",

    init: ($self) => {
        $self.$disable_if = $self.$.attr($self.DISABLE_IF);
        $self.$live = $self.$.attr($self.LIVE);
        $self.$disable_event = $self.$.attr($self.DISABLE_EVENT);
        $self.$disable_parent = $self.$.attr($self.DISABLE_PARENT);
        $self.$not_me = $self.$.attr($self.NOTME);
        $self.$.attr("disabled", "");
        $self.refresh();
        $self.events();
    },

    events: ($self) => {
        $("input,select,textarea").on('change', function () {
            $self.refresh();
        });
        if ($self.$live) {
            $("input,textarea").on('keyup', function () {
                $self.refresh();
            });
        }
        if ($self.$disable_parent && $self.$disable_event) {
            $($self.$disable_parent).on($self.$disable_event, function () {
                if(!$self.$not_me){
                    $self.$.removeAttr("disabled").trigger("chosen:updated");
                }else {
                    $self.$.attr("disabled", "").trigger("chosen:updated");
                }
            });
        }

    },

    refresh: $.anottate($.Export, ($self) => {
        try {
            var evaluated = eval($self.$disable_if);
            if (evaluated) {
                $self.$.attr("disabled", "").trigger("chosen:updated");

            } else {
                $self.$.removeAttr("disabled").trigger("chosen:updated");

            }
        } catch (e) {
            console.error('No se pudo interpretar el siguiente comando', $self.$disable_if, e);
        }
    }),

});