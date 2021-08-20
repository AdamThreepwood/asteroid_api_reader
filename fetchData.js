

// Function for defining todays date, and the date a week ago for the GET which
// requires specific dates to accept request
let today = new Date().toISOString().slice(0, 10)
//let lastWeek = today

console.log(today)

document.getElementById("dateShow").textContent = today;

function createDate(days, months, years) {
        var today = new Date();
        today.setDate(today.getDate() + days);
        today.setMonth(today.getMonth() + months);
        today.setFullYear(today.getFullYear() + years);
        return today;    
    }
let yesterday = createDate(-1, 0, 0).toISOString().slice(0, 10)
let lastWeek = createDate(-6, 0, 0).toISOString().slice(0, 10)
let lastWeekYesterday  = createDate(-7, 0, 0).toISOString().slice(0, 10)

let urlToday = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + lastWeek + '&end_date=' + today + '&api_key=DEMO_KEY'

let searchButton = document.querySelector("#fetch")
let searchBtnYesterday = document.querySelector("#fetchYesterday")

searchButton.addEventListener("click", ()=>{
  console.log("button pressed")
  getData()
})

function getYesterday () {

  let urlYesterday = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + lastWeekYesterday + '&end_date=' + yesterday + '&api_key=DEMO_KEY'
  
const xIdsYest = [];
const xKmYest = [];
  
  this.loading.style.display = "block";
  fetch(urlYesterday)
    .then(res => res.json()) 
    .then(data => {      
    for(let i=0;i < data.near_earth_objects[yesterday].length; i++){
    let obj = data.near_earth_objects[yesterday][i]
    
    
    let astId = obj.id;
    xIdsYest.push(astId);  
    let astKm = obj.estimated_diameter.kilometers.estimated_diameter_max;
    xKmYest.push(astKm);  
         
      
      this.loading.style.display = "none";
      //document.querySelector("#asteroidsContent").innerHTML += "<br>" + "ID: "  + xIds + "<br> Diameter: "  + xKm + " km"  ;
             }

let ctx = document.getElementById('myChart').getContext("2d");
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: xIdsYest,
        datasets: [{
            label: 'Diameter in km of near asteroids',
            data: xKmYest,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


      

				})
  return {xIdsYest, xKmYest}
}
  

searchBtnYesterday.addEventListener("click", ()=>{
  console.log("button pressed")
  getYesterday();
})

searchButton.addEventListener("click", ()=>{
  console.log("button pressed")
  getData()
})

let loading = document.getElementById("loading");

//Clicking the button activates to loading spinner while waiting for fetch to return data
//Afetr that, run function that pushes specific data to variable array
async function getData(){
var xIds = [];
var xKm = [];

  this.loading.style.display = "block";
  fetch(urlToday)
    .then(res => res.json()) 
    .then(data => {      
    for(let i=0;i < data.near_earth_objects[today].length; i++){
    let obj = data.near_earth_objects[today][i] 
    
    let astId = obj.id;
    xIds.push(astId);  
    let astKm = obj.estimated_diameter.kilometers.estimated_diameter_max;
    xKm.push(astKm);  
         
      
      this.loading.style.display = "none";
   //   document.querySelector("#asteroidsContent").innerHTML  += "<br>"  + "ID: "  + astId + "<br> Diameter: "  + astKm + " km"  ;
             }
 
const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: xIds,
        datasets: [{
            label: 'Diameter in km of near asteroids',
            data: xKm,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


      

				})
  return {xIds, xKm}
}
      
      



