function setupScrollDots(gridId, dotsId) {
    const grid = document.getElementById(gridId);
    const dots = document.getElementById(dotsId)?.children;
    if (!grid || !dots) return;

    grid.addEventListener('scroll', () => {
        const scrollWidth = grid.scrollWidth - grid.clientWidth;
        const scrollPos = grid.scrollLeft;
        const index = Math.round((scrollPos / scrollWidth) * (dots.length - 1));

        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.toggle('active', i === index);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupScrollDots('riwayat', 'riwayat-dots');
    setupScrollDots('pelajaran', 'pelajaran-dots');
    setupScrollDots('novel', 'novel-dots');
    setupScrollDots('comic', 'comic-dots');
});


// Optional: close menu when clicking outside


function Menu(event) {
    if (event) event.stopPropagation(); // Tambahkan ini!
    const dropdown = document.getElementById('dropdown-menu');
    const icon = document.getElementById('menuIcon');
    const mainContent = document.querySelector('.main-content');
    dropdown.classList.toggle('show');
    icon.classList.toggle('active');
    if (dropdown.classList.contains('show')) {
        mainContent.classList.add('shifted');
    } else {
        mainContent.classList.remove('shifted');
    }
}

let mouseDownX = 0;
let mouseUpX = 0;
let isMouseDown = false;

document.addEventListener('mousedown', function(e) {
    isMouseDown = true;
    mouseDownX = e.clientX;
    document.body.classList.add('noselect');
});

document.addEventListener('mousemove', function(e) {
    if (isMouseDown) {
        mouseUpX = e.clientX;
    }
});

document.addEventListener('mouseup', function(e) {
    if (isMouseDown) {
        mouseUpX = e.clientX;
        const delta = mouseUpX - mouseDownX;
        const dropdown = document.getElementById('dropdown-menu');
        const icon = document.getElementById('menuIcon');
        const mainContent = document.querySelector('.main-content');
        if (delta > 60 && !dropdown.classList.contains('show')) {
            // Drag kanan, buka menu jika belum terbuka
            dropdown.classList.add('show');
            icon.classList.add('active');
            mainContent.classList.add('shifted');
        } else if (delta < -60 && dropdown.classList.contains('show')) {
            // Drag kiri, tutup menu jika sedang terbuka
            dropdown.classList.remove('show');
            icon.classList.remove('active');
            mainContent.classList.remove('shifted');
        }
        isMouseDown = false;
        document.body.classList.remove('noselect');
    }
});

document.addEventListener('mousedown', function(e) {
    if (e.clientX < 50) {
        isMouseDown = true;
        mouseDownX = e.clientX;
        document.body.classList.add('noselect'); // Tambahkan ini
    }
});

document.addEventListener('mouseup', function(e) {
    if (isMouseDown) {
        mouseUpX = e.clientX;
        if (mouseUpX - mouseDownX > 60) {
            Menu();
        }
        isMouseDown = false;
        document.body.classList.remove('noselect'); // Tambahkan ini
    }
});

// darkmode

const themeSwitch = document.getElementById('theme-switch');

const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkmode', 'active');
}

const disableDarkMode = () => {
  document.body.classList.remove('darkmode');
  localStorage.removeItem('darkmode');
}

themeSwitch.addEventListener('click', () => {
  // cek ulang setiap kali klik
  let darkmode = localStorage.getItem('darkmode');
  if (darkmode === "active") {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

// cek saat pertama load
if (localStorage.getItem('darkmode') === "active") {
  enableDarkMode();
}

const btn = document.getElementById("theme-switch");
const icons = btn.querySelectorAll("svg");

btn.classList.add("moon"); // default bulan

btn.addEventListener("click", () => {
    if (btn.classList.contains("moon")) {
        btn.classList.remove("moon");
        btn.classList.add("sun");
       
    } else {
        btn.classList.remove("sun");
        btn.classList.add("moon");
        
    }
});

// untuk slide


document.addEventListener("DOMContentLoaded", () => {
  // Ambil semua book-grid section
  document.querySelectorAll(".book-grid").forEach(grid => {
    const items = grid.querySelectorAll(".book-item");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          // kalau mau hilang lagi saat keluar scroll, aktifkan baris ini
          entry.target.classList.remove("show");
        }
      });
    }, { 
      root: grid,      // <== amati scroll container ini!
      threshold: 0.3 
    });

    items.forEach(item => observer.observe(item));
  });
});



