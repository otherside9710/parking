$('#logout').on('click', function(params) {
    swal({
        title: "¿En realidad quieres salir?",
        text: "Haz click en Ok para salir del sistema.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (!willDelete) {
          swal("Gracias por quedarte!");
        }
      }); 
});