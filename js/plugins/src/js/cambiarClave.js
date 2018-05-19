$('#newClave').on('blur', function () {
    //TODO: Agregar comentarios
    var pass = $('#newClave').val();
    if (pass != '') {
        if (!tiene_numeros(pass)) {
            $('#cofirmClave').prop('disabled', true);
            $('#myForm').trigger("no-num");
        } else if (!tiene_letras(pass)) {
            $('#cofirmClave').prop('disabled', true);
            $('#myForm').trigger("no-letter");
        } else if (!longitud(pass)) {
            $('#cofirmClave').prop('disabled', true);
            $('#myForm').trigger("no-long");
        } else if (!isCharacter(pass)) {
            $('#cofirmClave').prop('disabled', true);
            $('#myForm').trigger("no-character");
        }
    }

    function tiene_numeros(pass) {
        if (pass.match(/^.*[0-9]+.*$/)){
            return true;
        }else {
            return false;
        }
    }

    function tiene_letras(pass) {
        if (pass.match(/^.*[a-zA-Z]+.*$/)) {
            return true;
        }
        else {
            return false;
        }
    }

    function longitud(pass) {
        var lon = pass;
        if (lon.length <= 3) {
            return false;
        } else {
            return true;
        }
    }

    function isCharacter(pass) {
        if (pass.match(/^.*\W+.*$/)) {
            return true;
        } else {
            return false;
        }
    }


});
