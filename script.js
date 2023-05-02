const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box");

let editId, isEditTask = false, todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let liTag = "";
    if(todos) {
        let index=0;
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if(filter=="completed") {                
                if(todo.status=="completed") {
                    index++;
                    liTag += `<li class="task">
                            <label for="${id}">
                                <p class="${pending}">` +index + `.)  ${todo.name}</p>
                            </label>
                        </li>`;
                }                
            } else if(filter == "pending") {
                if(todo.status=="pending") {
                    index++;
                    liTag += `<li class="task">
                            <label for="${id}">
                                <p class="${completed}">` +index + `.)  ${todo.name}</p>
                            </label>
                        </li>`;
                } 
            } else if(filter == "all") {
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }    
    if(filter=="all") {
        taskBox.innerHTML = liTag || `<span><p class = "para">You did not assign any task here</p></span>`;
    } else if (filter=="completed") {
        taskBox.innerHTML = liTag || `<span><p class = "para">Data not available</p></span>`;
    } else if (filter=="pending"||filter==undefined) {
        taskBox.innerHTML = liTag || `<span><p class = "para">You set alright! No works pending!</p></span>`;
    }
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");

function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
}

function deleteTask(deleteId, filter) {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
}

clearAll.addEventListener("click", () => {
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
});

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask) {
        if(!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
});

const chk_dark_theme_enabled = document.getElementById("dark_theme_checked");
function theme_apply() {
    if(chk_dark_theme_enabled.checked) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    apply_theme(localStorage.getItem('theme'));
}
function apply_theme(theme) {
    const updateValues = vars => Object.entries(vars).forEach(v => document.querySelector(':root').style.setProperty(v[0], v[1]));
    var properties = null;
    if(theme=='dark') {
        properties = {
            '--body_bg' : 'linear-gradient(135deg, #131412, #121212)',
            '--btn_active_color' : 'linear-gradient(135deg, #a60cc2, #2e1b96)',
            '--btn_clr_active_hover' : 'linear-gradient(135deg, #a822e1 0%, #fe2dc3 100%)',
            '--btn_clr_inactive' : 'linear-gradient(135deg, #383532 0%, #261d14 100%)',
            '--filter_selected_tab_color' : '#facd05',
            '--filter_inactive_hover_color' : '#cca8ff',
            '--filter_selected_active_hover_color' : '#f28e22',
            '--filter_inactive' : '#823ce6',
            '--wrapper_bg' : "#1e1d1f",
            '--border_task_input' : '2px solid #BB86FC',
            '--border_each_task' : '1.3px solid #8e53e0',
            '--nav_bar_bg_color' : '#1e1629',
            '--nav_bar_li_txt_color' : '#FF7597',
            '--nav_bar_li_txt_hover_color' : '#03DAC6',
            '--nav_bar_li_hover_color' : '#281542',
            '--slider_track_filled' : '#525027',
            '--slider_track_empty' : '#f6603c',
            '--slider_ball' : '#ebe30e',
            '--todolist_txt_color' : '#BB86FC',
            '--txt_inp_color' : '#1a1621',
            '--placeholder' : '#7037bf',
            '--txt_input_clr' : '#fefefe',
            '--drop_down_list_box_color' : '#040a7d',
            '--drop_down_list_box_option_hover_color' : '#140a70',
            '--list_item_bg' : '#0f1026',
            '--list_item_txt_clr' : '#99e009',
            '--list_item_hovered_bg' : '#99e009',
            '--list_item_hovered_txt_clr' : '#0f1026',
            '--settings_menu_bg' : '#71078f',
            '--settings_hover' : '#4d0e5e',
        };        
    } else {
        properties = {
            '--body_bg' : 'linear-gradient(135deg, #4AB1FF, #2D5CFE)',            
            '--btn_active_color' : 'linear-gradient(135deg, #4AB1FF, #2D5CFE)',
            '--btn_clr_active_hover' : 'linear-gradient(135deg, #a822e1 0%, #fe2dc3 100%)',
            '--btn_clr_inactive' : 'linear-gradient(135deg, #180101 0%, #2b2c2f 100%)',
            '--filter_selected_tab_color' : '#3C87FF',
            '--filter_inactive_hover_color' : '#700c0c',
            '--filter_selected_active_hover_color' : '#0c7034',
            '--filter_inactive' : '#7a7878',
            '--wrapper_bg' : "#fefefe",
            '--border_task_input' : '2px solid #999999',
            '--border_each_task' : '1.3px solid #cccccc',
            '--nav_bar_bg_color' : '#270754',
            '--nav_bar_li_txt_color' : '#dddddd',
            '--nav_bar_li_txt_hover_color' : '#b9a1b7',
            '--nav_bar_li_hover_color' : '#180234',
            '--slider_track_filled' : '#2196F3',
            '--slider_track_empty' : '#999999',
            '--slider_ball' : '#efefef',
            '--todolist_txt_color' : '#020202',
            '--txt_inp_color' : '#efefef',
            '--placeholder' : '#322d38',
            '--txt_input_clr' : '#010101',
            '--drop_down_list_box_color' : '#2793db',
            '--drop_down_list_box_option_hover_color' : '#140a70',
            '--list_item_bg' : '#56aee8',
            '--list_item_txt_clr' : '#040a7d',
            '--list_item_hovered_bg' : '#040a7d',
            '--list_item_hovered_txt_clr' : '#56aee8',
            '--settings_menu_bg' : '#109beb',
            '--settings_hover' : '#07228f',
        };
    }    
    updateValues(properties);
}
switch(localStorage.getItem('theme')) {
    case 'dark' :
        chk_dark_theme_enabled.checked = true;
        apply_theme('dark');
        break;
    default :
        localStorage.setItem('theme', 'light');
        apply_theme('light');
}

