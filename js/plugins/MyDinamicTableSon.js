var MyDinamicTable = $.import("/v4/plugins/MyDinamicTable.js");
var MyListener = $.import("/v4/plugins/MyListener.js");

$.component(".MyDinamicTableSon",[MyDinamicTable, MyListener], {
    FILTER: "filter",
    CACHE_SRC: "cache-src",
    CACHE_ATTR: "cache-attr",
    init:($self) => {
       $.super(MyDinamicTable, $self).init();
       $.super(MyListener, $self).init();
       $self.$conf_class += " MyEdittableFormSon";
       $self.$filter = $self.$.attr($self.FILTER);
       $self.$cache_src = $self.$.attr($self.CACHE_SRC);
       $self.$cache_attr = $self.$.attr($self.CACHE_ATTR);
    },

    callFunction: ($self) => {
        //remove this performance in this generation
    },

    findCache: ($self) => {
        var parent = $self.$parent;
        if ($self.$cache_src){
            parent = $self.$parent.find($self.$cache_src);
        }
        var cache_data = JSON.parse(parent.attr($self.$cache_attr));
        return cache_data[$self.$filter];
    },

    listen: ($self, event) => {
        $self.$parent = $(event.target);
        var cache = $self.findCache();
        var obj = {};
        obj[$self.$filter] = cache.trim();
        $self.findData($self.$ajax, obj);
    },


});