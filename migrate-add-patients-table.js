/**
 * Migration Script: Add Patients Table
 * 
 * This script adds a new `patients` table to store detailed patient information
 * for OBGYN screening protocols.
 * 
 * Run with: node migrate-add-patients-table.js
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Use the same database path as server.js
const dbDir = process.env.DATA_DIR || process.env.DATA_PATH || __dirname;
const dbPath = path.join(dbDir, 'data.db');

console.log('🔧 Starting migration: Add patients table');
console.log('📂 Database path:', dbPath);

// Check if database exists
if (!fs.existsSync(dbPath)) {
  console.error('❌ Error: Database file not found at', dbPath);
  console.error('Please run the server first to create the database.');
  process.exit(1);
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to database');
});

db.serialize(() => {
  // Create patients table
  console.log('\n📋 Creating patients table...');
  
  db.run(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      protocol_code TEXT UNIQUE NOT NULL,
      patient_name TEXT NOT NULL,
      faskes_name TEXT,
      pekerjaan TEXT,
      status_pekerjaan TEXT,
      status_pernikahan TEXT CHECK(status_pernikahan IN ('MENIKAH', 'BELUM MENIKAH', 'CERAI', 'DUDA/JANDA', NULL)),
      alamat TEXT,
      tindakan TEXT,
      gpa_gravida INTEGER,
      gpa_para INTEGER,
      gpa_abortus INTEGER,
      tenaga_kesehatan TEXT CHECK(tenaga_kesehatan IN ('RS', 'BIDAN', 'KLINIK', 'PUSKESMAS', 'LAINNYA', NULL)),
      provinsi TEXT,
      kabupaten TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
      created_by INTEGER,
      FOREIGN KEY (protocol_code) REFERENCES protocols(code) ON DELETE CASCADE,
      FOREIGN KEY (created_by) REFERENCES users(id)
    )
  `, function(err) {
    if (err) {
      if (err.message.includes('already exists')) {
        console.log('⚠️  Table patients already exists, skipping creation');
      } else {
        console.error('❌ Error creating patients table:', err.message);
        db.close();
        process.exit(1);
      }
    } else {
      console.log('✅ Patients table created successfully');
    }
  });

  // Create indexes for better query performance
  console.log('\n📊 Creating indexes...');
  
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_patients_protocol_code 
    ON patients(protocol_code)
  `, (err) => {
    if (err) console.log('⚠️  Index idx_patients_protocol_code:', err.message);
    else console.log('✅ Created index: idx_patients_protocol_code');
  });
  
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_patients_provinsi 
    ON patients(provinsi)
  `, (err) => {
    if (err) console.log('⚠️  Index idx_patients_provinsi:', err.message);
    else console.log('✅ Created index: idx_patients_provinsi');
  });
  
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_patients_kabupaten 
    ON patients(kabupaten)
  `, (err) => {
    if (err) console.log('⚠️  Index idx_patients_kabupaten:', err.message);
    else console.log('✅ Created index: idx_patients_kabupaten');
  });
  
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_patients_faskes 
    ON patients(faskes_name)
  `, (err) => {
    if (err) console.log('⚠️  Index idx_patients_faskes:', err.message);
    else console.log('✅ Created index: idx_patients_faskes');
  });

  // Verify the table was created correctly
  console.log('\n🔍 Verifying table structure...');
  
  db.all("PRAGMA table_info(patients)", (err, columns) => {
    if (err) {
      console.error('❌ Error verifying table:', err.message);
      db.close();
      process.exit(1);
    }
    
    console.log('\n📋 Patients table columns:');
    columns.forEach(col => {
      console.log(`   - ${col.name} (${col.type})${col.pk ? ' PRIMARY KEY' : ''}${col.notnull ? ' NOT NULL' : ''}`);
    });
    
    console.log('\n✅ Migration completed successfully!');
    console.log('🎉 You can now store detailed patient information.');
    console.log('\n💡 Next steps:');
    console.log('   1. Restart your server: npm start');
    console.log('   2. Test the scanner with patient data input');
    console.log('   3. Check the dashboard for new patient information\n');
    
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      }
      process.exit(0);
    });
  });
});

// Handle errors
db.on('error', (err) => {
  console.error('❌ Database error:', err.message);
  process.exit(1);
});
