// Feedback CRUD operations
document.addEventListener('DOMContentLoaded', function() {
    loadFeedback();
});

function loadFeedback() {
    // Use static data
    const feedback = staticFeedback;
    const tbody = document.getElementById('feedbackTableBody');
    
    if (feedback.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No feedback found</td></tr>';
        return;
    }
    
    tbody.innerHTML = feedback.map(fb => `
        <tr>
            <td>${fb.id}</td>
            <td>${fb.user}</td>
            <td>${fb.email}</td>
            <td>${fb.type || '-'}</td>
            <td>${fb.message.substring(0, 50)}${fb.message.length > 50 ? '...' : ''}</td>
            <td>${formatDate(fb.date)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-edit" onclick="editFeedback('${fb.id}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteFeedback('${fb.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openFeedbackModal() {
    document.getElementById('feedbackModal').style.display = 'block';
    document.getElementById('feedbackForm').reset();
    document.getElementById('feedbackId').value = '';
    document.getElementById('feedbackModalTitle').textContent = 'Add New Feedback';
}

function closeFeedbackModal() {
    document.getElementById('feedbackModal').style.display = 'none';
}

function editFeedback(id) {
    const feedback = staticFeedback;
    const fb = feedback.find(f => f.id === id);
    
    if (!fb) return;
    
    document.getElementById('feedbackId').value = fb.id;
    document.getElementById('feedbackUser').value = fb.user;
    document.getElementById('feedbackemail').value = fb.email;
    document.getElementById('feedbackType').value = fb.type || '';
    document.getElementById('feedbackMessage').value = fb.message;
    document.getElementById('feedbackModalTitle').textContent = 'Edit Feedback';
    
    document.getElementById('feedbackModal').style.display = 'block';
}

function deleteFeedback(id) {
    if (confirm('Are you sure you want to delete this feedback?')) {
        // Note: Changes won't persist as data is static
        alert('Note: Data is static. Changes will reset on page reload.');
        const index = staticFeedback.findIndex(f => f.id === id);
        if (index !== -1) {
            staticFeedback.splice(index, 1);
            loadFeedback();
        }
    }
}

function saveFeedback(event) {
    event.preventDefault();
    
    const feedback = staticFeedback;
    const id = document.getElementById('feedbackId').value;
    
    const feedbackData = {
        id: id || 'fb-' + Date.now(),
        user: document.getElementById('feedbackUser').value,
        email: document.getElementById('feedbackemail').value,
        type: document.getElementById('feedbackType').value,
        message: document.getElementById('feedbackMessage').value,
        date: id ? feedback.find(f => f.id === id)?.date || new Date().toISOString() : new Date().toISOString()
    };
    
    if (id) {
        const index = feedback.findIndex(f => f.id === id);
        if (index !== -1) {
            staticFeedback[index] = feedbackData;
        }
    } else {
        staticFeedback.push(feedbackData);
    }
    
    alert('Note: Data is static. Changes will reset on page reload.');
    loadFeedback();
    closeFeedbackModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('feedbackModal');
    if (event.target == modal) {
        closeFeedbackModal();
    }
}

