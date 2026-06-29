// Static Models Data (for form operations)
const staticModels = [
    { id: 'model-001', name: 'Ava Lee', email: 'ava.lee@example.com', phone: '555-123-1000', status: 'Active', bio: 'Editorial and runway specialist.', date: new Date().toISOString() },
    { id: 'model-002', name: 'Mia Chen', email: 'mia.chen@example.com', phone: '555-123-2000', status: 'Inactive', bio: 'Beauty and commercial campaigns.', date: new Date().toISOString() },
    { id: 'model-003', name: 'Sophia Martinez', email: 'sophia.martinez@example.com', phone: '555-123-3000', status: 'Active', bio: 'Fashion and editorial model.', date: new Date().toISOString() },
    { id: 'model-004', name: 'Emma Wilson', email: 'emma.wilson@example.com', phone: '555-123-4000', status: 'Active', bio: 'Commercial and print specialist.', date: new Date().toISOString() }
];

// Models CRUD operations
document.addEventListener('DOMContentLoaded', function() {
    loadModels();
});

function loadModels() {
    // Use static data
    const models = staticModels;
    const tbody = document.getElementById('modelsTableBody');
    
    if (models.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No models found</td></tr>';
        return;
    }
    
    tbody.innerHTML = models.map(model => `
        <tr>
            <td>${model.id}</td>
            <td>${model.name}</td>
            <td>${model.email}</td>
            <td>${model.phone}</td>
            <td><span class="status-badge status-${model.status.toLowerCase()}">${model.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-edit" onclick="editModel('${model.id}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteModel('${model.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openModelModal() {
    document.getElementById('modelModal').style.display = 'block';
    document.getElementById('modelForm').reset();
    document.getElementById('modelId').value = '';
    document.getElementById('modelModalTitle').textContent = 'Add New Model';
}

function closeModelModal() {
    document.getElementById('modelModal').style.display = 'none';
}

function editModel(id) {
    const models = staticModels;
    const model = models.find(m => m.id === id);
    
    if (!model) return;
    
    document.getElementById('modelId').value = model.id;
    document.getElementById('modelName').value = model.name || '';
    document.getElementById('modelEmail').value = model.email || '';
    document.getElementById('modelPhone').value = model.phone || '';
    document.getElementById('modelDOB').value = model.dob || '';
    document.getElementById('modelGender').value = model.gender || '';
    document.getElementById('modelAgency').value = model.agency || '';
    document.getElementById('modelCountry').value = model.country || '';
    document.getElementById('modelCategory').value = model.category || '';
    document.getElementById('modelIntroduction').value = model.introduction || '';
    document.getElementById('modelAbout').value = model.about || '';
    document.getElementById('modelInstagram').value = model.instagram || '';
    document.getElementById('modelHeight').value = model.height || '';
    document.getElementById('modelYearsActive').value = model.yearsActive || '';
    document.getElementById('modelRunwayShows').value = model.runwayShows || '';
    document.getElementById('modelAwards').value = model.awards || '';
    document.getElementById('modelStatus').value = model.status || 'Active';
    document.getElementById('modelBio').value = model.bio || '';
    document.getElementById('modelModalTitle').textContent = 'Edit Model';
    
    document.getElementById('modelModal').style.display = 'block';
}

function deleteModel(id) {
    if (confirm('Are you sure you want to delete this model?')) {
        // Note: Changes won't persist as data is static
        alert('Note: Data is static. Changes will reset on page reload.');
        const index = staticModels.findIndex(m => m.id === id);
        if (index !== -1) {
            staticModels.splice(index, 1);
            loadModels();
        }
    }
}

function saveModel(event) {
    event.preventDefault();
    
    const models = staticModels;
    const id = document.getElementById('modelId').value;
    
    const modelData = {
        id: id || 'model-' + Date.now(),
        name: document.getElementById('modelName').value,
        email: document.getElementById('modelEmail').value,
        phone: document.getElementById('modelPhone').value,
        dob: document.getElementById('modelDOB').value,
        gender: document.getElementById('modelGender').value,
        agency: document.getElementById('modelAgency').value,
        country: document.getElementById('modelCountry').value,
        category: document.getElementById('modelCategory').value,
        introduction: document.getElementById('modelIntroduction').value,
        about: document.getElementById('modelAbout').value,
        instagram: document.getElementById('modelInstagram').value,
        height: document.getElementById('modelHeight').value,
        yearsActive: parseInt(document.getElementById('modelYearsActive').value) || 0,
        runwayShows: parseInt(document.getElementById('modelRunwayShows').value) || 0,
        awards: document.getElementById('modelAwards').value,
        status: document.getElementById('modelStatus').value,
        bio: document.getElementById('modelBio').value,
        date: id ? models.find(m => m.id === id)?.date || new Date().toISOString() : new Date().toISOString()
    };
    
    if (id) {
        const index = models.findIndex(m => m.id === id);
        if (index !== -1) {
            staticModels[index] = modelData;
        }
    } else {
        staticModels.push(modelData);
    }
    
    alert('Note: Data is static. Changes will reset on page reload.');
    loadModels();
    closeModelModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modelModal');
    if (event.target == modal) {
        closeModelModal();
    }
}

