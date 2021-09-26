// Function for defining todays date, and the date a week ago for the GET which
// requires specific dates to accept request
let today = new Date().toISOString().slice(0, 10);
//let lastWeek = today

console.log(today);

document.getElementById("dateShow").textContent = today;

function createDate(days, months, years) {
  var today = new Date();
  today.setDate(today.getDate() + days);
  today.setMonth(today.getMonth() + months);
  today.setFullYear(today.getFullYear() + years);
  return today;
}
let yesterday = createDate(-1, 0, 0)
  .toISOString()
  .slice(0, 10);
let lastWeek = createDate(-6, 0, 0)
  .toISOString()
  .slice(0, 10);
let lastWeekYesterday = createDate(-7, 0, 0)
  .toISOString()
  .slice(0, 10);

// Variable where date variables are inserted. By making the url into everal variables it makes the possibility 
// to crate new date, such as through a date picker, easier.  The lastweek is necessary due to the API-constraints. 

let urlToday =
  "https://api.nasa.gov/neo/rest/v1/feed?start_date=" +
  lastWeek +
  "&end_date=" +
  today +
  "&api_key=DEMO_KEY";


// Two buttons for today and yesterday. 
let searchButton = document.querySelector("#fetch");
let searchBtnYesterday = document.querySelector("#fetchYesterday");

// Two canvas elements which are simply replaced by each other, to wipe the data and
// make the grap appear in the same place. Making a new graph is easier than just replacing the data in chart.js.

  let canv = document.createElement("canvas");
  canv.id = "myChart";
  let canv1 = document.createElement("canvas");
  canv1.id = "myChart1";

// Same url variable as above but for yesterday. The lastweek is necessary due to the API-constraints. 

function getYesterday() {
  let urlYesterday =
    "https://api.nasa.gov/neo/rest/v1/feed?start_date=" +
    lastWeekYesterday +
    "&end_date=" +
    yesterday +
    "&api_key=DEMO_KEY";



  document.body.appendChild(canv1); // adds the canvas to the body element
  document.getElementById("chartWindows").appendChild(canv1); // adds the canvas to #someBox

  //Create arrays for storing the fetched data. These arrays acts as the data for the charts. 
  //The asteroid IDs from yesterday
  const xIdsYest = [];
  
  //The asteroids diameter in km from yesterday
  const xKmYest = [];

  //unblocks loading cicle display. Fetches the data from yesterday, goes thorugh each JSON entry and pushes them to the releveant array.
  // after that blocks the loading display again when fetching is completed.
  this.loading.style.display = "block";
  fetch(urlYesterday)
    .then(res => res.json())
    .then(data => {
      for (let i = 0; i < data.near_earth_objects[yesterday].length; i++) {
        let obj = data.near_earth_objects[yesterday][i];

        let astId = obj.id;
        xIdsYest.push(astId);
        let astKm = obj.estimated_diameter.kilometers.estimated_diameter_max;
        xKmYest.push(astKm);

        this.loading.style.display = "none";
        //document.querySelector("#asteroidsContent").innerHTML += "<br>" + "ID: "  + xIds + "<br> Diameter: "  + xKm + " km"  ;
      }
      //Creates chart with the fetched data. myChart1 is for yesterday data. Arrays placed in labels and data. 
      let ctx1 = document.getElementById("myChart1").getContext("2d");
      const myChart1 = new Chart(ctx1, {
        type: "bar",
        data: {
          labels: xIdsYest,
          datasets: [
            {
              label: "Diameter in km of near asteroids",
              data: xKmYest,
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: [
                "rgba(255, 99, 132, 1)",

              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  return { xIdsYest, xKmYest };
}
//Button for yesterday removes the chart for today, if present, and then executes the getYesterday function.  
searchBtnYesterday.addEventListener("click", () => {
  console.log("button pressed");
  removeToday();
  getYesterday();
});
//Button for today removes the chart for yesterday, if present, and then executes the getData function.  
searchButton.addEventListener("click", () => {
  console.log("button pressed");
  removeYesterday();
  getData();
});

let loading = document.getElementById("loading");

//Clicking the button activates to loading spinner while waiting for fetch to return data
//Afetr that, run function that pushes specific data to variable array
async function getData() {

  document.body.appendChild(canv); // adds the canvas to the body element
  document.getElementById("chartWindows").appendChild(canv); // adds the canvas to #someBox

  var xIds = [];
  var xKm = [];

  this.loading.style.display = "block";
  fetch(urlToday)
    .then(res => res.json())
    .then(data => {
      for (let i = 0; i < data.near_earth_objects[today].length; i++) {
        let obj = data.near_earth_objects[today][i];

        let astId = obj.id;
        xIds.push(astId);
        let astKm = obj.estimated_diameter.kilometers.estimated_diameter_max;
        xKm.push(astKm);

        this.loading.style.display = "none";
        //   document.querySelector("#asteroidsContent").innerHTML  += "<br>"  + "ID: "  + astId + "<br> Diameter: "  + astKm + " km"  ;
      }

      const ctx = document.getElementById("myChart");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: xIds,
          datasets: [
            {
              label: "Diameter in km of near asteroids",
              data: xKm,
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: [
                "rgba(255, 99, 132, 1)",

              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  return { xIds, xKm };
}

//Removes yesterdays chart.
function removeYesterday(){
    canv1.remove();
}
//Removes todays chart. 
function removeToday(){
    canv.remove();
}
