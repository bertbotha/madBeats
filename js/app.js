(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MAINZORS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var $audio = $('#beat');

var $app = angular.module('madBeats', []);

$app.controller('BeatsMachine', function(){

	$audio[0].volume = 0.5;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WHERE THE MAGIC HAPPENS
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	$(window).keydown(function(){		
		$('body').removeClass('up').addClass('down');
		$audio[0].pause();
		$audio[0].currentTime=0;
		$audio[0].play();
	}).keyup(function(){		
		$('body').removeClass('down').addClass('up');		
	});

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

})();