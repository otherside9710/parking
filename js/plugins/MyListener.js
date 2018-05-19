/*Dev By Julio Peña*/
$.component(".MyListener", [], {
    LISTEN_EVENT : "listen_event",
    PARENT: "parent",
    EVAL:"eval",
    RETURN:"return",

    init: ($self) =>{
        $self.$event = $self.$.attr($self.LISTEN_EVENT);
        $self.$parent = $($self.$.attr($self.PARENT));
        $self.$eval = $self.$.attr($self.EVAL);
        $self.$return = $self.$.attr($self.RETURN);

        $self.event();
    },

    event:($self) => {
        $self.$parent.on($self.$event, function (event, param) {
            $self.listen(event, param);
        });

    },

    listen: ($self, event) => {
        if($self.$eval) {
            let val = eval($self.$eval);
            $self.$.val(val);
        }
    }
});