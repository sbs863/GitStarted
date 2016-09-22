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
    });


    var myArray = ['dog', 'cat', 'pet'];

    $(".times").click(function populateButtons(array) {
        for (var i = 0; i < myArray.length; i++) {
            var r = $('<input/>').attr({
                type: "button",
                class: "btn-lg btn-danger shadow",
                autocomplete: "off",
                id: myArray[i],
                value: myArray[i]
            });
            r.attr('data-toggle', "button");
            r.attr('aria-pressed', 'false');
            $('.buttons').append(r);
        }
    });

    $('.beer').click(function() {
        counter++;
        console.log(counter);

    });

    // This example requires the Places library. Include the libraries=places
    // parameter when you first load the API. For example:
    // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

    /*arrays for functions to use*/
    var map;
    var map2;
    var infowindow;
    var startPoint = { lat: '', lng: '' };
    var endPoint = "";
    var waypts = [];


    /*type arrays*/
    var shoppingArray = [];
    var treatArray = [];
    var outdoorsArray = [];
    var breakfastArray = [];
    /*geo-locate api - might change later*/
    var queryURL = "http://ip-api.com/json";


    /*geolocation*/
    $("#locate").on("click", function() {

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            var crd = pos.coords;

            console.log('Your current position is:');
            console.log('Latitude : ' + crd.latitude);
            console.log('Longitude: ' + crd.longitude);
            console.log('More or less ' + crd.accuracy + ' meters.');
        }

        function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);

        $.ajax({ url: queryURL, method: 'GET' })
            .done(function(response) {
                startPoint.lat = response.lat;
                startPoint.lng = response.lon;
                console.log(response.lon);
                console.log(response.lat);
            });
    });
    console.log(startPoint);
    /*places search */
    function initmap() {
        /*change to geolocate*/
        var pyrmont = { lat: 30.2672, lng: -97.7431 };
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
    }

    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                shoppingArray.push(results[i]);
                console.log(shoppingArray);
            }

            /*calls to other functions must be made in this space within callback*/
            initMap2();

        }
    };

    function callback2(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                museumArray.push(results[i].vicinity);
            }
        }
    };
    /*directions functions*/
    /*creates map*/
    function initMap2() {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map2 = new google.maps.Map(document.getElementById('map2'), {
            zoom: 6,
            center: { lat: 41.85, lng: -87.65 }
        });
        directionsDisplay.setMap(map2);
        document.getElementById('submit').addEventListener('click', function() {
            calculateAndDisplayRoute(directionsService, directionsDisplay);
        });
    }
    /*makes route*/
    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        /*cleans up data to pass address*/
        for (var i = 0; i < museumArray.length; i++) {
            console.log(museumArray[i]);
            var newWaypts = museumArray[i].replace(/ |,/g, '+');
            waypts.push({
                location: newWaypts,
                stopover: true
            });
            endPoint = museumArray[museumArray.length - 1];
        }
        console.log(waypts);
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
