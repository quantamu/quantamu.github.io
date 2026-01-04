# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

QuantA&M website - A React-based single-page application for Texas A&M's quantum computing student organization. The site provides information about the club, events, officers, resources, and newsletters. Built with Create React App and deployed to GitHub Pages at https://quantamu.github.io.

## Development Commands

```bash
# Development
npm start              # Run dev server at http://localhost:3000

# Testing
npm test              # Run tests in interactive watch mode
npm test -- --coverage # Run tests with coverage report

# Building & Deployment
npm run build         # Production build to /build folder
npm run deploy        # Build and deploy to GitHub Pages (runs predeploy automatically)
```

## Architecture

### Routing & Navigation
- Uses **HashRouter** (not BrowserRouter) for GitHub Pages compatibility
- All routes defined in `src/App.js`
- Navigation handled by react-router-dom v7
- Routes: `/`, `/about`, `/calendar`, `/officers`, `/resources`, `/newsletter`

### Page Components Structure
- **App.js**: Main router component with inline Home component
- **Page components** (About, Calendar, Officers, Newsletter, Resources) are top-level files in `/src`
- **Shared components** in `/src/components/`:
  - `Header.js` - Fixed navbar with responsive collapse
  - `footer.js` - Site-wide footer
  - `ScrollingCarousel.js` - Animated carousel on home page

### Data Architecture
- **Resources**: Fetches from `/public/resources.json` - a structured JSON file with categories containing resources (PDFs in `/public/resources/` or external links)
- **Newsletters**: Fetches from external Sheet2API endpoint (Google Sheets integration)
- **Officers**: Data is typically hardcoded in the Officers component (check the component for current implementation)

### Custom Hooks
- `useBootstrapBreakpoint.js` - Returns current Bootstrap breakpoint (xs/sm/md/lg/xl/xxl), window dimensions, and device type helpers (isMobile, isTablet, isDesktop)

### Styling
- Bootstrap 5 for responsive grid and components
- Custom CSS files colocated with components/pages
- Uses CSS custom properties for theming
- `ReactRotatingText.css` for animated text effects

## Key Implementation Details

### HashRouter Requirement
This project MUST use HashRouter, not BrowserRouter, because it's deployed to GitHub Pages. Changing this will break deployed navigation.

### Resources System
To add new resources, edit `/public/resources.json`:
- Resources are grouped by category
- Each resource has: title, date (YYYY-MM-DD), type ("pdf" or "link")
- PDF type uses `file` property (filename in `/public/resources/`)
- Link type uses `url` property (external URL)
- Resources auto-sort by date (most recent first)

### Newsletter Integration
Uses Sheet2API to fetch newsletter data from a Google Sheet. The API endpoint is hardcoded in Newsletter.js. Each newsletter entry should have a Number and Link property.

### Responsive Design
- Bootstrap grid system throughout
- Custom breakpoint hook for conditional rendering
- Mobile-first approach with navbar collapse on small screens

## Dependencies

### Core
- React 19.0.0 with React Router DOM 7.1.1
- Bootstrap 5.3.7 + react-bootstrap 2.10.10
- HashRouter for GitHub Pages compatibility

### UI/Animation
- anime.js 4.1.2 - Animation library
- react-rotating-text 1.4.1 - Rotating text effects
- @emotion/react 11.14.0 - CSS-in-JS

### Build/Deploy
- react-scripts 5.0.1 (Create React App)
- gh-pages 6.3.0 - GitHub Pages deployment

## Deployment

The site deploys to GitHub Pages via the `npm run deploy` command which:
1. Runs `npm run build` (predeploy script)
2. Pushes the `/build` folder to the `gh-pages` branch

Homepage is configured in package.json as `https://quantamu.github.io`.
