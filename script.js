// Burçların tarih aralıkları ve özellikleri, uyumlu-uyumsuz burçlar dahil
const burclar = [
  { ad: "Oğlak", bas: [12, 22], bit: [1, 21], ozellik: "Disiplinli, sorumluluk sahibi, sabırlı", ikon: "♑", detay: "Kariyerde hırslı, ilişkilerde ciddi ve sadıktır.", uyumlu: ["Boğa", "Başak", "Balık"], uyumsuz: ["Koç", "Yengeç"] },
  { ad: "Kova", bas: [1, 22], bit: [2, 19], ozellik: "Özgür ruhlu, yenilikçi, insancıl", ikon: "♒", detay: "Sosyal, teknolojiye yatkın, arkadaş canlısıdır.", uyumlu: ["İkizler", "Terazi", "Koç"], uyumsuz: ["Boğa", "Akrep"] },
  { ad: "Balık", bas: [2, 20], bit: [3, 20], ozellik: "Hayalperest, duygusal, sezgisel", ikon: "♓", detay: "Sanata yatkın, romantik, yardımseverdir.", uyumlu: ["Yengeç", "Akrep", "Oğlak"], uyumsuz: ["Aslan", "Kova"] },
  { ad: "Koç", bas: [3, 21], bit: [4, 20], ozellik: "Cesur, enerjik, lider ruhlu", ikon: "♈", detay: "Liderlik vasfı yüksek, doğrudan ve enerjiktir.", uyumlu: ["Aslan", "Yay", "Kova"], uyumsuz: ["Başak", "Balık"] },
  { ad: "Boğa", bas: [4, 21], bit: [5, 21], ozellik: "Sadık, sabırlı, zevk düşkünü", ikon: "♉", detay: "Kararlı, finansal konularda becerikli ve zevk sahibidir.", uyumlu: ["Oğlak", "Başak", "Yengeç"], uyumsuz: ["Kova", "Aslan"] },
  { ad: "İkizler", bas: [5, 22], bit: [6, 22], ozellik: "Zeki, meraklı, iletişimci", ikon: "♊", detay: "Sosyaldir, hızlı düşünür, çok yönlüdür.", uyumlu: ["Kova", "Terazi", "Koç"], uyumsuz: ["Yay", "Balık"] },
  { ad: "Yengeç", bas: [6, 23], bit: [7, 22], ozellik: "Şefkatli, duygusal, koruyucu", ikon: "♋", detay: "Aileye düşkün, içe dönük ama sevgi doludur.", uyumlu: ["Balık", "Boğa", "Akrep"], uyumsuz: ["Koç", "Terazi"] },
  { ad: "Aslan", bas: [7, 23], bit: [8, 22], ozellik: "Kendine güvenen, cömert, yaratıcı", ikon: "♌", detay: "Dikkat çekmeyi sever, yaratıcı ve lider ruhludur.", uyumlu: ["Koç", "Yay", "İkizler"], uyumsuz: ["Boğa", "Balık"] },
  { ad: "Başak", bas: [8, 23], bit: [9, 22], ozellik: "Titiz, çalışkan, analitik", ikon: "♍", detay: "Detaylara önem verir, çalışkandır, analiz yeteneği gelişmiştir.", uyumlu: ["Boğa", "Oğlak", "Yengeç"], uyumsuz: ["Koç", "Yay"] },
  { ad: "Terazi", bas: [9, 23], bit: [10, 22], ozellik: "Adaletli, zarif, uyumlu", ikon: "♎", detay: "Estetik duygusu yüksek, barışçıl ve dengelidir.", uyumlu: ["Kova", "İkizler", "Yay"], uyumsuz: ["Yengeç", "Oğlak"] },
  { ad: "Akrep", bas: [10, 23], bit: [11, 21], ozellik: "Tutkulu, gizemli, kararlı", ikon: "♏", detay: "Duyguları yoğun yaşar, kararlıdır ve gizemlidir.", uyumlu: ["Yengeç", "Balık", "Oğlak"], uyumsuz: ["Kova", "Boğa"] },
  { ad: "Yay", bas: [11, 22], bit: [12, 21], ozellik: "Macera sever, açık fikirli, iyimser", ikon: "♐", detay: "Özgürlüğüne düşkün, keşfetmeyi sever, felsefi bakış açısına sahiptir.", uyumlu: ["Koç", "Aslan", "Terazi"], uyumsuz: ["Başak", "İkizler"] },
];

