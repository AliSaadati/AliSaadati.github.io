    dropdownmenu = document.querySelector(".dropdown");
    var strokes = document.querySelectorAll(".strokes")
        , icon = document.querySelector(".hamburger")
        , dropdownmenu = document.querySelector(".dropdown")
        , dropdownResume = document.querySelector("#dropdown-r");
    var mq = window.matchMedia("(min-width: 710px)");

    function toggleHamburger() {
        if (dropdownmenu.classList.contains("show")) {
            dropdownResume.nextElementSibling.classList.remove("show-rsm");
        }
        strokes[0].classList.toggle("animate0");
        strokes[1].classList.toggle("hide");
        strokes[2].classList.toggle("animate2");
        dropdownmenu.classList.toggle("show");
    }

    function closeHamburger() {
        dropdownmenu.classList.remove("show");
        dropdownResume.nextElementSibling.classList.remove("show-rsm");
        strokes[0].classList.remove("animate0");
        strokes[1].classList.remove("hide");
        strokes[2].classList.remove("animate2");
    }
    (function () {
        function menuCheck() {
            if (mq.matches) {
                closeHamburger();
            }
        }

        function dropdownResumeCheck() {
            dropdownResume.nextElementSibling.classList.toggle("show-rsm");
        }
        window.addEventListener("resize", menuCheck);
        icon.addEventListener("click", toggleHamburger);
        dropdownResume.addEventListener("click", dropdownResumeCheck);
    })();
    window.onscroll = function () {
        closeHamburger();
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


document.addEventListener('click', function(event) {
   var hasParent = false;
    for(var node = event.target; node != document.body; node = node.parentNode)
    {
      if(node.className == 'navbar'){
        hasParent = true;
        break;
      }
    }
  if(!hasParent)
    closeHamburger();
});
 
document.addEventListener('touchstart', function(event) {
   var hasParent = false;
    for(var node = event.target; node != document.body; node = node.parentNode)
    {
      if(node.className == 'navbar'){
        hasParent = true;
        break;
      }
    }
  if(!hasParent)
    closeHamburger();
});





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