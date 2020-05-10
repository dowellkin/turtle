class Turtle {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');

		this.gridSize = 50;
		this.turtle = {
			x: 0,
			y: 0,
			angle: 90
		};

		this.isPenDown = true;
		this.log = [];
	}

	drawLine(startX, startY, endX, endY) {
		let x1 = this.changeSystemX(startX);
		let y1 = this.changeSystemY(startY);
		let x2 = this.changeSystemX(endX);
		let y2 = this.changeSystemY(endY);
		this.innerDrawLine(x1, y1, x2, y2);
	}

	innerDrawLine(startX, startY, endX, endY) {
		this.ctx.beginPath();
		this.ctx.moveTo(startX, startY);
		this.ctx.lineTo(endX, endY);
		this.ctx.closePath();
		this.ctx.stroke();
	}
Z
	drawGrid(gridSize = this.gridSize) {
		const savedLineWidth = this.ctx.lineWidth;
		const savedStrokeStyle = this.ctx.strokeStyle;
		const savedFillStyle = this.ctx.fillStyle;

		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = "#ebebeb";

		for (let y = 1; y * gridSize < this.canvas.height; y++) {
			this.innerDrawLine(0, y * gridSize, this.canvas.width, y * gridSize);
		}
		for (let x = 1; x * gridSize < this.canvas.width; x++) {
			this.innerDrawLine(x * gridSize, 0, x * gridSize, this.canvas.height);
		}

		this.ctx.lineWidth = savedLineWidth;
		this.ctx.strokeStyle = savedStrokeStyle;
		this.ctx.fillStyle = savedFillStyle;
	}

	drawCooridnatesLines() {
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = "#000";
		this.innerDrawLine(this.canvas.width / 2, 0, this.canvas.width / 2, this.canvas.height);
		this.innerDrawLine(0, this.canvas.height / 2, this.canvas.width, this.canvas.height / 2);
	}

	drawTurtle() {
		const savedLineWidth = this.ctx.lineWidth;
		const savedStrokeStyle = this.ctx.strokeStyle;
		const savedFillStyle = this.ctx.fillStyle;

		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = "#ff4d4d";
		this.ctx.fillStyle = "#ff4d4d";

		const cords = [[0,0],[3,0],[0,7],[-3,0],[0,0]];
		const newcords = [[0,0]];
		for(let i = 1; i < cords.length; i++){
			let newPoint = this.coordsOfLineWithAngle(0,0, cords[i][0], cords[i][1], this.turtle.angle-90);
			newcords[i] = [newPoint.x, newPoint.y];
		}
		this.ctx.beginPath();
		this.ctx.moveTo(this.changeSystemX(this.turtle.x), this.changeSystemY(this.turtle.y));
		this.ctx.lineTo(this.changeSystemX(this.turtle.x + newcords[1][0]), this.changeSystemY(this.turtle.y + newcords[1][1]));
		this.ctx.lineTo(this.changeSystemX(this.turtle.x + newcords[2][0]), this.changeSystemY(this.turtle.y + newcords[2][1]));
		this.ctx.lineTo(this.changeSystemX(this.turtle.x + newcords[3][0]), this.changeSystemY(this.turtle.y + newcords[3][1]));
		this.ctx.lineTo(this.changeSystemX(this.turtle.x + newcords[4][0]), this.changeSystemY(this.turtle.y + newcords[4][1]));
		this.ctx.fill();

		this.ctx.lineWidth = savedLineWidth;
		this.ctx.strokeStyle = savedStrokeStyle;
		this.ctx.fillStyle = savedFillStyle;
	}

	getCoordinates() {
		return this.turtle;
	}

	showCoordinates(xNode, yNode) {
		this.canvas.addEventListener('mousemove', (e) => {
			xNode.innerText = e.offsetX - this.canvas.width / 2;
			yNode.innerText = -(e.offsetY - this.canvas.height / 2);
			// xNode.innerText = e.offsetX; //show true canvas coordinates
			// yNode.innerText = e.offsetY;
		});
	}

	clear() {
		this.turtle.x = 0;
		this.turtle.y = 0;
		this.turtle.angle = 90;

		this.ctx.fillStyle = "#fff";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = "#000";
		// this.drawGrid();
		// this.drawCooridnatesLines();
	}

	changeSystemX(X) {
		return X + this.canvas.width / 2;
	}

	changeSystemY(Y) {
		return -Y + this.canvas.height / 2;
	}

	coordsOfLineWithAngle(x1, y1, x2, y2, angle) {
		if(angle == undefined) console.error("angle is underfined")
		const xn = -Math.sin(angle * Math.PI / 180) * (y2 - y1) + Math.cos(angle * Math.PI / 180) * (x2 - x1) + x1;
		const yn = Math.cos(angle * Math.PI / 180) * (y2 - y1) + Math.sin(angle * Math.PI / 180) * (x2 - x1) + y1;
		return {
			x: Math.round(xn),
			y: Math.round(yn)
		};
	}

	forward(len) {
		const newCoords = this.coordsOfLineWithAngle(this.turtle.x, this.turtle.y, this.turtle.x + len, this.turtle.y, this.turtle.angle);
		if(this.penDown)
			this.drawLine(this.turtle.x, this.turtle.y, newCoords.x, newCoords.y);
		this.turtle.x = newCoords.x;
		this.turtle.y = newCoords.y;
		this.log.push({
			line: {
				x1: this.turtle.x,
				y1: this.turtle.y,
				x2: newCoords.x,
				y2: newCoords.y
			}
		})
	}

	left(deg) {
		this.turtle.angle += deg;
	}

	right(deg) {
		this.turtle.angle -= deg;
	}

	color(color) {
		this.ctx.fillStyle = color;
	}

	width(width) {
		this.ctx.lineWidth = width;
	}

	goto(x, y){
		this.turtle.x = x;
		this.turtle.y = y;
	}

	penUp() {
		this.isPenDown = false;
	}

	penDown(){
		this.isPenDown = true;
	}
}