import Groq from "groq-sdk";

export const getParsedText = async (textInput: string) => {
  try {
    const groq = new Groq({
      apiKey: "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",
      dangerouslyAllowBrowser: true,
    });

    const prompt = `Convert the following natural language to a LaTeX equation, output only the latex part and nothing else and if any equation must be in math mode as $, seperate equations and normal text like in the example  
output should be like in this example only:
\begin{abstract}
This document will show most of the features of \LaTeX.js while at the same time being a gentle introduction to \LaTeX.
In the appendix, the API as well as the  $\lim_{x \to 0} \int_{0}^{1} \frac{\sin x}{\cos x} \, dx$ format of custom macro definitions in JavaScript will be explained.
\end{abstract}

This is the input : 
"${textInput}". 

`;

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-70b-8192",
    });

    let responseContent =
      response?.choices?.[0]?.message?.content || "No content found";
    responseContent = responseContent.replace(/\/\/+/g, "/");

    return responseContent;
  } catch (error) {
    console.error("Error fetching data from Groq API:", error);
    return null;
  }
};
