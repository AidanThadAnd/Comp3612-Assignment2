// JavaScript to dynamically calculate the remaining height for the f1 car background background
//ChatGPT was used to get a skeleton of this function
//The window functions for the front page are below commented out, was getting an error for some reason
//Next to do is populate qualifying and results and open that side of the browse page

//Resizing the background
window.addEventListener('resize', adjustBackgroundHeightGradient);
window.addEventListener('resize', adjustBackgroundHeightF1Car);

//Main DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    adjustBackgroundHeightF1Car();
    adjustBackgroundHeightGradient();

    //season selector actions
    createSeasonSelector()
    seasonSelectChange();

    //Race select actions
    raceSelect();

    //Home button
    homeButtonAction();
    //NOTE: circuitDetailHandler is just calling a random circuit, we will be actually using this function when a user clicks on a circuit, this is only for testing
    //circuitDetailHandler(1)
    })


function populateCircuitDetails(data){
    document.querySelector('#circuitDetails #circuitName').textContent = `${data.name}`;
    document.querySelector('#circuitDetails #circuitLocation').textContent = `${data.location}`;
    document.querySelector('#circuitDetails #circuitCountry').textContent = `${data.country}`;
    document.querySelector('#circuitDetails #circuitURL').textContent = `${data.url}`;
}

function circuitDetailHandler(circuitID){
    document.querySelector("#circuit").classList.remove('hidden');
    singleCircuit(circuitID);


    document.querySelector('#circuit-x-close').addEventListener('click', e => {
        document.querySelector("#circuit").classList.add('hidden');
    })
    document.querySelector('#circuit-close').addEventListener('click', e => {
        document.querySelector("#circuit").classList.add('hidden');
    })
}

function raceSelect(){
    //Our buttons are loaded in dynamically, this approach uses event delegation
    document.addEventListener('click', e => {
        if (e.target && e.target.id === 'selectedRaceResultsButton') {
            
            const raceID = e.target.dataset.id;
            
            singleRaceResult(raceID);
            qualifyingResultsForRaceID(raceID);
            populateRaceDetails(raceID)

        }
    });
}

function homeButtonAction(){
    document.querySelector('#homeButton').addEventListener('click', e => {
        //removing and adding in case already on home page
        document.querySelector('#home').classList.remove('hidden');
        document.querySelector('#browse').classList.add('hidden');
        document.querySelector('#races').classList.add('hidden');
    })
}

function seasonSelectChange(){
    const seasonSelect = document.querySelector('#countriesSelector');
    seasonSelect.addEventListener('change', e =>{
        //Getting year from dataset
        const selectedOption = e.target.selectedOptions[0];
        const year = selectedOption.dataset.year;
        if(year) // If year is not undefined
            allRacesForSeason(year);
    });
}

function createSeasonSelector(){
    const seasonSelect = document.querySelector('#countriesSelector');
    //Populates the selection box with data all the way back to 1950 (last day of data)
    for(let i=2024; i>=1950; i--){
        const optionElement = document.createElement('option');
        optionElement.dataset.year = i;
        optionElement.textContent = `${i}`;
        seasonSelect.appendChild(optionElement);
    }
}




//Sets the height of the F1 car background to the bottom of the visable webpage
function adjustBackgroundHeightF1Car() {
    const background = document.querySelector('#f1CarBackground');
    let contentHeight = 112;

    // Get all elements before the background in the DOM tree
    let sibling = background.previousElementSibling;
    while (sibling) {
        contentHeight += sibling.offsetHeight;
        sibling = sibling.previousElementSibling;
    }

    const remainingHeight = window.innerHeight - contentHeight;

    // Set the background height to the remaining height
    background.style.height = `${remainingHeight}px`;
}

//Sets the height of the gradient background to the bottom of the visable webpage
function adjustBackgroundHeightGradient() {
    const background = document.querySelector('#gradientBackground');
    const homeNavbar = document.querySelector('#homeNavbar');
    let contentHeight = homeNavbar.offsetHeight;

    const remainingHeight = window.innerHeight - contentHeight;

    // Set the background height to the remaining height
    background.style.height = `${remainingHeight}px`;
}

