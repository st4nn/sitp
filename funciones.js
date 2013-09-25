 $(document).on("ready", arranque);

function arranque()
{
	geolocalizar();
}
function geolocalizar()
{
	navigator.geolocation.getCurrentPosition(mostrarMapa, errorMapa);
	$("#status").text("Blackhawks en vuelo...");
}
function mostrarMapa(datos)
{
	var lat = datos.coords.latitude;
	var lon = datos.coords.longitude;
	
	$("#status").text("Ajá! Estás en " + lat + "," + lon);
	
	var coordenada = new google.maps.LatLng(lat,lon);
	var opcionesMapa  = {
		center: coordenada,
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var mapa = new google.maps.Map($("#mapa_canvas")[0],opcionesMapa);

	
	var opcionesChinche = {
		position: coordenada,
		map: mapa,
		title: "Coordenadas de bombardeo"
	};
	var chinche = new google.maps.Marker(opcionesChinche);

	var geocoder = new google.maps.Geocoder();
	
	geocoder.geocode({'latLng': coordenada}, 
		function(results, status) 
		{
	      if (status == google.maps.GeocoderStatus.OK) 
	      {
	        if (results[0]) 
	        {
	          //$("#Direccion").text(results[0].address_components[1].long_name);
	          var Direccion = results[0].formatted_address.split(",");
	          $("#Direccion").text(Direccion[0]);
	        }
	      } 
	      else 
	      {
	        $("#Direccion").text("No se ubicó la dirección por " + status);
	      }
	    });
	
	$("#mapa_canvas").css("height", "20em")
					 .css("margin", "0 auto")
					 .css("width", "100%");
}
function errorMapa()
{
	$("#status").text("Tarde o temprano... ¬¬");
}
