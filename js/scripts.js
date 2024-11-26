/*
NOTE: For documentation purposes, CHATGPT was used to help refine documentation headers to more concise and specific information
*/

// Main DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // Adjust background heights on initial load
    adjustBackgroundHeightF1Car();
    adjustBackgroundHeightGradient();

    // Initialize season selector and its change event
    createSeasonSelector();
    seasonSelectChange();

    // Initialize race selection actions
    raceSelect();
    
    // Initialize home button actions
    homeButtonAction();

    // Initialize constructor and driver selection actions
    constructorSelect();
    driverSelect();

    // Load favorite buttons and their actions
    loadFavoriteButtons();
    favoriteButtonAction();

    // Initialize sorting buttons for tables
    reSortButtons();
});
// Resizing the backgrounds when the window is resized
window.addEventListener('resize', adjustBackgroundHeightGradient);
window.addEventListener('resize', adjustBackgroundHeightF1Car);


/**
 * Re-sorts the data in the specified table based on the button name provided.
 *
 * @param {string} buttonName - The name of the button that determines the sorting criteria.
 *                              Possible values are 'Pos', 'Name', 'Const', 'Q1', 'Q2', 'Q3', 'Pts'.
 * @param {string} table - The name of the table to be sorted. Possible values are 'qualifying' and 'results'.
 *
 * The function retrieves data from localStorage based on the table name, sorts it according to the button name,
 * and then populates the table with the sorted data.
 *
 * Sorting criteria:
 * - 'Pos': Sorts by position in ascending order.
 * - 'Name': Sorts by driver's surname and then by forename in ascending order.
 * - 'Const': Sorts by constructor's name in ascending order.
 * - 'Q1', 'Q2', 'Q3': Sorts by qualifying times in ascending order.
 * - 'Pts': Sorts by points in ascending order.
 *
 * The function calls `populateQualifying` or `populateResults` to update the table with the sorted data.
 */
function reSortAlgorithm(buttonName, table){
    let data
    if(table == 'qualifying')
        data = JSON.parse(localStorage.getItem('qualifyingResultsForRace'))
    else if(table == 'results')
        data = JSON.parse(localStorage.getItem('resultsData'))
    console.log(data)
    let sortedData = data;


    switch(buttonName){
        case 'Pos':
            sortedData.sort((a, b) => a.position - b.position);
            break;
        case 'Name':
            sortedData.sort((a, b) => a.driver.surname.localeCompare(b.driver.surname));
            sortedData.sort((a, b) => a.driver.forename.localeCompare(b.driver.forename));
            break;
        case 'Const':
            sortedData.sort((a, b) => a.constructor.name.localeCompare(b.constructor.name));
            break;
        case 'Q1':
            sortedData.sort((a, b) => {
                const timeToSeconds = (time) => {
                    const [minutes, seconds] = time.split(':');
                    return parseFloat(minutes) * 60 + parseFloat(seconds);
                };
                return timeToSeconds(a.q1) - timeToSeconds(b.q1);
            });
            break;
        case 'Q2':
            sortedData.sort((a, b) => {
                const timeToSeconds = (time) => {
                    const [minutes, seconds] = time.split(':');
                    return parseFloat(minutes) * 60 + parseFloat(seconds);
                };
                return timeToSeconds(a.q2) - timeToSeconds(b.q2);
            });
            break;
        case 'Q3':
            sortedData.sort((a, b) => {
                const timeToSeconds = (time) => {
                    const [minutes, seconds] = time.split(':');
                    return parseFloat(minutes) * 60 + parseFloat(seconds);
                };
                return timeToSeconds(a.q3) - timeToSeconds(b.q3);
            });
            break;
        case 'Pos':
            sortedData.sort((a, b) => a.position - b.position);
            break;
        case 'Pts':
            sortedData.sort((a, b) => a.points - b.points);
            break;
    }


    if(table == 'qualifying')
        populateQualifying(sortedData);

    if(table == 'results')
        populateResults(sortedData);
}