function populateRaceDetails(raceID){

    const raceData = JSON.parse(localStorage.getItem('raceData'));
    const race = raceData.find(r => r.id == raceID);
    console.log(raceData)

    document.querySelector("#resultsDescription #raceName").textContent = `${race.name}`;
    document.querySelector("#resultsDescription #circuitName").textContent = `${race.circuit.name}`;
    
    const circuitLink = document.createElement('a');
    circuitLink.href = '#';
    circuitLink.textContent = `${race.circuit.name}`;
    circuitLink.addEventListener('click', () => {
        circuitDetailHandler(race.circuit.id);
    });

    document.querySelector("#resultsDescription #circuitName").innerHTML = '';
    document.querySelector("#resultsDescription #circuitName").appendChild(circuitLink);
    document.querySelector("#resultsDescription #circuitRound").textContent = `${race.round}`;
    document.querySelector("#resultsDescription #raceDate").textContent = `${race.date}`;
    document.querySelector("#resultsDescription #raceURL").textContent = `${race.url}`;

}

//Name, Round #, Year, Circuit Name, Date, URL

//Populates the races tables with data
function populateRaces(data){
    //Setting races title to Season year
    document.querySelector('#racesSeason').textContent = `${data[0].year} Races`;
    //Clear HTML for new data
    document.querySelector('#racesTableBody').innerHTML = '';
    data.forEach(d => {

        //Create row element
        const trElement = document.createElement('tr');
        trElement.dataset.id = d.id;
        
        //Add each column element
        const tdRnd = document.createElement('td');
        tdRnd.className = 'border border-black px-2 py-1';
        tdRnd.textContent = d.round;
        trElement.appendChild(tdRnd);

        const tdName = document.createElement('td');
        tdName.className = 'border border-black px-2 py-1';
        tdName.textContent = d.name;
        trElement.appendChild(tdName)

        const tdResults = document.createElement('td');
        tdResults.className = 'border border-black px-2 py-1 text-red-600';
        tdResults.dataset.id = d.id;
        
        
        const button = document.createElement('button');
        button.className = 'text-custom-f1-red font-semibold hover:text-white';
        button.id = "selectedRaceResultsButton"
        button.dataset.id = d.id;

        button.textContent = 'Results';
        
        tdResults.appendChild(button);
        trElement.appendChild(tdResults);

        //Add to the table body 
        document.querySelector('#racesTableBody').appendChild(trElement);

    })
}

//Populates the qualifying table, sort data before using
function populateQualifying(data){
    document.querySelector('#qualifyingTableBody').innerHTML = '';
    //Loop through all data
    data.forEach(d => {

        //Create row element
        const trElement = document.createElement('tr');
        trElement.dataset.id = d.id;
        
        //Add each column element
        const tdPos = document.createElement('td');
        tdPos.className = 'border border-black px-2 py-1';
        tdPos.textContent = d.position;
        trElement.appendChild(tdPos);
        
        const tdName = document.createElement('td');
        tdName.className = 'border border-black px-2 py-1';
        tdName.textContent = `${d.driver.forename} ${d.driver.surname}`;
        //Attach ID to ease with event handling
        tdName.dataset.id = d.driver.id;
        trElement.appendChild(tdName);

        const tdConst = document.createElement('td');
        tdConst.className = 'border border-black px-2 py-1';
        tdConst.textContent = d.constructor.name;
        tdConst.dataset.id = d.constructor.id;
        trElement.appendChild(tdConst);

        const tdQ1 = document.createElement('td');
        tdQ1.className = 'border border-black px-2 py-1';
        tdQ1.textContent = d.q1;
        trElement.appendChild(tdQ1);

        const tdQ2 = document.createElement('td');
        tdQ2.className = 'border border-black px-2 py-1';
        tdQ2.textContent = d.q2;
        trElement.appendChild(tdQ2);

        const tdQ3 = document.createElement('td');
        tdQ3.className = 'border border-black px-2 py-1';
        tdQ3.textContent = d.q3;
        trElement.appendChild(tdQ3);

        //Add to the table body 
        document.querySelector('#qualifyingTableBody').appendChild(trElement);

    })
}

