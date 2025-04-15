
<script setup lang="ts">
import { ref } from 'vue';
import jsPDF from 'jspdf';

const inputText = ref('');

const generatePDF = () => {
  const doc = new jsPDF({ orientation: 'landscape' });

  // Atom One Dark theme colors
  const backgroundColor = '#1e1e2f';
  const textColor = '#dcdcdc';
  const highlightColor = '#c678dd';

  // Extract the first sentence as the title (remove special characters)
  const firstSentence = inputText.value.split(/\.|\n/)[0].replace(/[^a-zA-Z0-9 ]/g, '').trim();

  // Title slide
  doc.setFillColor(backgroundColor);
  doc.rect(0, 0, 297, 210, 'F'); // Full dark background
  doc.setTextColor(highlightColor);
  doc.setFont('Courier', 'bold');
  doc.setFontSize(36); // Adjusted font size for the title
  const wrappedTitle = doc.splitTextToSize(firstSentence, 260); // Wrap title text to fit within slide margins
  let y = 80; // Reset y for title slide
  wrappedTitle.forEach((line) => {
    doc.text(line, 20, y, { align: 'left' }); // Left-aligned title
    y += 12;
  });
  doc.setFontSize(20);
  doc.setTextColor(textColor);
  doc.text('Learn How to Prompt with Vamsi Penmetsa', 20, y + 20, { align: 'left' }); // Left-aligned subtitle

  // Split input into sections by '---' divider
  const sections = inputText.value.split(/---/).map((section) => section.trim()).filter(Boolean);

  sections.forEach((section, index) => {
    // Add a new page for each section, skipping the first slide
    if (index === 0) return;

    doc.addPage();

    // Set background and text styles
    doc.setFillColor(backgroundColor);
    doc.rect(0, 0, 297, 210, 'F');
    doc.setTextColor(highlightColor);
    doc.setFont('Courier', 'bold');
    doc.setFontSize(20);

    // Extract header and content
    const [header, ...contentLines] = section.split('\n');
    const content = contentLines.join('\n'); // Preserve newlines for proper formatting

    // Add header
    y = 50; // Reset y for each new section
    doc.text(header.replace(/[^a-zA-Z0-9 ]/g, '').trim(), 20, y, { align: 'left' }); // Left-aligned header

    // Add content with bullet points
    doc.setTextColor(textColor);
    doc.setFont('Courier', 'normal');
    doc.setFontSize(14);
    const wrappedContent = content.split('\n').flatMap((line) => {
      if (line.startsWith('-')) {
        return doc.splitTextToSize(`• ${line.slice(1).trim()}`, 260); // Add bullet point symbol
      }
      return doc.splitTextToSize(line.trim(), 260);
    });

    y += 20; // Add spacing after header
    wrappedContent.forEach((line) => {
      if (y + 10 > 190) {
        doc.addPage();
        doc.setFillColor(backgroundColor);
        doc.rect(0, 0, 297, 210, 'F');
        doc.setTextColor(textColor);
        y = 20; // Reset y for new page
      }
      doc.text(line, 20, y, { align: 'left' }); // Left-aligned content
      y += 10;
    });
  });

  // Final slide with dynamic prompt style
  doc.addPage();
  doc.setFillColor(backgroundColor);
  doc.rect(0, 0, 297, 210, 'F');
  doc.setTextColor('#e06c75'); // Unique red color for the prompt header
  doc.setFont('Courier', 'bold'); // Coding-style font
  doc.setFontSize(24);
  y = 50; // Reset y for final slide
  doc.text('Your Prompt:', 20, y, { align: 'left' });

  doc.setTextColor('#98c379'); // Unique green color for the prompt content
  doc.setFontSize(16);
  // Extract the "Detailed Prompt Template" section from the input text
  const detailedPromptSection = sections.find((section) =>
    section.startsWith('Detailed Prompt Template')
  );

  if (detailedPromptSection) {
    const [, ...promptContentLines] = detailedPromptSection.split('\n');
    const promptContent = promptContentLines.join('\n'); // Preserve newlines for proper formatting

    const wrappedPrompt = doc.splitTextToSize(promptContent, 260); // Wrap text to fit within slide margins
    y += 30; // Add spacing after header
    wrappedPrompt.forEach((line) => {
      if (y + 10 > 190) {
        doc.addPage();
        doc.setFillColor(backgroundColor);
        doc.rect(0, 0, 297, 210, 'F');
        doc.setTextColor('#98c379');
        doc.setFont('Courier', 'normal');
        y = 20; // Reset y for new page
      }
      doc.text(line, 20, y, { align: 'left' });
      y += 10;
    });
  }

  // Save the PDF with the title as the filename
  const sanitizedTitle = firstSentence.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/\s+/g, '_'); // Sanitize and format the title
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
