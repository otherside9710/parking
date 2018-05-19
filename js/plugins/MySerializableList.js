$.component(".MySerializableList", [], {
    NAME : "name",
    init : ($self) =>{
        $self.$name = $self.$.attr($self.NAME);
    },

    serialize: $.anottate($.Export, ($self) => {
        return $self.serializeForm();
    }),


    serializeForm: ($self) => {
        var array = [];

        $self.$.find('[attr-name="'+$self.$name+'"]').each(function (index, ui) {
            var val = $(ui).val();
            array.push(val);
        });
        return array;
    },

});