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


    constructorSelect()
    driverSelect()

    })

function driverSelect(){
    //Our buttons are loaded in dynamically, this approach uses event delegation
    document.addEventListener('click', e => {
        if (e.target && e.target.id === 'selectedDriverButton') {
            singleDriver(e.target.dataset.id);
            
        }
    });

    document.querySelector('#driver-x-close').addEventListener('click', e => {
        document.querySelector("#drivers").classList.add('hidden');
    })
    document.querySelector('#driver-close').addEventListener('click', e => {
        document.querySelector("#drivers").classList.add('hidden');
    })
}

function populateDriverRaceResults(data){
    console.log(data)
    console.log((JSON.parse(localStorage.getItem('resultsForSeason'))))
    document.querySelector('#driverTableBody').innerHTML = '';
    data.forEach(d => {

        //Create row element
        const driverElement = document.createElement('tr');
        driverElement.dataset.id = d.id;
        
        //Add each column element
        const driverRnd = document.createElement('td');
        driverRnd.className = 'border border-black px-2 py-1';
        driverRnd.textContent = d.round;
        driverElement.appendChild(driverRnd);

        const driverCircuitName = document.createElement('td');
        driverCircuitName.className = 'border border-black px-2 py-1';
        driverCircuitName.textContent = d.name;
        driverElement.appendChild(driverCircuitName)



        const driverPos = document.createElement('td');
        driverPos.className = 'border border-black px-2 py-1';
        driverPos.textContent = d.positionOrder;
        driverElement.appendChild(driverPos);

        const driverPoints = document.createElement('td');

        const resultID = d.resultId
        //console.log(resultID)

        const resultsData = (JSON.parse(localStorage.getItem('resultsForSeason')))
        //console.log(resultsData)

        
        for(let i =0; i<resultsData.length; i++)
            if (resultsData[i].id == resultID) {
                driverPoints.textContent = resultsData[i].points
                driverElement.appendChild(driverPoints);
            }

        /*
        const resultID = d.resultId;
        //console.log(resultID)
        //console.log(d.resultId)
        const resultsData = (JSON.parse(localStorage.getItem('resultsData')))
        //console.log(resultData)

        //if(resultID == resultData.id && resultData.driver.ref == d.driverRef){


        //let racePoints = (JSON.parse(localStorage.getItem('resultsData')).find(r=> r.id == d.resultId))
        //console.log(racePoints)
        //const race = raceData.find(r => r.id == raceID);
        //console.log(resultID)
        for(let i =0; i<resultsData.length; i++){
            
            if (resultsData[i].id == resultID) {
                console.log(`${resultsData[i].id} ${resultID}`)
                driverPoints.textContent = resultsData[i].points
                //console.log(resultsData[i].points)
            }
        }
*/
        //Add to the table body 
        document.querySelector('#driverTableBody').appendChild(driverElement);



        driverPoints.className = 'border border-black px-2 py-1';
        driverElement.appendChild(driverPoints);


 
    })
       
}

function populateDriverDetails(data){
   //document.querySelector('#driverInformation').innerHTML = '';
    let birthYear = ""
    document.querySelector('#driverInformation #driverName').textContent = `${data.forename} ${data.surname}`;
    document.querySelector('#driverInformation #driverDOB').textContent = `${data.dob}`;
    for(let i=0; i<4;i++){ //
        birthYear = birthYear.concat(data.dob[i])
    }

    document.querySelector('#driverInformation #driverAge').textContent = `${localStorage.getItem('selectedYear')-birthYear}`;
    document.querySelector('#driverInformation #driverNationality').textContent = `${data.nationality}`;
    document.querySelector('#driverInformation #driverURL').textContent = `${data.url}`;

   document.querySelector('#drivers').classList.remove('hidden');
}



function addFavorite(driver, constructor, circuit){
    const favoriteDrivers = JSON.parse(localStorage.getItem('favoriteDrivers')) || []; //Incase if there isn't any favorite drivers return an empty array
    const favoriteConstructors = JSON.parse(localStorage.getItem('favoriteConstructors')) || [];
    const favoriteCircuits = JSON.parse(localStorage.getItem('favoriteCircuits')) || [];

}

