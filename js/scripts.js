// JavaScript to dynamically calculate the remaining height for the f1 car background image
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
        usedYear = year;
        //Establishing URL
        const racesURL = DOMAIN + `races.php?season=${year}`;

        //Fetching race data then populating
        fetch(racesURL)
	        .then(response=>response.json()) 
	        //function to be called when promise is resolved
	        .then(data=>{
                //hidden and revealing pages
                document.querySelector('#home').classList.toggle('hidden');
                document.querySelector('#browse').classList.toggle('hidden');
                document.querySelector('#races').classList.toggle('hidden');
                //successfully populates the table
                populateRaces(data);
                localStorage.setItem('raceData', data);
                
            });
    });
    //not testing just writing some stuff, think it works. We can now pull off of localStorage
    const racesSelect = document.querySelector('#races');
    racesSelect.addEventListener('click', e => {
        document.querySelector('#race-results').classList.toggle('hidden');
        const raceID = e.target.dataset.id;
        qualifyingURL = DOMAIN + `qualifying.php?race=${raceID}`
        fetch(qualifyingURL)
            .then(response=>response.json())

            .then(data=>{
                localStorage.setItem('qualifyingData', data);
                populateQualifying(data);
            })
        resultsURL = DOMAIN + `results.php?race=${raceID}`;
        fetch(resultsURL)
            .then(response=>response.json())
            
            .then(data=> {
                localStorage.setItem('resultsData', data);
                populateResults(data);
            })


    })

});



//This is giving an error so i'm just commenting it out for now, trying to get started with the events
/*window.addEventListener('DOMContentLoaded', function() {
    const homeContentLength = document.querySelector('#home');
    const headerContentLength = document.querySelector('#homeNavbar')
    const image = document.querySelector('#f1CarBackground');
    const unacountedPaddingHomeAndNavbar = 16;
    
    // Get the height of the content above the image
    const contentHeight = homeContentLength.offsetHeight + headerContentLength.offsetHeight+unacountedPaddingHomeAndNavbar;
    
    
    const remainingHeight = window.innerHeight - contentHeight;
    
    // Set the image height to the remaining height
    image.style.height = `${remainingHeight}px`;

    
    }
});*/

//Recalculate on based on a window resize
/*window.addEventListener('resize', function() {
    const homeContentLength = document.querySelector('#home');
    const headerContentLength = document.querySelector('#homeNavbar')
    const image = document.querySelector('#f1CarBackground');
    const unacountedPaddingHomeAndNavbar = 16;
    
   
    const contentHeight = homeContentLength.offsetHeight + headerContentLength.offsetHeight+unacountedPaddingHomeAndNavbar;
    
    // Calculate the remaining height (viewport height minus content height)
    const remainingHeight = window.innerHeight - contentHeight;
    
    // Set the image height to the remaining height
    image.style.height = `${remainingHeight}px`;
});*/

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

//Populates the results table, sort before using
function populateResults(data){
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
