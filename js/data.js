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
function allCircuits(){
    const URL = DOMAIN + "circuits.php"

    fetch(URL)
	.then(response=>response.json()) 
	//function to be called when promise is resolved

	.then(data=>{});
}

//Single Circuit specified by circuitID
function singleCircuit(circuitID){
    const URL = DOMAIN + `circuits.php?id=${circuitID}`

    fetch(URL)
	.then(response=>response.json()) 
	//function to be called when promise is resolved

	.then(data=>{});
}



//  CONSTRUCTORS
//All Constructors
function allConstructors(){
    const URL = DOMAIN + "constructors.php"

    fetch(URL)
	.then(response=>response.json()) 
	//function to be called when promise is resolved

	.then(data=>{});
}

//Single constructor specified by constructorID or constructorRef
function singleConstructor(specifier){
    const URL = specifier.isInteger() //Setting domain based on either ID(integer) or REF(not integer)
    ? DOMAIN + `constructors.php?id=${specifier}` 
    : DOMAIN + `constructors.php?ref=${specifier}`;

    fetch(URL)
	.then(response=>response.json()) 
	//function to be called when promise is resolved

	.then(data=>{});
}



//  DRIVERS
//All drivers
function allDrivers(){
    const URL = DOMAIN + "drivers.php"

    fetch(URL)
	.then(response=>response.json()) 
	//function to be called when promise is resolved

	.then(data=>{});
}

//Single driver specified by driverID or driverRef
function singleDriver(){
    const URL = specifier.isInteger() //Setting domain based on either ID(integer) or REF(not integer)
    ? DOMAIN + `drivers.php?id=${specifier}` 
    : DOMAIN + `drivers.php?ref=${specifier}`;

    fetch(URL)
	.then(response=>response.json()) 
	//function to be called when promise is resolved

	.then(data=>{});
}



//  RACE RESULTS
//Driver Race results specified by driverRef + season
function driverRaceResults(driverRef, season){
    const URL = DOMAIN + `driverResults.php?driver=${driverRef}&season=${season}`

    fetch(URL)
	.then(response=>response.json()) 
	//function to be called when promise is resolved

	.then(data=>{});
}

//Race results specified by constructorRef + season
function constructorRaceResults(constructorRef, season){
    const URL = DOMAIN + `constructorResults.php?constructor=${constructorRef}&season=${season}`

    fetch(URL)
	.then(response=>response.json()) 
	//function to be called when promise is resolved

	.then(data=>{});
}



//  RACES
//All Races specified by season
function allRacesForSeason(season){
    const URL = DOMAIN + `races.php?season=${season}`

    fetch(URL)
	.then(response=>response.json()) 
	//function to be called when promise is resolved

	.then(data=>{});
}

//Race specified by raceID
function singleRace(raceID){
    const URL = DOMAIN + `races.php?id=${season}`

    fetch(URL)
	.then(response=>response.json()) 
	//function to be called when promise is resolved

	.then(data=>{});
}



//  Results
//Results specified by raceID
function singleRaceResult(raceID){
    const URL = DOMAIN + `results.php?race=${raceID}`

    fetch(URL)
	.then(response=>response.json()) 
	//function to be called when promise is resolved

	.then(data=>{});
}

//Results for all races specified by season
function allRacesForSeason(season){
    const URL = DOMAIN + `results.php?season=${season}`

    fetch(URL)
	.then(response=>response.json()) 
	//function to be called when promise is resolved

	.then(data=>{});
}



//  Qualifying
//All Qualifying results specified by raceID
function qualifyingResultsForRaceID(raceID){
    const URL = DOMAIN + `qualifying.php?race=${raceID}`

    fetch(URL)
	.then(response=>response.json()) 
	//function to be called when promise is resolved

	.then(data=>{});
}

//All qualifying for all races specified by season
function qualifyingResultsForSeason(season){
    const URL = DOMAIN + `qualifying.php?season=${season}`

    fetch(URL)
	.then(response=>response.json()) 
	//function to be called when promise is resolved

	.then(data=>{});
}