// Gün ve ayın geçerli olup olmadığını kontrol eden fonksiyon
function gunGecerliMi(gun, ay) {
  const aylar = [31, (new Date().getFullYear() % 4 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return ay >= 1 && ay <= 12 && gun >= 1 && gun <= aylar[ay - 1];
}

// Doğum tarihine göre burcu bulan fonksiyon
function burcBul(gun, ay) {
  for (const b of burclar) {
    if (
      (ay === b.bas[0] && gun >= b.bas[1]) ||
      (ay === b.bit[0] && gun <= b.bit[1]) ||
      (b.bas[0] > b.bit[0] && ( (ay === b.bas[0] && gun >= b.bas[1]) || (ay === b.bit[0] && gun <= b.bit[1]) ))
    ) {
      return b;
    }
  }
  return null;
}

// HTML elementlerini seç
const gunInput = document.getElementById("gun");
const ayInput = document.getElementById("ay");
const erkekRadio = document.getElementById("erkek");
const kadinRadio = document.getElementById("kadin");
const hesaplaBtn = document.getElementById("hesaplaBtn");
const sonucDiv = document.getElementById("sonuc");

// Hesapla butonuna tıklandığında çalışan fonksiyon
hesaplaBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Formun submit olmasını engelle

  const gun = parseInt(gunInput.value);
  const ay = parseInt(ayInput.value);
  const cinsiyet = erkekRadio.checked ? "Erkek" : kadinRadio.checked ? "Kadın" : null;

  if (!gun || !ay || !cinsiyet) {
    sonucDiv.innerHTML = `<p class="error">Lütfen tüm alanları eksiksiz doldurun.</p>`;
    return;
  }

  if (!gunGecerliMi(gun, ay)) {
    sonucDiv.innerHTML = `<p class="error">Geçersiz bir tarih girdiniz.</p>`;
    return;
  }

  const burc = burcBul(gun, ay);

  if (burc) {
    // Burç için günlük yorumları isteğe bağlı olarak ekleyebilirsin
    const burcYorumlari = {
      "Koç": "Bugün enerjiniz yüksek, yeni başlangıçlar için ideal.",
      "Boğa": "Sabırlı olmanız gereken bir gün.",
      "İkizler": "İletişim becerileriniz ön planda.",
      "Yengeç": "Duygusal bağlar güçleniyor.",
      "Aslan": "Kendinizi ifade etmekten çekinmeyin.",
      "Başak": "Detaylara dikkat etmelisiniz.",
      "Terazi": "Dengeyi bulmak önemli.",
      "Akrep": "Tutkunuz size güç katacak.",
      "Yay": "Yeni maceralara açık olun.",
      "Oğlak": "Disiplinli yaklaşımınız ödüllendirilecek.",
      "Kova": "Yenilikçi fikirler peşindesiniz.",
      "Balık": "Sezgileriniz sizi doğru yönlendirecek."
    };
    const yorum = burcYorumlari[burc.ad] || "";

    const uyumluBurclar = burc.uyumlu.map(b => `<li>${b}</li>`).join("");
    const uyumsuzBurclar = burc.uyumsuz.map(b => `<li>${b}</li>`).join("");

    sonucDiv.innerHTML = `
      <div class="burc-karti">
        <h3>${burc.ikon} ${burc.ad} Burcu</h3>
        <p><strong>Doğum Tarihi:</strong> ${gun}.${ay}</p>
        <p><strong>Cinsiyet:</strong> ${cinsiyet}</p>
        <p><strong>Özellikler:</strong> ${burc.ozellik}</p>
        <p><strong>Detay:</strong> ${burc.detay}</p>
        <p><strong>Günlük Yorum:</strong> ${yorum}</p>
        <p><strong>Uyumlu Burçlar:</strong></p>
        <ul>${uyumluBurclar}</ul>
        <p><strong>Uyumsuz Burçlar:</strong></p>
        <ul>${uyumsuzBurclar}</ul>
      </div>
    `;
  } else {
    sonucDiv.innerHTML = `<p class="error">Burç bulunamadı. Lütfen geçerli bir tarih giriniz.</p>`;
  }
});




// Karanlık mod toggle butonunu seç
const darkModeToggle = document.getElementById("darkModeToggle");

// Karanlık modu aç/kapat ve tercihi localStorage'a kaydet
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Sayfa yüklendiğinde localStorage'dan temayı oku ve uygula
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
});

// Butona tıklanınca karanlık modu aç/kapat
darkModeToggle.addEventListener("click", toggleDarkMode);