/**
 * Populates the favorite circuits table with data.
 *
 * This function takes an array of data and populates the table body
 * with id 'favoriteCircuitsTableBody' by creating and appending rows
 * for each item in the data array.
 *
 * @param {Array} data - An array of strings representing favorite circuits.
 */
function populateFavoriteCircuits(data){
    document.querySelector('#favoriteCircuitsTableBody').innerHTML = '';
    console.log(data)
    data.forEach(d => {

        //Create row element
        const circuitsElement = document.createElement('tr');
        
        //Add each column element
        const favoriteCircuitsName = document.createElement('td');
        favoriteCircuitsName.className = 'border border-black px-2 py-1';
        favoriteCircuitsName.textContent = d;
        circuitsElement.appendChild(favoriteCircuitsName);

        // Append the row to the table body
        document.querySelector('#favoriteCircuitsTableBody').appendChild(circuitsElement);
    })
}

/**
 * Populates the favorite constructors table with data.
 *
 * This function takes an array of constructor names and populates the table
 * body with rows containing these names. Each row is created dynamically
 * and appended to the table body with the id 'favoriteConstructorsTableBody'.
 *
 * @param {Array<string>} data - An array of constructor names to be displayed in the table.
 */
function populateFavoriteConstructors(data){
    document.querySelector('#favoriteConstructorsTableBody').innerHTML = '';
    console.log(data)
    data.forEach(d => {

        //Create row element
        const constructorElement = document.createElement('tr');
        
        //Add each column element
        const favoriteConstructorName = document.createElement('td');
        favoriteConstructorName.className = 'border border-black px-2 py-1';
        favoriteConstructorName.textContent = d;
        constructorElement.appendChild(favoriteConstructorName);

        // Append the row to the table body
        document.querySelector('#favoriteConstructorsTableBody').appendChild(constructorElement);
    })
}

/**
 * Populates the favorite drivers table with the provided data.
 *
 * @param {Array<string>} data - An array of favorite driver names.
 */
function populateFavoriteDrivers(data){
    document.querySelector('#favoriteDriversTableBody').innerHTML = '';
    data.forEach(d => {

        //Create row element
        const driverElement = document.createElement('tr');
        
        //Add each column element
        const favoriteDriverName = document.createElement('td');
        favoriteDriverName.className = 'border border-black px-2 py-1';
        favoriteDriverName.textContent = d;
        driverElement.appendChild(favoriteDriverName);

        // Append the row to the table body
        document.querySelector('#favoriteDriversTableBody').appendChild(driverElement);
    })
       
}

/**
 * Initializes event listeners for the favorite button and empty favorites button.
 * 
 * The favorite button toggles the visibility of the favorites section and populates it with
 * favorite drivers, constructors, and circuits from localStorage.
 * 
 * The empty favorites button clears the favorite drivers, constructors, and circuits from
 * localStorage and updates the favorites section accordingly.
 */
function favoriteButtonAction(){
    document.querySelector('#favoriteButton').addEventListener('click', e => {
        


        const favoriteDrivers = JSON.parse(localStorage.getItem('favoriteDrivers')) || [];
        const favoriteConstructors = JSON.parse(localStorage.getItem('favoriteConstructors')) || [];
        const favoriteCircuits = JSON.parse(localStorage.getItem('favoriteCircuits')) || [];

        populateFavoriteDrivers(favoriteDrivers);
        populateFavoriteConstructors(favoriteConstructors);
        populateFavoriteCircuits(favoriteCircuits);

        document.querySelector('#favorites').classList.toggle('hidden');  
    })

    document.querySelector('#emptyFavoritesButton').addEventListener('click', e => {
        localStorage.setItem('favoriteDrivers', JSON.stringify([]));
        localStorage.setItem('favoriteConstructors', JSON.stringify([]));
        localStorage.setItem('favoriteCircuits', JSON.stringify([]));

        populateFavoriteDrivers(JSON.parse(localStorage.getItem('favoriteDrivers')))
        populateFavoriteConstructors(JSON.parse(localStorage.getItem('favoriteConstructors')))
        populateFavoriteCircuits(JSON.parse(localStorage.getItem('favoriteCircuits')))

        rePopulateResultsPage()

    })
}

