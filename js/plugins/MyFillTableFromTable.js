/**
 * dev: Brayan parra
 * script para llenar dataTable jQuery a partir de otro.
 */
var MyEdittable = $.import("/v4/plugins/MyEdittable.js");
$.component("#table-distribucion",[MyEdittable],{
    init: ($self) => {
        $self.$tableFactura = $("#table-facturas");
        $self.$button = $("#a_distribucion");
        $self.$cuentas = $("#n_cuentas");
        $self.$sucursal = $("#sucursal");
        $self.$nit = $("#nit");
        $self.$ctaPuc = $("#cta_puc");
        $self.$total_debito = $("#total_debito");
        $self.$total_credito = $("#total_credito");
        $self.$medio_pago = $("#medio_pago");
        $.super(MyEdittable, $self).init();
        $self.initialize();
    },

    events: ($self) => {
        $self.$button.on("click", function () {
            $self.loadChange();
        });

        $self.$nit.on("complete", function () {
            $self.$table.clear();
            $self.$total_debito.val("0");
            $self.$total_credito.val("0");
            $self.initialize();
        });

        $self.$ctaPuc.on("change", function () {
            var data = $self.getData();
            if ($self.validateTable(data)) {
                $self.loadChange();
            }
        });

    },

    loadChange: ($self) => {
        let data = $self.getData();
        if (data && !$.isEmptyObject(data.facturas)) {
            $self.fillTable(data);
            $self.resize();
        }
        else {
            $self.$.trigger("on-warning-data");
        }
    },

    initialize: ($self) => {
        $.super(MyEdittable, $self).addRow();
    },

    getData: ($self) => {
        let facturas = $.serializeTable($self.$tableFactura);
        //obtener cuenta puc del banco
        let cache = $self.$cuentas.find("option:selected").attr("cache");
        let cache_puc = $self.$ctaPuc.find("option:selected").attr("cache");
        if (!cache || !facturas || !cache_puc) {
            return false;
        }
        cache = $.parseJSON(cache);
        cache_puc = $.parseJSON(cache_puc);
        return {
            cbod_puc: {
                puc_nombre: cache_puc["puc_nombre"],
                puc_codigo: $self.$ctaPuc.val()
            },
            sucursal: $self.$sucursal.val() != 0 ? $self.$sucursal.val() : null,
            cta_puc : {
                cta: cache["ctaPuc"],
                nombre: cache["ctaPucNombre"]
            },
            facturas : facturas
        };
    },

    fillTable: ($self, data) => {
        var dic = data.facturas;
        var flag =false;
        var saldo_credito = 0;
        var saldo;
        $self.$total_debito.val("0");
        $self.$total_credito.val("0");
        if (!$.isEmptyObject(dic)) {
            $self.$table.clear().draw();
            for (var i in dic) {
                saldo = new Number(dic[i]["abono"]);
                if ( saldo> 0) {
                    var d = {
                        "Cod": data.cbod_puc.puc_codigo,
                        "Descripcion": data.cbod_puc.puc_nombre,
                        "Deb": dic[i]["abono"],
                        "Cred": "",
                        "Razon": "PAGO DE FACTURA " + dic[i]["mcxpDocumento"],
                        "Tercero": $self.$nit.val(),
                        "Doc": dic[i]["mcxpDocumento"],
                        "conp": dic[i]["mcxpConcepto"],
                        "Cc": $self.$sucursal.val(),
                        "Subc": "",
                        "Dep": ""
                    };
                    $self.$table.row.add(d).draw(false);
                    flag = true;
                    //valor credit en la distribucion contable
                    saldo_credito+=saldo;
                }
            }
        }

        if (!flag) {
            $self.$.trigger("on-warning");
            $self.initialize();
        }
        else {
            var d = {
                "Cod": data.cta_puc.cta,
                "Descripcion": data.cta_puc.nombre,
                "Deb": "",
                "Cred": saldo_credito,
                "Razon": data.cta_puc.nombre,
                "Tercero": $self.$nit.val(),
                "Doc": "",
                "conp": "",
                "Cc": $self.$sucursal.val(),
                "Subc": "",
                "Dep": ""
            };
            $self.$table.row.add(d).draw(false);
            $self.$total_debito.val(saldo_credito);
            $self.$total_credito.val(saldo_credito);
            $self.$total_credito.trigger("change");
            $self.$.trigger("table-complete");
        }
    },

    resize: ($self) =>{
        $self.$table.columns.adjust().draw();
    },

    validateTable: ($self, data) => {
        var flag =false;
        var saldo;
        var dic = data.facturas;
        if (data) {
            for (var i in dic) {
                saldo = new Number(dic[i]["abono"]);
                if ( saldo> 0) {
                    flag = true;
                    i = dic.length +1;
                }
            }
        }
        return flag;
    }

});
