//TODO_COMMAND_LINE_INTERFACE::Created by::Abhishek 

const fs = require('fs');

const todo_saved = "./todo.txt";
const todo_done = "./done.txt";

const help = () => {
	let help_usage = `
Usage :-
$ ./todo add "todo item"  # Add a new todo
$ ./todo ls               # Show remaining todos
$ ./todo del NUMBER       # Delete a todo
$ ./todo done NUMBER      # Complete a todo
$ ./todo help             # Show usage
$ ./todo report           # Statistics
`;
	console.log(help_usage);
}

class TODO_APP {
	constructor(path) {
		this.path = path;
		if (!fs.existsSync(this.path)) {
			let data = {
				tasks: [],
			}
			this.setData(data);
		}
	}
	getData = () => {
		const todo_data = fs.readFileSync(this.path);
		const data = JSON.parse(todo_data);
		return data;
	}

	setData = (data) => {
		const todo_data = JSON.stringify(data);
		fs.writeFileSync(this.path, todo_data);
	}
	list_all_tasks = () => {
		const data = this.getData();
		if (data.tasks.length > 0) {
			let rev = data.tasks.reverse();
			rev.forEach(function (taskobj, index) {
				if (!taskobj.completed) {
					console.log(`[${rev.length - index}] ${taskobj.task_to_be_added}`)
				}
			});

		} else {
			console.log("There are no pending todos!");
		}
	}

	done_task = (File, id) => {
		let date_obj = new Date();
		const dd = String(date_obj.getDate()).padStart(2, '0');
		const mm = String(date_obj.getMonth() + 1).padStart(2, '0');
		const yyyy = date_obj.getFullYear();
		date_obj = yyyy + '/' + mm + '/' + dd;

		const data = this.getData();
		let result = File.getData();
		let data_added;
		if (id == '' || id == undefined) {
			console.log("Error: Missing NUMBER for marking todo as done.");
		}
		if (id == 0 || data.tasks.length < id) {
			console.log(`Error: todo #${id} does not exist.`);
		}
		if (data.tasks.length >= id) {
			data_added = data.tasks.splice(id - 1, 1);
			result.tasks.push({ task_to_be_added: `x ${date_obj} ${data_added[0].task_to_be_added}`, completed: true });
			console.log(`Marked todo #${id} as done.`);
		}
		this.setData(data);
		File.setData(result);
	}
	add = (task_to_be_added) => {
		if (task_to_be_added == '' || task_to_be_added == undefined) 
			console.log("Error: Missing todo string. Nothing added!"); 
		let data = this.getData();
		task_to_be_added.forEach(task => {

			data.tasks.push({ task_to_be_added: `${task}`, completed: false });
			console.log(`Added todo: "${task}"`);
		});

		this.setData(data);
	}

	del = (id) => {
		const data = this.getData();
		if (id == '' || id == undefined) {
			console.log("Error: Missing NUMBER for deleting todo.");
		}
		if (id == 0 || data.tasks.length < id) {
			console.log(`Error: todo #${id} does not exist. Nothing deleted.`);
		}
		if (data.tasks.length >= id) {
			data.tasks.splice(id - 1, 1);
			console.log(`Deleted todo #${id}`);
		}this.setData(data);
	}
}

const init = () => {
	obj1 = new TODO_APP(todo_saved);
	obj2 = new TODO_APP(todo_done);
}
const report = () => {
	const temp = obj1.getData();
	const tmp = obj2.getData();
	let date_obj = new Date();
	const yyyy = date_obj.getFullYear();
	const dd = String(date_obj.getDate()).padStart(2, '0');
	const mm = String(date_obj.getMonth() + 1).padStart(2, '0');
	date_obj = `${yyyy}-${mm}-${dd}`;
	console.log(date_obj, "Pending :", temp.tasks.length, "Completed :", tmp.tasks.length);
}

init();
const str1 = process.argv[2];
const str2 = process.argv[3];
const len = process.argv.length;
let list = [];
if (len > 3) {
	for (let i = 0; i <= len && process.argv[i + 3] != undefined; i++) {
		list[i] = process.argv[i + 3];
	}
}
switch (str1) {
	case "add":
		obj1.add(list);
		break;
	case "help":
		help();
		break;
	case "del":
		obj1.del(str2);
		break;
	case "ls":
		obj1.list_all_tasks();
		break;
	case "done":
		obj1.done_task(obj2, str2);
		break;
	case "report":
		report();
		break;
	default:
		help();
		break;
}

//TODO_COMMAND_LINE_INTERFACE::Created by::Abhishek 
