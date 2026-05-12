# React CI/CD App 🚀

A production-ready React starter with a complete Jenkins CI/CD pipeline.

---

## Project Structure

```
react-cicd-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js / Navbar.css
│   │   └── Footer.js / Footer.css
│   ├── pages/
│   │   ├── Home.js / Home.css
│   │   ├── About.js / About.css
│   │   └── Contact.js / Contact.css
│   ├── App.js / App.css
│   ├── App.test.js
│   └── index.js / index.css
├── Jenkinsfile
├── .gitignore
└── package.json
```

---

## PART 1 — Run Locally

### Prerequisites
- Node.js v18+ → https://nodejs.org
- npm (bundled with Node.js)

### Steps

```bash
# 1. Enter the project folder
cd react-cicd-app

# 2. Install dependencies
npm install

# 3. Start the dev server
npm start
# → Opens http://localhost:3000

# 4. Run tests
npm test

# 5. Create production build
npm run build
# → Outputs to /build folder
```

---

## PART 2 — Push to GitHub

### Step 1 — Create a GitHub repository

1. Go to https://github.com → click **New repository**
2. Name it `react-cicd-app`
3. Set to **Public** (or Private)
4. Do NOT initialise with README (you already have one)
5. Click **Create repository**

### Step 2 — Push your code

```bash
# Inside the react-cicd-app directory:

git init
git add .
git commit -m "initial commit: react app with jenkinsfile"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/react-cicd-app.git
git push -u origin main
```

> Replace `<YOUR_USERNAME>` with your GitHub username.

---

## PART 3 — Jenkins CI/CD Setup

### Prerequisites on the Jenkins server
- Jenkins LTS installed and running
- Java 17+ installed
- Node.js 18+ installed (or installed via Jenkins plugin)
- Git installed

---

### Step 1 — Install Jenkins plugins

In Jenkins → **Manage Jenkins → Plugins → Available**:

Search and install these plugins:
- ✅ **NodeJS Plugin** (for Node.js tool management)
- ✅ **Git Plugin** (usually pre-installed)
- ✅ **Pipeline Plugin** (usually pre-installed)
- ✅ **GitHub Plugin** (for webhook integration)

Click **Install without restart**.

---

### Step 2 — Configure Node.js in Jenkins

1. Go to **Manage Jenkins → Global Tool Configuration**
2. Scroll to **NodeJS** section → click **Add NodeJS**
3. Set:
   - **Name**: `NodeJS-18`  ← must match the name in Jenkinsfile
   - **Version**: Select `18.x.x` from the dropdown
4. Click **Save**

---

### Step 3 — Create a new Pipeline job

1. Jenkins Dashboard → **New Item**
2. Enter name: `react-cicd-app`
3. Select **Pipeline** → click **OK**

In the job configuration:

**General tab:**
- Check ✅ **GitHub project**
- Enter your repo URL: `https://github.com/<YOUR_USERNAME>/react-cicd-app`

**Build Triggers tab:**
- Check ✅ **GitHub hook trigger for GITScm polling**

**Pipeline tab:**
- Definition: **Pipeline script from SCM**
- SCM: **Git**
- Repository URL: `https://github.com/<YOUR_USERNAME>/react-cicd-app.git`
- Branch: `*/main`
- Script Path: `Jenkinsfile`

Click **Save**.

---

### Step 4 — Set up GitHub Webhook

This tells GitHub to notify Jenkins on every push.

1. Go to your GitHub repo → **Settings → Webhooks → Add webhook**
2. Set:
   - **Payload URL**: `http://<JENKINS_SERVER_IP>:8080/github-webhook/`
   - **Content type**: `application/json`
   - **Trigger**: ✅ Just the push event
3. Click **Add webhook**

> If Jenkins is on localhost (not a public server), use **ngrok**:
> ```bash
> ngrok http 8080
> # Use the generated https URL as the webhook payload URL
> ```

---

### Step 5 — Configure Deploy Directory

Edit the `Jenkinsfile` and change the `DEPLOY_DIR` to your server's web root:

```groovy
DEPLOY_DIR = '/var/www/html/react-cicd-app'
```

Make sure the Jenkins user has write permission to this directory:

```bash
sudo chown -R jenkins:jenkins /var/www/html/react-cicd-app
```

---

### Step 6 — Trigger your first build

Option A — Manually:
- Open the job → click **Build Now**

Option B — Automatically:
```bash
git commit --allow-empty -m "trigger jenkins build"
git push origin main
```

Jenkins will:
1. Pull latest code from GitHub
2. Run `npm ci`
3. Run `npm test`
4. Run `npm run build`
5. Copy `/build` → `DEPLOY_DIR` (on main branch only)

---

## Pipeline at a Glance

```
GitHub Push → Webhook → Jenkins
                           │
                    ┌──────▼───────┐
                    │  Checkout    │
                    └──────┬───────┘
                    ┌──────▼───────┐
                    │  npm ci      │
                    └──────┬───────┘
                    ┌──────▼───────┐
                    │  npm test    │
                    └──────┬───────┘
                    ┌──────▼───────┐
                    │  npm build   │
                    └──────┬───────┘
                    ┌──────▼───────┐
                    │  Deploy      │  ← only on main branch
                    └──────────────┘
```

---

## Troubleshooting

| Issue | Fix |
|---|---|
| `NodeJS-18 not found` | Check name matches in Global Tool Config |
| Webhook not triggering | Ensure Jenkins is publicly accessible or use ngrok |
| Permission denied on deploy | `sudo chown -R jenkins:jenkins <DEPLOY_DIR>` |
| `npm ci` fails | Delete `node_modules` locally, run `npm install`, commit `package-lock.json` |
| Port 8080 blocked | Open port in firewall: `sudo ufw allow 8080` |
