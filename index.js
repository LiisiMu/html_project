const url = "https://jsonplaceholder.typicode.com/users";
const users = document.querySelector("#users");

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
    } else {
        let dataUsers = usersToDisplay.map((user) => {
            const { name, username, email } = user;
            const fullName = name.split(' ');
            const firstName = fullName[0];
            const lastName = fullName.slice(1).join(' ');
            return `
            <tr>
            <td>${username}</td>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${email}</td>
            </tr>
            `
        }).join('');
        users.innerHTML = dataUsers;
    }

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
searchUsers();