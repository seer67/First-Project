// Slider populer: hanya satu card tampil, animasi otomatis
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.getElementById('populerSingleSlider');
  if (!slider) return;

  let currentIndex = 0;
  const containers = slider.querySelectorAll('.detail-container');
  if (containers.length < 2) return;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % containers.length;
    updateSlider();
  }

  // Auto slide setiap 3 detik
  const interval = setInterval(nextSlide, 15000);

  // Bersihkan interval saat user meninggalkan halaman
  window.addEventListener('beforeunload', () => clearInterval(interval));

  // Update saat resize window
  window.addEventListener('resize', updateSlider);
});
  
// Dropdown genre logic
function toggleGenreDropdown() {
  const list = document.getElementById('genreDropdownList');
  list.classList.toggle('show');
}
document.addEventListener('click', function(e) {
  const btn = document.querySelector('.genre-dropdown-btn');
  const list = document.getElementById('genreDropdownList');
  if (!btn || !list) return;
  if (!btn.contains(e.target) && !list.contains(e.target)) {
    list.classList.remove('show');
  }
});
// Placeholder: filter buku sesuai genre saat genre diklik
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.genre-option').forEach(function(opt) {
    opt.addEventListener('click', function() {
      const genre = this.getAttribute('data-genre');
      // TODO: filter buku sesuai genre
      // alert('Genre dipilih: ' + genre);
      document.getElementById('genreDropdownList').classList.remove('show');
    });
  });
});
// Scroll book grid ke kiri saat tombol diklik
function scrollBookGridLeft(gridId) {
  const grid = document.getElementById(gridId);
  if (grid) {
    // Sinkron dengan jumlah dot (3 dot = 3 page)
    const dots = document.querySelector(`#${gridId}-dots`);
    let pageCount = 3;
    if (dots) pageCount = dots.children.length;
    const scrollWidth = grid.scrollWidth - grid.clientWidth;
    const pageWidth = scrollWidth / (pageCount - 1);
    // Scroll ke page sebelumnya
    let prevScroll = grid.scrollLeft - pageWidth;
    if (prevScroll < 0) prevScroll = 0;
    grid.scrollTo({ left: prevScroll, behavior: 'smooth' });
  }
}
// Scroll book grid ke kanan saat tombol diklik
function scrollBookGridRight(gridId) {
  const grid = document.getElementById(gridId);
  if (grid) {
    // Sinkron dengan jumlah dot (3 dot = 3 page)
    const dots = document.querySelector(`#${gridId}-dots`);
    let pageCount = 3;
    if (dots) pageCount = dots.children.length;
    const scrollWidth = grid.scrollWidth - grid.clientWidth;
    const pageWidth = scrollWidth / (pageCount - 1);
    // Scroll ke page berikutnya
    let nextScroll = grid.scrollLeft + pageWidth;
    if (nextScroll > scrollWidth) nextScroll = scrollWidth;
    grid.scrollTo({ left: nextScroll, behavior: 'smooth' });
  }
}
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
  document.querySelectorAll(".book-grid").forEach(grid => {
    const items = grid.querySelectorAll(".book-item");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Tambah atau hapus class 'show' berdasarkan visibility
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          // Hapus class 'show' saat element keluar viewport
          entry.target.classList.remove("show");
        }
      });
    }, { 
      root: null,
      threshold: 0.1,
      rootMargin: "0px" // Tambahkan margin untuk trigger lebih awal
    });

    items.forEach(item => observer.observe(item));
  });
});