/**
 * Initializes event listeners for favorite buttons and handles the addition of favorite drivers, constructors, and circuits.
 * 
 * - Adds a click event listener to the favorite drivers button to add the selected driver to the favorites list,
 *   update the results and qualifying data, and log the favorite drivers to the console.
 * - Adds a click event listener to the add constructor favorite button to add the selected constructor to the favorites list,
 *   update the results and qualifying data, and log the favorite constructors to the console.
 * - Adds a click event listener to the favorite circuits button to add the selected circuit to the favorites list
 *   and log the favorite circuits to the console.
 * - Adds a click event listener to the close button to hide the favorites section.
 */
function loadFavoriteButtons(){
    document.querySelector('#favoriteDriversButtons').addEventListener('click', e => {
        let driverName = document.querySelector('#drivers #driverName').textContent
        addFavoriteDriver(driverName)

        rePopulateResultsPage()

        console.log(JSON.parse(localStorage.getItem('favoriteDrivers')))
    })

    document.querySelector('#addConstructorFavorite').addEventListener('click', e => {
        let constructorName = document.querySelector('#constructor #constructorName').textContent
        addFavoriteConstructor(constructorName)
        rePopulateResultsPage()
        console.log(JSON.parse(localStorage.getItem('favoriteConstructors')))
    })

    document.querySelector('#favoriteCircuitsButtons').addEventListener('click', e => {
        let circuitName = document.querySelector('#circuit #circuitName').textContent
        addFavoriteCircuit(circuitName)
        console.log(JSON.parse(localStorage.getItem('favoriteCircuits')))
    })

    document.querySelector('#favorite-x-close').addEventListener('click', e => {
        document.querySelector("#favorites").classList.add('hidden');
    })
}

/**
 * Re-populates the results page with data from local storage.
 * 
 * This function retrieves the 'resultsData' and 'qualifyingResultsForRace' 
 * from local storage, parses them as JSON, and then uses them to populate 
 * the results and qualifying sections of the page.
 * 
 */
function rePopulateResultsPage(){
    populateResults(JSON.parse(localStorage.getItem('resultsData')))
    populateQualifying(JSON.parse(localStorage.getItem('qualifyingResultsForRace')))
}

/**
 * Initializes event listeners for driver selection and closing the driver details.
 * 
 * This function sets up event delegation to handle clicks on dynamically loaded buttons
 * with the id 'selectedDriverButton'. When such a button is clicked, it calls the 
 * `singleDriver` function with the button's data-id attribute.
 * 
 * Additionally, it sets up an event listener on the element with id 'driver-x-close'
 * to hide the driver details section when clicked.
 */
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
}

/**
 * Populates the driver race results table with the provided data.
 * 
 * @param {Array} data - An array of objects containing driver race results.
 * @param {number} data[].id - The unique identifier for the driver.
 * @param {number} data[].round - The round number of the race.
 * @param {string} data[].name - The name of the circuit.
 * @param {number} data[].positionOrder - The finishing position of the driver.
 * @param {number} data[].resultId - The unique identifier for the race result.
 */
function populateDriverRaceResults(data){
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

        const resultsData = (JSON.parse(localStorage.getItem('resultsForSeason')))
        
        for(let i =0; i<resultsData.length; i++)
            if (resultsData[i].id == resultID) {
                driverPoints.textContent = resultsData[i].points
                driverElement.appendChild(driverPoints);
            }

        //Add to the table body 
        document.querySelector('#driverTableBody').appendChild(driverElement);



        driverPoints.className = 'border border-black px-2 py-1';
        driverElement.appendChild(driverPoints);


 
    })
       
}

/**
 * Populates the driver details in the HTML elements with the provided data.
 *
 * @param {Object} data - The driver data object.
 * @param {string} data.forename - The forename of the driver.
 * @param {string} data.surname - The surname of the driver.
 * @param {string} data.dob - The date of birth of the driver in YYYY-MM-DD format.
 * @param {string} data.nationality - The nationality of the driver.
 * @param {string} data.url - The URL of the driver's profile or related information.
 */
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



