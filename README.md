# 44th Seoul National University Fashion Show - Duality

A React-based website for the 44th Seoul National University Fashion Show, featuring the theme "Duality" (이중성). This project showcases three stages of fashion design exploring the boundaries between opposing concepts.

## Features

- **Responsive Design**: Optimized for both mobile and desktop viewing
- **Korean Typography**: Beautiful Korean fonts (Urbanist, Kaisei Opti) for authentic presentation
- **Three Stage Sections**:
  - Dream & Reality (꿈과 현실)
  - Autonomy & Restraint (자유와 억압)
  - Tradition & Revolution (전통과 혁신)
- **Designer Showcase**: Individual cards for each designer with placeholder images
- **Modern UI**: Clean, minimalist design with Tailwind CSS

## Technologies Used

- React 18
- Tailwind CSS
- HTML5
- CSS3
- Google Fonts (Urbanist, Kaisei Opti)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

### Building for Production

To create a production build:

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Site header with event title
│   ├── HeroSection.js     # Main hero section with background
│   ├── StageSection.js    # Individual stage sections
│   └── DesignerCard.js    # Designer profile cards
├── App.js                 # Main application component
├── App.css               # Application styles
├── index.js              # React entry point
└── index.css             # Global styles and Tailwind imports
```

## Design Philosophy

The website embodies the concept of "Duality" through:

- **Visual Contrast**: Black background with white text creates stark contrast
- **Typography Hierarchy**: Different font weights and sizes guide the reader
- **Layered Content**: Background elements suggest depth and complexity
- **Minimalist Layout**: Clean design allows content to breathe

## Customization

### Colors
The color scheme is defined in `tailwind.config.js`:
- `fashion-black`: #000000
- `fashion-white`: #FFFFFF
- `fashion-gray`: #737373
- `fashion-light-gray`: #868686
- `fashion-border`: #D9D9D9

### Fonts
- **Urbanist**: Used for headings and UI elements
- **Kaisei Opti**: Used for body text and Korean content

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational and showcase purposes.




