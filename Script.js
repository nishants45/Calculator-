/* =====================================
   AKTU SGPA & CGPA CALCULATOR
===================================== */


/* =====================================
   ADD SUBJECT
===================================== */

function addSubject() {

    const subjects = document.getElementById("subjects");

    const subject = document.createElement("div");

    subject.className = "subject";

    subject.innerHTML = `

        <input
            type="text"
            class="subject-name"
            placeholder="Subject name">

        <input
            type="number"
            class="credit"
            placeholder="Credits"
            min="0"
            step="0.5">

        <select class="grade">

            <option value="">Grade</option>

            <option value="10">O / A*</option>
            <option value="9">A+</option>
            <option value="8">A</option>
            <option value="7">B+</option>
            <option value="6">B</option>
            <option value="5">C</option>
            <option value="4">D</option>
            <option value="0">F</option>

        </select>

        <button
            class="remove-btn"
            onclick="removeSubject(this)">
            ✕
        </button>

    `;

    subjects.appendChild(subject);
}


/* =====================================
   REMOVE SUBJECT
===================================== */

function removeSubject(button) {

    const subjects = document.querySelectorAll(".subject");

    if (subjects.length <= 1) {

        alert("At least one subject is required.");

        return;
    }

    button.parentElement.remove();
}


/* =====================================
   CALCULATE SGPA
===================================== */

function calculateSGPA() {

    const subjects = document.querySelectorAll(".subject");

    let totalCredits = 0;

    let totalPoints = 0;


    for (let subject of subjects) {

        const credit =
            parseFloat(
                subject.querySelector(".credit").value
            );

        const grade =
            subject.querySelector(".grade").value;


        /* Validation */

        if (
            isNaN(credit) ||
            credit <= 0 ||
            grade === ""
        ) {

            alert(
                "Please enter valid credits and grade for every subject."
            );

            return;
        }


        const gradePoint = parseFloat(grade);


        /* Formula */

        totalCredits += credit;

        totalPoints += credit * gradePoint;
    }


    if (totalCredits === 0) {

        alert("Please enter valid credits.");

        return;
    }


    const sgpa =
        totalPoints / totalCredits;


    /* Display result */

    document.getElementById("sgpaValue")
        .textContent = sgpa.toFixed(2);

    document.getElementById("totalCredits")
        .textContent =
        "Total Credits: " + totalCredits;


    document.getElementById("sgpaResult")
        .classList.remove("hidden");
}


/* =====================================
   ADD SEMESTER
===================================== */

function addSemester() {

    const semesters =
        document.getElementById("semesters");


    const semesterCount =
        semesters.querySelectorAll(".semester").length + 1;


    const semester =
        document.createElement("div");


    semester.className = "semester";


    semester.innerHTML = `

        <span class="semester-number">
            Semester ${semesterCount}
        </span>

        <input
            type="number"
            class="sgpa-input"
            placeholder="SGPA"
            min="0"
            max="10"
            step="0.01">

        <input
            type="number"
            class="semester-credit"
            placeholder="Credits"
            min="0"
            step="0.5">

        <button
            class="remove-btn"
            onclick="removeSemester(this)">
            ✕
        </button>

    `;


    semesters.appendChild(semester);
}


/* =====================================
   REMOVE SEMESTER
===================================== */

function removeSemester(button) {

    const semesters =
        document.querySelectorAll(".semester");


    if (semesters.length <= 1) {

        alert(
            "At least one semester is required."
        );

        return;
    }


    button.parentElement.remove();


    updateSemesterNumbers();
}


/* =====================================
   UPDATE SEMESTER NUMBERS
===================================== */

function updateSemesterNumbers() {

    const semesters =
        document.querySelectorAll(".semester");


    semesters.forEach((semester, index) => {

        semester.querySelector(
            ".semester-number"
        ).textContent =
            "Semester " + (index + 1);

    });
}


/* =====================================
   CALCULATE CGPA
===================================== */

function calculateCGPA() {

    const semesters =
        document.querySelectorAll(".semester");


    let totalCredits = 0;

    let totalWeightedSGPA = 0;


    for (let semester of semesters) {

        const sgpa =
            parseFloat(
                semester.querySelector(".sgpa-input").value
            );

        const credits =
            parseFloat(
                semester.querySelector(".semester-credit").value
            );


        /* Validation */

        if (
            isNaN(sgpa) ||
            isNaN(credits) ||
            sgpa < 0 ||
            sgpa > 10 ||
            credits <= 0
        ) {

            alert(
                "Please enter valid SGPA and credits for every semester."
            );

            return;
        }


        /* Formula */

        totalCredits += credits;

        totalWeightedSGPA +=
            sgpa * credits;
    }


    if (totalCredits === 0) {

        alert("Please enter valid credits.");

        return;
    }


    const cgpa =
        totalWeightedSGPA / totalCredits;


    /* Display result */

    document.getElementById("cgpaValue")
        .textContent = cgpa.toFixed(2);


    document.getElementById("cgpaCredits")
        .textContent =
        "Total Credits: " + totalCredits;


    document.getElementById("cgpaResult")
        .classList.remove("hidden");
}
