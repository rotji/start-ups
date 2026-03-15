# GitHub Multi-Account Setup for This Project

## Overview

This project is connected to **two GitHub repositories belonging to two different accounts**:

**Main repository (primary development repo)**
[https://github.com/rotji/start-ups](https://github.com/rotji/start-ups)

**Mirror repository (secondary copy / backup)**
[https://github.com/jo3jo326/mirror-of-start-ups](https://github.com/jo3jo326/mirror-of-start-ups)

The **main repository is the source of truth**.
The **mirror repository is maintained as a secondary synchronized copy**.

All development is done locally and then pushed to both repositories.

---

# Remote Configuration

The local Git repository is connected to two remotes.

Check using:

```bash
git remote -v
```

Example configuration:

```
rotji   https://github.com/rotji/start-ups.git (fetch)
rotji   https://github.com/rotji/start-ups.git (push)
mirror  https://github.com/jo3jo326/mirror-of-start-ups.git (fetch)
mirror  https://github.com/jo3jo326/mirror-of-start-ups.git (push)
```

* **rotji** → main repository
* **mirror** → mirror repository

The mirror remote was added with:

```bash
git remote add mirror https://github.com/jo3jo326/mirror-of-start-ups.git
```

---

# Push Behavior

## Terminal Push (Recommended)

When pushing from the terminal using:

```bash
git push rotji main
```

Git automatically pushes the changes to **both repositories**.

This is the preferred method when you want to update both GitHub accounts with a single command.

---

## Visual Studio Code Push

When using the **Visual Studio Code Source Control interface** (Sync Changes / Push button):

* VS Code only pushes to the **main repository (`rotji`)**
* The mirror repository **does not update automatically**

Because of this, an additional push is required for the mirror.

---

# Updating the Mirror Repository

After pushing from VS Code, update the mirror manually with:

```bash
git push https://jo3jo326@github.com/jo3jo326/mirror-of-start-ups.git main
```

This pushes the same commits to the mirror repository.

GitHub may request authentication in the browser for the `jo3jo326` account.

---

# Recommended Daily Workflow

### Option 1 — Terminal (Single Push)

```bash
git add .
git commit -m "commit message"
git push rotji main
```

This updates **both repositories automatically**.

---

### Option 2 — Visual Studio Code Interface

1. Commit changes in VS Code
2. Click **Sync Changes / Push** (updates main repo)
3. Run the mirror push manually:

```bash
git push https://jo3jo326@github.com/jo3jo326/mirror-of-start-ups.git main
```

---

# Important Notes

* The **main repository (`rotji`) is the authoritative repository**.
* The **mirror repository should not be edited directly on GitHub**.
* All changes should be committed locally and pushed outward.
* Terminal pushes provide the **most reliable synchronization for both accounts**.

---

# Purpose of This Setup

This configuration provides:

* A **secondary backup repository**
* Redundancy across two GitHub accounts
* Manual control over synchronization
* Simple and transparent push workflow

If you want, I can also show you a **very clean documentation pattern many engineering teams use** where files like this live inside:

```
docs/infrastructure/github-setup.md
```

so that **all infrastructure decisions (GitHub, CI, deployment, etc.) stay organized** as the project grows.
