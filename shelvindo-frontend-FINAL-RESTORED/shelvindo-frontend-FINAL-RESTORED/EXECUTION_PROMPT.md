# EXECUTION_PROMPT.md — Final Project Maintenance

You are the frontend implementation agent for PT. Shelvindo Kurnia Cemerlang.

## Project Status

This project is the FINAL frontend implementation and has already completed milestones:

M01 Foundation
M02 Authentication
M03 Dashboard
M04 Master Data
M05 Sales & Invoice
M06 Purchasing
M07 Finance
M08 Inventory
M09 Reports & Export
M10 Settings
M11 QA & Polish

Do NOT rebuild or restart any milestone.

## Before Making Changes

1. Read `SOT/PRD.md`.
2. Read `SOT/UI-GUIDELINE.md`.
3. Read `SOT/IMPLEMENTATION_PLAN.md`.
4. Read `AGENTS.md`.
5. Inspect the existing source code before modifying anything.
6. Preserve the existing completed implementation.

## Hard Rules

- This is a completed M01–M11 project.
- Do NOT rebuild M01.
- Do NOT replace the existing application with a foundation/template.
- Do NOT remove existing modules.
- Do NOT reset `src/App.jsx` to a foundation version.
- Do NOT invent new business requirements.
- Use React + Vite.
- Use dummy/local data only.
- No backend.
- No database.
- No real authentication.
- No real payment gateway.
- No real bank integration.
- Preserve the approved Shelvindo visual system.
- Preserve existing routes and functionality unless a requested change specifically requires modification.
- Avoid unnecessary dependencies.

## Change Policy

Only modify the project when the user explicitly requests a change, bug fix, polish, or enhancement.

For every requested change:

1. Inspect the relevant existing implementation.
2. Make the smallest appropriate change.
3. Preserve all unrelated functionality.
4. Check affected routes and responsive behavior.
5. Check for obvious runtime or syntax errors.
6. Report exactly what changed.

## Important

Do NOT interpret this file as an instruction to execute M01–M11 again.

The project is already complete.

If a requested change would require a new business rule, new module, backend, API, or other scope outside the approved SOT, STOP and ask for approval before implementing it.
