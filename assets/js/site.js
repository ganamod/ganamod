jQuery(function($) {

	/**
	 * General variables
	 */
	var adminbarHeight = $('#wpadminbar').length > 0 ? $('#wpadminbar').height() : 0;
	var siteheaderHeight = $('.site-header').length > 0 ? $('.site-header').height() : 0;
	$(window).resize(function() {
		adminbarHeight = $('#wpadminbar').length > 0 ? $('#wpadminbar').height() : 0;
		siteheaderHeight = $('.site-header').length > 0 ? $('.site-header').height() : 0;
	});
    
	/**
	 * Site navigation
	 */
	$('.site-nav-toggler').on('click', function() {
		if ($('body').hasClass('open-site-nav')) {
			$('body').removeClass('open-site-nav').css('overflow', '');
			$('.site-overlay').remove();
		} else {
			$('body').addClass('open-site-nav').css('overflow', 'hidden');
			$('.site-nav').css('top', adminbarHeight);
			$('.site-nav').after('<div class="site-overlay"></div>');
		}
	});
	$('body').on('click', '.site-nav-closer, .site-overlay', function(e) {
		e.stopPropagation();
		$('body').removeClass('open-site-nav').css('overflow', '');
		$('.site-overlay').remove();
	});
	$('.site-nav li.menu-item-has-children').on('click', function(e) {
		e.stopPropagation();
		$(this).siblings().children('.sub-menu').slideUp(300);
		$(this).toggleClass('active').children('.sub-menu').slideToggle(300);
	});
	$('.site-nav a').on('click', function(e) {
		e.stopPropagation();
	});

	
	if ( location.hash ) {
		var hash = location.hash;
		if ( $('.table-of-contents a[href="' + hash + '"]').length > 0 ) {
			$('.tab-nav a').removeClass('active');
			$('.tab-pane').removeClass('active show');
			var id = $(hash).parents('.tab-pane').attr('id');
			$('a[href="#' + id + '"]').trigger('click');
			setTimeout(function() {
				$('html, body').animate({
			    	scrollTop: $(hash).offset().top - adminbarHeight - siteheaderHeight
			    }, 300);
			}, 2000);
		}
	}

	
	/**
	 * Login
	 */
	$('.form-comment').on('submit', function(e) {
		e.preventDefault();
		$form = $(this);
		$form.find('[type="submit"]').append('<svg class="ml-2 svg-6 spin icon" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"/></svg>');
		$form.find('.alert').remove();
		$.ajax({
			type: 'POST',
			url: ajax.ajax_url,
			data: $form.serialize(),
			success: function( data, textStatus, jqXHR ) {
				$form.find('[type="submit"]').find('.icon').remove();
				if( data.status == true ) {
					$form.append('<div class="alert alert-success">' + data.message + '</div>');
					$form.find('.form-control').val('');
					if( data.redirect ) {
						window.location.href = data.redirect;
					}
				} else {
					$form.append('<div class="alert alert-danger">' + data.message + '</div>');
				}
			},
			error: function( jqXHR, textStatus, errorThrown ) {
				alert( errorThrown );
			}
		});
	});

	/**
	 * Comment
	 */
	$('.comment .reply').on('click', function() {
	//$('.comment .comment-reply-link').on('click', function() {
		
		$('.form-comment').find('input[name="parent"]').remove();
		$('.form-comment').prepend('<input type="hidden" name="parent" value="' + $(this).data('parent') + '"/>');
		$('.form-comment').find('[name="comment"]').focus();
		$('html, body').animate({
			scrollTop: $('.form-comment').offset().top - adminbarHeight - siteheaderHeight
		}, 600);
	});

});

function convertToSlug(Text) {
    return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;
}

        let intervalId; // preserve intervalID so we can cancel it later
        let startTime; // preserve progressbar start time
        let continueFor = 5000; // X sec
        let interval = 10; // progressbar updte interval

        let wait =
            ms => new Promise(
                r => setTimeout(r, ms)
            );

        let repeat =
            (ms, func) => new Promise(
                r => (
                    intervalId = setInterval(func, ms),
                    wait(ms).then(r)
                )
            );
		/*
        window.onload = function() {
            let div = document.getElementById("div");
            let elem = document.getElementById("progress");
            let startTime = new Date().valueOf();

            div.hidden = true;

            // this function stop the repeats, when X sec is passed.
            let stop =
                () => new Promise(
                    r => r(setTimeout(() => {
                        clearInterval(intervalId);
                        elem.hidden = true;
                        div.hidden = false;
                    }, continueFor))
                );

            // this function repeats to calculate progress bar value, at every interval.
            repeat(intervalId, function() {
                let elapse = new Date().valueOf() - startTime;
                elem.value = elem.max * elapse / continueFor;
                console.log(elem.value);
            }).then(stop());
        };
		*/
