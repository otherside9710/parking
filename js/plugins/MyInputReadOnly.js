$.component(".MyInputReadOnly",[],{
    BUFFER:"buffer",
    init: ($self) => {
        let buffer = $self.$.val();
        $self.$.attr($self.BUFFER,buffer);
        $self.events();
    },

    events: ($self) => {
        $self.$.on('keydown', function () {
            return false;
        });
    }
});