function populateWinners(data){
    document.querySelector('#first h4').textContent = `${data[0].driver.forename} ${data[0].driver.surname}`;
    document.querySelector('#second h4').textContent = `${data[1].driver.forename} ${data[1].driver.surname}`;
    document.querySelector('#third h4').textContent = `${data[2].driver.forename} ${data[2].driver.surname}`;
}

//Populates the results table, sort before using
function populateResults(data){
    //Changing titles
    document.querySelector('#resultsTitle').textContent = `Results for ${data[0].race.year} ${data[0].race.name}`

    document.querySelector('#resultsTableBody').innerHTML = '';
    //Loop through all data
    data.forEach(d =>{

        //Create row element
        const trElement = document.createElement('tr');
        trElement.dataset.id = d.id;

        //Add each column element
        const tdPos = document.createElement('td');
        tdPos.className = 'border border-black px-2 py-1';
        tdPos.textContent = d.position;
        trElement.appendChild(tdPos);

        const tdName = document.createElement('td');
        tdName.className = 'border border-black px-2 py-1';
        tdName.textContent = `${d.driver.forename} ${d.driver.surname}`;
        //Attach ID to ease with event handling
        tdName.dataset.id = d.driver.id;
        trElement.appendChild(tdName);

        const tdConst = document.createElement('td');
        tdConst.className = 'border border-black px-2 py-1';
        tdConst.textContent = d.constructor.name;
        tdConst.dataset.id = d.constructor.id;
        trElement.appendChild(tdConst);

        const tdLaps = document.createElement('td');
        tdLaps.className = 'border border-black px-2 py-1';
        tdLaps.textContent = d.laps;
        trElement.appendChild(tdLaps);

        const tdPts = document.createElement('td');
        tdPts.className = 'border border-black px-2 py-1';
        tdPts.textContent = d.points;
        trElement.appendChild(tdPts);

        //Add to the table body 
        document.querySelector('#resultsTableBody').appendChild(trElement);

    })
}




//I put all of data.js here as I currently don't wanna figure out how to import the functions from there
/*
This is the JS that will be used to pull all available data from the various API endpoints
Preferablly all data retrieval will be done here so that the other file is much more cleaner/high level

The functions are seperated into the following categories in-order:
- Circuits
- Constructors
- Drivers
- Race Results
- Races
- Results
- Qualifying

This above follows the layout of the API spec page, except for constructorResults, which I placed in the race result category

TODO: 
- Add data parsing along with return statements to return properly formated data
- Add localStorage functionality to qualifyingResultsForSeason and allRacesForSeason
- Rename functions to something more standardized
*/


const DOMAIN = "https://www.randyconnolly.com/funwebdev/3rd/api/f1/"

//  CIRCUITS
//All Circuits


//Single Circuit specified by circuitID
 function singleCircuit(circuitID){
    const URL = DOMAIN + `circuits.php?id=${circuitID}`

    fetch(URL)
    .then(response =>response.json())
    .then(data => {
        if(!data.hasOwnProperty('error')) //Checking if the circuitID result exist
        {
            populateCircuitDetails(data);
        }
        else
            console.log(`The circuitID ${circuitID} does not exist`);
    })
    .catch(error => {
        console.error('There has been a problem with the fetch operation:', error);
    });
}



//  CONSTRUCTORS
//All Constructors
 function allConstructors(){
    const URL = DOMAIN + "constructors.php"

    fetch(URL)
	.then(response=>response.json()) 
	// function to be called when promise is resolved

	.then(data=>{});
}

//Single constructor specified by constructorID or constructorRef
 function singleConstructor(specifier){
    const URL = specifier.isInteger() //Setting domain based on either ID(integer) or REF(not integer)
    ? DOMAIN + `constructors.php?id=${specifier}` 
    : DOMAIN + `constructors.php?ref=${specifier}`;

    fetch(URL)
	.then(response=>response.json()) 
	// function to be called when promise is resolved

	.then(data=>{});
}



