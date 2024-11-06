import React, { useState } from 'react';

const Users = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'Customer',
        },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
    ]);

    const deleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Users</h2>

            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border p-2">{user.name}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">{user.role}</td>
                            <td className="border p-2">
                                <button
                                    className="text-red-500"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
