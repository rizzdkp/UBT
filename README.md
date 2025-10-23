# 🏥 UBT Distribution Tracker - Barcode Management System

Sistem manajemen distribusi **Uterine Balloon Tamponade (UBT)** menggunakan barcode untuk tracking dan monitoring distribusi alat medis ke rumah sakit. Aplikasi ini membantu memantau status distribusi UBT untuk penanganan perdarahan postpartum.

## ✨ Features

- 🏥 **UBT Distribution Management** - Tracking distribusi UBT ke rumah sakit
- 🔐 **Authentication System** - Login admin dengan JWT & session
- 📊 **Dashboard Analytics** - Monitoring distribusi, status penggunaan, dan statistik
- 📷 **Mobile Scanner** - Scan barcode UBT dengan kamera HP untuk update status
- 🔄 **Real-time Updates** - Socket.io untuk live tracking distribusi
- 📈 **Status Tracking** - Created → Delivered → Terpakai (digunakan untuk pasien)
- 📱 **PWA Support** - Install sebagai app di mobile untuk akses cepat
- 🎨 **Responsive Design** - Optimized untuk mobile, tablet, dan desktop
- 🔒 **Security Features** - Rate limiting, input validation, CSRF protection
- 📋 **Activity Logs** - Audit trail lengkap untuk setiap perubahan status

## 🚀 Quick Start (Local)

**Prerequisites:** Node.js v18+ installed

```powershell
# Install dependencies
npm install

# Start server
npm start
```

Buka **http://localhost:8080** dan login dengan:
- **Username:** admin
- **Password:** admin

## 📦 Deployment

### Render.com (Recommended - FREE)

Lihat panduan lengkap di **[RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)**

**Quick Steps:**
1. Push code ke GitHub
2. Connect repository di Render.com
3. Deploy otomatis - dapat URL HTTPS gratis
4. ✅ SQLite, Socket.io, dan Camera access semua bekerja

### Railway / Heroku

File konfigurasi tersedia:
- `render.yaml` - Render configuration
- `Procfile` - Railway/Heroku configuration

## 🗂️ Project Structure

```
├── server.js              # Main Express server
├── data.db               # SQLite database
├── package.json          # Dependencies
├── public/              
│   ├── styles.css        # Main stylesheet
│   ├── scanner.css       # Scanner page styles
│   ├── mobile-responsive.css  # Mobile optimizations
│   ├── manifest.json     # PWA manifest
│   ├── sw.js            # Service Worker
│   └── icons/           # PWA icons
└── views/               # EJS templates
    ├── login.ejs        # Login page
    ├── dashboard.ejs    # Admin dashboard
    ├── scanner.ejs      # Barcode scanner
    └── users.ejs        # User management
```

## 🔧 Configuration

**Environment Variables:**
```env
PORT=8080
JWT_SECRET=your-secret-key
NODE_ENV=production
```

**Default Admin:**
- Username: `admin`
- Password: `admin` 
- ⚠️ Ubah password setelah deployment!

## 📱 Mobile Features

- **Responsive Design** - Breakpoints untuk 320px, 480px, 768px, 1024px
- **Touch Optimized** - 48x48px touch targets, smooth scrolling
- **PWA** - Offline support, install to home screen
- **Camera Access** - Scan barcode via mobile camera (butuh HTTPS)

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** SQLite3
- **Auth:** JWT, bcrypt, express-session
- **Real-time:** Socket.io
- **Templating:** EJS
- **Barcode:** bwip-js
- **Charts:** Chart.js

## 🔒 Security

- Rate limiting (100 req/15min)
- Password hashing with bcrypt
- JWT token validation
- Input sanitization with validator.js
- Session management
- CSRF protection ready

## 📄 License

ISC

## 🆘 Support

Lihat file dokumentasi:
- **[RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)** - Deploy guide
- Atau buka issue di GitHub repository
