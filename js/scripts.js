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
