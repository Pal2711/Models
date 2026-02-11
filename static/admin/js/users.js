// Users CRUD operations
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
});

function loadUsers() {
    // Use static data
    const users = staticUsers;
    const tbody = document.getElementById('usersTableBody');
    
    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No users found</td></tr>';
        return;
    }
    
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone || '-'}</td>
            <td>${user.date ? formatDate(user.date) : '-'}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-edit" onclick="editUser('${user.id}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteUser('${user.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openUserModal() {
    document.getElementById('userModal').style.display = 'block';
    document.getElementById('userForm').reset();
    document.getElementById('userId').value = '';
    document.getElementById('userPassword').required = true;
    document.getElementById('userModalTitle').textContent = 'Add New User';
}

function closeUserModal() {
    document.getElementById('userModal').style.display = 'none';
}

function editUser(id) {
    const users = staticUsers;
    const user = users.find(u => u.id === id);
    
    if (!user) return;
    
    document.getElementById('userId').value = user.id;
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userPhone').value = user.phone || '';
    document.getElementById('userPassword').required = false;
    document.getElementById('userModalTitle').textContent = 'Edit User';
    
    document.getElementById('userModal').style.display = 'block';
}

function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        // Note: Changes won't persist as data is static
        alert('Note: Data is static. Changes will reset on page reload.');
        const index = staticUsers.findIndex(u => u.id === id);
        if (index !== -1) {
            staticUsers.splice(index, 1);
            loadUsers();
        }
    }
}

function saveUser(event) {
    event.preventDefault();
    
    const users = staticUsers;
    const id = document.getElementById('userId').value;
    
    const userData = {
        id: id || 'user-' + Date.now(),
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        phone: document.getElementById('userPhone').value,
        date: id ? users.find(u => u.id === id)?.date || new Date().toISOString() : new Date().toISOString()
    };
    
    // Only update password if provided
    const password = document.getElementById('userPassword').value;
    if (password) {
        userData.password = password;
    } else if (id) {
        // Keep existing password if editing and password not provided
        const existingUser = users.find(u => u.id === id);
        if (existingUser) {
            userData.password = existingUser.password;
        }
    } else {
        alert('Password is required for new users');
        return;
    }
    
    if (id) {
        const index = users.findIndex(u => u.id === id);
        if (index !== -1) {
            staticUsers[index] = userData;
        }
    } else {
        staticUsers.push(userData);
    }
    
    alert('Note: Data is static. Changes will reset on page reload.');
    loadUsers();
    closeUserModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('userModal');
    if (event.target == modal) {
        closeUserModal();
    }
}

