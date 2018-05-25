// Dashboard 1 Morris-chart
$( function () {
	"use strict";


	// Extra chart
	Morris.Area( {
		element: 'extra-area-chart',
		data: [ {
				period: '2012',
				Carros: 0,
				Motos: 0,
				Buses: 90,
				Camiones: 0,
				Bicicletas: 0
        }, {
				period: '2013',
				Carros: 10,
				Motos: 60,
				Buses: 40,
				Camiones: 80,
				Bicicletas: 120
        }, {
				period: '2014',
				Carros: 120,
				Motos: 10,
				Buses: 90,
				Camiones: 30,
				Bicicletas: 50
        }, {
				period: '2015',
				Carros: 0,
				Motos: 0,
				Buses: 120,
				Camiones: 0,
				Bicicletas: 0
        }, {
				period: '2016',
				Carros: 0,
				Motos: 0,
				Buses: 0,
				Camiones: 150,
				Bicicletas: 0
        }, {
				period: '2017',
				Carros: 160,
				Motos: 75,
				Buses: 30,
				Camiones: 60,
				Bicicletas: 90
        }, {
				period: '2018',
				Carros: 10,
				Motos: 120,
				Buses: 40,
				Camiones: 60,
				Bicicletas: 30
        }


        ],
		lineColors: [ '#26DAD2', '#fc6180', '#62d1f3', '#ffb64d', '#4680ff' ],
		xkey: 'period',
		ykeys: [ 'Carros', 'Motos', 'Buses', 'Camiones', 'Bicicletas' ],
		labels: [ 'Carros', 'Motos', 'Buses', 'Camiones', 'Bicicletas' ],
		pointSize: 0,
		lineWidth: 0,
		resize: true,
		fillOpacity: 0.8,
		behaveLikeLine: true,
		gridLineColor: '#e0e0e0',
		hideHover: 'auto'

	} );



} );
