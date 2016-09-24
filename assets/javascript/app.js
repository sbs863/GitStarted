$("#menu-close").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});
// Opens the sidebar menu
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});



$(function() {

    $('a[href*="#"]:not([href="#"])').click(function() {

        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function() {

                });
                return false;
            }
        }

    });
    $(function() {
        $(window).scroll(function() {


            $('.fadeInBlock').each(function(i) {

                var bottom_of_object = $(this).position().top + $(this).outerHeight();
                var bottom_of_window = $(window).scrollTop() + $(window).height();

                /* Adjust the "200" to either have a delay or that the content starts fading a bit before you reach it  */
                bottom_of_window = bottom_of_window + 600;

                if (bottom_of_window > bottom_of_object) {

                    $(this).animate({ 'opacity': '1' }, 2250);

                }
            });

        });
    });
});

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">


var morningArray = ['shopping', 'relax', 'outdoors', 'breakfast'];
var morningArrayCap = ['Shopping', 'Relax', 'Outdoors', 'Breakfast'];
var afternoonArray = ['art', 'adventure', 'restaurant', 'movie'];
var afternoonArrayCap = ['Art', 'Adventure', 'Restaurant', 'Movie'];
var eveningArray = ['night'+'club', 'bar','movie', 'restaurant'];
var eveningArrayCap = ['Night'+' Club', 'Bar', 'Movie', 'Restaurant'];

/*arrays for functions to use*/
var map;
var map2;
var infowindow;
var startPoint = { lat: '', lng: '' };
var endPoint = "";
var waypts = [];



/*type arrays*/
var shoppingArray = [];
var relaxArray = [];
var outdoorsArray = [];
var breakfastArray = [];

/*afternoon type arrays*/
var artArray = [];
var adventureArray = [];
var restaurantArray = [];
var movieArray = [];


/*nigth arrays*/
var nightClubArray = [];
var barArray = [];


/*mixed array of type arrays*/

var mixedArray = [];

/*button counters*/
var buttonCounter = 0;
var callbackCounter = 0;

/*geo-locate api - might change later*/
var queryURL = "http://ip-api.com/json";


function geoLocate() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;

    }

    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

    $.ajax({
            url: queryURL,
            method: 'GET',
            async: false,
        })
        .done(function(response) {
            startPoint.lat = parseFloat(response.lat);
            startPoint.lng = parseFloat(response.lon);
        });
}

/*places search */
function initmap() {
    $('#time1').on('click', function() {
        /*change to geolocate*/
        var pyrmont = startPoint;
        /*possibly change to node instead of map*/
        map = new google.maps.Map(document.getElementById('map'), {
            center: pyrmont,
            zoom: 15
        });
        infowindow = new google.maps.InfoWindow();  

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['shopping_mall']
        }, callback);
        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['shoe_store']
        }, callback);
        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['clothing_store']
        }, callback);

        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['hair_care'],
        }, callback);
        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['spa'],
        }, callback);

        service.nearbySearch({
            location: pyrmont,
            radius: 50000,
            type: ['park'],
        }, callback);
        service.nearbySearch({
            location: pyrmont,
            radius: 50000,
            type: ['zoo'],
        }, callback);

        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['cafe']
        }, callback);
        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['bakery'],
        }, callback);

    });

    /*new code*/
    $('#time3').on('click', function() {
        /*change to geolocate*/
        var pyrmont = startPoint;
        /*possibly change to node instead of map*/
        map = new google.maps.Map(document.getElementById('map'), {
            center: pyrmont,
            zoom: 15
        });
        infowindow = new google.maps.InfoWindow();


        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['night_club']
        }, callback);
        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['bar']
        }, callback);
        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['movie_theater']
        }, callback);

        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['restaurant']
        }, callback);

    });


    /*afternoon activity creater*/
    $('#time2').on('click', function() {
        /*change to geolocate*/
        var pyrmont = startPoint;
        /*possibly change to node instead of map*/
        map = new google.maps.Map(document.getElementById('map'), {
            center: pyrmont,
            zoom: 15
        });
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['shopping_mall']
        }, callback);
        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['shoe_store']
        }, callback);
        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['clothing_store']
        }, callback);

        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['hair_care']
        }, callback);
        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['spa']
        }, callback);
        service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['hair_salon']
        }, callback);

        service.nearbySearch({
            location: pyrmont,
            radius: 5000,
            type: ['park'],
        }, callback);
        service.nearbySearch({
            location: pyrmont,
            radius: 5000,
            type: ['amusement_park'],
        }, callback);
        service.nearbySearch({
            location: pyrmont,
            radius: 5000,
            type: ['zoo'],
        }, callback);
        service.nearbySearch({
            location: pyrmont,
            radius: 5000,
            type: ['aquarium']
        }, callback);

        service.nearbySearch({
            location: pyrmont,
            radius: 5000,
            type: ['restaurant']
        }, callback);

        service.nearbySearch({
            location: pyrmont,
            radius: 5000,
            type: ['movie_theater']
        }, callback);

        service.nearbySearch({
            location: pyrmont,
            radius: 50000,
            type: ['art_gallery']
        }, callback);

        service.nearbySearch({
            location: pyrmont,
            radius: 50000,
            type: ['museum']
        }, callback);
    });
}

