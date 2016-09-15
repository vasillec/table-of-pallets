$(function() {
	var currentIndex = $('div.active').index() + 1;
	$('.count-indicator').html('0'+currentIndex);
	$('#jumboCarousel').on('slid.bs.carousel', function() {
		currentIndex = $('#jumboCarousel div.active').index() + 1;
		$('.count-indicator').html('0'+currentIndex);
	});
});


$(function(){
	$img = $('.js-scroll-gray');
	$(window).scroll(function(){
		$img.each(function(){
			if(!$(this).hasClass('visibleColor') &&
				$(this).offset().top+($(this).height()/2)<=$(window).scrollTop() + $(window).height())
			{
				$(this).addClass('visibleColor');
				$(this).toggleClass('grayscale-off');
			}
		});
	});

	$('.js-hover-gray').hover(function() {
		$(this).find('img').toggleClass('grayscale-off');
	}, function() {
		$(this).find('img').toggleClass('grayscale-off');
	});
});


$colJsHeight = $('.col-js-height');
function colJsHeightFn () {
	if ($(window).width() >= '992'){
		$colJsHeight.each(function(){
			$(this).css('height', $(this).siblings().first().height());
		});
	}
	else{
		$colJsHeight.each(function(){
			$(this).css('height', 'auto');
		});
	}

}

$(function(){
	colJsHeightFn();
	$(window).on('resize', colJsHeightFn);

	$('#btn-play').on('click', function(event) {
		event.preventDefault();
		$('.video-jumbotron-title').hide();
		$('.video-wrap').append( '<iframe id="video-greetings" src="https://www.youtube.com/embed/w0RQA9TqX1o?autoplay=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>' );
	});
});



function HidePopUp(){
	$('#hide-layout, #popup').fadeOut(700);
}

$(function() {
	$('#showPopUp').on('click', function(event) {
		event.preventDefault();
		$('#hide-layout, #popup').fadeIn(600); 
	})
	$('#hide-layout').click(function() {
		$('#hide-layout, #popup').fadeOut(300); 
	})
})


$(document).ready(function(){
	$("#request-block-btn").on("click", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
		top = $(id).offset().top;
		$('body,html').stop().animate({scrollTop: top}, 1500);
	});
});

var regResponse = /^Ошибка\. (.*)$/;
var $modalResLabel = $("#modalResponseLabel");
var $modalResBody = $("#modalResponseBody");
var toggle = false;

$("#modalResponseButton").click(function(){
	if(toggle){
		  if($('#hide-layout').is(":visible")){
				HidePopUp();
			}
			$(".request-form").trigger('reset');
			$("#question-form").trigger('reset');
	}
});

function ShowModal(response) {
	if(response.indexOf('Ошибка') + 1) {
		toggle = false;
		$modalResLabel.html("Ошибка");
		$modalResBody.html(response.match(regResponse)[1]);
		$("#modalResponse").modal('show');
	}
	else{
		toggle = true;
		$modalResLabel.html("Отправленно");
		$modalResBody.html(response);
		$("#modalResponse").modal('show');
	}
}


$( function() {
	$(".request-form-static, .request-form-fixed").submit(function(){
		var form = $(this);
		var data = form.serialize();
		$.ajax({
			type: 'POST',
			url: '/php/subscribe.php',
			dataType: 'text',
			data: data,
			beforeSend: function(data) {
				form.find('input[type="submit"]').attr('disabled', true);
			},
			success: function(response){
				ShowModal(response);
			},
			error: function (xhr, ajaxOptions, thrownError) {
				ShowModal('Ошибка. ' + thrownError);
			},
			complete: function(data) {
				form.find('input[type="submit"]').prop('disabled', false);
			}
		});
		return false;
	});
});


$( function() {
	$("#question-form").submit(function(){
		var form = $(this);
		var data = form.serialize();
		$.ajax({
			type: 'POST',
			url: '/php/contact.php',
			dataType: 'html',
			data: data,
			beforeSend: function(data) {
				form.find('input[type="submit"]').attr('disabled', true);
			},
			success: function(response){
				ShowModal(response);
			},
			error: function (xhr, ajaxOptions, thrownError) {
				ShowModal('Ошибка. ' + thrownError);
			},
			complete: function(data) {
				form.find('input[type="submit"]').prop('disabled', false);
			}
		});
		return false;
	});
});



$.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
    // check for conditions and support for blob / arraybuffer response type
    if (window.FormData && ((options.dataType && (options.dataType == 'binary')) ||
    	(options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || 
    		(window.Blob && options.data instanceof Blob)))))
    {
    	return {
            // create new XMLHttpRequest
            send: function(_, callback){
		// setup all variables
		var xhr = new XMLHttpRequest(),
		url = options.url,
		type = options.type,
		// blob or arraybuffer. Default is blob
		dataType = options.responseType || "blob",
		data = options.data || null;

		xhr.addEventListener('load', function(){
			var data = {};
			data[options.dataType] = xhr.response;
		// make callback and send data
		callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
	});

		xhr.open(type, url, true);
		xhr.responseType = dataType;
		xhr.send(data);
	},
	abort: function(){
		jqXHR.abort();
	}
};
}
});



$(function() {

	$(".download-file").on("click", function (event) {
		event.preventDefault();
		var re = /.+\/(.+\.[a-zA-Z]+$)/;
		var href = $(this).attr('href');
		$.ajax({
			url:  href,
			type: "GET",
			dataType: 'binary',
			success: function(result) {
				var url = URL.createObjectURL(result);
				var $a = $('<a />', {
					'href': url,
					'download': href.match(re)[1],
					'text': "click"
				}).hide().appendTo("body")[0].click();
				setTimeout(function() {
					URL.revokeObjectURL(url);
				}, 10000);
			}
		});
	});
});




