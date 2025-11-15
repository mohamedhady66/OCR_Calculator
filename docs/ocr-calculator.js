// DOM Elements
const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const uploadContent = document.getElementById('uploadContent');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const processingStatus = document.getElementById('processingStatus');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const resultsSection = document.getElementById('resultsSection');
const numbersContainer = document.getElementById('numbersContainer');
const sumDisplay = document.getElementById('sumDisplay');
const errorDisplay = document.getElementById('errorDisplay');
const errorMessage = document.getElementById('errorMessage');

let extractedNumbers = [];

// Event Listeners
uploadArea.addEventListener('click', () => imageInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('border-purple-400', 'bg-purple-400/10');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('border-purple-400', 'bg-purple-400/10');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('border-purple-400', 'bg-purple-400/10');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        handleImageUpload(file);
    }
});

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleImageUpload(file);
    }
});

// Handle image upload
function handleImageUpload(file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        previewImg.src = e.target.result;
        uploadContent.classList.add('hidden');
        imagePreview.classList.remove('hidden');
        
        // Start OCR processing after a brief delay for smooth UX
        setTimeout(() => {
            processImageWithOCR(e.target.result);
        }, 500);
    };
    
    reader.readAsDataURL(file);
}

// Process image with Tesseract OCR
async function processImageWithOCR(imageSrc) {
    // Hide error and results
    errorDisplay.classList.add('hidden');
    resultsSection.classList.add('hidden');
    
    // Show processing status
    processingStatus.classList.remove('hidden');
    updateProgress(0, 'Initializing OCR engine...');
    
    try {
        const worker = await Tesseract.createWorker('eng', 1, {
            logger: (m) => {
                if (m.status === 'recognizing text') {
                    const progress = Math.round(m.progress * 100);
                    updateProgress(progress, `Recognizing text... ${progress}%`);
                }
            }
        });
        
        updateProgress(10, 'Loading image...');
        
        // Perform OCR
        const { data: { text } } = await worker.recognize(imageSrc);
        
        updateProgress(100, 'Processing complete!');
        
        // Extract numbers from text
        extractNumbers(text);
        
        // Terminate worker
        await worker.terminate();
        
        // Show results
        setTimeout(() => {
            processingStatus.classList.add('hidden');
            displayResults();
        }, 500);
        
    } catch (error) {
        console.error('OCR Error:', error);
        showError('Failed to process image. Please try again with a clearer image.');
        processingStatus.classList.add('hidden');
    }
}

// Update progress bar
function updateProgress(percent, message) {
    progressBar.style.width = `${percent}%`;
    progressText.textContent = message;
}

// Extract numbers from OCR text
function extractNumbers(text) {
    // Reset
    extractedNumbers = [];
    
    // Remove common OCR artifacts and normalize text
    let cleanedText = text
        .replace(/[|]/g, '1')  // Convert pipes to 1
        .replace(/[O]/g, '0')  // Convert O to 0 in numeric contexts
        .replace(/[l]/g, '1')  // Convert l to 1
        .replace(/[oO]/g, '0') // Convert o/O to 0
        .replace(/[Ss§]/g, '5') // Convert S to 5
        .replace(/[Zz]/g, '2'); // Convert Z to 2
    
    // Extract all numbers (integers and decimals)
    // This regex matches:
    // - Standalone numbers
    // - Numbers with decimals
    // - Numbers with commas as thousand separators
    const numberPattern = /\b\d+(?:[.,]\d+)*\b/g;
    const matches = cleanedText.match(numberPattern);
    
    if (matches) {
        extractedNumbers = matches.map(match => {
            // Convert comma-separated numbers to proper format
            let num = match.replace(/,/g, '');
            return parseFloat(num);
        }).filter(num => !isNaN(num) && isFinite(num));
    }
    
    // If no numbers found, try a more aggressive approach
    if (extractedNumbers.length === 0) {
        // Look for digit sequences
        const digitPattern = /\d+/g;
        const digitMatches = text.match(digitPattern);
        if (digitMatches) {
            extractedNumbers = digitMatches.map(d => parseFloat(d)).filter(num => !isNaN(num));
        }
    }
    
    console.log('Extracted text:', text);
    console.log('Extracted numbers:', extractedNumbers);
}

// Display results
function displayResults() {
    if (extractedNumbers.length === 0) {
        showError('No numbers found in the image. Please try another image with visible numbers.');
        return;
    }
    
    // Clear previous results
    numbersContainer.innerHTML = '';
    
    // Display extracted numbers
    extractedNumbers.forEach((num, index) => {
        const card = document.createElement('div');
        card.className = 'number-card rounded-xl p-4 text-center';
        card.innerHTML = `
            <div class="text-2xl font-bold text-white orbitron">${num.toLocaleString()}</div>
            <div class="text-xs text-gray-400 mt-1">Number ${index + 1}</div>
        `;
        numbersContainer.appendChild(card);
    });
    
    // Calculate and display sum with animation
    const sum = extractedNumbers.reduce((acc, num) => acc + num, 0);
    animateNumber(sum);
    
    // Show results section
    resultsSection.classList.remove('hidden');
}

// Animate number counting
function animateNumber(finalValue) {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = finalValue / steps;
    let currentValue = 0;
    let step = 0;
    
    // Add pulse glow effect
    sumDisplay.classList.add('pulse-glow');
    
    const timer = setInterval(() => {
        step++;
        currentValue += increment;
        
        if (step >= steps) {
            currentValue = finalValue;
            clearInterval(timer);
            // Remove pulse after animation completes
            setTimeout(() => {
                sumDisplay.classList.remove('pulse-glow');
            }, 1000);
        }
        
        // Format number with commas
        sumDisplay.textContent = Math.round(currentValue).toLocaleString();
    }, duration / steps);
}

// Show error
function showError(message) {
    errorMessage.textContent = message;
    errorDisplay.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorDisplay.classList.add('hidden');
    }, 5000);
}

// Reset calculator
function resetCalculator() {
    // Reset all states
    extractedNumbers = [];
    imageInput.value = '';
    
    // Hide sections
    imagePreview.classList.add('hidden');
    processingStatus.classList.add('hidden');
    resultsSection.classList.add('hidden');
    errorDisplay.classList.add('hidden');
    
    // Show upload content
    uploadContent.classList.remove('hidden');
    
    // Reset displays
    numbersContainer.innerHTML = '';
    sumDisplay.textContent = '0';
    progressBar.style.width = '0%';
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'R' to reset
    if (e.key.toLowerCase() === 'r' && !resultsSection.classList.contains('hidden')) {
        resetCalculator();
    }
    
    // Press 'U' to upload
    if (e.key.toLowerCase() === 'u' && !processingStatus.classList.contains('hidden') === false) {
        imageInput.click();
    }
});

// Prevent default drag behavior on document
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    document.body.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
});

// Console welcome message
console.log('%c🎨 OCR Calculator ', 'background: linear-gradient(135deg, #a855f7, #ec4899); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cPowered by Tesseract.js', 'color: #a855f7; font-size: 14px;');
console.log('Keyboard shortcuts: R - Reset | U - Upload');
