// Model Detail Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get model ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const modelId = urlParams.get('id');
    
    // Static model data (in a real app, this would come from a database or API)
    const models = {
        'model-001': {
            name: 'Ava Lee',
            email: 'ava.lee@example.com',
            dob: '15 March 1992',
            gender: 'Female',
            country: 'American',
            agency: 'IMG Models',
            category: 'Fashion',
            introduction: 'Professional model with high-fashion and editorial experience.',
            about: 'Worked with multiple agencies and international brands. Specializes in editorial and runway work.',
            instagram: '2.5M+',
            height: '178cm',
            yearsActive: 8,
            runwayShows: 12,
            awards: 'Model of the Year – 2022',
            phone: '555-123-1000',
            status: 'Active'
        },
        'model-002': {
            name: 'Mia Chen',
            email: 'mia.chen@example.com',
            dob: '22 July 1994',
            gender: 'Female',
            country: 'Chinese',
            agency: 'Elite Model Management',
            category: 'Commercial',
            introduction: 'Beauty and commercial campaigns specialist.',
            about: 'Extensive experience in beauty campaigns and commercial modeling for major brands.',
            instagram: '1.8M+',
            height: '172cm',
            yearsActive: 6,
            runwayShows: 8,
            awards: 'Best Commercial Model – 2023',
            phone: '555-123-2000',
            status: 'Inactive'
        },
        'model-003': {
            name: 'Sophia Martinez',
            email: 'sophia.martinez@example.com',
            dob: '10 November 1993',
            gender: 'Female',
            country: 'Spanish',
            agency: 'Ford Models',
            category: 'Editorial',
            introduction: 'Fashion and editorial model with international recognition.',
            about: 'Featured in top fashion magazines and worked with renowned photographers worldwide.',
            instagram: '3.2M+',
            height: '180cm',
            yearsActive: 10,
            runwayShows: 25,
            awards: 'Editorial Model of the Year – 2023',
            phone: '555-123-3000',
            status: 'Active'
        },
        'model-004': {
            name: 'Emma Wilson',
            email: 'emma.wilson@example.com',
            dob: '5 January 1996',
            gender: 'Female',
            country: 'British',
            agency: 'Next Management',
            category: 'Fashion',
            introduction: 'Commercial and print specialist with versatile portfolio.',
            about: 'Known for versatility in both high fashion and commercial print work.',
            instagram: '1.5M+',
            height: '175cm',
            yearsActive: 5,
            runwayShows: 15,
            awards: 'Rising Star Award – 2023',
            phone: '555-123-4000',
            status: 'Active'
        }
    };
    
    // Default model data (Gigi Hadid example)
    const defaultModel = {
        name: 'Gigi Hadid',
        email: 'gigihadid1@email.com',
        dob: '23 April 1995',
        gender: 'Female',
        country: 'American',
        agency: 'IMG Models',
        category: 'Fashion',
        introduction: 'Professional model with high-fashion and editorial experience.',
        about: 'Worked with multiple agencies and international brands.',
        instagram: '5M+',
        height: '175cm',
        yearsActive: 6,
        runwayShows: 6,
        awards: 'Model of the Year – 2023',
        phone: '555-000-0000',
        status: 'Active'
    };
    
    // Get model data or use default
    const model = modelId && models[modelId] ? models[modelId] : defaultModel;
    
    // Populate the page with model data
    document.getElementById('modelName').textContent = model.name;
    document.getElementById('modelEmail').textContent = model.email;
    document.getElementById('modelDOB').textContent = model.dob;
    document.getElementById('modelGender').textContent = model.gender;
    document.getElementById('modelCountry').textContent = model.country;
    document.getElementById('modelAgency').textContent = model.agency;
    document.getElementById('modelCategory').textContent = model.category;
    document.getElementById('modelIntroduction').textContent = model.introduction;
    document.getElementById('modelAbout').textContent = model.about;
    document.getElementById('modelInstagram').textContent = model.instagram;
    document.getElementById('modelHeight').textContent = model.height;
    document.getElementById('modelYearsActive').textContent = model.yearsActive;
    document.getElementById('modelRunwayShows').textContent = model.runwayShows;
    document.getElementById('modelAwards').textContent = model.awards || 'N/A';
});

function bookAppointment() {
    // Get model name from the page
    const modelName = document.getElementById('modelName').textContent;
    
    // Redirect to bookings page with model name pre-filled
    // You can enhance this to pass the model ID as well
    window.location.href = `bookings.html?model=${encodeURIComponent(modelName)}`;
}

