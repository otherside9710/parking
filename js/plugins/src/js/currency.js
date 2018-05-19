/**
 * Currecy plugin
 * @author MyAsesor SAS
 * @version 1.0
 */

(function ( $ ) {
    $.fn.currency = function() {
        let currency_input = this;
        currency_input.attr("currency", "currency");
        currency_input.val(new Number(currency_input.val()).toFixed(2) );
        currency_input.on('change', function(){
            currency_input.val(new Number(currency_input.val()).toFixed(2) );
            currency_input.formatCurrency();
        });
        currency_input.formatCurrency();
    };

    var originalVal = $.fn.val;
    $.fn.val = function(value) {
        if (typeof value != 'undefined') {
            return originalVal.call(this, value);
        }
        let val = originalVal.call(this);
        if (val && $(this).attr("currency")){
            return val.replace(/(,|\$)/g, '');
        }
        return val;
    };
}( jQuery ));
