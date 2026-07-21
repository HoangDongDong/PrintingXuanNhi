---
name: Precision Print System
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#464652'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#777683'
  outline-variant: '#c7c5d4'
  surface-tint: '#4f54b4'
  primary: '#15157d'
  on-primary: '#ffffff'
  primary-container: '#2e3192'
  on-primary-container: '#9da1ff'
  inverse-primary: '#c0c1ff'
  secondary: '#a04100'
  on-secondary: '#ffffff'
  secondary-container: '#fe6b00'
  on-secondary-container: '#572000'
  tertiary: '#002f2b'
  on-tertiary: '#ffffff'
  tertiary-container: '#004742'
  on-tertiary-container: '#2fbdb2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#04006d'
  on-primary-fixed-variant: '#373a9b'
  secondary-fixed: '#ffdbcc'
  secondary-fixed-dim: '#ffb693'
  on-secondary-fixed: '#351000'
  on-secondary-fixed-variant: '#7a3000'
  tertiary-fixed: '#76f7eb'
  tertiary-fixed-dim: '#56dacf'
  on-tertiary-fixed: '#00201e'
  on-tertiary-fixed-variant: '#00504b'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
  deep-navy: '#2E3192'
  vibrant-orange: '#FF6B00'
  error-red: '#DD3333'
  ink-black: '#1A1A1A'
  paper-white: '#FFFFFF'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 16px
---

## Brand & Style

This design system is built for a modern, professional printing service company. The brand personality is rooted in reliability, technical precision, and creative efficiency. It seeks to evoke a sense of professional trust and seamless execution, positioning the service as a high-end partner for both corporate and creative clients.

The chosen style is **Minimalism** with a focus on high-quality utility. By utilizing expansive whitespace, the interface mirrors the clean slate of a fresh print medium. The aesthetic is "Surgical & Sophisticated"—every element has a purpose, avoiding unnecessary decoration to ensure the user's focus remains on the print products and the ordering process. Smooth transitions and subtle depth effects create a premium UI/UX experience that feels as tactile as high-quality paper stock.

## Colors

The palette is anchored by **Deep Navy (#2E3192)**, which represents the stability and "ink-on-paper" heritage of the printing industry. This primary color is used for navigation, headings, and core brand elements to instill confidence.

**Vibrant Orange (#FF6B00)** serves as the high-visibility accent color. It is reserved exclusively for Call to Action (CTA) elements, ensuring they pop against the minimalist backdrop and guide users toward conversion points like "Order Now" or "Upload File."

The background remains **Paper White (#FFFFFF)** to maintain maximum legibility and a clean, airy feel. **Ink Black (#1A1A1A)** is used for body text to ensure high contrast, while a very light neutral gray is used for subtle section separators and disabled states.

## Typography

This design system utilizes a dual-font strategy to balance impact with readability. **Montserrat** is used for headlines; its geometric construction feels modern and architectural, echoing the precision of printing machinery. **Hanken Grotesk** is selected for body text and labels for its exceptional legibility and professional, contemporary tone.

Headlines should use tighter letter-spacing to appear more cohesive, while labels use slightly increased tracking for clarity in functional areas. Hierarchy is strictly maintained through clear weight differences, ensuring that even information-dense pricing tables remain scannable.

## Layout & Spacing

The layout follows a **Fluid Grid** philosophy within a capped container width of 1200px. This ensures that the professional aesthetic remains intact on ultra-wide monitors while staying accessible on smaller devices.

The system relies on an 8px rhythmic scale. Generous whitespace is a core requirement; sections should be separated by large vertical gaps (80px–120px) to allow the "Minimalist" brand personality to breathe. On mobile, margins reduce to 16px to maximize the utility of the screen real estate, while desktop layouts leverage 64px margins to create a high-end, editorial feel. Content reflow should prioritize vertical stacking for product grids and horizontal scrolling for category chips on smaller screens.

## Elevation & Depth

To maintain a "smooth" and modern feel, the design system utilizes **Ambient Shadows** and **Tonal Layers**. Depth is used sparingly but effectively to indicate interactivity and hierarchy.

- **Level 1 (Surface):** Default background state, flat and clean.
- **Level 2 (Product Cards):** Uses an extremely soft, diffused shadow (Blur: 20px, Y: 8, Opacity: 4%) with a slight Deep Navy tint. This makes cards appear to float gently above the surface.
- **Level 3 (Interactive/Hover):** On hover, shadows should expand and slightly deepen, while the element lifts (TranslateY: -4px) to provide tactile feedback.
- **Overlays:** Modals and dropdowns use a subtle backdrop blur (8px) combined with a Level 3 shadow to create a sophisticated "Glassmorphism Lite" effect without sacrificing professional clarity.

## Shapes

The shape language is defined by **Soft (Level 1)** roundedness. Elements like buttons and input fields use a 0.25rem (4px) corner radius. This "subtle roundness" strikes the perfect balance between the approachability of a service business and the rigid precision of the printing industry. 

Large containers and product cards should use `rounded-lg` (8px) to soften their presence against the grid. This geometric consistency ensures that the UI feels cohesive and intentionally designed, avoiding the coldness of sharp corners while maintaining a professional edge.

## Components

### Buttons
- **Primary:** Solid Deep Navy with white text. High-contrast, for primary navigation.
- **CTA:** Solid Vibrant Orange with white text. Used only for "Order," "Checkout," or "Upload" actions.
- **Secondary:** Outlined Deep Navy with a 1px border.
- **Interaction:** All buttons feature a 200ms ease-in-out transition on hover, involving a slight darkening of the background color and the Level 3 elevation lift.

### Product Cards
Cards are the centerpiece of the shop. They feature a generous internal padding (24px), a Level 2 shadow, and high-quality product imagery. Titles are set in Montserrat (Headline-sm) and prices in Hanken Grotesk (Body-lg Bold).

### Input Fields
Inputs are minimal: a 1px light gray border that transitions to Deep Navy on focus. Labels are placed above the field in Hanken Grotesk (Label-sm) using a medium-gray color to stay secondary to the input text itself.

### Chips & Tags
Used for categories (e.g., "Business Cards," "Large Format"). These are pill-shaped with a light-blue background and Deep Navy text, providing a soft contrast to the rectangular grid of the product cards.

### File Upload Zone
A specialized component featuring a dashed 2px border in Deep Navy, a centered icon, and a clear "Drag & Drop" instruction. This area should use a subtle Tonal Layer (very light gray background) to distinguish it from the standard page background.