import { QuartzTransformerPlugin } from "../types"

export const jsts: QuartzTransformerPlugin = () => {
  return {
    name: "jsts",
    css: [
      // base css
      "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/atex.min.css",
    ],
    js: [
      {
        // fix copy behaviour: https://github.com/KaTeX/KaTeX/blob/main/contrib/copy-tex/README.md
        src: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/opy-tex.min.js",
        loadTime: "afterDOMReady",
        contentType: "external",
      },
    ],
  }
}
