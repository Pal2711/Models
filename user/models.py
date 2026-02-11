from django.db import models

class Signup(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=10)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Contact(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()

    SUBJECT_TYPE = [
        ('Technical Issues','Technical Issues'),
        ('Apply to become a model','Apply to become a model'),
        ('Agency / Brand Collaboration Inquiry','Agency / Brand Collaboration Inquiry'),
        ('General Questions / Support','General Questions / Support'),
        ('Media / Press Inquiry','Media / Press Inquiry'),
        ('Other','Other'),
    ]

    subject = models.CharField(max_length=100, choices=SUBJECT_TYPE)
    message = models.TextField()

    def __str__(self):
        return self.name
    
class feedback(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()

    FEEDBACK_TYPES = [
        ('Suggestion', 'Suggestion'),
        ('Bug Report', 'Bug Report'),
        ('Complaint', 'Complaint'),
        ('Appreciation', 'Appreciation'),
        ('Other', 'Other')   
    ]
    feedback = models.CharField(max_length=100, choices=FEEDBACK_TYPES)
    message = models.TextField()

    def __str__(self):
        return self.name
    
class ModelProfile(models.Model):
    profile_image = models.ImageField(upload_to='model_profiles/profile_images/', blank=True, null=True)
    full_name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.full_name

class Modeldetails(models.Model):
    profile = models.ForeignKey(
        ModelProfile, on_delete=models.CASCADE, related_name='details'
    )
    registered_at = models.DateTimeField(auto_now_add=True)

    email = models.EmailField(unique=True)
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]

    gender = models.CharField(
        max_length=20,
        choices=GENDER_CHOICES
    )
    date_of_birth = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    agency = models.CharField(max_length=100)
    category = models.CharField(max_length=50)

    introduction = models.TextField()
    about = models.TextField()

    instagram_followers = models.CharField(max_length=50)
    years_active = models.PositiveIntegerField()
    runway_shows = models.PositiveIntegerField()

    awards = models.CharField(max_length=255, blank=True, null=True)
    
    image_1 = models.ImageField(upload_to='model_profiles/multiple_images/', blank=True, null=True)
    image_2 = models.ImageField(upload_to='model_profiles/multiple_images/', blank=True, null=True)
    image_3 = models.ImageField(upload_to='model_profiles/multiple_images/', blank=True, null=True)
    image_4 = models.ImageField(upload_to='model_profiles/multiple_images/', blank=True, null=True)
    image_5 = models.ImageField(upload_to='model_profiles/multiple_images/', blank=True, null=True)
    image_6 = models.ImageField(upload_to='model_profiles/multiple_images/', blank=True, null=True)
    image_7 = models.ImageField(upload_to='model_profiles/multiple_images/', blank=True, null=True)
    image_8 = models.ImageField(upload_to='model_profiles/multiple_images/', blank=True, null=True)
    image_9 = models.ImageField(upload_to='model_profiles/multiple_images/', blank=True, null=True)
    
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email

class Appointment(models.Model):
    model_profile = models.ForeignKey(
        ModelProfile,
        on_delete=models.CASCADE
    )

    model_name = models.CharField(max_length=100,default="")  

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.model_name}"


