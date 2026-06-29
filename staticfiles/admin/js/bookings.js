// Bookings CRUD operations
document.addEventListener('DOMContentLoaded', function() {
    loadBookings();
});

function loadBookings() {
    // Use static data
    const bookings = staticBookings;
    const tbody = document.getElementById('bookingsTableBody');

    if (bookings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No bookings found</td></tr>';
        return;
    }

    tbody.innerHTML = bookings.map(booking => `
        <tr>
            <td>${booking.id}</td>
            <td>${booking.code || '-'}</td>
            <td>${booking.model}</td>
            <td>${booking.client}</td>
            <td>${booking.date ? formatDate(booking.date) : '-'}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-edit" onclick="editBooking('${booking.id}')">Edit</button>
                    <button class="btn btn-danger" onclick="deleteBooking('${booking.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openBookingModal() {
    document.getElementById('bookingModal').style.display = 'block';
    document.getElementById('bookingForm').reset();
    document.getElementById('bookingId').value = '';
    document.getElementById('bookingModalTitle').textContent = 'Add Booking';
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

function editBooking(id) {
    const bookings = staticBookings;
    const booking = bookings.find(b => b.id === id);
    if (!booking) return;

    document.getElementById('bookingId').value = booking.id;
    document.getElementById('bookingCode').value = booking.code || '';
    document.getElementById('bookingModel').value = booking.model;
    document.getElementById('bookingClient').value = booking.client;
    document.getElementById('bookingDate').value = booking.date;
    document.getElementById('bookingModalTitle').textContent = 'Edit Booking';
    document.getElementById('bookingModal').style.display = 'block';
}

function deleteBooking(id) {
    if (confirm('Are you sure you want to delete this booking?')) {
        // Note: Changes won't persist as data is static
        alert('Note: Data is static. Changes will reset on page reload.');
        const index = staticBookings.findIndex(b => b.id === id);
        if (index !== -1) {
            staticBookings.splice(index, 1);
            loadBookings();
        }
    }
}

function saveBooking(event) {
    event.preventDefault();

    const bookings = staticBookings;
    const id = document.getElementById('bookingId').value;

    const bookingData = {
        id: id || 'booking-' + Date.now(),
        code: document.getElementById('bookingCode').value,
        model: document.getElementById('bookingModel').value,
        client: document.getElementById('bookingClient').value,
        date: document.getElementById('bookingDate').value,
        status: 'Pending',
        amount: '0',
        createdAt: id ? bookings.find(b => b.id === id)?.createdAt || new Date().toISOString() : new Date().toISOString()
    };

    if (id) {
        const index = bookings.findIndex(b => b.id === id);
        if (index !== -1) {
            staticBookings[index] = bookingData;
        }
    } else {
        staticBookings.push(bookingData);
    }

    alert('Note: Data is static. Changes will reset on page reload.');
    loadBookings();
    closeBookingModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target == modal) {
        closeBookingModal();
    }
};

