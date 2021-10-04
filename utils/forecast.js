const request = require('postman-request');
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6b75db8c254c6efdabf50c8c2b334e9d&query=' + longitude + ',' + latitude;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to fin location', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It's currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degress out.");
        }
    });
}

module.exports = forecast;