let rollNumbers = [];
let editRowRef =  null;

$(document).ready(function () {
          $(".needs-validation").on("submit", function (event) {
        event.preventDefault();

        if (!this.checkValidity()) {
            event.stopPropagation();
            $(this).addClass("was-validated");
            return;
        }
        saveStudent();
        this.reset();
        $(this).removeClass("was-validated");
    });

    })


function saveStudent() {
    let name = $("#name").val().trim();
    let roll = Number($("#rollnumber").val());
    let sub1 = Number($("#sub1").val());
    let sub2 = Number($("#sub2").val());
    let sub3 = Number($("#sub3").val());

 
 if (!editRowRef) {
        if (rollNumbers.includes(roll)) {
            alert("Roll number must be unique!");
            return;
        }
        rollNumbers.push(roll);
    } else {
        let oldRoll = Number(editRowRef.find("td:eq(1)").text());

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


    let row = `
        <tr>
            <td>
            <button class="btn btn-link p-0 showBtn">${name}</button>
            </td>
            <td>${roll}</td>
            <td>${sub1}</td>
            <td>${sub2}</td>
            <td>${sub3}</td>
            <td>${total}</td>
            <td>${average.toFixed(2)}</td>
            <td>${result}</td>
            <td>${Grade}</td>
            <td>
                <button class="btn btn-warning btn-sm me-1 editBtn">Edit</button>
                <button class="btn btn-danger btn-sm deleteBtn">Delete</button>
            </td>

        </tr>
    `;

   
    if (editRowRef) {
        editRowRef.find("td:eq(0)").text(name);
        editRowRef.find("td:eq(1)").text(roll);
        editRowRef.find("td:eq(2)").text(sub1);
        editRowRef.find("td:eq(3)").text(sub2);
        editRowRef.find("td:eq(4)").text(sub3);
        editRowRef.find("td:eq(5)").text(total);
        editRowRef.find("td:eq(6)").text(average.toFixed(2));
        editRowRef.find("td:eq(7)").text(result);
        editRowRef.find("td:eq(8)").text(Grade);

        editRowRef = null;
    } else {
         $("#tableBody").append(row);
    }

        $(".needs-validation")[0].reset();
        $(".needs-validation").removeClass("was-validated");

}

$(document).on("click", ".deleteBtn", function () {
    let row = $(this).closest("tr");
    let roll = Number(row.find("td:eq(1)").text());

    rollNumbers = rollNumbers.filter(r => r !== roll);
    row.remove();
});


$(document).on("click", ".editBtn", function () {
    editRowRef = $(this).closest("tr");

    $("#name").val(editRowRef.find("td:eq(0)").text());
    $("#rollnumber").val(editRowRef.find("td:eq(1)").text());
    $("#sub1").val(editRowRef.find("td:eq(2)").text());
    $("#sub2").val(editRowRef.find("td:eq(3)").text());
    $("#sub3").val(editRowRef.find("td:eq(4)").text());
});



$(document).on("click", ".showBtn", function () {
    let row = $(this).closest("tr");

    $("#cardName").text(row.find("td:eq(0)").text());
    $("#cardRoll").text(row.find("td:eq(1)").text());
    $("#cardSub1").text(row.find("td:eq(2)").text());
    $("#cardSub2").text(row.find("td:eq(3)").text());
    $("#cardSub3").text(row.find("td:eq(4)").text());
    $("#cardTotal").text(row.find("td:eq(5)").text());
    $("#cardAverage").text(row.find("td:eq(6)").text());
    $("#cardResult").text(row.find("td:eq(7)").text());
    $("#cardGrade").text(row.find("td:eq(8)").text());

    $("#studentCard").removeClass("d-none");
});


function closeCard() {
    $("#studentCard").addClass("d-none");
}



function login() {
    let u = $("#username").val();
    let p = $("#password").val();

    if (u === "jq" && p === "1234") {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "./index .html"; 
    } else {
        $("#error").text("Invalid credentials");
    }
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}




$(document).ready(function () {

    $(".needs-validation").on("submit", function (event) {
        event.preventDefault();

        if (!this.checkValidity()) {
            event.stopPropagation();
            $(this).addClass("was-validated");
            return;
        }

        saveStudent();
        this.reset();
        $(this).removeClass("was-validated");
    });

});

