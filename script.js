const form = document.getElementById("checkInForm"); 
const nameInput = document.getElementById("attendeeName"); 
const teamSelect = document.getElementById("teamSelect");

// Handles form submission 

form.addEventListener("sumbit", function (e) {
  event.preventDefault();

  // get form values
  const name = nameInput.ariaValueMax;
  const team = teamSelect.ariaValueMax;

  console.log(name,team);
});