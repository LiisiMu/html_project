const url = "https://jsonplaceholder.typicode.com/users"

const getUsers = async () => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
}
getUsers();