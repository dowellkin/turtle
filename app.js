const canv = document.querySelector(".canvas");
const inp = document.querySelector("#input");

const trtl = new Turtle(canv);
const textarea = new TextareaReader(inp, trtl);

trtl.showCoordinates(document.querySelector(".X"), document.querySelector(".Y"));

// trtl.turtle.angle = 90;
// trtl.drawGrid(50);
// trtl.forward(50);
// trtl.left(45);
// trtl.forward(50);
// trtl.right(45);
// trtl.forward(50);
// trtl.drawTurtle();

function help() {
	console.log("Простая интерпритация turtle на чистом js. Используются следующие команды:");
	for(let key in textarea.commands){
		console.log(`\t${key}: ${textarea.commands[key].join(", ")}`);
	}
	console.log("Пока что циклы работают странно (можно осуществить вложенные циклы, но не два цикла на одном уровне");
	console.log("По всем вопросам обращаться https://vk.com/kun_alex");
	console.log("Королёв Александр (С) 2020");
}
