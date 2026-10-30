# PRD — Sistem Informasi Pengelolaan Penjualan & Biaya Operasional
## PT. Shelvindo Kurnia Cemerlang

## 1. Product Overview
Aplikasi web internal untuk pengelolaan penjualan, invoice, pembayaran, pembelian, kas/bank, biaya operasional, persediaan, piutang, hutang, dan laporan.

## 2. Goals
- Memusatkan pengelolaan transaksi bisnis.
- Mempermudah monitoring penjualan, invoice, kas/bank, pembelian, biaya, stok, piutang, hutang, dan laporan.
- Menyediakan dashboard untuk monitoring bisnis.
- Menjadi fondasi frontend yang siap dikembangkan ke sistem nyata.

## 3. Users
Admin, Sales, Finance, Purchasing, Warehouse, Manager, Owner/Management.

## 4. Scope
Dashboard; Login & User Management; Products & Customers; Sales & Invoice; Purchasing; Cash & Bank; Operational Expenses; Inventory; Reports & Export; Settings & Integration.

## 5. Login & User Management
Login mendukung email/username, password visibility, feedback error, dan logout.
Forgot Password flow: Login → Lupa Kata Sandi → Email → Konfirmasi → Reset Password → Password Baru → Konfirmasi → Berhasil → Login.
Frontend hanya mensimulasikan email/reset; tidak ada authentication backend.
User management: add, edit, deactivate, role assignment, search, filter, reset-password concept.

## 6. Products & Customers
Products: SKU, nama, kategori, satuan, harga jual/beli, stok, minimum stok, status.
Customers: code, nama, kontak, email, alamat, total transaksi, piutang, status.
Suppliers tersedia sebagai master data.

## 7. Sales & Invoice
Flow: customer → products → quantity/price → discount → tax concept → total → invoice → payment status.
Invoice status: Draft, Sent, Unpaid, Partially Paid, Paid, Overdue, Cancelled.

## 8. Purchasing
Purchase number, supplier, date, items, quantity, price, discount, tax concept, total, payment status.
Status: Draft, Ordered, Received, Partially Paid, Paid, Cancelled.

## 9. Cash & Bank
Cash/bank accounts, balance, income, expense, transfer, transaction history.

## 10. Operational Expenses
Expense number, date, category, description, amount, payment account, status, attachment concept.
Status: Draft, Submitted, Approved, Rejected, Paid.

## 11. Inventory
Inventory overview, stock in, stock out, adjustment concept, stock history, low-stock indicator.

## 12. Receivables & Payables
Receivable berasal dari penjualan belum lunas; payable berasal dari pembelian belum dibayar.
Statuses: Paid, Partially Paid, Unpaid, Overdue.
Dashboard menampilkan total piutang dan hutang.

## 13. Reports & Export
Reports: Sales, Invoice, Receivables, Purchase, Payables, Cash & Bank, Expenses, Inventory, Customer, Supplier, Monthly Financial.
Filter: month, year, custom date range.
Export: Excel/XLS dan PDF. Rekap customer/supplier, piutang/hutang, penjualan, pembelian, biaya, persediaan, dan keuangan bulanan.
Frontend memakai dummy/local data; tidak ada server-side reporting.

## 14. Settings & Integration
Company, invoice numbering, payment terms, user/role, appearance, integration concept. Tidak ada API integration nyata.

## 15. UX Requirements
Responsive, clear hierarchy, reusable components, search/filter/sort, pagination, empty/loading/error/success states, accessible interactions.

## 16. Visual Direction
Modern, futuristic, soft, premium, financial, friendly. Brand palette: sage, mint, matcha, soft pink, cream, white, charcoal.

## 17. Frontend Constraints
React + Vite, JavaScript/JSX, dummy/local data only. No backend, database, API, real authentication, payment gateway, bank integration, or deployment.

## 18. Acceptance Criteria
Approved scope is fully represented; business flows and frontend constraints are clear; SOT is usable as the source for UI-GUIDELINE and IMPLEMENTATION_PLAN.
