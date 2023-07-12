// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, image) {
   // Here is the HTML formatting for our mission target div.
   let div = document.getElementById("missionTarget");
            div.innerHTML =`
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${image}">`;
}



function validateInput(testInput) {
   if (testInput === "") {
    return "Empty";
   } else if (isNaN(testInput)) {
    return "Not a Number";
   } else if (isNaN(testInput) === false) {
    return "Is a Number";
    }
   };


function formSubmission(document, list, pilot, copilot, fuelLevel, cargoStatus) {
    let pilotSub = document.getElementById("pilotStatus");
    let copilotSub = document.getElementById("copilotStatus");
    let fuelLevelSub = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");


    if (validateInput(pilot) === "Empty" || 
        validateInput(copilot) === "Empty" ||  
        validateInput(fuelLevel) === "Empty" || 
        validateInput(cargoStatus) === "Empty") {
        alert("All fields are required!");
    } else if (validateInput(pilot) === "Is a Number" ||
        validateInput(copilot) === "Is a Number" ||
        validateInput(fuelLevel) === "Not a Number" ||
        validateInput(cargoStatus) === "Not a Number") {
        alert("Please enter valid information.")
        } else {
            let launchStatus = document.getElementById("launchStatus")
            pilotSub.innerHTML = `Pilot ${pilot} is ready for launch.`;
            copilotSub.innerHTML = `Co-pilot ${copilot} is ready for launch.`;
                if (fuelLevel < 10000) {
                    list.style.visibility = "visible";
                    fuelLevelSub.innerHTML = "Fuel level too low for launch";
                    document.getElementById("launchStatus").style.color = rgb(199, 37, 78);
                    document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch"
                } else if (cargoStatus > 10000) {
                    list.style.visibility = "visible";
                    cargoStatus.innerHTML = "Cargo mass is too heavy for launch.";
                    launchStatus.style.color = rgb(199, 37, 78);
                    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
                } else {
                    launchStatus.style.color = "green";
                    launchStatus.innerHTML = "Shuttle is ready for launch."
                }
        }
}


async function myFetch() {
    let planetsReturned;
        planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
            if (response.status >= 400){
            throw new Error("Bad Response")
            } else {
             return response.json();
             }
          });
        return planetsReturned;
    }

function pickPlanet(planets) {
   index = Math.floor(Math.random()*planets.length);
   return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
