# PropertyLend Design System
## Animation-First Design for Premium DeFi Real Estate Investment Platform

**Version**: 1.0
**Last Updated**: 2024
**Status**: MVP Specification

---

## Table of Contents

1. [Design Philosophy & Vision](#design-philosophy--vision)
2. [Brand Identity](#brand-identity)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Spacing & Layout](#spacing--layout)
6. [Grid System](#grid-system)
7. [Elevation & Depth](#elevation--depth)
8. [Component Library](#component-library)
9. [Animation System](#animation-system)
10. [Personalized Dashboard Design](#personalized-dashboard-design)
11. [Accessibility](#accessibility)
12. [Dark Mode](#dark-mode)
13. [Responsive Design](#responsive-design)
14. [Performance Guidelines](#performance-guidelines)

---

## Design Philosophy & Vision

### Core Principles

**1. Animation-First Storytelling**
PropertyLend uses animation not as decoration, but as a primary communication method. Every scroll, hover, and interaction tells part of our story—bridging traditional real estate with cutting-edge DeFi technology.

> "Don't tell users how it works. Show them through motion."

**Inspiration**: Apple product pages, where scrolling through the page feels like watching a carefully choreographed film. Each frame reveals new information through movement, creating an emotional connection with the product.

**Implementation Philosophy**:
- Animations should reduce cognitive load, not increase it
- Motion reveals hierarchy and relationships between elements
- Progressive disclosure through scroll-driven sequences
- Celebrate user achievements with delightful micro-interactions

**2. Premium Institutional Meets Modern DeFi**

We bridge two distinct worlds:
- **Traditional Finance**: Trust, stability, professionalism (Navy blues, gold accents, serif touches)
- **DeFi Innovation**: Transparency, accessibility, modern (Gradients, glassmorphism, real-time updates)

This duality is reflected in every design decision—from color choices to animation timing.

**3. Transparency Through Design**

Unlike many DeFi platforms that hide complexity, we make it beautiful:
- All fees displayed upfront with animated breakdowns
- Waterfall payment structure visualized with flowing animations
- Real-time on-chain data surfaced through elegant counters
- Smart contract events translated into user-friendly notifications

**4. Personalization & Context Awareness**

The platform adapts to each investor:
- First-time users see progressive onboarding
- Returning investors see personalized portfolios
- Wallet-specific dashboards with achievement tracking
- Contextual animations based on user journey stage

---

## Brand Identity

### Brand Positioning

**Tagline**: "Real Estate. Real Yield. Real Simple."

**Brand Attributes**:
- **Trustworthy**: Institutional-grade security and transparency
- **Innovative**: Cutting-edge DeFi technology made accessible
- **Sophisticated**: Premium aesthetic without pretension
- **Inclusive**: Low minimums ($100) democratize real estate investment

### Visual Language

**Metaphors We Use**:
- **Flowing Water**: Interest "flows" through the waterfall payment system
- **Building Blocks**: Properties and investments "stack" and "compound"
- **Growing Trees**: Earnings "grow" over time with organic animations
- **Connected Networks**: Global investors linked through blockchain

**Metaphors We Avoid**:
- Rockets/Moons (crypto-bro culture)
- Banks/Vaults (traditional finance stuffiness)
- Gambling/Risk imagery (we're serious investors)

---

## Color System

### Primary Palette

**Navy Blue** - Trust & Stability
```css
/* Primary Navy */
--navy-50:  #E8EEF5;   /* Lightest - backgrounds, hover states */
--navy-100: #C1D3E8;   /* Very light - subtle backgrounds */
--navy-200: #97B5DA;   /* Light - borders, dividers */
--navy-300: #6D98CD;   /* Medium light - secondary text */
--navy-400: #4D82C3;   /* Medium - icons, labels */
--navy-500: #2E6CB9;   /* Base - primary buttons, headers */
--navy-600: #2960AB;   /* Dark - hover states */
--navy-700: #234F98;   /* Darker - active states */
--navy-800: #1D3F85;   /* Very dark - text on light */
--navy-900: #0A2540;   /* Deepest - primary text, dark backgrounds */

/* Usage */
--color-primary: var(--navy-500);
--color-primary-hover: var(--navy-600);
--color-primary-active: var(--navy-700);
--color-text-primary: var(--navy-900);
--color-text-secondary: var(--navy-600);
```

**Gold** - Premium & Success
```css
/* Premium Gold */
--gold-50:  #FEF9E7;   /* Lightest - subtle highlights */
--gold-100: #FCF0C8;   /* Very light - backgrounds */
--gold-200: #FAE7A5;   /* Light - accents */
--gold-300: #F8DD82;   /* Medium light - borders */
--gold-400: #F6D669;   /* Medium - icons */
--gold-500: #F4CE50;   /* Base - primary gold */
--gold-600: #D4AF37;   /* True gold - main accent */
--gold-700: #B8860B;   /* Dark gold - hover */
--gold-800: #9A7208;   /* Darker - active */
--gold-900: #7C5E06;   /* Deepest - shadows */

/* Usage */
--color-accent: var(--gold-600);
--color-accent-hover: var(--gold-700);
--color-success: var(--gold-600);
```

**White & Grays** - Clarity & Space
```css
/* Neutrals */
--white: #FFFFFF;
--gray-50:  #F9FAFB;   /* Backgrounds */
--gray-100: #F3F4F6;   /* Subtle backgrounds */
--gray-200: #E5E7EB;   /* Borders */
--gray-300: #D1D5DB;   /* Input borders */
--gray-400: #9CA3AF;   /* Disabled text */
--gray-500: #6B7280;   /* Placeholder text */
--gray-600: #4B5563;   /* Secondary text */
--gray-700: #374151;   /* Body text */
--gray-800: #1F2937;   /* Headings */
--gray-900: #111827;   /* Primary text */
--black: #000000;

/* Usage */
--color-background: var(--white);
--color-surface: var(--gray-50);
--color-border: var(--gray-200);
--color-text: var(--gray-900);
```

### Semantic Colors

**Success** - Positive Returns & Achievements
```css
--success-50:  #ECFDF5;
--success-100: #D1FAE5;
--success-500: #10B981;  /* Emerald green */
--success-600: #059669;
--success-900: #064E3B;

/* Usage */
--color-success-bg: var(--success-50);
--color-success-text: var(--success-600);
--color-success-border: var(--success-500);
```

**Warning** - Caution & Attention
```css
--warning-50:  #FFFBEB;
--warning-100: #FEF3C7;
--warning-500: #F59E0B;  /* Amber */
--warning-600: #D97706;
--warning-900: #78350F;

/* Usage */
--color-warning-bg: var(--warning-50);
--color-warning-text: var(--warning-600);
--color-warning-border: var(--warning-500);
```

**Danger** - Errors & Defaults
```css
--danger-50:  #FEF2F2;
--danger-100: #FEE2E2;
--danger-500: #EF4444;  /* Red */
--danger-600: #DC2626;
--danger-900: #7F1D1D;

/* Usage */
--color-danger-bg: var(--danger-50);
--color-danger-text: var(--danger-600);
--color-danger-border: var(--danger-500);
```

**Info** - Notifications & Tips
```css
--info-50:  #EFF6FF;
--info-100: #DBEAFE;
--info-500: #3B82F6;  /* Blue */
--info-600: #2563EB;
--info-900: #1E3A8A;

/* Usage */
--color-info-bg: var(--info-50);
--color-info-text: var(--info-600);
--color-info-border: var(--info-500);
```

**DeFi Purple** - Junior Tranche & Modern Touch
```css
--purple-50:  #FAF5FF;
--purple-100: #F3E8FF;
--purple-500: #A855F7;  /* Vibrant purple */
--purple-600: #9333EA;
--purple-900: #581C87;

/* Usage - Junior tranche, high-risk products */
--color-junior: var(--purple-600);
--color-junior-bg: var(--purple-50);
```

### Gradient System

**Primary Gradient** - Hero sections, CTAs
```css
--gradient-primary: linear-gradient(
  135deg,
  var(--navy-600) 0%,
  var(--navy-800) 100%
);

/* With opacity for overlays */
--gradient-primary-overlay: linear-gradient(
  135deg,
  rgba(41, 96, 171, 0.95) 0%,
  rgba(10, 37, 64, 0.95) 100%
);
```

**Gold Gradient** - Premium features, success states
```css
--gradient-gold: linear-gradient(
  135deg,
  var(--gold-400) 0%,
  var(--gold-700) 100%
);

/* Metallic effect */
--gradient-gold-metallic: linear-gradient(
  135deg,
  #F4CE50 0%,
  #D4AF37 25%,
  #B8860B 50%,
  #D4AF37 75%,
  #F4CE50 100%
);
```

**Senior Tranche Gradient** - Conservative investment option
```css
--gradient-senior: linear-gradient(
  135deg,
  var(--navy-500) 0%,
  var(--navy-700) 100%
);
```

**Junior Tranche Gradient** - High-yield option
```css
--gradient-junior: linear-gradient(
  135deg,
  var(--purple-500) 0%,
  var(--purple-700) 100%
);
```

**Glassmorphism Backgrounds**
```css
--glass-navy: linear-gradient(
  135deg,
  rgba(46, 108, 185, 0.1) 0%,
  rgba(10, 37, 64, 0.05) 100%
);

--glass-white: linear-gradient(
  135deg,
  rgba(255, 255, 255, 0.7) 0%,
  rgba(255, 255, 255, 0.3) 100%
);
```

### Color Usage Guidelines

**Do's**:
- Use navy for primary actions and trustworthy elements
- Use gold for accents, success states, and premium features
- Use white/grays for majority of backgrounds and text
- Use semantic colors (green, red, amber) only for their intended purposes
- Maintain 4.5:1 contrast ratio for normal text, 3:1 for large text

**Don'ts**:
- Don't use more than 3 colors in a single component
- Don't use pure black (#000000) for text (use --gray-900 instead)
- Don't use color alone to convey information (pair with icons/text)
- Don't create new color variations without documenting them

---

## Typography

### Font Families

**Primary Font: Inter**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
                'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```

**Why Inter?**
- Designed specifically for screens at small sizes
- Excellent legibility at all weights
- Professional without being corporate
- Used by Stripe, GitHub, Notion (premium fintech aesthetic)
- Supports tabular numbers (critical for financial data)

**Data Font: Roboto Mono**
```css
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600;700&display=swap');

--font-mono: 'Roboto Mono', 'Courier New', Courier, monospace;
```

**Why Roboto Mono?**
- Used exclusively for numbers, percentages, addresses, transaction hashes
- Monospaced ensures aligned columns in data tables
- Nods to technical/developer aesthetic of Web3
- Clear distinction between UI text and data

**Accent Font: DM Serif Display** (Optional, use sparingly)
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');

--font-serif: 'DM Serif Display', Georgia, 'Times New Roman', serif;
```

**Why DM Serif Display?**
- Used only for hero headlines and special callouts
- Adds gravitas and premium feel
- Bridges traditional real estate with modern tech
- High-contrast serif works well at large sizes

### Type Scale

**Base Size**: 16px (1rem)
**Scale Ratio**: 1.25 (Major Third)

```css
/* Headings */
--text-xs:    0.75rem;    /* 12px - Small labels, captions */
--text-sm:    0.875rem;   /* 14px - Secondary text, helper text */
--text-base:  1rem;       /* 16px - Body text, default */
--text-lg:    1.125rem;   /* 18px - Emphasized body, large labels */
--text-xl:    1.25rem;    /* 20px - Subheadings */
--text-2xl:   1.5rem;     /* 24px - Card titles */
--text-3xl:   1.875rem;   /* 30px - Section headings */
--text-4xl:   2.25rem;    /* 36px - Page titles */
--text-5xl:   3rem;       /* 48px - Hero headings */
--text-6xl:   3.75rem;    /* 60px - Large hero headings */
--text-7xl:   4.5rem;     /* 72px - Massive hero headings (desktop only) */

/* Line Heights */
--leading-none:    1;       /* For large headings */
--leading-tight:   1.25;    /* For subheadings */
--leading-snug:    1.375;   /* For card titles */
--leading-normal:  1.5;     /* For body text */
--leading-relaxed: 1.625;   /* For long-form content */
--leading-loose:   2;       /* For spaced-out text */

/* Letter Spacing */
--tracking-tighter: -0.05em;  /* Tight headings */
--tracking-tight:   -0.025em; /* Headings */
--tracking-normal:  0;        /* Body text */
--tracking-wide:    0.025em;  /* Labels, buttons */
--tracking-wider:   0.05em;   /* All-caps text */
--tracking-widest:  0.1em;    /* Loose all-caps */

/* Font Weights */
--font-light:      300;
--font-normal:     400;
--font-medium:     500;
--font-semibold:   600;
--font-bold:       700;
--font-extrabold:  800;
--font-black:      900;
```

### Typography Hierarchy

**Display Styles** (Hero sections)
```css
.display-1 {
  font-family: var(--font-serif);
  font-size: var(--text-7xl);      /* 72px */
  font-weight: var(--font-normal); /* 400 - serifs look heavy */
  line-height: var(--leading-none);
  letter-spacing: var(--tracking-tight);
  color: var(--navy-900);
}

.display-2 {
  font-family: var(--font-primary);
  font-size: var(--text-6xl);      /* 60px */
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--navy-900);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .display-1 { font-size: var(--text-5xl); /* 48px */ }
  .display-2 { font-size: var(--text-4xl); /* 36px */ }
}
```

**Heading Styles**
```css
.heading-1 {
  font-family: var(--font-primary);
  font-size: var(--text-4xl);       /* 36px */
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--navy-900);
}

.heading-2 {
  font-family: var(--font-primary);
  font-size: var(--text-3xl);       /* 30px */
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  color: var(--navy-800);
}

.heading-3 {
  font-family: var(--font-primary);
  font-size: var(--text-2xl);       /* 24px */
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
  color: var(--navy-800);
}

.heading-4 {
  font-family: var(--font-primary);
  font-size: var(--text-xl);        /* 20px */
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  color: var(--navy-700);
}
```

**Body Styles**
```css
.body-large {
  font-family: var(--font-primary);
  font-size: var(--text-lg);        /* 18px */
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
  color: var(--gray-700);
}

.body {
  font-family: var(--font-primary);
  font-size: var(--text-base);      /* 16px */
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--gray-700);
}

.body-small {
  font-family: var(--font-primary);
  font-size: var(--text-sm);        /* 14px */
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--gray-600);
}
```

**Data Styles** (Numbers, percentages, addresses)
```css
.data-large {
  font-family: var(--font-mono);
  font-size: var(--text-5xl);       /* 48px */
  font-weight: var(--font-bold);
  line-height: var(--leading-none);
  letter-spacing: var(--tracking-tight);
  color: var(--navy-900);
  font-variant-numeric: tabular-nums;
}

.data-medium {
  font-family: var(--font-mono);
  font-size: var(--text-2xl);       /* 24px */
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--navy-800);
  font-variant-numeric: tabular-nums;
}

.data-small {
  font-family: var(--font-mono);
  font-size: var(--text-base);      /* 16px */
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  color: var(--gray-700);
  font-variant-numeric: tabular-nums;
}

.wallet-address {
  font-family: var(--font-mono);
  font-size: var(--text-sm);        /* 14px */
  font-weight: var(--font-normal);
  color: var(--gray-600);
  letter-spacing: var(--tracking-wide);
}
```

**Label & UI Styles**
```css
.label {
  font-family: var(--font-primary);
  font-size: var(--text-sm);        /* 14px */
  font-weight: var(--font-medium);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--gray-600);
}

.caption {
  font-family: var(--font-primary);
  font-size: var(--text-xs);        /* 12px */
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--gray-500);
}

.button-text {
  font-family: var(--font-primary);
  font-size: var(--text-base);      /* 16px */
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-wide);
}
```

### Typography Usage Guidelines

**Hierarchy Rules**:
1. Only one Display heading per page
2. H1 (.heading-1) should appear once per page
3. Headings should descend logically (H1 → H2 → H3, not H1 → H3)
4. Use data styles (Roboto Mono) for all numbers, percentages, APY, prices
5. Use label style for form labels and category tags

**Readability Rules**:
- Body text line length: 50-75 characters (optimal readability)
- Large text (>24px): line-height 1.25
- Body text: line-height 1.5
- Don't use all-caps for body text (labels/buttons only)
- Avoid pure black text on white (use --gray-900 instead)

---

## Spacing & Layout

### Spacing Scale

**Base Unit**: 4px
**Philosophy**: All spacing should be divisible by 4 for visual harmony

```css
--space-0:   0;
--space-px:  1px;     /* Borders only */
--space-0-5: 0.125rem; /* 2px - Tiny gaps */
--space-1:   0.25rem;  /* 4px - Base unit */
--space-1-5: 0.375rem; /* 6px */
--space-2:   0.5rem;   /* 8px - Small gaps */
--space-2-5: 0.625rem; /* 10px */
--space-3:   0.75rem;  /* 12px - Comfortable gaps */
--space-3-5: 0.875rem; /* 14px */
--space-4:   1rem;     /* 16px - Standard padding */
--space-5:   1.25rem;  /* 20px */
--space-6:   1.5rem;   /* 24px - Card padding */
--space-7:   1.75rem;  /* 28px */
--space-8:   2rem;     /* 32px - Section padding */
--space-9:   2.25rem;  /* 36px */
--space-10:  2.5rem;   /* 40px */
--space-11:  2.75rem;  /* 44px */
--space-12:  3rem;     /* 48px - Large section padding */
--space-14:  3.5rem;   /* 56px */
--space-16:  4rem;     /* 64px - Extra large gaps */
--space-20:  5rem;     /* 80px */
--space-24:  6rem;     /* 96px - Hero section padding */
--space-32:  8rem;     /* 128px */
--space-40:  10rem;    /* 160px */
--space-48:  12rem;    /* 192px */
--space-56:  14rem;    /* 224px */
--space-64:  16rem;    /* 256px */
```

### Component Spacing Patterns

**Card Padding**
```css
.card {
  padding: var(--space-6);  /* 24px */
}

.card-large {
  padding: var(--space-8);  /* 32px */
}

.card-compact {
  padding: var(--space-4);  /* 16px */
}
```

**Section Spacing**
```css
.section {
  padding-top: var(--space-20);     /* 80px */
  padding-bottom: var(--space-20);  /* 80px */
}

.section-large {
  padding-top: var(--space-32);     /* 128px */
  padding-bottom: var(--space-32);  /* 128px */
}

/* Mobile */
@media (max-width: 768px) {
  .section {
    padding-top: var(--space-12);    /* 48px */
    padding-bottom: var(--space-12); /* 48px */
  }
}
```

**Stack Spacing** (Vertical rhythm)
```css
.stack-xs > * + * { margin-top: var(--space-2);  }  /* 8px */
.stack-sm > * + * { margin-top: var(--space-4);  }  /* 16px */
.stack-md > * + * { margin-top: var(--space-6);  }  /* 24px */
.stack-lg > * + * { margin-top: var(--space-8);  }  /* 32px */
.stack-xl > * + * { margin-top: var(--space-12); }  /* 48px */
```

---

## Grid System

### Container Widths

```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);   /* 16px */
  padding-right: var(--space-4);  /* 16px */
}

/* Breakpoint-specific max-widths */
@media (min-width: 640px) {
  .container {
    max-width: 640px;
    padding-left: var(--space-6);   /* 24px */
    padding-right: var(--space-6);  /* 24px */
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
    padding-left: var(--space-8);   /* 32px */
    padding-right: var(--space-8);  /* 32px */
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;  /* Our max content width */
  }
}
```

### Responsive Breakpoints

```css
/* Mobile-first approach */
--breakpoint-sm:  640px;   /* Large phones */
--breakpoint-md:  768px;   /* Tablets */
--breakpoint-lg:  1024px;  /* Laptops */
--breakpoint-xl:  1280px;  /* Desktops */
--breakpoint-2xl: 1536px;  /* Large desktops */
```

### Grid Columns

**12-Column Grid** (Desktop)
```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6);  /* 24px */
}

