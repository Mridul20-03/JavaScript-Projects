//translate will shift img either left or right
//if we move left then we do -100% and for right 100%

const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');

let cnt = 2;

slides.forEach(function(slide,index){
    slide.style.left = `${index * 100}%`;
});

nextBtn.addEventListener('click',function(){
    cnt++;
    helper();
    console.log(cnt);
});

prevBtn.addEventListener('click',function(){
    cnt--;
    console.log(cnt);
    helper();
});

function helper()
{

    if(cnt === slides.length)
    {
        cnt=0;
    }
    else if(cnt < 0)
    {
        cnt = slides.length-1;
    }

//working with buttons
if(cnt < slides.length-1)
{
    nextBtn.style.display = 'block';
}
else
{
    nextBtn.style.display='none';
}

if(cnt > 0)
{
    prevBtn.style.display = 'block';
}
else{
    prevBtn.style.display = 'none';
}
    slides.forEach(function(slide){
        slide.style.transform = `translateX(-${cnt * 100}%)`;
    });
}
prevBtn.style.display = "none";