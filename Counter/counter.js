//set initial Count
let count = 0;

//select values and buttons
const value = document.getElementById('value');

//we get node list of all the buttons
const button = document.querySelectorAll('.btn');

//traversing each and every btn
button.forEach(function(btn) {
    btn.addEventListener('click',function(e){
        //which btn we clicked on
        const classes = e.currentTarget.classList;
        if(classes.contains('decrease')){
            count--;
        }
        else if(classes.contains('reset'))
        {
            count = 0;
        }
        else if(classes.contains('increase'))
        {
            count++;
        }

        if(count > 0)
        {
            value.style.color = 'green';
        }
        else if(count<0)
        {
            value.style.color = 'tomato';
        }
        else if(count===0)
        {
            value.style.color = 'blue';
        }
        value.textContent=count;
    });

});