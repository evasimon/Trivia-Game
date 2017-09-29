$( document ).ready(function() {

	// VARIABLES
	// Array of question objects
	var questions = [

	{ 
		title : "What country has the most natural lakes?",
		choices : ["India", "Canada", "United States", "Australia"],
		correctAnswerIndex : 1,
		image : "assets/images/canada.jpg"
	},
	{ 
		title : "Where in the United States would you find The Lincoln Memorial?",
		choices : ["New York", "Orlando", "Washington DC", "Chicago"],
		correctAnswerIndex : 2,
		image : "assets/images/washington-dc.jpg"
	},
	{ 
		title : "In which country can you visit Machu Picchu?",
		choices : ["Columbia", "Peru", "Chile", "Bolivia"],
		correctAnswerIndex : 1,
		image : "assets/images/peru.jpg"
	},
	{ 
		title : "What African country served as the setting for Tatooine in Star Wars?",
		choices : ["Ethiopia", "Gabon", "Tunisia", "Ghana"],
		correctAnswerIndex : 2,
		image : "assets/images/tunisia.jpg"
	}
	];

	var count = 0;			// variable counting the quesitons in the quesiton array
	var wins = 0;			// variable counting the correct answeres
	var losses = 0;			// varibale counting the wrong answeres
	var notAnswered = 0;	// variable counting the unanswered quesitons
	var time = 10;			// timer set to 10s
	var timeInterval;		// 

	// creating new div elements for quesiton title, quesiton answere buttons and seconds display
	var currentTitle = $("<div>");
	var currentQuestionDiv = $("<div id='button-container'>");
	var displaySeconds = $("<div class='timer-display'>");
	$("#container").append(displaySeconds);


	// FUNCTIONS
	// ***** START GAME function *****
	function startGame() {
		// hide seconds display
		displaySeconds.hide();

		// create lading page title
		var startTitle = $("<h1>");
		startTitle.html("TRIVIA");
		$("#container").append(startTitle);

		// create landing page logo
		var startIcon = $("<div class='fa fa-globe'>");
		$("#container").append(startIcon);

		// create landing page start button
		var startButton = $("<button class='btn btn-start'>");
		startButton.html("Start Game");
		$("#container").append(startButton);

		// click event function on the start button
		startButton.click(function() {
			questionPage();
			displaySeconds.show();
			startButton.hide();
			startTitle.hide();
			startIcon.css("top", "100px");
			startIcon.css("right", "0");

		});

	} // ***** END START GAME function *****



	// ***** RESET GAME function *****
	function resetGame() {
		// resetting counting variables
		wins = 0;
		losses = 0;
		notAnswered = 0;

		// create reset button: Play Again!
		var resetButton = $("<button class='btn btn-reset'>");
		resetButton.html("Play Again");
		$("#container").append(resetButton);

		// click event on reset button
		resetButton.click(function() {
			questionPage();
			resetButton.hide();

		});

	} // ***** END RESET GAME function *****



	// ***** START TIMER function *****
	function startTimer() {
		// set and display time
		time = 10;
		displaySeconds.text(time);

		// set timeInterval of 1s when counting down
		timeInterval = setInterval(countDown, 1000);

	} // ***** END START TIMER function *****



	// ***** STOP TIMER function *****
	function stopTimer() {
		// stop time / clear the 1s time interval
		if (timeInterval){
			clearInterval(timeInterval);
		}

	} // ***** END STOP TIMER function *****



	// ***** COUNTDOWN function *****
	function countDown() {
		// set time to count donw seconds
		time --;

		// change the display time to the current seconds
		displaySeconds.text(time);
		console.log(displaySeconds);
		console.log("timeInterval" + time);

		// set code when time is out
		if ( time === 0 ) {
			var currentQuestion = questions[count];

			// count the unanswered question
			notAnswered ++;

			// set/style currentTitle with answer icon
			currentTitle.attr("class", "current-title fa fa-clock-o");
			currentTitle.text(currentQuestion.choices[currentQuestion.correctAnswerIndex]);

		 	// call answerPage function
		 	answerPage();

		 };

	} // ***** END COUNTDOWN function *****



	// ***** ANSWER PAGE function *****
	function answerPage() {
		stopTimer();

		// create an image holder container
		var imageOn = $("<img>");
		imageOn.attr("src", questions[count].image);
		imageOn.attr("alt", "Geography is fun");
		imageOn.attr("width", "100%");

		$("#button-container").html(imageOn)

		// display next page / next quesiton after 3s
		setTimeout(nextQuestion, 3000);

	} // ***** END ANSWER PAGE function *****


	// ***** NEXT QUESTION function *****
	function nextQuestion() {
		// display next question
		count ++;

		// stop game once all the questions are displayed
		if ( count === questions.length ) {
			gameOver();
			count = 0;

		} else {
			// if not display next quesiton
			questionPage();

		}

	} // ***** END NEXT QUESTION function *****


	// ***** GAME OVER function *****
	function gameOver() {
		stopTimer();

		// set title to Game Over
		currentTitle.text("Game Over!");
		currentTitle.attr("class", "current-title current-title-serif");

		// display results
		$("#button-container").html("<ul><li><i class='fa fa-check'></i>" + wins +  "</li><li><i class='fa fa-times'></i>" + losses +
			"</li><li><i class='fa fa-clock-o'></i>" + notAnswered + "</li></ul>")
		

		// reset game
		resetGame();

	} // ***** END GAME OVER function *****


	// ***** QUESTION PAGE function *****
	//Create QuestionPage function displaying the title and the buttons with the questions
	function questionPage(){
		var currentQuestion = questions[count];
		console.log(currentQuestion);

		// create /set div element for title of the question
		currentTitle.text(questions[count].title);
		currentTitle.attr("class", "current-title current-title-serif");
		console.log(currentTitle);
		$("#container").append(currentTitle);
		$("#container").append(currentQuestionDiv);
		$("#button-container").html("");


		// diplay button with answers
		for ( var i = 0; i < questions[count].choices.length; i++ ) {

			// create buttons for anwerchoice
			var currentAnswer = $("<button>");
			currentAnswer.text(currentQuestion.choices[i]);
			$("#button-container").append(currentAnswer);

		}

		// click event on the button clicked
		$("button").click(function() {
			var currentAnswerIndex = currentQuestion.choices.indexOf($(this).text());

		 	// evaluating the answeres
		 	if  ( currentAnswerIndex === currentQuestion.correctAnswerIndex ) {
		 		wins ++;
		 		currentTitle.attr("class", "current-title fa fa-check");

		 		console.log(currentAnswerIndex + "YAY");

		 	} else {
		 		losses ++;
		 		currentTitle.attr("class", "current-title fa fa-times");


		 	}

		 	currentTitle.text(currentQuestion.choices[currentQuestion.correctAnswerIndex]);

		 	 // call answer page function, display correct answer with image
		 	 answerPage();

		 	});

		startTimer()

	} // ***** END QUESTION PAGE function *****


	// display landing page at document load
	startGame()

});
