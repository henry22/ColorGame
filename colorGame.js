var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var showAnswer = document.querySelector("#showAnswer");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	setupModeButton();
	setupSquares();
	reset();		
}

function setupModeButton() {
	//mode button event listener
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");

			if(this.textContent === "Easy") {
				numSquares = 3;
			} else {
				numSquares = 6;
			}
	 		reset();
		});
	}
}

function setupSquares() {
	//loop through each div class name equal square
	for(var i = 0; i < squares.length; i++) {
		//click each square and the callback fuction will happen
		squares[i].addEventListener("click", function() {
			var selectedColor = this.style.background;
			//compare two color if it matches, change all to that color
			if(selectedColor === pickedColor) {
				showAnswer.textContent = "Correct";
				//change resetButton content
				resetButton.textContent = "Play again";
				changeColor(selectedColor);
				h1.style.background = selectedColor;
			//if not match, change the square color to background color
			} else {
				this.style.background = "#232323";
				showAnswer.textContent = "Try again";
			}
		});
	}
}

function reset() {
	//generate random colors
	colors = generateRandomColor(numSquares);
	//choose one color to be the answer
	pickedColor = pickRandomColor();
	//show picked color on the screen
	colorDisplay.textContent = pickedColor;

	this.textContent = "New Colors";
	showAnswer.textContent = "";

	//display the colors on squares
	for(var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}

	//reset h1 background color to the original
	h1.style.background = "steelblue";	
}

resetButton.addEventListener("click", function() {
	reset();
});

//pick a random color in colors array
function pickRandomColor() {
	var randomNum = Math.floor(Math.random() * colors.length);
	return colors[randomNum];
}

//let all squares to be the same color
function changeColor(color) {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.background = color;
	}
}

function generateRandomColor(num) {
	//create an empty array
	var arr = [];
	//loop through the num and push into arr
	for(var i = 0; i < num; i++) {
		arr.push(randomColor());
	}

	return arr;
}

//generate a random color from all colors
function randomColor() {
	//red 0 to 255
	var r = Math.floor(Math.random() * 256);
	//green 0 to 255
	var g = Math.floor(Math.random() * 256);
	//blue 0 to 255
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}