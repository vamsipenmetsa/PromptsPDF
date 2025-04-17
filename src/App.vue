<script setup lang="ts">
import { ref } from 'vue';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const inputText = ref('');

const generatePDF = async () => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [210, 210] });

  // Create a temporary div for rendering the slide
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.width = '210mm';
  tempDiv.style.height = '210mm';
  tempDiv.style.margin = '0';
  tempDiv.style.padding = '0';
  document.body.appendChild(tempDiv);

  const firstSentence = inputText.value.split(/\.|\n/)[0].replace(/[^a-zA-Z0-9 ]/g, '').trim();

  // Title slide
  tempDiv.innerHTML = `
    <div style="
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      font-family: 'Montserrat', sans-serif;
      overflow: hidden;
    ">
      <div style="
        background: rgba(255, 255, 255, 0.15);
        border-radius: 15px;
        padding: 30px;
        width: 90%;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      ">
        <h1 style="
          color: white;
          font-size: 40px;
          margin: 0 0 25px 0;
          text-align: center;
          font-family: 'Montserrat', sans-serif;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        ">${firstSentence}</h1>
        <p style="
          color: rgba(255, 255, 255, 0.8);
          font-size: 24px;
          margin: 0;
          text-align: center;
          font-family: 'Montserrat', sans-serif;
        ">Creative PROMPTS by Vamsi Penmetsa</p>
      </div>
    </div>
  `;

  const titleCanvas = await html2canvas(tempDiv, {
    width: tempDiv.offsetWidth,
    height: tempDiv.offsetHeight,
    scale: 2
  });
  const titleImgData = titleCanvas.toDataURL('image/png');
  doc.addImage(titleImgData, 'PNG', 0, 0, 210, 210);

  const sections = inputText.value.split(/---/).map((section) => section.trim()).filter(Boolean);

  for (const section of sections.slice(1)) {
    doc.addPage();
    
    const [header, ...contentLines] = section.split('\n');
    const content = contentLines.join('\n');

    tempDiv.innerHTML = `
      <div style="
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
        overflow: hidden;
      ">
        <div style="
          background: rgba(255, 255, 255, 0.15);
          border-radius: 15px;
          padding: 35px;
          width: 90%;
          margin: 0 auto;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        ">
          <h2 style="
            color: white;
            font-size: 34px;
            margin: 0 0 25px 0;
            font-family: 'Montserrat', sans-serif;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          ">${header.replace(/[^a-zA-Z0-9 ]/g, '').trim()}</h2>
          <div style="
            color: rgba(255, 255, 255, 0.9);
            font-size: 20px;
            line-height: 1.6;
            font-family: 'Montserrat', sans-serif;
            margin-bottom: 20px;
          ">
            ${content.split('\n').map(line => 
              line.startsWith('-') 
                ? `<p style="margin: 12px 0; text-align: left;">• ${line.slice(1).trim()}</p>`
                : `<p style="margin: 12px 0; text-align: left;">${line.trim()}</p>`
            ).join('')}
          </div>
          <p style="
            color: rgba(255, 255, 255, 0.6);
            font-size: 18px;
            text-align: right;
            margin: 0;
            font-family: 'Montserrat', sans-serif;
          ">@VamsiPenmetsa</p>
        </div>
      </div>
    `;

    const contentCanvas = await html2canvas(tempDiv, {
      width: tempDiv.offsetWidth,
      height: tempDiv.offsetHeight,
      scale: 2
    });
    const contentImgData = contentCanvas.toDataURL('image/png');
    doc.addImage(contentImgData, 'PNG', 0, 0, 210, 210);
  }

  // Final page
  doc.addPage();
  tempDiv.innerHTML = `
    <div style="
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Montserrat', sans-serif;
      overflow: hidden;
    ">
      <div style="
        background: rgba(255, 255, 255, 0.15);
        border-radius: 15px;
        padding: 40px;
        text-align: center;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        width: 80%;
      ">
        <h2 style="
          color: white;
          font-size: 38px;
          margin: 0;
          font-family: 'Montserrat', sans-serif;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        ">FOLLOW Vamsi Penmetsa ;)</h2>
      </div>
    </div>
  `;

  const finalCanvas = await html2canvas(tempDiv, {
    width: tempDiv.offsetWidth,
    height: tempDiv.offsetHeight,
    scale: 2
  });
  const finalImgData = finalCanvas.toDataURL('image/png');
  doc.addImage(finalImgData, 'PNG', 0, 0, 210, 210);

  document.body.removeChild(tempDiv);

  const sanitizedTitle = firstSentence.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/\s+/g, '_');
  doc.save(`${sanitizedTitle}.pdf`);
};
</script>

<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 font-sans">
    <div class="container mx-auto px-4 py-12">
      <header class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-3">Carousel Post Generator</h1>
        <p class="text-lg md:text-xl text-gray-600">Create beautiful PDF slides for LinkedIn posts</p>
      </header>

      <main class="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <textarea
          v-model="inputText"
          placeholder="Enter your text here... Use '---' on a new line to separate sections."
          rows="15"
          class="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-6 text-gray-700 leading-relaxed"
        ></textarea>
        <button
          @click="generatePDF"
          class="w-full bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end text-white font-bold py-3 px-6 rounded-md hover:opacity-90 transition duration-300 text-lg shadow-md"
        >
          Generate PDF
        </button>
      </main>

      <footer class="relative text-center mt-12 text-gray-400 text-sm z-10">
        <p>Made with ❤️ by Vamsi Penmetsa.</p>
        <p>&copy; 2025 Vamsi Penmetsa. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');

#app {
  font-family: 'Montserrat', sans-serif;
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
  /* color: #333; */ /* Removed to allow Tailwind class to apply */
  font-family: 'Montserrat', sans-serif;
}

header p {
  font-size: 1.2rem;
  /* color: #666; */ /* Removed to allow Tailwind class to apply */
  font-family: 'Montserrat', sans-serif;
}

textarea {
  width: 100%;
  padding: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  transition: transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}
</style>