/**
 * Adds a driver to the list of favorite drivers stored in localStorage.
 * If the driver is already in the list, it will not be added again.
 *
 * @param {string} driver - The name of the driver to add to the favorites list.
 */
function addFavoriteDriver(driver){
    const favoriteDrivers = JSON.parse(localStorage.getItem('favoriteDrivers')) || []; //Incase if there isn't any favorite drivers return an empty array

    if(!favoriteDrivers.includes(driver)){
        favoriteDrivers.push(driver);
    }
    localStorage.setItem('favoriteDrivers', JSON.stringify(favoriteDrivers));

}

/**
 * Adds a constructor to the list of favorite constructors stored in localStorage.
 * If the constructor is already in the list, it will not be added again.
 *
 * @param {string} constructor - The name of the constructor to add to the favorites list.
 */
function addFavoriteConstructor(constructor){
    const favoriteConstructors = JSON.parse(localStorage.getItem('favoriteConstructors')) || [];

    if(!favoriteConstructors.includes(constructor)){
        favoriteConstructors.push(constructor);
    }
    localStorage.setItem('favoriteConstructors', JSON.stringify(favoriteConstructors));
} 

/**
 * Adds a circuit to the list of favorite circuits stored in localStorage.
 * If the circuit is already in the list, it will not be added again.
 *
 * @param {string} circuit - The name of the circuit to add to the favorites list.
 */
function addFavoriteCircuit(circuit){
    const favoriteCircuits = JSON.parse(localStorage.getItem('favoriteCircuits')) || [];

    if(!favoriteCircuits.includes(circuit)){
        favoriteCircuits.push(circuit);
    }
    localStorage.setItem('favoriteCircuits', JSON.stringify(favoriteCircuits));


}

/**
 * Populates the circuit details in the DOM with the provided data.
 *
 * @param {Object} data - The data object containing circuit details.
 * @param {string} data.name - The name of the circuit.
 * @param {string} data.location - The location of the circuit.
 * @param {string} data.country - The country where the circuit is located.
 * @param {string} data.url - The URL of the circuit.
 */
function populateCircuitDetails(data){
    document.querySelector('#circuitDetails #circuitName').textContent = `${data.name}`;
    document.querySelector('#circuitDetails #circuitLocation').textContent = `${data.location}`;
    document.querySelector('#circuitDetails #circuitCountry').textContent = `${data.country}`;
    document.querySelector('#circuitDetails #circuitURL').textContent = `${data.url}`;
}

/**
 * Populates the constructor race results table with the provided data.
 *
 * @param {Array} data - An array of objects representing the constructor race results.
 * @param {number} data[].id - The unique identifier for the constructor.
 * @param {number} data[].round - The round number of the race.
 * @param {string} data[].name - The name of the constructor.
 * @param {string} data[].forename - The forename of the driver.
 * @param {string} data[].surname - The surname of the driver.
 * @param {number} data[].positionOrder - The finishing position of the constructor.
 */
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

/**
 * Populates the constructor details in the DOM.
 *
 * @param {Object} data - The constructor data.
 * @param {string} data.name - The name of the constructor.
 * @param {string} data.nationality - The nationality of the constructor.
 * @param {string} data.url - The URL of the constructor.
 */
function populateConstructorDetails(data){
    document.querySelector('#constructorName').textContent = `${data.name}`;
    document.querySelector('#constructorNationality').textContent = `${data.nationality}`;
    document.querySelector('#constructorURL').textContent = `${data.url}`;
}

/**
 * Handles the display of circuit details.
 * 
 * This function shows the circuit details section by removing the 'hidden' class
 * from the element with the ID 'circuit'. It also calls the `singleCircuit` function
 * with the provided circuitID to fetch and display the circuit details. Additionally,
 * it sets up an event listener on the close button to hide the circuit details section
 * when clicked.
 * 
 * @param {string} circuitID - The ID of the circuit to display details for.
 */
