# portfolio/admin.py
from django.contrib import admin
from .models import PersonalInfo, Skill, Project, Education, Experience

@admin.register(PersonalInfo)
class PersonalInfoAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'email')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'proficiency')
    list_filter = ('proficiency',)
    search_fields = ('name',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_completed', 'featured', 'order')
    list_filter = ('featured', 'technologies', 'date_completed')
    search_fields = ('title', 'short_description', 'long_description')
    filter_horizontal = ('technologies',)
    list_editable = ('featured', 'order')

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('institution', 'degree', 'field_of_study', 'start_date', 'end_date')
    list_filter = ('start_date', 'end_date')
    search_fields = ('institution', 'degree', 'field_of_study')

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('company', 'position', 'start_date', 'end_date', 'current')
    list_filter = ('start_date', 'end_date', 'current')
    search_fields = ('company', 'position', 'description')
    list_editable = ('current',)