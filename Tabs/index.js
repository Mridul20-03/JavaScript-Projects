//targeting all the butttons
const btns = document.querySelectorAll(".tab-btn");
//targeting about
const about = document.querySelector(".about");
//targeting content
const articles = document.querySelectorAll(".content");

//we will target about because it is the current container

about.addEventListener("click",function(e){
    
    //wherever we click that part of html will be printed
    //console.log(e.target);

    //if we click on btns than its id will be printed else undefined will be printed
    //console.log(e.target.dataset.id);
    const id = e.target.dataset.id;
    //if id exists
    if(id){
        //remove active from other buttons
        btns.forEach(function(btn){
            btn.classList.remove("active");
            e.target.classList.add("active");
        });
        //hide allthe aryicles
       articles.forEach(function(article){
            article.classList.remove("active");
       }); 
    const element = document.getElementById(id);
    element.classList.add("active");
    }
});
