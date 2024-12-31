# Milano Transit Dashboard (APIs needed for Realtime Info Updates)

A real-time transportation dashboard that displays Metro line status and airport connections in Milan, Italy. This modern, responsive web application provides live updates for public transit information across the Milano metropolitan area.

## 🚀 Features

- **Real-time Metro Updates**
  - Live status for all 5 Milan Metro lines (M1-M5)
  - Next train arrival times
  - Route information and branch details
  - Color-coded line identification matching official ATM Milano colors

- **Airport Connections**
  - Real-time information for three major airports:
    - Malpensa Airport (MXP)
    - Linate Airport (LIN)
    - Bergamo Orio al Serio (BGY)
  - Live flight status updates
  - Ground transportation options and schedules
  - Direct connection details to Milan city center

- **Live Information Display**
  - Dual-timezone clock display (Milano/Local time)
  - Live transit feed integration
  - Real-time updates for all transportation services

## 🛠 Technology Stack

### Frontend Framework
- **React 18+**
  - Functional components with hooks
  - TypeScript for type safety
  - Custom hooks for real-time data management

### Styling and UI
- **Tailwind CSS**
  - Responsive design system
  - Custom color palette matching Milan's transit identity
  - Dark mode support for optimal viewing
  - Utility-first CSS approach

### Components
- **Shadcn/UI**
  - Card components
  - Layout primitives
  - Responsive design elements

### Icons and Visual Elements
- **Lucide React**
  - Modern icon system
  - Transportation-specific icons
  - Consistent visual language

## 📁 Project Structure

```
milano-transit/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   └── MilanTransitDashboard.tsx
│   ├── types/
│   │   └── interfaces.ts
│   └── app/
│       └── page.tsx
└── public/
    └── assets/
```

## 🎨 Design System

### Color Palette
- **Metro Lines**
  - M1 (Red Line): `#FF0000`
  - M2 (Green Line): `#00A067`
  - M3 (Yellow Line): `#FFDD00`
  - M4 (Blue Line): `#0066CC`
  - M5 (Purple Line): `#A85BA7`

### Typography
- System font stack for optimal performance
- Responsive text sizing
- Clear hierarchy with weighted headings

### Layout
- Responsive grid system
- Mobile-first approach
- Flexible card-based components

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone [repository-url]
cd milano-transit
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

4. **Build for production**
```bash
npm run build
# or
yarn build
```

## 💻 Development

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- Basic knowledge of React and TypeScript

### Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=your_api_url
```

### Type Definitions
The project uses TypeScript interfaces for type safety:
```typescript
interface MetroLine {
  line: string;
  color: string;
  status: string;
  nextTrain: string;
  mainRoute: string;
  branches: string[];
}

interface Airport {
  airport: string;
  services: {
    name: string;
    route: string;
    frequency: string;
    duration: string;
    nextDeparture: string;
  }[];
  flights: {
    flight: string;
    destination: string;
    status: string;
    time: string;
  }[];
}
```

## 🔧 Configuration

### Tailwind Configuration
The project uses a custom Tailwind configuration to match Milano's transit design system:

```javascript
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        metro: {
          m1: '#FF0000',
          m2: '#00A067',
          m3: '#FFDD00',
          m4: '#0066CC',
          m5: '#A85BA7',
        },
      },
    },
  },
  plugins: [],
}
```

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- ATM Milano for the official metro line colors and system information
- Milan's airports for the transportation data structure
- The React and Tailwind CSS communities for their excellent documentation and support
