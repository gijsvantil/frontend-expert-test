// source = JSONobject with searchresults
const source = 'https://www.deskbookers.com/nl-nl/sajax.json?q=Amsterdam&type=-&people=any&favorite=0&pid=&sw=52.293753%2C4.634942&ne=52.455562%2C5.162286&ids=17201%2C19640%2C13692%2C13691%2C12136%2C17938%2C15292%2C14886%2C14885%2C14884%2C14883%2C15730%2C15353%2C15351%2C15330%2C15080%2C17290%2C15454%2C15451%2C15379'
// Empty array for searchresults
let searchresults = []

$(document).ready( function() {
	console.log ("DOM is ready")
	let locations = [] // Container for data
	// Google Maps set up
	const mapCanvas = document.getElementById("map");
	let mapOptions = {
		center: new google.maps.LatLng(52.37, 4.89), zoom: 10
	}
	let map = new google.maps.Map(mapCanvas, mapOptions);
	// Show searchresult on button click
	$('button').click( function() {
		$('button').hide({
		})
	// // Map thing
	// $('body').on( 'click', '.showonmap', function(){
	// 	console.log($(this))
	// 	console.log($(this).parent().attr('id'))
	// })
	// AJAX call, loads JSON in empty variable
	$.get(source, function(data) {
		searchresults = data
		// loop through searchresults variable
		for (i = 0; i < searchresults.rows.length; i++){
			locations.push({
				id: searchresults.rows[i].id,
				img: searchresults.rows[i].image_urls[0],
				locationName: searchresults.rows[i].location_name,
				city: searchresults.rows[i].location_city,
				deskname: searchresults.rows[i].name,
				maximumCapacity: searchresults.rows[i].maximum_capacity,
				latitude: searchresults.rows[i].coordinate[0],
				longitude: searchresults.rows[i].coordinate[1]
			})
			let img ="<img src=\"" + locations[i].img + "\" width=180, height=120 ></img>"
			let deskname = "<p><b>Deskname: </b>" + locations[i].deskname + "</p>"
			let locationName = "<h3><b>" + locations[i].locationName + "</b></h3>"
			let city = "<p><b>City: </b>" + locations[i].city  + "</p>"
			let maximumCapacity = "<p><b>Maximum capacity: </b>" + locations[i].maximumCapacity + "</p>"
			let map = "<a href='#' class='showonmap'><p>show on map</p></a>"
			// Append searchresult to new div
			$('.searchresult').append(
				"<div id=\"" + i +"\" class=\"jumbotron\">" + 
				locationName + 
				map + 
				img + 
				deskname + 
				city + 
				maximumCapacity + 
				"<input class=\"latitude\", type=\"hidden\", value=\"" + locations[i].latitude + "\">" +
				"<input class =\"longitude\", type=\"hidden\", value=\"" + locations[i].longitude + "\">" +
				"</div>" 
				)
		};
		$('.showonmap').click(function(){
			// empty coordinates object
			let myLatLng = {}
			// selecting coordinates from hidden input
			let lat = $(this).nextAll(".latitude").val()
			let lng = $(this).nextAll(".longitude").val()
			// parsing strings into ints 
			myLatLng.lat = parseFloat(lat)
			myLatLng.lng = parseFloat(lng)
			// place marker on map
			let marker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				title: 'Hello World!'
			});
		})

		
	});

});


});




