#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting Next.js Frontend Rebuild...${NC}"

# Step 1: Create new Next.js app
echo -e "${GREEN}Step 1: Creating Next.js app...${NC}"
npx create-next-app@latest next-frontend --typescript --tailwind --app --no-src-dir --import-alias "@/*" --yes

cd next-frontend

# Step 2: Install dependencies
echo -e "${GREEN}Step 2: Installing dependencies...${NC}"
npm install recharts@2.15.4 lucide-react class-variance-authority clsx tailwind-merge axios --legacy-peer-deps
npm install @radix-ui/react-slot @radix-ui/react-checkbox @radix-ui/react-label @radix-ui/react-dropdown-menu @radix-ui/react-separator @radix-ui/react-dialog --legacy-peer-deps

# Step 3: Create directory structure
echo -e "${GREEN}Step 3: Creating directory structure...${NC}"
mkdir -p components/ui
mkdir -p components/Layoutpage
mkdir -p lib
mkdir -p "app/(dashboard)/home"
mkdir -p app/login
mkdir -p app/register

echo -e "${BLUE}Basic structure created! Now creating files...${NC}"