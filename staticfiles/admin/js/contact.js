// Contact CRUD operations
document.addEventListener('DOMContentLoaded', function() {
    loadContacts();
});

function loadContacts() {
    // Use static data
    const contacts = staticContacts;
    const tbody = document.getElementById('contactTableBody');
    
    if (contacts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No contact messages found</td></tr>';
        return;
    }
    
    tbody.innerHTML = contacts.map(contact => `
        <tr>
            <td>${contact.id}</td>
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.subject}</td>
            <td>${contact.message.substring(0, 50)}${contact.message.length > 50 ? '...' : ''}</td>
            <td>${formatDate(contact.date)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-edit" onclick="editContact('${contact.id}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteContact('${contact.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openContactModal() {
    document.getElementById('contactModal').style.display = 'block';
    document.getElementById('contactForm').reset();
    document.getElementById('contactId').value = '';
    document.getElementById('contactModalTitle').textContent = 'Add New Contact';
}

function closeContactModal() {
    document.getElementById('contactModal').style.display = 'none';
}

function editContact(id) {
    const contacts = staticContacts;
    const contact = contacts.find(c => c.id === id);
    
    if (!contact) return;
    
    document.getElementById('contactId').value = contact.id;
    document.getElementById('contactName').value = contact.name;
    document.getElementById('contactEmail').value = contact.email;
    const subjectSelect = document.getElementById('contactSubjectSelect');
    if (subjectSelect) subjectSelect.value = contact.subject;
    document.getElementById('contactMessage').value = contact.message;
    document.getElementById('contactModalTitle').textContent = 'Edit Contact';
    
    document.getElementById('contactModal').style.display = 'block';
}

function deleteContact(id) {
    if (confirm('Are you sure you want to delete this contact message?')) {
        // Note: Changes won't persist as data is static
        alert('Note: Data is static. Changes will reset on page reload.');
        const index = staticContacts.findIndex(c => c.id === id);
        if (index !== -1) {
            staticContacts.splice(index, 1);
            loadContacts();
        }
    }
}

function saveContact(event) {
    event.preventDefault();
    
    const contacts = staticContacts;
    const id = document.getElementById('contactId').value;
    
    const contactData = {
        id: id || 'contact-' + Date.now(),
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubjectSelect').value,
        message: document.getElementById('contactMessage').value,
        date: id ? contacts.find(c => c.id === id)?.date || new Date().toISOString() : new Date().toISOString()
    };
    
    if (id) {
        const index = contacts.findIndex(c => c.id === id);
        if (index !== -1) {
            staticContacts[index] = contactData;
        }
    } else {
        staticContacts.push(contactData);
    }
    
    alert('Note: Data is static. Changes will reset on page reload.');
    loadContacts();
    closeContactModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target == modal) {
        closeContactModal();
    }
}

