const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYmF5YWJheWEiLCJhIjoiY2s5bXhoczZmMDhhdDNsbWt3Y2EyMG13bCJ9.H6qmM-XvNr-9qT4i-xf8fQ'
    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('unable to connect the location server', undefined)
        } else if (body.features.length === 0) {
            callback('unable to get the location try another search', undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name
            callback(undefined, {
                latitude,
                longitude,
                location
            })

        }
    })

}
module.exports = geocode