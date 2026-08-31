# Push Project to GitHub

## Goal
Connect Lovable's built-in GitHub two-way sync and push the current Maison Aurelle codebase to a GitHub repository.

## Background
Lovable has a native GitHub integration (Git sync) that creates a private repository and keeps it in sync automatically. This is a project-level connection configured in the Lovable editor, not a code change inside the app.

## Steps

1. **Open Git settings in Lovable**
   - In the editor, go to Project Settings > Git > GitHub.
   - Check if a connection already exists; if not, proceed to add one.

2. **Authorize GitHub**
   - Click Add connection / Connect to GitHub.
   - Authorize the Lovable GitHub App for the desired GitHub account or organization.

3. **Create or link repository**
   - Choose the account/organization where the repo should live.
   - Lovable will create a new private repository (this is the supported flow; importing an existing repo is not currently supported).
   - Confirm the connection.

4. **Initial push and ongoing sync**
   - Lovable will push the current codebase to the new repository.
   - Future changes made in Lovable push to GitHub, and commits pushed to the linked branch sync back into Lovable.

5. **Verify**
   - Open the linked GitHub repository in the browser and confirm the latest files, commit history, and branch are present.

## Notes and alternatives
- If the goal is a one-time export only (not ongoing sync), use Project Settings > Git > Download codebase instead, then create a local or manual GitHub repo.
- If the user wants the app to call the GitHub REST API (e.g., for automations or dashboards), that requires a separate GitHub connector, not Git sync. This is not part of this plan.
- If Git sync is already connected and the user wants to update the repo, they only need to ensure changes are saved in Lovable; sync happens automatically.

## Outcome
Project code is available on GitHub with continuous two-way sync enabled between Lovable and the repository.