function callback(results, status) {
    callbackCounter++;
    console.log(results);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            /*puts types into their respetive arrays*/
            if (results[i].types[0] === "shopping_mall" || results[i].types[0] === "shoe_store" || results[i].types[0] === "clothing_store") {
                shoppingArray.push(results[i].vicinity);
            } else if (results[i].types[0] === "hair_care" || results[i].types[0] === "spa" || results[i].types[0] === "hair_salon") {
                relaxArray.push(results[i].vicinity);
            } else if (results[i].types[0] === "movie_theater") {
                movieArray.push(results[i].vicinity);
            } else if (results[i].types[0] === "park" || results[i].types[0] === "amusement_park") {
                outdoorsArray.push(results[i].vicinity);
            } else if (results[i].types[0] === "cafe" || results[i].types[0] === "bakery") {
                breakfastArray.push(results[i].vicinity);
            } else if (results[i].types[0] === "art_gallery" || results[i].types[0] === "museum") {
                artArray.push(results[i].vicinity);
            } else if (results[i].types[0] === "zoo" || results[i].types[0] === "aquarium") {
                adventureArray.push(results[i].vicinity);
            } else if (results[i].types[0] === "restaurant") {
                restaurantArray.push(results[i].vicinity);
            } else if (results[i].types[0] === "night_club") {
                nightClubArray.push(results[i].vicinity);
            } else if (results[i].types[0] === "bar") {
                barArray.push(results[i].vicinity);
            }
            console.log(results[i]);

        }


        /*calls to other functions must be made in this space within callback*/



    }
}
/*button activities*/
$("#time1").on('click', function populateButtons(array) {

    initMap2();
    for (var i = 0; i < morningArray.length; i++) {
        var r = $('<input/>').attr({
            type: "button",
            class: "btn-lg btn-danger shadow",
            autocomplete: "off",
            id: morningArray[i],
            value: morningArrayCap[i]
        });


        $('.buttons').append(r);
    }
    $("#shopping").on('click', function() {
        mixedArray.push(shoppingArray[Math.floor(Math.random() * shoppingArray.length)]);
        buttonCounter++;
        if (buttonCounter > 8) {
            alert("too many buttons!!");
        }

    });

    $("#outdoors").on('click', function() {
        mixedArray.push(outdoorsArray[Math.floor(Math.random() * outdoorsArray.length)]);
        buttonCounter++;
        if (buttonCounter > 8) {
            alert("too many buttons!!");
        }


    });
    $("#breakfast").on('click', function() {
        mixedArray.push(breakfastArray[Math.floor(Math.random() * breakfastArray.length)]);
        buttonCounter++;
        if (buttonCounter > 8) {
            alert("too many buttons!!");
        }


    });
    $("#relax").on('click', function() {
        mixedArray.push(relaxArray[Math.floor(Math.random() * relaxArray.length)]);
        buttonCounter++;
        if (buttonCounter > 8) {
            alert("too many buttons!!");
        }


    });
});