//  DRIVERS
//All drivers
 function allDrivers(){
    const URL = DOMAIN + "drivers.php"

    fetch(URL)
	.then(response=>response.json()) 
	// function to be called when promise is resolved

	.then(data=>{});
}

//Single driver specified by driverID or driverRef
 function singleDriver(){
    const URL = specifier.isInteger() //Setting domain based on either ID(integer) or REF(not integer)
    ? DOMAIN + `drivers.php?id=${specifier}` 
    : DOMAIN + `drivers.php?ref=${specifier}`;

    fetch(URL)
	.then(response=>response.json()) 
	// function to be called when promise is resolved

	.then(data=>{});
}



//  RACE RESULTS
//Driver Race results specified by driverRef + season
 function driverRaceResults(driverRef, season){
    const URL = DOMAIN + `driverResults.php?driver=${driverRef}&season=${season}`

    fetch(URL)
	.then(response=>response.json()) 
	// function to be called when promise is resolved

	.then(data=>{});
}

//Race results specified by constructorRef + season
 function constructorRaceResults(constructorRef, season){
    const URL = DOMAIN + `constructorResults.php?constructor=${constructorRef}&season=${season}`

    fetch(URL)
	.then(response=>response.json()) 
	// function to be called when promise is resolved

	.then(data=>{});
}



//  RACES
//All Races specified by season
 function allRacesForSeason(season){
    const URL = DOMAIN + `races.php?season=${season}`

    fetch(URL)
    .then(response=>response.json()) 
    //function to be called when promise is resolved
    .then(data=>{
        //hidden and revealing pages
        document.querySelector('#home').classList.toggle('hidden');
        document.querySelector('#browse').classList.toggle('hidden');
        document.querySelector('#races').classList.toggle('hidden');
        //successfully populates the table
        populateRaces(data);
        localStorage.setItem('raceData', JSON.stringify(data));
        
    });

}

//Race specified by raceID
 function singleRace(raceID){
    const URL = DOMAIN + `races.php?id=${raceID}`

    fetch(URL)
    .then(response=>response.json())

    .then(data=>{
        localStorage.setItem('qualifyingData', data);
        populateQualifying(data);
    })

}



//  Results
//Results specified by raceID
 function singleRaceResult(raceID){
    const URL = DOMAIN + `results.php?race=${raceID}`

    fetch(URL)
    .then(response =>response.json())
    .then(data => {
        localStorage.setItem('resultsData', data);
        if(!data.hasOwnProperty('error')) //Checking if the raceID results exist
        {
            document.querySelector('#race-results').classList.remove('hidden'); //Revealing the results page only if result data is found
            populateWinners(data);
            populateResults(data);
        }
        else
            console.log(`The raceID ${raceID} does not exist`);
    })
    .catch(error => {
        console.error('There has been a problem with the fetch operation:', error);
    });
}

//Results for all races specified by season
 function allResultsForSeason(season){
    const URL = DOMAIN + `results.php?season=${season}`

    fetch(URL)
	.then(response=>response.json()) 
	// function to be called when promise is resolved

	.then(data=>{});
}



//  Qualifying
//All Qualifying results specified by raceID
 function qualifyingResultsForRaceID(raceID){
    const URL = DOMAIN + `qualifying.php?race=${raceID}`

    fetch(URL)
    .then(response =>response.json())
    .then(data => {
        localStorage.setItem('qualifyingData', data);
        if(!data.hasOwnProperty('error')) //Checking if the raceID results exist
        {   
            populateQualifying(data);
        }
        else
            console.log(`The raceID ${raceID} does not exist`);
    })
    .catch(error => {
        console.error('There has been a problem with the fetch operation:', error);
    });
}

//All qualifying for all races specified by season
 function qualifyingResultsForSeason(season){
    const URL = DOMAIN + `qualifying.php?season=${season}`

    fetch(URL)
	.then(response=>response.json()) 
	// function to be called when promise is resolved

	.then(data=>{});
}