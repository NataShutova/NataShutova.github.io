//Параметры слайдера

$('.carousel-build').owlCarousel({
    loop: true,
    nav: true,
    smartSpeed: 700,
    navText: ['<div class="svg-arrow_left svg-arrow_left-dims"></div>', '<div class="svg-arrow_richt svg-arrow_richt-dims"></div>'],
    dots: false,
    items: 3,
    center: true,
    margin: 30
});

$('.carousel-plan').owlCarousel({
    loop: true,
    nav: true,
    smartSpeed: 700,
    navText: ['<div class="svg-arrow_left svg-arrow_left-dims"></div>', '<div class="svg-arrow_richt svg-arrow_richt-dims"></div>'],
    dots: false,
    items: 1,
    center: true,
    margin: 30
});

//Табы

$(document).ready(function() {
    $('.tab-item').not(':first').hide();
    $('.tabs-wrapper .tab').click(function() {
        $('.tabs-wrapper .tab').removeClass('active').eq($(this).index()).addClass('active');
        $('.tab-item').hide().eq($(this).index()).fadeIn()
    }).eq(0).addClass('active');
});

$(document).ready(function() {
    $('.docs-tab-item').not(':first').hide();
    $('.docs-tabs-wrapper .docs-tab').click(function() {
        $('.docs-tabs-wrapper .docs-tab').removeClass('active').eq($(this).index()).addClass('active');
        $('.docs-tab-item').hide().eq($(this).index()).fadeIn()
    }).eq(0).addClass('active');
});

//Выбор кол-ва комнат


$(document).ready(function() {
    $('.count-list').click(function() {
        $(".count-sq-in").remove();
        $(this).children(".count-sq").append( "<div class='count-sq-in'></div>" );
    })
});

// Попап

    
   
        PopUpHide();
   

    function PopUpShow(){
        $("#popup").show();
    }

    function PopUpHide(){
        $("#popup").hide();
    }

$(function($){
	$(document).click(function (e){
		var div = $(".popup-content"); 
		if (!div.is(e.target) 
		    && div.has(e.target).length === 0) { 
			$("#popup").hide();
		}
	});
});

//Плавный переход по якорям

 $(document).ready(function(){
    $("#menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});

//Наведение на квартиру

 $(document).ready(function(){
     $('.apart-card').mousemove(function(e){
        var X = e.pageX; // положения по оси X
        var Y = e.pageY; // положения по оси Y
         $("#tooltip").show();
         $(".apart-tooltip").css('top', e.clientY + 20).css('left', e.clientX + 20);
     }).mouseout(function() {
        $("#tooltip").hide();
});
 });

//Карта




function initialize() {   
var latlng = new google.maps.LatLng(53.339948,83.794994);
    var myOptions = {
      zoom: 15,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
		
		setMarkers(map, places);
  }  
  
  var places = [
            ['Барнаул',53.339948,83.794994],
    ];    
 
    function setMarkers(map, locations) {
		//Определяем область показа маркеров
		var latlngbounds = new google.maps.LatLngBounds();	
         
        var image = new google.maps.MarkerImage('img/iconhouse.svg',      
		new google.maps.Size(47, 59),      
      	new google.maps.Point(0,0),      
      	new google.maps.Point(0, 32)); 
         
         
         for (var i = 0; i < places.length; i++) {
            var myLatLng = new google.maps.LatLng(locations[i][1], locations[i][2]);
			latlngbounds.extend(myLatLng);
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map, 
                icon: image,  
                title: locations[i][0],
            }); 
         } 
    };