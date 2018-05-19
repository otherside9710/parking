var MyForm = $.import("/v4/plugins/MyForm.js");

$.component(".MyFillForm", [MyForm], {
    STOP_EVENT: "event-stop",
    STOP_LOAD_EVENT: "stop-load-event",
    init: ($self) => {
        $self.stop_event = $self.$.attr($self.STOP_EVENT);
        $self.stop_load_event = $self.$.attr($self.STOP_LOAD_EVENT);
        $.super(MyForm, $self).init();
        $self.events();
    },

    events: ($self) => {
        if ($self.stop_event) {
            var $components = $self.$.find("[name]");
            $self.$.on($self.stop_load_event, function () {
                var valid = false;
                $components.each(function (index, ui) {
                    var val = $(ui).val();
                    if (val && val != '' && val != 0) {
                        valid = true;
                    }
                    else {
                        valid = false;
                    }
                });

                $self.$.find("[name]").on("change", function (){
                    if (valid) {
                        $.super(MyForm, $self).init();
                        $self.$.trigger("submit");
                        $self.$.trigger("on-send");
                    }
                });

            });
        } else {
            var $components = $self.$.find("[name]");
            $self.$.find("[name]").on("change", function () {
                var valid = false;
                $components.each(function (index, ui) {
                    var val = $(ui).val();
                    if (val && val != '' && val != 0) {
                        valid = true;
                    }
                    else {
                        valid = false;
                    }
                });

                if (valid) {
                    $.super(MyForm, $self).init();
                    $self.$.trigger("submit");
                    $self.$.trigger("on-send");
                }
            });
        }

    }

});