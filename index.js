const url = "https://jsonplaceholder.typicode.com/users";
const users = document.querySelector("#users");
const table = document.querySelector('.table');
let usersArray = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

const usernameInput = document.querySelector('#usernameInput');
const firstNameInput = document.querySelector('#firstNameInput');
const lastNameInput = document.querySelector('#lastNameInput');

const clearSearchLink = document.querySelector('#clearSearch');

const addUserButton = document.querySelector('#addUser');
const addUserModal = new bootstrap.Modal(document.getElementById('addUserModal'));
const saveUserButton = document.querySelector('#saveButton');

const getUsers = async () => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    const modifiedData = data.map(user => {
        return {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email
        }
    });
    localStorage.setItem('users', JSON.stringify(modifiedData))
    return modifiedData;
}

const displayUsers = async (usersToDisplay) => {
    if (usersToDisplay.length === 0) {
        users.innerHTML = "Ühtegi kasutajat ei leitud. Proovi uuesti.";
        table.style.display = 'table';
    } else {
        let usersData = usersToDisplay.map((user) => {
            const { name, username, email, id } = user;
            const fullName = name.split(' ');
            const firstName = fullName[0];
            const lastName = fullName.slice(1).join(' ');
            return `
            <tr id=row-${id}>
            <td>${username}</td>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${email}</td>
            <td><i id=delete-${id} class="userbutton fa-sharp fa-solid fa-user-minus"></i>
            </td>
            </tr>
            `
        }).join('');
        table.style.display = 'table';
        users.innerHTML = usersData;
    }
    // usersToDisplay.forEach((user) => {
    //     const deleteButton = document.querySelector(`#delete-${user.id}`);
    
    //     deleteButton.addEventListener('click', () => {
    //         const updatedUsers = usersToDisplay.filter(user => user.id !== user.id);
    //         localStorage.setItem('users', JSON.stringify(updatedUsers));
    //         document.querySelector(`#row-${user.id}`).remove();
    //     });
    // });
}

usernameInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        searchUsers();
    }
});
firstNameInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        searchUsers();
    }
});
lastNameInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        searchUsers();
    }
});

const showNotification = (message, className) => {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const table = document.querySelector('#usersTable');
    container.insertBefore(div, table);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

const searchUsers = async () => {
    const username = document.querySelector('#usernameInput').value.toLowerCase().trim();
    const firstName = document.querySelector('#firstNameInput').value.toLowerCase().trim();
    const lastName = document.querySelector('#lastNameInput').value.toLowerCase().trim();
    const usersData = await getUsers();

    const filteredUsers = usersData.filter(user => {
        const fullName = user.name.split(' ');
        const userFirstName = fullName[0].toLowerCase();
        const userLastName = fullName.slice(1).join(' ').toLowerCase();
        return (username ? user.username.toLowerCase().includes(username) : true) &&
            (firstName ? userFirstName.includes(firstName) : true) &&
            (lastName ? userLastName.includes(lastName) : true);
    });
    displayUsers(filteredUsers);
}
clearSearchLink.addEventListener('click', () => {
    usernameInput.value = '';
    firstNameInput.value = '';
    lastNameInput.value = '';

    users.innerHTML = '';

    table.style.display = 'none';
});

// addUserButton.addEventListener('click', () => {
//     addUserModal.show();
// });


// saveUserButton.addEventListener('click', (e) => {
//     e.preventDefault();

//     const newUsernameInput = document.querySelector('#newUsername');
//     const newFirstNameInput = document.querySelector('#newFirstName');
//     const newLastNameInput = document.querySelector('#newLastName');
//     const newEmailInput = document.querySelector('#newEmail');

//     const newUser = {
//         id: Date.now(),
//         username: newUsernameInput.value,
//         name: `${newFirstNameInput.value} ${newLastNameInput.value}`,
//         email: newEmailInput.value
//     };

//     const currentUsers = JSON.parse(localStorage.getItem('users')) || [];
//     currentUsers.push(newUser);

//     localStorage.setItem('users', JSON.stringify(currentUsers));

//     displayUsers(currentUsers);

//     addUserModal.hide();

//     document.querySelector('#newUsername').value = '';
//     document.querySelector('#newFirstName').value = '';
//     document.querySelector('#newLastName').value = '';
//     document.querySelector('#newEmail').value = '';

//     showNotification('Kasutaja lisatud', 'success')
// });