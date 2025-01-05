import { QuartzTransformerPlugin } from "../types"

export const Jsts: QuartzTransformerPlugin = () => {
  return {
    name: "Jsts",
    externalResources() {
      return {
        css: [
          "https://interactive-examples.mdn.mozilla.net/media/examples/link-element-example.css",
        ],
        js: [
          {
            src: "https://cdnjs.cloudflare.com/ajax/libs/lunr.js/2.3.9/lunr.min.js",
            loadTime: "afterDOMReady",
            contentType: "external",
          },
        ],
      }
    },
  }
}
