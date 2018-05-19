var MyDatatable = $.import("/v4/plugins/MyDatatable.js");

$.component(".MyEdittable", [MyDatatable], {
    TOOLS: "tools",
    ROW_TOOLS: "row-tools",
    ROW_TOOLS_DATA: "row-tools-data",
    CELL: "cell",
    ROWS: "rows",
    DELETE_URL: "delete",
    INITIALIZE: "initialize",
    ROW_SAVE: "row-save",
    UPDATE: "update",
    ON_SUCCESS: "on-success",
    ON_ANULAR: "on-anular",
    ON_ERROR: "on-error",
    NO_CONFIRM: "no-confirm",
    READ_ONLY: "read-only",
    PAGING: "paging",
    //Atributo para añadir boton (añadir fila) en th de row-tools
    ADD_ROWTOOLS:"add-row-tools",
    NO_SERVER_SIDE: "no-server-side",
    SWC:0,
    EVAL_ON_ROW:"eval",

    init: ($self) => {
        $self.$tools = $self.$.attr($self.TOOLS);
        $self.$cell = $self.$.attr($self.CELL);
        $self.$row_tools = $self.$.attr($self.ROW_TOOLS);
        $self.$row_tools_data = $self.$.attr($self.ROW_TOOLS_DATA);
        $self.$initialize = $self.$.attr($self.INITIALIZE);
        $self.$row_save = $self.$.attr($self.ROW_SAVE);
        $self.$update = $self.$.attr($self.UPDATE);
        $self.$no_confirm = $self.$.attr($self.NO_CONFIRM);
        $self.$paging = $self.$.attr($self.PAGING);
        $self.$no_server_side = $self.$.attr($self.NO_SERVER_SIDE);
        $self.$eval_on_row = $self.$.attr($self.EVAL_ON_ROW);

        $self.$read_only = $self.$.attr($self.READ_ONLY);
        $self.widgets();
        $self.events();
        $.super(MyDatatable, $self).init();
        $self.loadRows();
    },

    loadRows: ($self) => {
        if ($self.$initialize) {
            $self.addRow();
        }
    },

    addRow: ($self) => {
        var row = $self.$.attr($self.ROWS);
        var count = parseInt(row);
        //console.log("cc", row);
        if (!count) {
            count = 1;
        }
        for (var i = 0; i < count; i++) {
            var $row = $self.add();
            if ($row) {
                $row.attr("new", "new");
            }
        }

    },

    /**
     *
     * @param {type} $self
     * @return {undefined}
     */
    widgets: ($self) => {
        if ($self.$row_tools) {
            var $tr = $self.$.find("thead " + $self.TR);
            $tr.append('<th width="5%" data="' + $self.$row_tools_data + '"></th>');
            $tr = $self.$.find("tfoot " + $self.TR);
            if ($tr) {
                $tr.append('<td>' +
                    '<input type="text" readonly=""' +
                    'class="form-control input-sm" />' +
                    '</td>');
            }
        }
    },

    render: $.anottate($.Override, ($self, index, data, value, row, meta) => {
        var $ths = $self.$.find($self.TH);
        if ($ths.length > 0) {

            var row_index = meta.row ? meta.row : 0;
            if ($self.$row_tools && index === $ths.length - 1) {
                var html_inp =  $self.make_rowtools()
                    .replace(/{{val}}/g, value ? value :"")
                    .replace(/{{row}}/g, row_index)
                    .replace(/{{row1}}/g, row_index + 1)
                    .replace(/{{json}}/g, JSON.stringify(row).replace(/"/g, '&quot;'))
                ;

                for (var i in row) {
                    html_inp = html_inp.replace("{{" + i + "}}", row[i]);
                }
                return html_inp;
            }

            var elm_inp = $($self.$cell).find(".edit [data=" + data + "]");
            elm_inp.css({
                width: '100%'
            });
            if (elm_inp.length > 0) {
                var html_inp  = elm_inp.get(0).outerHTML;

                var row_index = meta.row ? meta.row : 0;

                if (html_inp.includes("select")) {
                    if (value === "")
                        value = "0";
                }

                html_inp = html_inp
                    .replace("{{primary}}", "disabled='disabled'")
                    .replace(/{{val}}/g, value ? value : "")
                    .replace("{{name}}", data)
                    .replace(/{{row}}/g, row_index)
                    .replace("{{selected}}", value && value != 0 ? value : "")
                ;

                for (var i in row) {
                    html_inp = html_inp.replace("{{" + i + "}}", row[i]);
                }
                $self.evalOnRow(row);
                return '<div>' + html_inp + '</div>';
            }
        }
        return value ? value : "";
    }),

    evalOnRow: ($self,row) => {

    },

    events: ($self) => {

        $($self.$tools).on('click', '.add', function () {
            $self.addRow();
            return false;
        });

        $self.$.on('click', '.load', function () {
            var $tr = $(this).parents("tr");
            var data = $.serializeObject($tr);
            $self.$.attr("cache", JSON.stringify(data));
            $self.$.trigger("table-load");
            return false;
        });

        $self.$.on('click', '.save', function () {
            var valid = $self.validate($(this));
            if (valid) {
                var $tr = $(this).parents("tr");

                if (!$tr.attr("new")) {
                    if ($self.$update) {
                        var data = $.serializeObject($tr);
                        data = JSON.stringify(data);
                        var conf = $self.ajaxConf($self.$update, data, $tr, false);
                        $self.post(conf);
                    }
                }
                else {
                    if ($self.$row_save) {
                        var data = $.serializeObject($tr);
                        data = JSON.stringify(data);
                        var conf = $self.ajaxConf($self.$row_save, data, $tr, true);
                        $self.post(conf);
                    }
                }
            }
            else {
                $self.$.trigger("data-error-table");
            }
            return false;
        });

        $self.$.on('click', '.cancel', function () {
            var $tr = $(this).parents("tr");
            var c = true;
            if (!$self.$no_confirm) {
                c = confirm("¿Desea eliminar el registro.?");
            }
            if (!$tr.attr("new")) {
                if (c) {
                    var url_delete = $self.$.attr($self.DELETE_URL);
                    var data = $.serializeObject($tr);
                    var conf = new Conf();
                    conf = conf.update({
                        'url': url_delete,
                        'type': 'POST',
                        'data': JSON.stringify(data),
                        'contentType': "application/json; charset=utf-8",
                        'dataType': "json",

                        'success': function (response) {
                            if (typeof response === "object") {
                                $self.remove($tr);
                                $self.$.trigger($self.ON_ANULAR);
                                if ($self.$.attr($self.AJAX)) {
                                    $self.$table.ajax.reload();
                                }
                            }
                            else {
                                if (response.contains("html")) {
                                    $self.$.trigger($self.ON_ERROR);
                                }
                                else {
                                    response = $.parseJSON(response);
                                    $self.$.trigger($self.ON_ERROR);
                                }
                            }
                        },

                        'error': function (jqXHR) {
                            if (jqXHR.responseJSON) {
                                $self.$.trigger($self.ON_ERROR, jqXHR.responseJSON.error);
                            }
                            else {
                                $self.$.trigger($self.ON_ERROR, jqXHR.responseText);
                            }
                        }
                    });
                    $self.load(conf);
                }

            }
            else if (c) {
                $self.remove($tr);
            }
            return false;
        });
    },

    validate: ($self, $button) => {
        return true;
    },

    /**
     *
     * @param {type} $self
     * @return {String}
     */
    make_rowtools: ($self) => {
        return $($self.$row_tools).html();
    },

    ajaxConf: ($self, url, data, $tr) => {
        if (url) {
            return {
                url: url,
                data: data,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",

                success: function (response) {
                    if (typeof response === "object") {
                        $self.$.trigger($self.ON_SUCCESS);
                        if ($tr) {
                            $tr.removeAttr("new");
                        }
                        if ($self.$.attr($self.AJAX)) {
                            console.log(response);
                            $self.ajaxReload();
                        }
                    }
                    else {
                        if (response.includes("html")) {
                            $self.$.trigger($self.ON_ERROR);
                        }
                        else {
                            response = $.parseJSON(response);
                            $self.$.trigger($self.ON_ERROR, response["error"]);
                        }
                    }
                },
                error: function (jqXHR) {
                    if (jqXHR.responseJSON) {
                        $self.$.trigger($self.ON_ERROR, jqXHR.responseJSON.error);
                    }
                    else if (jqXHR.responseText && jqXHR.responseText !== "") {
                        $self.$.trigger($self.ON_ERROR, jqXHR.responseText);
                    }
                    else {
                        alert("perdida en la conexion..!");
                    }
                }
            }
        }
    },

    ajaxReload: ($self) => {
        $self.$table.ajax.reload();
    },

    conf: $.anottate($.Override, ($self) => {
        var conf = $.super(MyDatatable, $self).conf();
        return conf.update({
            info: false,
            searching: false,
            dom: "ptpb",
            paging: $self.$paging ?  true : false,
            pageLength: 20,
        });
    })
});
