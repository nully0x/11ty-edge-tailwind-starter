const { join } = require('path')

// CommonJS
const { Edge } = require('edge.js')

// Typescript import
// import { Edge } from 'edge.js'

const edge = new Edge({ cache: false })
edge.mount(join(__dirname, 'src/_includes'))

module.exports = function (eleventyConfig) {
    eleventyConfig.addTemplateFormats("edge");

    // "clowd" here means that the extension will apply to any .clowd file
    eleventyConfig.addExtension("edge", {
      compile: async (inputContent) => {
        // Replace any instances of cloud with butt
        let output = edge.renderRaw(inputContent)
  
        return async () => {
          return output;
        };
      }
    });

    return {
        dir: {
            input: "src/pages",
            output: "dist"
        }
    }
};