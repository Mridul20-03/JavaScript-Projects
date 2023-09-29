const modelBtn = document.querySelector('.modal-btn');
const closeBtn = document.querySelector('.close-btn');
const modelOverlay = document.querySelector('.modal-overlay');


modelBtn.addEventListener('click',function(){
    modelOverlay.classList.add('open-modal');
});


closeBtn.addEventListener('click',function(){
    modelOverlay.classList.remove('open-modal'); 
});  