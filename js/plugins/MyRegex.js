
$.component("[regex]", [], {
    REGEX:"regex",
    NO_KEY_VALID: "no-key-valid",
    VALIDATOR:['email', 'phone'],
    FADE_OUT: "fade_out",


    init:($self) => {
        $self.match = $self.$.attr($self.REGEX);
        $self.$fade_out = $self.$.attr($self.FADE_OUT);
        $self.$no_key_valid = $self.$.attr($self.NO_KEY_VALID);
        $self.event();
    },

    event:($self) => {
        if (!$self.$no_key_valid) {
            $self.$.on("keydown", function (event) {
                console.log(event.keyCode);
                if (event.keyCode != 8 && event.keyCode != 16) {
                    var data = String.fromCharCode(event.which);
                    return ($self.validate(data) ? true : false);
                }
            });
        }

        $self.$.on("blur", function () {
            let valid = $self.validate(undefined);
            if (!valid) {
                if ($self.$fade_out){
                     $self.$.val("");
                }
                $self.$.trigger("on-alert");
                $self.$.trigger("on-regex-out");
            }
        });


    },

    validate:($self, data) => {
        var value = $self.$.val() + (data ? data : "");
        return $self.regexMatch(value);
    },

    regexMatch: ($self, value) =>
    {
        var index = $self.VALIDATOR.indexOf($self.match);
        if (index > 0) {
            switch ($self.VALIDATOR[index]){
                case 'email':
                    return $self.isValidEmail(value);
                    break;

                case 'phone':
                    return $self.isValidPhone(value);
                    break;
            }
        }
        else {
            let v = value.match($self.match);
            if (!v) {
                return false;
            }
        }

        return true;
    },

    isValidEmail:($self, value) => {
        if (!value.match(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)){
            return false;
        }
        return true;
    },

    isValidPhone:($self, value) => {
        if (!value.match("^[0-9]+$")){
            return false;
        }
        return true;
    }
});