.col-span-1  { grid-column: span 1 / span 1; }
.col-span-2  { grid-column: span 2 / span 2; }
.col-span-3  { grid-column: span 3 / span 3; }
.col-span-4  { grid-column: span 4 / span 4; }
.col-span-6  { grid-column: span 6 / span 6; }
.col-span-8  { grid-column: span 8 / span 8; }
.col-span-12 { grid-column: span 12 / span 12; }
```

**Common Layout Patterns**
```css
/* Two-column (50/50) */
.layout-halves {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-8);
}

/* Three-column (33/33/33) */
.layout-thirds {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

/* Sidebar layout (25/75) */
.layout-sidebar {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: var(--space-8);
}

/* Property card grid (responsive) */
.property-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-6);
}

/* Mobile: stack everything */
@media (max-width: 768px) {
  .layout-halves,
  .layout-thirds,
  .layout-sidebar {
    grid-template-columns: 1fr;
  }
}
```

---

## Elevation & Depth

### Shadow System

**Philosophy**: Shadows create hierarchy and depth without adding visual noise

```css
/* No shadow - flat elements */
--shadow-none: none;

/* Subtle elevation - cards at rest */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

/* Medium elevation - hover states, modals */
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
             0 2px 4px -1px rgba(0, 0, 0, 0.06);

