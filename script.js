let rollNumbers = [];
let editRowRef = null;


const submitBtn = document.querySelector("button");

function saveStudent() {
    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("rollnumber").value;
    let sub1 = Number(document.getElementById("sub1").value);
    let sub2 = Number(document.getElementById("sub2").value);
    let sub3 = Number(document.getElementById("sub3").value);


 
    rollNumbers.push(roll);


    let total = sub1 + sub2 + sub3;
    let average = total / 3;

    let result = "";
    let Grade = "";


    if (sub1 >= 40 && sub2 >= 40 && sub3 >= 40) {
        result = "P";

        if (average >= 90) Grade = "A+";
        else if (average >= 80 && average < 90) Grade = "A";
        else if (average >= 70 && average < 80) Grade = "B+";
        else if (average >= 60 && average < 70) Grade = "B";
        else if (average >= 50 && average < 60) Grade = "C+";
        else Grade = "C";

    } else {
        result = "F";
    }

    let tableBody = document.getElementById("tableBody");

    let row = `
        <tr>
            <td>${name}</td>
            <td>${roll}</td>
            <td>${sub1}</td>
            <td>${sub2}</td>
            <td>${sub3}</td>
            <td>${total}</td>
            <td>${average}</td>
            <td>${result}</td>
            <td>${Grade}</td>
            <td>
                <button class="btn btn-warning btn-sm me-1" onclick="editRow(this)">
                     Edit
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteRow(this, '${roll}')">
                    Delete
                </button>
            </td>

        </tr>
    `;

   
    if (editRowRef) {
        
        editRowRef.children[0].innerText = name;
        editRowRef.children[1].innerText = roll;
        editRowRef.children[2].innerText = sub1;
        editRowRef.children[3].innerText = sub2;
        editRowRef.children[4].innerText = sub3;
        editRowRef.children[5].innerText = total;
        editRowRef.children[6].innerText = average;
        editRowRef.children[7].innerText = result;
        editRowRef.children[8].innerText = Grade;

        editRowRef = null;
    } else {
         tableBody.innerHTML += row;
    }

        document.querySelector("form").reset();

    
}
function deleteRow(button, roll) {
    let row = button.closest("tr");
    row.remove();

    rollNumbers = rollNumbers.filter(r => Number(r) !== Number(roll));
}

function editRow(button) {
    editRowRef = button.closest("tr");

    document.getElementById("name").value =
        editRowRef.children[0].innerText;
    
    document.getElementById("rollnumber").value =
        editRowRef.children[1].innerText;
    
    document.getElementById("sub1").value =
        editRowRef.children[2].innerText;
    
    document.getElementById("sub2").value =
        editRowRef.children[3].innerText;
    
    document.getElementById("sub3").value =
        editRowRef.children[4].innerText;
}

(() => {
    'use strict';

    const form = document.querySelector('.needs-validation');

    form.addEventListener('submit', function (event) {

        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            saveStudent();          
        }

        form.classList.add('was-validated');
    });
})();
