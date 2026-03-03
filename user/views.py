import io
import datetime
import qrcode

from .forms import *
from .models import *

from django.shortcuts import render, redirect , get_object_or_404
from django.contrib import messages
from django.conf import settings
from django.core.mail import send_mail,EmailMessage
from django.utils import timezone
from django.http import HttpResponse
from django.utils.html import strip_tags

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib import colors
from django.contrib.staticfiles import finders


def signup(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        phone = request.POST.get("phone")
        password = request.POST.get("password")  # You may want to hash it for security!

        # Check if email already exists
        if Signup.objects.filter(email=email).exists():
            error = "Email already registered."
            return render(request, "signup.html", {"error": error})

        # Save user in DB
        user = Signup.objects.create(
            name=name,
            email=email,
            phone=phone,
            password=password  # Consider hashing with make_password if security matters
        )
        print("Signup successful")

        # -------------------------
        # Send Welcome Email to User
        # -------------------------
        subject_user = "Welcome to Our Platform!"
        body_user = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8"><title>Welcome</title></head>
        <body style="font-family: Arial, sans-serif; background-color:#f4f6f8; margin:0; padding:0;">
            <table align="center" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.1); margin-top:20px;">
                <tr>
                    <td style="background:#2575fc; padding:20px; text-align:center;">
                        <h1 style="color:#ffffff; font-size:24px; margin:0;">Welcome to Our Platform!</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding:30px;">
                        <p style="font-size:16px; color:#333;">Hi <strong>{user.name}</strong>,</p>
                        <p style="font-size:16px; color:#333;">
                            Thank you for signing up! We're excited to have you on board.
                        </p>
                        <p style="margin-top:20px; font-size:16px; color:#333;">
                            You can now log in and start exploring all the features.
                        </p>
                        <p style="margin-top:30px; text-align:center;">
                            <a href="http://127.0.0.1:8000/login/" style="background:#2575fc; color:#fff; text-decoration:none; padding:12px 25px; border-radius:5px; display:inline-block;">Login Now</a>
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style="background:#f4f6f8; text-align:center; padding:15px; font-size:12px; color:#999;">
                        &copy; 2026 Your Company. All rights reserved.
                    </td>
                </tr>
            </table>
        </body>
        </html>
        """

        email_user = EmailMessage(
            subject=subject_user,
            body=body_user,
            from_email=settings.EMAIL_HOST_USER,
            to=[user.email],
        )
        email_user.content_subtype = "html"
        email_user.send(fail_silently=False)

        # -------------------------
        # Notify Admin about New Signup
        # -------------------------
        admin_email = "admin@example.com"  # Replace with your admin email
        subject_admin = f"New User Signup: {user.name}"
        body_admin = f"""
        A new user has signed up on your platform:

        Name: {user.name}
        Email: {user.email}
        Phone: {user.phone}
        Signup Date: {user.created.strftime('%Y-%m-%d %H:%M:%S')}
        """

        email_admin = EmailMessage(
            subject=subject_admin,
            body=body_admin,
            from_email=settings.EMAIL_HOST_USER,
            to=[admin_email],
        )
        email_admin.send(fail_silently=False)

        # Redirect to login page after signup
        return redirect("login")

    return render(request, "signup.html")

def login(request):
    error = ""

    if request.method == "POST":
        name = request.POST.get("name")
        password = request.POST.get("password")

        user = Signup.objects.filter(name=name, password=password).first()

        if user:
            request.session["userid"] = user.id
            request.session["email"] = user.email
            request.session["name"] = user.name
            return redirect("/")
        else:
            error = "Invalid name or password"

    return render(request, "login.html", {"error": error})

def index(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'about.html')

def beauty(request):
    return render(request, 'beauty.html')

def contact(request):

    name = request.session.get("name")
    email = request.session.get("email")

    if request.method == "POST":
        form = ContactForm(request.POST)

        if form.is_valid():
            contact = form.save()

            try:
                # =====================================================
                # 1️⃣ EMAIL TO ADMIN (Plain Text)
                # =====================================================

                admin_subject = f"[New Contact Inquiry] {contact.subject}"

                admin_message = (
                    "Hello Admin,\n"
                    "=================================================\n\n"
                    "A new contact inquiry has been submitted.\n\n"
                    f"Name        : {contact.name}\n"
                    f"Email       : {contact.email}\n"
                    f"Subject     : {contact.subject}\n"
                    f"Submitted On: {timezone.now().strftime('%d-%m-%Y %I:%M %p')}\n\n"
                    "Message:\n"
                    "-------------------------------------------------\n"
                    f"{contact.message}\n"
                    "-------------------------------------------------\n\n"
                    "Please respond from the admin panel.\n\n"
                    "Regards,\n"
                    "Website System"
                )

                admin_email = EmailMessage(
                    subject=admin_subject,
                    body=admin_message,
                    from_email=settings.EMAIL_HOST_USER,
                    to=[settings.EMAIL_HOST_USER],
                    reply_to=[contact.email],  # Admin can reply directly to user
                )

                admin_email.send(fail_silently=False)

                # =====================================================
                # 2️⃣ COLORED HTML EMAIL TO USER
                # =====================================================

                user_subject = "Thank You for Contacting Us!"

                html_content = f"""
                <!DOCTYPE html>
                <html>
                <body style="font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 20px;">

                    <div style="max-width: 600px; margin: auto; background: #ffffff; 
                                padding: 25px; border-radius: 10px; 
                                box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

                        <h2 style="color: #2c3e50; text-align: center;">
                            Thank You, {contact.name}!
                        </h2>

                        <p style="color: #555; font-size: 14px;">
                            We have successfully received your message.
                            Our team will get back to you within 
                            <strong style="color:#e74c3c;">24-48 business hours</strong>.
                        </p>

                        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

                        <h4 style="color: #34495e;">📩 Your Inquiry Details</h4>

                        <p>
                            <strong>Subject:</strong> 
                            <span style="color: #3498db;">
                                {contact.subject}
                            </span>
                        </p>

                        <p><strong>Your Message:</strong></p>

                        <div style="background-color: #f8f9fa; padding: 12px; 
                                    border-left: 4px solid #3498db; 
                                    border-radius: 5px; color: #555;">
                            {contact.message}
                        </div>

                        <p style="margin-top: 20px; font-size: 13px; color: #777;">
                            Submitted on: {timezone.now().strftime('%d-%m-%Y %I:%M %p')}
                        </p>

                        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

                        <p style="font-size: 14px; color: #555;">
                            If your matter is urgent, you may reply directly to this email.
                        </p>

                        <p style="margin-top: 20px;">
                            <strong style="color:#2c3e50;">Customer Support Team</strong><br>
                            <span style="color:#888;">Your Company Name</span><br>
                            <span style="color:#3498db;">{settings.EMAIL_HOST_USER}</span>
                        </p>

                        <p style="font-size:12px; color:#999; margin-top:20px;">
                            This is an automated confirmation email. Please do not reply directly.
                        </p>

                    </div>

                </body>
                </html>
                """

                text_content = strip_tags(html_content)

                user_email = EmailMultiAlternatives(
                    subject=user_subject,
                    body=text_content,
                    from_email=settings.EMAIL_HOST_USER,
                    to=[contact.email],
                )

                user_email.attach_alternative(html_content, "text/html")
                user_email.send(fail_silently=False)

                messages.success(request, "✅ Your message has been sent successfully!")
                return redirect("contact")

            except Exception as e:
                messages.error(request, f"⚠ Message saved but email failed: {str(e)}")

    else:
        form = ContactForm(initial={
            "name": name,
            "email": email,
        })

    return render(request, "contact.html", {
        "form": form
    })
    
def creatives(request):
    return render(request, 'creatives.html')

def fashion(request):
    return render(request, 'fashion.html')

def modelprofile(request, id):
    profile = get_object_or_404(ModelProfile, id=id)
    details = get_object_or_404(Modeldetails, profile=profile)

    return render(request, 'model-profile.html', {
        'profile': profile,
        'details': details
    })

def model(request):
    profiles = ModelProfile.objects.all()  # rename to 'profiles' to match template
    return render(request, 'model.html', {"profiles": profiles})

def book_appointment(request, id):
    profile = get_object_or_404(ModelProfile, id=id)

    session_name = request.session.get("name")
    session_email = request.session.get("email")

    if request.method == "POST":

        name = session_name if session_name else request.POST.get("name")
        email = session_email if session_email else request.POST.get("email")
        phone = request.POST.get("phone")
        appointment_date = request.POST.get("date")
        appointment_time = request.POST.get("time")

        # =========================
        # SAVE APPOINTMENT
        # =========================
        appointment = Appointment.objects.create(
            model_profile=profile,
            model_name=profile.full_name,
            name=name,
            email=email,
            phone=phone,
            appointment_date=appointment_date,
            appointment_time=appointment_time,
        )

        # =========================
        # CREATE PDF
        # =========================
        buffer = io.BytesIO()
        pdf = canvas.Canvas(buffer, pagesize=A4)
        width, height = A4

        # =========================
        # WATERMARK
        # =========================
        pdf.saveState()
        pdf.setFont("Helvetica-Bold", 100)
        pdf.setFillColorRGB(0.93, 0.93, 0.93)
        pdf.translate(width / 2, height / 2)
        pdf.rotate(45)
        pdf.drawCentredString(0, 0, "MODELS")
        pdf.restoreState()

        # =========================
        # HEADER
        # =========================
        pdf.setFillColorRGB(0.05, 0.12, 0.25)
        pdf.rect(0, height - 90, width, 90, fill=1)

        # Logo from static
        logo_path = finders.find("assets/img/logo.jpg")  # adjust if needed
        if logo_path:
            pdf.drawImage(
                logo_path,
                40,
                height - 75,
                width=40,
                height=40,
                mask='auto'
            )

        pdf.setFillColor(colors.white)
        pdf.setFont("Helvetica-Bold", 18)
        pdf.drawString(100, height - 50, "MODELS")

        pdf.setFont("Helvetica", 11)
        pdf.drawString(100, height - 68, "Appointment Confirmation")

        # =========================
        # BOOKING INFO
        # =========================
        pdf.setFillColor(colors.black)
        pdf.setFont("Helvetica", 10)
        pdf.drawString(40, height - 110, f"Booking ID: #{appointment.id}")
        pdf.drawString(40, height - 125, f"Booking Date: {appointment.appointment_date}")

        # =========================
        # CUSTOMER DETAILS
        # =========================
        box_y = height - 170
        pdf.setStrokeColor(colors.grey)
        pdf.rect(40, box_y - 90, width - 80, 90)

        pdf.setFont("Helvetica-Bold", 12)
        pdf.drawString(50, box_y - 20, "Customer Details")

        pdf.setFont("Helvetica", 11)
        pdf.drawString(50, box_y - 40, f"Name: {appointment.name}")
        pdf.drawString(50, box_y - 55, f"Email: {appointment.email}")
        pdf.drawString(50, box_y - 70, f"Phone: {appointment.phone}")

        # =========================
        # APPOINTMENT TABLE
        # =========================
        table_y = box_y - 130

        pdf.setFillColorRGB(0.2, 0.45, 0.75)
        pdf.rect(40, table_y, width - 80, 25, fill=1)

        pdf.setFillColor(colors.white)
        pdf.setFont("Helvetica-Bold", 11)
        pdf.drawString(50, table_y + 7, "Model")
        pdf.drawString(220, table_y + 7, "Date")
        pdf.drawString(330, table_y + 7, "Time")
        pdf.drawString(420, table_y + 7, "Status")

        row_y = table_y - 25
        pdf.setFillColor(colors.black)
        pdf.rect(40, row_y, width - 80, 25)

        pdf.drawString(50, row_y + 7, appointment.model_name)
        pdf.drawString(220, row_y + 7, str(appointment.appointment_date))
        pdf.drawString(330, row_y + 7, str(appointment.appointment_time))
        pdf.drawString(420, row_y + 7, "Confirmed")

        # =========================
        # IMPORTANT NOTES
        # =========================
        notes_y = row_y - 50

        pdf.setFont("Helvetica-Bold", 12)
        pdf.drawString(40, notes_y, "Important Notes")

        pdf.setFont("Helvetica", 10)
        pdf.drawString(50, notes_y - 20, "• Please arrive 15 minutes before your scheduled time.")
        pdf.drawString(50, notes_y - 35, "• Bring valid ID proof.")
        pdf.drawString(50, notes_y - 50, "• Contact support for rescheduling.")

        # =========================
        # FOOTER
        # =========================
        pdf.setFillColorRGB(0.95, 0.95, 0.95)
        pdf.rect(0, 0, width, 50, fill=1)

        pdf.setFillColor(colors.black)
        pdf.setFont("Helvetica", 9)
        pdf.drawCentredString(width / 2, 30, "Thank you for choosing MODELS")
        pdf.drawCentredString(width / 2, 18, "support@models.com | +91-9999999999")

        pdf.showPage()
        pdf.save()
        buffer.seek(0)

        # =========================
        # SEND USER EMAIL
        # =========================
        email_user = EmailMessage(
            subject=f"Appointment Confirmation - {appointment.model_name}",
            body=f"""
