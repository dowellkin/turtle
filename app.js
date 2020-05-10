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
	console.log('В данной демонтрации реализованы такие команды как: "Вперед", "Влево", "Вправо", "Сетка". Пример команды "вперед50"');
}
