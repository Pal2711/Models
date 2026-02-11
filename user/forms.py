from django import forms
from .models import *

class UserSignupForm(forms.ModelForm):
    class Meta:
        model = Signup
        fields = "__all__"

class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = "__all__"
        
class feedbackForm(forms.ModelForm):
    class Meta:
        model = feedback
        fields = "__all__"
                
class ModelProfileForm(forms.ModelForm):
    class Meta:
        model = ModelProfile
        fields = "__all__"

class ModeldetailsForm(forms.ModelForm):
    class Meta:
        model = Modeldetails
        fields = "__all__"