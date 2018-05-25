/*Dev by Julio Peña*/
var MyAlert = $.import("/js/plugins/MyAlert.js");

$.component(".MyAlertResponse", [MyAlert], {
    EVENT: "event",
    PARENT: "parent",

    init: ($self) => {
        $self.hide = false;
        $.super(MyAlert, $self).init();
        $self.$event = $self.$.attr($self.EVENT);
        $self.$parent = $($self.$.attr($self.PARENT));
        $self.events();
    },

    events: ($self) => {
        $self.$parent.on($self.$event, function (evt, param) {
            $self.showAlert(param);
        });
    }
});