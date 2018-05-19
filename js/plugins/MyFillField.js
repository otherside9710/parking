
$.component('.MyFillField', [], {
    FILL_WIDTH: 'fill-width',
    FILL_CHAR: 'fill-char',
    init: ($self) => {
        $self.$fill_width = $self.$.attr($self.FILL_WIDTH)? $self.$.attr($self.FILL_WIDTH): 12;
        $self.$fill_char = $self.$.attr($self.FILL_CHAR)?$self.$.attr($self.FILL_CHAR):0;
        $self.events();
    },

    events: ($self) => {
        $self.$.on('change', function () {
            var val = $self.$.val();
            $self.$.val($self.zeroFill(val, $self.$fill_width));
        });
    },

    zeroFill: ( $self, number, width ) => {
        width -= number.toString().length;
        if ( width > 0 ) {
            return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( $self.$fill_char ) + number;
        }
        return number + "";
    }
});