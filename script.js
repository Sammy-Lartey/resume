document.addEventListener('DOMContentLoaded', function() {
    // --- Visitor Count Functionality ---
    fetch('https://j0iyjzewml.execute-api.ap-south-1.amazonaws.com/prod/visitor_count')
    .then(response => response.json())
    .then(data => {
        let visitor_count = data.updated_total_count;
        document.querySelector('#count').textContent = visitor_count;
    })
    .catch(error => {
        console.log('Error fetching visitor count:', error);
        document.querySelector('#count').textContent = "many";
    });

    // --- Download Button Functionality ---
    document.getElementById('download-btn').addEventListener('click', function() {
        const pdfUrl = '../assets/SAMUEL LARTEY-CV.pdf';
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'SAMUEL-LARTEY-RESUME.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const payload = Object.fromEntries(formData);

            formStatus.textContent = 'Sending...';
            formStatus.style.color = '#1e3f7a';

            // You'll need to create a new API endpoint for this
            fetch('https://YOUR_NEW_API_ENDPOINT/prod/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                formStatus.style.color = 'green';
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                formStatus.textContent = 'Failed to send message. Please email me directly at sammylartey39@gmail.com';
                formStatus.style.color = 'red';
            });
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});