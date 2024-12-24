const userForm = document.getElementById('userForm');
const userDataList = document.getElementById('userDataList');

// Fetch and display data from the backend
async function fetchUserData() {
    try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const users = await response.json();

        userDataList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `Name: ${user.name}, Email: ${user.email}`;
            userDataList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Form submission handler
userForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(userForm);
    const data = Object.fromEntries(formData);

    try {
        // Send POST request
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to save user data');
        }

        userForm.reset();
        fetchUserData();
    } catch (error) {
        console.error('Error saving user data:', error);
    }
});

// Load data on page load
fetchUserData();
