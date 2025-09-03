document.addEventListener("DOMContentLoaded", () => {
  const bukuItems = document.querySelectorAll(".buku");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // kasih delay sesuai index → efek muncul bergiliran
        const index = [...bukuItems].indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 150); // jeda 150ms per item
      }
    });
  }, { threshold: 0.2 });

  bukuItems.forEach(item => observer.observe(item));
});
