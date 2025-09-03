function Menu() {
    var menu = document.getElementById('dropdown-menu');
    var icon = document.getElementById('menuIcon');
    var isOpen = menu.style.display === 'block';
    menu.style.display = isOpen ? 'none' : 'block';
    if (icon) icon.classList.toggle('active', !isOpen);
}

// Optional: close menu when clicking outside
document.addEventListener('click', function(e) {
    var menu = document.getElementById('dropdown-menu');
    var icon = document.getElementById('menuIcon');
    if (!menu.contains(e.target) && !icon.contains(e.target)) {
        menu.style.display = 'none';
        if (icon) icon.classList.remove('active');
    }
});

function Menu() {
    var menu = document.getElementById('dropdown-menu');
    var icon = document.getElementById('menuIcon');
    var isOpen = menu.classList.contains('show');
    if (isOpen) {
        menu.classList.remove('show');
        icon.classList.remove('active');
    } else {
        menu.classList.add('show');
        icon.classList.add('active');
    }
}