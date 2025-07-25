import type { OutputData } from "@editorjs/editorjs";
import type { BlockData, Config } from "editorjs-parser";
import edjsParser from "editorjs-parser";
import katex from "katex";
import hljs from "highlight.js";
import "@/styles/highlightjs.css";
import { useEffect, useRef } from "react";
import { createRoot, type Root } from "react-dom/client";
import { QuestionsOutput } from "./custom_questions/QuestionInstance";
import type { QuestionFormat } from "@/types/questions";
import "@/styles/katexStyling.css";
import styles from "./Renderer.module.css";

export function decodeEntities(str: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

// derived from advancedtextbox
function parseLatex(text: string): string {
  const decoded = decodeEntities(text);

  return decoded
    .split(/(\$@[^$]+\$)/g)
    .map((part) => {
      if (/^\$@[^$]+\$$/.test(part)) {
        const expr = part.slice(2, -1);
        return katex.renderToString(expr, {
          throwOnError: false,
          output: "html",
        });
      }
      return part;
    })
    .join("");
}

const customParsers: Record<
  string,
  (data: BlockData, _config: Config) => string
> = {
  alert: (data, _config) => {
    const { align, message, type } = data as {
      align: string;
      message: string;
      type: string;
    };
    return `<div class="cdx-alert cdx-alert-align-${align} cdx-alert-${type}">
      <div class="cdx-alert__message" contenteditable="true" data-placeholder="Type here..." data-empty="false">
        ${message}
      </div>
    </div>`;
  },

  code: (data, _config) => {
    const { code } = data as { code: string };
    const highlighted = hljs.highlightAuto(code).value;
    return `<pre class="code"><code>${highlighted}</code></pre>`;
  },

  delimiter: (_data, _config) => {
    return "<hr />";
  },

  embed: (data, _config) => {
    const { caption, regex, embed, source, height, width } = data as {
      caption: string;
      regex: string;
      embed: string;
      source: string;
      height: number;
      width: number;
    };
    return `<div class="cdx-block embed-tool">
      <preloader class="embed-tool__preloader">
        <div class="embed-tool__url">${source}</div>
      </preloader>
      <iframe class="rounded-lg w-full" height="${height}" width="${width}" style="margin: 0 auto;" frameborder="0" scrolling="no" allowtransparency="true" src="${embed}" class="embed-tool__content"></iframe>
      <figcaption class="fig-cap">${caption}</figcaption>
    </div>`;
  },

  math: (data, _config) => {
    const { text } = data as { text: string };
    return katex.renderToString(text, {
      output: "html",
      throwOnError: true,
      displayMode: true,
    });
  },

  paragraph: (data, _config) => {
    const { text } = data as { text: string };
    const parsedText = parseLatex(text);
    return `<p class="paragraph">${parsedText}</p>`;
  },

  quote: (data, _config) => {
    const { alignment, caption, text } = data as {
      alignment: string;
      caption: string;
      text: string;
    };
    return `<blockquote>
      <p class="mb-3">${text}</p>
      <cite>${caption}</cite>
    </blockquote>`;
  },

  table: (data, _config) => {
    const { withHeadings, content } = data as {
      withHeadings: boolean;
      content: string[][];
    };
    if (content.length === 0) {
      return "<table></table>";
    }
    const rows = content.map((row, index) => {
      if (withHeadings && index === 0) {
        return `<tr class="divide-x-[1px]">${row.reduce(
          (acc, cell) => acc + `<th>${cell}</th>`,
          "",
        )}</tr>`;
      }

      // For other rows, use <td> tags
      return `<tr class="divide-x-[1px]">${row.reduce(
        (acc, cell) => acc + `<td>${cell}</td>`,
        "",
      )}</tr>`;
    });
    const thead = withHeadings ? `<thead>${rows.shift()}</thead>` : "";
    const tbody = `<tbody>${rows.join("")}</tbody>`;

    return `<table>${thead}${tbody}</table>`;
  },

  list: (data, _config) => {
    const { style, items, meta } = data;

    const renderItems = (items: typeof data.items, depth = 0): string => {
      if (!items || items.length === 0) return "";

      if (style === "checklist") {
        return `<div class="checklist depth-${depth}">
        ${items
          .map((item) => {
            const checked =
              ("checked" in item.meta && item.meta?.checked) ?? false;
            const nested = renderItems(item.items, depth + 1);
            return `<div class="checklist-item">
              <label>
                <input type="checkbox" ${checked ? "checked" : ""} />
                <span>${parseLatex(item.content)}</span>
              </label>
              ${nested}
            </div>`;
          })
          .join("")}
        </div>`;
      }

      const tag = style === "ordered" ? "ol" : "ul";

      // const startAttr = meta?.start ? ` start="${meta.start}"` : "";

      // const typeAttr = meta?.counterType
      //   ? ` style="--list-counter-type: ${meta.counterType};"`
      //   : "";

      return `
      <${tag} class="depth-${depth}" style="counter-reset: item ${meta?.start ? meta.start - 1 || 1 : ""}; ${meta?.counterType ? `--list-counter-type: ${meta.counterType};` : ""}">
      ${items
        .map(
          (item) =>
            `<li>
              ${parseLatex(item.content)}
              ${renderItems(item.items, depth + 1)}
            </li>`,
        )
        .join("")}
      </${tag}>`;
    };

    return `<div class="${styles.list}">${renderItems(items)}</div>`;
  },

  questionsAddCard: (data, _config) => {
    const { instanceId } = data as {
      instanceId: string;
      content: QuestionFormat;
    };
    return `<div class="questions-block-${instanceId}"></div>`;
  },
};

const rootMap = new Map<Element, Root>();

const Renderer = (props: { content: OutputData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dataFetched = useRef<boolean>(false);
  const instanceIdsLoaded = useRef<Set<string>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = props.content.blocks;

        // Process data.blocks only once
        data.forEach((block) => {
          if (block.type === "questionsAddCard") {
            // block.data is a <string, any> and since its part of editorjs, im not changing the type.
            // As long as editorjs doesnt depricate in a way that affects this, then this should be fine
            /* eslint-disable-next-line */
            const instanceId = block.data.instanceId as string;
            const storageKey = `questions_${instanceId}`;

            // Check if this instanceId has already been processed
            if (!instanceIdsLoaded.current.has(instanceId)) {
              /* eslint-disable */
              const questionsFromDb: QuestionFormat[] =
                block.data.questions.map(
                  /* eslint-enable */
                  (questionInstance: QuestionFormat) => ({
                    ...questionInstance,
                    questionInstance: questionInstance.question || {
                      value: "",
                    },
                    options: questionInstance.options.map((option) => ({
                      ...option,
                      value: option.value || { value: "" },
                    })),
                    answers: questionInstance.answers || [],
                    explanation: questionInstance.explanation || {
                      value: "",
                    },
                  }),
                );

              // Update local storage (Will be used line XXX)
              localStorage.setItem(storageKey, JSON.stringify(questionsFromDb));

              // Trigger a manual event to notify listeners that localStorage was updated
              const event = new Event("questionsUpdated");
              window.dispatchEvent(event);

              // Mark this instanceId as loaded
              instanceIdsLoaded.current.add(instanceId);
            }
          }
        });

        // Set dataFetched to true after processing all blocks
        dataFetched.current = true;
      } catch (error) {
        console.error("Error fetching questions from Firestore:", error);
      }

      // Proceed to render the components
      if (containerRef.current) {
        props.content.blocks.forEach((block) => {
          /* eslint-disable */ // InstanceOf doesnt seem to work so Im just using this as a substitute
          if (block.type === "questionsAddCard") {
            const instanceId = block.data.instanceId;
            const placeholder = containerRef.current!.querySelector(
              `.questions-block-${instanceId}`,
            );

            if (placeholder) {
              let root = rootMap.get(placeholder);

              // If no root exists for this placeholder, create one and store it
              if (!root) {
                root = createRoot(placeholder);
                rootMap.set(placeholder, root);
              }

              // Render the component
              root.render(
                <QuestionsOutput instanceId={instanceId.toString()} />,
              );
            }
          }
          /* eslint-enable */
        });
      }
    };

    // Call the fetchData function
    fetchData().catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [props.content]);

  if (!props.content) return null;

  const parser = new edjsParser(
    {
      image: {
        use: "figure",
        imgClass: "img rounded-lg",
      },
    },
    customParsers,
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const markup = parser.parse(props.content);

  return (
    <article
      ref={containerRef}
      className="prose before:prose-code:content-none after:prose-code:content-none"
      dangerouslySetInnerHTML={{ __html: markup }}
    ></article>
  );
};

export default Renderer;
