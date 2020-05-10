class TextareaReader{
	constructor(element, trtl){
		this.textarea = element;
		this.listener();
		this.turtle = trtl;
		this.turtle.drawTurtle();
	}

	listener() {
		this.textarea.addEventListener("input", (e) => {
			this.handler(e.target.value);
		});
	}

	handler(string){
		const reg = /\n|\s|[()]/gi;
		string = string.replace(reg, '').toLowerCase();
		const commands = this.makeArrayOfCommands(string);
		if(commands == null) return;
		
		const commandsWithArgs = this.makeCommandsAndArgs(commands);
		console.log(commandsWithArgs);
		this.turtle.clear();
		for (let i = 0; i < commandsWithArgs.length; i++) {
			this.makeCommand(commandsWithArgs[i]);
		}
		this.turtle.drawTurtle();
	}

	makeArrayOfCommands(string){
		const reg = /\D+\d+/gi;
		let commands = string.match(reg);
		return commands;
	}

	makeCommandsAndArgs(arrayOfCommands){
		const commandsWithArgs = [];
		for(let i = 0; i < arrayOfCommands.length; i++){
			commandsWithArgs.push({
				command: arrayOfCommands[i].match(/\D+/gi)[0],
				arg: +arrayOfCommands[i].match(/\d+/gi)[0]
			})
		}
		return commandsWithArgs;
	}

	makeCommand(command){
		switch (command.command) {
			case "вперед":
				this.turtle.forward(command.arg);
				break;
			case "влево":
				this.turtle.left(command.arg);
				break;
			case "вправо":
				this.turtle.right(command.arg);
				break;
			case "сетка":
				this.turtle.drawGrid(command.arg);
				break;
			default:
				break;
		}
		console.log(command)
	}
}