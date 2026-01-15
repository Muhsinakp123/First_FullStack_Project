import React, { useEffect, useState} from "react";

const Users = () => {
    const [users, setUsers ] = useState([]);
    const [loading, setLoading ] = useState(true);
    const [error, serError] = useState(null);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/users/")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            return response.json();
        })
        .then((data) => {
            setUsers(data);
            setLoading(false);
        })
        .catch((err) => {
            serError(err.message);
            setLoading(false);
        });
    }, []);
    if (loading) return <p>Loading users....</p>;
    if (error) return <p style={{color:"red"}}>{error}</p>;
    return(
        <div style={{ padding: "20px" }}>
            <h2>User List</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default Users;