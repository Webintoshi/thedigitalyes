# Dinamik "Save the Date" Sayfası ve Slug Yapısı

Haklısınız, yüzlerce çift için her birine özel, dinamik bir yapı kurmamız gerekiyor. Bu sayede her çiftin kendine ait bir linki (`URL`) olacak ve misafirler bu linke tıkladığında o çifte ait bilgileri görüp takvimlerine ekleyebilecekler.

## 1. URL (Slug) Yapısı
Sayfalar dinamik olarak oluşturulacak. Önerilen yapı:
`siteadi.com/save-the-date/[ozel-link-adresi]`

Örnekler:
*   `/save-the-date/ayse-ve-ahmet`
*   `/save-the-date/kerem-asli-2024`

Bu yapı Next.js'in **Dynamic Routing** özelliği ile (`app/save-the-date/[slug]/page.tsx`) sağlanacak.

## 2. Veri Yönetimi ve Takvim Entegrasyonu
Her sayfa yüklendiğinde, sistem URL'deki "slug" bilgisini okuyacak ve o çifte ait verileri (İsimler, Tarih, Mekan, Mesaj) getirecektir.

**Takvime Ekleme Nasıl Çalışacak?**
Sayfa üzerindeki butonlar, o an görüntülenen çiftin verilerine göre **otomatik ve dinamik** olarak link üretecek:
*   **Google Takvim:** Linke tıklandığında Google Takvim açılacak ve "Ayşe & Ahmet Düğünü", "20.05.2025", "Çırağan Sarayı" gibi bilgiler otomatik dolu gelecek.
*   **Apple/Outlook (ICS):** Sistem, çiftin bilgilerini içeren anlık bir `.ics` dosyası oluşturup indirecek.

## 3. Uygulama Adımları
1.  **Dinamik Rota Oluşturma:** `app/save-the-date/[slug]/page.tsx` dosyasını oluşturacağım.
2.  **Örnek Veri Simülasyonu:** Şu an bir veritabanımız olmadığı için, sistemin çalışmasını göstermek adına 3-4 farklı çiftin verisini içeren bir "Mock Data" (Sahte Veri) yapısı kuracağım.
    *   `demo-cift` -> Ayşe & Ahmet
    *   `ornek-dugun` -> Zeynep & Can
3.  **Takvim Yardımcı Fonksiyonları:** Verilen bilgilere göre Google ve ICS linklerini üreten akıllı bir fonksiyon yazacağım.
4.  **Arayüz:** Daha önce konuştuğumuz "Kazı Kazan" (Altın Kalp) tasarımı, bu dinamik verilerle birleşecek.

Bu yapı sayesinde sınırsız sayıda çift için tek bir tasarım şablonu üzerinden, kişiselleştirilmiş sayfalar sunabileceksiniz. Onaylarsanız bu dinamik yapıyı kurmaya başlıyorum.