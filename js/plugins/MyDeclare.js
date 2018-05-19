
$.component('[declare-as]', [],{
    DECLARE_AS : 'declare-as',
    EVENT : 'event',
    EVENT_AS : 'event-as',

    init: ($self) => {
        $self.$declare_as = $self.$.attr($self.DECLARE_AS);
        $self.$event = $self.$.attr($self.EVENT);
        $self.$event_as = $self.$.attr($self.EVENT_AS);

        if ($self.$event_as){
            $self.$event = $self.$event_as;
        }

        if (!window.DECLARED){
            window.DECLARED = {};
        }
        if (!window.DECLARED_CALLBACKS){
            window.DECLARED_CALLBACKS = {};
        }

        $self.event();
        $self.refresh();
    },

    event: ($self) =>{
        $self.$.on($self.$event?$self.$event:'change', function () {
            $self.refresh();
        });
    },

    refresh: $.anottate($.Export, ($self) => {
        var var_name = '${' + $self.$declare_as + '}';
        if (!window.DECLARED[var_name]){
            window.DECLARED[var_name] = {
                value: $self.$.val(),
                callbacks: []
            };
        } else {
            window.DECLARED[var_name].value = $self.$.val();
            for (var i in window.DECLARED[var_name].callbacks){
                window.DECLARED[$self.$declare_as].callbacks[i]($self.$.val());
            }
            for (var i in window.DECLARED_CALLBACKS[var_name]){
                window.DECLARED_CALLBACKS[var_name][i]($self.$declare_as, $self.$.val());
            }
        }
    })
});