from django.urls import path
from . import views

urlpatterns = [

    # =========================
    # ADMIN AUTH
    # =========================
    path('', views.adminlogin, name='adminlogin'),
    path('adminlogout/', views.admin_logout, name='adminlogout'),

    # =========================
    # ADMIN DASHBOARD
    # =========================
    path('adminindex/', views.adminindex, name='adminindex'),

    # =========================
    # BOOKINGS MANAGEMENT
    # =========================
    path('adminbookings/', views.adminbookings, name='adminbookings'),
    path('adminaddbooking/', views.admin_add_booking, name='admin_add_booking'),
    path('adminbooking/view/<int:id>/', views.view_booking, name='view_booking'),
    path('adminbooking/edit/<int:id>/', views.edit_booking, name='edit_booking'),
    path('delete_booking/<int:id>/', views.delete_booking, name='delete_booking'),

    # =========================
    # MODELS MANAGEMENT
    # =========================
    path('adminmodels/', views.adminmodels, name='adminmodels'),
    path('adminaddmodel/', views.adminaddmodel, name='adminaddmodel'),
    path('adminadd-model/', views.adminaddmodel, name='adminadd-model'),
    path('adminmodeldetail/<int:id>/', views.adminmodeldetail, name='adminmodeldetail'),
    path('adminmodel/edit/<int:id>/', views.adminmodeledit, name='adminmodeledit'),
    path('model/delete/<int:id>/', views.delete_model, name='delete_model'),

    # =========================
    # USERS MANAGEMENT
    # =========================
    path('adminusers/', views.adminusers, name='adminusers'),
    path('adminadduser/', views.admin_add_user, name='admin_add_user'),
    path('delete-user/<int:id>/', views.delete_user, name='delete_user'),

    # =========================
    # CONTACT MANAGEMENT
    # =========================
    path('admincontact/', views.admincontact, name='admincontact'),
    path('admincontact/add/', views.admin_add_contact, name='admin_add_contact'),
    path('admin/contact/edit/<int:id>/', views.edit_contact, name='edit_contact'),
    path('admin/contact/delete/<int:id>/', views.delete_contact, name='delete_contact'),

    # =========================
    # FEEDBACK MANAGEMENT
    # =========================
    path('adminfeedback/', views.adminfeedback, name='adminfeedback'),
    path('adminfeedback/add/', views.admin_add_feedback, name='admin_add_feedback'),
    path('edit-feedback/<int:id>/', views.edit_feedback, name='edit_feedback'),
    path('delete-feedback/<int:id>/', views.delete_feedback, name='delete_feedback'),

]