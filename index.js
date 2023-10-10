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

const displayUsers = async () => {
    const payload = await getUsers();
    let dataUsers = payload.map((user) => {
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
displayUsers();