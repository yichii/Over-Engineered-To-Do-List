const body = document.querySelector('body');
const list = document.querySelector('ul');
const input = document.querySelector('input');
const button = document.querySelector('button');
const progress = document.querySelector('progress')
const progressText = document.querySelector('h3')

button.addEventListener('click', () => {
    if (input.value){
        const item = document.createElement('div')
        const checkbox = document.createElement('input')
        const label = document.createElement('label');
        const edit = document.createElement('button');
        const hide = document.createElement('button');
        const trash = document.createElement('button');

        item.draggable = true;
        item.id = 'list-item-' + Math.random().toString().substring(2,4);
        checkbox.type = 'checkbox';
        label.textContent = input.value;
        label.spellcheck = false;
        edit.classList = 'fa-solid fa-pen-to-square';
        hide.classList = 'fa-solid fa-eye';
        trash.classList = 'fa-solid fa-trash';
        input.value = '';

        item.append(checkbox);
        item.append(label);
        item.append(edit);
        item.append(hide);
        item.append(trash);
        list.append(item);
        updateProgress();

        // Dragging feature
        item.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.id);
        });
        
        item.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        list.addEventListener('drop', (event) => {
            const data = event.dataTransfer.getData("text");
            const dropzone = event.target.parentElement
            console.log(data)
            if (dropzone == list.lastChild){
                list.append(document.getElementById(data))
            } else {
                list.insertBefore(document.getElementById(data), dropzone);
            }

            event.preventDefault();
            event.stopImmediatePropagation();

        });

        checkbox.addEventListener('click', () => {
            label.classList.toggle('strikeout');
            item.classList.add = 'hide';
            updateProgress();
        })

        edit.addEventListener('click', () => {
            if (edit.classList.contains('fa-solid')){
                edit.className = 'fa-regular fa-pen-to-square';
                label.contentEditable = true;
                label.focus();
            } else {
                edit.className = 'fa-solid fa-pen-to-square';
                label.contentEditable = false;
            }  
        })

        hide.addEventListener('click', () => {
            item.classList.toggle('hide');
            if (hide.classList.contains('fa-solid')){
                hide.className = 'fa-regular fa-eye';
            } else {
                hide.className = 'fa-solid fa-eye';
            }
        })
        
        trash.addEventListener('click', () => {
            list.removeChild(item);
            updateProgress();
        })
    } else {}
});

function updateProgress() {
    const checkedItems = document.querySelectorAll('#list input:checked').length;
    const totalItems = list.childElementCount;
    progress.value = (checkedItems/totalItems) * 100;
    progressText.textContent = Math.floor(progress.value) + '%';
}

input.focus();