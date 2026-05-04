document.addEventListener('DOMContentLoaded', function () {
    const tabLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-pane');

    tabLinks.forEach(link => {
        link.addEventListener('click', function () {
            const targetId = this.getAttribute('data-bs-target').substring(1);
            const targetContent = document.getElementById(targetId);

            tabContents.forEach(content => {
                content.classList.remove('fade-in');
            });

            setTimeout(() => {
                targetContent.classList.add('fade-in');
            }, 50);
        });
    });
});