/*
 * MWI Google Map Integration
 * copyright Midwestern Interactive 2018
 * author @ryandoss
 */

(function($)
{
  $.fn.mwimap = function(d)
  {
    return this.each(function()
    {
      var defaults = {
        locations: [
          {
            title: 'Midwestern Interactive',
            address: '212 S Main Joplin MO 64801',
            icon: '',
            lat: '',
            lng: '',
            info: ''
          },
        ],
        pathCoords: null,
        zoom: 10,
        pathColor: '000000',
        pathWidth: '2',
        pathOpacity: '0.8',
        scrollwheel: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        scaleControl: false,
        handleResize: true,
        styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}],
      };

      var options = $.extend({}, defaults, $.fn.mwimap.defaults, d);
      var markerAnimation = google.maps.Animation.DROP;
      var mapOptions = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: options.scrollwheel,
        zoomControl: options.zoomControl,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE,
          position: google.maps.ControlPosition.LEFT_CENTER
        },
        streetViewControl:options.streetViewControl,
        mapTypeControl:options.mapTypeControl,
        scaleControl:options.scaleControl,
        zoom: options.zoom,
        styles: options.styles
      }
      var flightPlanCoordinates = [];

      var methods = {
        handleMarkerClick: function(marker, infowindow, content) {
          var map = marker.get('map');

          google.maps.event.addDomListener(marker, 'click', function() {
            infowindow.setContent(content);
            infowindow.open(map, marker);

            if (options.handleResize) {
              google.maps.event.clearListeners(window, 'resize');
              google.maps.event.addDomListener(window, 'resize', function() {
                infowindow.open(map, marker);
              });
            }
          });
        }
      }

      var map = new google.maps.Map(document.getElementById($(this).attr('id')), mapOptions);

      /* Add Route */
      if(options.pathCoords != null)
      {
        for(i = 0; i < options.pathCoords.length; i++)
        {
          flightPlanCoordinates.push(new google.maps.LatLng(options.pathCoords[i][0], options.pathCoords[i][1]));
        }
        var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#'+options.pathColor,
          strokeOpacity: options.pathOpacity,
          strokeWeight: options.pathWidth
        });

        flightPath.setMap(map);
      }

      var bounds = new google.maps.LatLngBounds();
      var infowindow = new google.maps.InfoWindow({ content: "loading..." });

      /* Add Markers */
      for (i = 0; i < options.locations.length; i++)
      {

        /* If the marker has Longitute and Latitude display marker accordingly */
        if(options.locations[i].lat != "" && options.locations[i].lng != ""){

          var title  = options.locations[i].title;
          var info   = options.locations[i].info;
          
          if(options.locations[i].icon !== "") {
            var icon = options.locations[i].icon;
          }
          
          var content = '<div class="infoWindow">'+title+'<br>'+info+'</div>';
          (function(content) {
            myLatlng = new google.maps.LatLng(options.locations[i].lat, options.locations[i].lng);
      
            marker = new google.maps.Marker({
              position: myLatlng,
              animation: markerAnimation,
              icon: icon,
              title: title,
              map: map
            });
      
            methods.handleMarkerClick(marker, infowindow, content)
      
            if(options.locations.length > 1){
              bounds.extend(myLatlng);
              map.fitBounds(bounds);
            } else {
              map.setCenter(myLatlng);
            }
          })(content);

        /* If no lng and lat were provided use the address : Only 11 can be converted */
        }
        else
        {

          var geocoder   = new google.maps.Geocoder();
          var title  = options.locations[i].title;
          var info   = options.locations[i].info;
          var addr   = options.locations[i].address;
          if(options.locations[i].icon != "") {
            var icon = options.locations[i].icon;
          }
        
          (function(info, addr)
          {
            geocoder.geocode( {
          
              'address': addr
          
            }, function(results) {
          
              myLatlng = results[0].geometry.location;
          
              marker = new google.maps.Marker({
                position: myLatlng,
                animation: markerAnimation,
                icon: icon,
                title: title,
                map: map
              });
              var content = '<div class="infoWindow">'+title+'<br>'+info+'<br>'+addr+'</div>';
              methods.handleMarkerClick(marker, infowindow, content)
          
              if(options.locations.length > 1)
              {
                bounds.extend(myLatlng);
                map.fitBounds(bounds);
              } else {
                map.setCenter(myLatlng);
              }
            });
          })(info, addr);
        }
      }

      // Ajust view on resize
      if (options.handleResize) {
        google.maps.event.addDomListener(window, 'resize', function() {
          map.fitBounds(bounds);
        });

        google.maps.event.addListener(infowindow,'closeclick',function(){
          google.maps.event.clearListeners(window, 'resize');
          google.maps.event.addDomListener(window, 'resize', function() {
            map.fitBounds(bounds);
          });
        });
      }
    });
  }
})(jQuery);