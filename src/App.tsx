"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { options } from "@/lib/editorOptions";
import { Button } from "@/components/ui/button";
import "katex/dist/katex.min.css";
import MainSheet from "./components/main-sheet";
import Render from "./components/Render";
import { getParsedText } from "./lib/groq";

export default function Home() {
  const [language, setLanguage] = useState("markdown");
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [editorValue, setEditorValue] = useState("");
  const [latexEditorValue, setLatexEditorValue] = useState("");
  const editorRef = useRef();

  function handleEditorDidMount(editor, monaco) {
    setIsEditorReady(true);
    editorRef.current = editor;
  }
  const handleCopy = () => {
    if (latexEditorValue) {
      navigator.clipboard.writeText(latexEditorValue);
      alert("Copied to clipboard!");
    } else {
      alert("Editor is empty.");
    }
  };

  const handleClick = async () => {
    try {
      const parsedText = await getParsedText(editorValue);
      setLatexEditorValue(parsedText || "");
      console.log(parsedText);
    } catch (error) {
      console.error("Error parsing text:", error);
    }
  };

  useEffect(() => {
    const updatedEditorValue = editorValue.replace(/\\/g, "\\\\");

    setLatexEditorValue(updatedEditorValue);

    const latexForParser = editorValue.replace(/\\\\/g, "\\");

    console.log(latexForParser);
  }, [editorValue]);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center gap-2 justify-center h-full py-[100px] px-5 md:px-20">
        <div className="flex flex-col rounded-md overflow-hidden gap-2 w-full h-full">
          <p className=" font-bold shadow border rounded p-2">Main Editor</p>
          <Editor
            height="50%"
            defaultLanguage={language}
            language={language}
            onMount={handleEditorDidMount}
            theme="vs-dark"
            value={editorValue}
            onChange={(value) => setEditorValue(value || "")}
            options={options}
          />

          <Button onClick={handleClick} disabled={!isEditorReady}>
            Convert to LaTeX
          </Button>

          <p className=" font-bold shadow rounded p-2">Parsed LaTeX</p>
          <Editor
            id="editor-value"
            defaultLanguage={language}
            language={language}
            onMount={handleEditorDidMount}
            theme="vs-dark"
            value={latexEditorValue}
            onChange={(value) => setLatexEditorValue(value || "")}
            options={options}
          />

          <Button onClick={handleCopy} disabled={!isEditorReady}>
            Copy text
          </Button>
        </div>

        <div className="h-full w-full bg-white p-4">
          <div className="w-[800px] shadow-xl bg-white rounded p-5 h-full ">
            <Render inputText={latexEditorValue} />
          </div>
        </div>
        <MainSheet language={language} setLanguage={setLanguage} />
      </div>
    </div>
  );
}