Hello {appointment.name},

Your appointment has been successfully confirmed.

Model: {appointment.model_name}
Date: {appointment.appointment_date}
Time: {appointment.appointment_time}

Please find your confirmation PDF attached.

Thank you,
MODELS Team
            """,
            from_email=settings.EMAIL_HOST_USER,
            to=[appointment.email],
        )

        email_user.attach(
            f"Appointment_{appointment.id}.pdf",
            buffer.getvalue(),
            "application/pdf"
        )

        email_user.send(fail_silently=False)

        # =========================
        # ADMIN EMAIL
        # =========================
        EmailMessage(
            subject=f"New Appointment - {appointment.model_name}",
            body=f"""
New Booking Received

Name: {appointment.name}
Email: {appointment.email}
Phone: {appointment.phone}
Model: {appointment.model_name}
Date: {appointment.appointment_date}
Time: {appointment.appointment_time}
            """,
            from_email=settings.EMAIL_HOST_USER,
            to=[settings.EMAIL_HOST_USER],
        ).send()

        messages.success(request, "Appointment booked successfully! PDF sent to your email.")
        return redirect("book_appointment", id=id)

    return render(request, "book-appointment.html", {
        "profile": profile,
        "session_name": session_name,
        "session_email": session_email,
    })

def rankings(request):
    return render(request, 'rankings.html')

def feedback(request):

    name = request.session.get("name")
    email = request.session.get("email")

    if request.method == "POST":
        form = feedbackForm(request.POST)

        if form.is_valid():
            feedback_instance = form.save()

            try:
                # =====================================================
                # 1️⃣ EMAIL TO ADMIN (Plain Text)
                # =====================================================
                admin_subject = f"[Website Feedback] {feedback_instance.feedback}"

                admin_message = (
                    "Hello Admin,\n"
                    "=================================================\n\n"
                    "A new feedback has been submitted on your website.\n\n"
                    f"Name         : {feedback_instance.name}\n"
                    f"Email        : {feedback_instance.email}\n"
                    f"Feedback Type: {feedback_instance.feedback}\n"
                    f"Submitted On : {timezone.now().strftime('%d-%m-%Y %I:%M %p')}\n\n"
                    "Message:\n"
                    "-------------------------------------------------\n"
                    f"{feedback_instance.message}\n"
                    "-------------------------------------------------\n\n"
                    "Please review this in the admin dashboard.\n\n"
                    "Regards,\n"
                    "Website System"
                )

                admin_email = EmailMessage(
                    subject=admin_subject,
                    body=admin_message,
                    from_email=settings.EMAIL_HOST_USER,
                    to=[settings.EMAIL_HOST_USER],
                    reply_to=[feedback_instance.email],
                )

                admin_email.send(fail_silently=False)

                # =====================================================
                # 2️⃣ COLORED CONFIRMATION EMAIL TO USER (HTML)
                # =====================================================

                user_subject = "Thank You for Your Feedback – We’ve Received It!"

                html_content = f"""
                <!DOCTYPE html>
                <html>
                <body style="font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 20px;">

                    <div style="max-width: 600px; margin: auto; background: #ffffff; 
                                padding: 25px; border-radius: 10px; 
                                box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

                        <h2 style="color: #2c3e50; text-align: center;">
                            Thank You, {feedback_instance.name}!
                        </h2>

                        <p style="color: #555; font-size: 14px;">
                            We have successfully received your feedback. 
                            Our team will review it carefully.
                        </p>

                        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

                        <h4 style="color: #34495e;">📋 Your Submission Details</h4>

                        <p>
                            <strong>Feedback Type:</strong> 
                            <span style="color: #e74c3c;">
                                {feedback_instance.feedback}
                            </span>
                        </p>

                        <p><strong>Your Message:</strong></p>

                        <div style="background-color: #f8f9fa; padding: 12px; 
                                    border-left: 4px solid #3498db; 
                                    border-radius: 5px; color: #555;">
                            {feedback_instance.message}
                        </div>

                        <p style="margin-top: 20px; font-size: 13px; color: #777;">
                            Submitted on: {feedback_instance.created.strftime('%d-%m-%Y %I:%M %p')}
                        </p>

                        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

                        <p style="font-size: 14px; color: #555;">
                            If you have any further questions, feel free to contact us.
                        </p>

                        <p style="margin-top: 20px;">
                            <strong style="color:#2c3e50;">Customer Support Team</strong><br>
                            <span style="color:#888;">Models.</span><br>
                            <span style="color:#3498db;">{settings.EMAIL_HOST_USER}</span>
                        </p>

                    </div>

                </body>
                </html>
                """

                text_content = strip_tags(html_content)

                user_email = EmailMultiAlternatives(
                    subject=user_subject,
                    body=text_content,
                    from_email=settings.EMAIL_HOST_USER,
                    to=[feedback_instance.email],
                )

                user_email.attach_alternative(html_content, "text/html")
                user_email.send(fail_silently=False)

                messages.success(
                    request,
                    "✅ Thank you! Your feedback has been submitted successfully. Please check your email."
                )

                return redirect("feedback")

            except Exception as e:
                messages.error(
                    request,
                    f"⚠ Feedback saved, but email sending failed: {str(e)}"
                )

        else:
            messages.error(
                request,
                "❌ There were errors in your submission. Please correct them."
            )

    else:
        form = feedbackForm(initial={
            "name": name,
            "email": email,
        })

    return render(request, "feedback.html", {"form": form})

def logout_view(request):
    request.session.flush()   
    return redirect("/login/")

def my_bookings(request):
    user_email = request.session.get("email")

    # 🔐 login check
    if not user_email:
        return redirect("login")

    bookings = Appointment.objects.filter(
        email=user_email
    ).select_related("model_profile").order_by("-created_at")

    context = {
        "bookings": bookings,
        "total_bookings": bookings.count(),
    }

    return render(request, "my_bookings.html", context)

def download_booking_pdf(request, id):
    user_email = request.session.get("email")

    # 🔐 security: only owner can download
    appointment = get_object_or_404(
        Appointment,
        id=id,
        email=user_email
    )

    buffer = io.BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    # ===== WATERMARK =====
    pdf.saveState()
    pdf.setFont("Helvetica-Bold", 100)
    pdf.setFillColorRGB(0.93, 0.93, 0.93)
    pdf.translate(width / 2, height / 2)
    pdf.rotate(45)
    pdf.drawCentredString(0, 0, "MODELS")
    pdf.restoreState()

    # ===== HEADER =====
    pdf.setFillColorRGB(0.05, 0.12, 0.25)
    pdf.rect(0, height - 90, width, 90, fill=1)

    logo_path = finders.find("assets/img/logo.jpg")
    if logo_path:
        pdf.drawImage(logo_path, 40, height - 75, width=40, height=40, mask='auto')

    pdf.setFillColor(colors.white)
    pdf.setFont("Helvetica-Bold", 18)
    pdf.drawString(100, height - 50, "MODELS")

    pdf.setFont("Helvetica", 11)
    pdf.drawString(100, height - 68, "Appointment Confirmation")

    # ===== BOOKING INFO =====
    pdf.setFillColor(colors.black)
    pdf.setFont("Helvetica", 10)
    pdf.drawString(40, height - 110, f"Booking ID: #{appointment.id}")
    pdf.drawString(40, height - 125, f"Booking Date: {appointment.appointment_date}")

    # ===== CUSTOMER BOX =====
    box_y = height - 170
    pdf.setStrokeColor(colors.grey)
    pdf.rect(40, box_y - 90, width - 80, 90)

    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(50, box_y - 20, "Customer Details")

    pdf.setFont("Helvetica", 11)
    pdf.drawString(50, box_y - 40, f"Name: {appointment.name}")
    pdf.drawString(50, box_y - 55, f"Email: {appointment.email}")
    pdf.drawString(50, box_y - 70, f"Phone: {appointment.phone}")

    # ===== TABLE =====
    table_y = box_y - 130

    pdf.setFillColorRGB(0.2, 0.45, 0.75)
    pdf.rect(40, table_y, width - 80, 25, fill=1)

    pdf.setFillColor(colors.white)
    pdf.setFont("Helvetica-Bold", 11)
    pdf.drawString(50, table_y + 7, "Model")
    pdf.drawString(220, table_y + 7, "Date")
    pdf.drawString(330, table_y + 7, "Time")
    pdf.drawString(420, table_y + 7, "Status")

    row_y = table_y - 25
    pdf.setFillColor(colors.black)
    pdf.rect(40, row_y, width - 80, 25)

    pdf.drawString(50, row_y + 7, appointment.model_name)
    pdf.drawString(220, row_y + 7, str(appointment.appointment_date))
    pdf.drawString(330, row_y + 7, str(appointment.appointment_time))
    pdf.drawString(420, row_y + 7, "Confirmed")

    # ===== FOOTER =====
    pdf.setFillColorRGB(0.95, 0.95, 0.95)
    pdf.rect(0, 0, width, 50, fill=1)

    pdf.setFillColor(colors.black)
    pdf.setFont("Helvetica", 9)
    pdf.drawCentredString(width / 2, 30, "Thank you for choosing MODELS")
    pdf.drawCentredString(width / 2, 18, "support@models.com | +91-9999999999")

    pdf.showPage()
    pdf.save()
    buffer.seek(0)

    response = HttpResponse(buffer, content_type="application/pdf")
    response["Content-Disposition"] = f'attachment; filename="Appointment_{appointment.id}.pdf"'

    return response