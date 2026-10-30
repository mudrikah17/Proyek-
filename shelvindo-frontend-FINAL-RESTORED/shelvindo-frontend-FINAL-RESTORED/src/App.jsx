import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AppShell from './layouts/AppShell'

const AUTH_KEY = 'shelvindo_demo_auth'

function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(() => localStorage.getItem(AUTH_KEY) === 'true')
  if (!auth) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return children
}

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@shelvindo.test')
  const [password, setPassword] = useState('demo123')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!email || !password) {
      setError('Email dan password wajib diisi.')
      return
    }
    if (password.length < 4) {
      setError('Password demo minimal 4 karakter.')
      return
    }
    localStorage.setItem(AUTH_KEY, 'true')
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="auth-page">
      <div className="auth-decoration">
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="auth-brand">
          <div className="brand-mark">S</div>
          <div><strong>Shelvindo</strong><span>Business Suite</span></div>
        </div>
        <div className="auth-message">
          <span className="eyebrow">Business workspace</span>
          <h1>Kelola bisnis dengan lebih tenang.</h1>
          <p>Satu workspace untuk penjualan, keuangan, persediaan, dan operasional.</p>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-form-wrap">
          <span className="eyebrow">Welcome back</span>
          <h2>Masuk ke Shelvindo</h2>
          <p className="auth-subtitle">Gunakan akun demo untuk melihat workspace.</p>

          <form onSubmit={submit} className="auth-form">
            <label>Email / Username
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="nama@perusahaan.com" autoComplete="username" />
            </label>
            <label>Password
              <div className="password-field">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
                <button type="button" onClick={() => setShowPassword(v => !v)}>{showPassword ? 'Sembunyikan' : 'Lihat'}</button>
              </div>
            </label>
            {error && <div className="auth-error">{error}</div>}
            <div className="auth-row">
              <span className="remember"><input type="checkbox" defaultChecked /> Ingat saya</span>
              <button type="button" className="link-button" onClick={() => navigate('/forgot-password')}>Lupa kata sandi?</button>
            </div>
            <button className="button button-primary auth-submit">Masuk</button>
          </form>

          <div className="demo-note">
            <strong>Demo access</strong>
            <span>admin@shelvindo.test · demo123</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function submit(e) {
    e.preventDefault()
    if (email.trim()) setSent(true)
  }

  return (
    <div className="auth-page auth-simple">
      <div className="auth-panel">
        <div className="auth-form-wrap">
          <button className="back-link" onClick={() => navigate('/login')}>← Kembali ke login</button>
          <span className="eyebrow">Account recovery</span>
          <h2>Lupa kata sandi?</h2>
          <p className="auth-subtitle">Masukkan email untuk simulasi pengiriman tautan reset.</p>
          {!sent ? (
            <form onSubmit={submit} className="auth-form">
              <label>Email
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="nama@perusahaan.com" type="email" required />
              </label>
              <button className="button button-primary auth-submit">Kirim tautan reset</button>
            </form>
          ) : (
            <div className="success-card">
              <div className="success-icon">✓</div>
              <strong>Tautan reset siap</strong>
              <p>Simulasi berhasil. Tidak ada email sungguhan yang dikirim.</p>
              <button className="button button-primary" onClick={() => navigate('/reset-password')}>Lanjut reset password</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ResetPasswordPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  function submit(e) {
    e.preventDefault()
    if (password.length < 6) return setError('Password minimal 6 karakter.')
    if (password !== confirm) return setError('Konfirmasi password belum sama.')
    setError('')
    setDone(true)
  }

  return (
    <div className="auth-page auth-simple">
      <div className="auth-panel">
        <div className="auth-form-wrap">
          <span className="eyebrow">Set new password</span>
          <h2>Buat password baru</h2>
          {!done ? (
            <form onSubmit={submit} className="auth-form">
              <label>Password baru
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </label>
              <label>Konfirmasi password
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} />
              </label>
              {error && <div className="auth-error">{error}</div>}
              <button className="button button-primary auth-submit">Simpan password</button>
            </form>
          ) : (
            <div className="success-card">
              <div className="success-icon">✓</div>
              <strong>Password berhasil diperbarui</strong>
              <p>Flow reset password selesai dalam mode frontend demo.</p>
              <button className="button button-primary" onClick={() => navigate('/login')}>Kembali ke login</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function LogoutWatcher() {
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/login') return
  }, [location.pathname])
  return null
}

function Placeholder({ title, description }) {
  return <div className="page-content"><div className="page-header"><div><span className="eyebrow">SHELvindo workspace</span><h1>{title}</h1><p>{description}</p></div></div><section className="placeholder-card"><div className="placeholder-icon">✦</div><h2>Foundation ready</h2><p>Modul ini akan diimplementasikan pada milestone berikutnya sesuai SOT.</p></section></div>
}


const productSeed = [
  { id: 'PRD-001', sku: 'SKU-001', name: 'Kertas A4 80gsm', category: 'Office Supply', unit: 'Rim', sell: 68000, buy: 59000, stock: 42, min: 10, status: 'Active' },
  { id: 'PRD-002', sku: 'SKU-002', name: 'Tinta Printer Black', category: 'Printer Supply', unit: 'Pcs', sell: 125000, buy: 108000, stock: 8, min: 12, status: 'Low Stock' },
  { id: 'PRD-003', sku: 'SKU-003', name: 'Toner LaserJet 85A', category: 'Printer Supply', unit: 'Pcs', sell: 485000, buy: 420000, stock: 18, min: 6, status: 'Active' },
  { id: 'PRD-004', sku: 'SKU-004', name: 'Map Plastik A4', category: 'Office Supply', unit: 'Pack', sell: 45000, buy: 37000, stock: 31, min: 8, status: 'Active' },
  { id: 'PRD-005', sku: 'SKU-005', name: 'Label Sticker 100x50', category: 'Packaging', unit: 'Roll', sell: 32000, buy: 26000, stock: 5, min: 10, status: 'Low Stock' },
]

const customerSeed = [
  { id: 'CUS-001', code: 'CUS-001', name: 'CV Sinar Abadi', contact: '0812 3456 7890', email: 'procurement@sinarabadi.test', city: 'Bogor', transactions: 24, value: 128400000, receivable: 12450000, status: 'Active' },
  { id: 'CUS-002', code: 'CUS-002', name: 'PT Maju Jaya', contact: '0813 4567 8901', email: 'finance@majujaya.test', city: 'Jakarta', transactions: 18, value: 94200000, receivable: 8750000, status: 'Active' },
  { id: 'CUS-003', code: 'CUS-003', name: 'Toko Berkah', contact: '0821 2222 3333', email: 'owner@tokoberkah.test', city: 'Depok', transactions: 12, value: 56400000, receivable: 5280000, status: 'Active' },
  { id: 'CUS-004', code: 'CUS-004', name: 'PT Nusantara Makmur', contact: '0819 7777 8888', email: 'ap@nusantaramakmur.test', city: 'Bekasi', transactions: 9, value: 38750000, receivable: 17200000, status: 'Inactive' },
]

const money = value => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)

function MasterDataPage({ type = 'products' }) {
  const isProducts = type === 'products'
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [modal, setModal] = useState(false)
  const [selected, setSelected] = useState(null)

  const rows = isProducts ? productSeed : customerSeed
  const filtered = rows.filter(row => {
    const haystack = Object.values(row).join(' ').toLowerCase()
    return haystack.includes(query.toLowerCase()) && (status === 'All' || row.status === status)
  })

  const openDetail = row => { setSelected(row); setModal(true) }

  return (
    <div className="page-content">
      <div className="page-header master-header">
        <div>
          <span className="eyebrow">Master Data</span>
          <h1>{isProducts ? 'Produk' : 'Pelanggan'}</h1>
          <p>{isProducts ? 'Kelola katalog, harga, dan ketersediaan produk.' : 'Kelola data pelanggan dan ringkasan transaksi.'}</p>
        </div>
        <button className="button button-primary" onClick={() => { setSelected(null); setModal(true) }}>
          + {isProducts ? 'Tambah Produk' : 'Tambah Pelanggan'}
        </button>
      </div>

      <div className="master-tabs">
        <a className={isProducts ? 'active' : ''} href="/products">Produk <span>{productSeed.length}</span></a>
        <a className={!isProducts ? 'active' : ''} href="/customers">Pelanggan <span>{customerSeed.length}</span></a>
      </div>

      <section className="panel master-panel">
        <div className="toolbar">
          <div className="search-field"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder={`Cari ${isProducts ? 'nama, SKU, kategori' : 'nama, kode, email'}...`} /></div>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option>All</option>
            <option>Active</option>
            <option>{isProducts ? 'Low Stock' : 'Inactive'}</option>
          </select>
          <button className="button button-ghost">Filter</button>
        </div>

        <div className="table-meta"><span>Menampilkan <strong>{filtered.length}</strong> dari {rows.length} data</span><span>Dummy data · local</span></div>
        <div className="table-wrap">
          {isProducts ? (
            <table>
              <thead><tr><th>Produk</th><th>SKU</th><th>Kategori</th><th>Harga Jual</th><th>Harga Beli</th><th>Stok</th><th>Status</th><th /></tr></thead>
              <tbody>{filtered.map(row => (
                <tr key={row.id}>
                  <td><strong className="table-primary">{row.name}</strong><small className="table-secondary">{row.unit}</small></td>
                  <td>{row.sku}</td><td>{row.category}</td><td>{money(row.sell)}</td><td>{money(row.buy)}</td>
                  <td><span className={row.stock <= row.min ? 'stock-low' : 'stock-ok'}>{row.stock} {row.unit}</span></td>
                  <td><span className={`badge ${row.status === 'Active' ? 'badge-paid' : 'badge-unpaid'}`}>{row.status}</span></td>
                  <td><button className="row-action" onClick={() => openDetail(row)}>Detail</button></td>
                </tr>
              ))}</tbody>
            </table>
          ) : (
            <table>
              <thead><tr><th>Pelanggan</th><th>Kode</th><th>Kontak</th><th>Transaksi</th><th>Total Nilai</th><th>Piutang</th><th>Status</th><th /></tr></thead>
              <tbody>{filtered.map(row => (
                <tr key={row.id}>
                  <td><strong className="table-primary">{row.name}</strong><small className="table-secondary">{row.city} · {row.email}</small></td>
                  <td>{row.code}</td><td>{row.contact}</td><td>{row.transactions}</td><td>{money(row.value)}</td><td>{money(row.receivable)}</td>
                  <td><span className={`badge ${row.status === 'Active' ? 'badge-paid' : 'badge-unpaid'}`}>{row.status}</span></td>
                  <td><button className="row-action" onClick={() => openDetail(row)}>Detail</button></td>
                </tr>
              ))}</tbody>
            </table>
          )}
        </div>
        {filtered.length === 0 && <div className="empty-state"><strong>Tidak ada data ditemukan</strong><span>Coba ubah kata kunci atau filter.</span></div>}
      </section>

      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><div><span className="eyebrow">{selected ? 'Detail' : 'Create'}</span><h2>{selected ? selected.name : `Tambah ${isProducts ? 'Produk' : 'Pelanggan'}`}</h2></div><button className="close-button" onClick={() => setModal(false)}>×</button></div>
            {selected ? (
              <div className="detail-grid">
                {Object.entries(selected).filter(([key]) => key !== 'id').map(([key, value]) => <div key={key}><small>{key}</small><strong>{typeof value === 'number' && (key === 'sell' || key === 'buy' || key === 'value' || key === 'receivable') ? money(value) : String(value)}</strong></div>)}
              </div>
            ) : (
              <div className="form-grid">
                <label>Nama<input placeholder={isProducts ? 'Nama produk' : 'Nama pelanggan'} /></label>
                <label>{isProducts ? 'SKU' : 'Kode'}<input placeholder={isProducts ? 'SKU-XXX' : 'CUS-XXX'} /></label>
                <label>{isProducts ? 'Kategori' : 'Email'}<input placeholder={isProducts ? 'Kategori produk' : 'email@perusahaan.com'} /></label>
                <label>{isProducts ? 'Harga Jual' : 'Kontak'}<input placeholder={isProducts ? 'Rp 0' : '08xx xxxx xxxx'} /></label>
                <label className="full">{isProducts ? 'Catatan' : 'Alamat'}<textarea placeholder={isProducts ? 'Catatan produk' : 'Alamat pelanggan'} /></label>
              </div>
            )}
            <div className="modal-footer"><button className="button button-ghost" onClick={() => setModal(false)}>Tutup</button>{!selected && <button className="button button-primary" onClick={() => setModal(false)}>Simpan (Demo)</button>}</div>
          </div>
        </div>
      )}
    </div>
  )
}


