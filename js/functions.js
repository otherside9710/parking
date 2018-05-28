$('#logout').on('click', function(params) {
    swal({
        title: "¿En realidad quieres salir?",
        text: "Haz click en Ok para salir del sistema.",
        icon: "warning",
        buttons: {
          cancel: "Cancelar",
          confirm: {
              text: "Ok",
              value: "Ok"
          }
        }
        }).then(function (value) {
            switch (value) {
                case "Ok": {
                    window.location.href = "index.html";
                    break;
                }
            }
        });
});