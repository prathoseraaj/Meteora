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
            weatherShowfn(data);
        }
        else{
            alert('city not Found. Please try again') ;
        }

    } 

    catch(error){
        console.error('Error Fetching Weather Data : ', error) ;
    }

}





function weatherShowfn(data) {

    document.getElementById('city-name').textContent = data.name ;

    document.getElementById('date').textContent = moment().format('MMMM Do YYYY , h:mm:ss a') ;

    document.getElementById('temperature').innerHTML = `${data.main.temp} C` ;
   
    document.getElementById('description').textContent = data.weather[0].description;

    document.getElementById('wind-speed').innerHTML = `Wind Speed: ${data.wind.speed}` ; 

    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    document.getElementById('weatherINFO').style.display = 'block';

}
