# cyberpunk_portfolio/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.static import serve
import os

# Create media directories if they don't exist
os.makedirs(os.path.join(settings.MEDIA_ROOT, 'project_images'), exist_ok=True)
os.makedirs(os.path.join(settings.MEDIA_ROOT, 'profile_images'), exist_ok=True)
os.makedirs(os.path.join(settings.MEDIA_ROOT, 'company_logos'), exist_ok=True)
os.makedirs(os.path.join(settings.MEDIA_ROOT, 'education_logos'), exist_ok=True)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('portfolio.urls')),
    # Explicitly serve media files
    path('media/<path:path>', serve, {'document_root': settings.MEDIA_ROOT}),
]

# Add static files handling
urlpatterns += staticfiles_urlpatterns()

# Add traditional media file handling as well
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)