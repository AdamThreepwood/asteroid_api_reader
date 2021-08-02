let searchButton = document.querySelector("#search")


searchButton.addEventListener("click", ()=>{
  console.log("button pressed")
  getData()
})



async function getData(){
  fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-07-23&end_date=2021-07-30&api_key=DEMO_KEY')
    .then(res => res.json()) 
    .then(data => {
      console.log(data)
      
      
      
    })

}



function asteroidData(data){
  console.log(data)
  //document.querySelector("#content").innerHTML = data.near_earth_objects["2021-07-30"][0].estimated_diameter.kilometers.estimated_diameter_max;

}

