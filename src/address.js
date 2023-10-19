const geolib = require('geolib');

//test request
// const targetAddress = '2917 carnation avenue';
// const compareAddresses = ['484 baldwin avenue', '2445 Loft Ave', '604 Union Ave'];

// Function to get coordinates from an address using geolib
async function getCoordinates(address) {
  try {
    const response = await fetch(`https://geocode.maps.co/search?q={${address}}`);
    const data = await response.json();

    //console.log(data[0].lat);

    if (data.length > 0) {
      return { latitude: data[0].lat, longitude: data[0].lon };
    }
  } catch (error) {
    console.error('Error getting coordinates:', error);
  }
  return null;
}

// Function to calculate distance between two coordinates using geolib and return in miles
function calculateDistanceInMiles(coord1, coord2) {
    if (coord1 && coord2) {
      const distanceInMeters = geolib.getDistance(coord1, coord2);
      const distanceInMiles = distanceInMeters / 1609.344; // 1 meter is approximately 0.000621371 miles
      return distanceInMiles;
    }
    return null;
}

async function getDistancesFromTarget(target, compares){
    const targetCoords = await getCoordinates(target);
    let response = [];

    if(compares.length > 0){
        for(i = 0; i < compares.length; i++){
            const compareCoords = await getCoordinates(compares[i]);
            let newObj = {
                address: compares[i],
                distanceFromTarget: calculateDistanceInMiles(targetCoords, compareCoords)
            };
            response.push(newObj);
        }
    }
    return response;
}

module.exports = { getDistancesFromTarget };