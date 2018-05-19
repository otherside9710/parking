//TODO UTILIZAR COMPONENTES PARA REMPLAZAR ESTE JS. JSP 27 MAR 2018

//funcion para cargar a las fuentes el concepto DP
$('#myForm').on('complete-load', function () {
    $('#concepto').val("DP");
    //$('#ccosto').val("001");
});


//funcion para cargar el cdiario a partir de la bodega la fuente y el documento, dandole
//click a una lupa oculta, este recurso se utilizo de la pantalla de reimprimir comprobante
//y se modifico para usarlo en esta pantalla.
$('#myForm').on('input-complete', function () {
    $('#search').click();
});

//Funcion para cargar el text area concatenandole la fecha incial y la final junto con un texto
$('#myForm').on('change', function () {
    var $from = $('#from').val();
    var $to = $('#to').val();
    var $result = "DEPRECIACION DESDE " +$from +" HASTA " +$to;
    $('#detalle').val($result);
});


//funcion para cargar el año y el mes de la fecha final a la fecha inicial
$('#myForm').on('change', function () {
    var $to = $('#to').val();
    var $split = $to.split("/");
    var $año = $split[0];
    var $mes = $split[1];
    var $result = $año + "/" + $mes + "/" + "01";
    $('#from').val($result);
    $('#from').prop("readonly", true);
});
