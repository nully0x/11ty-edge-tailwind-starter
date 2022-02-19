const { join } = require('path')
const { Edge } = require('edge.js')
const edge = new Edge({cache:false})
module.exports = function (eleventyConfig) {
    eleventyConfig.addTemplateFormats("edge");
    eleventyConfig.addPassthroughCopy({
        "./src/assets": "./assets/"
    });
    eleventyConfig.addWatchTarget('./src/_includes/components/')
    eleventyConfig.addWatchTarget('./src/_includes/layouts/')
    eleventyConfig.addExtension("edge", {
      compile: async (inputContent) => {
        return async () => {
            edge.mount(join(__dirname, 'src/_includes/'))
            return edge.renderRaw(inputContent)
        };
      }
    });

    return {
        dir: {
            input: "src/pages",
            output: "dist",
            data:"../_data"
        }
    }
};