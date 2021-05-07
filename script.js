class Task {
    constructor(text) {
        this.text = text
        this.isCompleted = false
    }
}

class ToDoList {
	constructor(){
		this.list = this.geTodoList() || [];
		this.completed =[]
        this.pending = [];

        this.buildHtml(this.list)
        this.chaneTasksLists(this.list)
        let input = document.getElementById('input')
        input.addEventListener('keyup',(e)=> {
        	if(e.keyCode === 13)  this.addTask(input.value)
		})
        let add = document.getElementById('add')
    	add.addEventListener('click',()=> this.addTask(input.value))
    	document.getElementById('all').addEventListener('click',()=>this.buildHtml(this.list))
    	document.getElementById('completed').addEventListener('click',()=>this.buildHtml(this.completed))
    	document.getElementById('pending').addEventListener('click',()=>this.buildHtml(this.pending))
	}
	addTask(text) {
        if (text == '' || text == null) {
            alert("Type Task Name")
        } else {
        	let task = new Task(text)
            this.list.push(task)
            this.buildHtml(this.list)

        }

        
    }
    chaneTasksLists(list){
    	this.completed = this.list.filter((task) => task.isCompleted === true)
        this.pending = this.list.filter((task) => task.isCompleted === false);
        this.setTodoList()
        console.log(this.list)
    } 
    buildHtml(list){
    	const ul = document.getElementById('todo-list')
    	ul.innerHTML = ""
    	list.forEach((task, index) => {
	    	const li = document.createElement('li')
	    	
	    	// create List Body
	    	const body = document.createElement('div')
	    	body.classList.add('d-flex', 'align-items-center')
	    	// create handle div
	    	const handle = document.createElement('div')
	    	handle.classList.add('handle', 'mx-1')
	    	//create Move Icon
	    	const moveIcon = document.createElement('i')
	    	moveIcon.classList.add('bi','bi-arrows-move')
	    	handle.appendChild(moveIcon)
	    	body.appendChild(handle)
	    	//create Checkbox
			const checkbox = document.createElement('div')
	    	checkbox.classList.add('form-check', 'mx-1', 'mb-0')
	    	const input = document.createElement('input')
	    	input.classList.add('form-check-input')
	    	input.setAttribute('type' , "checkbox")
	    	input.setAttribute('value' , "")
	    	input.setAttribute('id' , "flexCheckDefault-"+index)

	    	input.addEventListener('change',() => {
			  if (input.checked) {
			  	task.isCompleted = true
			  	
			    li.classList.add('completed')
			  } else {
			  	task.isCompleted = false
			    li.classList.remove('completed')
			  }
			  this.chaneTasksLists(list)
			});
	    	checkbox.appendChild(input)
	    	body.appendChild(checkbox)

	    	li.appendChild(body)

	    	// create Text
			const text = document.createElement('span')
	    	text.classList.add('mx-1')
	    	text.innerText = task.text
	    	body.appendChild(text)

			//create Remove div
			const remove = document.createElement('div')
	    	remove.classList.add('remove','text-danger', 'me-1')
	    	//create Remove Icon
	    	const removeIcon = document.createElement('i')
	    	removeIcon.classList.add('bi','bi-trash')
	    	remove.appendChild(removeIcon)

	    	li.appendChild(remove)
	    	remove.addEventListener('click', () => {
                ul.removeChild(li)
                this.list = this.list.slice(0, index).concat(this.list.slice(index + 1, this.list.length))
                this.chaneTasksLists(list)
            })

	    	ul.appendChild(li)

	    	li.classList.add('list-group-item', 'd-flex', 'justify-content-between')
	    	if(task.isCompleted === true){
	    		li.classList.add('completed')
	    		input.setAttribute('checked',true)
	    	} 
    	})
    	let input = document.getElementById('input').value = ''
    	if( list.length == 0 ){
    		let p = document.createElement('p')
    		p.innerText = "There Are No Tasks "
    		p.classList.add('text-center','mt-3','text-muted')
    		ul.appendChild(p)
    	}
    }
    geTodoList(){
    	return JSON.parse(localStorage.getItem("todoList"))
    }
    setTodoList() {
        return localStorage.setItem("todoList", JSON.stringify(this.list))
    }
}



new ToDoList()
new Sortable(document.getElementById('todo-list'), {
    handle: '.handle', // handle's class
    ghostClass: 'blue-background-class',
    animation: 200
});