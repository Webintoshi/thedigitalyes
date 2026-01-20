# Supabase + Prisma Kurulum Planı

## Adım 1: Supabase Proje Oluşturma
- Supabase hesabında yeni proje oluştur
- PostgreSQL URL'i kopyala
- Anon key ve Service Role key'leri al

## Adım 2: Environment Variables Kurulumu
- `.env` dosyası oluştur
- Supabase URL ve key'leri ekle
- DATABASE_URL = PostgreSQL connection string

## Adım 3: Dependencies Yükleme
```bash
npm install @supabase/supabase-js @prisma/client prisma
npm install -D prisma
```

## Adım 4: Prisma Kurulumu
- `prisma/schema.prisma` dosyası oluştur
- User, Invitation, Guest, Gallery modellerini tanımla
- `npx prisma migrate dev --name init` komutunu çalıştır

## Adım 5: Supabase Client Helper
- `lib/supabase.ts` dosyası oluştur
- Supabase client'ı kur
- Helper fonksiyonları ekle (auth, database)

## Adım 6: API Routes Kurulumu
- `/app/api/auth/login/route.ts` - Login
- `/app/api/auth/register/route.ts` - Register
- `/app/api/invitations/route.ts` - CRUD işlemleri
- `/app/api/guests/route.ts` - Konuk yönetimi

## Adım 7: Admin Paneli Sayfaları
- `/app/admin/page.tsx` - Ana dashboard
- `/app/admin/invitations/page.tsx` - Davetiye listesi
- `/app/admin/invitations/[id]/page.tsx` - Davetiye detay
- `/app/admin/guests/page.tsx` - Konuk yönetimi

Bu planı onaylarsanız Supabase ve Prisma kurulumuna başlayabiliriz.