const source = 'https://www.deskbookers.com/nl-nl/sajax.json?q=Amsterdam&type=-&people=any&favorite=0&pid=&sw=52.293753%2C4.634942&ne=52.455562%2C5.162286&ids=17201%2C19640%2C13692%2C13691%2C12136%2C17938%2C15292%2C14886%2C14885%2C14884%2C14883%2C15730%2C15353%2C15351%2C15330%2C15080%2C17290%2C15454%2C15451%2C15379'
let searchresults = []
$(document).ready( () => {
	console.log ("DOM is ready")
	const mapCanvas = document.getElementById("map");
	let mapOptions = {
	    center: new google.maps.LatLng(52.37, 4.89), zoom: 13
	}
	let map = new google.maps.Map(mapCanvas, mapOptions);

		$('button').click(() => {
			$('.searchresult').empty({

			})
			$.get(source, (data) => {
				searchresults = data
				console.log("Total:" + searchresults.rows.length)
				for (i = 0; i < searchresults.rows.length; i++){
					console.log(searchresults.rows[i].id)
					$('.searchresult').append("<div class=\"jumbotron\"><img src=\"" + searchresults.rows[i].image_urls + "\" width=180, height=120 ><p><b>deskname: </b>" + searchresults.rows[i].name+ "</p><p><b> location name:</b>" + searchresults.rows[i].location_name+ "</p></div>")
				};
			});
		});
	});