function circuitDetailHandler(circuitID){
    document.querySelector("#circuit").classList.remove('hidden');
    singleCircuit(circuitID);


    document.querySelector('#circuit-x-close').addEventListener('click', e => {
        document.querySelector("#circuit").classList.add('hidden');
    })
}

/**
 * Initializes event delegation for race selection buttons.
 * 
 * This function sets up an event listener on the document to handle clicks on dynamically loaded buttons
 * with the ID 'selectedRaceResultsButton'. When such a button is clicked, it retrieves the race ID from
 * the button's data attributes, stores it in localStorage, and calls functions to display the race results,
 * qualifying results, and race details.
 * 
 * @function raceSelect
 */
function raceSelect(){
    //Our buttons are loaded in dynamically, this approach uses event delegation
    document.addEventListener('click', e => {
        if (e.target && e.target.id === 'selectedRaceResultsButton') {
            
            const raceID = e.target.dataset.id;
            localStorage.setItem('currentSelectedRaceID', raceID);
            
            singleRaceResult(raceID);
            populateQualifying(qualifyingResultsForRaceID(raceID))
            populateRaceDetails(raceID)
        }
    });
}

/**
 * Initializes event listeners for dynamically loaded buttons and a close button.
 * 
 * This function sets up event delegation to handle clicks on buttons with the ID 
 * 'selectedConstructorButton'. When such a button is clicked, it retrieves the 
 * constructor ID from the button's dataset and calls the `singleConstructorID` 
 * function with that ID.
 * 
 * Additionally, it sets up an event listener on the close button with the ID 
 * 'constructor-x-close' to hide the constructor element when clicked.
 */
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
}

/**
 * Adds event listeners to the home button and F1 logo button.
 * When either button is clicked, the home section is displayed and other sections are hidden.
 */
function homeButtonAction(){
    document.querySelector('#homeButton').addEventListener('click', e => {
        //removing and adding in case already on home page
        document.querySelector('#home').classList.remove('hidden');
        document.querySelector('#browse').classList.add('hidden');
        document.querySelector('#races').classList.add('hidden');
        document.querySelector('#race-results').classList.add('hidden');
    })

    document.querySelector('#f1LogoButton').addEventListener('click', e => {
        //removing and adding in case already on home page
        document.querySelector('#home').classList.remove('hidden');
        document.querySelector('#browse').classList.add('hidden');
        document.querySelector('#races').classList.add('hidden');
        document.querySelector('#race-results').classList.add('hidden');
    })
}

/**
 * Initializes the event listener for the season selection dropdown.
 * When the selection changes, it retrieves the selected year's data from the dataset,
 * stores it in local storage, and triggers functions to fetch qualifying results,
 * all races, and all results for the selected season.
 */
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

/**
 * Populates a select element with options representing years from 2023 to 1950.
 * Each option element will have a data attribute 'year' set to the corresponding year.
 * The select element is identified by the ID 'countriesSelector'.
 */
function createSeasonSelector(){
    const seasonSelect = document.querySelector('#countriesSelector');
    //Populates the selection box with data all the way back to 1950 (last day of data)
    for(let i=2023; i>=1950; i--){
        const optionElement = document.createElement('option');
        optionElement.dataset.year = i;
        optionElement.textContent = `${i}`;
        seasonSelect.appendChild(optionElement);
    }
}

/**
 * Adjusts the height of the background element with the ID 'f1CarBackground'
 * to fill the remaining height of the window after accounting for the heights
 * of all preceding sibling elements.
 *
 * The function calculates the total height of all elements before the background
 * element in the DOM tree and subtracts this from the window's inner height to
 * determine the remaining height. It then sets the background element's height
 * to this remaining height.
 */
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

/**
 * Adjusts the height of the background gradient to fill the remaining
 * vertical space in the window after accounting for the height of the
 * home navigation bar.
 *
 * This function selects the background element with the ID 'gradientBackground'
 * and the home navigation bar element with the ID 'homeNavbar'. It calculates
 * the remaining height of the window after subtracting the height of the
 * navigation bar and sets this value as the height of the background element.
 */
