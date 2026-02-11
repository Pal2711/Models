from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from user.models import *
from django.views.decorators.cache import never_cache
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

def adminmodels(request):
    models = ModelProfile.objects.all()
    return render(request, 'adminmodels.html', {'models': models})

def delete_model(request, id):
    model = get_object_or_404(ModelProfile, id=id)

    if request.method == "POST":
        model.delete()  # deletes related Modeldetails if CASCADE
        messages.success(request, f"Model '{model.full_name}' deleted successfully!")
        return redirect('adminmodels')

    return render(request, 'delete_model.html', {'model': model})

def adminindex(request):
    # Totals
    total_models = ModelProfile.objects.count()
    total_users = Signup.objects.count()
    total_appointments = Appointment.objects.count()
    total_feedback = feedback.objects.count()
    total_contact = Contact.objects.count()

    # Recent Activity
    recent_appointments = Appointment.objects.order_by('-created_at')[:5]
    recent_feedbacks = feedback.objects.order_by('-created')[:5]
    recent_users = Signup.objects.order_by('-created')[:5]
    recent_models = ModelProfile.objects.order_by('-id')[:5]  # fallback using id for newest

    activities = []

    # Appointments
    for a in recent_appointments:
        activities.append({
            'type': 'Booking',
            'message': f'New booking received for {a.model_name}',
            'date': a.created_at
        })

    # Feedback
    for f in recent_feedbacks:
        activities.append({
            'type': 'Feedback',
            'message': f'New feedback from {f.name}',
            'date': f.created
        })

    # Users
    for u in recent_users:
        activities.append({
            'type': 'User',
            'message': f'New user registered: {u.name}',
            'date': u.created
        })

    # Models
    for m in recent_models:
        # Use latest timestamp from related Modeldetails if exists
        detail = Modeldetails.objects.filter(profile=m).order_by('-registered_at').first()
        date = detail.registered_at if detail else None
        # If no detail exists, fallback to a fake date (or just use now)
        if not date:
            import datetime
            date = datetime.datetime.now()
        activities.append({
            'type': 'Model',
            'message': f'New model added: {m.full_name}',
            'date': date
        })

    # Sort activities by date descending and limit to 10
    activities = sorted(activities, key=lambda x: x['date'], reverse=True)[:10]

    return render(request, 'adminindex.html', {
        'total_models': total_models,
        'total_users': total_users,
        'total_appointments': total_appointments,
        'total_feedback': total_feedback,
        'total_contact': total_contact,
        'activities': activities
    })

