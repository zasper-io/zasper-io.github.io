// Animation
new WOW().init();

// Login Signup form slider
$(document).ready(function(){
	$('.login-sign-up-form-slider').owlCarousel({
	  margin: 40,
	  nav: false,
	  navText: ['<span class="material-icons">chevron_left</span>','<span class="material-icons">chevron_right</span>'],
	  loop: true,
	  dots: true,
	  center: false,
	  autoplay: false,
	  autoplayTimeout: 4000,
	  responsive: {
	    0: {
	      items: 1
	    },
	    768: {
	      items: 1
	    },
	    1199: {
	      items: 1
	    }
	  }
	});
});

// Team say slider
// $(document).ready(function(){
// 	$('.team-say-slider').owlCarousel({
// 	  margin: 0,
// 	  nav: false,
// 	  navText: ['<span class="material-icons">chevron_left</span>','<span class="material-icons">chevron_right</span>'],
// 	  loop: true,
// 	  dots: true,
// 	  center: false,
// 	  autoplay: false,
// 	  autoplayTimeout: 4000,
// 	  responsive: {
// 	    0: {
// 	      items: 1
// 	    },
// 	    768: {
// 	      items: 1
// 	    },
// 	    1199: {
// 	      items: 1
// 	    }
// 	  }
// 	});
// });

// Select option jquery
$(document).ready(function() {
  $('select').niceSelect();
});

function myFunction() {
	/* Get the text field */
	var copyText = document.getElementById("myInput");
	/* Select the text field */
	copyText.select();
	copyText.setSelectionRange(0, 99999); /* For mobile devices */
	 /* Copy the text inside the text field */
	navigator.clipboard.writeText(copyText.value);
}

new ClipboardJS('.btn');
