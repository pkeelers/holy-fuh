#!/bin/bash

echo "🔍 Verifying Rosalina Glow Project Structure..."
echo ""

ERRORS=0
WARNINGS=0

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} $1 exists"
    else
        echo -e "${RED}❌${NC} $1 MISSING"
        ((ERRORS++))
    fi
}

# Function to check directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅${NC} $1/ directory exists"
    else
        echo -e "${RED}❌${NC} $1/ directory MISSING"
        ((ERRORS++))
    fi
}

# Function to warn about wrong file names
warn_file() {
    if [ -f "$1" ]; then
        echo -e "${YELLOW}⚠️${NC}  $1 exists (should be $2)"
        ((WARNINGS++))
    fi
}

echo "📁 Checking Directory Structure..."
check_dir "src"
check_dir "public"
echo ""

echo "📄 Checking Source Files (must be in src/)..."
check_file "src/App.jsx"
check_file "src/main.jsx"
check_file "src/index.css"
echo ""

echo "⚙️  Checking Configuration Files (must be in root)..."
check_file "package.json"
check_file "vite.config.js"
check_file "postcss.config.js"
check_file "tailwind.config.js"
check_file "vercel.json"
check_file ".nvmrc"
check_file ".gitignore"
check_file ".eslintrc.cjs"
check_file "index.html"
echo ""

echo "🚨 Checking for Common Mistakes..."
warn_file "postcss_config.js" "postcss.config.js"
warn_file "tailwind_config.js" "tailwind.config.js"
warn_file "vite_config.js" "vite.config.js"
warn_file "_nvmrc" ".nvmrc"
warn_file "_gitignore" ".gitignore"
warn_file "App.jsx" "src/App.jsx"
warn_file "main.jsx" "src/main.jsx"
warn_file "index.css" "src/index.css"
echo ""

echo "📦 Checking package.json..."
if [ -f "package.json" ]; then
    if grep -q '"vite"' package.json; then
        echo -e "${GREEN}✅${NC} Vite found in package.json"
    else
        echo -e "${RED}❌${NC} Vite NOT found in package.json"
        ((ERRORS++))
    fi
    
    if grep -q '"react"' package.json; then
        echo -e "${GREEN}✅${NC} React found in package.json"
    else
        echo -e "${RED}❌${NC} React NOT found in package.json"
        ((ERRORS++))
    fi
fi
echo ""

echo "🔧 Checking vercel.json..."
if [ -f "vercel.json" ]; then
    if grep -q '"dist"' vercel.json; then
        echo -e "${GREEN}✅${NC} Output directory set to 'dist'"
    else
        echo -e "${YELLOW}⚠️${NC}  Output directory might not be set correctly"
        ((WARNINGS++))
    fi
fi
echo ""

echo "📊 SUMMARY"
echo "=========================================="
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}🎉 PERFECT!${NC} Your project is ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Run: npm install"
    echo "2. Run: npm run build"
    echo "3. Run: npm run preview (to test)"
    echo "4. Deploy to Vercel!"
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  WARNINGS:${NC} $WARNINGS warnings found"
    echo "You should fix the warnings, but deployment might still work."
else
    echo -e "${RED}❌ ERRORS:${NC} $ERRORS errors found"
    if [ $WARNINGS -gt 0 ]; then
        echo -e "${YELLOW}⚠️  WARNINGS:${NC} $WARNINGS warnings found"
    fi
    echo ""
    echo "❗ Fix these errors before deploying!"
    echo "See VERCEL_FIX.md for detailed solutions."
fi
echo "=========================================="
echo ""

exit $ERRORS
