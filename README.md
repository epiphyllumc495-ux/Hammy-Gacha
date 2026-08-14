# 🐹 Hammy Gacha

A kawaii hamster capsule toy machine collecting game built with React, Vite, Tailwind CSS, and Web Audio API.

## 🚀 Deploying to GitHub Pages

This project includes a pre-configured GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys your app to GitHub Pages whenever you push to the `main` or `master` branch.

### Setup Instructions:

1. **Push your repository to GitHub**:
   - Create a new repository on GitHub.
   - Push this codebase to your `main` (or `master`) branch.

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** -> **Pages** (under Code and automation).
   - Under **Build and deployment**:
     - Change **Source** from *Deploy from a branch* to **GitHub Actions**.

3. **Run the Deployment**:
   - The deployment workflow will automatically trigger on your next push.
   - You can also trigger it manually under the **Actions** tab by selecting **Deploy to GitHub Pages** -> **Run workflow**.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
