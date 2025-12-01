<<<<<<< HEAD
#!/bin/bash
# Script untuk membuka firewall agar website bisa diakses publik
# Jalankan di VPS: sudo bash fix-firewall.sh

echo "========================================="
echo "🔥 FIXING FIREWALL FOR PUBLIC ACCESS"
echo "========================================="
echo ""

echo "1️⃣ Enabling UFW if not enabled..."
sudo ufw --force enable
echo ""

echo "2️⃣ Opening HTTP Port 80..."
sudo ufw allow 80/tcp
echo "✅ Port 80 opened"
echo ""

echo "3️⃣ Opening HTTPS Port 443..."
sudo ufw allow 443/tcp
echo "✅ Port 443 opened"
echo ""

echo "4️⃣ Opening SSH Port 22 (just to be safe)..."
sudo ufw allow 22/tcp
echo "✅ Port 22 opened"
echo ""

echo "5️⃣ Reloading UFW..."
sudo ufw reload
echo ""

echo "6️⃣ Current UFW Status:"
sudo ufw status verbose
echo ""

echo "========================================="
echo "✅ FIREWALL CONFIGURED!"
echo "========================================="
echo ""
echo "🌍 Your website should now be accessible from anywhere!"
echo ""
echo "Test from external device:"
echo "  https://ubt-medtech.online"
echo ""
echo "If still not working, run: bash diagnose-access.sh"
echo ""
=======
#!/bin/bash
# Script untuk membuka firewall agar website bisa diakses publik
# Jalankan di VPS: sudo bash fix-firewall.sh

echo "========================================="
echo "🔥 FIXING FIREWALL FOR PUBLIC ACCESS"
echo "========================================="
echo ""

echo "1️⃣ Enabling UFW if not enabled..."
sudo ufw --force enable
echo ""

echo "2️⃣ Opening HTTP Port 80..."
sudo ufw allow 80/tcp
echo "✅ Port 80 opened"
echo ""

echo "3️⃣ Opening HTTPS Port 443..."
sudo ufw allow 443/tcp
echo "✅ Port 443 opened"
echo ""

echo "4️⃣ Opening SSH Port 22 (just to be safe)..."
sudo ufw allow 22/tcp
echo "✅ Port 22 opened"
echo ""

echo "5️⃣ Reloading UFW..."
sudo ufw reload
echo ""

echo "6️⃣ Current UFW Status:"
sudo ufw status verbose
echo ""

echo "========================================="
echo "✅ FIREWALL CONFIGURED!"
echo "========================================="
echo ""
echo "🌍 Your website should now be accessible from anywhere!"
echo ""
echo "Test from external device:"
echo "  https://ubt-medtech.online"
echo ""
echo "If still not working, run: bash diagnose-access.sh"
echo ""
>>>>>>> 8b1d74ab4ddbaa865b57b56a91a92550b54fa6f4
