AOS.init();

// fixed scroll header
$(function() {
  let lastScroll = 0;
  
  $(window).on('scroll', function() {
    const scroll = $(this).scrollTop();

    // Header shift detection
    $('.header_navigation').toggleClass('shifted', scroll > lastScroll);
    lastScroll = scroll;

    // Header active / sticky toggle
    $('.header_navigation').toggleClass('active', scroll > 50);
    $('.header').toggleClass('sticky', scroll > 1);
  });
});


$(window).on("scroll", function () {
    if ($(this).scrollTop() > 50) {
        $(".header_style2").addClass("sticky");
    } else {
        $(".header_style2").removeClass("sticky");
    }
});

$('.navbar-brand, .mob_nav_trigger').click(function() {
    $('.popup_menu').toggleClass('open');
});
$('.popup_menu .close_btn').click(function() {
    $('.popup_menu').removeClass('open');
});

 
$(".design_box").hover(function() {
    var tab_id = $(this).data("tab");

    $(".design_box").removeClass("active");
    $(".design_image").removeClass("active"); 

    $(this).addClass("active");
    $("#" + tab_id).addClass("active");
}); 


// rera no. toggle effect
$('.rera_no').click(function() {
    $('.rera_no').toggleClass('active');
})
$(window).on('scroll', function() {
    $('.rera_no').removeClass('active');
});



// scroll to top footer
var btn = $('#button');
$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, '300');
});


// amenities slider code
//   $('.orizen-amenities-carousel').owlCarousel({
//     loop: true,
//     margin: 35,
//     center: true,
//     stagePadding: 200,
//     dots: true,
//     nav: false,
//     autoplay: true,
//     autoplayTimeout: 3500,
//     smartSpeed: 900,
//     responsive: {
//         0: {
//             items: 1
//         },
//         768: {
//             items: 1
//         },
//         1200: {
//             items: 1
//         }
//     }
// });

  if($('.client_logo_slider').length > 0){
var owl4 = $('.client_logo_slider'); 
owl4.owlCarousel({
    loop: true,
    margin: 35,
    center: false,
    stagePadding: 150,
    dots: true, 
    nav: false,
    autoplay: true,  
    mouseDrag: false,
    touchDrag: false,
    autoplayTimeout: 3000, // Duration before next slide starts
    autoplaySpeed: 3000,   // Speed of the actual slide transition
    smartSpeed: 3000,      // Ensures speed is consistent
    slideTransition: 'linear',
    autoplayHoverPause: false,
    items: 2,
    navText : ['<i class="fa-solid fa-chevron-left"></i>','<i class="fa-solid fa-chevron-right"></i>'],
    responsive: {
        0: {
            items: 1,
            stagePadding: 0,
            autoWidth: true,
        },
        480: {
            items: 2,
            stagePadding: 0,
        },
        768: {
            items: 2,
            stagePadding: 0,
        },
        991: {
            items: 3,
            stagePadding: 50,
        },
        1500: {
            items: 4
        }
    }
});  
  }

  if($('.orizen-amenities-carousel').length > 0){
  $('.orizen-amenities-carousel').owlCarousel({
    loop: true,
    margin: 35,
    center: true,
    stagePadding: 50,
    dots: true,
    nav: false,
    autoplay: true,
    autoplayTimeout: 3500,
    smartSpeed: 900,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1200: {
            items: 2
        }
    }
});
  }

  if($('.specification_slider').length > 0){
  $('.specification_slider').owlCarousel({
    loop: true,
    margin: 60,
    center: false,
    stagePadding: 0,
    dots: false,
    nav: true,
    autoplay: false,
    autoplayTimeout: 3500,
    smartSpeed: 900,
    navText : ['<i class="fa-solid fa-chevron-left"></i> Prev','Next <i class="fa-solid fa-chevron-right"></i>'],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 1
        },
        1200: {
            items: 2
        }
    }
});
  }


  if($('.overview_slider').length > 0){
    $('.overview_slider').owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        dots: true,
        nav: false,

        autoplay: true,
        autoplayTimeout: 4000,
        smartSpeed: 1000,

        animateOut: 'fadeOut',   // 👈 fade out current slide
        animateIn: 'fadeIn',     // 👈 fade in next slide

        mouseDrag: false,        // optional (recommended for smooth fade)
        touchDrag: false, 
    });
  }



  if($('.amenities-slider').length > 0){
$('.slick-slider').slick({
	arrows: true,
	dots:true,
	fade:false,
	loop:true,
	infinite:true,
    autoplay:true,
    autoplaySpeed: 5000, // 5 seconds
    speed: 800,
    initialSlide: 0,
    slidesToScroll: 1,
    slidesToShow: 1,
	centerMode: true,
	centerPadding: '400px',
	responsive: [
    {
      breakpoint: 1700,
      settings: {
        centerPadding: '250px',
      }
    },
    {
      breakpoint: 991,
      settings: {
        centerPadding: '100px',
        arrows: false
      }
    },
    {
      breakpoint: 767,
      settings: {
       centerPadding: '20px',
       autoplaySpeed: 2000,
       slidesToShow: 1,
    //   centerMode: true,
        arrows: false
      }
    }
  ]
});
  }

