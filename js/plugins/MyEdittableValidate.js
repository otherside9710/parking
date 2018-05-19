var MyEdittable = $.import("/v4/plugins/MyEdittable.js");

$.component(".MyEdittableValidate",[MyEdittable],{
    EVAL:"eval",
    validate: ($self, $button) => {
        var evaluated = $self.$.attr($self.EVAL);
        return eval(evaluated);
    }
});