const salesProducts = [
  { id:'PRD-001', name:'Kertas A4 80gsm', sku:'SKU-001', price:68000, stock:42, unit:'Rim' },
  { id:'PRD-002', name:'Tinta Printer Black', sku:'SKU-002', price:125000, stock:8, unit:'Pcs' },
  { id:'PRD-003', name:'Toner LaserJet 85A', sku:'SKU-003', price:485000, stock:18, unit:'Pcs' },
  { id:'PRD-004', name:'Map Plastik A4', sku:'SKU-004', price:45000, stock:31, unit:'Pack' },
]
const salesCustomers = ['CV Sinar Abadi','PT Maju Jaya','Toko Berkah','PT Nusantara Makmur']


const purchaseSuppliers = ['PT Sumber Kertas Indonesia','CV Mitra Office','PT Indo Supply'];
const purchaseProducts = [
  { id:'PRD-001', name:'Kertas A4 80gsm', price:58000, stock:42, unit:'Rim' },
  { id:'PRD-002', name:'Tinta Printer Black', price:105000, stock:8, unit:'Pcs' },
  { id:'PRD-003', name:'Toner LaserJet 85A', price:410000, stock:18, unit:'Pcs' },
  { id:'PRD-004', name:'Map Plastik A4', price:35000, stock:31, unit:'Pack' },
]


const financeAccounts = [
  { id:'ACC-001', name:'Kas Operasional', type:'Cash', balance:18500000 },
  { id:'ACC-002', name:'Bank BCA', type:'Bank', balance:126450000 },
  { id:'ACC-003', name:'Bank Mandiri', type:'Bank', balance:74350000 },
]
const financeTransactions = [
  { id:'TRX-001', date:'23 Okt 2026', description:'Pembayaran Invoice INV-26001', account:'Bank BCA', type:'Income', amount:12450000, category:'Sales' },
  { id:'TRX-002', date:'22 Okt 2026', description:'Pembayaran Supplier PUR-26001', account:'Bank Mandiri', type:'Expense', amount:10800000, category:'Purchase' },
  { id:'TRX-003', date:'21 Okt 2026', description:'Biaya listrik kantor', account:'Kas Operasional', type:'Expense', amount:2850000, category:'Operational' },
  { id:'TRX-004', date:'20 Okt 2026', description:'Pembayaran Invoice INV-25984', account:'Bank BCA', type:'Income', amount:8750000, category:'Sales' },
]
const expenseSeed = [
  { id:'EXP-001', no:'EXP-26001', date:'23 Okt 2026', category:'Utilities', description:'Listrik & internet kantor', account:'Kas Operasional', amount:2850000, status:'Paid' },
  { id:'EXP-002', no:'EXP-26002', date:'21 Okt 2026', category:'Transport', description:'Pengiriman dokumen', account:'Kas Operasional', amount:725000, status:'Approved' },
  { id:'EXP-003', no:'EXP-26003', date:'19 Okt 2026', category:'Office', description:'Perlengkapan kantor', account:'Bank BCA', amount:1350000, status:'Submitted' },
  { id:'EXP-004', no:'EXP-26004', date:'16 Okt 2026', category:'Maintenance', description:'Perawatan printer', account:'Bank Mandiri', amount:2100000, status:'Draft' },
]


const inventorySeed = [
  { id:'INV-001', sku:'SKU-001', product:'Kertas A4 80gsm', category:'Office Supply', unit:'Rim', stock:42, min:20, value:2436000 },
  { id:'INV-002', sku:'SKU-002', product:'Tinta Printer Black', category:'Printer Supply', unit:'Pcs', stock:8, min:10, value:1000000 },
  { id:'INV-003', sku:'SKU-003', product:'Toner LaserJet 85A', category:'Printer Supply', unit:'Pcs', stock:18, min:8, value:7380000 },
  { id:'INV-004', sku:'SKU-004', product:'Map Plastik A4', category:'Office Supply', unit:'Pack', stock:31, min:12, value:1085000 },
]
const stockMovements = [
  { id:'MOV-001', date:'23 Okt 2026', type:'In', ref:'PUR-26001', product:'Kertas A4 80gsm', qty:50, note:'Penerimaan pembelian' },
  { id:'MOV-002', date:'23 Okt 2026', type:'Out', ref:'INV-26001', product:'Kertas A4 80gsm', qty:18, note:'Penjualan' },
  { id:'MOV-003', date:'22 Okt 2026', type:'Out', ref:'INV-26002', product:'Tinta Printer Black', qty:5, note:'Penjualan' },
  { id:'MOV-004', date:'21 Okt 2026', type:'In', ref:'PUR-26003', product:'Toner LaserJet 85A', qty:10, note:'Penerimaan pembelian' },
  { id:'MOV-005', date:'20 Okt 2026', type:'Adjustment', ref:'ADJ-26001', product:'Map Plastik A4', qty:-2, note:'Penyesuaian stok' },
]