function adjustBackgroundHeightGradient() {
    const background = document.querySelector('#gradientBackground');
    const homeNavbar = document.querySelector('#homeNavbar');
    let contentHeight = homeNavbar.offsetHeight;

    const remainingHeight = window.innerHeight - contentHeight;

    // Set the background height to the remaining height
    background.style.height = `${remainingHeight}px`;
}

/**
 * Attaches click event listeners to various table headers for sorting purposes.
 * When a header is clicked, it triggers the reSortAlgorithm function with the
 * header's text content and the corresponding category ("qualifying" or "results").
 * 
 * Headers for "qualifying" category:
 * - #qualifyingPosHeader
 * - #qualifyingNameHeader
 * - #qualifyingConstHeader
 * - #qualifyingQ1Header
 * - #qualifyingQ2Header
 * - #qualifyingQ3Header
 * 
 * Headers for "results" category:
 * - #resultsPosHeader
 * - #resultsNameHeader
 * - #resultsConstHeader
 * - #resultsLapsHeader
 * - #resultsPtsHeader
 */
function reSortButtons(){
    document.querySelector('#qualifyingPosHeader').addEventListener('click', e => {
        console.log("Pos Clicked")

        reSortAlgorithm(e.target.textContent, "qualifying")
    })

    document.querySelector('#qualifyingNameHeader').addEventListener('click', e => {
        console.log("Name Clicked")
        reSortAlgorithm(e.target.textContent, "qualifying")
    })

    document.querySelector('#qualifyingConstHeader').addEventListener('click', e => {
        console.log("Const Clicked")
        reSortAlgorithm(e.target.textContent, "qualifying")
    })

    document.querySelector('#qualifyingQ1Header').addEventListener('click', e => {
        console.log("Q1 Clicked")
        reSortAlgorithm(e.target.textContent, "qualifying")
    })

    document.querySelector('#qualifyingQ2Header').addEventListener('click', e => {
        console.log("Q2 Clicked")
        reSortAlgorithm(e.target.textContent, "qualifying")
    })

    document.querySelector('#qualifyingQ3Header').addEventListener('click', e => {
        console.log("Q3 Clicked")
        reSortAlgorithm(e.target.textContent, "qualifying")
    })

    document.querySelector('#resultsPosHeader').addEventListener('click', e => {
        console.log("Pos Clicked")

        reSortAlgorithm(e.target.textContent, "results")
    })

    document.querySelector('#resultsNameHeader').addEventListener('click', e => {
        console.log("Name Clicked")
        reSortAlgorithm(e.target.textContent, "results")
    })

    document.querySelector('#resultsConstHeader').addEventListener('click', e => {
        console.log("Const Clicked")
        reSortAlgorithm(e.target.textContent, "results")
    })

    document.querySelector('#resultsLapsHeader').addEventListener('click', e => {
        console.log("Laps Clicked")
        reSortAlgorithm(e.target.textContent, "results")
    })

    document.querySelector('#resultsPtsHeader').addEventListener('click', e => {
        console.log("Pts Clicked")
        reSortAlgorithm(e.target.textContent, "results")
    })
}

/**
 * Populates the race details in the DOM based on the provided race ID.
 *
 * @param {number} raceID - The ID of the race to populate details for.
 *
 * This function retrieves race data from localStorage, finds the race with the matching ID,
 * and updates the DOM elements with the race details including the race name, circuit name,
 * round, date, and URL. It also creates a clickable link for the circuit name that triggers
 * the circuitDetailHandler function when clicked.
 */
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

/**
 * Populates the races table with data.
 * 
 * This function sets the title of the races section to the selected season year,
 * clears any existing rows in the races table body, and then iterates over the 
 * provided data to create and append new rows to the table.
 * 
 * @param {Array} data - An array of race objects. Each object should have the following properties:
 *   @param {number} data[].id - The unique identifier for the race.
 *   @param {number} data[].round - The round number of the race.
 *   @param {string} data[].name - The name of the race.
 */
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

