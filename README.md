# Carousel Post PDF Generator

This project is a simple web application built with Vue.js and Vite that allows users to generate PDF carousel slides from text input, suitable for platforms like LinkedIn.

## Features

*   Converts text input into a series of square PDF slides (210x210 mm).
*   Automatically uses the first sentence as the title for the first slide.
*   Separates content into different slides using `---` as a delimiter.
*   Customizable background and text colors.
*   Adds a title slide and a final "Follow" slide.
*   Outputs a downloadable PDF file named after the title.

## Demo

You can access the live application here: [https://vamsipenmetsa7.github.io/PromptsPDF/](https://vamsipenmetsa7.github.io/PromptsPDF/)

*(Note: Ensure the GitHub Pages deployment is successful for this link to work)*

## Getting Started

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/vamsipenmetsa7/PromptsPDF.git
    cd PromptsPDF
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    # yarn install
    ```

### Running Locally

```bash
npm run dev
# or
# yarn dev
```

This will start the Vite development server, usually at `http://localhost:5173`.

### Building for Production

```bash
npm run build
# or
# yarn build
```

This command builds the application for production, outputting the static files to the `dist` directory.

## Usage

1.  Open the application in your browser (either locally or the deployed version).
2.  Enter your desired text content into the text area.
3.  Use `---` on a new line to separate the content for different slides. The text before the first `---` will be used for the title slide. Each section after `---` will start on a new slide, with the first line as the header.
4.  Click the "Generate PDF" button.
5.  A PDF file will be generated and downloaded by your browser.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
