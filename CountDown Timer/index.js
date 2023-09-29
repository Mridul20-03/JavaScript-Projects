const months = [
    "January","Febuary","March","April","May","June","July","August","September","October","November","December",
];
const weekdays = [ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
//this will grab me all the hours,days,mins and sec class
const items = document.querySelectorAll(".deadline-format h4");
console.log(items);

//this gives current date
//let date = new Date();
//console.log(date);


//months are 0-index based
//hours is 0-23
//Date(year,month,date,hours,mins,sec)

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

//let date = new Date(2023,9,22,11,59,0);
const date = new Date(tempYear,tempMonth,tempDay+11,11,30,0);
console.log(date);


const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();

let month = date.getMonth();
month = months[month];
const dat = date.getDate();
let week = weekdays[date.getDay()];

giveaway.textContent = `giveaway ends on ${week}, ${dat} ${month} ${year} ${hours}: ${minutes}pm `;

//future time in millisecond

const futureTime = date.getTime();
console.log(futureTime);

// 1s - 1000ms
// 1m = 60s
// 1hr = 60min
// 1d = 24hr

function getRemainingTime(){
    const today = new Date().getTime();
    let rem = futureTime-today;

    //No of millisec in 1 day
    const oneDay = 24 * 60 * 60 * 1000
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    let days  = rem / oneDay;
    rem = rem % oneDay;
    days = Math.floor(days); 

    let hours = rem / oneHour;
    
    hours = Math.floor(hours);
    
    let mins = (rem % oneHour)/oneMinute;
    mins = Math.floor(mins);

    let secs = (rem%oneMinute)/1000;
    secs = Math.floor(secs);
    
    console.log(days,hours,mins,secs);
    //set values
    const values = [days,hours,mins,secs];
    


    function format(item){
        if(item<10){
            return item = `0${item}`;
        }
        return item;
    }
    items.forEach(function(item,index){
        item.innerHTML = format(values[index]);
    });

    if(rem<0)
    {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired"> sorry, this giveaway is expired</h4>`;
    }
}

//countdown so that seconds changes dynamically like a countdown
//we will call getRemainingTime every sec that's why 1000
let countdown = setInterval(getRemainingTime,1000);
getRemainingTime();