function populateCircuitDetails(data){
    document.querySelector('#circuitDetails #circuitName').textContent = `${data.name}`;
    document.querySelector('#circuitDetails #circuitLocation').textContent = `${data.location}`;
    document.querySelector('#circuitDetails #circuitCountry').textContent = `${data.country}`;
    document.querySelector('#circuitDetails #circuitURL').textContent = `${data.url}`;
}

function populateConstructorRaceResults(data){
    document.querySelector('#constructorTableBody').innerHTML = '';
    data.forEach(d => {

        //Create row element
        const constructorElement = document.createElement('tr');
        constructorElement.dataset.id = d.id;
        
        //Add each column element
        const constructorRnd = document.createElement('td');
        constructorRnd.className = 'border border-black px-2 py-1';
        constructorRnd.textContent = d.round;
        constructorElement.appendChild(constructorRnd);

        const constructorName = document.createElement('td');
        constructorName.className = 'border border-black px-2 py-1';
        constructorName.textContent = d.name;
        constructorElement.appendChild(constructorName)


        const constructorDriver = document.createElement('td');
        constructorDriver.className = 'border border-black px-2 py-1';
        constructorDriver.textContent = `${d.forename} ${d.surname}`;
        constructorElement.appendChild(constructorDriver);

        const constructorPos = document.createElement('td');
        constructorPos.className = 'border border-black px-2 py-1';
        constructorPos.textContent = d.positionOrder;
        constructorElement.appendChild(constructorPos);

    

        //Add to the table body 
        document.querySelector('#constructorTableBody').appendChild(constructorElement);
        document.querySelector('#constructor').classList.remove('hidden');
    })
}

