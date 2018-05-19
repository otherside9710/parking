/* 
 * 
 */
window.URL_CACHE = {};
$.import = (url) => {
    var $comp = {};
    if (window.URL_CACHE[url]) {
        return window.URL_CACHE[url];
    }
    $.ajax({
        url: url,
        async: false,
        success: function (data) {
            $comp = eval(data);
        }
    });
    window.URL_CACHE[url] = $comp;
    return $comp;
};

window.CACHE_AJAX_REQUEST = {};
window.CACHE_AJAX = {};
window.CACHE_AJAX_LISTENER = {};
$.cacheAjax = (conf) => {
    var url = conf.url + "@" + JSON.stringify(conf.data)
    if (window.CACHE_AJAX_REQUEST[url]){
        if (window.CACHE_AJAX[url] != null){
            conf.success(window.CACHE_AJAX[url]);
        }else{
            if (!window.CACHE_AJAX_LISTENER[url]){
                window.CACHE_AJAX_LISTENER[url] = [];
            }
            window.CACHE_AJAX_LISTENER[url].push(conf.success);
        }
    }else{
        window.CACHE_AJAX_REQUEST[url] = true;
        var aux_success = conf.success;
        conf.success = (data) =>{
            window.CACHE_AJAX[url] = data;
            aux_success(data);
            if (window.CACHE_AJAX_LISTENER[url]) {
                for (var i in window.CACHE_AJAX_LISTENER[url]) {
                    window.CACHE_AJAX_LISTENER[url][i](data);
                }
            }
        };
        $.ajax(conf);
    }
};

$.Override = (method) => {
    method.Override = true;
    return method;
};

$.Export = (method) => {
    method.Export = true;
    return method;
};


$.anottate = (anott, method) => {
    return anott(method);
};

function isDisabled(elm) {
    return $(elm).attr("disabled");
}

function getSerialize(index, input, data) {
    if ($(input).attr("type") == 'checkbox' || $(input).attr("type") == 'radio') {
        if (input.checked) {
            data += (index ? '&' : '') + $(input).attr("name") + "=" + input.value;
        }
    }
    else {
        data += (index ? '&' : '') + $(input).attr("name") + "=" + $(input).val().trim();
    }
    return data;
}

function getSerializeObject(input) {
    var val = "";
    if (input.serialize) {
        val = input.serialize();
    } else {
        if ($(input).attr("type") == 'checkbox' || $(input).attr("type") == 'radio') {
            val = input.checked ? input.value : null;
        } else {
            val = $(input).val();
        }
    }
    return val;
}

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

$.serialize = (elm, nodisbled) => {
    var data = "";
    var valid = false;
    $(elm).find('[name]').each(function (index, input) {
        if (nodisbled) {
            valid = isDisabled(input);
            if (!valid) {
                data = getSerialize(index, input, data);
            }
        }
        else {
            data = getSerialize(index, input, data);
        }
    });
    return data;
};

$.serializeObject = function (elm, noparent, nodisabled) {
    var data = {};
    var valid = false;
    $(elm).find('[name]' + (noparent ? ':not([name] [name])' : '')).each(function (index, input) {
        var val = null;
        if (nodisabled) {
            valid = isDisabled(input);
            if (!valid) {
                val = getSerializeObject(input);
            }
        }
        else {
            val = getSerializeObject(input);
        }

        if (val) {
            if (!$.isArray(val)){
                val = val.trim();
            }
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
            value: $(input).val().trim()
        });
    });
    return data;
};

$.serializeTable = function ($table) {
    var array = [];
    $table.find('tbody tr[role="row"]').each(function (index, row) {
        var serialized = $.serializeObject(row);
        array.push(serialized);
    });
    return array;
};