/* High elevation - dropdowns, tooltips */
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
             0 4px 6px -2px rgba(0, 0, 0, 0.05);

/* Very high elevation - modals, popups */
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
             0 10px 10px -5px rgba(0, 0, 0, 0.04);

/* Maximum elevation - fullscreen overlays */
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Inner shadow - input fields */
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
```

**Colored Shadows** (For emphasis)
```css
/* Navy glow (primary buttons, navy cards) */
--shadow-navy: 0 10px 15px -3px rgba(10, 37, 64, 0.3),
               0 4px 6px -2px rgba(10, 37, 64, 0.2);

/* Gold glow (success states, premium features) */
--shadow-gold: 0 10px 15px -3px rgba(212, 175, 55, 0.4),
               0 4px 6px -2px rgba(212, 175, 55, 0.3);

/* Purple glow (junior tranche) */
--shadow-purple: 0 10px 15px -3px rgba(168, 85, 247, 0.3),
                 0 4px 6px -2px rgba(168, 85, 247, 0.2);
```

### Border Radius

```css
--radius-none: 0;
--radius-sm:   0.125rem;  /* 2px - Subtle rounding */
--radius-md:   0.25rem;   /* 4px - Input fields */
--radius-lg:   0.5rem;    /* 8px - Buttons, small cards */
--radius-xl:   0.75rem;   /* 12px - Cards */
--radius-2xl:  1rem;      /* 16px - Large cards */
--radius-3xl:  1.5rem;    /* 24px - Hero elements */
--radius-full: 9999px;    /* Full circle - badges, avatars */
```

**Usage**:
- Buttons: `--radius-lg` (8px)
- Cards: `--radius-xl` (12px)
- Property images: `--radius-2xl` (16px)
- Modals: `--radius-2xl` (16px)
- Input fields: `--radius-md` (4px)
- Badges: `--radius-full`

### Glassmorphism Effects

**Frosted Glass** (Modals, overlays)
```css
.glass {
  background: var(--glass-white);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: var(--shadow-xl);
}

.glass-dark {
  background: var(--glass-navy);
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(46, 108, 185, 0.2);
  box-shadow: var(--shadow-xl);
}
```

---

## Component Library

### Buttons

#### Primary Button
**Use**: Main CTAs, investment actions, wallet connection

```css
.button-primary {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);  /* 12px 24px */
  gap: var(--space-2);  /* 8px gap between icon & text */

  /* Typography */
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);

  /* Appearance */
  background: var(--gradient-primary);
  color: var(--white);
  border: none;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);

  /* Interaction */
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* States */
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg), var(--shadow-navy);
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }

  &:focus-visible {
    outline: 2px solid var(--navy-500);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: var(--shadow-sm);
  }
}

/* Large variant */
.button-primary-lg {
  padding: var(--space-4) var(--space-8);  /* 16px 32px */
  font-size: var(--text-lg);
}