// JS + jQuery + GSAP
if ($(window).width() > 768) {

let mouseX = 0;
let mouseY = 0;

const cursor = document.querySelector(".cursor-arrow");

if(cursor){

    // Mouse Move
document.addEventListener("mousemove", function(e){

    gsap.to(cursor,{
        left: e.clientX,
        top: e.clientY,
        duration:0.12,
        ease:"power2.out"
    });

});

    const slider = document.querySelector(".slick-slider");
    const prevBtn = document.querySelector(".slick-prev");
    const nextBtn = document.querySelector(".slick-next");

    // Show on slider hover
    if(slider){

        slider.addEventListener("mouseenter", function(){
            cursor.classList.add("cursor-show");
        });

        slider.addEventListener("mouseleave", function(){
            cursor.classList.remove("cursor-show");
        });

    }

    // Prev
    if(prevBtn){

        prevBtn.addEventListener("mouseenter", function(){
            cursor.classList.add("cursor-prev");
            cursor.classList.remove("cursor-next");
        });

    }

    // Next
    if(nextBtn){

        nextBtn.addEventListener("mouseenter", function(){
            cursor.classList.add("cursor-next");
            cursor.classList.remove("cursor-prev");
        });

    }

}

}

// deisgn cutting slider code
$('.cutting-edge-carousel-2').owlCarousel({
  loop: true,
  margin: 10,
  dots: true,
  nav: false,
  autoplay: true,
  autoplayTimeout: 5000,
  smartSpeed: 1200,
  responsive: {
      0: {
          items: 1
      },
      768: {
          items: 1
      },
      1200: {
          items: 1
      }
  }
});


  $('.gallery-carousel-2').owlCarousel({
    loop: true,
    margin: 30,
    center: false,
    dots: true,
    nav: false,
    autoplay: false,
    autoplayTimeout: 3500,
    smartSpeed: 900,
    navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 1
        },
        1200: {
            items: 1
        }
    }
});


function counter() {
    $('.counter').each(function() {
        if ($(this).hasClass('start')) {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                if (($(this).text()) % 1 === 0) {
                    var decimalpoint = 0;
                } else {
                    var decimalpoint = ($(this).text()).toString().split(".")[1].length;
                }
                $(this).removeClass('start');
                $(this).animate({
                    Counter: $(this).text()
                }, {
                    duration: 4000,
                    easing: 'swing',
                    step: function(now) {
                        $(this).text(now.toFixed(decimalpoint).toLocaleString('en'));
                    }
                });
            }
        }
    });
}
$(document).on('ready', counter);
$(window).on('scroll', counter);



gsap.registerPlugin(ScrollTrigger);

let panels = gsap.utils.toArray(".ver_panel");

let tl = gsap.timeline({ 
  scrollTrigger:{
    trigger:".vertical",
    start:"top top",
    end:"+=" + (panels.length * window.innerHeight),
    scrub:true,
    pin:true,
    // markers:true
  }
});

