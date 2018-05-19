var MyEdittableFormSon = $.import("/v4/plugins/MyEdittableFormSon.js");
$.component(".MyReembolsoTable",[MyEdittableFormSon],{
    PARENT_DATA:"parent-data",
    GET_ROW_DATA:"get-row-data",

    init: ($self) => {
        $.super(MyEdittableFormSon,$self).init();
    },

    evalOnRow: ($self,row) => {
        if (row && $self.SWC == 0) {
            var row_data = $self.$.attr($self.GET_ROW_DATA);
            if (row_data && row[row_data]) {
                $self.SWC = 1;
                var val = row[row_data];
                $self.$.attr("validate",val);
                $self.$.trigger("on-validate");
            }
        }
    },

    parentEvents: ($self) => {
        $($self.$tools).on('click', '.add', function () {
            for (var i=0;i<5; i++) {
                $self.add();
            }
        });
    },

    valid: ($self) => {
        var validate = false;
        var sucursal = $("#sucursal").val();
        var fuente = $("#fuente").val();
        var docu = $("#doc").val();
        if (sucursal != 0 && fuente !=0 && docu) {
            MyLoading.init();
            $.ajax({
                url:"/contabilidad/reembolso-caja-menor/getReembolso?"+$.serialize($("#head")),
                type:"GET",
                async:false,
                success: function (response) {
                    if ($.isEmptyObject(response)){
                        MyLoading.removeLoad();
                        $self.$.trigger("on-validate-error");
                    }
                    else {
                        validate = true;
                    }
                },
                error:function (jqXHR) {
                    var error_text;
                    if ("responseJSON" in jqXHR) {
                        if ("message" in jqXHR.responseJSON) {
                            if (jqXHR.responseJSON.message.length > 0 || jqXHR.responseJSON.message) {
                                error_text = jqXHR.responseJSON.message;
                                $self.$.attr("data-error", JSON.stringify(jqXHR.responseJSON.message));
                            }
                        }
                    }
                    else if("responseText" in jqXHR) {
                        $self.$.attr("text-error", jqXHR.responseText);
                        error_text = jqXHR.responseText;
                    }
                    $self.$.trigger("on-error-component", error_text);
                    MyLoading.removeLoad();
                }
            })
        }
        return validate;
    }
});