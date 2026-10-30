# IMPLEMENTATION_PLAN — React + Vite Frontend

## 1. Objective
Implement the approved PRD and UI-GUIDELINE as a frontend-only React + Vite application using dummy/local data.

## 2. Architecture
React app shell → pages → reusable components → local dummy data → hooks/utils → styles/design tokens.

## 3. Project Structure
frontend/src/{assets,components,layouts,pages,data,hooks,utils,constants,styles}; App.jsx; main.jsx.

## 4. Routing
/auth: /login, /forgot-password, /reset-password.
Core routes: dashboard, products, customers, sales, invoices, purchases, finance/cash-bank, finance/expenses, inventory, reports, settings.
Use detail/new/edit routes where defined by PRD.

## 5. Milestones
M01 Foundation
M02 Authentication
M03 Dashboard
M04 Master Data
M05 Sales & Invoice
M06 Purchase
M07 Finance
M08 Inventory
M09 Reports & Export
M10 Settings
M11 QA & Polish

## 6. Dummy Data
Separate datasets for users, products, customers, suppliers, sales, invoices, purchases, accounts, transactions, expenses, inventory, and reports. Relationships must be logically consistent.

## 7. State
Prefer local state; use Context only when justified; localStorage only when useful. Avoid large state libraries unless required.

## 8. Business Simulation
Sales → Invoice → Receivable → Cash/Bank when paid.
Purchase → Inventory + Payable.
Supplier payment → Payable - and Cash/Bank -.
All are frontend simulations.

## 9. Reports & Export
Aggregate dummy data for revenue, expenses, receivables, payables, cash flow, customer totals, supplier totals, and inventory. Export XLS and PDF from local data.

## 10. Performance
Reuse components, avoid unnecessary rerenders, minimize dependencies/assets, and avoid unnecessary recomputation.

## 11. QA
Validate navigation, forms, transaction flows, reports/export, responsive behavior, empty/loading/error/success states, and visual consistency.

## 12. Definition of Done
All approved modules work with dummy data; responsive UI; reports/export work; settings exist; no backend dependency; no scope drift.

## 13. Rules
SOT is Source of Truth. No unapproved module, business-rule change, design change, backend/API, real credentials, real financial integration, or phase skipping.
