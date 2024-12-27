const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Function to convert images to WebP
async function convertImagesToWebP(inputDir, outputDir) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = fs.readdirSync(inputDir);

    for (const file of files) {
        const inputFilePath = path.join(inputDir, file);
        const outputFilePath = path.join(outputDir, `${path.parse(file).name}.webp`);

        const ext = path.extname(file).toLowerCase();

        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
            try {
                await sharp(inputFilePath)
                    .toFormat('webp')
                    .toFile(outputFilePath);

                console.log(`Converted: ${file} -> ${outputFilePath}`);
            } catch (error) {
                console.error(`Error converting ${file}:`, error.message);
            }
        } else {
            console.log(`Skipping non-image file: ${file}`);
        }
    }
}

// Define input and output directories
const inputDir = "./convert/assets";
const outputDir = "./convert/newAssets"

convertImagesToWebP(inputDir, outputDir)
    .then(() => console.log('Image conversion completed!'))
    .catch((error) => console.error('Error during conversion:', error.message));
