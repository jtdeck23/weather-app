const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianRkZWNrMjMiLCJhIjoiY2p4dHJhajF6MHhpajNjbW01b2F3aTE1YyJ9.4IIVi_N2z2zxAM1tCn_CLQ'

    request({
        url,
        json: true
    }, (err, {
        body
    }) => {
        if (err) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find coordinates!', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode