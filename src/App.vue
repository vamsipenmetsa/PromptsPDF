<script setup lang="ts">
import { ref } from 'vue';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const inputText = ref('');

const generatePDF = async () => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [210, 210] });
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.width = '210mm';
  tempDiv.style.height = '210mm';
  tempDiv.style.margin = '0';
  tempDiv.style.padding = '0';
  document.body.appendChild(tempDiv);

  const sections = inputText.value.split(/---/).map((section) => section.trim()).filter(Boolean);
  let slideNumber = 0;
  const totalContentSlides = sections.length > 1 ? sections.length -1 : 0;
  const totalSlides = totalContentSlides + 2; // Title + Content + Final

  // --- Helper Function for Footer ---
  const createFooterHTML = (isLastSlide = false) => `
    <div style="
      position: absolute;
      bottom: 30px;
      left: 40px;
      right: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: 'Montserrat', sans-serif;
    ">
      <div style="display: flex; align-items: center;">
        <img src="./vamsipenmetsa.png" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 15px; background-color: rgba(255, 255, 255, 0.2); padding: 5px; object-fit: cover;" alt="Profile">
        <div>
          <p style="color: white; font-size: 18px; margin: 0; font-weight: bold;">@VamsiPenmetsa</p>
          <p style="color: rgba(255, 255, 255, 0.8); font-size: 16px; margin: 0;">vamsipenmetsa.com</p>
        </div>
      </div>
      ${isLastSlide ? `
      <div style="display: flex; gap: 20px; align-items: center;">
        <span style="
          font-size: 30px;
          color: white;
          line-height: 1;
          background: rgba(255,255,255,0.18);
          border-radius: 18px;
          padding: 10px 18px;
          box-shadow: 0 4px 24px 0 rgba(31,38,135,0.13);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
        ">💬</span>
        <span style="
          font-size: 30px;
          color: white;
          line-height: 1;
          background: rgba(255,255,255,0.18);
          border-radius: 18px;
          padding: 10px 18px;
          box-shadow: 0 4px 24px 0 rgba(31,38,135,0.13);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
        ">❤️</span>
        <span style="
          font-size: 30px;
          color: white;
          line-height: 1;
          background: rgba(255,255,255,0.18);
          border-radius: 18px;
          padding: 10px 18px;
          box-shadow: 0 4px 24px 0 rgba(31,38,135,0.13);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
        ">📎</span>
      </div>
      ` : ''}
    </div>
  `;

  // --- Helper Function for Slide Number ---
  const createSlideNumberHTML = (number: number, total: number) => `
    <div style="
      position: absolute;
      top: 30px;
      right: 40px;
      background-color: rgba(0, 0, 0, 0.3);
      color: white;
      padding: 5px 10px;
      border-radius: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: bold;
      font-family: 'Montserrat', sans-serif;
    ">${number}/${total}</div>
  `;

  // --- Title Slide (Slide 1) ---
  slideNumber++;
  const firstSection = sections[0] || "";
  const firstSectionLines = firstSection.split('\n').filter(Boolean);
  const firstTitle = firstSectionLines[0] || "";
  const glassSubtitle = "Creative Prompt Ideas by Vamsi Penmetsa💡";
  const firstSubtitles = firstSectionLines.slice(1).join('<br>');
  tempDiv.innerHTML = `
    <div style="
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 40px 40px 100px 40px;
      background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      font-family: 'Montserrat', sans-serif;
      overflow: hidden;
      position: relative;
      text-align: center;
    ">
      ${createSlideNumberHTML(slideNumber, totalSlides)}
      <img src="./vamsipenmetsa.png" style="width: 140px; height: 140px; border-radius: 50%; margin: 0 auto 32px auto; background-color: rgba(255,255,255,0.18); padding: 10px; object-fit: cover; box-shadow: 0 4px 24px 0 rgba(31,38,135,0.13);" alt="Profile">
      <div style="
        width: 90%;
        text-align: center;
        background: rgba(255,255,255,0.15);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-radius: 24px;
        box-shadow: 0 8px 32px 0 rgba(31,38,135,0.37);
        padding: 40px 32px 32px 32px;
        margin-bottom: 24px;
      ">
        <h1 style="
          color: white;
          font-size: 52px;
          margin: 0 0 25px 0;
          font-weight: bold;
          line-height: 1.2;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        ">${firstTitle}</h1>
        <p style="color: rgba(255,255,255,0.92); font-size: 24px; line-height: 1.5; margin: 0 0 12px 0; font-weight: 500;">${glassSubtitle}</p>
        ${firstSubtitles ? `<p style=\"color: rgba(255, 255, 255, 0.9); font-size: 20px; line-height: 1.5; margin: 0;\">${firstSubtitles}</p>` : ''}
      </div>
      <div style="
        position: absolute;
        bottom: 30px;
        right: 40px;
        color: white;
        font-size: 16px;
        font-family: 'Montserrat', sans-serif;
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255,255,255,0.18);
        border-radius: 18px;
        padding: 10px 22px;
        box-shadow: 0 4px 24px 0 rgba(31,38,135,0.13);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      ">
        Discover more <span style="font-size: 24px; line-height: 1;">→</span>
      </div>
    </div>
  `;

  const titleCanvas = await html2canvas(tempDiv, { width: tempDiv.offsetWidth, height: tempDiv.offsetHeight, scale: 2, backgroundColor: null });
  const titleImgData = titleCanvas.toDataURL('image/png');
  doc.addImage(titleImgData, 'PNG', 0, 0, 210, 210);

  // --- Content Slides ---
  const contentSections = sections.slice(1);

  for (let i = 0; i < contentSections.length; i++) {
    const section = contentSections[i];
    slideNumber++;
    doc.addPage();
    
    const [header, ...contentLines] = section.split('\n');
    const content = contentLines.join('<br>');

    const currentGradient = "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)";

    tempDiv.innerHTML = `
      <div style="
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 40px 40px 100px 40px;
        background: ${currentGradient};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; 
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
        overflow: hidden;
        position: relative;
      ">
        ${createSlideNumberHTML(slideNumber, totalSlides)}
        <div style="width: 90%; text-align: left;"> 
          <h2 style="
            color: white;
            font-size: 44px;
            margin: 0 0 25px 0;
            font-weight: bold;
            line-height: 1.2;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          ">${header.replace(/[^a-zA-Z0-9 ]/g, '').trim()}</h2>
          <div style="
            color: rgba(255, 255, 255, 0.9);
            font-size: 22px;
            line-height: 1.5;
          ">
            ${content.replace(/\n/g, '<br>')}
          </div>
        </div>
        ${createFooterHTML(false)}
      </div>
    `;

    const contentCanvas = await html2canvas(tempDiv, { width: tempDiv.offsetWidth, height: tempDiv.offsetHeight, scale: 2, backgroundColor: null });
    const contentImgData = contentCanvas.toDataURL('image/png');
    doc.addImage(contentImgData, 'PNG', 0, 0, 210, 210);
  }

  // --- Final Slide ---
  slideNumber++;
  doc.addPage();
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
      font-family: 'Montserrat', sans-serif;
      overflow: hidden;
      position: relative;
      text-align: center;
    ">
      <div style="
        width: 90%;
        max-width: 650px;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 0 0 0;
        background: rgba(255,255,255,0.15);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-radius: 24px;
        box-shadow: 0 8px 32px 0 rgba(31,38,135,0.37);
        padding: 48px 32px 40px 32px;
      ">
        <div style="color: rgba(255,255,255,0.85); font-size: 22px; margin-bottom: 24px; font-weight: 500; letter-spacing: 1px;">Ace Your Journey</div>
        <div style="font-size: 48px; font-weight: 900; color: #fff; margin-bottom: 32px; line-height: 1.1;">
          Nail your AI Prompting<br>Skills
        </div>
        <div style="color: #fff; font-size: 22px; margin-bottom: 10px; letter-spacing: 1px; line-height: 1.5;">
          You're now ready to tackle your daily challenges with zero shot prompts.
        </div>
        <div style="color: #fff; font-size: 22px; font-weight: bold; margin-bottom: 32px; letter-spacing: 1px; line-height: 1.5;">
          FOLLOW me for more ideas.
        </div>
        <button style="
          background: #111; color: #fff; border: none; border-radius: 30px;
          font-size: 22px; font-weight: bold; padding: 18px 44px; box-shadow: 0 2px 12px rgba(0,0,0,0.18); cursor: pointer; letter-spacing: 1px; margin-bottom: 10px;">
          Ask your questions!
        </button>
      </div>
      ${createFooterHTML(true)}
    </div>
  `;

  const finalCanvas = await html2canvas(tempDiv, { width: tempDiv.offsetWidth, height: tempDiv.offsetHeight, scale: 2, backgroundColor: null });
  const finalImgData = finalCanvas.toDataURL('image/png');
  doc.addImage(finalImgData, 'PNG', 0, 0, 210, 210);

  document.body.removeChild(tempDiv);

  const sanitizedTitle = firstTitle.replace(/[^a-zA-Z0-9 ]/g, '').trim().replace(/\s+/g, '_');
  doc.save(`${sanitizedTitle || 'Carousel'}.pdf`);
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
