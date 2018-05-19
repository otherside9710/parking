
$.component('[value-is]', [],{
    VALUE_IS : 'value-is',
    init: ($self) => {
        $self.$values_is = $self.$.attr($self.VALUE_IS);
        if (!window.DECLARED_CALLBACKS){
            window.DECLARED_CALLBACKS = {};
        }
        var vars = $self.$values_is.match(/\${\w+}/g);
        for (var i in vars){
            if (!window.DECLARED_CALLBACKS[vars[i]]){
                window.DECLARED_CALLBACKS[vars[i]] = [];
            }
            window.DECLARED_CALLBACKS[vars[i]].push(function () {
                $self.refresh();
            });
        }
        $self.refresh();
    },

    refresh: $.anottate($.Export, ($self) => {
        var vars = $self.$values_is.match(/\${\w+}/g);
        var value = $self.$values_is;
        for (var i in vars){
            if (window.DECLARED && vars[i] in window.DECLARED) {
                let val = window.DECLARED[vars[i]].value;
                value = value.replace(new RegExp('\\' + vars[i], 'g'), val);
            }
        }
        //console.log(value);
        value = value.replace(new RegExp('\\${(\\w|\\W)+}', 'g'), '0');
        value = value.replace(/and/g, "&&");
        $self.$.attr("final-val", value);
        try {
            var evaluated = eval(value);
            $self.$.val(evaluated);
            $self.$.trigger("operationComplete");
        } catch (e){
            //console.error("No se pudo interpretar la línea: " + value, e);
        }


    })
});