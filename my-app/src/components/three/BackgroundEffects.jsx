
"use client";

import { useEffect, useState } from "react";


const code = [
  "const developer = {",
  "  name: 'Creative Developer',",
  "  stack: ['React', 'Next.js', 'Three.js'],",
  "  passion: 'Building digital experiences',",
  "};",
  "",
  "function createExperience() {",
  "  const ideas = getCreativeIdeas();",
  "  return ideas.map((idea) => {",
  "    return buildSomethingAmazing(idea);",
  "  });",
  "}",
  "",
  "async function launchProject() {",
  "  const result = await developer.build();",
  "  console.log('Project launched!', result);",
  "}",
  "",
  "launchProject();",
];

export default function LiveCodeBackground() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let line = 0;
    let char = 0;
    let timeout;

    const type = () => {
      if (line >= code.length) {
        timeout = setTimeout(() => {
          line = 0;
          char = 0;
          setVisibleLines([]);
          setTypedText("");
          setCurrentLine(0);
          type();
        }, 2500);
        return;
      }

      const current = code[line];

      if (char <= current.length) {
        setTypedText(current.slice(0, char));
        setCurrentLine(line);
        char++;

        timeout = setTimeout(type, 45);
      } else {
        setVisibleLines((prev) => [...prev, current]);
        line++;
        char = 0;
        setTypedText("");
        timeout = setTimeout(type, 180);
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="live-code-background">
      <div className="live-code-window">
        <div className="live-code-topbar">
          <div className="live-code-dots">
            <span />
            <span />
            <span />
          </div>

          <span className="live-code-title">
            portfolio.js — Visual Studio Code
          </span>

          <span className="live-code-status">
            <span /> LIVE
          </span>
        </div>

        <div className="live-code-editor">
          <div className="live-code-lines">
            {visibleLines.slice(-18).map((item, index) => (
              <div className="live-code-row" key={`${index}-${item}`}>
                <span className="live-code-number">
                  {visibleLines.length - Math.min(visibleLines.length, 18) + index + 1}
                </span>
                <CodeText text={item} />
              </div>
            ))}

            <div className="live-code-row">
              <span className="live-code-number">
                {visibleLines.length + 1}
              </span>

              <CodeText text={typedText} />
              <span className="typing-cursor" />
            </div>
          </div>
        </div>

        <div className="live-code-footer">
          <span>UTF-8</span>
          <span>JavaScript</span>
          <span>Ln {currentLine + 1}</span>
          <span>● Running</span>
        </div>
      </div>
    </div>
  );
}

function CodeText({ text }) {
  const parts = text.split(
    /('.*?'|".*?"|\b(const|let|var|function|return|async|await|new)\b|\b(console|developer|ideas|result)\b)/g
  );

  return (
    <span className="live-code-text">
      {parts.map((part, index) => {
        let className = "";

        if (/^'.*?'|^".*?"$/.test(part)) {
          className = "syntax-string";
        } else if (
          /^(const|let|var|function|return|async|await|new)$/.test(part)
        ) {
          className = "syntax-keyword";
        } else if (/^(console|developer|ideas|result)$/.test(part)) {
          className = "syntax-variable";
        }

        return (
          <span className={className} key={index}>
            {part}
          </span>
        );
      })}
    </span>
  );
}
