// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useEffect, useRef } from "react";

const escapeLaTeX = (latex) => {
  return latex.replace(/\\/g, "\\\\"); // Escape backslashes
};

const Render = ({ inputText }) => {
  const latexContainerRef = useRef(null);

  useEffect(() => {
    const loadLaTeX = async () => {
      const { LaTeXJSComponent } = await import(
        "https://cdn.jsdelivr.net/npm/latex.js/dist/latex.mjs"
      );
      if (!customElements.get("latex-js")) {
        customElements.define("latex-js", LaTeXJSComponent);
      }
    };

    loadLaTeX();
  }, []);

  useEffect(() => {
    if (latexContainerRef.current) {
      const escapedInputText = escapeLaTeX(inputText);
      console.log("this is escaped", escapedInputText);

      latexContainerRef.current.innerHTML = `
        <latex-js baseURL="https://cdn.jsdelivr.net/npm/latex.js/dist/">
         ${inputText} 
        </latex-js>
      `;
    }
  }, [inputText]);

  return (
    <div>
      <h1>Compiling LaTeX</h1>
      <div ref={latexContainerRef}></div>
      <style jsx>{`
        latex-js {
          display: inline-block;
          width: 100%;
          height: 100%;
          margin-right: 2em;
        }
      `}</style>
    </div>
  );
};

export default Render;
