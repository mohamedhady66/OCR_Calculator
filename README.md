# 🎨 OCR Calculator

A beautiful, modern web application that uses OCR (Optical Character Recognition) technology to extract numbers from images and calculate their sum with fancy animations.

![OCR Calculator](https://img.shields.io/badge/Status-Active-success)
![.NET 8.0](https://img.shields.io/badge/.NET-8.0-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-blue)

## ✨ Features

- **🖼️ Drag & Drop Image Upload** - Simply drag and drop your image or click to browse
- **🔍 Advanced OCR** - Powered by Tesseract.js for accurate text recognition
- **🔢 Smart Number Extraction** - Automatically detects and extracts all numbers from images
- **➕ Instant Calculation** - Calculates the sum of all extracted numbers
- **🎭 Fancy Animations** - Beautiful animations and transitions throughout
- **🌈 Modern Design** - Glass morphism effects with gradient backgrounds
- **📱 Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- **⌨️ Keyboard Shortcuts**:
  - `R` - Reset the calculator
  - `U` - Upload new image

## 🚀 Getting Started

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) or later

### Installation & Running

1. Navigate to the project directory:
   ```bash
   cd /Users/mohamed.hady/RiderProjects/OCR_Calculator/OCR_Calculator
   ```

2. Run the application:
   ```bash
   dotnet run
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:5114
   ```

## 🎯 How to Use

1. **Upload Image**: Click the upload area or drag and drop an image containing numbers
2. **Wait for Processing**: The OCR engine will analyze your image (progress bar shows status)
3. **View Results**: See all extracted numbers displayed in beautiful cards
4. **See the Sum**: Watch the animated counter display the total sum
5. **Try Another**: Click "Try Another" button to process a new image

## 🌐 Deploy to Public

Want to share your OCR Calculator with the world? Check out our deployment guides:

- **[Quick Start Deploy](QUICKSTART-DEPLOY.md)** - Choose the fastest option for you (5-15 minutes)
- **[Full Deployment Guide](DEPLOYMENT.md)** - Complete guide for all platforms

### Fastest Options:
```bash
# Option 1: Railway (Easiest - 5 minutes)
./deploy-railway.sh

# Option 2: Azure (Production-ready - 10 minutes)
./deploy-azure.sh
```

Both scripts are ready to use! Just run and follow the prompts.

## 🎨 Design Features

### Visual Elements
- **Glass Morphism Cards** - Modern transparent card design with blur effects
- **Animated Particles** - Floating background particles for dynamic feel
- **Gradient Backgrounds** - Beautiful purple-to-pink gradients
- **Orbitron Font** - Futuristic font for numbers and title
- **Inter Font** - Clean, modern font for body text

### Animations
- **Fade-in** - Smooth entrance animations
- **Slide-up** - Cards slide up on appearance
- **Number Pop** - Numbers pop in with spring animation
- **Card Hover** - Interactive hover effects on number cards
- **Counter Animation** - Animated number counting for the sum
- **Pulse Glow** - Glowing pulse effect on the final sum
- **Progress Bar** - Smooth progress indicator during OCR processing

## 🛠️ Technologies Used

- **Backend**: ASP.NET Core 8.0 with Razor Pages
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: TailwindCSS (via CDN)
- **OCR Engine**: Tesseract.js 5.0
- **Fonts**: Google Fonts (Inter & Orbitron)

## 📂 Project Structure

```
OCR_Calculator/
├── Pages/
│   ├── Index.cshtml          # Main OCR calculator page
│   ├── Index.cshtml.cs       # Page model
│   └── Shared/
│       └── _Layout.cshtml    # Layout with dependencies
├── wwwroot/
│   ├── css/
│   │   └── ocr-calculator.css    # Custom styles & animations
│   └── js/
│       └── ocr-calculator.js     # OCR logic & interactions
└── Program.cs                # Application entry point
```

## 🎯 Features Breakdown

### OCR Processing
- Automatic text recognition using Tesseract.js
- Progress tracking with real-time updates
- Error handling with user-friendly messages
- Support for multiple number formats (integers, decimals, comma-separated)

### Number Extraction
- Smart pattern matching for numbers
- Handles common OCR artifacts (O→0, l→1, S→5, etc.)
- Filters out invalid results
- Supports decimal numbers and large numbers with commas

### User Experience
- Instant visual feedback
- Smooth transitions between states
- Loading indicators
- Error messages with auto-hide
- Responsive design for all screen sizes
- Keyboard shortcuts for power users

## 🎨 Color Palette

- **Primary Purple**: `#a855f7`
- **Pink Accent**: `#ec4899`
- **Yellow/Orange Gradients**: `#facc15` to `#f97316`
- **Dark Backgrounds**: Slate-900 to Purple-900 gradients
- **Glass Effects**: Semi-transparent whites with blur

## 🔮 Future Enhancements

- [ ] Support for multiple images at once
- [ ] Export results to CSV/PDF
- [ ] History of previous calculations
- [ ] Support for mathematical operations in images
- [ ] Multi-language OCR support
- [ ] Camera capture for mobile devices
- [ ] Dark/Light theme toggle

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 🐛 Known Issues

- Very blurry or low-quality images may have reduced accuracy
- Handwritten numbers may not be recognized accurately
- Complex backgrounds might interfere with number detection

## 💡 Tips for Best Results

- Use high-resolution images
- Ensure good lighting and contrast
- Avoid heavily stylized or decorative fonts
- Clear backgrounds work best
- Numbers should be clearly visible and not overlapping

---

Made with ❤️ using ASP.NET Core and Tesseract.js
