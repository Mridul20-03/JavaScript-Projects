// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels



// ********** set date ************
const date = document.getElementById('date');
const d = new Date();
date.innerHTML = d.getFullYear();

//********* close links **********
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

//If we have to calculate the size dynamically then we will not use this

/*navToggle.addEventListener('click',function(){
    linksContainer.classList.toggle('show-links');
});
*/


// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
navToggle.addEventListener("click",function(){
    //we get height=0 because we have set it in css it size=0, because by default we want to hide this links
    const contHeight = linksContainer.getBoundingClientRect().height;
    //console.log(contHeight);


    //it will show the height according to no of links
    const linksHeight = links.getBoundingClientRect().height;
    //console.log(linksHeight.height);

    if(contHeight === 0)
    {
        //we will dynamically set our height according to no of links dynamically
        linksContainer.style.height = `${linksHeight}px`;
    }
    else
    {
        linksContainer.style.height = 0;
    }
});


//******** fixed Navbar ********

// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.

const navBar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');
 
//scroll event
window.addEventListener('scroll',function(){
    //it print no of pixels the doc has been scrolled vertically

    const scrollHeight = window.pageYOffset;
    //console.log(window.pageYOffset);

    const navHeight = navBar.getBoundingClientRect().height;
    //console.log(navHeight);

    if(scrollHeight > navHeight){
        navBar.classList.add('fixed-nav');
    }
    else{
        navBar.classList.remove('fixed-nav');
    }
    if(scrollHeight > 600){
        topLink.classList.add('show-links');
    }
    else{
        topLink.classList.remove('show-links');
    }    
});


//******** Smooth Scroll ********

const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach(function(link){
    link.addEventListener('click',function(e){
        //preventDefault() prevent the default html functionality and will not allow href="#.." to work.
        e.preventDefault();

        //navigate to specific spot
        // slice extracts a section of a string without modifying original string

        //slice(1) gives the string froom index 1 to end
        const id = e.currentTarget.getAttribute("href").slice(1);
        //console.log(id);

        //this gives the specific spot name and it element
        const element = document.getElementById(id);
        
        //now we need its position
        //offsetTop - A Number, representing the top position of the element, in pixels


        let position = element.offsetTop;
        // console.log(position);

        //calculate the heights
        const navHeight = navBar.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = navBar.classList.contains('fixed-nav');

        position = position - navHeight;


        if(!fixedNav){
            position = position-navHeight;
        }

        if(navHeight > 82)
        {
            position = position + containerHeight;
        }
        window.scrollTo({
            left:0,
            top: position,
        });

        //while scrolling we should close the links container
        linksContainer.style.height = 0;
    });
});


