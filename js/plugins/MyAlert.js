/*Dev by Julio Peña*/

$.component(".MyAlert", [], {
    AUTOSTART: "autostart",
    ALERT_TITLE: "alert_title",
    ALERT_CONTENT: "alert_content",
    ALERT_TYPE: "alert_type",
    ALERT_SUCCESS: "success",
    ALERT_CONFIRMBUTTON: "alert_confirmbutton",
    ALERT_CANCELBUTTON: "alert_cancelbutton",
    OK: "ok",
    CANCEL: "cancel",
    hide: false,

    init: ($self) => {
        $self.$autostart = $self.$.attr($self.AUTOSTART);
        $self.$alert_title = $self.$.attr($self.ALERT_TITLE);
        $self.$alert_content = $self.$.attr($self.ALERT_CONTENT);
        $self.$alert_type = $self.$.attr($self.ALERT_TYPE);
        $self.$alert_confirmbutton = $self.$.attr($self.ALERT_CONFIRMBUTTON);
        $self.$alert_cancelbutton = $self.$.attr($self.ALERT_CANCELBUTTON);
        $self.buttonHidden();

        if ($self.$autostart) {
            $self.showAlert();
        }
        $self.buttonClick();

    },

    showAlert: $.anottate($.Export, ($self, message) => {
        swal({
            title: $self.$alert_title,
            text: (!message ? $self.$.attr($self.ALERT_CONTENT) : message),
            icon: $self.$alert_type ? $self.$alert_type : $self.ALERT_SUCCESS,
            buttons: {
                cancel: $self.$alert_cancelbutton,
                confirm: {
                    text: $self.$alert_confirmbutton,
                    value: $self.OK
                }
            }
        }).then(function (value) {
            switch (value) {
                case $self.CANCEL: {
                    $self.onCancel();
                    break;
                }
                case $self.OK: {
                    $self.onOk();
                    break;
                }
            }
        });
    }),

    onCancel: ($self) => {

    },

    onOk: ($self) => {
        $self.$.click();
        $self.$.trigger($self.OK);
    },

    buttonHidden: ($self) => {
        if ($self.hide) {
            $self.$btn = $($self.$.get(0).outerHTML);
            $self.$.hide();
            $self.$btn.insertBefore($self.$);
        }
    },

    buttonClick: ($self) => {
        if ($self.$btn) {
            $self.$btn.on("click", function (event) {
                $self.showAlert($self);
                event.stopPropagation();
            });
        }
    }
});