let rollNumbers = [];
let editRowRef = null;

function saveStudent() {
    let name = document.getElementById("name").value.trim();
    let roll = Number(document.getElementById("rollnumber").value);
    let sub1 = Number(document.getElementById("sub1").value);
    let sub2 = Number(document.getElementById("sub2").value);
    let sub3 = Number(document.getElementById("sub3").value);



    if (!editRowRef) {
        
        if (rollNumbers.includes(roll)) {
            alert("Roll number must be unique!");
            return;
        }
        rollNumbers.push(roll);
    } else {
       
        let oldRoll = Number(editRowRef.children[1].innerText);

        if (oldRoll !== roll && rollNumbers.includes(roll)) {
            alert("Roll number must be unique!");
            return;
        }

        
        rollNumbers = rollNumbers.filter(r => r !== oldRoll);
        rollNumbers.push(roll);
    }

    

    let total = sub1 + sub2 + sub3;
    let average = total / 3;

    let result = "";
    let grade = "";

    if (sub1 >= 40 && sub2 >= 40 && sub3 >= 40) {
        result = "P";
        if (average >= 90) grade = "A+";
        else if (average >= 80) grade = "A";
        else if (average >= 70) grade = "B+";
        else if (average >= 60) grade = "B";
        else if (average >= 50) grade = "C+";
        else grade = "C";
    } else {
        result = "F";
        grade = "-";
    }

    let tableBody = document.getElementById("tableBody");

    let rowHTML = `
        <tr>
            <td>
                <button class="btn btn-link p-0"
                    onclick="showStudentCard('${name}', ${roll}, ${sub1}, ${sub2}, ${sub3}, ${total}, ${average}, '${result}', '${grade}')">
                    ${name}
                </button>
            </td>
            <td>${roll}</td>
            <td>${sub1}</td>
            <td>${sub2}</td>
            <td>${sub3}</td>
            <td>${total}</td>
            <td>${average.toFixed(2)}</td>
            <td>${result}</td>
            <td>${grade}</td>
            <td>
                <button class="btn btn-warning btn-sm me-1" onclick="editRow(this)">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteRow(this, ${roll})">Delete</button>
            </td>
        </tr>
    `;


    if (editRowRef) {
        editRowRef.innerHTML = rowHTML;
        editRowRef = null;
    } else {
        tableBody.innerHTML += rowHTML;
    }

    document.querySelector("form").reset();
}


function deleteRow(button, roll) {
    let row = button.closest("tr");
    row.remove();
    rollNumbers = rollNumbers.filter(r => r !== roll);
}


function editRow(button) {
    editRowRef = button.closest("tr");

    document.getElementById("name").value = editRowRef.children[0].innerText;
    document.getElementById("rollnumber").value = editRowRef.children[1].innerText;
    document.getElementById("sub1").value = editRowRef.children[2].innerText;
    document.getElementById("sub2").value = editRowRef.children[3].innerText;
    document.getElementById("sub3").value = editRowRef.children[4].innerText;
}


function showStudentCard(name, roll, s1, s2, s3, total, avg, result, grade) {
    document.getElementById("cardName").innerText = name;
    document.getElementById("cardRoll").innerText = roll;
    document.getElementById("cardSub1").innerText = s1;
    document.getElementById("cardSub2").innerText = s2;
    document.getElementById("cardSub3").innerText = s3;
    document.getElementById("cardTotal").innerText = total;
    document.getElementById("cardAverage").innerText = avg.toFixed(2);
    document.getElementById("cardResult").innerText = result;
    document.getElementById("cardGrade").innerText = grade;

    document.getElementById("studentCard").classList.remove("d-none");
}

function closeCard() {
    document.getElementById("studentCard").classList.add("d-none");
}

function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    if (u === "admin" && p === "1234") {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "./index .html";
    } else {
        document.getElementById("error").innerText = "Invalid credentials";
    }
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}


(() => {
    'use strict';
    const form = document.querySelector('.needs-validation');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (form.checkValidity()) {
            saveStudent();
        }
        form.classList.add('was-validated');
    });
})();
