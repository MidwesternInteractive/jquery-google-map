# jquery-google-map
MWI Google Map Integration

## Usage
```
$(function() {
  $('#map').mwimap();
})
```

## Defaults
Only 11 addresses can be geocoded. If you plan on having more than 11 markers you will need to provide lat/lng for each location.
```
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
```

## Styling Info Window
All infoWindows are wrapped in `div.infowindow`