const reportSales = [
  { no:'INV-26001', date:'23 Okt 2026', customer:'CV Sinar Abadi', amount:12450000, status:'Paid' },
  { no:'INV-26002', date:'23 Okt 2026', customer:'PT Maju Jaya', amount:8750000, status:'Unpaid' },
  { no:'INV-26003', date:'22 Okt 2026', customer:'Toko Berkah', amount:5280000, status:'Partial' },
  { no:'INV-26004', date:'20 Okt 2026', customer:'PT Nusantara Makmur', amount:17200000, status:'Overdue' },
]
const reportCustomers = [
  { code:'CUS-001', name:'CV Sinar Abadi', transactions:12, total:38500000, paid:30000000, receivable:8500000 },
  { code:'CUS-002', name:'PT Maju Jaya', transactions:8, total:27250000, paid:18500000, receivable:8750000 },
  { code:'CUS-003', name:'Toko Berkah', transactions:6, total:15400000, paid:10120000, receivable:5280000 },
  { code:'CUS-004', name:'PT Nusantara Makmur', transactions:5, total:24600000, paid:7400000, receivable:17200000 },
]
const reportFinancial = [
  { label:'Penjualan', value:128400000, type:'income' },
  { label:'Pembelian', value:74800000, type:'expense' },
  { label:'Biaya Operasional', value:15900000, type:'expense' },
  { label:'Laba Operasional', value:37700000, type:'income' },
]
const reportReceivables = [
  { customer:'CV Sinar Abadi', invoice:'INV-26001', due:'22 Nov 2026', total:12450000, outstanding:0, status:'Paid' },
  { customer:'PT Maju Jaya', invoice:'INV-26002', due:'22 Nov 2026', total:8750000, outstanding:8750000, status:'Unpaid' },
  { customer:'Toko Berkah', invoice:'INV-26003', due:'21 Nov 2026', total:5280000, outstanding:2640000, status:'Partial' },
  { customer:'PT Nusantara Makmur', invoice:'INV-26004', due:'19 Okt 2026', total:17200000, outstanding:17200000, status:'Overdue' },
]
const reportPayables = [
  { supplier:'PT Sumber Kertas Indonesia', purchase:'PUR-26001', due:'22 Nov 2026', total:10800000, outstanding:0, status:'Paid' },
  { supplier:'CV Mitra Office', purchase:'PUR-26002', due:'21 Nov 2026', total:6425000, outstanding:6425000, status:'Unpaid' },
  { supplier:'PT Indo Supply', purchase:'PUR-26003', due:'19 Nov 2026', total:15200000, outstanding:7600000, status:'Partial' },
]
const reportInventory = [
  { sku:'SKU-001', product:'Kertas A4 80gsm', stock:42, value:2436000, movement:32 },
  { sku:'SKU-002', product:'Tinta Printer Black', stock:8, value:1000000, movement:12 },
  { sku:'SKU-003', product:'Toner LaserJet 85A', stock:18, value:7380000, movement:14 },
  { sku:'SKU-004', product:'Map Plastik A4', stock:31, value:1085000, movement:8 },
]


function SettingsPage({section='overview'}) {
  if(section==='company') return <CompanySettings />
  if(section==='users') return <UserSettings />
  if(section==='invoice') return <InvoiceSettings />
  if(section==='integrations') return <IntegrationSettings />
  if(section==='appearance') return <AppearanceSettings />
  return <SettingsOverview />
}

function SettingsOverview() {
  const cards = [
    ['company','Company Profile','Identitas, alamat, kontak, dan informasi perusahaan.'],
    ['users','Users & Roles','Kelola user, role, dan akses aplikasi.'],
    ['invoice','Invoice Settings','Penomoran invoice dan termin pembayaran.'],
    ['integrations','Integrations','Konsep koneksi layanan eksternal.'],
    ['appearance','Appearance','Preferensi tampilan aplikasi.'],
  ]
  return <div className="page-content">
    <div className="page-header sales-header"><div><span className="eyebrow">Settings</span><h1>Pengaturan</h1><p>Kelola konfigurasi dasar aplikasi Shelvindo.</p></div></div>
    <div className="settings-grid">{cards.map(c=><a className="settings-card" href={`/settings/${c[0]}`} key={c[0]}><span className="settings-icon">S</span><div><strong>{c[1]}</strong><p>{c[2]}</p></div><span className="settings-arrow">→</span></a>)}</div>
  </div>
}

function SettingShell({eyebrow,title,description,children,save=true}) {
  return <div className="page-content"><div className="page-header sales-header"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{save&&<button className="button button-primary">Simpan Perubahan</button>}</div><section className="panel settings-panel">{children}</section></div>
}

function CompanySettings() {
  return <SettingShell eyebrow="Settings · Company" title="Company Profile" description="Informasi identitas perusahaan yang digunakan di aplikasi dan dokumen transaksi."><div className="settings-form"><label>Nama Perusahaan<input defaultValue="PT. Shelvindo Kurnia Cemerlang" /></label><label>Kode Perusahaan<input defaultValue="SHELVINDO" /></label><label>Email<input defaultValue="finance@shelvindo.test" /></label><label>Telepon<input defaultValue="+62 21 555 0123" /></label><label className="full">Alamat<textarea defaultValue="Jl. Contoh No. 123, Jakarta, Indonesia" /></label><label>NPWP<input defaultValue="00.000.000.0-000.000" /></label><label>Website<input defaultValue="www.shelvindo.test" /></label></div></SettingShell>
}
function UserSettings() {
  const users=[['ADM-001','Admin Shelvindo','admin@shelvindo.test','Admin','Active'],['USR-002','Finance Demo','finance@shelvindo.test','Finance','Active'],['USR-003','Sales Demo','sales@shelvindo.test','Sales','Active'],['USR-004','Warehouse Demo','warehouse@shelvindo.test','Warehouse','Inactive']]
  return <SettingShell eyebrow="Settings · Users" title="Users & Roles" description="Kelola akun pengguna dan role aplikasi."><div className="settings-toolbar"><button className="button button-primary">+ Tambah User</button><div className="search-field"><span>⌕</span><input placeholder="Cari user..." /></div></div><div className="table-wrap"><table><thead><tr><th>Nama</th><th>Email</th><th>Role</th><th>Status</th><th/></tr></thead><tbody>{users.map(u=><tr key={u[0]}><td><strong className="table-primary">{u[1]}</strong><small className="table-secondary">{u[0]}</small></td><td>{u[2]}</td><td>{u[3]}</td><td><span className={`badge badge-${u[4].toLowerCase()}`}>{u[4]}</span></td><td><button className="row-action">Edit</button></td></tr>)}</tbody></table></div></SettingShell>
}
function InvoiceSettings() {
  return <SettingShell eyebrow="Settings · Invoice" title="Invoice Settings" description="Konfigurasi nomor invoice dan ketentuan pembayaran."><div className="settings-form"><label>Prefix Invoice<input defaultValue="INV-" /></label><label>Format Nomor<input defaultValue="YYMM-####" /></label><label>Termin Default<select defaultValue="30"><option value="7">7 hari</option><option value="14">14 hari</option><option value="30">30 hari</option><option value="60">60 hari</option></select></label><label>Currency<select><option>IDR — Rupiah</option></select></label><label className="full toggle-row"><span><strong>Aktifkan pajak</strong><small>Konsep pajak untuk transaksi invoice.</small></span><input type="checkbox" defaultChecked /></label></div></SettingShell>
}
function IntegrationSettings() {
  return <SettingShell eyebrow="Settings · Integration" title="Integrations" description="Konsep koneksi ke layanan eksternal. Tidak ada koneksi nyata pada frontend demo."><div className="integration-list"><div className="integration-card"><div><strong>Bank Integration</strong><small>Sinkronisasi rekening bank</small></div><span className="badge badge-draft">Not Connected</span><button className="button button-ghost">Configure</button></div><div className="integration-card"><div><strong>Payment Gateway</strong><small>Penerimaan pembayaran online</small></div><span className="badge badge-draft">Not Connected</span><button className="button button-ghost">Configure</button></div><div className="integration-card"><div><strong>Accounting API</strong><small>Integrasi sistem akuntansi eksternal</small></div><span className="badge badge-draft">Not Connected</span><button className="button button-ghost">Configure</button></div></div></SettingShell>
}
function AppearanceSettings() {
  return <SettingShell eyebrow="Settings · Appearance" title="Appearance" description="Preferensi visual aplikasi Shelvindo."><div className="theme-options"><div className="theme-choice active"><div className="theme-preview light-preview"/><strong>Soft Light</strong><small>Sage · Mint · Cream</small></div><div className="theme-choice"><div className="theme-preview contrast-preview"/><strong>High Contrast</strong><small>Experimental</small></div></div></SettingShell>
}

