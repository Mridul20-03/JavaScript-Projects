//classList - shows/gets all the classes
//contains - checks classList for specific class
//add - add class
//remove - remove class
//toggle - toggle class

const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener('click',function(){
    //console.log(links.classList);
    //console.log(links.classList.contains('random'));
    //console.log(links.classList.contains('links'));
    
  /*  
    //show-links is present means toogle btn is clicked and links are shown to the user
    //so if user clicks again the toogle btn then it should be hidden
    if(links.classList.contains('show-links'))
    {
        links.classList.remove('show-links');
    }
    else
    {
        links.classList.add('show-links');
    }
*/
    //one liner solution
    links.classList.toggle('show-links');
});