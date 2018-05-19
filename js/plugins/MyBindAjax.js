
var MyAjax = $.import("/v4/plugins/MyAjax.js");
var MyBind = $.import("/v4/plugins/MyBind.js");

$.component(".MyBindAjax", [MyBind, MyAjax], {
    init: function () {
        $self.load();
    },

    conf: ($self) => {
        var conf = $.super(MyAjax, $self).conf();
        return conf.update({
            success: function (data) {
                $self.bind(data);
            }
        });
    }
});