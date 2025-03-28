# portfolio/urls.py
from django.urls import path
from . import views

app_name = 'portfolio'

urlpatterns = [
    path('', views.index, name='index'),
    path('project/<int:pk>/', views.project_detail, name='project_detail'),
    path('education/<int:pk>/', views.education_detail, name='education_detail'),
    path('experience/<int:pk>/', views.experience_detail, name='experience_detail'),
]

