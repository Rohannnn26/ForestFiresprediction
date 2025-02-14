document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form validation and feedback
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            let valid = true;
            const inputs = form.querySelectorAll('input[required]');
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
            });

            if (!valid) {
                e.preventDefault();
                alert('Please fill out all required fields.');
            }
        });
    }

    // Dynamic background gradient animation
    const body = document.body;
    let colors = ['from-blue-900', 'to-purple-900', 'from-indigo-900', 'to-pink-900'];
    let currentIndex = 0;

    setInterval(() => {
        body.classList.remove(colors[currentIndex % colors.length], colors[(currentIndex + 1) % colors.length]);
        currentIndex = (currentIndex + 1) % colors.length;
        body.classList.add(colors[currentIndex % colors.length], colors[(currentIndex + 1) % colors.length]);
    }, 5000);

    // Tooltips for input fields
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip bg-gray-700 text-white text-sm p-2 rounded-lg absolute z-10';
            tooltip.textContent = input.placeholder;
            input.parentNode.appendChild(tooltip);
        });

        input.addEventListener('blur', () => {
            const tooltip = input.parentNode.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    // Confetti effect on successful prediction
    const resultDiv = document.querySelector('.pop-in');
    if (resultDiv) {
        const confettiSettings = { target: 'confetti' };
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

        setTimeout(() => {
            confetti.clear();
        }, 5000); // Stop confetti after 5 seconds
    }
});