function ReportsPage({type='overview'}) {
  const [period,setPeriod]=useState('Oktober 2026')
  const [reportType,setReportType]=useState(type==='overview'?'finance':type)
  const renderReport = () => {
    if(reportType==='sales') return <SalesReport />
    if(reportType==='customers') return <CustomerReport />
    if(reportType==='receivables') return <ReceivableReport />
    if(reportType==='payables') return <PayableReport />
    if(reportType==='inventory') return <InventoryReport />
    return <FinancialReport />
  }
  return <div className="page-content">
    <div className="page-header sales-header">
      <div><span className="eyebrow">Reports & Export</span><h1>Laporan</h1><p>Ringkasan penjualan, keuangan, customer, piutang, hutang, dan persediaan.</p></div>
      <div className="report-actions"><button className="button button-ghost">Export XLS</button><button className="button button-primary">Export PDF</button></div>
    </div>
    <section className="report-toolbar panel">
      <label>Jenis Laporan<select value={reportType} onChange={e=>setReportType(e.target.value)}><option value="finance">Financial</option><option value="sales">Sales</option><option value="customers">Customer</option><option value="receivables">Receivables</option><option value="payables">Payables</option><option value="inventory">Inventory</option></select></label>
      <label>Periode<select value={period} onChange={e=>setPeriod(e.target.value)}><option>Oktober 2026</option><option>September 2026</option><option>Agustus 2026</option></select></label>
      <label>Rentang<select><option>Monthly</option><option>Custom Range</option></select></label>
    </section>
    {renderReport()}
  </div>
}

function ReportSummary({items}) {
  return <div className="report-kpis">{items.map((x,i)=><article className="stat-card" key={i}><div className="stat-top"><span>{x.label}</span><span className={`status-dot ${x.type==='expense'?'warning':'positive'}`}/></div><strong>{x.value}</strong><small>{x.note}</small></article>)}</div>
}
function FinancialReport() {
  return <><ReportSummary items={[{label:'Penjualan',value:'Rp 128,4 jt',note:'24 invoice',type:'income'},{label:'Pembelian',value:'Rp 74,8 jt',note:'18 transaksi',type:'expense'},{label:'Biaya Operasional',value:'Rp 15,9 jt',note:'4 transaksi',type:'expense'},{label:'Laba Operasional',value:'Rp 37,7 jt',note:'Before tax',type:'income'}]} /><section className="panel report-panel"><div className="report-panel-head"><div><h3>Monthly Financial Summary</h3><p>Ringkasan performa finansial periode berjalan.</p></div></div><div className="financial-bars">{reportFinancial.map(x=><div className="financial-row" key={x.label}><span>{x.label}</span><div><i style={{width:`${Math.max(18, Math.min(100, x.value/1284000))}%`}}></i></div><strong>{money(x.value)}</strong></div>)}</div></section></>
}
function SalesReport() {
  return <section className="panel report-panel"><div className="report-panel-head"><div><h3>Laporan Penjualan</h3><p>Detail invoice penjualan berdasarkan periode.</p></div></div><ReportTable headers={['Invoice','Tanggal','Customer','Total','Status']} rows={reportSales.map(x=>[x.no,x.date,x.customer,money(x.amount),x.status])}/></section>
}
function CustomerReport() {
  return <section className="panel report-panel"><div className="report-panel-head"><div><h3>Customer Recap</h3><p>Rekap transaksi dan posisi piutang setiap customer.</p></div></div><ReportTable headers={['Customer','Transaksi','Total Penjualan','Sudah Dibayar','Piutang']} rows={reportCustomers.map(x=>[x.name,x.transactions,money(x.total),money(x.paid),money(x.receivable)])}/></section>
}
function ReceivableReport() {
  return <><ReportSummary items={[{label:'Total Piutang',value:'Rp 28,59 jt',note:'3 outstanding',type:'expense'},{label:'Jatuh Tempo',value:'Rp 8,75 jt',note:'1 invoice',type:'expense'},{label:'Overdue',value:'Rp 17,2 jt',note:'1 invoice',type:'expense'}]} /><section className="panel report-panel"><div className="report-panel-head"><div><h3>Accounts Receivable</h3><p>Daftar invoice dan saldo piutang pelanggan.</p></div></div><ReportTable headers={['Customer','Invoice','Jatuh Tempo','Total','Outstanding','Status']} rows={reportReceivables.map(x=>[x.customer,x.invoice,x.due,money(x.total),money(x.outstanding),x.status])}/></section></>
}
function PayableReport() {
  return <><ReportSummary items={[{label:'Total Hutang',value:'Rp 21,83 jt',note:'3 outstanding',type:'expense'},{label:'Belum Dibayar',value:'Rp 6,43 jt',note:'1 purchase',type:'expense'},{label:'Partial',value:'Rp 7,6 jt',note:'1 supplier',type:'expense'}]} /><section className="panel report-panel"><div className="report-panel-head"><div><h3>Accounts Payable</h3><p>Daftar pembelian dan saldo hutang supplier.</p></div></div><ReportTable headers={['Supplier','Pembelian','Jatuh Tempo','Total','Outstanding','Status']} rows={reportPayables.map(x=>[x.supplier,x.purchase,x.due,money(x.total),money(x.outstanding),x.status])}/></section></>
}
function InventoryReport() {
  return <section className="panel report-panel"><div className="report-panel-head"><div><h3>Inventory Report</h3><p>Posisi stok dan nilai persediaan.</p></div></div><ReportTable headers={['SKU','Produk','Stok','Nilai','Movement']} rows={reportInventory.map(x=>[x.sku,x.product,x.stock,money(x.value),x.movement])}/></section>
}
function ReportTable({headers,rows}) {
  return <div className="table-wrap"><table><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>{j===0?<strong className="table-primary">{cell}</strong>:cell}</td>)}</tr>)}</tbody></table></div>
}

function InventoryPage({ section='overview' }) {
  if (section === 'in') return <StockMovementPage type="In" />
  if (section === 'out') return <StockMovementPage type="Out" />
  return <InventoryOverview />
}

function InventoryOverview() {
  const [query,setQuery] = useState('')
  const [category,setCategory] = useState('All')
  const [showAdjustment,setShowAdjustment] = useState(false)
  const categories = [...new Set(inventorySeed.map(i=>i.category))]
  const filtered = inventorySeed.filter(i => `${i.sku} ${i.product}`.toLowerCase().includes(query.toLowerCase()) && (category==='All'||i.category===category))
  const low = inventorySeed.filter(i=>i.stock<=i.min).length
  const totalUnits = inventorySeed.reduce((s,i)=>s+i.stock,0)
  const totalValue = inventorySeed.reduce((s,i)=>s+i.value,0)
  return <div className="page-content">
    <div className="page-header sales-header"><div><span className="eyebrow">Inventory</span><h1>Persediaan</h1><p>Pantau stok, barang masuk/keluar, dan item yang mendekati minimum stok.</p></div><button className="button button-primary" onClick={()=>setShowAdjustment(true)}>+ Penyesuaian Stok</button></div>
    <div className="stat-grid sales-kpis">
      <article className="stat-card"><div className="stat-top"><span>Total SKU</span><span className="status-dot positive"/></div><strong>{inventorySeed.length}</strong><small>Produk aktif</small></article>
      <article className="stat-card"><div className="stat-top"><span>Total unit</span><span className="status-dot positive"/></div><strong>{totalUnits}</strong><small>Semua lokasi</small></article>
      <article className="stat-card"><div className="stat-top"><span>Stok menipis</span><span className="status-dot warning"/></div><strong>{low}</strong><small>Perlu perhatian</small></article>
      <article className="stat-card"><div className="stat-top"><span>Nilai persediaan</span><span className="status-dot"/></div><strong>{money(totalValue)}</strong><small>Dummy valuation</small></article>
    </div>
    <section className="panel sales-panel">
      <div className="toolbar"><div className="search-field"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari SKU atau produk..." /></div><select value={category} onChange={e=>setCategory(e.target.value)}><option>All</option>{categories.map(c=><option key={c}>{c}</option>)}</select><button className="button button-ghost">Export</button></div>
      <div className="table-meta"><span><strong>{filtered.length}</strong> produk ditemukan</span><span>Stok saat ini · Dummy data</span></div>
      <div className="table-wrap"><table><thead><tr><th>Produk</th><th>Kategori</th><th>Unit</th><th>Stok</th><th>Minimum</th><th>Nilai</th><th>Status</th></tr></thead><tbody>{filtered.map(i=>{
        const lowStock=i.stock<=i.min
        return <tr key={i.id}><td><strong className="table-primary">{i.product}</strong><small className="table-secondary">{i.sku}</small></td><td>{i.category}</td><td>{i.unit}</td><td><strong>{i.stock}</strong></td><td>{i.min}</td><td>{money(i.value)}</td><td><span className={`badge ${lowStock?'badge-warning':'badge-paid'}`}>{lowStock?'Low Stock':'Healthy'}</span></td></tr>
      })}</tbody></table></div>
    </section>
    {showAdjustment && <StockAdjustmentModal onClose={()=>setShowAdjustment(false)} />}
  </div>
}

