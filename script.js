const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const celebration = document.getElementById("celebration");
const attendeeList = document.getElementById("attendeeList");

// Attendance goal
const maxCount = 50;

// Load saved progress or start at 0
let count = parseInt(localStorage.getItem("totalCount")) || 0;

let teamCounts = JSON.parse(localStorage.getItem("teamCounts")) || {
  water: 0,
  zero: 0,
  power: 0
};

let attendees = JSON.parse(localStorage.getItem("attendees")) || [];

// Display saved information when page loads
updateDisplay();
displayAttendees();

// Handles form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  // Increment total attendance
  count++;

  // Increment selected team's attendance
  teamCounts[team]++;

  // Add attendee to attendee list
  attendees.push({
    name: name,
    team: teamName
  });

  // Save progress to local storage
  localStorage.setItem("totalCount", count);
  localStorage.setItem("teamCounts", JSON.stringify(teamCounts));
  localStorage.setItem("attendees", JSON.stringify(attendees));

  // Update information on page
  updateDisplay();
  displayAttendees();

  // Show welcome message
  const message = `Welcome, ${name} from ${teamName}!`;
  greeting.textContent = message;

  console.log(message);
  console.log(`Total check-ins: ${count}`);

  // Check if attendance goal has been reached
  if (count >= maxCount) {
    showCelebration();
  }

  // Reset form
  form.reset();
});

// Updates attendance numbers and progress bar
function updateDisplay() {
  attendeeCount.textContent = count;

  document.getElementById("waterCount").textContent = teamCounts.water;
  document.getElementById("zeroCount").textContent = teamCounts.zero;
  document.getElementById("powerCount").textContent = teamCounts.power;

  const percentage = Math.min(
    Math.round((count / maxCount) * 100),
    100
  );

  progressBar.style.width = percentage + "%";
}

// Displays attendee names and teams
function displayAttendees() {
  attendeeList.innerHTML = "";

  attendees.forEach(function (attendee) {
    const listItem = document.createElement("li");

    listItem.textContent = `${attendee.name} — ${attendee.team}`;

    attendeeList.appendChild(listItem);
  });
}

// Displays celebration message and winning team
function showCelebration() {
  let winningTeam = "Team Water Wise";
  let highestCount = teamCounts.water;

  if (teamCounts.zero > highestCount) {
    winningTeam = "Team Net Zero";
    highestCount = teamCounts.zero;
  }

  if (teamCounts.power > highestCount) {
    winningTeam = "Team Renewables";
  }

  celebration.textContent =
    `🎉 Attendance goal reached! ${winningTeam} has the most attendees! 🎉`;
}