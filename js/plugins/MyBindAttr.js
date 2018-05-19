var MyBind = $.import("/v4/plugins/MyBind.js");

$.component(".MyBindAttr", [MyBind], {
    BIND_ATTR: "bind-attr",

    init: ($self) => {
        $self.$bind_attr = $self.$.attr($self.BIND_ATTR);
        $self.bind();
        $self.$.on('DOMNodeInserted', function () {
            $self.bind();
        });
    },

    bind: ($self) => {
        if ($self.$bind_attr) {
            var data = JSON.parse($self.$bind_attr);
            $.super(MyBind, $self).bind(data);
        }
    }

});