function StockMovementPage({type}) {
  const [query,setQuery]=useState('')
  const rows=stockMovements.filter(m=>m.type===type && `${m.ref} ${m.product} ${m.note}`.toLowerCase().includes(query.toLowerCase()))
  return <div className="page-content">
    <div className="page-header sales-header"><div><span className="eyebrow">Inventory Movement</span><h1>Stok {type==='In'?'Masuk':'Keluar'}</h1><p>Catat dan pantau pergerakan stok {type==='In'?'masuk dari pembelian':'keluar karena penjualan'}.</p></div><button className="button button-primary">+ Catat Stok {type==='In'?'Masuk':'Keluar'}</button></div>
    <section className="panel sales-panel">
      <div className="toolbar"><div className="search-field"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari referensi atau produk..." /></div><button className="button button-ghost">Export</button></div>
      <div className="table-meta"><span><strong>{rows.length}</strong> pergerakan</span><span>Oktober 2026 · Dummy data</span></div>
      <div className="table-wrap"><table><thead><tr><th>Tanggal</th><th>Referensi</th><th>Produk</th><th>Qty</th><th>Keterangan</th><th>Status</th></tr></thead><tbody>{rows.map(m=><tr key={m.id}><td>{m.date}</td><td><strong className="table-primary">{m.ref}</strong></td><td>{m.product}</td><td><strong>{m.qty}</strong></td><td>{m.note}</td><td><span className="badge badge-paid">Recorded</span></td></tr>)}</tbody></table></div>
    </section>
  </div>
}

function StockAdjustmentModal({onClose}) {
  return <div className="modal-backdrop" onClick={onClose}><div className="modal-card sales-form-card" onClick={e=>e.stopPropagation()}>
    <div className="modal-header"><div><span className="eyebrow">Inventory adjustment</span><h2>Penyesuaian Stok</h2></div><button className="close-button" onClick={onClose}>×</button></div>
    <div className="form-grid"><label className="full">Produk<select>{inventorySeed.map(i=><option key={i.id}>{i.product}</option>)}</select></label><label>Jenis<select><option>Tambah</option><option>Kurangi</option></select></label><label>Qty<input type="number" min="1" placeholder="0" /></label><label className="full">Alasan<textarea placeholder="Contoh: stock opname / barang rusak / koreksi data" /></label></div>
    <div className="modal-footer"><button className="button button-ghost" onClick={onClose}>Batal</button><button className="button button-primary" onClick={onClose}>Simpan Penyesuaian</button></div>
  </div></div>
}

function FinancePage({ section='cash' }) {
  return section === 'expenses' ? <ExpensesPage /> : <CashBankPage />
}

function CashBankPage() {
  const [query,setQuery] = useState('')
  const [showForm,setShowForm] = useState(false)
  const filtered = financeTransactions.filter(t=>`${t.description} ${t.account} ${t.category}`.toLowerCase().includes(query.toLowerCase()))
  const totalBalance = financeAccounts.reduce((sum,a)=>sum+a.balance,0)
  return <div className="page-content">
    <div className="page-header sales-header">
      <div><span className="eyebrow">Finance</span><h1>Cash & Bank</h1><p>Pantau saldo kas, rekening bank, pemasukan, pengeluaran, dan mutasi rekening.</p></div>
      <button className="button button-primary" onClick={()=>setShowForm(true)}>+ Transaksi</button>
    </div>
    <div className="stat-grid sales-kpis">
      <article className="stat-card"><div className="stat-top"><span>Total saldo</span><span className="status-dot positive"/></div><strong>{money(totalBalance)}</strong><small>3 akun aktif</small></article>
      <article className="stat-card"><div className="stat-top"><span>Pemasukan</span><span className="status-dot positive"/></div><strong>Rp 21,2 jt</strong><small>Oktober 2026</small></article>
      <article className="stat-card"><div className="stat-top"><span>Pengeluaran</span><span className="status-dot warning"/></div><strong>Rp 15,9 jt</strong><small>Oktober 2026</small></article>
      <article className="stat-card"><div className="stat-top"><span>Net cash flow</span><span className="status-dot positive"/></div><strong>Rp 5,3 jt</strong><small>Oktober 2026</small></article>
    </div>
    <section className="account-grid">{financeAccounts.map(a=><article className="account-card" key={a.id}><div><span className="account-icon">{a.type==='Cash'?'K':'B'}</span><div><strong>{a.name}</strong><small>{a.type}</small></div></div><b>{money(a.balance)}</b></article>)}</section>
    <section className="panel sales-panel">
      <div className="toolbar"><div className="search-field"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari transaksi..." /></div><select><option>Semua akun</option>{financeAccounts.map(a=><option key={a.id}>{a.name}</option>)}</select><button className="button button-ghost">Export</button></div>
      <div className="table-meta"><span><strong>{filtered.length}</strong> transaksi</span><span>Oktober 2026 · Dummy data</span></div>
      <div className="table-wrap"><table><thead><tr><th>Tanggal</th><th>Deskripsi</th><th>Akun</th><th>Kategori</th><th>Tipe</th><th>Nominal</th></tr></thead><tbody>{filtered.map(t=><tr key={t.id}><td>{t.date}</td><td><strong className="table-primary">{t.description}</strong></td><td>{t.account}</td><td>{t.category}</td><td><span className={`badge badge-${t.type.toLowerCase()}`}>{t.type}</span></td><td><strong>{t.type==='Income'?'+':'-'} {money(t.amount)}</strong></td></tr>)}</tbody></table></div>
    </section>
    {showForm && <TransactionModal onClose={()=>setShowForm(false)} />}
  </div>
}

function TransactionModal({onClose}) {
  return <div className="modal-backdrop" onClick={onClose}><div className="modal-card sales-form-card" onClick={e=>e.stopPropagation()}>
    <div className="modal-header"><div><span className="eyebrow">Cash movement</span><h2>Tambah Transaksi</h2></div><button className="close-button" onClick={onClose}>×</button></div>
    <div className="form-grid">
      <label>Tipe<select><option>Pemasukan</option><option>Pengeluaran</option></select></label>
      <label>Akun<select>{financeAccounts.map(a=><option key={a.id}>{a.name}</option>)}</select></label>
      <label className="full">Deskripsi<input placeholder="Contoh: Pembayaran invoice pelanggan" /></label>
      <label>Kategori<select><option>Sales</option><option>Purchase</option><option>Operational</option><option>Other</option></select></label>
      <label>Nominal<input type="number" min="0" placeholder="0" /></label>
      <label className="full">Catatan<textarea placeholder="Catatan transaksi (opsional)" /></label>
    </div>
    <div className="modal-footer"><button className="button button-ghost" onClick={onClose}>Batal</button><button className="button button-primary" onClick={onClose}>Simpan Transaksi</button></div>
  </div></div>
}

