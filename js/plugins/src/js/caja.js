$(document).ready(function () {
    $('#fuente').val("AJR");
    $('#doc').trigger("on-load-form");
});

$(document).ready(function () {
    $('#apreCodigo').focus();
});

$('#doc').on('on-send', function () {
    var sucursal = $('#ccosto').val();
    var fuente = $('#fuente').val();
    var $url = "/contabilidad/movimiento-contable-correccion/buscarConsecutivo";
    var $url2 = $url + "?sucursal=" + sucursal + "&fuente=" + fuente + "";
    $.ajax({
        type: 'GET',
        url: $url2,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var $doc = data['concDocumento'];
            $('#ultimoDoc').val($doc);
        },
        error: function (data) {
            $('#myForm').trigger("on-error");
        }
    });

    var sucursal = $('#ccosto').val();
    var fuente = $('#fuente').val();
    var $url = "/informes/apertura-caja-menor/getMaxAndMinDoc";
    var $url2 = $url + "?apreBodega=" + sucursal + "&apreFuentecontable=" + fuente + "";
    $.ajax({
        type: 'GET',
        url: $url2,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var $docMin = data[0]['docMin'];
            var $docMax = data[0]['docMax'];
            $('#docMin').val($docMin);
            $('#docMax').val($docMax);
            $('#myForm').trigger("on-doc-success");
        },
        error: function (data) {
            $('#myForm').trigger("on-error");
        }
    });
});

$('#myForm').on('on-error-response', function (event, data) {
    if (data.status) {
        if (data.status === "208") {
            $('#myForm').trigger('on-already');
        }
    }
});


$('#myForm').on('ok', function () {
    location.reload();
});


$('#codCaja').on('complete', function () {
    var codCaja = $('#codCaja').val();
    if (!codCaja.startsWith("110505")) {
        $('#myForm').trigger('cc-puc');
    }
});

$('#codCxp').on('complete', function () {
    var codCpx = $('#codCxp').val();
    if (!codCpx.startsWith("2205")) {
        $('#myForm').trigger('cxp-puc');
    }
});

$('#myForm').on('on-doc-success', function () {
    if (!$('#docMin').val()) {
        $('#myForm').trigger("on-docMin");
    }
    if (!$('#docMax').val()) {
        $('#myForm').trigger("on-docMax");
    }
});


