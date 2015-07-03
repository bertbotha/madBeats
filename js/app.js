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
	this.player = "1";
	this.audioIndex = 0;
	this.currentTime = 0;
	this.currentBeat = Array();
	this.hasSecondary = true;
	this.secondaryState = "Player 1";
	this.turnTime = 1200;

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
			this.currentBeat[this.player].push(this.currentTime);
			this.audioIndex ++;
			if(this.audioIndex > $('.beat').length-1){
				this.audioIndex = 0;
			}

		// READY TO START / IDLE
		} else if(this.state == "ready"){

			$this=this;
			this.state=3;
			this.hasSecondary = false;
			$interval(function() {
			    $this.state--;
			    if($this.state == 0) {
			        $this.state = "DRUM!";
			        $this.startCountDown();
			        $this.currentBeat[$this.player] = Array();
			        $this.currentBeat['verified'] = false;
			    }
			}, 1000, 3);

		// REPLAY BEAT	
		} else if(this.state == "let's see you"){

			$this=this;
			this.state=3;
			this.hasSecondary = false;
			$interval(function() {
			    $this.state--;
			    if($this.state == 0) {
			        $this.state = "DRUM!";
			        $this.startCountDown();
			    }
			}, 1000, 3);

		}
	}

	this.hitOff = function () {
		if($('body').hasClass('down')){
			$('body').removeClass('down').addClass('up');
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	this.showDrumTrack = function(){
		return(this.state == "DRUM!" && this.secondaryState == "do that again");
	}

	this.startCountDown = function(){

		$this=this;

		var $totalTime = this.turnTime; // time in milliseconds
		var $windowHeight = $(window).height();
		var $travelDistance = $windowHeight * 2;

		$('#drumTrack').height($windowHeight);
		$('#drumTrack').css('top',  -$windowHeight);

		if(this.showDrumTrack()){

			$.each($this.currentBeat[$this.player], function($key, $val){

				var $timePlacementPerc = ($val / $this.turnTime);
				var $trackPlacement = $windowHeight * $timePlacementPerc;
				var $barBeat = '<div style="top:'+ $trackPlacement +'px"></div>';
				$('#drumTrack').append($barBeat);

			});

		}
		
		
		$this.currentTime = $totalTime;
		$this.state= "DRUM!"; 

		$interval(function(){
			
			var $timePerc = 
			$this.currentTime--;			
			$widthPer = ($this.currentTime / $totalTime) * 100;

			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// DRUMTRACK
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			$trackPer = (100 - $widthPer) / 100;
			$('#drumTrack').css('top', ($travelDistance * $trackPer) - $windowHeight + 'px');
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			$('#timeContainer').width($widthPer + '%');
			if($this.currentTime == 0){							
				$this.countDownFinished();
			}
		}, 1, $totalTime);

	}

	this.countDownFinished = function(){
		
		$this = this;
		var $beatVerified = (this.secondaryState == "do that again");
		if(!$beatVerified){
		// THE PLAYER HAS PLAYED A BEAT, BUT THEY HAVE NOT PROVED THEY CAN PLAY IT AGAIN YET

			console.log('player needs to verify');
			$this.state = "let's see you";
			$this.secondaryState = "do that again";
			$this.hasSecondary = true;

		} else {
		// THE PLAYER HAS JUST PROVED THEY CAN PLAY THEIR BEAT AGAIN

			console.log('player has verified');

		}

	}

	this.confSecondary = function(){				
		return(this.hasSecondary);
	}

	this.showTimer = function(){
		return(this.state == "DRUM!");
	}

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

})();