// portfolio/static/js/modal.js

document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    const modal = document.getElementById('cyberpunk-modal');
    const modalBody = modal.querySelector('.modal-body');
    const modalClose = modal.querySelector('.modal-close');
    
    // Project card click handlers
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project-id');
            fetchProjectDetails(projectId);
        });
    });
    
    // Education card click handlers
    const educationCards = document.querySelectorAll('.education-card');
    
    educationCards.forEach(card => {
        card.addEventListener('click', function() {
            const educationId = this.getAttribute('data-education-id');
            fetchEducationDetails(educationId);
        });
    });
    
    // Experience card click handlers
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
        card.addEventListener('click', function() {
            const experienceId = this.getAttribute('data-experience-id');
            fetchExperienceDetails(experienceId);
        });
    });
    
    // Close modal when clicking the close button
    modalClose.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Function to fetch project details
    function fetchProjectDetails(projectId) {
        fetch(`/project/${projectId}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    displayProjectModal(data.data);
                } else {
                    console.error('Error fetching project details:', data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching project details:', error);
            });
    }
    
    // Function to fetch education details
    function fetchEducationDetails(educationId) {
        fetch(`/education/${educationId}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    displayEducationModal(data.data);
                } else {
                    console.error('Error fetching education details:', data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching education details:', error);
            });
    }
    
    // Function to fetch experience details
    function fetchExperienceDetails(experienceId) {
        fetch(`/experience/${experienceId}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    displayExperienceModal(data.data);
                } else {
                    console.error('Error fetching experience details:', data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching experience details:', error);
            });
    }
    
    // Function to display project details in modal
    function displayProjectModal(project) {
        let techStack = '';
        
        if (project.technologies && project.technologies.length > 0) {
            techStack = `
                <div class="modal-tech-stack">
                    <h4>Technologies</h4>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            `;
        }
        
        let projectLinks = '';
        
        if (project.github_link || project.live_link) {
            projectLinks = `
                <div class="modal-links">
                    ${project.github_link ? `<a href="${project.github_link}" target="_blank" class="neon-button"><i class="fab fa-github"></i> View Code</a>` : ''}
                    ${project.live_link ? `<a href="${project.live_link}" target="_blank" class="neon-button"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                </div>
            `;
        }
        
        const modalContent = `
            <div class="modal-header">
                <h2 class="modal-title">${project.title}</h2>
                <p class="modal-date">Completed: ${project.date_completed}</p>
            </div>
            ${project.image ? `
                <div class="modal-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
            ` : ''}
            <div class="modal-description">
                ${project.description.replace(/\n/g, '<br>')}
            </div>
            ${techStack}
            ${projectLinks}
        `;
        
        modalBody.innerHTML = modalContent;
        openModal();
    }
    
    // Function to display education details in modal
    function displayEducationModal(education) {
        const modalContent = `
            <div class="modal-header">
                ${education.logo ? `<div class="modal-logo"><img src="${education.logo}" alt="${education.institution}"></div>` : ''}
                <div>
                    <h2 class="modal-title">${education.institution}</h2>
                    <p class="modal-subtitle">${education.degree}</p>
                    <p class="modal-date">${education.start_date} - ${education.end_date}</p>
                </div>
            </div>
            <div class="modal-content-block">
                <h3>Field of Study</h3>
                <p>${education.field_of_study}</p>
            </div>
            ${education.description ? `
                <div class="modal-content-block">
                    <h3>Description</h3>
                    <p>${education.description.replace(/\n/g, '<br>')}</p>
                </div>
            ` : ''}
        `;
        
        modalBody.innerHTML = modalContent;
        openModal();
    }
    
    // Function to display experience details in modal
    function displayExperienceModal(experience) {
        const modalContent = `
            <div class="modal-header">
                ${experience.logo ? `<div class="modal-logo"><img src="${experience.logo}" alt="${experience.company}"></div>` : ''}
                <div>
                    <h2 class="modal-title">${experience.position}</h2>
                    <p class="modal-subtitle">${experience.company}</p>
                    <p class="modal-date">${experience.start_date} - ${experience.end_date}</p>
                </div>
            </div>
            <div class="modal-content-block">
                <h3>Job Description</h3>
                <p>${experience.description.replace(/\n/g, '<br>')}</p>
            </div>
        `;
        
        modalBody.innerHTML = modalContent;
        openModal();
    }
    
    // Function to open modal with animation
    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling of background
        
        // Add entrance animation
        setTimeout(() => {
            modal.classList.add('modal-active');
        }, 10);
    }
    
    // Function to close modal with animation
    function closeModal() {
        modal.classList.remove('modal-active');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }, 300);
    }
});