function ExpensesPage() {
  const [query,setQuery] = useState('')
  const [status,setStatus] = useState('All')
  const [showForm,setShowForm] = useState(false)
  const filtered = expenseSeed.filter(e=>`${e.no} ${e.description} ${e.category}`.toLowerCase().includes(query.toLowerCase()) && (status==='All'||e.status===status))
  const total = expenseSeed.reduce((s,e)=>s+e.amount,0)
  return <div className="page-content">
    <div className="page-header sales-header"><div><span className="eyebrow">Finance</span><h1>Biaya Operasional</h1><p>Catat dan pantau biaya operasional perusahaan beserta status approval dan pembayarannya.</p></div><button className="button button-primary" onClick={()=>setShowForm(true)}>+ Buat Biaya</button></div>
    <div className="stat-grid sales-kpis">
      <article className="stat-card"><div className="stat-top"><span>Total biaya</span><span className="status-dot warning"/></div><strong>{money(total)}</strong><small>Oktober 2026</small></article>
      <article className="stat-card"><div className="stat-top"><span>Sudah dibayar</span><span className="status-dot positive"/></div><strong>Rp 2,85 jt</strong><small>1 transaksi</small></article>
      <article className="stat-card"><div className="stat-top"><span>Menunggu approval</span><span className="status-dot warning"/></div><strong>Rp 3,25 jt</strong><small>2 transaksi</small></article>
      <article className="stat-card"><div className="stat-top"><span>Draft</span><span className="status-dot"/></div><strong>Rp 2,1 jt</strong><small>1 transaksi</small></article>
    </div>
    <section className="panel sales-panel">
      <div className="toolbar"><div className="search-field"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari biaya..." /></div><select value={status} onChange={e=>setStatus(e.target.value)}>{['All','Draft','Submitted','Approved','Rejected','Paid'].map(s=><option key={s}>{s}</option>)}</select><button className="button button-ghost">Export</button></div>
      <div className="table-meta"><span><strong>{filtered.length}</strong> biaya ditemukan</span><span>Oktober 2026 · Dummy data</span></div>
      <div className="table-wrap"><table><thead><tr><th>Nomor</th><th>Tanggal</th><th>Kategori</th><th>Deskripsi</th><th>Akun</th><th>Nominal</th><th>Status</th></tr></thead><tbody>{filtered.map(e=><tr key={e.id}><td><strong className="table-primary">{e.no}</strong></td><td>{e.date}</td><td>{e.category}</td><td>{e.description}</td><td>{e.account}</td><td><strong>{money(e.amount)}</strong></td><td><span className={`badge badge-${e.status.toLowerCase()}`}>{e.status}</span></td></tr>)}</tbody></table></div>
    </section>
    {showForm && <ExpenseModal onClose={()=>setShowForm(false)} />}
  </div>
}

function ExpenseModal({onClose}) {
  return <div className="modal-backdrop" onClick={onClose}><div className="modal-card sales-form-card" onClick={e=>e.stopPropagation()}>
    <div className="modal-header"><div><span className="eyebrow">Operational expense</span><h2>Buat Biaya</h2></div><button className="close-button" onClick={onClose}>×</button></div>
    <div className="form-grid"><label>Tanggal<input type="date" defaultValue="2026-10-23" /></label><label>Kategori<select><option>Utilities</option><option>Transport</option><option>Office</option><option>Maintenance</option></select></label><label className="full">Deskripsi<input placeholder="Contoh: Listrik kantor" /></label><label>Akun Pembayaran<select>{financeAccounts.map(a=><option key={a.id}>{a.name}</option>)}</select></label><label>Nominal<input type="number" min="0" placeholder="0" /></label><label className="full">Lampiran / Catatan<textarea placeholder="Lampiran hanya berupa konsep pada frontend demo." /></label></div>
    <div className="modal-footer"><button className="button button-ghost" onClick={onClose}>Batal</button><button className="button button-primary" onClick={onClose}>Simpan Draft</button></div>
  </div></div>
}

function PurchasePage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [selectedPurchase, setSelectedPurchase] = useState(null)

  const purchases = [
    { no:'PUR-26001', supplier:'PT Sumber Kertas Indonesia', date:'23 Okt 2026', total:10800000, status:'Received', payment:'Paid' },
    { no:'PUR-26002', supplier:'CV Mitra Office', date:'22 Okt 2026', total:6425000, status:'Ordered', payment:'Unpaid' },
    { no:'PUR-26003', supplier:'PT Indo Supply', date:'20 Okt 2026', total:15200000, status:'Received', payment:'Partial' },
    { no:'PUR-26004', supplier:'PT Sumber Kertas Indonesia', date:'18 Okt 2026', total:8750000, status:'Draft', payment:'Unpaid' },
    { no:'PUR-26005', supplier:'CV Mitra Office', date:'16 Okt 2026', total:4200000, status:'Partially Paid', payment:'Partial' },
  ]
  const filtered = purchases.filter(row => {
    const match = `${row.no} ${row.supplier}`.toLowerCase().includes(query.toLowerCase())
    return match && (status === 'All' || row.status === status)
  })

  return <div className="page-content">
    <div className="page-header sales-header">
      <div><span className="eyebrow">Purchasing</span><h1>Pembelian</h1><p>Kelola pembelian, supplier, penerimaan barang, dan status pembayaran.</p></div>
      <button className="button button-primary" onClick={()=>setShowForm(true)}>+ Buat Pembelian</button>
    </div>

    <div className="stat-grid sales-kpis">
      <article className="stat-card"><div className="stat-top"><span>Pembelian bulan ini</span><span className="status-dot positive"/></div><strong>Rp 74,8 jt</strong><small>18 transaksi</small></article>
      <article className="stat-card"><div className="stat-top"><span>Sudah dibayar</span><span className="status-dot positive"/></div><strong>Rp 41,2 jt</strong><small>55,1% dari pembelian</small></article>
      <article className="stat-card"><div className="stat-top"><span>Hutang</span><span className="status-dot warning"/></div><strong>Rp 33,6 jt</strong><small>7 transaksi outstanding</small></article>
      <article className="stat-card"><div className="stat-top"><span>Menunggu diterima</span><span className="status-dot warning"/></div><strong>Rp 6,4 jt</strong><small>1 purchase order</small></article>
    </div>

    <section className="panel sales-panel">
      <div className="toolbar">
        <div className="search-field"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari nomor pembelian atau supplier..." /></div>
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          {['All','Draft','Ordered','Received','Partially Paid','Paid','Cancelled'].map(s=><option key={s}>{s}</option>)}
        </select>
        <button className="button button-ghost">Export</button>
      </div>
      <div className="table-meta"><span><strong>{filtered.length}</strong> pembelian ditemukan</span><span>Oktober 2026 · Dummy data</span></div>
      <div className="table-wrap">
        <table><thead><tr><th>Pembelian</th><th>Supplier</th><th>Tanggal</th><th>Total</th><th>Status</th><th>Pembayaran</th><th/></tr></thead>
        <tbody>{filtered.map(row=><tr key={row.no}>
          <td><strong className="table-primary">{row.no}</strong><small className="table-secondary">Purchase transaction</small></td>
          <td>{row.supplier}</td><td>{row.date}</td><td>{money(row.total)}</td>
          <td><span className={`badge badge-${row.status.toLowerCase().replaceAll(' ','-')}`}>{row.status}</span></td>
          <td><span className={`badge badge-${row.payment.toLowerCase()}`}>{row.payment}</span></td>
          <td><button className="row-action" onClick={()=>setSelectedPurchase(row)}>Lihat</button></td>
        </tr>)}</tbody></table>
      </div>
    </section>
    {showForm && <PurchaseForm onClose={()=>setShowForm(false)} />}
    {selectedPurchase && <PurchaseModal purchase={selectedPurchase} onClose={()=>setSelectedPurchase(null)} />}
  </div>
}

function PurchaseForm({ onClose }) {
  const [supplier, setSupplier] = useState('')
  const [product, setProduct] = useState('')
  const [qty, setQty] = useState(1)
  const [discount, setDiscount] = useState(0)
  const selected = purchaseProducts.find(p=>p.id===product)
  const subtotal = selected ? selected.price * Number(qty || 0) : 0
  const total = Math.max(0, subtotal - Number(discount || 0))
  return <div className="modal-backdrop" onClick={onClose}><div className="modal-card sales-form-card" onClick={e=>e.stopPropagation()}>
    <div className="modal-header"><div><span className="eyebrow">New purchase</span><h2>Buat Pembelian</h2></div><button className="close-button" onClick={onClose}>×</button></div>
    <div className="form-grid">
      <label className="full">Supplier<select value={supplier} onChange={e=>setSupplier(e.target.value)}><option value="">Pilih supplier</option>{purchaseSuppliers.map(s=><option key={s}>{s}</option>)}</select></label>
      <label>Produk<select value={product} onChange={e=>setProduct(e.target.value)}><option value="">Pilih produk</option>{purchaseProducts.map(p=><option key={p.id} value={p.id}>{p.name} · {money(p.price)}</option>)}</select></label>
      <label>Qty<input type="number" min="1" value={qty} onChange={e=>setQty(e.target.value)} /></label>
      <label>Diskon<input type="number" min="0" value={discount} onChange={e=>setDiscount(e.target.value)} /></label>
      <label>Pembayaran<select><option>Termin / Hutang</option><option>Cash</option><option>Transfer Bank</option></select></label>
      <label className="full">Catatan<textarea placeholder="Catatan pembelian (opsional)" /></label>
    </div>
    <div className="sales-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Diskon</span><strong>- {money(Number(discount || 0))}</strong></div><div className="summary-total"><span>Total</span><strong>{money(total)}</strong></div></div>
    <div className="modal-footer"><button className="button button-ghost" onClick={onClose}>Batal</button><button className="button button-primary" onClick={onClose}>Simpan Draft</button></div>
  </div></div>
}

