function set_data($check) {
    var $tr = $($check).parents("tr");
    var saldo = $tr.find("input[data=saldoactual]").val();
    var $ipt = $tr.find("input[data=abono]");
    //set data
    if ($check.prop("checked")) {
        $ipt.val(saldo);
    }
    else {
        $ipt.val(0);
    }
    return $ipt;
}

function increase() {
    var val = $("#ncheque").val();
    if (val) {
        $("#ncheque").val(parseInt(val) + 1);
    }
}

$("#table-facturas").on("click","input[type=checkbox]",function(){
    var $ipt = set_data($(this));
    $ipt.trigger("change");
});

$("#table-facturas").on("blur","input[data=abono]",function() {
    var $ipt = $(this);
    var $parent = $($ipt.attr("parent"));
    var max_value = $parent.val();
    var val = $ipt.val();
    if ((val > max_value) || val < 0) {
        $ipt.val(max_value);
        $ipt.parents("table").trigger("on-value-error");
    }
});

$("#chequeras").on("change", function () {
    $(this).trigger("complete");
    increase();
});

$("#movimiento").on("ok", function () {
    increase();
    var $table = $("#table-distribucion").DataTable();
    $table.clear().draw();
    $("#a_factura").click();
    $("#nit").trigger("complete");
});

$("#invalidate_data").on("ok", function () {
    var $table = $("#table-distribucion").DataTable();
    $table.columns.adjust().draw();
});

$("#noFacturas").on("ok", function () {
    var $table = $("#table-distribucion").DataTable();
    $table.columns.adjust().draw();
});

$("#table-distribucion").on("table-complete", function () {
    var $table = $(this).DataTable();
    $table.columns.adjust().draw();
});

$("#ajaxForm").on("on-success", function () {
    MyLoading.removeLoad();
});

$("#ajaxForm").on("on-error", function () {
    MyLoading.removeLoad();
});