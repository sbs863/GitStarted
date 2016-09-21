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
                id: array[i]
            });
            $('.right').append(r);
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


        function prompt(window, pref, message, callback) {
            let branch = Components.classes["@mozilla.org/preferences-service;1"]
                .getService(Components.interfaces.nsIPrefBranch);

            if (branch.getPrefType(pref) === branch.PREF_STRING) {
                switch (branch.getCharPref(pref)) {
                    case "always":
                        return callback(true);
                    case "never":
                        return callback(false);
                }
            }

            let done = false;

            function remember(value, result) {
                return function() {
                    done = true;
                    branch.setCharPref(pref, value);
                    callback(result);
                }
            }

            let self = window.PopupNotifications.show(
                window.gBrowser.selectedBrowser,
                "geolocation",
                message,
                "geo-notification-icon", {
                    label: "Share Location",
                    accessKey: "S",
                    callback: function(notification) {
                        done = true;
                        callback(true);
                    }
                }, [{
                    label: "Always Share",
                    accessKey: "A",
                    callback: remember("always", true)
                }, {
                    label: "Never Share",
                    accessKey: "N",
                    callback: remember("never", false)
                }], {
                    eventCallback: function(event) {
                        if (event === "dismissed") {
                            if (!done) callback(false);
                            done = true;
                            window.PopupNotifications.remove(self);
                        }
                    },
                    persistWhileVisible: true
                });
        }

        prompt(window,
            "extensions.foo-addon.allowGeolocation",
            "Foo Add-on wants to know your location.",
            function callback(allowed) { alert(allowed); });

        function geoFindMe() {
            var output = document.getElementById("out");

            if (!navigator.geolocation) {
                output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
                return;
            }

            function success(position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

                output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

                var img = new Image();
                img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

                output.appendChild(img);
            }

            function error() {
                output.innerHTML = "Unable to retrieve your location";
            }

            output.innerHTML = "<p>Locating…</p>";

            navigator.geolocation.getCurrentPosition(success, error);
        }

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