function populateConstructorDetails(data){


  
    document.querySelector('#constructorName').textContent = `${data.name}`;
    document.querySelector('#constructorNationality').textContent = `${data.nationality}`;
    document.querySelector('#constructorURL').textContent = `${data.url}`;


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

function constructorSelect(){
    //Our buttons are loaded in dynamically, this approach uses event delegation
    document.addEventListener('click', e => {
        if (e.target.dataset && e.target.id === 'selectedConstructorButton') {
            const constructorID = e.target.dataset.id;

            singleConstructorID(constructorID);
            

        }
    });

    document.querySelector('#constructor-x-close').addEventListener('click', e => {
        document.querySelector("#constructor").classList.add('hidden');
    })
    document.querySelector('#constructor-close').addEventListener('click', e => {
        document.querySelector("#constructor").classList.add('hidden');
    })
}

function homeButtonAction(){
    document.querySelector('#homeButton').addEventListener('click', e => {
        //removing and adding in case already on home page
        document.querySelector('#home').classList.remove('hidden');
        document.querySelector('#browse').classList.add('hidden');
        document.querySelector('#races').classList.add('hidden');
        document.querySelector('#race-results').classList.add('hidden');
    })
}

function seasonSelectChange(){
    const seasonSelect = document.querySelector('#countriesSelector');

    seasonSelect.addEventListener('change', e =>{
        //Getting year from dataset
        const selectedOption = e.target.selectedOptions[0];
        const year = selectedOption.dataset.year;

        if(year){ // If year is not undefined
            localStorage.setItem('selectedYear', year);
        
            qualifyingResultsForSeason(year);
            allRacesForSeason(year);
            allResultsForSeason(year);
            
            
        }
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
    

    document.querySelector("#resultsDescription #raceName").textContent = `${race.name}`;
    document.querySelector("#resultsDescription #circuitName").textContent = `${race.circuit.name}`;

    const circuitLink = document.createElement('a');
    circuitLink.href = '#';
    circuitLink.style.color = 'white';
    circuitLink.style.textDecorationLine = 'underline';
    circuitLink.textContent = `${race.circuit.name} - See More`;
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
    document.querySelector('#racesSeason').textContent = `${localStorage.getItem('selectedYear')} Races`;
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
    data.forEach (d => {

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
        //Attach ID to ease with event handling
        tdName.dataset.id = d.driver.id;

        const buttonDriverName = document.createElement('button');
        buttonDriverName.className = 'text-custom-f1-red font-semibold hover:text-white';
        buttonDriverName.id = "selectedDriverButton"
        buttonDriverName.dataset.id = d.driver.id;
        buttonDriverName.style.color = 'white';
        buttonDriverName.style.textDecorationLine = 'underline';
        buttonDriverName.style.fontWeight = 'normal';
        buttonDriverName.textContent = `${d.driver.forename} ${d.driver.surname}`;

        tdName.appendChild(buttonDriverName);
        trElement.appendChild(tdName);


        const tdConst = document.createElement('td');
        tdConst.className = 'border border-black px-2 py-1';
        
        tdConst.dataset.id = d.constructor.id;

        const buttonConstructorSelect = document.createElement('button');
        buttonConstructorSelect.className = 'text-custom-f1-red font-semibold hover:text-white';
        buttonConstructorSelect.id = "selectedConstructorButton"
        buttonConstructorSelect.dataset.id = d.constructor.id;
        buttonConstructorSelect.style.color = 'white';
        buttonConstructorSelect.style.textDecorationLine = 'underline';
        buttonConstructorSelect.style.fontWeight = 'normal';
        buttonConstructorSelect.textContent = d.constructor.name;
        
        tdConst.appendChild(buttonConstructorSelect);
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
        
        //Attach ID to ease with event handling
        tdName.dataset.id = d.driver.id;
        trElement.appendChild(tdName);

        const buttonDriverName = document.createElement('button');
        buttonDriverName.className = 'text-custom-f1-red font-semibold hover:text-white';
        buttonDriverName.id = "selectedDriverButton"
        buttonDriverName.dataset.id = d.driver.id;
        buttonDriverName.style.color = 'white';
        buttonDriverName.style.textDecorationLine = 'underline';
        buttonDriverName.style.fontWeight = 'normal';
        buttonDriverName.textContent = `${d.driver.forename} ${d.driver.surname}`;

        tdName.appendChild(buttonDriverName);
        trElement.appendChild(tdName);

        const tdConst = document.createElement('td');
        tdConst.className = 'border border-black px-2 py-1';
        
        tdConst.dataset.id = d.constructor.id;

        const button = document.createElement('button');
        button.className = 'text-custom-f1-red font-semibold hover:text-white';
        button.id = "selectedConstructorButton"
        button.dataset.id = d.constructor.id;
        button.style.color = 'white';
        button.style.textDecorationLine = 'underline';
        button.style.fontWeight = 'normal';
        button.textContent = d.constructor.name;
        
        tdConst.appendChild(button);
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
 function singleConstructorID(constructorID){
    const URL = DOMAIN + `constructors.php?id=${constructorID}`;
    fetch(URL)
    .then(response =>response.json())
    .then(data => {
        
        if(!data.hasOwnProperty('error'))
        {


            populateConstructorDetails(data)

            constructorRaceResults(data.constructorRef, localStorage.getItem('selectedYear'));
        }
        else
            console.log(`The constructor ${constructorID} does not exist`);
    })
    .catch(error => {
        console.error('There has been a problem with the fetch operation:', error);
    });
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
 function singleDriver(driverID){
    const URL = DOMAIN + `drivers.php?id=${driverID}` 

    fetch(URL)
    .then(response =>response.json())
    .then(data => {
        
        if(!data.hasOwnProperty('error'))
        {
            populateDriverDetails(data);
            driverRaceResults(data.driverRef, localStorage.getItem('selectedYear'));
        }
        else
            console.log(`The driverID ${driverID} does not exist`);
    })
    .catch(error => {
        console.error('There has been a problem with the fetch operation:', error);
    });
}



//  RACE RESULTS
//Driver Race results specified by driverRef + season
 function driverRaceResults(driverRef, season){
    const URL = DOMAIN + `driverResults.php?driver=${driverRef}&season=${season}`

    console.log(URL)
    fetch(URL)
	.then(response=>response.json()) 
	// function to be called when promise is resolved

	.then(data=>{
        populateDriverRaceResults(data)
    });
}

//Race results specified by constructorRef + season
 function constructorRaceResults(constructorRef, season){
    const URL = DOMAIN + `constructorResults.php?constructor=${constructorRef}&season=${season}`

    fetch(URL)
	.then(response=>response.json()) 

	.then(data=>{
        populateConstructorRaceResults(data)
    });
}



//  RACES
//All Races specified by season
 function allRacesForSeason(season){
    const URL = DOMAIN + `races.php?season=${season}`

    let localRaceData = JSON.parse(localStorage.getItem('raceData')) || [];
    if(localRaceData.length === 0 || localRaceData[0].year != localStorage.getItem('selectedYear')){
        fetch(URL)
        .then(response=>response.json()) 
        //function to be called when promise is resolved
        .then(data=>{
            //hidden and revealing pages

            //successfully populates the table
            populateRaces(data);
            localStorage.setItem('raceData', JSON.stringify(data));
            
        });
    }
    else{
        
        document.querySelector('#home').classList.add('hidden');
        document.querySelector('#browse').classList.remove('hidden');
        document.querySelector('#races').classList.remove('hidden');
        //successfully populates the table
        populateRaces(localRaceData);
    }

}

//Race specified by raceID
 function singleRace(raceID){
    const URL = DOMAIN + `races.php?id=${raceID}`

    
    fetch(URL)
    .then(response=>response.json())

    .then(data=>{
        localStorage.setItem('qualifyingData', data);
        //populateQualifying(data);
    })

}



//  Results
//Results specified by raceID
 function singleRaceResult(raceID){
    const URL = DOMAIN + `results.php?race=${raceID}`

    fetch(URL)
    .then(response =>response.json())
    .then(data => {
        localStorage.setItem('resultsData', JSON.stringify(data));
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

    let localResultsForSeason = JSON.parse(localStorage.getItem('resultsForSeason')) || [];
    if((localResultsForSeason.length === 0 || localResultsForSeason[0].race.year != localStorage.getItem('selectedYear'))){
        fetch(URL)
        .then(response =>response.json())
        .then(data => {
            if(!data.hasOwnProperty('error'))
            {
                localStorage.setItem('resultsForSeason', JSON.stringify(data))
            }
            else
                console.log(`The season ${season} does not exist`);
        })
        .catch(error => {
            console.error('There has been a problem with the fetch operation:', error);
        });
    }

}



//  Qualifying
//All Qualifying results specified by raceID
 function qualifyingResultsForRaceID(raceID){
     
    let localQualifyingResultsForSeason = JSON.parse(localStorage.getItem('qualifyingResultsForSeason'));


    const race = localQualifyingResultsForSeason.filter(r => r.race.id == raceID);


    populateQualifying(race);
}

//All qualifying for all races specified by season
 function qualifyingResultsForSeason(season){
    const URL = DOMAIN + `qualifying.php?season=${season}`

    let localQualifyingResultsForSeason = JSON.parse(localStorage.getItem('qualifyingResultsForSeason')) || [];
    if(localQualifyingResultsForSeason.length === 0 || localQualifyingResultsForSeason[0].race.year != localStorage.getItem('selectedYear')){ // If the data is not already stored for the season

        fetch(URL)
        .then(response =>response.json())
        .then(data => {
            if(!data.hasOwnProperty('error'))
            {

                localStorage.setItem('qualifyingResultsForSeason', JSON.stringify(data))


                document.querySelector('#home').classList.add('hidden');
                document.querySelector('#browse').classList.remove('hidden');
                document.querySelector('#races').classList.remove('hidden');
            }
            else
                console.log(`The season ${season} does not exist`);
        })
        .catch(error => {
            console.error('There has been a problem with the fetch operation:', error);
        });
    }
}
