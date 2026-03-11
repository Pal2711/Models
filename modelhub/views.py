from django.shortcuts import render,redirect

# Create your views here.

def hubindex(request):
    return render(request, "hubindex.html")