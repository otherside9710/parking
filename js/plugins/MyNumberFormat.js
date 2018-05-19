$.component(".MyNumberFormat", [], {
    init:($self) =>
    {
        $self.event();
        $self.$.trigger('blur');
    },

    event:($self) =>
    {
        if ($self.$.currency) {
            $self.$.currency();
        } else {
            $self.$.number(true, 2);
        }

        $self.$.css({
            'text-align': 'right'
        });

        $self.$.on('blur', function () {
            if ($self.$.val() === ''){
                $self.$.val(0);
            }
            $self.$.trigger('change');
        });
    }
});