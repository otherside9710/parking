Dropzone.autoDiscover = false;
$("#drop").dropzone({
    addRemoveLinks: true,
    init: function () {
        this.on("complete", function (file) {
            var response = file.xhr.response;
            var result = JSON.parse(response);
            var value = result['acadCodigoarchivo'];
            $('<input type=\'hidden\' attr-name=\'adjuntos\' value="' + value + '"/>').appendTo('body');
        });
    },
    removedfile: function (file) {
        var response = file.xhr.response;
        var result = JSON.parse(response);
        var id = result['acadCodigoarchivo'];
        var value = {"id": id};
        $.ajax({
            type: 'GET',
            url: '/activosFijos/mantenimiento-activos-fijos/inactive',
            data: value,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $('#myForm').trigger("on-inactive");
            },
            error: function (data) {
                $('#myForm').trigger("on-error", data);
            }
        });
        var _ref;
        return (_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0;
    }
});

$('body').on('click', '#delete', function () {
    var id = $(this).attr("value");
    var value = {"id": id};
    $.ajax({
        type: 'GET',
        url: '/activosFijos/mantenimiento-activos-fijos/inactive',
        data: value,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#myForm').trigger("on-inactive");
        },
        error: function (data) {
            $('#myForm').trigger("on-error");
        }
    });
});

$('#formLogo').on('send-logo', function () {
    var $url = "/activosFijos/mantenimiento-activos-fijos/uploadLogo";
    var objFormData = new FormData();
    var objFile = $(this)[0][0]["files"][0];

    objFormData.append('actfLogo', objFile);
    $.ajax({
        url: $url,
        type: 'POST',
        contentType: false,
        data: objFormData,
        processData: false,
        success: function (data) {
            var value = data["location"];
            $('<input type=\'hidden\' id=\'nomFoto\' name=\'actfNombrefoto\' value="' + value + '"/>').appendTo('#myForm');
            $('#img').attr('src', "/activosFijos/mantenimiento-activos-fijos/?image=" + value);
        },
        error: function (error) {
            alert("error!");
        }
    });

});

