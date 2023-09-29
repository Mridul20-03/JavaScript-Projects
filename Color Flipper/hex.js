const hexValues = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
// #f15025
const button = document.getElementById('btn');
const color = document.querySelector(".color");

//generate random hex values
button.addEventListener('click',function(){
    let hexColor = '#';
    for(let i=0;i<=5;i++)
    {
        hexColor+=hexValues[Math.floor(Math.random()*16)];
    }
    color.textContent = hexColor;
    document.body.style.backgroundColor = hexColor;
})