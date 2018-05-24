var countWork = $("#workInput").html();
var countBreak = $("#breakInput").html();
var sessionCountWork = $("#workInput").html();
var sessionCountBreak = $("#breakInput").html();
var isCountDown = false;
var audioReady = new Audio("sound/ready.wav");
var audioWorkcomplete = new Audio("sound/work-complete.wav");



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
	



	
		if (isCountDown = true) {
		$(".inpunBtn").disabled = true;
	};


/*start and stop button*/
$("#sessionName").text("Work");
$("#start").click(function() {
	countdown($("#workInput").html()) //incoorperate a resume function
	isCountDown = true;
});


/*make the countdown pause*/
$("#pause").click(function(){
	clearInterval(myInterval);
	isCountDown = false;
});
	
/*session countdown*/
function countdown(endDate) {
  let hours, minutes, seconds;
  
  endDate = endDate*60;
  
  if (isNaN(endDate)) {
	return;
  }
  
  myInterval = setInterval(calculate, 1000);
  
	function calculate() {
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
		if (minutes === 0 && seconds === 0 && $("#sessionName").text() === "Work") {
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




	



