// JavaScript to dynamically calculate the remaining height for the f1 car background image
//ChatGPT was used to get a skeleton of this function
window.addEventListener('DOMContentLoaded', function() {
    const homeContentLength = document.querySelector('#home');
    const headerContentLength = document.querySelector('#homeNavbar')
    const image = document.querySelector('#f1CarBackground');
    const unacountedPaddingHomeAndNavbar = 16;
    
    // Get the height of the content above the image
    const contentHeight = homeContentLength.offsetHeight + headerContentLength.offsetHeight+unacountedPaddingHomeAndNavbar;
    
    
    const remainingHeight = window.innerHeight - contentHeight;
    
    // Set the image height to the remaining height
    image.style.height = `${remainingHeight}px`;
});

//Recalculate on based on a window resize
window.addEventListener('resize', function() {
    const homeContentLength = document.querySelector('#home');
    const headerContentLength = document.querySelector('#homeNavbar')
    const image = document.querySelector('#f1CarBackground');
    const unacountedPaddingHomeAndNavbar = 16;
    
   
    const contentHeight = homeContentLength.offsetHeight + headerContentLength.offsetHeight+unacountedPaddingHomeAndNavbar;
    
    // Calculate the remaining height (viewport height minus content height)
    const remainingHeight = window.innerHeight - contentHeight;
    
    // Set the image height to the remaining height
    image.style.height = `${remainingHeight}px`;
});

//Populates the races tables with data
function populateRaces(data){
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

        const tdResults = document.createElement('tr');
        tdResults.className = 'border border-black px-2 py-1 text-red-60';
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
