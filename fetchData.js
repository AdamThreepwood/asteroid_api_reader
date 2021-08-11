
let today = new Date().toISOString().slice(0, 10)
//let lastWeek = today

console.log(today)

function createDate(days, months, years) {
        var today = new Date();
        today.setDate(today.getDate() + days);
        today.setMonth(today.getMonth() + months);
        today.setFullYear(today.getFullYear() + years);
        return today;    
    }

let lastWeek = createDate(-6, 0, 0).toISOString().slice(0, 10)

console.log(lastWeek)

let url = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + lastWeek + '&end_date=' + today + '&api_key=DEMO_KEY'







let searchButton = document.querySelector("#search")


searchButton.addEventListener("click", ()=>{
  console.log("button pressed")
  getData()
  asteroidData()
})



async function getData(){
  fetch(url)
    .then(res => res.json()) 
    .then(data => {      
      
    
      console.log(data)
      asteroidData(data)

				})
}
      
      






async function asteroidData(data){
  for(var i=0;i < data.near_earth_objects[today].length; i++){
    var obj = data.near_earth_objects[today][i]
    
    
    let astID = obj.id;
    let astKm = obj.estimated_diameter.kilometers.estimated_diameter_max;
  
    
    console.log(obj.id)
    console.log(obj.estimated_diameter.kilometers.estimated_diameter_max)
    
    
    
    document.querySelector("#content").innerHTML += "<br>" + astKm + "km in diameter" ;
    
    

  }
}

