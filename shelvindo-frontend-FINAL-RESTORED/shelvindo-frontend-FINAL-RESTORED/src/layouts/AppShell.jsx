import { NavLink, Outlet } from 'react-router-dom'
import {
  BarChart3, Bell, ChevronDown, CircleDollarSign, FileText, LayoutDashboard,
  Package, ReceiptText, Settings, ShoppingCart, Users, WalletCards
} from 'lucide-react'

const nav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/products', label: 'Produk', icon: Package },
  { to: '/customers', label: 'Pelanggan', icon: Users },
  { to: '/sales', label: 'Penjualan & Invoice', icon: ReceiptText },
  { to: '/purchases', label: 'Pembelian', icon: ShoppingCart },
  { to: '/finance/cash-bank', label: 'Kas & Bank', icon: WalletCards },
  { to: '/finance/expenses', label: 'Biaya Operasional', icon: CircleDollarSign },
  { to: '/inventory', label: 'Inventory', icon: Package },
  { to: '/reports', label: 'Laporan', icon: BarChart3 },
]

export default function AppShell() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">S</div>
          <div><strong>Shelvindo</strong><span>Business Suite</span></div>
        </div>

        <div className="nav-label">Workspace</div>
        <nav>
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Settings size={18} strokeWidth={1.8} />
            <span>Settings</span>
          </NavLink>
          <div className="workspace-note">
            <span className="live-dot" />
            <div><strong>Local workspace</strong><small>Dummy data aktif</small></div>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">SHELvindo <span>/</span> Workspace</div>
          <div className="topbar-actions">
            <button className="icon-button" aria-label="Notifikasi"><Bell size={19} /></button>
            <div className="profile">
              <div className="avatar">AD</div>
              <div><strong>Admin Demo</strong><small>Administrator</small></div>
              <button className="profile-menu" onClick={() => { localStorage.removeItem('shelvindo_demo_auth'); window.location.href = '/login' }}>Keluar</button>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  )
}
