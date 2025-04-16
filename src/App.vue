<script setup lang="ts">
import { ref } from 'vue';
import jsPDF from 'jspdf';

const inputText = ref('');

const generatePDF = () => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [210, 210] }); // 1:1 square slides

  const backgroundColor = '#FBFAF4'; // Updated background color
  const textColor = '#2E5E5A'; // Updated text color
  const highlightColor = '#091717'; // Keeping highlight color as is
  const watermarkColor = '#20808D'; // Keeping watermark color as is

  const firstSentence = inputText.value.split(/\.|\n/)[0].replace(/[^a-zA-Z0-9 ]/g, '').trim();

  // Title slide
  doc.setFillColor(backgroundColor);
  doc.rect(0, 0, 210, 210, 'F'); // Full square background
  doc.setTextColor(highlightColor);
  doc.setFont('Courier', 'bold');
  doc.setFontSize(41);
  const wrappedTitle = doc.splitTextToSize(firstSentence, 180); // Wrap title text to fit within slide margins
  let y = 50;
  wrappedTitle.forEach((line) => {
    doc.text(line, 15, y, { align: 'left', maxWidth: 180 }); // Ensure text stays within slide margins
    y += 12;
  });
  doc.setFontSize(25);
  doc.setTextColor('#944454');
  doc.text('Creative PROMPTS by Vamsi Penmetsa', 15, y + 20, { align: 'left', maxWidth: 180 });

  doc.setFontSize(15);
  doc.setTextColor(watermarkColor);
  doc.text('FOLLOW @VamsiPenmetsa', 105, 200, { align: 'center' });

  const sections = inputText.value.split(/---/).map((section) => section.trim()).filter(Boolean);

  sections.forEach((section, index) => {
    if (index === 0) return;

    doc.addPage();

    doc.setFillColor(backgroundColor);
    doc.rect(0, 0, 210, 210, 'F');
    doc.setTextColor(highlightColor);
    doc.setFont('Courier', 'bold');
    doc.setFontSize(25);

    const [header, ...contentLines] = section.split('\n');
    const content = contentLines.join('\n');

    y = 30;
    doc.text(header.replace(/[^a-zA-Z0-9 ]/g, '').trim(), 15, y, { align: 'left', maxWidth: 180 });

    doc.setTextColor(textColor);
    doc.setFont('Courier', 'bold');
    doc.setFontSize(16);
    const wrappedContent = content.split('\n').flatMap((line) => {
      if (line.startsWith('-')) {
        return doc.splitTextToSize(`• ${line.slice(1).trim()}`, 180);
      }
      return doc.splitTextToSize(line.trim(), 180);
    });

    y += 20;
    wrappedContent.forEach((line) => {
      if (y + 10 > 190) {
        doc.addPage();
        doc.setFillColor(backgroundColor);
        doc.rect(0, 0, 210, 210, 'F');
        doc.setTextColor(textColor);
        y = 30;
      }
      doc.text(line, 15, y, { align: 'left', maxWidth: 180 });
      y += 10;
    });

    doc.setFontSize(15);
    doc.setTextColor(watermarkColor);
    doc.text('FOLLOW @VamsiPenmetsa', 105, 200, { align: 'center' });
  });

  doc.addPage();
  doc.setFillColor(backgroundColor);
  doc.rect(0, 0, 210, 210, 'F');
  doc.setTextColor('#133B39');
  doc.setFont('Courier', 'bold');
  doc.setFontSize(24);
  y = 30;
  doc.text('Your Prompt:', 15, y, { align: 'left', maxWidth: 180 });

  doc.setTextColor('#944454');
  doc.setFontSize(16);
  // Extract the "Detailed Prompt Template" section from the input text
  const detailedPromptSection = sections.find((section) =>
    section.startsWith('Detailed Prompt Template')
  );

  if (detailedPromptSection) {
    const [, ...promptContentLines] = detailedPromptSection.split('\n');
    const promptContent = promptContentLines.join('\n'); // Preserve newlines for proper formatting

    const wrappedPrompt = doc.splitTextToSize(promptContent, 180); // Wrap text to fit within slide margins
    y += 30; // Add spacing after header
    wrappedPrompt.forEach((line) => {
      if (y + 10 > 190) {
        doc.addPage();
        doc.setFillColor(backgroundColor);
        doc.rect(0, 0, 210, 210, 'F');
        doc.setTextColor('#944454');
        doc.setFont('Courier', 'normal');
        y = 30;
      }
      doc.text(line, 15, y, { align: 'left', maxWidth: 180 });
      y += 10;
    });
  }

  doc.setFontSize(15);
  doc.setTextColor(watermarkColor);
  doc.text('FOLLOW @VamsiPenmetsa', 105, 200, { align: 'center' });

  const sanitizedTitle = firstSentence.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/\s+/g, '_');
  doc.save(`${sanitizedTitle}.pdf`);
};
</script>

<template>
  <div id="app">
    <header>
      <h1>Carousel Post Generator</h1>
      <p>Create beautiful PDF slides for LinkedIn posts</p>
    </header>

    <main>
      <textarea v-model="inputText" placeholder="Enter your text here... Use '---' to separate sections." rows="10"></textarea>
      <button @click="generatePDF">Generate PDF</button>
    </main>
  </div>
</template>

<style scoped>
#app {
  font-family: 'Courier New', Courier, monospace;
  text-align: center;
  margin: 0 auto;
  max-width: 600px;
  padding: 20px;
}

header {
  margin-bottom: 20px;
}

header h1 {
  font-size: 2rem;
  color: #333;
}

header p {
  font-size: 1.2rem;
  color: #666;
}

textarea {
  width: 100%;
  padding: 10px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007BFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
