let getDate = () => {
    let date = new Date()
    let dateString = date.toLocaleDateString()
    //console.log(dateString)
    $('#date').text(dateString)
}


  let  momentTime = moment().format('MMMM Do YYYY, h:mm:ss a')
    $('#time').text(momentTime)

//let momentTime = moment.tz.guess();
//console.log(momentTime)






//google api time zone call
const currentDate = (lat1, lat2) => {
    //console.log(lat1)
    //console.log(lon2)
    let loc = `${lat1},${lat2}`
    let newdate = new Date()
    let timestamp = newdate.getTime()/1000 + newdate.getTimezoneOffset() * 60
    console.log(timestamp)
    const googleKey = "AIzaSyBKG0s8RnldTEGhTC5CtWwSzsKz0KQrvaA"
    let apiCall = `https://maps.googleapis.com/maps/api/timezone/json?location=${loc}&timestamp=${timestamp}&key=AIzaSyBKG0s8RnldTEGhTC5CtWwSzsKz0KQrvaA`

    //let apiCall = "https://maps.googleapis.com/maps/api/timezone/json?location=" + lat1 + "," + lat2 + "&timestamp="+(Math.round((new Date().getTime())/1000)).toString()+"&key=" + googleKey
    $.ajax({
        url: apiCall,
           }).done(function(response){
                if(response.timeZoneId != null){
                  let timeZone =(response.timeZoneName)
                  let timeZoneID = response.timeZoneId
                  console.log(timeZoneID, timeZone)
                  $('#Timezonename').text(timeZone)
                  $('#TimeId').text(timeZoneID)
                  //calculating the time zone local time
                //   let offSets = response.dstOffset * 1000 + response.rawOffset * 1000 // get DST and time zone offsets in  milliseconds
                //   let localDate = new Date(timestamp * 1000 + offSets) // Date oject containing current time of target location
                //   let refreshDate = new Date() // get current date again to calculate time elapsed between targetdate and now
                //   let millisecondselapsed = refreshDate - newdate // get amount of time elapsed
                //   localDate.setMilliseconds(localDate.getMilliseconds() + millisecondselapsed)
                //   lsetInterval
                //   ocalDate.setSeconds(localDate.getSeconds() + 1)
                //   let TimeZoneDate =
                    getTimezone(timeZoneID)

                }
       })
       
}

const getResize = () => {
    $(window).resize(() => {
        if ($('.grid-container').css("flex-direction") == "column") {
            $('.grid-container').toggle("explode")
        }
    })
}




const getWeather = (event) => {
    // $('button').on('click', (event) => {
        event.preventDefault();
        const $inputSearch = $('input').val();
        //console.log($inputSearch)//get user input
    let appkey = `1ea1013adbea8134826f45eb988575d1`
    let url = `http://api.openweathermap.org/data/2.5/weather/?q=${$inputSearch}&units=metric&APPID=d8ef3b8d18705a7d1fa4cf253411f06b`
        
        $.getJSON(url).then(function(data) {
            console.log(data);
             let status = data.weather[0].description;
             let temprature = data.main.temp.toFixed(0)
              let lon = data.coord.lon
              let lat = data.coord.lat
              const winSpeed = data.wind.speed
              const pressure = data.main.pressure
              const humidity = data.main.humidity
              const direction = data.wind.deg

            $('#status').text(status)
            $('#temprature').text(temprature)
            $('.windspeedstatus').text(winSpeed)
            $('.windpressurestatus').text(pressure)
            $('.directionclimatestatus').text(direction)
            $('.humidityclimatestatus').text(humidity)
            getDate()
            //function to get the lat and long for timezone
            currentDate(lat, lon)
            $('.timedisplay').effect('shake', "right")
            $('.weatherresultText').effect('shake', "left")
            $('.grid-container').effect('bounce', "slow")
            //getResize()
            $('input').val('')
            
            
            

        });
    // })
}









$(() => {
    $('form').on('submit', getWeather)
    getResize()
   
  
})