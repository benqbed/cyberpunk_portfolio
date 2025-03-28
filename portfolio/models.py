# portfolio/models.py
from django.db import models

class PersonalInfo(models.Model):
    """Store personal information for the portfolio owner."""
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    bio = models.TextField()
    email = models.EmailField()
    linkedin = models.URLField()
    github = models.URLField(blank=True, null=True)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Personal Information"

class Skill(models.Model):
    """Skills shown on the portfolio."""
    name = models.CharField(max_length=100)
    proficiency = models.IntegerField(choices=[(i, i) for i in range(1, 6)])  # 1-5 scale
    icon = models.CharField(max_length=50, blank=True, null=True)  # For FontAwesome icons
    
    def __str__(self):
        return self.name

class Project(models.Model):
    """Projects showcased in the portfolio."""
    title = models.CharField(max_length=200)
    short_description = models.CharField(max_length=300)
    long_description = models.TextField()
    image = models.ImageField(upload_to='project_images/')
    github_link = models.URLField(blank=True, null=True)
    live_link = models.URLField(blank=True, null=True)
    technologies = models.ManyToManyField(Skill, related_name='projects')
    featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    date_completed = models.DateField()
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['order', '-date_completed']

class Education(models.Model):
    """Educational background."""
    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    field_of_study = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True)
    logo = models.ImageField(upload_to='education_logos/', blank=True, null=True)
    
    def __str__(self):
        return f"{self.degree} - {self.institution}"
    
    class Meta:
        ordering = ['-end_date', '-start_date']
        verbose_name_plural = "Education"

class Experience(models.Model):
    """Work experience."""
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    current = models.BooleanField(default=False)
    description = models.TextField()
    logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)
    
    def __str__(self):
        return f"{self.position} at {self.company}"
    
    class Meta:
        ordering = ['-end_date', '-start_date']