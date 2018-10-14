
window.onload=function(){
    // alert('he');

    const taskField=document.getElementById('taskField');
    const addTaskBtn=document.getElementById('addTaskBtn');
    const allTasksParent=document.getElementById('allTasks');

    taskField.addEventListener('keypress',function(event){
        if(event.keyCode===13 && taskField.value !==''){
            // console.log('Enter');
     
            createNewTask(allTasksParent, event.target.value)
            this.value=''
        }else{
        	// alert('ff');
        }
    });

    addTaskBtn.addEventListener('click',function(){

    	if(taskField.value===''){
    		alert('Please input any value');
    	}else{
    		createNewTask(allTasksParent,taskField.value);
    		taskField.value='';
    	}
    });

   
}

function createNewTask(parent,task){
	let col=document.createElement("div");
	col.className='col-sm-3'
	let singleTask=document.createElement("div");
	singleTask.className='single-task d-flex'
	let singleTaskp=document.createElement('p')
	singleTaskp.innerHTML=task
	let span=document.createElement('span');
	span.className='ml-auto'
	span.innerHTML=`<i class="fas fa-times-circle"></i>`

	span.addEventListener('click',function(){
		parent.removeChild(col)
	})

	let taskControler=createTaskController(singleTask)
	taskControler.style.visibility="hidden"

	singleTask.appendChild(taskControler)

	singleTask.onmouseenter=function(){
		taskControler.style.visibility="visible"
	}

	singleTask.onmouseleave=function(){
		taskControler.style.visibility="hidden"
	}

	singleTask.appendChild(singleTaskp)
	singleTask.appendChild(span)
	col.appendChild(singleTask)
	parent.appendChild(col)

}


function createTaskController(parent){
	let controlPannel=document.createElement("div")
	controlPannel.className='task-control-panel d-flex align-items-center'
	// controlPannel.innerHTML='pppp'
	let colorplate=createColorPlate(parent)
	controlPannel.appendChild(colorplate)

	let editBtn=createEditBtn(parent)
	controlPannel.appendChild(editBtn)

	return controlPannel;
}

function createEditBtn(parent){
	let span=document.createElement('span')
	span.className='ml-auto mr-2'
	span.innerHTML=`<i class="fas fa-edit"></i>`
	span.style.color='#fff'

	span.addEventListener('click',function(){
		let p=parent.querySelector('p');
		let textarea=document.createElement('textarea');
		textarea.className='inner-textarea'
		textarea.style.width=parent.offsetWidth +'px'
		textarea.style.height=parent.offsetHeight+'px'

		textarea.innerHTML=p.innerHTML
		textarea.addEventListener('keypress',function(event){
			if(event.keyCode===13){
				event.stopPropagation()

				if(this.value){
					p.innerHTML=this.value
					parent.removeChild(this)
				}else{
					alert('Please input some value');
				}
			}
		})

		parent.appendChild(textarea)
	})
	return span

}

function createColorPlate(parent){
	const colors=['red','blue','gray','skyblue','palegreen']
	let colorDiv=document.createElement("div");
	colorDiv.className='d-flex mt-1'
	colors.forEach(color =>{
		let div=document.createElement("div");

		div.addEventListener('click',function(){
			parent.style.background=color
		})

		div.className='color-circle ml-1'
		div.style.background=color
		colorDiv.appendChild(div)

	})
	return colorDiv
}