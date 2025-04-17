const getDefaults = (input) => {
    // Calculate the last Friday relative to the user's local time zone
    const now = new Date();
    const lastFriday = new Date(now);
    const dayOffset = (now.getDay() + 1) % 7 + 1; // Days since last Friday
    lastFriday.setDate(now.getDate() - dayOffset);
    lastFriday.setHours(17, 0, 0, 0); // Set time to 17:00 in local time

    // Adjust for timezone offset
    const timezoneOffset = lastFriday.getTimezoneOffset(); // Offset in minutes
    lastFriday.setMinutes(lastFriday.getMinutes() - timezoneOffset);

    // Format the date to 'YYYY-MM-DDTHH:mm' for datetime-local input
    const formattedLastFriday = lastFriday.toISOString().slice(0, 16);
    input.value = formattedLastFriday;
}

const makeResult = (input, result) => {
    const date = new Date(input.value);
    const now = new Date();
    const diffInMs = now - date; // Difference in milliseconds
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert to minutes
    const hours = Math.floor(diffInMinutes / 60); // Extract hours
    const minutes = diffInMinutes % 60; // Extract remaining minutes
    result.textContent = `${hours} hours and ${minutes} minutes since the selected date and time.`;
}

const main = async () => {
    const form = document.querySelector('#form');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission
    });
    const input = document.querySelector('#input');
    const result = document.querySelector('#result');
    getDefaults(input);
    makeResult(input, result);

    input.addEventListener('change', () => {
        makeResult(input, result);
    })
};

main();
