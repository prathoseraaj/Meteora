const url = 'https://api.openweathermap.org/data/2.5/weather' ;
const apiKey = '13c4bf8c9a2e4edad2c63dd362f4ade4' ;

window.onload = function() {
    weatherFn("Pune"); 
}

async function weatherFn(city = null) {

    const cName = city || document.getElementById('city-input').value;


    const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(temp) ;
        const data = await response.json() ; 
        if(response.ok) {
            console.log(data);

            //Here we calls exactdailyforcast to make sure as the code fetch api properly
            const dailyforcast = await exactdailyforcast(cName) ;
            weatherShowfn(data,dailyforcast);

        }
        else{
            alert('city not Found. Please try again') ;
        }

    } 

    catch(error){
        console.error('Error Fetching Weather Data : ', error) ;
    }
}

    //adding forcast

async function exactdailyforcast(cName) {
    

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cName}&appid=${apiKey}&units=metric`;
    try{

        const forcastresp = await fetch(forecastUrl) ;
        forcastdata = await forcastresp.json();
        console.log(forcastdata);
    }

    catch(error){
        console.error('Error Fetching Weather Data : ', error) ;

    }

        const dailyforcast = [] ;

        for(let i of forcastdata.list){
            const forcast = i ;

            forcasttime = forcast.dt_txt ;

            //checking as the time is equal to 12.00 pm
            if(forcasttime.includes("12:00:00")){
                dailyforcast.push(forcast);
            }
        }
        console.log(dailyforcast);
        return dailyforcast ;



}


function weatherShowfn(data,dailyforcast) {

    document.getElementById('city-name').textContent = data.name ;

    document.getElementById('date').textContent = moment().format('MMMM Do YYYY , h:mm:ss a') ;

    document.getElementById('temperature').innerHTML = `${data.main.temp} C` ;
   
    document.getElementById('description').textContent = data.weather[0].description;

    document.getElementById('wind-speed').innerHTML = `Wind Speed: ${data.wind.speed}` ; 

    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    document.getElementById('weatherINFO').style.display = 'block';

    document.getElementById("day1").innerHTML = `${dailyforcast[0].main.temp}`;

    document.getElementById("day2").innerHTML = `${dailyforcast[1].main.temp}`;

    document.getElementById("day3").innerHTML = `${dailyforcast[2].main.temp}` ;

    document.getElementById("day4").innerHTML = `${dailyforcast[3].main.temp}` ;

}
