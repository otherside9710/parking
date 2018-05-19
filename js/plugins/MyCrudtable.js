/*
 *
 */


var MyDatatable = $.import("/v4/plugins/MyDatatable.js");

$.component(".MyCrudtable", [MyDatatable], {
    TOOLS: "tools",
    ROW_TOOLS: "row-tools",
    ROW_TOOLS_VIEW: "row-tools-view",
    ROW_TOOLS_EDIT: "row-tools-edit",
    SAVE: "save",
    CELL: "cell",
    ON_SUCCESS: "on-success",
    ON_ANULAR: "on-anular",
    ON_ERROR: "on-error",

    init: ($self) => {
        $self.$tools = $self.$.attr($self.TOOLS);
        $self.$cell = $self.$.attr($self.CELL);
        $self.$row_tools = $self.$.attr($self.ROW_TOOLS);
        $self.$row_tools_view = $self.$.attr($self.ROW_TOOLS_VIEW);
        $self.$row_tools_edit = $self.$.attr($self.ROW_TOOLS_EDIT);
        $self.$save = $self.$.attr($self.SAVE);

        $self.widgets();
        $self.events();
        $.super(MyDatatable, $self).init();
    },

    /**
     *
     * @param {type} $self
     * @return {undefined}
     */
    widgets: ($self) => {

        if ($self.$row_tools) {
            var tr = $self.$.find($self.TR);
            var str = $self.getTh();//'<th data="' + $self.$row_tools + '" priority="0"> </th>';
            tr.append(str);
        }
    },

    getTh: ($self) => {
        return '<th data="' + $self.$row_tools + '" priority="0"> </th>';
    },

    render: $.anottate($.Override, ($self, index, data, value, row, meta) =>
    {
        var $ths = $self.$.find($self.TH);


        var div = $('<div data="' + data + '" value="' + value +  '"></div>');
        if (meta)
        {

            if ($self.$row_tools && index === $ths.length - 1) {
                return $self.make_rowtools($($self.rowAt(meta.row)).attr("edit"));
            }
            var event = "$(this).parent().attr('data','"+ data +"').attr('value',$(this).val());";
            //console.log(meta, $self.col(meta.col).responsiveHidden());
            if ($($self.rowAt(meta.row)).attr("edit")) {
                var elm_inp = $($self.$cell).find(".edit [data="+data+"]");
                if (elm_inp.length) {
                    var html_inp = elm_inp.get(0).outerHTML;
                    for (var i in row) {
                        var d = "{{" + i + "}}";
                        html_inp = html_inp.replace( new RegExp(d,'g'), row[i]);
                    }
                    var elm_inpu = $(html_inp
                        .replace("{{selected}}",value)
                        .replace(/{{val}}/g, value)
                        .replace(/{{name}}/g, data)
                        .replace(/{{row}}/g, meta.row)
                        .replace(/{{e}}/g, event));


                    div.attr("value", elm_inpu.val());
                    var response =  div.append(elm_inpu).get(0).outerHTML;
                    return response;
                }
            }
        }
        div.html($.super(MyDatatable, $self).render(index, data, value));
        div.append("<input type='hidden' name='" + data + "' value='" + value + "' />")
        return div.get(0).outerHTML;
    }),

    /**
     *
     * @param {type} $self
     * @return {undefined}
     */
    events: ($self) => {

        $($self.$tools).on('click', '.add', function () {
            var $row = $self.add();
            $row.attr("edit", "edit");
            $row.attr("new", "new");
            $self.draw($row);
        });
        $self.$.on('click', '.del', function () {
            var $row = $self.rrow($(this).parents("tr"));
            var data = $.serializeObject($row);
            var $button = $(this);
            $self.delete({
                url: $self.$save,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
                success: function () {
                    $button.trigger($self.ON_ANULAR);
                    $row.removeAttr("edit");
                    $self.reloadTable();
                    $self.draw($row);
                },
                error: function () {
                    $button.trigger($self.ON_ERROR);
                }
            });
        });
        $self.$.on('click', '.edit', function () {
            var row = $self.rrow($(this).parents("tr"));
            row.attr("edit", "edit");
            $self.draw(row);
        });
        $self.$.on('click', '.cancel', function () {
            var row = $self.rrow($(this).parents("tr"));
            var nuevo = row.attr("new");
            if (!nuevo){
                row.removeAttr("edit");
                $self.draw(row);
            }else {
                $self.remove(row);
            }
        });
        $self.$.on('click', '.save', function () {
            var $button = $(this);
            var $row = $self.rrow($(this).parents("tr"));
            var flag=true;
            var test = $self.vrow($row);
            $self.vrow($row).find("[required]").each(function (index,ui) {
                if ($(ui).val() === "") {
                    flag = false;
                }
            });
            if (!flag){
                alert("Por Favor llene todos los campos!");
            }else {
                var editar = $row.attr("new");
                var data = $.serializeObject($row);
                $self.post({
                    url: $self.$save + "?editar=" + (!editar ? "true" : "false"),
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(data),
                    success: function () {
                        $self.$.trigger($self.ON_SUCCESS);
                        $row.removeAttr("edit");
                        $self.draw($row);
                        $self.reloadTable();
                    },
                    error: function (errors) {
                        $self.$.trigger($self.ON_ERROR);
                    }
                });
            }
        });
    },

    /**
     * @param {type} $self
     * @return {String}
     */
    make_rowtools: ($self, edit) => {
        if (edit) {
            return $($self.$row_tools_edit).html();
        } else {
            return $($self.$row_tools_view).html();
        }
    },


    /**
     * Metodo para convertir los datos de la tabla en un JsonArray
     * @return JsonArray
     */
    serializeTable: ($self) =>
    {
        var array = [];
        $self.$.find("tr").each(function (i, tr) {
            var body={};
            $(tr).find("td").each(function (j, td) {
                var data = $(td).find("div").attr("data");
                var value = $(td).find("div").attr("value");
                if (data)
                {
                    body[data] = value;
                }
            });
            if (Object.keys(body) != 0)
                array.push(body);
        });

        return array;
    },

    /**
     *
     */
    conf: $.anottate($.Override, ($self) => {
        var conf = $.super(MyDatatable, $self).conf();
        return conf.update({
            dom: "ptpb",
            paging: false,
            searching: false
        });
    })
});
