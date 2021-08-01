let searchButton = document.querySelector("#search")


searchButton.addEventListener("click", ()=>{
  console.log("button pressed")
  sendApiRequest()
})



async function sendApiRequest(){
  let response = await fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-07-23&end_date=2021-07-30&api_key=DEMO_KEY');
  console.log(response)
  let data = await response.json();
  console.log(data);
  asteroidData(data);
}



function asteroidData(data){
  document.querySelector("#content").innerHTML = data.near_earth_objects["2021-07-30"][0].estimated_diameter.kilometers.estimated_diameter_max;

}
