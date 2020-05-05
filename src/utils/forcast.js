const request = require('request')
const forcast = ({ latitude, longitude }, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=0d968fcab73c188c3b2970363cf1ca75&units=metric'
    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('unable to connect the weather server', undefined)
        } else if (body.message) {
            callback('unable to get the data', undefined)
        } else {
            callback(undefined, 'The tempreture is ' + body.main.temp + '. The humidity is ' + body.main.humidity + '. The pressure is ' + body.main.pressure //response.body.main.humidity
            )
        }
    })
}
module.exports = forcast