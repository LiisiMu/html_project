const url = "https://jsonplaceholder.typicode.com/users";
const users = document.querySelector("#users");
const table = document.querySelector('.table');

const usernameInput = document.querySelector('#usernameInput');
const firstNameInput = document.querySelector('#firstNameInput');
const lastNameInput = document.querySelector('#lastNameInput');
const clearSearchLink = document.querySelector('#clearSearch');

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

const getUsers = async () => {
            const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
    return data;
}

const displayUsers = async (usersToDisplay) => {
    if (usersToDisplay.length === 0) {
        users.innerHTML = "Ühtegi kasutajat ei leitud. Proovi uuesti.";
        table.style.display = 'table';
    } else {
        let dataUsers = usersToDisplay.map((user) => {
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
        users.innerHTML = dataUsers;
    }
    usersToDisplay.forEach((user) => {
        const deleteButton = document.querySelector(`#delete-${user.id}`);

        deleteButton.addEventListener('click', () => {
            document.querySelector(`#row-${user.id}`).remove();
        });
    });
}

const searchUsers = async () => {
    const username = document.querySelector('#usernameInput').value.toLowerCase();
    const firstName = document.querySelector('#firstNameInput').value.toLowerCase();
    const lastName = document.querySelector('#lastNameInput').value.toLowerCase();
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