/* Small variant */
.button-primary-sm {
  padding: var(--space-2) var(--space-4);  /* 8px 16px */
  font-size: var(--text-sm);
}
```

**Animation Enhancement**:
```css
/* Add magnetic effect on hover (advanced) */
.button-primary {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: var(--radius-lg);
    background: var(--gradient-gold);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover::before {
    opacity: 0.3;
    animation: pulse-glow 2s ease-in-out infinite;
  }
}

@keyframes pulse-glow {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.05); opacity: 0.5; }
}
```

#### Secondary Button
**Use**: Less important actions, cancel buttons

```css
.button-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  gap: var(--space-2);

  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);

  background: var(--white);
  color: var(--navy-700);
  border: 2px solid var(--navy-300);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);

  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: var(--navy-50);
    border-color: var(--navy-500);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }

  &:focus-visible {
    outline: 2px solid var(--navy-500);
    outline-offset: 2px;
  }
}
```

#### Ghost Button
**Use**: Tertiary actions, inline links

```css
.button-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  gap: var(--space-2);

  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);

  background: transparent;
  color: var(--navy-600);
  border: none;
  border-radius: var(--radius-lg);

  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: var(--navy-50);
    color: var(--navy-700);
  }

  &:active {
    background: var(--navy-100);
  }
}
```

#### Gold Accent Button
**Use**: Premium features, success CTAs

```css
.button-gold {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  gap: var(--space-2);

  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  letter-spacing: var(--tracking-wider);

  background: var(--gradient-gold);
  color: var(--navy-900);
  border: none;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md), var(--shadow-gold);

  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: var(--shadow-xl), var(--shadow-gold);
  }
}
```

### Cards

#### Base Card
**Use**: Default container for content

```css
.card {
  /* Layout */
  padding: var(--space-6);

  /* Appearance */
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);

  /* Interaction */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: var(--navy-200);
    box-shadow: var(--shadow-md);
    transform: translateY(-4px);
  }
}
```

#### Property Card
**Use**: Property listings with 3D tilt effect

```css
.property-card {
  /* Layout */
  position: relative;
  padding: 0;
  overflow: hidden;

  /* Appearance */
  background: var(--white);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-md);

  /* 3D Transform */
  transform-style: preserve-3d;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: var(--shadow-xl);
  }
}

.property-card__image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;

  /* Subtle zoom on hover */
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  .property-card:hover & {
    transform: scale(1.05);
  }
}

.property-card__content {
  padding: var(--space-6);

  /* Pop out effect */
  transform: translateZ(20px);
}

.property-card__badge {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  padding: var(--space-2) var(--space-3);

  background: var(--glass-white);
  backdrop-filter: blur(8px);
  border-radius: var(--radius-full);

  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--navy-700);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);

  /* Pop out more than content */
  transform: translateZ(40px);
}
```

#### Tranche Card
**Use**: Senior/Junior investment options

```css
.tranche-card {
  position: relative;
  padding: var(--space-8);

  /* Senior vs Junior variants */
  &--senior {
    background: var(--gradient-senior);
    border: 2px solid var(--navy-400);
  }

  &--junior {
    background: var(--gradient-junior);
    border: 2px solid var(--purple-400);
  }

  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
  color: var(--white);

  /* 3D tilt + scale on hover */
  transform-style: preserve-3d;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: var(--shadow-2xl);
  }

  /* Accent line at top */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-gold);
    border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
  }
}

.tranche-card__apy {
  font-family: var(--font-mono);
  font-size: var(--text-6xl);
  font-weight: var(--font-bold);
  line-height: 1;

  /* Pop out with translateZ */
  transform: translateZ(30px);
}

.tranche-card__features {
  margin-top: var(--space-6);

  /* Subtle inward depth */
  transform: translateZ(10px);
}
```

### Inputs & Forms

#### Text Input
```css
.input {
  /* Layout */
  width: 100%;
  padding: var(--space-3) var(--space-4);

  /* Typography */
  font-family: var(--font-primary);
  font-size: var(--text-base);
  color: var(--gray-900);

  /* Appearance */
  background: var(--white);
  border: 2px solid var(--gray-300);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-inner);

  /* Interaction */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::placeholder {
    color: var(--gray-400);
  }

  &:hover {
    border-color: var(--navy-300);
  }

  &:focus {
    outline: none;
    border-color: var(--navy-500);
    box-shadow: 0 0 0 3px rgba(46, 108, 185, 0.1);
  }

  &:disabled {
    background: var(--gray-100);
    cursor: not-allowed;
    opacity: 0.6;
  }

  &--error {
    border-color: var(--danger-500);

    &:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  }
}
```

#### Number Input (For Investment Amounts)
```css
.input-amount {
  /* Extends .input */
  font-family: var(--font-mono);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  text-align: right;
  padding: var(--space-4) var(--space-6);

  /* Remove number spinner */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
  }
}

.input-amount-wrapper {
  position: relative;

  &::before {
    content: '$';
    position: absolute;
    left: var(--space-6);
    top: 50%;
    transform: translateY(-50%);

    font-family: var(--font-mono);
    font-size: var(--text-2xl);
    font-weight: var(--font-semibold);
    color: var(--gray-400);
    pointer-events: none;
  }
}
```

#### Slider (For Amount Selection)
```css
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: var(--radius-full);
  background: linear-gradient(
    to right,
    var(--navy-500) 0%,
    var(--navy-500) var(--value, 50%),
    var(--gray-200) var(--value, 50%),
    var(--gray-200) 100%
  );
  outline: none;

  /* Thumb */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--gradient-gold);
    cursor: pointer;
    box-shadow: var(--shadow-lg), var(--shadow-gold);
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.2);
      box-shadow: var(--shadow-xl), var(--shadow-gold);
    }
  }

  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 50%;
    background: var(--gradient-gold);
    cursor: pointer;
    box-shadow: var(--shadow-lg), var(--shadow-gold);

    &:hover {
      transform: scale(1.2);
    }
  }
}
```

### Badges & Tags

#### Status Badge
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1-5);
  padding: var(--space-1-5) var(--space-3);

  font-family: var(--font-primary);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  line-height: 1;

  border-radius: var(--radius-full);

  /* Variants */
  &--success {
    background: var(--success-50);
    color: var(--success-700);
    border: 1px solid var(--success-200);
  }

  &--warning {
    background: var(--warning-50);
    color: var(--warning-700);
    border: 1px solid var(--warning-200);
  }

  &--danger {
    background: var(--danger-50);
    color: var(--danger-700);
    border: 1px solid var(--danger-200);
  }

  &--info {
    background: var(--info-50);
    color: var(--info-700);
    border: 1px solid var(--info-200);
  }

  &--gold {
    background: var(--gradient-gold-metallic);
    color: var(--navy-900);
    border: 1px solid var(--gold-700);
    box-shadow: var(--shadow-sm), var(--shadow-gold);
  }
}

.badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;

  /* Pulse animation for "active" states */
  &--pulse {
    animation: pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

### Modals & Overlays

#### Modal Base
```css
.modal-overlay {
  /* Fullscreen overlay */
  position: fixed;
  inset: 0;
  z-index: 1000;

  /* Appearance */
  background: rgba(10, 37, 64, 0.75);
  backdrop-filter: blur(4px);

  /* Center content */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);

  /* Animation */
  animation: fade-in 0.3s ease-out;
}

.modal {
  /* Layout */
  position: relative;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;

  /* Appearance */
  background: var(--white);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-2xl);

  /* Animation */
  animation: slide-up 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal__header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--gray-200);

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--navy-900);
}

.modal__close {
  /* Reset button styles */
  appearance: none;
  background: none;
  border: none;
  padding: var(--space-2);

  /* Icon */
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);

  color: var(--gray-500);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--gray-100);
    color: var(--gray-700);
  }
}

.modal__body {
  padding: var(--space-6);
}

.modal__footer {
  padding: var(--space-6);
  border-top: 1px solid var(--gray-200);

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-3);
}

