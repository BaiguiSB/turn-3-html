
var todo;
var done;

function init(){
    todo=new Vue({
        el: "#todo",
        data: {
            todoCount: 0,
            html_todoList: ""
        }
    })
    done = new Vue({
        el: "#done",
        data: {
            doneCount: 0,
            html_doneList: ""
        }
    })
}


//浏览器页面显示列表
function showList() {
    var data = localStorage.getItem("todoList");
    var todoList1 = "";
    var doneList1 = "";
    var count1 = 0;
    var count2 = 0;
    if (data != null) {
        data = JSON.parse(data);
        for (var i = data.length - 1; i >= 0; i--) {
            if (data[i].status) {
                doneList1 += "<li id='li-" + i + "'><input class='checkBox' type='checkbox' style='float:left;' checked='checked' onchange='change(" + i + ",true)'>" +
                    "<input class='content' type='text' style='float:left;' id='" + i + "' value=" + data[i].li + " onchange='update(" + i + ")'>" +
                    "<span class='listSpan' style='float:right;' onclick=remove(" + i + ")>" + "-</span></li>";
                count2++;

            } else {
                todoList1 += "<li id='li-" + i + "'><input class='checkBox' type='checkbox' style='float:left;' onchange='change(" + i + ",false)'>" +
                    "<input class='content' type='text' style='float:left;' id='" + i + "' value=" + data[i].li + " onchange='update(" + i + ")'>" +
                    "<span class='listSpan' style='float:right;' onclick=remove(" + i + ")>" + "-</span></li>";
                count1++;
            }
        }
    }

    todo.html_todoList=todoList1;
    todo.todoCount=count1;
    done.html_doneList=doneList1;
    done.doneCount=count2;

}

//change todolist and donelist
function change(id, val) {
    var data = loadData();
    if (val) {
        var li = document.getElementById("li-" + id);
        var checkbox = li.children[0];
        checkbox.innerHTML = "<input class='checkBox' type='checkbox' style='float:left;' onchange='change(" + id + ",false)'>";
        var doneCount = new Number(document.getElementById("doneCount").innerText);
        doneCount.innerText = doneCount - 1;
        data[id].status = false;
        saveData(data);
        showList();
    } else {
        var li = document.getElementById("li-" + id);
        var checkbox = li.children[0];
        checkbox.innerHTML = "<input class='checkBox' type='checkbox' checked='checked' style='float:left;' onchange='change(" + id + ",true)'>";
        var todoCount = new Number(document.getElementById("todoCount").innerText);
        todoCount.innerText = todoCount - 1;
        data[id].status = true;
        saveData(data);
        showList();
    }
}

//编辑
function update(id) {
    var data = loadData();
    var newItem = document.getElementById(new String(id));  //被修改的数据
    data[id].li = newItem.value;
    saveData(data);
}

//删除
function remove(n) {
    var data = loadData();
    data.splice(n, 1);
    saveData(data);
    showList();
}

//保存数据
function saveData(data) {
    data = JSON.stringify(data);
    localStorage.setItem("todoList", data);
}
//读取数据
function loadData() {
    var data = localStorage.getItem("todoList");
    var emptyArray = [];
    if (data == null) {
        return emptyArray;
    } else {
        return JSON.parse(data);
    }
}

//提交表单
function postaction() {
    var inputTodo = document.getElementById("inputTodo");
    if (inputTodo.value == "") {
        alert("内容不能为空");
    } else {
        //读取数据
        var data = loadData();
        var todo = { "li": inputTodo.value, "status": false };
        data.push(todo);
        saveData(data);
        var form = document.getElementById("form");
        form.reset();
        //页面新增数据
        showList();
    }
}
window.onload = function () {
    init();
    showList();
}