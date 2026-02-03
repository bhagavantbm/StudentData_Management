
class Student {
    constructor(name, roll, sub1, sub2, sub3) {
        this.name = name;
        this.roll = roll;
        this.sub1 = sub1;
        this.sub2 = sub2;
        this.sub3 = sub3;
    }

    getTotal() {
        return this.sub1 + this.sub2 + this.sub3;
    }

    getAverage() {
        return this.getTotal() / 3;
    }

    getResult() {
        return (this.sub1 >= 40 && this.sub2 >= 40 && this.sub3 >= 40) ? "P" : "F";
    }

    getGrade() {
        const avg = this.getAverage();
        if (this.getResult() === "F") return " ";
        if (avg >= 90) return "A+";
        if (avg >= 80) return "A";
        if (avg >= 70) return "B+";
        if (avg >= 60) return "B";
        if (avg >= 50) return "C+";
        return "C";
    }
}


class StudentManager {
    constructor() {
        this.rollNumbers = [];
        this.editRowRef = null;
        this.tableBody = document.getElementById("tableBody");
    }

    isUniqueRoll(roll) {
        return !this.rollNumbers.includes(roll);
    }

    addRoll(roll) {
        this.rollNumbers.push(roll);
    }

    removeRoll(roll) {
        this.rollNumbers = this.rollNumbers.filter(r => r !== roll);
    }

    saveStudent() {
        const name = document.getElementById("name").value.trim();
        const roll = Number(document.getElementById("rollnumber").value);
        const s1 = Number(document.getElementById("sub1").value);
        const s2 = Number(document.getElementById("sub2").value);
        const s3 = Number(document.getElementById("sub3").value);

        if (!this.editRowRef) {
            if (!this.isUniqueRoll(roll)) {
                alert("Roll number must be unique!");
                return;
            }
            this.addRoll(roll);
        } else {
            const oldRoll = Number(this.editRowRef.children[1].innerText);
            if (oldRoll !== roll && !this.isUniqueRoll(roll)) {
                alert("Roll number must be unique!");
                return;
            }
            this.removeRoll(oldRoll);
            this.addRoll(roll);
        }

        const student = new Student(name, roll, s1, s2, s3);

        const rowHTML = `
        <tr>
            <td>
               <button class="btn btn-link p-0"
                    onclick="app.showStudentCard(
                        '${student.name}',
                        ${student.roll},
                        ${student.sub1},
                        ${student.sub2},
                        ${student.sub3}
                    )">
                    ${student.name}
                </button>

            </td>
            <td>${student.roll}</td>
            <td>${student.sub1}</td>
            <td>${student.sub2}</td>
            <td>${student.sub3}</td>
            <td>${student.getTotal()}</td>
            <td>${student.getAverage().toFixed(2)}</td>
            <td>${student.getResult()}</td>
            <td>${student.getGrade()}</td>
            <td>
                <button class="btn btn-warning btn-sm me-1" onclick="app.editRow(this)">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="app.deleteRow(this, ${student.roll})">Delete</button>
            </td>
        </tr>`;

        if (this.editRowRef) {
            this.editRowRef.innerHTML = rowHTML;
            this.editRowRef = null;
        } else {
            this.tableBody.innerHTML += rowHTML;
        }

        document.querySelector("form").reset();
    }

    deleteRow(button, roll) {
        button.closest("tr").remove();
        this.removeRoll(roll);
    }

    editRow(button) {
        this.editRowRef = button.closest("tr");

        document.getElementById("name").value = this.editRowRef.children[0].innerText;
        document.getElementById("rollnumber").value = this.editRowRef.children[1].innerText;
        document.getElementById("sub1").value = this.editRowRef.children[2].innerText;
        document.getElementById("sub2").value = this.editRowRef.children[3].innerText;
        document.getElementById("sub3").value = this.editRowRef.children[4].innerText;
    }

        showStudentCard(name, roll, s1, s2, s3) {
            const student = new Student(name, roll, s1, s2, s3);

            document.getElementById("cardName").innerText = student.name;
            document.getElementById("cardRoll").innerText = student.roll;
            document.getElementById("cardSub1").innerText = student.sub1;
            document.getElementById("cardSub2").innerText = student.sub2;
            document.getElementById("cardSub3").innerText = student.sub3;
            document.getElementById("cardTotal").innerText = student.getTotal();
            document.getElementById("cardAverage").innerText = student.getAverage().toFixed(2);
            document.getElementById("cardResult").innerText = student.getResult();
            document.getElementById("cardGrade").innerText = student.getGrade();

            document.getElementById("studentCard").classList.remove("d-none");
        }

    closeCard() {
        document.getElementById("studentCard").classList.add("d-none");
    }
}


class Auth {
    static login() {
        const u = document.getElementById("username").value;
        const p = document.getElementById("password").value;

        if (u === "oops" && p === "1234") {
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "./index .html";
        } else {
            document.getElementById("error").innerText = "Invalid credentials";
        }
    }

    static logout() {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "./login.html";
    }
}


(() => {
    'use strict';
    const form = document.querySelector('.needs-validation');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (form.checkValidity()) {
            app.saveStudent();
        }
        form.classList.add('was-validated');
    });
})();


const app = new StudentManager();
