
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navbg = document.querySelector('.nav-bg');
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    navbg.classList.toggle('active');
});
var navlink=document.querySelectorAll('.select')
// var navlink=document.querySelectorAll('header nav a');
navlink.forEach(function(eachlink){
    eachlink.addEventListener('click',smoothScroll);
});
function smoothScroll(event){
    event.preventDefault();
    const targetId = event.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    const originalTop = Math.floor(targetSection.getBoundingClientRect().top) - 200;
    //console.log(originalTop);
    window.scrollBy({top:originalTop, left:0, behavior: 'smooth'});
}

window.addEventListener('load',function(){
    const posts = document.querySelectorAll('section');
    let postTops = [];
    let pageTop;
    let counter = 1;
    let preCounter = 1;
    let doneResizing;    

    resetPagePosition();
    //console.log(postTops);

    this.window.addEventListener('scroll',function(){
        pageTop = window.pageYOffset+250;
        //console.log(pageTop);
        if(pageTop>postTops[counter]){
            counter++;
            //console.log(`scrolling down ${counter}`);
        }
        else if(counter>1 && pageTop<postTops[counter-1]){
            counter--;
            //console.log(`scrolling up ${counter}`);
        }
        if(counter!=preCounter){
            navlinks.forEach(function(eachLink){
                eachLink.removeAttribute('class');
            });
            const thisLink = document.querySelector(`nav ul li:nth-child(${counter}) a`);
            thisLink.className = 'selected';
            preCounter=counter;
        }
    });

    window.addEventListener('resize',function(){
        clearTimeout(doneResizing);
        doneResizing = setTimeout(function(){
            //console.log('done resizing');
            resetPagePosition();
        },500);
    });
    function resetPagePosition(){
        postTops = [];
        posts.forEach(function(post){
            postTops.push(Math.floor(post.getBoundingClientRect().top + window.pageYOffset));
        });
        const pagePos = window.pageYOffset+250;
        counter=0;
        postTops.forEach(function(post){
            if(pagePos>post){
                counter++;
            }
        });
        navlinks.forEach(function(eachLink){
            eachLink.removeAttribute('class');
        });
        const thisLink = document.querySelector(`header nav:nth-child(${counter}) a`);
        thisLink.className = 'selected';
    }
});