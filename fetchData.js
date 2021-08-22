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

let urlToday =
  "https://api.nasa.gov/neo/rest/v1/feed?start_date=" +
  lastWeek +
  "&end_date=" +
  today +
  "&api_key=DEMO_KEY";

let searchButton = document.querySelector("#fetch");
let searchBtnYesterday = document.querySelector("#fetchYesterday");


  let canv = document.createElement("canvas");
  canv.id = "myChart";
  let canv1 = document.createElement("canvas");
  canv1.id = "myChart1";

function getYesterday() {
  let urlYesterday =
    "https://api.nasa.gov/neo/rest/v1/feed?start_date=" +
    lastWeekYesterday +
    "&end_date=" +
    yesterday +
    "&api_key=DEMO_KEY";



  document.body.appendChild(canv1); // adds the canvas to the body element
  document.getElementById("chartWindows").appendChild(canv1); // adds the canvas to #someBox

  const xIdsYest = [];
  const xKmYest = [];

  this.loading.style.display = "block";
  fetch(urlYesterday)
    .then(res => res.json())
    .then(data => {
      for (let i = 0; i < data.near_earth_objects[yesterday].length; i++) {
        let obj = data.near_earth_objects[yesterday][i];

        let astId = obj.id;