$("#time2").on('click', function populateButtons(array) {

    initMap2();
    for (var i = 0; i < afternoonArray.length; i++) {
        var r = $('<input/>').attr({
            type: "button",
            class: "btn-lg btn-danger shadow",
            autocomplete: "off",
            id: afternoonArray[i],
            value: afternoonArrayCap[i]
        });

        $('.buttons').append(r);
    }
    $("#art").on('click', function() {
        mixedArray.push(shoppingArray[Math.floor(Math.random() * shoppingArray.length)]);
        buttonCounter++;
        if (buttonCounter > 8) {
            alert("too many buttons!!");
        }


    });

    $("#adventure").on('click', function() {
        mixedArray.push(outdoorsArray[Math.floor(Math.random() * outdoorsArray.length)]);
        buttonCounter++;
        if (buttonCounter > 8) {
            alert("too many buttons!!");
        }


    });
    $("#restaurant").on('click', function() {
        mixedArray.push(breakfastArray[Math.floor(Math.random() * breakfastArray.length)]);
        buttonCounter++;
        if (buttonCounter > 8) {
            alert("too many buttons!!");
        }


    });
    $("#movie").on('click', function() {
        mixedArray.push(relaxArray[Math.floor(Math.random() * relaxArray.length)]);
        buttonCounter++;
        if (buttonCounter > 8) {
            alert("too many buttons!!");
        }


    });
    $("#relax").on('click', function() {
        mixedArray.push(relaxArray[Math.floor(Math.random() * relaxArray.length)]);
        buttonCounter++;
        if (buttonCounter > 8) {
            alert("too many buttons!!");
        }


    });

});

$("#time3").on('click', function populateButtons(array) {

    initMap2();
    for (var i = 0; i < eveningArray.length; i++) {
        var r = $('<input/>').attr({
            type: "button",
            class: "btn-lg btn-danger shadow",
            autocomplete: "off",
            id: eveningArray[i],
            value: eveningArrayCap[i]
        });

        $('.buttons').append(r);
    }
    $("#night"+"club").on('click', function() {
        mixedArray.push(relaxArray[Math.floor(Math.random() * relaxArray.length)]);
        buttonCounter++;
        if (buttonCounter > 8) {
            alert("too many buttons!!");
        }


    });
    $("#bar").on('click', function() {
        mixedArray.push(relaxArray[Math.floor(Math.random() * relaxArray.length)]);
        buttonCounter++;
        if (buttonCounter > 8) {
            alert("too many buttons!!");
        }


    });
});




/*directions functions*/
/*creates map*/


function initMap2() {

    geoLocate();
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map2 = new google.maps.Map(document.getElementById('map2'), {
        zoom: 11,
        center: new google.maps.LatLng(startPoint.lat, startPoint.lng),
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
    });
    directionsDisplay.setMap(map2);
    document.getElementById('submit').addEventListener('click', function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);


    });

}

/*makes route*/



function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    /*cleans up data to pass address*/
    for (var i = 0; i < mixedArray.length; i++) {
        console.log(mixedArray);

        var newWaypts = mixedArray[i].replace(/ |,|#/g, '+');
        waypts.push({
            location: newWaypts,
            stopover: true
        });
        endPoint = mixedArray[mixedArray.length - 1];
     
    }
    // console.log('https://www.google.com/maps/dir/' + newArr);


    /*change to geolocate*/

    directionsService.route({
        origin: startPoint,
        destination: endPoint,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                    '</b><br>';
                summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            }
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
