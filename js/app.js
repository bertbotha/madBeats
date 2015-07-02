// SAMPLES FROM HERE
// http://trisamples.com/808-trapstep-pack-vol-1/
// WHAT A LEKKER OKE

(function(){


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MAINZORS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var $audioArray = $('.beat');
var $app = angular.module('madBeats', ["ngTouch"]);
var $countDownTimer;

// bois dis nou angular ... awlraaght?

$app.controller('BeatsMachine', function($scope, $timeout, $interval){
	
	this.state = "ready";
	this.hasRepeated = false;
	this.player = "PlayerOne";
	this.audioIndex = 0;
	this.currentTime = 0;
	this.currentBeat = Array();

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// WHERE THE MAGIC HAPPENS
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	

	this.registerHit = function () {		

		$audio = $audioArray[this.audioIndex];
		$audio.volume = 0.5;

		// PLAYING (FIRST RUN)
		if(this.state == "DRUM!"){
			$('body').removeClass('up').addClass('down');
		//	$audio.pause();
			$audio.currentTime=0;
			$audio.play();
			this.currentBeat.push(this.currentTime);
			this.audioIndex ++;
			if(this.audioIndex > $('.beat').length-1){
				this.audioIndex = 0;
			}

		// READY TO START / IDLE
		} else if(this.state == "ready"){

			$this=this;
			this.state=3;
			$interval(function() {
			    $this.state--;
			    if($this.state == 0) {
			        $this.state = "DRUM!";
			        $this.startCountDown();
			    }
			}, 1000, 3);

		// REPLAY BEAT	
		} else if(this.state == "repeating"){

		}
	}

	this.hitOff = function () {
		if($('body').hasClass('down')){
			$('body').removeClass('down').addClass('up');
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	this.startCountDown = function(){

		var $totalTime = 1200; // time in milliseconds
		
		$this=this;
		$this.currentTime = $totalTime;
		$this.state= "DRUM!"; 
		$interval(function(){

			$this.currentTime--;			
			$widthPer = ($this.currentTime / $totalTime) * 100;
			$('#timeContainer').width($widthPer + '%');
			if($this.currentTime == 0){
				$this.state = "ready";
				console.log($this.currentBeat);
			}

		}, 1, $totalTime);

	}

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

})();