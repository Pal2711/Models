from django.shortcuts import render, redirect
from user.models import *
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

# MODEL HUB LOGIN
def mhlogin(request):

    if request.method == "POST":

        username = request.POST.get("username")
        password = request.POST.get("password")

        try:
            user = Modeldetails.objects.get(username=username, password=password)

            # save session
            request.session['model_id'] = user.id

            return redirect('mhdashboard')

        except Modeldetails.DoesNotExist:

            return render(request, "mhlogin.html", {
                "error": "Invalid username or password"
            })

    return render(request, "mhlogin.html")

# MODEL HUB DASHBOARD
def mhdashboard(request):

    if not request.session.get("model_id"):
        return redirect("mhlogin")

    model = Modeldetails.objects.get(id=request.session['model_id'])

    return render(request, "mhdashboard.html", {
        "model": model,
        "profile": model.profile
    })

# MODEL HUB BOOKINGS
def mhbooking(request):

    if not request.session.get("model_id"):
        return redirect("mhlogin")

    model = Modeldetails.objects.get(id=request.session['model_id'])

    # get model profile
    profile = model.profile

    # get appointments for this model
    appointments = Appointment.objects.filter(model_profile=profile)

    return render(request, "mhbooking.html", {
        "appointments": appointments
    })

def mhdelete(request):

    model_id = request.session.get("model_id")

    if not model_id:
        return redirect("mhlogin")

    profile = ModelProfile.objects.get(id=model_id)

    if request.method == "POST":

        # Delete profile (Modeldetails will delete automatically because of CASCADE)
        profile.delete()

        # remove session
        request.session.flush()

        messages.success(request, "Your profile has been deleted successfully!")

        return redirect("mhlogin")

    return render(request, "mhdelete.html")

# MODEL HUB EDIT PROFILE
def mhedit(request):

    if not request.session.get("model_id"):
        return redirect("mhlogin")

    model = Modeldetails.objects.get(id=request.session['model_id'])
    profile = model.profile

    if request.method == "POST":

        # Profile model
        profile.full_name = request.POST.get("full_name")

        if request.FILES.get("profile_image"):
            profile.profile_image = request.FILES.get("profile_image")

        profile.save()

        # Model details
        model.email = request.POST.get("email")
        model.gender = request.POST.get("gender")
        model.date_of_birth = request.POST.get("date_of_birth")
        model.country = request.POST.get("country")
        model.agency = request.POST.get("agency")
        model.category = request.POST.get("category")

        model.introduction = request.POST.get("introduction")
        model.about = request.POST.get("about")

        model.instagram_followers = request.POST.get("instagram_followers")
        model.years_active = request.POST.get("years_active")
        model.runway_shows = request.POST.get("runway_shows")
        model.awards = request.POST.get("awards")

        model.username = request.POST.get("username")
        model.password = request.POST.get("password")

        # Gallery images
        for i in range(1, 10):
            img = request.FILES.get(f"image_{i}")
            if img:
                setattr(model, f"image_{i}", img)

        model.save()

        return redirect("mhdashboard")

    return render(request, "mhedit.html", {
        "model": model,
        "profile": profile
    })

# MODEL HUB LOGOUT
def modelhublogout(request):

    request.session.flush()

    return redirect('mhlogin')

def mhdeletebooking(request, id):

    if not request.session.get("model_id"):
        return redirect("mhlogin")

    booking = Appointment.objects.get(id=id)
    booking.delete()

    return redirect("mhdashboard")