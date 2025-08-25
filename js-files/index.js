// =============================
// DOM ELEMENTS
// =============================
const container = document.querySelector(".container");
const specialties = document.querySelectorAll(".specialty");
const selectedSpecialtyInput = document.getElementById("selectedSpecialty");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const successPopup = document.getElementById("successPopup");
const navLinks = document.querySelectorAll(".nav-links a");

// =============================
// FUNCTIONS
// =============================

// Highlight selected specialty
function selectSpecialty(element) {
  specialties.forEach((el) => el.classList.remove("selected"));
  element.classList.add("selected");
  const name = element.getAttribute("data-name");
  selectedSpecialtyInput.value = name;
}

// Booking logic
function bookAppointment() {
  const specialty = selectedSpecialtyInput.value;
  const date = dateInput.value;
  const time = timeInput.value;

  if (!specialty || !date || !time) {
    alert("يرجى اختيار التخصص والتاريخ والوقت قبل الحجز.");
    return;
  }

  successPopup.classList.add("active");
}

// Close popup and reset fields
function closePopup() {
  successPopup.classList.remove("active");
  selectedSpecialtyInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
  specialties.forEach((el) => el.classList.remove("selected"));
}

// =============================
// EVENT LISTENERS
// =============================

// Specialty selection
specialties.forEach((specialty) => {
  specialty.addEventListener("click", () => selectSpecialty(specialty));
});

// Hook up buttons
document.querySelector("button[onclick='bookAppointment()']")
  ?.addEventListener("click", bookAppointment);

document.querySelector("button[onclick='closePopup()']")
  ?.addEventListener("click", closePopup);

document.addEventListener("DOMContentLoaded", function() {
  const currentPath = window.location.pathname.split("/").pop(); 
  document.querySelectorAll(".nav-links a").forEach(link => {
    if(link.getAttribute("href") === currentPath){
      link.classList.add("active");
    }
  });
});
//Searching patients
function filterTable() {
    let nameSearch = document.getElementById("nameSearch").value.toLowerCase();
    let fromDate = document.getElementById("fromDate").value;
    let toDate = document.getElementById("toDate").value;
    let table = document.getElementById("appointmentsTable");
    let tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        let tdName = tr[i].getElementsByTagName("td")[0];
        let tdDate = tr[i].getElementsByTagName("td")[2];
        if (tdName && tdDate) {
            let nameValue = tdName.textContent || tdName.innerText;
            let dateValue = tdDate.textContent || tdDate.innerText;

            let matchesName = nameSearch === "" || nameValue.toLowerCase().includes(nameSearch);
            let matchesDate = true;

            if (fromDate && dateValue < fromDate) matchesDate = false;
            if (toDate && dateValue > toDate) matchesDate = false;

            if (matchesName && matchesDate) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
  const existingCourseCheck = document.getElementById("existingCourseCheck");
  const newCourseCheck = document.getElementById("newCourseCheck");
  const specialtiesContainer = document.querySelector(".specialties");
  const previousCoursesContainer = document.getElementById("previousCoursesContainer");
  const selectedSpecialty = document.getElementById("selectedSpecialty");
  const previousCourses = document.getElementById("previousCourses");

  existingCourseCheck.addEventListener("change", () => {
    if (existingCourseCheck.checked) {
      newCourseCheck.checked = false;
      specialtiesContainer.style.display = "none";
      previousCoursesContainer.style.display = "block";
      selectedSpecialty.value = "";
    } else {
      specialtiesContainer.style.display = "flex";
      previousCoursesContainer.style.display = "none";
    }
  });

  newCourseCheck.addEventListener("change", () => {
    if (newCourseCheck.checked) {
      existingCourseCheck.checked = false;
      specialtiesContainer.style.display = "flex";
      previousCoursesContainer.style.display = "none";
    }
  });

  previousCourses.addEventListener("change", (e) => {
    selectedSpecialty.value = e.target.options[e.target.selectedIndex].text;
  });
});
