// source = JSONobject with searchresults
const source = 'https://www.deskbookers.com/nl-nl/sajax.json?q=Amsterdam&type=-&people=any&favorite=0&pid=&sw=52.293753%2C4.634942&ne=52.455562%2C5.162286&ids=17201%2C19640%2C13692%2C13691%2C12136%2C17938%2C15292%2C14886%2C14885%2C14884%2C14883%2C15730%2C15353%2C15351%2C15330%2C15080%2C17290%2C15454%2C15451%2C15379'
// Empty array for searchresults
let searchresults = []
// Empty object for location coordinates
let coordinates = {
	latitude: "",
	longitude: ""
}

$(document).ready( () => {
	console.log ("DOM is ready")
	// Show searchresult on button click
		$('button').click(() => {
			$('button').hide({
			})
			$.get(source, (data) => {
				searchresults = data
				// loop through searchresults
				for (i = 0; i < searchresults.rows.length; i++){
					let coordinates = [searchresults.rows[i].coordinate[0],searchresults.rows[i].coordinate[1]]
					let img ="<img src=\"" + searchresults.rows[i].image_urls[0] + "\" width=180, height=120 ><p>"
					let deskname = "<p><b>Deskname: </b>" + searchresults.rows[i].name+ "</p>"
					let locationName = "<h3><b>" + searchresults.rows[i].location_name+ "</b></h3>"
					let city = "<p><b>City: </b>" + searchresults.rows[i].location_city+ "</p>"
					let maximumCapacity = "<p><b>Maximum capacity: </b>" + searchresults.rows[i].maximum_capacity + "</p>"
					let map = "<a (href='#')><p> show on map </p></a>"
					// Append searchresult to new div
					$('.searchresult').append("<div class=\"jumbotron\">" + locationName + map + img + deskname + city + maximumCapacity + "</div>")
				};
			});
		});
	// Google Maps set up
	const mapCanvas = document.getElementById("map");
	let mapOptions = {
	    center: new google.maps.LatLng(52.37, 4.89), zoom: 13
	}
	let map = new google.maps.Map(mapCanvas, mapOptions);
});