const lbl_date_and_time = document.getElementById("lbl_date_and_time");
const lbl_day = document.getElementById("lbl_day_of_week");
function update_day() {
    const now = new Date();
    switch (now.getDay()) {
        case 0 :  lbl_day.innerHTML = "Sunday"; return;
        case 1 :  lbl_day.innerHTML = "Monday"; break;
        case 2 :  lbl_day.innerHTML = "Tuesday"; return;
        case 3 :  lbl_day.innerHTML = "Wednesday"; break;
        case 4 :  lbl_day.innerHTML = "Thursday"; return;
        case 5 :  lbl_day.innerHTML = "Friday"; break;
        case 6 :  lbl_day.innerHTML = "Saturday"; return;
    }
}
function update_date_and_time() {
    const now = new Date();
    const year = "" + now.getFullYear(), month = (now.getMonth() + 1) > 9 ? "" + (now.getMonth() + 1) : "0" + (now.getMonth() + 1);
    const date = (now.getDate()) > 9 ? "" + now.getDate() : "0" + now.getDate();
    const hour = (now.getHours()) > 9 ? "" + now.getHours() : "0" + now.getHours();
    const minutes = (now.getMinutes()) > 9 ? "" + now.getMinutes() : "0" + now.getMinutes();
    const seconds = (now.getSeconds()) > 9 ? "" + now.getSeconds() : "0" + now.getSeconds();
    lbl_date_and_time.innerHTML = hour + " : " + minutes + " : " + seconds + "    |    " + date + "-" + month + "-" + year;
    if(hour==00&&minutes==00&&seconds==00) {
        update_day();
    }    
}
update_day();
update_date_and_time();
setInterval(update_date_and_time, 1000);
const lbl_font_name_shower = document.getElementById("font_name");
if(localStorage.getItem('font') == undefined) {
    setFont('Crimson Text');
} else {
    setFont(localStorage.getItem('font'));
}
function setFont(font_name) {
    localStorage.setItem('font', font_name);
    lbl_font_name_shower.innerHTML = font_name;
    document.documentElement.style.setProperty('--ff', '\'' + font_name + '\', sans-serif');
}
