$.component(".MyAjax", [], {
    AJAX: "ajax",
    DATA_SRC: "data-src",
    USE_CACHE: "use-cache",

    init: ($self) => {
        $self.$use_cache = $self.$.attr($self.USE_CACHE);
    },

    load: ($self, conf) => {
        if (conf instanceof Conf){
            conf = conf.valueOf();
        }
        conf = conf?conf:$self.conf().valueOf();
        //console.log(conf.url, $self.$use_cache, $self);
        if ($self.$use_cache){
            $.cacheAjax(conf);
        }else{
            $.ajax(conf);
        }
    },

    post: ($self, conf) => {
        conf['type'] = 'POST';
        $self.load(conf);
    },


    delete: ($self, conf) => {
        conf['type'] = 'DELETE';
        $self.load(conf);
    },

    get: ($self, conf) => {
        conf['type'] = 'GET';
        $self.load(conf);
    },

    conf: ($self) => {
        var conf = {};
        var ajax = $self.$.attr($self.AJAX);
        var dataSrc = $self.$.attr($self.DATA_SRC);

        if (ajax) {
            conf[$self.AJAX] = {
                url: ajax,
                dataSrc: dataSrc
            };
        }
        return new Conf(conf);
    }
});

