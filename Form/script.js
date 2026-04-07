
// Registration Form Logic (index.html)
const fullNameInput = document.getElementById('fullName');
const nameSuggestionsList = document.getElementById('nameSuggestions');

if (fullNameInput && nameSuggestionsList) {
  // Data name recommendations
  const recommendedNames = [
    "GamerX", "ProPlayer99", "ShadowNinja", "DragonSlayer", 
    "CyberPunk", "NoobMaster", "AlphaWolf", "SniperElite",
    "DarkKnight", "NeoMatrix", "GhostRider", "StarLord"
  ];

  fullNameInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    nameSuggestionsList.innerHTML = '';
    
    if (value.length > 0) {
      // Filter recommendations based on input
      const matches = recommendedNames.filter(name => name.toLowerCase().includes(value));
      matches.forEach(match => {
        const option = document.createElement('option');
        option.value = match;
        nameSuggestionsList.appendChild(option);
      });
    }
  });

  document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Account created successfully! Proceeding to payment...');
  });

  // Check URL for postalCode and pre-fill
  const urlParams = new URLSearchParams(window.location.search);
  const codeParam = urlParams.get('postalCode');
  if (codeParam) {
    const postalCodeInput = document.getElementById('postalCode');
    if (postalCodeInput) {
      postalCodeInput.value = codeParam;
    }
  }
}

// Dynamic dropdown & Kodepos API logic (kodepos.html)
const provSelect = document.getElementById('provinsi');
const kabSelect = document.getElementById('kabupaten');
const kecSelect = document.getElementById('kecamatan');
const kelSelect = document.getElementById('kelurahan');
const btnSearch = document.getElementById('btnSearch');
const loader = document.getElementById('searchLoader');
const resultsContainer = document.getElementById('resultsContainer');
const resultsContent = document.getElementById('resultsContent');

const EMSIFA_BASE_URL = 'https://www.emsifa.com/api-wilayah-indonesia/api';

