$.component(".MyHtmlVal",[],{
    LISTEN:"listen",
    PARENT:"parent",
    PARENT_VALUE:"parent-value",
    VALUE_TYPE:"value-type",
    FILTER:"filter",

    init:($self)=> {
        $self.$listen = $self.$.attr($self.LISTEN);
        $self.$parent_value = $self.$.attr($self.PARENT_VALUE);
        $self.$value_type = $self.$.attr($self.VALUE_TYPE);
        $self.$filter = $self.$.attr($self.FILTER);
        $self.$parent = $self.getParent();
        $self.events();
    },

    events:($self)=>{
        $self.$parent.on($self.$listen, function () {
            var buffer = $self.getValue();
            if (buffer){
                switch (buffer.type){
                    case "text":
                        if ($self.exist(buffer.data))
                            $self.$.text(buffer.data);
                        break;

                    case "json":
                        if($self.exist(buffer.data)){
                            var json = $.parseJSON(buffer.data);
                            $self.$.text(json[$self.$filter]);
                        }
                        break;
                }
            }
        });
    },

    exist:($self, data)=>{
        if (!data){
            return false;
        }
        return true;
    },

    getValue:($self)=>{
        var response;
        response = $self.$parent.attr($self.$parent_value);

        return {
            "type": $self.$value_type,
            "data": response
        };
    },

    getParent:($self)=>{
        return $( $self.$.attr($self.PARENT));
    }
});