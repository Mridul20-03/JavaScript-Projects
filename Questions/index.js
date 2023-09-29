//Using Selectors inside the element

const question = document.querySelectorAll('.question');

question.forEach(function(qst){
    //it helps to get the specific btn of thhat question

    const btn = qst.querySelector('.question-btn');
    
    btn.addEventListener('click',function(){

    //if while seeing another question we should close the open question

    //similar to 1st
    //we need to select all the question 
    question.forEach(function(item){
        if(item !== qst){
            item.classList.remove('show-text');
        }
    });
        //qst represents the article
        //no need to use document 
        qst.classList.toggle('show-text');
    });
});



//Using traversing the Dom

/*
const questionBtns = document.querySelectorAll('.question-btn');

questionBtns.forEach(function(btn){
    btn.addEventListener('click',function(e){
        //console.log(e.currentTarget);

        //helps me to get parent of parent
        const question = e.currentTarget.parentElement.parentElement;

        question.classList.toggle('show-text');

    });
});
*/
