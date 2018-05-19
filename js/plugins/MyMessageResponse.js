/**
 * dev: Brayan Parra
 */
var MyMessage = $.import("/v4/plugins/MyMessage.js");
$.component(".MyMessageResponse",[MyMessage],{
    PARENT:"parent",
    EVENT:"event",
    init: ($self) => {
        $.super(MyMessage,$self).init();
        $self.$event = $self.$.attr($self.EVENT);
        $self.events()
    },

    events: ($self) => {
        var $parent = $self.getParent();
        $parent.on($self.$event, function (event,message) {
            $self.listen(event,message)
        })
    },

    getParent: ($self) => {
        var $parent = $self.$.attr($self.PARENT);
        return $($parent);
    }
});