/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$.super = ($inherit, $self) => {
    for (var index in $self.$super){
        //console.log($self.$rules, $self.$super[index].$prototype, '===' , $inherit);
        if ($self.$super[index].$prototype === $inherit){
            //console.log("Si");
            return $self.$super[index];
        }else{
            var $supsuper = $.super($inherit, $self.$super[index]);
            //console.log("buscando en padres", $self.$super[index]);
            if ($supsuper){
                //console.log("Si");
                return $supsuper;
            } else {
                //console.log("No");
            }
        }
    }
};


$.isFunction = (functionToCheck) => {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};

$.bind = ($method, $self) =>{
    return function() {
        return $method.apply(this, [$self].concat(Array.prototype.slice.call(arguments)));
    };
};

$.mapDict = ($dict, $func, $bind) => {
    var newDict = $bind?$bind:{};
    $func.bind(newDict);
    for (var i in $dict){
        newDict[i] = $func(i, $dict[i], newDict);
    }
    return newDict;
};

$.dict = ($dict, $func) => {
    var newDict = {};
    $func.bind(newDict);
    for (var i in $dict){
        var resp = $func(i, $dict[i], newDict);
        newDict[resp.name] = resp.value;
    }
    return newDict;
};


$.instance = ($comp, $bind, elm, $rules) => {
    var $instance = $.mapDict($comp, function ($i, $member, $self) {
       if ($.isFunction($member)){
           var $method = $.bind($member, $bind?$bind:$self);
           if ($member.Export){
               elm[$i] = $method;
           }
           return $method;
       }
       return $member;
    });
    $instance.$super = $.mapDict($comp.$super, function ($i, $inherit){
        return $.instance($inherit, $bind?$bind:$instance, elm, $rules);
    });
    $instance.$prototype = $comp;
    $instance.$ = $(elm);
    $instance.elm = elm;
    $instance.$rules = $rules;

    return $instance;
};

$.combine = ($dicts) =>{
  var newDict = {};
  for (var i in $dicts){
      newDict = $.extend(newDict, $dicts[i]);
  }
  return newDict;
};
/*
Object.prototype.update = function (self){
    return $.extend(this, self);
};*/

$.component = ($rules, $inherits, $dict) => {
    if (!window[$rules]){

        var $comp = $.extend($.combine($inherits), $dict);
        $comp.$rules = $rules;
        $comp.$super = $inherits;
        window[$rules] = $comp;
        if ($rules){
            //$(function () {
                $.initialize($rules + ":not([excape-component] " + $rules + ")", (index, elm) => {
                    var $self = $.instance($comp, false, elm, $rules);
                    $self.$construct = function (){};
                    if (!$self.$.attr("components") || !$self.$.attr("components").includes('$' + $rules + '$')){
                        $self.$.attr("components", $self.$.attr("components")?$self.$.attr("components"):'' + '$' + $rules + '$');
                        $self.init();
                    }
                });
            //});
        }
    }
    return window[$rules];
};

var originalVal = $.fn.val;
$.fn.val = function() {
    var args = Array.prototype.slice.call(arguments);
    if(this.length) {
        var elm = this.get(0);
        if (args[0] === undefined){
            if (elm.getValue){
                return elm.getValue();
            }
        }else
        if (elm.setValue) {
            return elm.setValue.apply(this, args);
        }
        elm.pre_val = args[0];
        $(elm).attr("pre_val", args[0]);
    }
    return originalVal.apply(this, args);

};

$.fn.vals = function() {
    var vals = [];
    $(this).each(function () {
       vals.push(this.value);
    });
    return vals;
}