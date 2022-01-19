const currentDate = document.querySelector("#dateNow");
const currentTime = document.querySelector("#timeNow");
const description = document.querySelectorAll(".descriptionView");
const deleteEvent = document.querySelector("#deleteEvent");
const deleteYes = document.querySelector("#deleteYes");
const geocoder = new google.maps.Geocoder();


// Limit the description text length
function limitTextStr(string, length) {
  return string.length > length ? string.substring(0, length) + "..." : string;
}

description.forEach((el) => {
  // console.log(el.innerHTML);
  el.innerHTML = limitTextStr(el.innerHTML, 200);
});

// To show current day & time
const today = moment().format("YYYY-MM-DD");
currentDate.value = today;

const timeNow = moment().format("HH:mm");
currentTime.value = timeNow;

// Event Form
// API - Google map - auto complete
function initialize() {
  const input = document.getElementById("address");
  
  var autocomplete =  new google.maps.places.Autocomplete(input);

  
  var place = autocomplete.getPlace();
// get lat
var lat = place.geometry.location.lat();
// get lng
var lng = place.geometry.location.lng();
console.log(lng)
}

//FIND THE LOCATION IN THE MA

function geocodeAddress(geocoder, resultsMap) {
  const address = document.getElementById('address').value;
 
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      let marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      document.getElementById('latitude').value = results[0].geometry.location.lat();
      document.getElementById('longitude').value = results[0].geometry.location.lng();
    } else {
      console.log(`Geocode was not successful for the following reason: ${status}`);
    }
  });
}

//INIT GOOGLE MAP
function startMap() {
  const ironhackBCN = {
  	lat: 41.3977381,
  	lng: 2.190471916};
  const map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 5,
      center: ironhackBCN
    }
  );
  const myMarker = new google.maps.Marker({
    position: {
      lat: 41.3977381,
      lng: 2.190471916
    },
    map: map,
    title: "I'm here"
  });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
 
      // Center map with user location
      map.setCenter(user_location);
 
      // Add a marker for your user location
      const ironhackBCNMarker = new google.maps.Marker({
        position: {
          lat: user_location.lat,
          lng: user_location.lng
        },
        map: map,
        title: "You are here."
      });
 
    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }
}
 
startMap();
google.maps.event.addDomListener(window, "load", initialize);

// Conrim msg before delete an event
// deleteEvent.addEventListener("click", () => {
//   confirmForDelete.style.display = "block";
// });

// deleteNo.addEventListener("click", () => {
//   confirmForDelete.style.display = "none";
// });
