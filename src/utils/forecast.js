const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=5fee0811f3fe474d6b7e8e90037f526b&query='+latitude+','+longitude+'&units=m'

    request({url: url, json: true}, (error, {body})=>{
            if(error){
                callback('Unable to connect to Weather Service!', undefined)
            }else if(body.error){
                callback('Unable to find location!', undefined)
            }else{
                callback(undefined, body.current.weather_descriptions + ' Temperature: ' + body.current.temperature + '°C. Feelslike:' + body.current.feelslike + '°C. ' + 'Humidity: ' + body.current.humidity + '%' )
            }
    })
}

module.exports = forecast