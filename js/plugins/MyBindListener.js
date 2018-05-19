
var MyListener = $.import("/v4/plugins/MyListener.js");
var MyBind = $.import("/v4/plugins/MyBind.js");

$.component(".MyBindListener", [MyBind, MyListener], {
    BIND_SRC: "bind-src",
    BIND_CACHE: "bind-cache",

    init: ($self) => {
        $.super(MyBind, $self).init();
        $.super(MyListener, $self).init();
        $self.$bind_src = $self.$.attr($self.BIND_SRC);
        $self.$bind_cache = $self.$.attr($self.BIND_CACHE);
    },

    bind: ($self) => {
        var parent = $self.$parent;
        if ($self.$bind_src){
            parent = $self.$parent.find($self.$bind_src);
        }
        var data = parent.attr($self.$bind_cache?$self.$bind_cache:'cache');
        $.super(MyBind, $self).bind(JSON.parse(data));
    },

    listen: ($self) => {
        $self.bind();
    }
});