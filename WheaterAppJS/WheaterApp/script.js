document.querySelector('#getOne').addEventListener('click',getOne);
document.querySelector('#getAll').addEventListener('click',getAll);

var days =[
    {day:0,short:"SUN"},
    {day:1,short:"MON"},
    {day:2,short:"TUE"},
    {day:3,short:"WED"},
    {day:4,short:"THU"},
    {day:5,short:"FRI"},
    {day:6,short:"SAT"}
];
function getOne(e){
    var cityName =document.getElementById('post-id').value;
    var url ="https://api.weatherapi.com/v1/current.json?key=64f6a8a7706149a0860232953211812&q="+cityName+"&aqi=no";

    var xhr = new XMLHttpRequest();

    xhr.open('GET',url,true);
    
    if( cityName ==""){
        alert("City Name Required!");
    }else{
        var loadingIco=document.getElementById('loading');
        loadingIco.style.display="block";
        setTimeout(()=>{

            xhr.onload = function(){
                loadingIco.style.display="none";
                var beauty = JSON.parse(this.responseText);
                var html ="";
                console.log(beauty);
                html+=`
                <div class="col-md-2"></div>
                <div class="card">
                <div class="card-header bg-dark text-white">
                   ${beauty.location.name} - ${beauty.location.country}
                </div>
                <div class="card-body">
                    <div id="wheater-div">
                        <div class="row">
                        <div class="col-md-6">
                            <p id="city-clock">${beauty.current.last_updated}</p>
                            <p id="wheater-condition">${beauty.current.condition.text}</p>
                            <p id="wheater-max">Temp C : ${beauty.current.temp_c}°C </p>
                            <p id="wheater-min">Temp F : ${beauty.current.temp_f}°F </p>
                            <p id="wheater-humidity"> Humidity : ${beauty.current.humidity}% </p>
                            <p id="wheater-min"> Wind : ${beauty.current.gust_kph} km/h </p>
                        </div>
                        <div class="col-md-6">
                            <div class="wheater-ico">
                            <img src="${beauty.current.condition.icon}" id="wheater-icon" alt="">
                            </div>
                        </div>
                    </div>
                    </div>
    
    
                </div>
            </div>
                
                `;
                document.querySelector('#Wheater-info').innerHTML=html;
               
        }
        xhr.send();
        },1500);
       
    }
    
}

function getAll(e){
    var html =`<div class="col-md mb-2"></div>`;
    var cityName =document.getElementById('post-id').value;
    
    var url ="https://api.weatherapi.com/v1/forecast.json?key=64f6a8a7706149a0860232953211812&q="+cityName+"&days=7&aqi=no&alerts=no";

    var xhr = new XMLHttpRequest();

    xhr.open('GET',url,true);

    if( cityName ==""){
        alert("City Name Required!");
    }else{
       
        var loadingIco=document.getElementById('loading');
        loadingIco.style.display="block";
       
        setTimeout(()=>{

            xhr.onload = function(){
                loadingIco.style.display="none";
                var beauty = JSON.parse(this.responseText);
                beauty.forecast.forecastday.forEach(item =>{
                    var d = new Date(item.date);
                    var i = d.getDay();
                    html+=`
                    
                    <div class="col-sm-2 mb-2" id="fore-card">
                    <div class="card bg-dark">
                        <div class="card-body text-white">
                            <div class="wheater-ico-fore">
                                <h6 id="short-dayName">${days[i].short}</h6>
                                <img id="fore-ico" src="${item.day.condition.icon}" id="wheater-icon" alt="">
                                </div>
                                <p class="text-center mt-4" id="wheater-fore-max">${item.day.maxtemp_c}°C/${item.day.mintemp_c}°C</p>
                        </div>
                    </div>
                </div>
                    `;
                });
                html+=`<div class="col-md mb-2"></div>`;
                document.querySelector('#fore-row').innerHTML=html;
            }
        xhr.send();
        },1500);
    }
    
}