function PurchaseModal({ purchase, onClose }) {
  return <div className="modal-backdrop" onClick={onClose}><div className="modal-card invoice-modal" onClick={e=>e.stopPropagation()}>
    <div className="invoice-head"><div><div className="invoice-brand"><span className="brand-mark">S</span><strong>Shelvindo</strong></div><span className="invoice-muted">Purchase document · PT. Shelvindo Kurnia Cemerlang</span></div><span className={`badge badge-${purchase.status.toLowerCase().replaceAll(' ','-')}`}>{purchase.status}</span></div>
    <div className="invoice-meta"><div><small>Purchase</small><strong>{purchase.no}</strong></div><div><small>Tanggal</small><strong>{purchase.date}</strong></div><div><small>Pembayaran</small><strong>{purchase.payment}</strong></div></div>
    <div className="invoice-customer"><small>Supplier</small><strong>{purchase.supplier}</strong><span>Supplier ID · SUP-001</span></div>
    <table className="invoice-items"><thead><tr><th>Item</th><th>Qty</th><th>Harga</th><th>Total</th></tr></thead><tbody><tr><td>Produk pembelian</td><td>1</td><td>{money(purchase.total)}</td><td>{money(purchase.total)}</td></tr></tbody></table>
    <div className="invoice-total"><span>Total pembelian</span><strong>{money(purchase.total)}</strong></div>
    <div className="modal-footer"><button className="button button-ghost" onClick={onClose}>Tutup</button><button className="button button-primary" onClick={onClose}>Print (Demo)</button></div>
  </div></div>
}

function SalesPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  const invoices = [
    { no:'INV-26001', customer:'CV Sinar Abadi', date:'23 Okt 2026', due:'22 Nov 2026', total:12450000, status:'Paid' },
    { no:'INV-26002', customer:'PT Maju Jaya', date:'23 Okt 2026', due:'22 Nov 2026', total:8750000, status:'Unpaid' },
    { no:'INV-26003', customer:'Toko Berkah', date:'22 Okt 2026', due:'21 Nov 2026', total:5280000, status:'Partial' },
    { no:'INV-26004', customer:'PT Nusantara Makmur', date:'20 Okt 2026', due:'19 Nov 2026', total:17200000, status:'Overdue' },
    { no:'INV-26005', customer:'CV Sinar Abadi', date:'18 Okt 2026', due:'17 Nov 2026', total:9200000, status:'Sent' },
  ]

  const filtered = invoices.filter(row => {
    const match = `${row.no} ${row.customer}`.toLowerCase().includes(query.toLowerCase())
    return match && (status === 'All' || row.status === status)
  })

  return (
    <div className="page-content">
      <div className="page-header sales-header">
        <div>
          <span className="eyebrow">Sales & Invoice</span>
          <h1>Penjualan</h1>
          <p>Buat transaksi penjualan, kelola invoice, dan pantau status pembayaran.</p>
        </div>
        <button className="button button-primary" onClick={() => setShowForm(true)}>+ Buat Penjualan</button>
      </div>

      <div className="stat-grid sales-kpis">
        <article className="stat-card"><div className="stat-top"><span>Penjualan bulan ini</span><span className="status-dot positive"/></div><strong>Rp 128,4 jt</strong><small>24 invoice</small></article>
        <article className="stat-card"><div className="stat-top"><span>Sudah dibayar</span><span className="status-dot positive"/></div><strong>Rp 67,1 jt</strong><small>52,3% dari penjualan</small></article>
        <article className="stat-card"><div className="stat-top"><span>Piutang</span><span className="status-dot warning"/></div><strong>Rp 52,8 jt</strong><small>8 invoice outstanding</small></article>
        <article className="stat-card"><div className="stat-top"><span>Overdue</span><span className="status-dot danger"/></div><strong>Rp 17,2 jt</strong><small>1 invoice</small></article>
      </div>

      <section className="panel sales-panel">
        <div className="toolbar">
          <div className="search-field"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari invoice atau pelanggan..." /></div>
          <select value={status} onChange={e=>setStatus(e.target.value)}>
            {['All','Draft','Sent','Unpaid','Partial','Paid','Overdue','Cancelled'].map(s=><option key={s}>{s}</option>)}
          </select>
          <button className="button button-ghost">Export</button>
        </div>
        <div className="table-meta"><span><strong>{filtered.length}</strong> invoice ditemukan</span><span>Oktober 2026 · Dummy data</span></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Invoice</th><th>Pelanggan</th><th>Tanggal</th><th>Jatuh Tempo</th><th>Total</th><th>Status</th><th/></tr></thead>
            <tbody>{filtered.map(row=><tr key={row.no}>
              <td><strong className="table-primary">{row.no}</strong><small className="table-secondary">Sales order linked</small></td>
              <td>{row.customer}</td><td>{row.date}</td><td>{row.due}</td><td>{money(row.total)}</td>
              <td><span className={`badge badge-${row.status.toLowerCase()}`}>{row.status}</span></td>
              <td><button className="row-action" onClick={()=>setSelectedInvoice(row)}>Lihat</button></td>
            </tr>)}</tbody>
          </table>
        </div>
      </section>

      {showForm && <SalesForm onClose={()=>setShowForm(false)} />}
      {selectedInvoice && <InvoiceModal invoice={selectedInvoice} onClose={()=>setSelectedInvoice(null)} />}
    </div>
  )
}

function SalesForm({ onClose }) {
  const [customer, setCustomer] = useState('')
  const [product, setProduct] = useState('')
  const [qty, setQty] = useState(1)
  const [discount, setDiscount] = useState(0)
  const selected = salesProducts.find(p=>p.id===product)
  const subtotal = selected ? selected.price * Number(qty || 0) : 0
  const total = Math.max(0, subtotal - Number(discount || 0))

  return <div className="modal-backdrop" onClick={onClose}>
    <div className="modal-card sales-form-card" onClick={e=>e.stopPropagation()}>
      <div className="modal-header"><div><span className="eyebrow">New transaction</span><h2>Buat Penjualan</h2></div><button className="close-button" onClick={onClose}>×</button></div>
      <div className="form-grid">
        <label className="full">Pelanggan<select value={customer} onChange={e=>setCustomer(e.target.value)}><option value="">Pilih pelanggan</option>{salesCustomers.map(c=><option key={c}>{c}</option>)}</select></label>
        <label>Produk<select value={product} onChange={e=>setProduct(e.target.value)}><option value="">Pilih produk</option>{salesProducts.map(p=><option key={p.id} value={p.id}>{p.name} · {money(p.price)}</option>)}</select></label>
        <label>Qty<input type="number" min="1" value={qty} onChange={e=>setQty(e.target.value)} /></label>
        <label>Diskon<input type="number" min="0" value={discount} onChange={e=>setDiscount(e.target.value)} /></label>
        <label>Metode Pembayaran<select><option>Termin / Piutang</option><option>Cash</option><option>Transfer Bank</option></select></label>
        <label className="full">Catatan<textarea placeholder="Catatan transaksi (opsional)" /></label>
      </div>
      <div className="sales-summary">
        <div><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
        <div><span>Diskon</span><strong>- {money(Number(discount || 0))}</strong></div>
        <div className="summary-total"><span>Total</span><strong>{money(total)}</strong></div>
      </div>
      <div className="modal-footer"><button className="button button-ghost" onClick={onClose}>Batal</button><button className="button button-primary" onClick={onClose}>Simpan Draft</button></div>
    </div>
  </div>
}

function InvoiceModal({ invoice, onClose }) {
  return <div className="modal-backdrop" onClick={onClose}>
    <div className="modal-card invoice-modal" onClick={e=>e.stopPropagation()}>
      <div className="invoice-head"><div><div className="invoice-brand"><span className="brand-mark">S</span><strong>Shelvindo</strong></div><span className="invoice-muted">PT. Shelvindo Kurnia Cemerlang</span></div><span className={`badge badge-${invoice.status.toLowerCase()}`}>{invoice.status}</span></div>
      <div className="invoice-meta"><div><small>Invoice</small><strong>{invoice.no}</strong></div><div><small>Tanggal</small><strong>{invoice.date}</strong></div><div><small>Jatuh Tempo</small><strong>{invoice.due}</strong></div></div>
      <div className="invoice-customer"><small>Bill to</small><strong>{invoice.customer}</strong><span>Customer ID · CUS-001</span></div>
      <table className="invoice-items"><thead><tr><th>Item</th><th>Qty</th><th>Harga</th><th>Total</th></tr></thead><tbody><tr><td>Produk / layanan penjualan</td><td>1</td><td>{money(invoice.total)}</td><td>{money(invoice.total)}</td></tr></tbody></table>
      <div className="invoice-total"><span>Total invoice</span><strong>{money(invoice.total)}</strong></div>
      <div className="modal-footer"><button className="button button-ghost" onClick={onClose}>Tutup</button><button className="button button-primary" onClick={onClose}>Download PDF (Demo)</button></div>
    </div>
  </div>
}

