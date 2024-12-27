// URL'den müze adını al
const urlParams = new URLSearchParams(window.location.search);
const museumName = urlParams.get('museum');

// API'den müze bilgilerini al
const fetchMuseumInfo = async (museum) => {
    try {
        const response = await fetch(`https://tr.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&explaintext&exlimit=1&titles=${encodeURIComponent(museum)}&format=json&pithumbsize=1000&origin=*`);
        const data = await response.json();
        const page = data.query.pages[Object.keys(data.query.pages)[0]];

        if (page && page.title) {
            document.getElementById('museumTitle').textContent = page.title;
            document.getElementById('museumDescription').textContent = page.extract || 'Açıklama bulunamadı.';
            const museumImage = document.getElementById('museumImage');
            if (page.thumbnail) {
                museumImage.src = page.thumbnail.source; // Resmi orijinal boyutunda al
                museumImage.style.display = 'block'; // Resmi görünür yap
            } else {
                museumImage.style.display = 'none'; // Resim yoksa gizle
            }
        } else {
            document.getElementById('museumTitle').textContent = 'Müze Bulunamadı';
            document.getElementById('museumDescription').textContent = 'Aradığınız müze bulunamadı.';
        }
    } catch (error) {
        console.error("Hata oluştu:", error);
        document.getElementById('museumTitle').textContent = 'Hata';
        document.getElementById('museumDescription').textContent = 'Müze bilgileri yüklenemedi.';
    }
};

// Müze bilgilerini yükle
if (museumName) {
    fetchMuseumInfo(museumName);
} else {
    document.getElementById('museumTitle').textContent = 'Geçersiz Müze Seçimi';
}