from django.urls import path
from . import views

urlpatterns = [
    path('', views.adminlogin, name='adminlogin'),
    path('adminindex/', views.adminindex, name='adminindex'),
    path('adminaddmodel/', views.adminaddmodel, name='adminaddmodel'),
    path('adminbookings/', views.adminbookings, name='adminbookings'),
    path('adminbooking/edit/<int:id>/', views.edit_booking, name='edit_booking'),
    path('adminbooking/view/<int:id>/', views.view_booking, name='view_booking'),
    path('adminaddbooking/', views.admin_add_booking, name='admin_add_booking'),
    path('delete_booking/<int:id>/', views.delete_booking, name='delete_booking'),
    path('adminlogout/', views.admin_logout, name='adminlogout'),


    path('admincontact/', views.admincontact, name='admincontact'),
    path('admin/contact/edit/<int:id>/', views.edit_contact, name='edit_contact'),
    path('admin/contact/delete/<int:id>/', views.delete_contact, name='delete_contact'),
    path('admincontact/add/', views.admin_add_contact, name='admin_add_contact'),

    path('adminfeedback/', views.adminfeedback, name='adminfeedback'),
    path('delete-feedback/<int:id>/', views.delete_feedback, name='delete_feedback'),
    path('edit-feedback/<int:id>/', views.edit_feedback, name='edit_feedback'),
    path('adminfeedback/add/', views.admin_add_feedback, name='admin_add_feedback'),
    path('adminmodeldetail/<int:id>/', views.adminmodeldetail, name='adminmodeldetail'),
    path('adminmodel/edit/<int:id>/', views.adminmodeledit, name='adminmodeledit'),

    # DELETE model
    path('model/delete/<int:id>/', views.delete_model, name='delete_model'),

    # List all models
    path('adminmodels/', views.adminmodels, name='adminmodels'),

    path('adminadd-model/', views.adminaddmodel, name='adminadd-model'),
    path('adminusers/', views.adminusers, name='adminusers'),
    path('adminadduser/', views.admin_add_user, name='admin_add_user'),
    path('delete-user/<int:id>/', views.delete_user, name='delete_user'),
]
