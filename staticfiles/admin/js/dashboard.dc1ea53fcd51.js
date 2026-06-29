// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    updateDashboardStats();
});

function updateDashboardStats() {
    // Use static data
    const models = staticModels;
    const users = staticUsers;
    const feedback = staticFeedback;
    const contacts = staticContacts;
    const bookings = staticBookings;

    document.getElementById('modelsCount').textContent = models.length;
    document.getElementById('usersCount').textContent = users.length;
    document.getElementById('bookingsCount').textContent = bookings.length;
    document.getElementById('feedbackCount').textContent = feedback.length;
    document.getElementById('contactCount').textContent = contacts.length;

    // Show recent activity
    const recentActivity = document.getElementById('recentActivity');
    const allActivities = [];
    
    models.forEach(model => {
        allActivities.push({
            type: 'Model',
            text: `${model.name} was added`,
            date: model.date || new Date().toISOString()
        });
    });
    
    users.forEach(user => {
        allActivities.push({
            type: 'User',
            text: `${user.name} was added`,
            date: user.date || new Date().toISOString()
        });
    });
    
    feedback.forEach(fb => {
        allActivities.push({
            type: 'Feedback',
            text: `New feedback from ${fb.user}`,
            date: fb.date || new Date().toISOString()
        });
    });
    
    bookings.forEach(booking => {
        allActivities.push({
            type: 'Booking',
            text: `Booking for ${booking.model}`,
            date: booking.createdAt || new Date().toISOString()
        });
    });

    contacts.forEach(contact => {
        allActivities.push({
            type: 'Contact',
            text: `New message from ${contact.name}`,
            date: contact.date || new Date().toISOString()
        });
    });

    // Sort by date (newest first)
    allActivities.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display recent 5 activities
    if (allActivities.length === 0) {
        recentActivity.innerHTML = '<p>No recent activity</p>';
    } else {
        recentActivity.innerHTML = allActivities.slice(0, 5).map(activity => `
            <div class="activity-item">
                <div>
                    <strong>${activity.type}:</strong> ${activity.text}
                </div>
                <div style="color: #b0b0b0; font-size: 12px;">
                    ${formatDate(activity.date)}
                </div>
            </div>
        `).join('');
    }
}