/**
 * Populates the qualifying table with the provided data.
 * 
 * @param {Array} data - An array of qualifying data objects.
 * @param {Object} data[].driver - The driver object.
 * @param {number} data[].driver.id - The ID of the driver.
 * @param {string} data[].driver.forename - The forename of the driver.
 * @param {string} data[].driver.surname - The surname of the driver.
 * @param {Object} data[].constructor - The constructor object.
 * @param {number} data[].constructor.id - The ID of the constructor.
 * @param {string} data[].constructor.name - The name of the constructor.
 * @param {number} data[].position - The qualifying position of the driver.
 * @param {string} data[].q1 - The Q1 time of the driver.
 * @param {string} data[].q2 - The Q2 time of the driver.
 * @param {string} data[].q3 - The Q3 time of the driver.
 */
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

        const favoriteDrivers = JSON.parse(localStorage.getItem('favoriteDrivers')) || [];
        if (favoriteDrivers.includes(`${d.driver.forename} ${d.driver.surname}`)) {
            tdName.style.backgroundColor = '#fe251b';
        }

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
        
        const favoriteConstructors = JSON.parse(localStorage.getItem('favoriteConstructors')) || [];
        if (favoriteConstructors.includes(d.constructor.name)) {
            tdConst.style.backgroundColor = '#fe251b';
        }
        
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

/**
 * Populates the winners' names in the HTML elements with IDs 'first', 'second', and 'third'.
 *
 * @param {Array} data - An array of objects containing driver information.
 * @param {Object} data[].driver - The driver object.
 * @param {string} data[].driver.forename - The forename of the driver.
 * @param {string} data[].driver.surname - The surname of the driver.
 */
function populateWinners(data){
    document.querySelector('#first h4').textContent = `${data[0].driver.forename} ${data[0].driver.surname}`;
    document.querySelector('#second h4').textContent = `${data[1].driver.forename} ${data[1].driver.surname}`;
    document.querySelector('#third h4').textContent = `${data[2].driver.forename} ${data[2].driver.surname}`;
}

/**
 * Populates the results table with race data.
 *
 * @param {Array} data - An array of race result objects.
 * @param {Object} data[].race - The race information.
 * @param {string} data[].race.year - The year of the race.
 * @param {string} data[].race.name - The name of the race.
 * @param {number} data[].id - The unique identifier for the result.
 * @param {number} data[].position - The position of the driver in the race.
 * @param {Object} data[].driver - The driver information.
 * @param {number} data[].driver.id - The unique identifier for the driver.
 * @param {string} data[].driver.forename - The forename of the driver.
 * @param {string} data[].driver.surname - The surname of the driver.
 * @param {Object} data[].constructor - The constructor information.
 * @param {number} data[].constructor.id - The unique identifier for the constructor.
 * @param {string} data[].constructor.name - The name of the constructor.
 * @param {number} data[].laps - The number of laps completed by the driver.
 * @param {number} data[].points - The points scored by the driver.
 */
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

        const favoriteDrivers = JSON.parse(localStorage.getItem('favoriteDrivers')) || [];
        if (favoriteDrivers.includes(`${d.driver.forename} ${d.driver.surname}`)) {
            tdName.style.backgroundColor = '#fe251b';
        }

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
        
        const favoriteConstructors = JSON.parse(localStorage.getItem('favoriteConstructors')) || [];
        if (favoriteConstructors.includes(d.constructor.name)) {
            tdConst.style.backgroundColor = '#fe251b';
        }

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

/*
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
    console.log(`QualifyingResultsForRaceID ${raceID}`)
    let localQualifyingResultsForSeason = JSON.parse(localStorage.getItem('qualifyingResultsForSeason'));

    let foundRaceResult = localQualifyingResultsForSeason.filter(r => r.race.id == raceID);
    
    localStorage.setItem('qualifyingResultsForRace', JSON.stringify(foundRaceResult))
    return foundRaceResult

    
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