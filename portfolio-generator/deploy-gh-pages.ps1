# PowerShell script to deploy Vite app to GitHub Pages
# Usage: Run this script from the portfolio-generator directory

# 1. Build the project
npm run build

# 2. Move to the dist directory
cd dist

# 3. Initialize a new git repo and push to gh-pages branch

git init
git checkout -b gh-pages
git add .
git commit -m "Deploy to GitHub Pages"
git remote add origin https://github.com/Vkthakur25/Portfolio_Generator.git
git push -f origin gh-pages

# 4. Clean up
cd ..
Remove-Item -Recurse -Force dist\.git
