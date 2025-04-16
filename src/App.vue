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
  doc.setFillColor('#FCE5DE'); // Updated background color to #FCE5DE
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

    doc.setFontSize(18);
    doc.setTextColor(watermarkColor);
    doc.text('@VamsiPenmetsa', 105, 200, { align: 'center' });
  });

  // Add a final page with a call to action
  doc.addPage();
  doc.setFillColor('#FCE5DE'); // Set background color to #FCE5DE
  doc.rect(0, 0, 210, 210, 'F'); // Full square background
  doc.setTextColor('#944454'); // Set text color to #944454
  doc.setFont('Courier', 'bold');
  doc.setFontSize(30); // Big bold text
  doc.text('FOLLOW Vamsi Penmetsa ;)', 105, 105, { align: 'center' }); // Centered text

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