panels.forEach((panel, i) => {

  if(i !== 0){
    
    tl.from(panel,{
      yPercent:115, 
      duration:1
    });

  }

});



// universal parallax 
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".parallax").forEach((section) => {
  let img = section.querySelector("img");

  gsap.fromTo(img,
    { yPercent: -20 },   // smaller, smoother start
    {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1, // smoothness (increase for more smooth)
        // markers: true
      }
    }
  );
});

if ($(window).width() > 991) {
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll(".together").forEach((section) => {

    if ($(section).height() > 1) {

      const horizontal = section.querySelector(".horizontal");
      const scrollContent = section.querySelector(".scroll-content");
      const anhide = section.querySelector(".anhide");
      const fixhead = section.querySelector(".fixhead");

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + (horizontal.scrollHeight * 0.5), // 🔥 faster
          scrub: true, // 🔥 smoother but fast
          pin: true,
        }
      });

      tl.to(scrollContent, { x: 0, ease: "none" });

      tl.to(anhide, { 
        x: -280, 
        opacity: 0,
        ease: "none"
      }, 0);

      tl.to(fixhead, { 
        y: 0, 
        opacity: 1,
        ease: "none"
      }, 0);

      tl.to(horizontal, { 
        y: () => -(horizontal.scrollHeight - window.innerHeight),
        ease: "none"
      }, 0.2);

    }

  });
}

gsap.registerPlugin(ScrollTrigger);

window.onload = function () {

    if (window.innerWidth > 768) {

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".dimension_section",
                start: "top 80%",
                end: "bottom 40%",
                scrub: true,
                // markers: true
            }
        });

        tl.fromTo(".scroll_text",
            {
                x: "10%",
                backgroundPosition: "100% 0%"
            },
            {
                x: "-35%",
                backgroundPosition: "0% 0%",
                ease: "none"
            }
        );

    }

};

gsap.registerPlugin(ScrollTrigger);

if (window.innerWidth > 768) {

    // every heading separate animation
    document.querySelectorAll(".heading").forEach((heading) => {

        function wrapTextNodes(node) {

            let html = "";

            node.childNodes.forEach(child => {

                // text node
                if (child.nodeType === 3) {
                    html += child.textContent.split("").map(char =>
                        char === " "
                        ? `<span>&nbsp;</span>`
                        : `<span>${char}</span>`
                    ).join("");
                }

                // keep <br>
                else if (child.nodeName === "BR") {
                    html += "<br>";
                }

                // keep other tags
                else {
                    html += child.outerHTML;
                }

            });

            node.innerHTML = html;
        }

        wrapTextNodes(heading);

        let spans = heading.querySelectorAll("span");

        gsap.from(spans, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.7)",

            scrollTrigger: {
                trigger: heading,
                start: "top 80%",
                toggleActions: "play reverse play reverse",
                // markers:true
            }
        });

    });

}



 gsap.from(".cta_box > img", {
    scale: 1.4,
    ease: "power1.out",
    scrollTrigger: {
        trigger: ".cta_section",
        start: "top bottom",
        end: "bottom bottom",
        // scrub: true,
        scrub: 3,
        // markers: true
    }
  }); 

//   gsap.from(".location_map", {
//     scale: .5,
//     ease: "power1.out",
//     scrollTrigger: {
//         trigger: ".location_section",
//         start: "top bottom",
//         end: "bottom bottom",
//         // scrub: true,
//         scrub: 3,
//         // markers: true
//     }
//   }); 

gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector(".marvel_section");
const box = document.querySelector(".bodx");

// calculate movement (top → bottom)
const moveDistance = section.offsetHeight - box.offsetHeight;

gsap.to(box, {
  y: moveDistance,   // 🔥 move down
  ease: "none",
  scrollTrigger: {
    trigger: section,
    start: "top 50%",
    end: "+=100%",   // scroll distance
    scrub: 1,
    //pin: true,
    // markers: true,
    invalidateOnRefresh: true
  }
});
 





