# Assets Setup Guide

## Overview
This document explains how to add your resume PDF and profile image to the portfolio.

## File Locations & Naming

### 1. Profile Image (for Hero/Intro Section)
**Location:** `public/assets/profile.jpg`
**Fallback paths** (tried in order if primary fails):
- `public/profile.png`
- `public/assets/jaswanth-profile.jpg`
- `public/jaswanth-profile.jpg`
- `public/assets/jaswanth.jpg`
- `public/jaswanth.jpg`

**Usage:** Displayed in the Hero component card (right side of intro)
**Recommended specs:**
- Format: JPG or PNG
- Dimensions: Square (1:1 ratio recommended, minimum 400x400px)
- Size: < 500KB
- Quality: Professional headshot

### 2. Resume PDF (for Download Button)
**Location:** `public/assets/resume.pdf`
**Fallback path:**
- `public/resume.pdf`

**Usage:** Downloaded when clicking "Download CV (PDF)" button in Contact section
**Recommended specs:**
- Format: PDF
- Filename: `resume.pdf` or `Jaswanth_Kasireddi_CV.pdf`
- Size: < 2MB
- Content: Professional resume/CV

## How to Add Files

### Option A: Direct Git Upload
1. Place your files in these locations:
   ```
   public/
   ├── assets/
   │   ├── profile.jpg      (or .png)
   │   └── resume.pdf
   ```

2. Commit and push:
   ```bash
   git add public/assets/
   git commit -m "Add profile image and resume PDF"
   git push origin assets-setup
   ```

### Option B: GitHub Web UI
1. Navigate to your repository
2. Go to `public/assets/` folder
3. Click "Add file" → "Upload files"
4. Drag and drop your `profile.jpg` and `resume.pdf`
5. Commit the changes

## Component Integration

### Hero Component (src/components/Hero.tsx)
- Line 21: Initial image source set to `/assets/profile.jpg`
- Lines 24-55: Fallback logic for image loading
- Line 225-230: Image display with error handling

### Contact Section (src/components/ContactSection.tsx)
- Line 42: Resume path candidates defined
- Lines 40-74: Resume download handler with fallback logic
- Line 160-164: Download button in Contact section

## Testing Locally

1. Place files in `public/assets/`:
   ```
   public/assets/profile.jpg
   public/assets/resume.pdf
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Test profile image display:
   - Navigate to hero section
   - Image should appear in the card on the right

4. Test resume download:
   - Go to Contact section
   - Click "Download CV (PDF)" button
   - File should download as `Jaswanth_Kasireddi_CV.pdf`

## Current Status

✅ Directory structure created: `public/assets/`
⏳ Waiting for you to add:
- `public/assets/profile.jpg` (your profile image)
- `public/assets/resume.pdf` (your resume)

## Troubleshooting

**Image not showing?**
- Check file exists at `public/assets/profile.jpg`
- Verify format is JPG or PNG
- Check browser console for CORS errors
- Try alternative filename from fallback list

**Resume not downloading?**
- Check file exists at `public/assets/resume.pdf`
- Verify it's a valid PDF file
- Test download link in browser directly: `http://localhost:5173/assets/resume.pdf`

## Next Steps

1. ✅ Branch `assets-setup` created
2. ✅ Directory structure initialized
3. 📝 Add your files to `public/assets/`
4. 🔄 Merge branch to main after verification
