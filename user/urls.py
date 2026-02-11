from django.urls import path
from user import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index),
    path('about/', views.about),
    path('beauty/', views.beauty),
    path('contact/', views.contact, name='contact'),
    path('creatives/', views.creatives),
    path('fashion/', views.fashion),
    path('login/', views.login, name='login'),
    path('model/', views.model, name='model-list'),  # list of all models
    path('model-profile/<int:id>/', views.modelprofile, name='model-profile'),
    path('rankings/', views.rankings),
    path('feedback/', views.feedback, name='feedback'),
    path('signup/', views.signup),
    path("logout/", views.logout_view, name="logout"),
    path("book-appointment/<int:id>/", views.book_appointment, name="book_appointment"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