/* Modal Animations */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(32px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

#### Wallet Connect Modal
```css
.wallet-modal {
  /* Extends .modal */
  max-width: 480px;
}

.wallet-option {
  /* Layout */
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  width: 100%;

  /* Appearance */
  background: var(--white);
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-xl);

  /* Typography */
  font-family: var(--font-primary);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--navy-800);
  text-align: left;

  /* Interaction */
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: var(--navy-500);
    background: var(--navy-50);
    transform: translateX(8px);
    box-shadow: var(--shadow-md);
  }

  &:active {
    transform: translateX(4px) scale(0.98);
  }
}

.wallet-option__icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  object-fit: contain;
}

.wallet-option__label {
  flex: 1;
}

.wallet-option__status {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--gray-500);
}
```

### Toasts & Notifications

#### Toast Base
```css
.toast {
  /* Layout */
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  z-index: 2000;

  min-width: 320px;
  max-width: 480px;
  padding: var(--space-4) var(--space-5);

  /* Appearance */
  background: var(--white);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);

  /* Animation */
  animation: slide-in-right 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  /* Auto-dismiss */
  &.toast--dismissing {
    animation: slide-out-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.toast__content {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.toast__icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;

  /* Variant colors */
  .toast--success & { color: var(--success-600); }
  .toast--error & { color: var(--danger-600); }
  .toast--warning & { color: var(--warning-600); }
  .toast--info & { color: var(--navy-600); }
}

.toast__body {
  flex: 1;
}

.toast__title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--gray-900);
  margin-bottom: var(--space-1);
}

.toast__message {
  font-size: var(--text-sm);
  color: var(--gray-600);
}

.toast__close {
  flex-shrink: 0;
  appearance: none;
  background: none;
  border: none;
  padding: var(--space-1);

  color: var(--gray-400);
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: var(--gray-700);
  }
}

/* Toast Animations */
@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-out-right {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
```

#### Earnings Toast (Special)
```css
.toast-earnings {
  /* Extends .toast */
  background: var(--gradient-gold);
  border: 2px solid var(--gold-700);
  box-shadow: var(--shadow-xl), var(--shadow-gold);
  color: var(--navy-900);

  /* Confetti background */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/confetti-pattern.svg');
    opacity: 0.1;
    pointer-events: none;
  }
}

.toast-earnings__amount {
  font-family: var(--font-mono);
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  line-height: 1;

  /* Pulse animation */
  animation: pulse-scale 1s ease-out;
}

@keyframes pulse-scale {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
```

---

## Animation System

### Core Animation Principles

**1. Purpose Over Decoration**
Every animation must serve a functional purpose:
- **Feedback**: Confirm user actions (button clicks, form submissions)
- **Hierarchy**: Guide attention to important elements
- **Relationships**: Show how elements connect (waterfall payments)
- **Transition**: Smooth state changes (loading → success)
- **Delight**: Celebrate achievements (first investment, milestones)

**2. Performance First**
- Target: 60fps (16.67ms per frame)
- Use CSS transforms (translate, scale, rotate) over position changes
- Avoid animating expensive properties (width, height, top, left)
- Use `will-change` sparingly and remove after animation
- Leverage GPU acceleration with `transform: translateZ(0)`

**3. Timing & Easing**

**Standard Durations**:
```css
--duration-fast:    150ms;  /* Micro-interactions, hovers */
--duration-normal:  300ms;  /* Standard transitions */
--duration-slow:    500ms;  /* Complex animations */
--duration-slower:  700ms;  /* Page transitions */
--duration-slowest: 1000ms; /* Hero animations, celebrations */
```

**Easing Functions**:
```css
/* Built-in */
--ease-linear:     linear;
--ease-in:         cubic-bezier(0.4, 0, 1, 1);
--ease-out:        cubic-bezier(0, 0, 0.2, 1);
--ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);

/* Custom (from Apple, Stripe) */
--ease-smooth:     cubic-bezier(0.43, 0.13, 0.23, 0.96);
--ease-bounce:     cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-spring:     cubic-bezier(0.175, 0.885, 0.32, 1.275);

/* Usage */
transition: all var(--duration-normal) var(--ease-smooth);
```

**When to Use Each**:
- **linear**: Progress bars, loaders
- **ease-out**: Elements entering (modals, toasts)
- **ease-in**: Elements exiting (close animations)
- **ease-in-out**: State changes, toggles
- **ease-smooth**: Hover effects, button interactions
- **ease-bounce**: Success celebrations, badge unlocks
- **ease-spring**: Playful micro-interactions

### Animation Categories

#### 1. Scroll-Driven Animations

**Technology**: GSAP ScrollTrigger

**Hero Canvas Sequence** (Apple-style)
```javascript
// Configuration
const canvasSequence = {
  totalFrames: 120,
  imagePattern: '/animations/property-build/frame-{number}.webp',
  imageQuality: 'high', // or 'low' for mobile
  pinDuration: 3000, // px to scroll
};

// Implementation pseudocode
ScrollTrigger.create({
  trigger: '.hero-canvas-section',
  start: 'top top',
  end: `+=${canvasSequence.pinDuration}`,
  pin: true,
  scrub: 1, // Smooth scrubbing
  onUpdate: (self) => {
    const frameIndex = Math.floor(self.progress * canvasSequence.totalFrames);
    renderCanvasFrame(frameIndex);
  },
});

// Canvas rendering
function renderCanvasFrame(index) {
  const image = preloadedImages[index];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}
```

**Visual Specs**:
- Frame size: 2048x1024px (desktop), 1024x768px (mobile)
- Format: WebP (optimal compression)
- Frame count: 120 frames
- Total scroll: 3000px (25px per frame)
- Content: 3D property model that "builds" from foundation to completion

**Progressive Disclosure Sections**
```javascript
// Fade in + slide up as elements enter viewport
gsap.utils.toArray('.fade-in-section').forEach((section) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1,
      toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 60,
    duration: 0.8,
    ease: 'power2.out',
  });
});
```

**Parallax Effects**
```javascript
// Background moves slower than foreground
gsap.to('.parallax-bg', {
  scrollTrigger: {
    trigger: '.parallax-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
  y: (i, target) => {
    // Move at 50% scroll speed
    return -ScrollTrigger.maxScroll(window) * 0.5;
  },
  ease: 'none',
});
```

**Number Counter Triggers**
```javascript
// Animate numbers when they enter viewport
ScrollTrigger.create({
  trigger: '.stat-counter',
  start: 'top 75%',
  once: true, // Only animate once
  onEnter: () => {
    animateCounter({
      element: '.stat-counter',
      start: 0,
      end: 1234567,
      duration: 2000,
      format: 'currency',
    });
  },
});
```

#### 2. Micro-Interactions

**Technology**: Lottie + CSS Transitions

**Button Hover States**
```css
.button {
  position: relative;
  overflow: hidden;

  /* Ripple effect */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
  }

  &:hover::after {
    width: 300px;
    height: 300px;
  }
}

/* Icon bounce */
.button__icon {
  transition: transform 0.3s var(--ease-spring);

  .button:hover & {
    transform: translateY(-2px);
  }

  .button:active & {
    transform: translateY(0);
  }
}
```

**Success Checkmark**
```javascript
// Lottie animation config
const successAnimation = {
  path: '/animations/success-checkmark.json',
  loop: false,
  autoplay: true,
};

// Play on form submission success
lottie.loadAnimation({
  container: document.querySelector('.success-icon'),
  renderer: 'svg',
  ...successAnimation,
});
```

**Loading Spinner (PropertyLend branded)**
```css
.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--gray-200);
  border-top-color: var(--navy-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Gold variant for premium actions */
.spinner--gold {
  border-top-color: var(--gold-600);
  box-shadow: var(--shadow-gold);
}
```

#### 3. Page Transitions

**Technology**: Framer Motion

**Fade & Slide Transition**
```typescript
// Next.js page wrapper
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

// Usage
<motion.div
  variants={pageVariants}
  initial="initial"
  animate="enter"
  exit="exit"
>
  {children}
</motion.div>
```

**Stagger Children**
```typescript
// Property grid appears with stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 100ms delay between each child
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

// Usage
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {properties.map((prop) => (
    <motion.div key={prop.id} variants={itemVariants}>
      <PropertyCard {...prop} />
    </motion.div>
  ))}
</motion.div>
```

#### 4. Data Visualizations

**Technology**: D3.js

**Morphing Bar Chart**
```javascript
// Update chart with smooth transitions
function updateChart(newData) {
  const bars = svg.selectAll('.bar').data(newData);

  // Update existing bars
  bars
    .transition()
    .duration(750)
    .ease(d3.easeQuadInOut)
    .attr('height', (d) => yScale(d.value))
    .attr('y', (d) => height - yScale(d.value))
    .attr('fill', (d) => colorScale(d.category));

  // Enter new bars
  bars
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => xScale(d.label))
    .attr('width', xScale.bandwidth())
    .attr('y', height)
    .attr('height', 0)
    .attr('fill', (d) => colorScale(d.category))
    .transition()
    .duration(750)
    .ease(d3.easeQuadInOut)
    .attr('y', (d) => height - yScale(d.value))
    .attr('height', (d) => yScale(d.value));

  // Exit old bars
  bars
    .exit()
    .transition()
    .duration(750)
    .ease(d3.easeQuadInOut)
    .attr('y', height)
    .attr('height', 0)
    .remove();
}
```

**Animated Donut Chart** (Portfolio allocation)
```javascript
// Arc tween for smooth transitions
function arcTween(newData) {
  return function (d) {
    const interpolate = d3.interpolate(this._current, d);
    this._current = interpolate(0);

    return function (t) {
      return arc(interpolate(t));
    };
  };
}

// Update donut
pie
  .selectAll('path')
  .data(pie(newData))
  .transition()
  .duration(1000)
  .ease(d3.easeCubicInOut)
  .attrTween('d', arcTween);
```

#### 5. 3D Effects

**Technology**: Vanilla Tilt.js + Three.js

**Property Card Tilt**
```javascript
// Initialize tilt effect
VanillaTilt.init(document.querySelectorAll('.property-card'), {
  max: 10, // Max tilt rotation (degrees)
  speed: 400, // Speed of the enter/exit transition
  glare: true, // Enable glare effect
  'max-glare': 0.3, // Max glare opacity (0-1)
  perspective: 1000, // Transform perspective
  scale: 1.02, // Scale on hover
});
```

**Visual Spec**:
- Max tilt: 10° (subtle, professional)
- Glare: 30% opacity white gradient
- Scale: 1.02x on hover
- Transition: 400ms smooth ease

**3D Property Visualization** (Three.js globe)
```javascript
// Simplified setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

// Earth globe
const geometry = new THREE.SphereGeometry(5, 50, 50);
const material = new THREE.MeshPhongMaterial({
  map: textureLoader.load('/textures/earth-map.jpg'),
  bumpMap: textureLoader.load('/textures/earth-bump.jpg'),
  bumpScale: 0.3,
});
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Property markers
properties.forEach((prop) => {
  const marker = createPropertyMarker(prop);
  const position = latLongToVector3(prop.latitude, prop.longitude, 5.1);
  marker.position.copy(position);
  scene.add(marker);
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.001; // Slow auto-rotation
  renderer.render(scene, camera);
}
```

#### 6. Number Animations

**Technology**: react-countup

**Earnings Counter**
```typescript
import CountUp from 'react-countup';

<CountUp
  start={0}
  end={1234.56}
  duration={2}
  decimals={2}
  decimal="."
  prefix="$"
  separator=","
  enableScrollSpy  // Trigger on scroll into view
  scrollSpyOnce    // Only animate once
  useEasing
  easingFn={(t, b, c, d) => {
    // Custom easing (ease-out quad)
    return -c * (t /= d) * (t - 2) + b;
  }}
  onEnd={() => {
    // Celebration animation after count completes
    playConfetti();
  }}
/>
```

**Real-Time Accrual Animation**
```typescript
// Continuously updating earnings ticker
const [earnings, setEarnings] = useState(initialEarnings);
const [displayEarnings, setDisplayEarnings] = useState(initialEarnings);

useEffect(() => {
  // Calculate earnings per second based on APY
  const apr = 0.08; // 8% APY
  const earningsPerSecond = (initialInvestment * apr) / (365 * 24 * 60 * 60);

  const interval = setInterval(() => {
    setEarnings((prev) => prev + earningsPerSecond);
  }, 1000);

  return () => clearInterval(interval);
}, [initialInvestment]);

// Smooth interpolation to target
useEffect(() => {
  const diff = earnings - displayEarnings;
  if (Math.abs(diff) < 0.01) return;

  const step = diff * 0.1; // 10% of difference per frame
  const frame = requestAnimationFrame(() => {
    setDisplayEarnings((prev) => prev + step);
  });

  return () => cancelAnimationFrame(frame);
}, [earnings, displayEarnings]);

// Display with gentle pulse
<motion.span
  className="earnings-ticker"
  animate={{
    scale: [1, 1.02, 1],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  ${displayEarnings.toFixed(2)}
</motion.span>
```

#### 7. Celebration Animations

**Confetti Explosion** (First investment, milestones)
```javascript
// Using canvas-confetti library
import confetti from 'canvas-confetti';

function celebrateFirstInvestment() {
  // Fire from bottom center
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.9 },
    colors: [
      '#0A2540', // Navy
      '#D4AF37', // Gold
      '#FFFFFF', // White
    ],
  });

  // Secondary burst after delay
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#D4AF37', '#F4CE50'],
    });

    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#D4AF37', '#F4CE50'],
    });
  }, 250);
}
```

**Badge Unlock Animation**
```typescript
// Framer Motion spring animation
const badgeVariants = {
  hidden: {
    scale: 0,
    rotate: -180,
  },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      duration: 0.6,
    },
  },
};

const glowVariants = {
  pulse: {
    boxShadow: [
      '0 0 0px rgba(212, 175, 55, 0)',
      '0 0 30px rgba(212, 175, 55, 0.6)',
      '0 0 0px rgba(212, 175, 55, 0)',
    ],
    transition: {
      duration: 2,
      repeat: 2,
      ease: 'easeInOut',
    },
  },
};

<motion.div
  className="achievement-badge"
  variants={badgeVariants}
  initial="hidden"
  animate="visible"
>
  <motion.div
    className="badge-glow"
    variants={glowVariants}
    animate="pulse"
  >
    <GoldBadgeIcon />
  </motion.div>
</motion.div>
```

---

## Personalized Dashboard Design

### Welcome Animation Sequence

**First-Time User** (Progressive onboarding)
```typescript
// Animation sequence on first visit after investment
const onboardingSequence = {
  steps: [
    {
      target: '.portfolio-overview',
      message: 'Welcome! Here\'s your investment summary.',
      duration: 3000,
      animation: 'fade-in-up',
    },
    {
      target: '.earnings-counter',
      message: 'Watch your earnings grow in real-time!',
      duration: 3000,
      animation: 'pulse',
      onComplete: () => {
        triggerCounterAnimation();
      },
    },
    {
      target: '.property-cards',
      message: 'Track each property\'s performance here.',
      duration: 3000,
      animation: 'stagger-fade-in',
    },
    {
      target: '.secondary-market-link',
      message: 'You can trade your tokens anytime here.',
      duration: 3000,
      animation: 'glow',
    },
  ],
};

// Play sequence with delays
async function playOnboarding() {
  for (const step of onboardingSequence.steps) {
    await highlightElement(step.target, step.message, step.animation);
    await wait(step.duration);
    if (step.onComplete) step.onComplete();
  }
}
```

**Returning User** (Personalized greeting)
```typescript
// Animated welcome back message
<motion.div
  className="welcome-hero"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
>
  <h1 className="heading-1">
    Welcome back,{' '}
    <motion.span
      className="wallet-name"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      {ensName || truncateAddress(walletAddress)}
    </motion.span>
  </h1>

  <motion.div
    className="earnings-highlight"
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.6, duration: 0.5, ease: 'backOut' }}
  >
    <span className="label">You've earned</span>
    <CountUp
      start={0}
      end={earnedSinceLastVisit}
      duration={2}
      decimals={2}
      prefix="$"
      separator=","
      className="data-large"
      useEasing
    />
    <span className="caption">since your last visit</span>

    {/* Sparkle animation */}
    <motion.div
      className="sparkle-effect"
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  </motion.div>
</motion.div>
```

### Portfolio Overview Cards

**Animated Entry**
```typescript
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1, // Stagger by index
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  }),
};

{portfolioCards.map((card, index) => (
  <motion.div
    key={card.id}
    className="portfolio-card"
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover={{
      y: -8,
      transition: { duration: 0.3 },
    }}
  >
    {card.content}
  </motion.div>
))}
```

**Real-Time Update Animation**
```typescript
// When new earnings are detected
function handleNewEarnings(amount: number) {
  // 1. Pulse the earnings card
  animateCard('.earnings-card', {
    scale: [1, 1.05, 1],
    borderColor: ['var(--gray-200)', 'var(--gold-500)', 'var(--gray-200)'],
    transition: { duration: 1 },
  });

  // 2. Count up the number
  setEarnings((prev) => prev + amount);

  // 3. Show toast notification
  showToast({
    type: 'earnings',
    amount: amount,
    message: `You earned $${amount.toFixed(2)}!`,
    duration: 5000,
  });

  // 4. Add sparkle effect
  createSparkles('.earnings-card', { count: 10, duration: 2000 });
}
```

### Earnings Timeline Chart

**Interactive Hover States**
```javascript
// D3.js line chart with tooltips
const lineChart = d3.line()
  .x((d) => xScale(d.date))
  .y((d) => yScale(d.amount))
  .curve(d3.curveMonotoneX); // Smooth curve

// Add path with animation
svg
  .append('path')
  .datum(earningsData)
  .attr('class', 'earnings-line')
  .attr('fill', 'none')
  .attr('stroke', 'url(#gold-gradient)')
  .attr('stroke-width', 3)
  .attr('d', lineChart)
  .attr('stroke-dasharray', function () {
    return this.getTotalLength();
  })
  .attr('stroke-dashoffset', function () {
    return this.getTotalLength();
  })
  .transition()
  .duration(2000)
  .ease(d3.easeCubicInOut)
  .attr('stroke-dashoffset', 0);

// Interactive dots
svg
  .selectAll('.dot')
  .data(earningsData)
  .enter()
  .append('circle')
  .attr('class', 'dot')
  .attr('cx', (d) => xScale(d.date))
  .attr('cy', (d) => yScale(d.amount))
  .attr('r', 0)
  .attr('fill', 'var(--gold-600)')
  .attr('stroke', 'var(--white)')
  .attr('stroke-width', 2)
  .transition()
  .delay((d, i) => i * 50)
  .duration(300)
  .attr('r', 6)
  .on('end', function () {
    // Add hover effect after animation
    d3.select(this)
      .on('mouseover', function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 10);

        showTooltip(event, d);
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 6);

        hideTooltip();
      });
  });
```

### Property Performance Cards

**Individual Property Tracking**
```typescript
interface PropertyPerformance {
  propertyId: string;
  propertyName: string;
  imageUrl: string;
  investmentAmount: number;
  earnedToDate: number;
  currentAPY: number;
  loanStatus: 'active' | 'paid' | 'defaulted';
  termProgress: number; // 0-100
  termStart: Date;
  termEnd: Date;
}

// Card component with animations
<motion.div
  className="property-performance-card"
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  whileHover={{ y: -6, transition: { duration: 0.2 } }}
>
  {/* Property image with parallax */}
  <div className="property-image-container">
    <motion.img
      src={property.imageUrl}
      className="property-image"
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.6 }}
    />

    {/* Status badge */}
    <div className={`status-badge status-badge--${property.loanStatus}`}>
      <StatusIcon status={property.loanStatus} />
      {property.loanStatus.toUpperCase()}
    </div>
  </div>

  {/* Investment details */}
  <div className="property-details">
    <h3 className="heading-4">{property.propertyName}</h3>

    {/* Your investment */}
    <div className="metric">
      <span className="label">Your Investment</span>
      <span className="data-medium">
        ${property.investmentAmount.toLocaleString()}
      </span>
    </div>

    {/* Earnings (animated) */}
    <div className="metric metric--highlight">
      <span className="label">Earned to Date</span>
      <CountUp
        end={property.earnedToDate}
        decimals={2}
        prefix="$"
        separator=","
        className="data-medium"
        useEasing
      />
    </div>

    {/* Current APY */}
    <div className="metric">
      <span className="label">Current APY</span>
      <span className="data-medium data-medium--success">
        {property.currentAPY}%
      </span>
    </div>

    {/* Term progress bar */}
    <div className="term-progress">
      <div className="term-progress__label">
        <span className="label">Loan Term</span>
        <span className="caption">
          {formatDate(property.termEnd)} (
          {daysRemaining(property.termEnd)} days left)
        </span>
      </div>

      <div className="term-progress__bar">
        <motion.div
          className="term-progress__fill"
          initial={{ width: 0 }}
          animate={{ width: `${property.termProgress}%` }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  </div>
</motion.div>
```

### Achievement System

**Badge Design**
```css
.achievement-badge {
  position: relative;
  width: 80px;
  height: 80px;

  /* Glassmorphism background */
  background: var(--glass-white);
  backdrop-filter: blur(12px);
  border: 2px solid rgba(212, 175, 55, 0.3);
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  /* Default state: grayscale + low opacity */
  filter: grayscale(100%) opacity(0.4);
  transition: all 0.4s ease;

  /* Unlocked state */
  &.achievement-badge--unlocked {
    filter: grayscale(0%) opacity(1);
    border-color: var(--gold-600);
    box-shadow: var(--shadow-lg), var(--shadow-gold);
  }

  /* Animated glow ring */
  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      var(--gold-600),
      var(--gold-400),
      var(--gold-600)
    );
    opacity: 0;
    z-index: -1;

    animation: rotate-glow 3s linear infinite;
    animation-play-state: paused;
  }

  &.achievement-badge--unlocked::before {
    opacity: 0.5;
    animation-play-state: running;
  }
}

@keyframes rotate-glow {
  to {
    transform: rotate(360deg);
  }
}
```

**Achievement Unlock Flow**
```typescript
async function unlockAchievement(achievement: Achievement) {
  // 1. Show modal with animation
  const modal = showAchievementModal(achievement);

  await modal.animateIn({
    scale: [0, 1.1, 1],
    rotate: [0, 15, -15, 0],
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  });

  // 2. Confetti explosion
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.5 },
    colors: ['#D4AF37', '#F4CE50', '#B8860B'],
  });

  // 3. Play sound effect (optional)
  playSound('/sounds/achievement-unlock.mp3', { volume: 0.5 });

  // 4. Update UI
  updateAchievementBadge(achievement.id, 'unlocked');
  updateAchievementProgress();

  // 5. Add to user's profile
  await saveAchievement(achievement.id);

  // 6. Show next milestone
  setTimeout(() => {
    showNextMilestone();
  }, 3000);
}
```

**Progress Ring Animation**
```typescript
// Animated circular progress for next milestone
<svg className="progress-ring" width="120" height="120">
  <circle
    className="progress-ring__background"
    stroke="var(--gray-200)"
    strokeWidth="8"
    fill="transparent"
    r="52"
    cx="60"
    cy="60"
  />

  <motion.circle
    className="progress-ring__progress"
    stroke="url(#gold-gradient)"
    strokeWidth="8"
    fill="transparent"
    r="52"
    cx="60"
    cy="60"
    strokeDasharray="327" // Circumference (2πr)
    initial={{ strokeDashoffset: 327 }}
    animate={{
      strokeDashoffset: 327 - (327 * progress) / 100,
    }}
    transition={{ duration: 1.5, ease: 'easeOut' }}
    strokeLinecap="round"
  />

  <defs>
    <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="var(--gold-400)" />
      <stop offset="100%" stopColor="var(--gold-700)" />
    </linearGradient>
  </defs>
</svg>

<div className="progress-label">
  <span className="data-medium">{progress}%</span>
  <span className="caption">to next milestone</span>
</div>
```

### Real-Time Earnings Accrual

**Continuously Updating Ticker**
```typescript
function useEarningsAccrual(
  initialInvestment: number,
  apy: number,
  lastUpdateTimestamp: number
) {
  const [displayEarnings, setDisplayEarnings] = useState(0);
  const [actualEarnings, setActualEarnings] = useState(0);

  // Calculate earnings per second
  const earningsPerSecond = useMemo(() => {
    return (initialInvestment * (apy / 100)) / (365 * 24 * 60 * 60);
  }, [initialInvestment, apy]);

  // Update actual earnings every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const secondsElapsed = (now - lastUpdateTimestamp) / 1000;
      setActualEarnings(earningsPerSecond * secondsElapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [earningsPerSecond, lastUpdateTimestamp]);

  // Smooth interpolation to actual earnings
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const diff = actualEarnings - displayEarnings;
      if (Math.abs(diff) < 0.001) {
        setDisplayEarnings(actualEarnings);
        return;
      }

      // Lerp (linear interpolation)
      setDisplayEarnings((prev) => prev + diff * 0.1);
    });

    return () => cancelAnimationFrame(frame);
  }, [actualEarnings, displayEarnings]);

  return displayEarnings;
}

// Usage
const currentEarnings = useEarningsAccrual(
  investment.amount,
  investment.apy,
  investment.lastCheckedAt
);

<div className="earnings-ticker">
  <span className="label">Earnings Right Now</span>
  <motion.span
    className="data-large"
    animate={{
      color: [
        'var(--navy-900)',
        'var(--gold-600)',
        'var(--navy-900)',
      ],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    ${currentEarnings.toFixed(6)}
  </motion.span>
  <span className="caption">and counting...</span>

  {/* Pulse indicator */}
  <motion.div
    className="pulse-dot"
    animate={{
      scale: [1, 1.5, 1],
      opacity: [1, 0, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
</div>
```

---

## Accessibility

### WCAG 2.1 AA Compliance

**Color Contrast**
- Normal text (< 18pt): Minimum 4.5:1 contrast ratio
- Large text (≥ 18pt or ≥ 14pt bold): Minimum 3:1 contrast ratio
- All text combinations tested and verified

**Keyboard Navigation**
```css
/* Visible focus indicators */
*:focus-visible {
  outline: 2px solid var(--navy-500);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Skip to content link */
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  padding: var(--space-4);
  background: var(--navy-900);
  color: var(--white);
  z-index: 9999;

  &:focus {
    top: 0;
  }
}

/* Tab order should follow visual order */
/* Use tabindex="0" for custom interactive elements */
/* Use tabindex="-1" to remove from tab order */
```

**Screen Reader Support**
```html
<!-- Semantic HTML -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

<!-- ARIA labels for icons -->
<button aria-label="Close modal">
  <CloseIcon aria-hidden="true" />
</button>

<!-- Live regions for dynamic content -->
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {statusMessage}
</div>

<!-- Form accessibility -->
<label htmlFor="investment-amount">
  Investment Amount
  <input
    id="investment-amount"
    type="number"
    aria-describedby="amount-help"
    aria-invalid={hasError}
    aria-errormessage={hasError ? "amount-error" : undefined}
  />
</label>
<div id="amount-help" className="caption">
  Minimum $100
</div>
{hasError && (
  <div id="amount-error" role="alert" className="error-message">
    {errorMessage}
  </div>
)}
```

### Reduced Motion

**Respect user preferences**
```css
/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Keep essential animations but simplify them */
  .button:hover {
    transform: none;
    /* Keep color change only */
  }

  /* Remove parallax/scroll effects */
  .parallax-element {
    transform: none !important;
  }
}
```

**JavaScript detection**
```typescript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// Conditionally disable complex animations
if (prefersReducedMotion) {
  // Use simple fade instead of complex sequence
  element.animate([
    { opacity: 0 },
    { opacity: 1 }
  ], {
    duration: 300,
    easing: 'ease-in-out',
  });
} else {
  // Full animation with transforms, scales, etc.
  playComplexAnimation();
}
```

---

## Dark Mode

### Color Adaptations

```css
/* Dark mode variable overrides */
@media (prefers-color-scheme: dark) {
  :root {
    /* Backgrounds */
    --color-background: var(--gray-900);
    --color-surface: var(--gray-800);

    /* Text */
    --color-text-primary: var(--gray-50);
    --color-text-secondary: var(--gray-300);

    /* Borders */
    --color-border: var(--gray-700);

    /* Adjust navy for dark backgrounds */
    --color-primary: var(--navy-400);
    --color-primary-hover: var(--navy-300);

    /* Shadows need to be darker */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4),
                 0 2px 4px -1px rgba(0, 0, 0, 0.3);
    /* ... etc */
  }
}

/* Manual toggle (overrides media query) */
[data-theme="dark"] {
  /* Same overrides as above */
}
```

### Dark Mode Toggle

```typescript
// Component
function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check localStorage first
    const saved = localStorage.getItem('theme');
    if (saved) {
      setTheme(saved as 'light' | 'dark');
      return;
    }

    // Fall back to system preference
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <AnimatePresence mode="wait">
        {theme === 'light' ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MoonIcon />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SunIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
```

---

## Responsive Design

### Mobile-First Approach

```css
/* Base styles (mobile) */
.hero {
  padding: var(--space-12) var(--space-4);
  font-size: var(--text-4xl);
}

/* Tablet */
@media (min-width: 768px) {
  .hero {
    padding: var(--space-16) var(--space-6);
    font-size: var(--text-5xl);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .hero {
    padding: var(--space-24) var(--space-8);
    font-size: var(--text-7xl);
  }
}
```

### Touch Targets

```css
/* Minimum 44x44px for touch targets (WCAG) */
.button,
.link,
.input {
  min-height: 44px;
  min-width: 44px;
}

/* Increase spacing on mobile */
@media (max-width: 768px) {
  .button {
    padding: var(--space-4) var(--space-6); /* Larger padding */
  }

  .property-grid {
    gap: var(--space-4); /* More gap between cards */
  }
}
```

---

## Performance Guidelines

### Animation Performance Budget

- **Page Load**: First Contentful Paint < 1.8s
- **Interaction**: Time to Interactive < 3.9s
- **Animation**: Maintain 60fps (16.67ms/frame)
- **Scroll**: Smooth scrolling at 60fps

### Optimization Techniques

**1. Use GPU-Accelerated Properties**
```css
/* Good - uses GPU */
.element {
  transform: translateX(10px);
  opacity: 0.5;
}

/* Bad - forces layout recalculation */
.element {
  left: 10px;
  visibility: hidden;
}
```

**2. Will-Change (Use Sparingly)**
```css
.property-card {
  /* Only add before animation, remove after */
  will-change: transform;
}

.property-card.animating {
  will-change: transform;
  transform: translateY(-10px);
}

.property-card.animating.done {
  will-change: auto; /* Remove after animation */
}
```

**3. Debounce/Throttle Scroll Listeners**
```typescript
// Throttle scroll events to 60fps max
const handleScroll = throttle(() => {
  // Scroll logic
}, 16); // ~60fps

window.addEventListener('scroll', handleScroll, { passive: true });
```

**4. Lazy Load Heavy Animations**
```typescript
// Only load Lottie when needed
const LottieAnimation = lazy(() => import('./LottieAnimation'));

{showCelebration && (
  <Suspense fallback={<div>Loading...</div>}>
    <LottieAnimation />
  </Suspense>
)}
```

---

## Design Tokens Export

### For Developers

**CSS Custom Properties** (Copy to global.css)
```css
:root {
  /* See full variable definitions above */
}
```

**Tailwind Config** (tailwind.config.ts)
```typescript
const config = {
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#E8EEF5',
          // ... full scale
          900: '#0A2540',
        },
        gold: {
          50: '#FEF9E7',
          // ... full scale
          900: '#7C5E06',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
        serif: ['DM Serif Display', 'serif'],
      },
      spacing: {
        // 4px base unit
      },
      borderRadius: {
        // Design system radii
      },
      boxShadow: {
        // Shadow system
      },
    },
  },
};
```

---

**End of Design System Document**

*This design system is a living document. As the platform evolves, animations and components will be refined based on user feedback and performance metrics.*

**Next Steps**:
1. Implement component library in React/TypeScript
2. Create Storybook for component showcase
3. Build animation prototypes in Framer/CodePen
4. Conduct accessibility audit
5. Performance testing on target devices
