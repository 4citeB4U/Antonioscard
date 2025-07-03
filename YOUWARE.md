# YOUWARE.md - Always Trucking & Loading Website

## Project Overview
This is a professional trucking company website for Always Trucking & Loading LLC, serving as both a digital business card and lead generation tool. The site showcases transportation services, company information, and provides multiple contact methods for potential customers.

## Architecture & Structure

### Design System
- **Framework**: Tailwind CSS 3.4.16 (via CDN)
- **Design Approach**: Mobile-first responsive design with professional trucking industry aesthetics
- **Color Scheme**: 
  - Primary: Trucker Blue (#2c3e50)
  - Accent: Trucker Red (#c0392b) 
  - Secondary: Trucker Gray (#34495e)
- **Typography**: System fonts with clear hierarchy for business communication

### Key Components

#### Hero Section
- Full-screen background using company business card image (rx4hm6tee6.png)
- Gradient overlay for text readability
- Contact information display with Antonio's details
- Three primary CTAs: Save Contact, Get Quote, Chat with Agent Lee

#### Services Grid
- Six service categories with icons and descriptions
- Responsive grid layout (1-2-3 columns based on screen size)
- Hover effects for enhanced user interaction

#### Fleet Showcase
- Uses original business card image to show company trucks
- Overlay text highlighting fleet capabilities since 2019

#### Agent Lee Modal
- Interactive FAQ system preserved from original
- Modern modal design with backdrop blur
- Navigation buttons for different service categories
- Expandable Q&A sections

### Interactive Features

#### Contact Methods
- **Save Contact**: Generates vCard (.vcf) file for download
- **Direct calling**: tel: links for immediate phone contact  
- **Email integration**: mailto: links with pre-filled quote requests
- **Mobile responsive**: Touch-friendly buttons and navigation

#### Navigation
- Fixed header with smooth scroll navigation
- Mobile hamburger menu for smaller screens
- Scroll-triggered navbar styling changes

#### Animations
- CSS animations for page elements (fade-in, slide-up, pulse)
- Intersection Observer for scroll-triggered animations
- Hover states and transitions throughout

## Asset Management

### Images Used
- `rx4hm6tee6.png`: Main business card background image (hero and fleet sections)
- `onbfvyra4s.png`: Company logo (navigation, about section, footer)
- `1laejwfqkz.png`: Agent Lee avatar (modal interface)

### Core Functionality Preserved
- vCard contact generation with proper formatting
- Agent Lee FAQ system with categorized navigation
- All original contact information and business details

## Development Notes

### Responsive Breakpoints
- Mobile: < 768px (single column layouts)
- Tablet: 768px - 1024px (two column grids)
- Desktop: > 1024px (full three column layouts)

### JavaScript Features
- Smooth scrolling navigation
- Mobile menu toggle
- Modal management (Agent Lee)
- FAQ accordion functionality
- vCard generation and download
- Intersection Observer for animations

### Performance Considerations
- Single HTML file structure for fast loading
- Optimized image usage (reusing existing assets)
- CSS transitions over JavaScript animations where possible
- Efficient event delegation for interactive elements

## Business Context
- **Company**: Always Trucking & Loading LLC
- **Established**: 2019
- **Location**: Milwaukee, Wisconsin
- **Service Area**: All 48 continental United States
- **Primary Contact**: Antonio
- **Services**: Heavy haul transport, construction materials, commercial freight, emergency transport

This website transforms a simple business card into a comprehensive lead generation and information platform while maintaining all original functionality and contact methods.