
'use stricst'

document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    const timeElement = document.getElementById('time');
    const alarmForm = document.getElementById('alarmForm');
    const alarmIndicator = document.getElementById('alarmIndicator');
    const alarmSound = document.getElementById('alarmSound');

    // Update clock
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = hours + ':' + minutes;
    }

    // Set interval to update clock every second
    setInterval(updateClock, 1000);




    // Handle alarm form submission
    alarmForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const hours = parseInt(document.getElementById('hours').value, 10);
        const minutes = parseInt(document.getElementById('minutes').value, 10);
        if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            alert('Please enter valid hours (0-23) and minutes (0-59).');
            return;
        }
    
        const now = new Date();
        const selectedTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        if (selectedTime <= now) {
            alert('Please select a future time for the alarm.');
            return;
        }
        localStorage.setItem('alarmTime', selectedTime.getTime().toString());
        updateAlarmIndicator();
        alarmIndicator.textContent = `Alarm set for ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    });
    
    

    // Check for alarm on page load
    updateAlarmIndicator();

    // Update alarm indicator based on stored alarm time
    function updateAlarmIndicator() {
        const alarmTime = localStorage.getItem('alarmTime');
        if (alarmTime && new Date().getTime() < parseInt(alarmTime, 10)) {
            alarmIndicator.classList.add('active');
        } else {
            alarmIndicator.classList.remove('active');
        }
    }



    // Check for alarm every second
    setInterval(checkAlarm, 1000);

    // Check if it's time for the alarm
    function checkAlarm() {
        const alarmTime = localStorage.getItem('alarmTime');
        if (alarmTime && new Date().getTime() >= parseInt(alarmTime, 10)) {
            alarmSound.play();
            localStorage.removeItem('alarmTime');
            updateAlarmIndicator();
        }
    }
});
