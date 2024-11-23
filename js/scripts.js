// JavaScript to dynamically calculate the remaining height for the f1 car background background
//ChatGPT was used to get a skeleton of this function
//The window functions for the front page are below commented out, was getting an error for some reason
//Next to do is populate qualifying and results and open that side of the browse page


document.addEventListener('DOMContentLoaded', () => {
    const DOMAIN = "https://www.randyconnolly.com/funwebdev/3rd/api/f1/";
    //loading years
    const countrySelect = document.querySelector('#countriesSelector');
    //Populates the selection box with data all the way back to 1950 (last day of data)
    for(let i=2024; i>=1950; i--){
        const optionElement = document.createElement('option');
        optionElement.dataset.year = i;
        optionElement.textContent = `${i}`;
        countrySelect.appendChild(optionElement);
    }

    //Listener for selecting a season
    //Chat helped me with this, might want to research 'change' event so that we can use it
    countrySelect.addEventListener('change', e =>{
        //Getting year from dataset
        const selectedOption = e.target.selectedOptions[0];
        const year = selectedOption.dataset.year;
        //Establishing URL
        allRacesForSeason(year);
    })

    //Home button
    document.querySelector('#homeButton').addEventListener('click', e => {
        //removing and adding in case already on home page
        document.querySelector('#home').classList.remove('hidden');
        document.querySelector('#browse').classList.add('hidden');
        document.querySelector('#races').classList.add('hidden');
        document.querySelector('#f1CarBackground').classList.toggle('hidden');
    })

});




//This is giving an error so i'm just commenting it out for now, trying to get started with the events
//Should be fixed, recomment out if it contiues to break your code

//Recalculate on based on a window resize
function adjustBackgroundHeight() {
    const background = document.querySelector('#f1CarBackground');
    let contentHeight = 16;

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

window.addEventListener('resize', adjustBackgroundHeight);
document.addEventListener('DOMContentLoaded', adjustBackgroundHeight);


//Populates the races tables with data
function populateRaces(data){
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
        tdResults.textContent = 'Results';
        trElement.appendChild(tdResults);

        //Add to the table body 
        document.querySelector('#racesTableBody').appendChild(trElement);

    })
}

//Populates the qualifying table, sort data before using
function populateQualifying(data){
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
        tdName.textContent = d.driver.forename + d.driver.surname;
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
        document.querySelector('qualifyingTableBody').appendChild(trElement);

    })
}

//Populates the results table, sort before using
function populateResults(data){
    //Loop through all data
    forEach(d =>{

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
        tdName.textContent = d.driver.forename + d.driver.surname;
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
        document.querySelector('resultsTableBody').appendChild(trElement);

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
	.then(response=>response.json()) 
	// function to be called when promise is resolved

	.then(data=>{});
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
	// function to be called when promise is resolved

	.then(data=>{
		//hidden and revealing pages
		console.log(data);
		document.querySelector('#home').classList.toggle('hidden');
		document.querySelector('#browse').classList.toggle('hidden');
		document.querySelector('#races').classList.toggle('hidden');
		document.querySelector('#f1CarBackground').classList.toggle('hidden');
		//successfully populates the table
		populateRaces(data);
	});

}

//Race specified by raceID
 function singleRace(raceID){
    const URL = DOMAIN + `races.php?id=${season}`

    fetch(URL)
	.then(response=>response.json()) 
	// function to be called when promise is resolved

	.then(data=>{});
}



//  Results
//Results specified by raceID
 function singleRaceResult(raceID){
    const URL = DOMAIN + `results.php?race=${raceID}`

    fetch(URL)
	.then(response=>response.json()) 
	// function to be called when promise is resolved

	.then(data=>{});
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
	.then(response=>response.json()) 
	// function to be called when promise is resolved

	.then(data=>{});
}

//All qualifying for all races specified by season
 function qualifyingResultsForSeason(season){
    const URL = DOMAIN + `qualifying.php?season=${season}`

    fetch(URL)
	.then(response=>response.json()) 
	// function to be called when promise is resolved

	.then(data=>{});
}