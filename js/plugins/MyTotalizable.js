$.component(".MyTotalizable", [], {
    ATTR: "attr",
    VALUE:"attr-value",
    OPERATION:"operation",
    EVENT:"event",
    init:($self) =>
    {
        $self.acumulator = 0;
        $self.attribute = $self.$.attr($self.ATTR);
        $self.value = $self.$.attr($self.VALUE);
        $self.operation = $self.$.attr($self.OPERATION);
        $self.$event = $self.$.attr($self.EVENT);
        $self.event();
        $self.refresh();
    },

    event:($self) =>
    {
        $.initialize("[" + $self.attribute + "=" + $self.value + "]", function (index, ui) {
            $(ui).on($self.$event?$self.$event:"change", function () {
                $self.refresh();
            });
        });
    },

    refresh: $.anottate($.Export, ($self) =>{
        switch ($self.operation)
        {
            case "S":
                $self.sum();
                $self.$.val($self.acumulator);
                $self.$.trigger('change');
                //$self.$.trigger($self.$event);
                break;

            case "R":
                $self.res();
                $self.$.val($self.acumulator);
                console.log("=" , $self.acumulator);
                $self.$.trigger('change');
                break;

            case "M":
                $self.mul();
                $self.$.val($self.acumulator);
                $self.$.trigger('change');
                break;
        }
    }),

    sum:($self) => {
        $self.acumulator = 0;
        $("[" + $self.attribute + "=" + $self.value + "]").each(function (index, ui) {
            var value = parseFloat( $(ui).val() );
            $self.acumulator += value ? value : 0;
        });
    },

    res:($self) => {
        $self.acumulator = 0;
        $("[" + $self.attribute + "=" + $self.value + "]").each(function (index, ui) {
            var value = parseFloat( $(ui).val() );
            if (index === 0){
                $self.acumulator = value ? value : 0;
            }else{
                $self.acumulator -= value ? value : 0;
            }
        });
    },

    mul:($self) => {
        $self.acumulator = 1;
        $("[" + $self.attribute + "=" + $self.value + "]").each(function (index, ui) {
            var value = parseFloat( $(ui).val() );
            $self.acumulator *= value ? value : 1;
        });
    }
});