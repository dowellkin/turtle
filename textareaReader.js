class TextareaReader{
	commands = {
		forward: ["вперед", "вперёд", "forward", "fd", "f"],
		right: ["вправо", "right", "tr", "r"],
		left: ["влево", "left", "tl", "l"],
		grid: ["сетка", "grid", "gd"],
		coords: ["координаты", "coords", "cd"],
		repeat: ["повтор", "repeat", "rp"]
	};

	constructor(element, trtl){
		this.textarea = element;
		this.listener();
		this.turtle = trtl;
		const saved = this.loadInput();
		if(saved != undefined){
			this.textarea.value = saved;
			this.handler(this.textarea.value);
			this.turtle.drawTurtle();
		} else {
			this.turtle.drawTurtle();
		}
	}

	listener() {
		this.textarea.addEventListener("input", (e) => {
			this.turtle.clear();
			this.handler(e.target.value);
			this.saveCurrentInput();
			this.turtle.drawTurtle();
		});
	}

	handler(string){
		const reg = /\n|\s/gi;
		string = string.replace(reg, '').toLowerCase();
		const commands = this.makeArrayOfCommands(string);
		if(commands == null) return;
		
		const commandsWithArgs = this.makeCommandsAndArgs(commands);
		for (let i = 0; i < commandsWithArgs.length; i++) {
			this.makeCommand(commandsWithArgs[i]);
		}
	}

	makeArrayOfCommands(string){
		/*
			организовать адекватное считывание скобок, включая вложенные и просто несколько групп скобок подряд
			сейчас работает скобка открытия адекватно "(", а скобка закрытия ")" самая последняя со всей строки
			
			предложение:
				искать "(", а потом ")", на расстоянии от "(" до ")", если есть "(", искать на этом же промежутке ")",
				если его нет, перейти к следующему ")", если есть, то это нужная ")"
		*/
		const reg = /\D+\(+.*\)|\D+\d+/gi;
		let commands = string.match(reg);
		// console.log(commands);
		return commands;
	}

	makeCommandsAndArgs(arrayOfCommands){
		const commandsWithArgs = [];
		for(let i = 0; i < arrayOfCommands.length; i++){
			commandsWithArgs.push({
					command: arrayOfCommands[i].match(/[a-zA-Zа-яА-Я]+/gim)[0],
					arg: arrayOfCommands[i].match(/\(+.+\)|\d+/gim)[0]
				})
		}
		
		return commandsWithArgs;
	}

	makeCommand(command){
		let com = command.command
		switch (true) {
			case this.commands.forward.includes(com):
				this.turtle.forward(+command.arg);
				break;
			case this.commands.left.includes(com):
				this.turtle.left(+command.arg);
				break;
			case this.commands.right.includes(com):
				this.turtle.right(+command.arg);
				break;
			case this.commands.grid.includes(com):
				this.turtle.drawGrid(+command.arg);
				break;
			case this.commands.coords.includes(com):
				this.turtle.drawCooridnatesLines(+command.arg);
				break;
			case this.commands.repeat.includes(com):
				const count = command.arg.match(/\d+,/)[0].match(/\d+/)[0];
				const arg = command.arg.replace(/\(\d+,/, "").slice(0,-1);
				for(let i = 0; i < count; i++){
					this.handler(arg);
				}
				break;
			default:
				break;
		}
		//console.log(command)
	}

	saveCurrentInput(){
		localStorage.setItem("input", JSON.stringify(this.textarea.value));
	}

	loadInput(){
		return JSON.parse(localStorage.getItem("input"));
	}
}