def adminlogin(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        if username == "admin" and password == "admin123":
            request.session['admin_logged_in'] = True
            return redirect('/adminapp/adminindex/')
        else:
            messages.error(request, "Invalid username or password")
    return render(request, 'adminlogin.html')

def adminaddmodel(request):
    if request.method == "POST":

        # Basic Info
        full_name = request.POST.get("modelName")
        email = request.POST.get("modelEmail")
        gender = request.POST.get("modelGender")
        date_of_birth = request.POST.get("modelDob")
        country = request.POST.get("modelCountry")
        agency = request.POST.get("modelAgency")
        category = request.POST.get("modelCategory")
        introduction = request.POST.get("modelIntro")
        about = request.POST.get("modelAbout")
        instagram_followers = request.POST.get("modelFollowers")
        years_active = request.POST.get("modelExperience") or 0
        runway_shows = request.POST.get("modelShows") or 0
        awards = request.POST.get("modelAwards")

        # Images
        profile_image = request.FILES.get("modelProfileImg")

        image1 = request.FILES.get("modelImage1")
        image2 = request.FILES.get("modelImage2")
        image3 = request.FILES.get("modelImage3")
        image4 = request.FILES.get("modelImage4")
        image5 = request.FILES.get("modelImage5")
        image6 = request.FILES.get("modelImage6")
        image7 = request.FILES.get("modelImage7")
        image8 = request.FILES.get("modelImage8")
        image9 = request.FILES.get("modelImage9")

        # Save Profile
        profile = ModelProfile.objects.create(
            full_name=full_name,
            profile_image=profile_image
        )

        # Save Details
        Modeldetails.objects.create(
            profile=profile,
            email=email,
            gender=gender,
            date_of_birth=date_of_birth,
            country=country,
            agency=agency,
            category=category,
            introduction=introduction,
            about=about,
            instagram_followers=instagram_followers,
            years_active=years_active,
            runway_shows=runway_shows,
            awards=awards,
            image_1=image1,
            image_2=image2,
            image_3=image3,
            image_4=image4,
            image_5=image5,
            image_6=image6,
            image_7=image7,
            image_8=image8,
            image_9=image9,
        )

        messages.success(request, f"Model '{full_name}' added successfully!")
        return redirect("adminmodels")

    return render(request, "adminadd-model.html")

def adminbookings(request):
    appointments = Appointment.objects.order_by('-created_at')  # newest first
    return render(request, 'adminbookings.html', {
        'appointments': appointments
    })

def edit_booking(request, id):
    booking = get_object_or_404(Appointment, id=id)

    if request.method == 'POST':
        # Update the booking
        booking.model_name = request.POST.get('model_name')
        booking.name = request.POST.get('name')
        booking.email = request.POST.get('email')
        booking.phone = request.POST.get('phone')
        booking.appointment_date = request.POST.get('appointment_date')
        booking.appointment_time = request.POST.get('appointment_time')
        booking.save()
        messages.success(request, "Booking updated successfully!")
        return redirect('adminbookings')

    return render(request, 'edit_booking.html', {'booking': booking})

def view_booking(request, id):
    booking = get_object_or_404(Appointment, id=id)
    return render(request, 'view_booking.html', {'booking': booking})

def delete_booking(request, id):
    booking = get_object_or_404(Appointment, id=id)
    booking.delete()
    return redirect('adminbookings')  

def admincontact(request):
    contacts = Contact.objects.all().order_by('-created')  
    return render(request, 'admincontact.html', {'contacts': contacts})

def admin_add_contact(request):
    if request.method == "POST":
        Contact.objects.create(
            name=request.POST['name'],
            email=request.POST['email'],
            subject=request.POST['subject'],
            message=request.POST['message']
        )
        return redirect('admincontact')

    return render(request, 'admin_add_contact.html')

def edit_contact(request, id):
    contact = get_object_or_404(Contact, id=id)

    if request.method == "POST":
        contact.name = request.POST.get('name')
        contact.email = request.POST.get('email')
        contact.subject = request.POST.get('subject')
        contact.message = request.POST.get('message')
        contact.save()
        return redirect('admincontact')  
    
    return render(request, 'edit_contact.html', {'contact': contact})

def delete_contact(request, id):
    contact = get_object_or_404(Contact, id=id)
    contact.delete()
    return redirect('admincontact')

def adminfeedback(request):
    feedbacks = feedback.objects.all().order_by('-created')  
    context = {'feedbacks': feedbacks}  
    return render(request, 'adminfeedback.html', context)

def admin_add_feedback(request):
    if request.method == "POST":
        feedback.objects.create(
            name=request.POST.get('name'),
            email=request.POST.get('email'),
            feedback=request.POST.get('feedback'),  # ✅ matches model
            message=request.POST.get('message')
        )
        return redirect('adminfeedback')

    return render(request, 'admin_add_feedback.html')


    return render(request, 'admin_add_feedback.html')

def delete_feedback(request, id):
    fb = get_object_or_404(feedback, id=id)  # use capital F
    fb.delete()
    return redirect('adminfeedback') 

def edit_feedback(request, id):
    fb = get_object_or_404(feedback, id=id)
    
    if request.method == "POST":
        fb.name = request.POST.get('name')
        fb.email = request.POST.get('email')
        fb.feedback = request.POST.get('feedback')
        fb.message = request.POST.get('message')
        fb.save()
        return redirect('adminfeedback')  # redirect to feedback list
    
    return render(request, 'edit_feedback.html', {'fb': fb})

def adminmodeldetail(request, id):
    profile = get_object_or_404(ModelProfile, id=id)
    details = get_object_or_404(Modeldetails, profile=profile)
    return render(request, 'adminmodel-detail.html', {'profile': profile, 'details': details})

def adminmodeledit(request, id):
    model = get_object_or_404(ModelProfile, id=id)
    details = get_object_or_404(Modeldetails, profile=model)

    if request.method == "POST":
        model.full_name = request.POST.get("full_name")
        model.save()
        details.email = request.POST.get("email")
        details.gender = request.POST.get("gender")
        details.date_of_birth = request.POST.get("date_of_birth")
        details.country = request.POST.get("country")
        details.agency = request.POST.get("agency")
        details.introduction = request.POST.get("introduction")
        details.about = request.POST.get("about")
        details.save()
        messages.success(request, "Model updated successfully")
        return redirect("adminmodels")

    return render(request, "adminmodeledit.html", {"model": model, "details": details})

def adminusers(request):
    users = Signup.objects.all().order_by('-created')  # Get all users
    print(users) 
    return render(request, 'adminusers.html', {'users': users})

def admin_add_user(request):
    if request.method == "POST":
        Signup.objects.create(
            name=request.POST.get('name'),
            email=request.POST.get('email'),
            phone=request.POST.get('phone'),
            password=request.POST.get('password')
        )
        return redirect('adminusers')  

    return render(request, 'admin_add_user.html')

def delete_user(request, id):
    user = get_object_or_404(Signup, id=id)
    user.delete()
    return redirect('adminusers')

def admin_add_booking(request):
    models = ModelProfile.objects.all()

    if request.method == "POST":
        model_profile_id = request.POST.get('model_profile')
        model_profile = ModelProfile.objects.get(id=model_profile_id)

        Appointment.objects.create(
            model_profile=model_profile,
            model_name=model_profile.full_name,  # ✅ correct
            name=request.POST.get('name'),
            email=request.POST.get('email'),
            phone=request.POST.get('phone'),
            appointment_date=request.POST.get('appointment_date'),
            appointment_time=request.POST.get('appointment_time'),
        )
        return redirect('/adminapp/adminbookings/')

    return render(request, 'admin_add_booking.html', {'models': models})

def admin_logout(request):
    logout(request)
    return redirect('adminlogin')