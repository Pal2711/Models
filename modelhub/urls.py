from django.urls import path
from . import views

urlpatterns = [

    path('', views.mhlogin, name='mhlogin'),
    path('profile/', views.mhdashboard, name='mhdashboard'),
    path('booking/', views.mhbooking, name='mhbooking'),
    path('edit/', views.mhedit, name='mhedit'),
    path('mhdeletebooking/<int:id>/', views.mhdeletebooking, name='mhdeletebooking'),   
    path('delete/', views.mhdelete, name='mhdelete'),
    path('logout/', views.modelhublogout, name='modelhublogout'),

]