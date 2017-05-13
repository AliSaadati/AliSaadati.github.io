/***** Declare Variables *****/
var strokes = document.querySelectorAll(".strokes")
    , hamburger = document.querySelector(".hamburger")
    , dropdownmenu = document.querySelector(".dropdown")
    , dropdownResume = document.querySelector("#dropdown-r")
    , resumeChevron = document.querySelector(".chevron")
    , mq = window.matchMedia("(min-width: 710px)");
/***** Toggle Mobile Menu *****/
function toggleHamburger() {
    if (dropdownmenu.classList.contains("show")) {
        dropdownResume.nextElementSibling.classList.remove("show-rsm");
    }
    strokes[0].classList.toggle("animate0");
    strokes[1].classList.toggle("hide");
    strokes[2].classList.toggle("animate2");
    dropdownmenu.classList.toggle("show");
}
/***** Close Mobile Menu *****/
function closeHamburger() {
    resumeChevron.classList.remove("rotate");    
    dropdownmenu.classList.remove("show");
    dropdownResume.nextElementSibling.classList.remove("show-rsm");
    strokes[0].classList.remove("animate0");
    strokes[1].classList.remove("hide");
    strokes[2].classList.remove("animate2");
}
/***** Check if browser window wider than ... ***/
function menuCheck() {
    if (mq.matches) {
        closeHamburger();
    }
}
/***** Check if resume from dropdown is selected *****/
function dropdownResumeCheck() {
    dropdownResume.nextElementSibling.classList.toggle("show-rsm");
    if (dropdownResume.nextElementSibling.classList.contains("show-rsm")) resumeChevron.classList.add("rotate");
    else resumeChevron.classList.remove("rotate");
}
/***** Check if element is descendent of navbar *****/
function navbarDescendent(event) {
    var hasParent = false;
    for (var node = event.target; node != document.body; node = node.parentNode) {
        if (node.className == 'navbar') {
            hasParent = true;
            break;
        }
    }
    if (!hasParent) closeHamburger();
}
/***** Add event handlers *****/
window.onscroll = function () {
    var mediaShown = document.getElementsByClassName('show-media');
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && mediaShown.length < 1) {
        var footerIcons = document.querySelectorAll(".media-wrapper");
        footerIcons[0].classList.add("show-media");
        var time = 0;
        for (let i = 0; i < footerIcons.length; i++) {
            setTimeout(function () {
                footerIcons[i].classList.add("show-media");
            }, time);
            time = time + 200;
        }
    }
};
window.addEventListener("resize", menuCheck);
dropdownResume.addEventListener("click", dropdownResumeCheck);
hamburger.addEventListener("click", toggleHamburger);
document.addEventListener('click', function (e) {
    navbarDescendent(e)
});
document.addEventListener('touchend', function (e) {
    navbarDescendent(e)
});
/***** text fly in effect *****/
//$('p').each(function(){
//            
//            var p = $(this),
//                spans = $('<span>' + p.text().split('').join('</span><span>') + '</span>'),
//                originalContent = p.html();
//                
//            p.height(p.height()).html(spans);
//            
//            var spanDimensions = $.map(spans, function(span){
//                return $(span).position();
//            });
//            
//            spans.css({
//                position: 'absolute',
//                top: -(p.offset().top + 100)
//            });
//            spans.css('font-size', '24px');
//            p.css('visibility', 'visible');
//            
//            setTimeout(function(){
//                
//                /* Wait a bit before we begin... */
//                
//                spans.each(function(i, span){
//                    
//                    $(span).css('left', Math.random() * p.width());
//                    
//                    setTimeout(function(){
//                        $(span).animate(spanDimensions[i], 400, !spans[i+1] && function(){
//                            p.html(originalContent);    
//                        });
//                    }, i * 10)
//                    
//                });
//                
//            }, 500);
//
//            
//        });