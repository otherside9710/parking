var MyAjax = $.import("/v4/plugins/MyAjax.js");

$.component(".MyDatatable", [MyAjax], {
    DATA: "data",
    TR: "tr",
    TD: "td",
    TH: "th",
    ROLE:"role",
    ROW: "row",
    SCROLL_X: "scroll-x",
    PRIORITY: "priority",
    NOINFO:"noinfo",

    init: ($self) => {
        $self.$construct();
        $self.$info = $self.$.attr($self.NOINFO);
        $self.$scroll_x = $self.$.attr($self.SCROLL_X);
        var config = $self.conf();
        $self.$table = $self.$.DataTable(config.valueOf());
    },

    col: ($self, col) => {
        return $self.$table.column(col);
    },

    row: ($self, elm) => {
        return $self.$table.row(elm);
    },

    rowAt: ($self, index) => {
        return $self.$.find('tr[role="row"]').get(index + 1);
    },
    /**
     * Responsive Row
     * @param {type} $self
     * @param {type} $elm
     * @return {unresolved}
     */
    rrow: ($self, $elm) => {
        var $row = $self.prow($elm);
        var list = [];
        var role;
        do {
            list.push($row.get(0));
            var $row = $row.next($self.TR);
            if ($row.length) {
                role = $row.attr($self.ROLE);
            }
        } while ($row.length && role !== $self.ROW);
        return $(list);
    },
    /**
     * Parent Row
     * @param {type} $self
     * @param {type} $elm
     * @return {unresolved}
     */
    prow: ($self, $elm) => {
        var role = $elm.attr($self.ROLE);
        if (role === $self.ROW) {
            return $elm;
        }
        var prev = $elm.prev();
        if (prev.length) {
            return $self.prow(prev);
        }
    },

    /**
     * Retorna las columnas visibles de una fila en un objeto jQuery
     * @param $self
     */
    vrow: ($self, $tr) => {
        var visibles = $self.$table.columns(':visible')[0];
        var reals = [];
        var $prow = $self.prow($tr);
        //console.log(visibles);
        for (var real in visibles) {
            var td = $prow.find($self.TD).get(visibles[real]);
            reals.push(td);
        }
        $self.srow($tr).find($self.TD).each(function (index, td) {
            reals.push(td);
        });
        return $(reals);
    },

    srow: ($self, $tr) => {
      return $self.prow($tr).next('.child');
    },

    index: $.anottate($.Export, ($self, $tr) => {
        var $parent = $self.prow($tr);
        var $row = $self.row($parent);
        return $self.$table.row($row).index();
    }),

    add: ($self, beforeDraw) => {
        var $ths = $self.$.find($self.TH);
        var addrows = {};

        $ths.each(function () {
            addrows[$(this).attr($self.DATA)] = "";
        });

        var row = $self.$table.row.add(addrows);

        if (beforeDraw){
            beforeDraw(addrows, row);
        }

        return $(row.draw().node());
    },

    remove: $.anottate($.Export, ($self, elm) => {
        $self.remove_tr($self.rrow($(elm)));
    }),

    remove_tr: ($self, $tr) => {
        $self.$table.row($tr).remove().draw();
    },

    draw: ($self, $tr) => {
        $self.$table.row($self.rrow($tr)).invalidate();
        $self.$table.responsive.rebuild();
        $self.$table.responsive.recalc();
    },

    render: ($self, index, data, value, row, meta) => {
        return value;
    },

    reloadTable: $.anottate($.Export, ($self) => {
        $self.$table.ajax.reload();
    }),

    conf: ($self) => {
        var conf = $.super(MyAjax, $self).conf();
        var $ths = $self.$.find($self.TH);
        var scroll_x_flag = $self.$scroll_x ? true : false;
        return conf.update({
            info: !$self.$info ? true : false,
            paging: !$self.$info ? true : false,
            searching: !$self.$info ? true : false,
            scrollX: scroll_x_flag,
            scrollY: "50vh",
            sort: false,
            pageLength: 20,
            responsive: true,
            columns: $.map($ths, (th, index) => {
                let data = $(th).attr($self.DATA);
                let priority = $(th).attr($self.PRIORITY);
                return {
                    data: data,
                    targets: index,
                    responsivePriority: priority?priority:1,
                    render: (value, type, row, meta) => {
                        return $self.render(index, data, value, row, meta);
                    }
                };
            }),
        });
    }
});