function Dashboard() {
  const cards = [
    ['Penjualan', 'Rp 128,4 jt', '+12,8%', 'positive'],
    ['Biaya Operasional', 'Rp 34,7 jt', '+4,2%', 'neutral'],
    ['Piutang', 'Rp 52,8 jt', '8 invoice', 'warning'],
    ['Hutang', 'Rp 27,3 jt', '5 invoice', 'danger'],
  ]

  const transactions = [
    ['INV-26001', 'CV Sinar Abadi', '23 Okt 2026', 'Rp 12.450.000', 'Paid'],
    ['INV-26002', 'PT Maju Jaya', '23 Okt 2026', 'Rp 8.750.000', 'Unpaid'],
    ['INV-26003', 'Toko Berkah', '22 Okt 2026', 'Rp 5.280.000', 'Partial'],
    ['INV-26004', 'PT Nusantara Makmur', '22 Okt 2026', 'Rp 17.200.000', 'Overdue'],
  ]

  const dueInvoices = [
    ['INV-26002', 'PT Maju Jaya', 'Rp 8.750.000', '2 hari lagi'],
    ['INV-25988', 'CV Sentosa', 'Rp 6.420.000', 'Hari ini'],
    ['INV-25971', 'Toko Berkah', 'Rp 4.180.000', 'Terlewat 3 hari'],
  ]

  return (
    <div className="page-content">
      <div className="page-header dashboard-header">
        <div>
          <span className="eyebrow">Overview · 23 Oktober 2026</span>
          <h1>Selamat datang, Admin.</h1>
          <p>Berikut ringkasan aktivitas bisnis Shelvindo hari ini.</p>
        </div>
        <div className="dashboard-actions">
          <button className="button button-ghost">Periode: Bulan ini</button>
          <button className="button button-primary">+ Transaksi Baru</button>
        </div>
      </div>

      <div className="stat-grid">
        {cards.map(([label, value, meta, tone]) => (
          <article className="stat-card" key={label}>
            <div className="stat-top"><span>{label}</span><span className={`status-dot ${tone}`} /></div>
            <strong>{value}</strong>
            <small>{meta}</small>
          </article>
        ))}
      </div>

      <div className="content-grid">
        <section className="panel panel-large">
          <div className="panel-header">
            <div><h2>Performa Penjualan</h2><span>Apr — Okt 2026 · Rupiah</span></div>
            <button className="button button-ghost">Lihat laporan</button>
          </div>
          <div className="chart-placeholder chart-tall">
            <div className="chart-y-labels"><span>150 jt</span><span>100 jt</span><span>50 jt</span><span>0</span></div>
            <div className="chart-grid-lines"><i/><i/><i/><i/></div>
            <div className="chart-bars chart-bars-dashboard">
              {[52, 67, 58, 78, 65, 88, 74].map((h, i) => (
                <div className="bar-column" key={i}>
                  <span style={{height:`${h}%`}} />
                  <small>{['Apr','Mei','Jun','Jul','Agu','Sep','Okt'][i]}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header"><div><h2>Posisi Kas & Bank</h2><span>Saldo tersedia</span></div></div>
          <div className="cash-value">Rp 86,2 jt</div>
          <div className="cash-row"><span>Kas</span><strong>Rp 31,4 jt</strong></div>
          <div className="cash-row"><span>Bank</span><strong>Rp 54,8 jt</strong></div>
          <div className="mini-progress"><span /></div>
          <small className="muted">74% dari target kas bulan ini</small>
          <div className="cash-insight">
            <span>↗</span>
            <div><strong>+8,6%</strong><small>dibanding bulan lalu</small></div>
          </div>
        </section>
      </div>

      <div className="dashboard-two-col">
        <section className="panel">
          <div className="panel-header">
            <div><h2>Transaksi Terbaru</h2><span>Aktivitas penjualan</span></div>
            <button className="button button-ghost">Lihat semua</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>No. Transaksi</th><th>Pelanggan</th><th>Tanggal</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>{transactions.map(row => (
                <tr key={row[0]}>
                  {row.slice(0,4).map(cell => <td key={cell}>{cell}</td>)}
                  <td><span className={`badge badge-${row[4].toLowerCase()}`}>{row[4]}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div><h2>Invoice Jatuh Tempo</h2><span>Perlu perhatian</span></div>
            <span className="count-badge">3</span>
          </div>
          <div className="due-list">
            {dueInvoices.map(([number, customer, amount, due]) => (
              <div className="due-item" key={number}>
                <div className="invoice-icon">Rp</div>
                <div className="due-main"><strong>{number}</strong><span>{customer}</span></div>
                <div className="due-side"><strong>{amount}</strong><span className={due.includes('Terlewat') ? 'overdue-text' : ''}>{due}</span></div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel dashboard-bottom">
        <div className="panel-header"><div><h2>Ringkasan Operasional</h2><span>Status hari ini</span></div></div>
        <div className="ops-grid">
          <div><span className="ops-icon mint">↗</span><div><strong>24</strong><small>Invoice bulan ini</small></div></div>
          <div><span className="ops-icon pink">◌</span><div><strong>8</strong><small>Piutang outstanding</small></div></div>
          <div><span className="ops-icon cream">↓</span><div><strong>5</strong><small>Hutang outstanding</small></div></div>
          <div><span className="ops-icon sage">□</span><div><strong>12</strong><small>Produk stok rendah</small></div></div>
        </div>
      </section>
    </div>
  )
}

export default function App() {
  return <><LogoutWatcher /><Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/reset-password" element={<ResetPasswordPage />} />
    <Route path="/" element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
      <Route index element={<Navigate to="/dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />

      <Route path="products" element={<MasterDataPage type="products" />} />
      <Route path="products/new" element={<MasterDataPage type="products" />} />
      <Route path="products/:id" element={<MasterDataPage type="products" />} />
      <Route path="products/:id/edit" element={<MasterDataPage type="products" />} />
      <Route path="customers" element={<MasterDataPage type="customers" />} />
      <Route path="customers/new" element={<MasterDataPage type="customers" />} />
      <Route path="customers/:id" element={<MasterDataPage type="customers" />} />
      <Route path="customers/:id/edit" element={<MasterDataPage type="customers" />} />

      <Route path="sales" element={<SalesPage />} />
      <Route path="sales/new" element={<SalesPage />} />
      <Route path="sales/:id" element={<SalesPage />} />
      <Route path="invoices" element={<SalesPage />} />
      <Route path="invoices/:id" element={<SalesPage />} />

      <Route path="purchases" element={<PurchasePage />} />
      <Route path="purchases/new" element={<PurchasePage />} />
      <Route path="purchases/:id" element={<PurchasePage />} />

      <Route path="finance/cash-bank" element={<FinancePage section="cash" />} />
      <Route path="finance/cash-bank/:id" element={<FinancePage section="cash" />} />
      <Route path="finance/expenses" element={<FinancePage section="expenses" />} />
      <Route path="finance/expenses/new" element={<FinancePage section="expenses" />} />
      <Route path="finance/expenses/:id" element={<FinancePage section="expenses" />} />

      <Route path="inventory" element={<InventoryPage section="overview" />} />
      <Route path="inventory/in" element={<StockMovementPage type="In" />} />
      <Route path="inventory/out" element={<StockMovementPage type="Out" />} />

      <Route path="reports" element={<ReportsPage type="overview" />} />
      <Route path="reports/sales" element={<ReportsPage type="sales" />} />
      <Route path="reports/finance" element={<ReportsPage type="finance" />} />
      <Route path="reports/receivables" element={<ReportsPage type="receivables" />} />
      <Route path="reports/payables" element={<ReportsPage type="payables" />} />
      <Route path="reports/customers" element={<ReportsPage type="customers" />} />
      <Route path="reports/suppliers" element={<ReportsPage type="customers" />} />
      <Route path="reports/inventory" element={<ReportsPage type="inventory" />} />

      <Route path="settings" element={<SettingsPage />} />
      <Route path="settings/company" element={<SettingsPage section="company" />} />
      <Route path="settings/users" element={<SettingsPage section="users" />} />
      <Route path="settings/invoice" element={<SettingsPage section="invoice" />} />
      <Route path="settings/integrations" element={<SettingsPage section="integrations" />} />
      <Route path="settings/appearance" element={<SettingsPage section="appearance" />} />
    </Route>
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes></>
}
