var countWork = $("#workInput").html();
var countBreak = $("#breakInput").html();
var sessionCountWork = $("#workInput").html();
var sessionCountBreak = $("#breakInput").html();
var isCountDown = false;
var paused; //checks whether the timer is paused or running
var audioReady = new Audio("sound/ready.wav");
var audioWorkcomplete = new Audio("sound/work-complete.wav");
var hour_left;
var min_left;
var sec_left;
var time_left;


	/*work counter*/
	//minusbtn
	$("#btn-minus-work").click(function(){
		if (countWork == 0) {
			$("#btn-minus-work").disabled = true
		}
		else {countWork--;}
		$("#workInput").html(countWork);
	})
	//plusbtn
	$("#btn-plus-work").click(function(){
		countWork++;
		$("#workInput").html(countWork);
	})


	/*break counter*/
	//minusbtn
	$("#btn-minus-break").click(function(){
		if (countBreak == 0) {
			$("#btn-minus-break").disabled = true
		}
		else {countBreak--;}
		$("#breakInput").html(countBreak);
		})
	//plusbtn
	$("#btn-plus-break").click(function(){
			countBreak++;
		$("#breakInput").html(countBreak);
		
		});
			


/*start and stop button*/
$("#sessionName").text("Work");
$("#start").click(function() {
	if (paused === false) {return;}
	countdown($("#workInput").html()) 
	isCountDown = true;
	paused = false;
	$(".inputBtn").addClass("hidden");
});



/*make the countdown pause*/
$("#pause").click(function(){
	
	if (paused === false) {
		$("#pause").addClass("resume").empty().text("RESUME");
		clearInterval(myInterval);
		isCountDown = false;
		paused = true;
		$(".inputBtn").removeClass("hidden");
		sec_left = parseInt($("#countDownSec").html())/60; 
		min_left = parseInt($("#countDownMinute").html());
		time_left = sec_left + min_left;
	}
	else if (paused === true) {
		$("#pause").removeClass("resume").empty().text("PAUSE");
		countdown(time_left);
		paused = false;
		$(".inputBtn").addClass("hidden");

	}
	
});
	

/*session countdown*/
function countdown(endDate) {
  let hours, minutes, seconds;
  
  endDate = endDate*60;
  
  if (isNaN(endDate)) {
	return;
  }
  
  myInterval = setInterval(calculate, 1000);
  
	function calculate(hours, minutes, seconds) {
	    let startDate = 0;
	    
	    
	    let timeRemaining = endDate--;
	    
	    if (timeRemaining >= 0) {
	            
	      hours = parseInt(timeRemaining / 3600);
	      timeRemaining = (timeRemaining % 3600);
	      
	      minutes = parseInt(timeRemaining / 60);
	      timeRemaining = (timeRemaining % 60);
	      
	      seconds = parseInt(timeRemaining);
	      
	      document.getElementById("countDownHour").innerHTML = ("0" + hours).slice(-2) + ":"; //only part that is dependent of outside code
	      document.getElementById("countDownMinute").innerHTML = ("0" + minutes).slice(-2) + ":";//only part that is dependent of outside code
	      document.getElementById("countDownSec").innerHTML = ("0" + seconds).slice(-2);//only part that is dependent of outside code
	    } else {
	      return;
	    }
	  	/*this next section changes between work and break, can be taken out and the above function
	  	can be used again in other code, work independently*/
		if (hours === 0 && minutes === 0 && seconds === 0 && $("#sessionName").text() === "Work") {
		  		$("#sessionName").text("Break");
		  		countdown($("#breakInput").html()); //changes to break time :)
		  		audioWorkcomplete.play();
		  	}
		else if (minutes === 0 && seconds === 0 && $("#sessionName").text() === "Break") {
				$("#sessionName").text("Work");
				countdown($("#workInput").html());//changes to work time :(
				audioReady.play();
			}
		else {return;}
	}

  
};
//reset the clock to

$("#reset-btn").click(function(){
	$("#countDownSec").empty();
	$("#countDownMinute").empty();
	$("#countDownHour").empty();
})



	



