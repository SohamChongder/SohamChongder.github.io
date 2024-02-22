window.addEventListener("load", () => {
    clock();weatherget();
    function clock() {
        // create a new `Date` object
        const now = new Date();

        // get the current date and time as a string
        let dd = now.getDate();
        if(dd<10)dd="0"+dd;

        let mm = now.getMonth()+1;
        if(mm<10)mm="0"+mm;
        
        const yyyy = now.getFullYear();

        const date=dd+" / "+mm+" / "+yyyy;
        document.getElementById("date").innerHTML=date;

        //get current time
        let sec= now.getSeconds();
        if(sec<10)sec="0"+sec;

        let mins = now.getMinutes();
        if(mins<10)mins="0"+mins;

        let noter=" am";
        let hour = now.getHours();
        if(hour>12){hour=hour-12;noter=' pm';}else noter=' am';
        if(hour==0)hour=12;
        if(hour<10)hour="0"+hour;

        const time=hour+":"+mins+" "+noter;
        document.getElementById("time").innerHTML=time;
        setTimeout(clock, 1000);
        //console.log(date);
    }

    function weatherget() {
      fetch(`http://api.weatherapi.com/v1/current.json?key=c6929a82693744e9967143901241401&q=Darmstadt&aqi=no`)
          .then(response => response.json())
          .then(data => {
              document.getElementById("temp").innerHTML=data.current.temp_c+"°C";
              document.getElementById("type").innerHTML=data.current.condition.text;
              document.getElementById("wind").innerHTML="Winds: "+data.current.wind_kph+"km/h due "+data.current.wind_dir;
          })
          .catch(error => console.error(error));
          setTimeout(weatherget, 600000);
    }      

});


// window.addEventListener("load", () => {
//     weatherget();
//     function weatherget() {
//         fetch(`http://api.weatherapi.com/v1/current.json?key=c6929a82693744e9967143901241401&q=Darmstadt&aqi=no`)
//             .then(response => response.json())
//             .then(data => {
//                 document.getElementById("temp").innerHTML=data.current.temp_c+"°C";
//                 document.getElementById("type").innerHTML=data.current.condition.text;
//                 document.getElementById("wind").innerHTML="Winds: "+data.current.wind_kph+"km/h due "+data.current.wind_dir;
//             })
//             .catch(error => console.error(error));
//             setTimeout(weatherget, 600000);
//     }
    
// });


var startTime; // to keep track of the start time
var stopwatchInterval; // to keep track of the interval
var elapsedPausedTime = 0; // to keep track of the elapsed time while stopped

function startStopwatch() {
    console.log("STart");
  if (!stopwatchInterval) {
    startTime = new Date().getTime() - elapsedPausedTime; // get the starting time by subtracting the elapsed paused time from the current time
    stopwatchInterval = setInterval(updateStopwatch, 1000); // update every second
  }
}

function stopStopwatch() {
    console.log("STop");
  clearInterval(stopwatchInterval); // stop the interval
  elapsedPausedTime = new Date().getTime() - startTime; // calculate elapsed paused time
  stopwatchInterval = null; // reset the interval variable
}

function resetStopwatch() {
    console.log("Reset");
  stopStopwatch(); // stop the interval
  elapsedPausedTime = 0; // reset the elapsed paused time variable
  document.getElementById("studytime").innerHTML = "00:00"; // reset the display
  document.getElementById("studysec").innerHTML = "00s"
}

function updateStopwatch() {
  var currentTime = new Date().getTime(); // get current time in milliseconds
  var elapsedTime = currentTime - startTime; // calculate elapsed time in milliseconds
  var seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
  var minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
  var hours = Math.floor(elapsedTime / 1000 / 60 / 60); // calculate hours
  var displayTime = pad(hours) + ":" + pad(minutes) ; // format display time
  document.getElementById("studytime").innerHTML = displayTime;
  document.getElementById("studysec").innerHTML = pad(seconds)+"s"; // update the display
}

function pad(number) {
  // add a leading zero if the number is less than 10
  return (number < 10 ? "0" : "") + number;
}

