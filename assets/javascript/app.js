var pics = [];
var queryURL = "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=29026ca656f687e6b8f2e95c72ffe8ce&group_id=1335650@N25&tag=austin&extras=url_l&format=json";

    $("#menu-close").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });
    // Opens the sidebar menu
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });

// function jsonFlickrApi(data) {
//     console.log(data.photos.photo.length);

//     for (var i = 0; i < data.photos.photo.length; i++) {
//         var pic = data.photos.photo[i].url_l;
//         if (pic !== undefined) {

//             pics.push(pic);
//         }

//     }

//     var randomImg = pics[Math.floor(Math.random() * pics.length)];
//     var img = $('<img class="img-fluid" src="' + randomImg + '" alt="Responsive Image">'); //Equivalent: $(document.createElement('img'))
//     $(".imgDiv").append(img);
//     button = $("<a href='#about' class='btn btn-primary btn-lg btn-block'>Git Started</a>");
//     $(".buttonDiv").html(button);

// }

// $.ajax({
//     url: queryURL,
//     method: 'GET',
//     dataType: "jsonp"
// });



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
