const swiper = new Swiper(".mySwiper", {
  loop: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    bulletClass: "my-bullet",
    bulletActiveClass: "my-bullet-active",
  },
  navigation: {
    nextEl: ".next-btn",
    prevEl: ".prev-btn",
  },
});

let desktopMap, mobileMap;

function initMap() {
  const desktopMapElement = document.getElementById("googleMap");
  const mobileMapElement = document.getElementById("mobileMap");

  if (desktopMapElement) {
    desktopMap = new google.maps.Map(desktopMapElement, {
      center: { lat: 30.2672, lng: -97.7431 },
      zoom: 10,
    });
  }

  if (mobileMapElement) {
    mobileMap = new google.maps.Map(mobileMapElement, {
      center: { lat: 30.2672, lng: -97.7431 },
      zoom: 10,
    });
  }
}

window.initMap = initMap;

document.addEventListener("DOMContentLoaded", () => {
  const mapBtn = document.querySelector(".map__absolute .fixed__map");
  const mapModal = document.getElementById("mapModal");
  const closeModal = document.querySelector(".close__modal");

  mapBtn?.addEventListener("click", () => {
    if (window.innerWidth <= 440) {
      mapModal.classList.add("show");

      mapModal.style.opacity = 0;
      setTimeout(() => {
        mapModal.style.opacity = 1;

        if (typeof google !== "undefined" && mobileMap) {
          google.maps.event.trigger(mobileMap, "resize");
          mobileMap.setCenter({ lat: 30.2672, lng: -97.7431 });
        }
      }, 300);
    } else {
      mapModal.classList.remove("show");
    }
  });

  closeModal?.addEventListener("click", () => {
    mapModal.classList.remove("show");
  });

  window.addEventListener("click", (e) => {
    if (e.target === mapModal) {
      mapModal.classList.remove("show");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 440 && mapModal.classList.contains("show")) {
      mapModal.classList.remove("show");
    }
  });
});
