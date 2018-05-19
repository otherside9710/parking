var MyEdittable = $.import("/v4/plugins/MyEdittable.js");
$.component(".MyEdittableSon",[MyEdittable], {
    PARENT:"parent",
    FIELD:"field",
    FILTER:"filter",
    EVENT: "event",
    NO_BUTTONS:"no-buttons",
    DEFAULT_EVENT: "table-load",
    CACHE_SRC: "cache-src",

    init:($self)=> {
        $self.$field_data = $self.$.attr($self.FIELD);
        $self.$parent = $self.getParent();
        $self.$filter = $self.$.attr($self.FILTER);
        $self.$ajax  = $self.$.attr($self.AJAX);
        $self.$cache_src  = $self.$.attr($self.CACHE_SRC);
        $self.$no_buttons = $self.$.attr($self.NO_BUTTONS);
        $self.$event  = $self.$.attr($self.EVENT)?$self.$.attr($self.EVENT):$self.DEFAULT_EVENT;
        $.super(MyEdittable, $self).init();
    },

    events:($self) => {
        $self.parentEvents();
        console.log($self.$event);
        $self.$parent.on($self.$event, function () {
            $self.loadTable();
            return false;
        });
    },

    parentEvents: ($self) => {
        $.super(MyEdittable, $self).events();
    },

    loadTable: ($self) => {
        var cache = $self.getCache();
        var data = $self.getData(cache, $self.$filter);
        $self.$.trigger('on-loadtable');
        $self.$table.ajax.url($self.$ajax + "?" + $self.$filter + "=" + (data?data.trim():'')).load();
        $self.$.attr("value-data", data);
    },

    ajaxReload: ($self) => {
        $self.$table.ajax.reload(null, false)//loadTable(); Para no regrese la página al principio
    },

    getCache:($self) => {
        var cache;
        if ($self.$cache_src) {
            cache = $self.$parent.find($self.$cache_src).attr($self.$field_data);
        }else {
            cache = $self.$parent.attr($self.$field_data);
        }
        return cache;
    },

    getData:($self, cache, filter) => {
        if (cache) {
            if (!(typeof cache === "object")) {
                cache = $.parseJSON(cache);
            }
            return cache[filter].trim();
        }
    },

    getParent:($self)=>{
        var $parent = $self.$.attr($self.PARENT);
        return $($parent);
    },

    add:($self)=>{
        var $ths = $self.$.find($self.TH);
        var tr="<tr new='new' role='row' class='odd'>";
        var empty = $self.$.find("tbody .dataTables_empty");
        if (empty.length) {
            $self.$.find("tbody").html("");
        }
        var row = $self.$.find("tbody tr[role=row]").length;
        var row_data = {};
        $ths.each(function (index, ui) {
            var data = $(ui).attr("data");
            row_data[data] = '';
        });
        $ths.each(function (index, ui) {
            var data = $(ui).attr("data");
            tr += "<td>" + $self.render(index, data, '', row_data, {col:index, row:row}) + "</td>";
        });
        tr +="</tr>";
        $self.$.find("tbody").append(tr);
    },

    remove: ($self, $tr) => {
        if ($tr.attr("new")){
            $tr.remove();
        } else {
            $.super(MyEdittable, $self).remove($tr);
        }
    },

    conf:($self)=> {
        var conf = $.super(MyEdittable, $self).conf();
        var new_conf =  conf.update({
            processing: true,
            bServerSide: true,
            info:false,
            "deferLoading": 0/*,
            dom: '<"html5buttons"B>lTfgitp',
            buttons: !$self.$no_buttons ? [
                {extend: 'excel', title: 'Myasesor Report'}
            ] : false,*/
        });
        return new_conf;
    }
});