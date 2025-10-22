// Script to handle image hover effects
document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.querySelector('.image-container');
    const textSection = document.querySelector('.text-section');
    
    if (imageContainer && textSection) {
        // Add hover effect
        imageContainer.addEventListener('mouseenter', function() {
            textSection.style.opacity = '0.1';
        });
        
        // Remove hover effect
        imageContainer.addEventListener('mouseleave', function() {
            textSection.style.opacity = '1';
        });
    }
}); 