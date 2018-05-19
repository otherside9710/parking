/* 
 * 
 */

var $component;

$.import = (url) => {
    $("head").append('<script src="' + url + '"></script>');
    return $component;
};

$.Override = (method) => {
    method.Override = true;
    return method;
};

$.Export = (method) => {
    method.Export = true;
    return method;
}

$.serialize = (elm) => {
    var data = "";
    $(elm).find('[name]').each(function (index, input) {
        data += (index?'&':'') + $(input).attr("name") + "=" + $(input).val();
    });
    return data;
};

$.serializeObject = function (elm, noparent) {
    var data = {};
    $(elm).find('[name]' + (noparent?':not([name] [name])': '')).each(function (index, input) {
        var val = null;
        if (input.serialize) {
            val = input.serialize();
        }else {
            if ($(input).attr("type") == 'checkbox'){
                val = input.checked?input.value:null;
            }else {
                val = $(input).val();
            }
        }
        if (val){
            data[$(input).attr("name")] = val;
        }
    });
    return data;
};

$.serializeArray = (elm) => {
    var data = [];
    $(elm).find('[name]').each(function (index, input) {
        data.push({
            name: $(input).attr("name"),
            value: $(input).val()
        });
    });
    return data;
};

function Conf(value) {
    this.value = value;
}

Conf.prototype = {
    value: {},
    update: function (dict) {
        var value = {};
        for (var i in this.value) {
            value[i] = this.value[i];
        }
        for (var i in dict) {
            value[i] = dict[i];
        }
        return new Conf(value);
    },
    valueOf: function () {
        return this.value;
    },
    toString: function () {
        return JSON.stringify(this.value);
    }

};

$.Merge = (method) => {
    return ($self) => {
        var resp = {};
        for (let i in $self.$inherit) {
            var respo = $self.$super($self.$inherit[i])[$self.$called]();
            resp = Object.assign(resp, respo);
        }
        resp = Object.assign(resp, method($self));
        return resp;
    };
};

$.anottate = (anott, method) => {
    return anott(method);
};
var unique = 0;
$.component = (rules, inherit, dict) => {
    if (!dict) {
        return $.component(rules, {}, inherit);
    }
    if (!inherit instanceof Array) {
        inherit = [inherit];
    }

    $component = dict;
    $super = {};
    for (var i in inherit) {
        for (var j in inherit[i]) {
            let inh = inherit[i];
            if (!(j in $component)) {
                let mem = inherit[i][j];
                if (isFunction(mem)) {
                    $component[j] = function () {
                        let args = Array.prototype.slice.call(arguments);
                        let $self = args[0];
                        return $self.$super(inh)[$self.$called].apply(this, args.splice(1));
                    };
                } else {
                    $component[j] = mem;
                }
            }
        }
    }

    function isFunction(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }

    function replace_method($self, i){
        return function () {
            let old_called = $self.$called;
            let old_caller = $self.$caller;
            $self.$caller = $self.$called;
            $self.$called = i;
            //console.log($self.$me["__rules__"], $self.$me["__unique__"], $self.$caller, '->', $self.$called);
            let resp = $self.$me[i].apply(this, [$self].concat(Array.prototype.slice.call(arguments)));
            $self.$caller = old_caller;
            $self.$called = old_called;
            return resp;
        };
    }

    function replace_member($self, elm, $component, i) {
        if (isFunction($component[i])) {
            $self[i] = replace_method( $self, i);

            if ($component[i].Export){
                elm[i] = function () {
                    return $self[i]($self);
                };
            }
            $self[i].$name = i;
        } else {
            $self[i] = $component[i];
        }
    }

    function instanceObj(elm, $component, $son) {
        var $self = new Object();

        for (var i in $component) {
            replace_member($self, elm, $component, i);
        }
        $self.$son = $son;
        $self.$ = $(elm);
        $self.$me = $component;
        $self.$inherit = $component["__inherit__"];
        $self.$copy = () => {
            var copy = new Object();
            for (let i in $self) {
                copy[i] = $self[i];
            }
            return copy;
        };
        $self.$superlist = {};
        $self.$.attr("myasesor-component", "MyAsesor S.A.S");
        $self.$super = ($inerit) => {
            let $super = $self.$superlist[$inerit["__unique__"]];
            if (!$super) {
                $super = instanceObj(elm, $inerit, $self);
                for (var i in $component) {
                    function transform($self, $super, $component, i) {
                        if ($component[i] && $component[i].Override) {
                            $super.$me["__" + i] = $super.$me[i];
                            $super.$me[i] = function () {
                                let args = Array.prototype.slice.call(arguments);
                                let self = args[0];
                                if (!self.$son.$caller || self.$son.$caller !== self.$caller) {
                                    return $self[i].apply(this, args.splice(1));
                                } else {
                                    return $super.$me["__" + i].apply(this, [$super].concat(args));
                                }
                            };
                        }
                    }
                    transform($self, $super, $component, i);
                }
            }
            $self.$superlist[$inerit["__unique__"]] = $super;
            return $super;
        };

        $self.$construct = () => {
            for (let i in $component["__inherit__"]) {
                $self.$super($component["__inherit__"][i]).init();
            }
        };
        return $self;
    }

    $component["__inherit__"] = inherit;
    $component["__rules__"] = rules;


    function prepare_events($component, rules) {
        $(() => {
            if (rules) {
                function mage(rules, elm){
                    var cur = $(elm).attr("comp")? $(elm).attr("comp") + ",": "";
                    if (!cur.includes(rules)) {
                        $(elm).attr("comp", cur + rules);
                        $component["__unique__"] = unique++;
                        $self = instanceObj(elm, jQuery.extend(true, {}, $component));
                        $self.init();
                    }
                }
                $.initialize(rules + ":not([excape-component] " + rules + ")", (index, elm) => {
                    mage(rules, elm);
                });
            }
        });
    }

    prepare_events($component, rules);

    return $component;
};

