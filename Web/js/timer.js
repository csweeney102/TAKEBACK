let timeRemaining = parseInt(sessionStorage.getItem("timeLimit"), 10);
        
function updateTimerDisplay() {
	let minutes = Math.floor(timeRemaining / 60);
	let seconds = timeRemaining % 60;
	const timerElement = document.getElementById("timer");
	timerElement.textContent = `Time Left: ${minutes}:${seconds.toString().padStart(2, '0')}`;
	
	// Make timer text red when 1 minute or less remains
	if (timeRemaining <= 60) {
		timerElement.style.color = "red";
	} else {
		timerElement.style.color = "";
	}
}
        
function countdown() {
	if (timeRemaining > 0) {
        timeRemaining--;
		sessionStorage.setItem("timeLimit", timeRemaining);  // Update sessionStorage
		updateTimerDisplay();
	} else {
		window.location.href = "gameOver.html";  // Redirect to a game over screen
	}
}
			
document.addEventListener("DOMContentLoaded", function () {        
	updateTimerDisplay();  // Initial display
	setInterval(countdown, 1000);  // Start countdown
});