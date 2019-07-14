const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/37e03c02e87fc2527ff310725e50899b/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long)

    request({
        url,
        json: true
    }, (err, {
        body
    }) => {
        if (err) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees, with a ' + body.currently.precipProbability + ' percent chance of rain.')
        }
    })
}

module.exports = forecast