if (provSelect) {
  // Fetch Provinces on Load
  fetch(`${EMSIFA_BASE_URL}/provinces.json`)
    .then(res => res.json())
    .then(data => {
      data.forEach(prov => {
        const option = document.createElement('option');
        option.value = prov.id;
        option.textContent = prov.name;
        provSelect.appendChild(option);
      });
    })
    .catch(err => console.error("Error fetching provinces:", err));

  // Province Change -> Fetch Regencies
  provSelect.addEventListener('change', () => {
    kabSelect.innerHTML = '<option value="">-- Pilih Kota / Kabupaten --</option>';
    kecSelect.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
    kelSelect.innerHTML = '<option value="">-- Pilih Kelurahan / Desa --</option>';
    kabSelect.disabled = true;
    kecSelect.disabled = true;
    kelSelect.disabled = true;
    btnSearch.disabled = true;
    
    if (provSelect.value) {
      fetch(`${EMSIFA_BASE_URL}/regencies/${provSelect.value}.json`)
        .then(res => res.json())
        .then(data => {
          data.forEach(kab => {
            const option = document.createElement('option');
            option.value = kab.id;
            option.textContent = kab.name; 
            kabSelect.appendChild(option);
          });
          kabSelect.disabled = false;
        })
        .catch(err => console.error("Error fetching regencies:", err));
    }
  });

  kabSelect.addEventListener('change', () => {
    kecSelect.innerHTML = '<option value="">-- Pilih Kecamatan --</option>';
    kelSelect.innerHTML = '<option value="">-- Pilih Kelurahan / Desa --</option>';
    kecSelect.disabled = true;
    kelSelect.disabled = true;
    btnSearch.disabled = true;
    
    if (kabSelect.value) {
      fetch(`${EMSIFA_BASE_URL}/districts/${kabSelect.value}.json`)
        .then(res => res.json())
        .then(data => {
          data.forEach(kec => {
            const option = document.createElement('option');
            option.value = kec.id;
            option.textContent = kec.name;
            option.dataset.name = kec.name; 
            kecSelect.appendChild(option);
          });
          kecSelect.disabled = false;
        })
        .catch(err => console.error("Error fetching districts:", err));
    }
  });

  kecSelect.addEventListener('change', () => {
    kelSelect.innerHTML = '<option value="">-- Pilih Kelurahan / Desa --</option>';
    kelSelect.disabled = true;
    btnSearch.disabled = true;
    
    if (kecSelect.value) {
      fetch(`${EMSIFA_BASE_URL}/villages/${kecSelect.value}.json`)
        .then(res => res.json())
        .then(data => {
          data.forEach(kel => {
            const option = document.createElement('option');
            option.value = kel.id;
            option.textContent = kel.name;
            option.dataset.name = kel.name;
            kelSelect.appendChild(option);
          });
          kelSelect.disabled = false;
        })
        .catch(err => console.error("Error fetching villages:", err));
    }
  });

  kelSelect.addEventListener('change', () => {
    if (kelSelect.value) {
      btnSearch.disabled = false;
    } else {
      btnSearch.disabled = true;
    }
  });

  btnSearch.addEventListener('click', () => {
    const selectedOption = kelSelect.options[kelSelect.selectedIndex];
    if (!selectedOption) return;
    
    const query = selectedOption.dataset.name.toLowerCase();

    // UI Loading state
    loader.style.display = 'block';
    resultsContainer.style.display = 'none';
    resultsContent.innerHTML = '';
    btnSearch.disabled = true;

    fetch(`https://kodepos.vercel.app/search/?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(response => {
        loader.style.display = 'none';
        btnSearch.disabled = false;
        resultsContainer.style.display = 'block';

        if (response.code === "OK" && response.data && response.data.length > 0) {
          
          response.data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'result-card';
            card.style.cursor = 'pointer'; 
            card.onclick = () => {
              window.location.href = `index.html?postalCode=${item.code}`;
            };
            card.innerHTML = `
              <div class="result-code">${item.code}</div>
              <div class="result-desc">
                <strong>Kelurahan/Desa:</strong> ${item.village} <br/>
                <strong>Kecamatan:</strong> ${item.district} <br/>
                <strong>Kabupaten/Kota:</strong> ${item.regency} <br/>
                <strong>Provinsi:</strong> ${item.province}
              </div>
            `;
            resultsContent.appendChild(card);
          });

        } else {
          resultsContent.innerHTML = '<p style="color: #ed4245;">Data kode pos tidak ditemukan untuk wilayah ini. Silakan coba kecamatan lain.</p>';
        }
      })
      .catch(err => {
        console.error("Error fetching kodepos:", err);
        loader.style.display = 'none';
        btnSearch.disabled = false;
        resultsContainer.style.display = 'block';
        resultsContent.innerHTML = '<p style="color: #ed4245;">Terjadi kesalahan sistem saat menghubungi API. Coba lagi nanti.</p>';
      });
  });
}

// MAP Logic (index.html)
const btnMap = document.getElementById('btnMap')
const mapContainer = document.getElementById('map')
const addressInput = document.getElementById('address')

let map
let marker

if (btnMap) {
  btnMap.addEventListener('click', () => {
    mapContainer.style.display = 'block'

    if (!map) {
      map = L.map('map').setView([-7.25, 112.75], 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
      }).addTo(map)

      // Ambil lokasi user
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude
          const lng = pos.coords.longitude

          map.setView([lat, lng], 16)
          marker = L.marker([lat, lng]).addTo(map)

          getAddress(lat, lng)
        },
        () => {
          // fallback kalau user nolak
          map.setView([0, 0], 2)
        }
      )

      map.on('click', function (e) {
        const lat = e.latlng.lat
        const lng = e.latlng.lng

        if (marker) {
          map.removeLayer(marker)
        }

        marker = L.marker([lat, lng]).addTo(map)

        getAddress(lat, lng)
      })
    }
  })
}

// Reverse geocoding (koordinat -> alamat)
function getAddress(lat, lng) {
  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
    .then(res => res.json())
    .then(data => {
      addressInput.value = data.display_name
    })
}
