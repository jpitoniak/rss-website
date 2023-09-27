const yaml = require("js-yaml")
const {parse} = require("csv-parse/sync")
const markdownItAttrs = require('markdown-it-attrs')
const faviconsPlugin = require("eleventy-plugin-gen-favicons")
const cacheBuster = require('@mightyplow/eleventy-plugin-cache-buster')

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("css")
	eleventyConfig.addPassthroughCopy("fonts")
	eleventyConfig.addPassthroughCopy("images")
	eleventyConfig.addPassthroughCopy("img")
	eleventyConfig.addPassthroughCopy("js")
	eleventyConfig.addPassthroughCopy("*/keynotes/*")
	// This causes the _data/sponsors csv files to get copied
	// Image files should instead get copied by the setTemplateFormats definition below
	//eleventyConfig.addPassthroughCopy("*/sponsors/*")
	eleventyConfig.addPassthroughCopy("*/files/*")
	eleventyConfig.addPassthroughCopy("*/panel/*")
	eleventyConfig.setWatchJavaScriptDependencies(false)

	eleventyConfig.setTemplateFormats([
		'md',
		'jpg',
		'jpeg',
		'png',
		'pdf'
	])

    // custom markdown filters
    const md = require("markdown-it")({
    	html: true,
    	breaks: false,
    	linkify: false
    }).use(markdownItAttrs)
    eleventyConfig.setLibrary("md", md)

    // implement Jekyll's markdownify plugin (parse markdown in variables)
	eleventyConfig.addFilter("markdownify", value => (value) ? md.render(value) : '')
	

	// allow parsng yaml data files
    eleventyConfig.addDataExtension("yaml, yml", contents => yaml.load(contents));

    // allow parsing csv files
    eleventyConfig.addDataExtension("csv", contents => parse(contents, {
        columns: true,
        skip_empty_lines: true
    }))

    eleventyConfig.addPlugin(faviconsPlugin, {
    	manifestData: {
    		name: "Rochester Security Summit",
    		short_name: "RSS"
    	}
    })

    eleventyConfig.addPlugin(cacheBuster({
    	outputDirectory: "./_site"
    }))

	return {
		dir: {
			layouts: "_layouts"
	    }
	}
}