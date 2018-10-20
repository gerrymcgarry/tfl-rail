if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

function initMap() {
    var markers =  [
        {
        coords:{lat: 51.507351, lng: -0.127758},
        iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        content: '<h1>London</h1>'
        },
        {
        coords:{lat: 51.509351, lng: -0.127758},
        content: '<h1>More London</h1>'
        }
    ];
    
    
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: markers[0].coords
    });

    var src = 'https://gerrymcgarry.github.io/maps/tfl.kml';
    var kmlLayer = new google.maps.KmlLayer(src, {
      suppressInfoWindows: true,
      preserveViewport: false,
      map: map
    });

    kmlLayer.addListener('click', function(event) {
        var content = event.featureData.infoWindowHtml;
        var testimonial = document.getElementById('capture');
        testimonial.innerHTML = content;
      });

    for ( var i = 0; i < markers.length; i++) {
        addMarker(markers[i]);
    }

    function addMarker(props) {

        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
            icon: props.iconImage
        });
        if(props.iconImage) {
            marker.setIcon(props.iconImage);
        }
        if(props.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
             });
        marker.addListener('click', function(){
            infoWindow.open(map, marker);
        });
        }
    }
}