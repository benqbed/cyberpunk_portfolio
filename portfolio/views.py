# portfolio/views.py
from django.shortcuts import render
from django.http import JsonResponse
from .models import PersonalInfo, Project, Education, Experience, Skill

def index(request):
    """Main portfolio page view."""
    try:
        personal_info = PersonalInfo.objects.first()
    except PersonalInfo.DoesNotExist:
        personal_info = None
    
    projects = Project.objects.all()
    education = Education.objects.all()
    experience = Experience.objects.all()
    skills = Skill.objects.all()
    
    context = {
        'personal_info': personal_info,
        'projects': projects,
        'education': education,
        'experience': experience,
        'skills': skills,
    }
    
    return render(request, 'portfolio/index.html', context)

def project_detail(request, pk):
    """AJAX view to get project details for modal."""
    try:
        project = Project.objects.get(pk=pk)
        data = {
            'title': project.title,
            'description': project.long_description,
            'image': project.image.url if project.image else None,
            'github_link': project.github_link,
            'live_link': project.live_link,
            'technologies': [tech.name for tech in project.technologies.all()],
            'date_completed': project.date_completed.strftime('%B %Y'),
        }
        return JsonResponse({'status': 'success', 'data': data})
    except Project.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Project not found'}, status=404)

def education_detail(request, pk):
    """AJAX view to get education details for modal."""
    try:
        edu = Education.objects.get(pk=pk)
        data = {
            'institution': edu.institution,
            'degree': edu.degree,
            'field_of_study': edu.field_of_study,
            'start_date': edu.start_date.strftime('%B %Y'),
            'end_date': edu.end_date.strftime('%B %Y') if edu.end_date else 'Present',
            'description': edu.description,
            'logo': edu.logo.url if edu.logo else None,
        }
        return JsonResponse({'status': 'success', 'data': data})
    except Education.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Education not found'}, status=404)

def experience_detail(request, pk):
    """AJAX view to get experience details for modal."""
    try:
        exp = Experience.objects.get(pk=pk)
        data = {
            'company': exp.company,
            'position': exp.position,
            'start_date': exp.start_date.strftime('%B %Y'),
            'end_date': exp.end_date.strftime('%B %Y') if exp.end_date else 'Present',
            'current': exp.current,
            'description': exp.description,
            'logo': exp.logo.url if exp.logo else None,
        }
        return JsonResponse({'status': 'success', 'data': data})
    except Experience.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Experience not found'}, status=404)