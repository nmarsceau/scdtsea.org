const { DateTime } = require("luxon");
const CleanCSS = require("clean-css");
const UglifyJS = require("uglify-es");
const htmlmin = require("html-minifier");
const slugify = require("slugify");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = eleventyConfig => {

  // Eleventy Navigation https://www.11ty.dev/docs/plugins/navigation/
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Configuration API: use eleventyConfig.addLayoutAlias(from, to) to add
  // layout aliases! Say you have a bunch of existing content using
  // layout: post. If you don’t want to rewrite all of those values, just map
  // post to a new file like this:
  // eleventyConfig.addLayoutAlias("post", "layouts/my_new_post_layout.njk");

  // Merge data instead of overriding
  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Date formatting (human readable)
  eleventyConfig.addFilter('readableDate', dateObj => DateTime.fromJSDate(dateObj).toFormat('LLLL d, yyyy'));

  // Date formatting (machine readable)
  eleventyConfig.addFilter('machineDate', dateObj => DateTime.fromJSDate(dateObj).toFormat('yyyy-MM-dd'));

  eleventyConfig.addFilter('capitalizeWords', text => {
    const textArray = text.split(' ');
    for (let i = 0; i < textArray.length; i++) {
      textArray[i] = textArray[i].substring(0, 1).toUpperCase() + textArray[i].substring(1);
    }
    return textArray.join(' ');
  });

  // Minify CSS
  eleventyConfig.addFilter('cssmin', code => new CleanCSS({}).minify(code).styles);

  // Minify JS
  eleventyConfig.addFilter('jsmin', code => {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log('UglifyJS error: ', minified.error);
      return code;
    }
    return minified.code;
  });

  // Minify HTML output
  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath.indexOf('.html') > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  // Universal slug filter strips unsafe chars from URLs
  eleventyConfig.addFilter('slugify', str => slugify(str, {
    lower: true,
    replacement: '-',
    remove: /[*+~.·,()'"`´%!?¿:@]/g
  }));

  // Don't process folders with static assets e.g. images
  eleventyConfig.addPassthroughCopy('static/img');
  eleventyConfig.addPassthroughCopy('admin');
  eleventyConfig.addPassthroughCopy('_includes/assets/');
  eleventyConfig.addPassthroughCopy('_headers');

  /* Markdown Plugins */
  let markdownIt = require('markdown-it');
  let markdownItAnchor = require('markdown-it-anchor');
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let opts = {
    permalink: false
  };

  const md = markdownIt(options)
    .use(markdownItAnchor, opts);
  eleventyConfig.setLibrary('md', md);

  eleventyConfig.addFilter('markdownify', markdownString => md.render(markdownString));

  eleventyConfig.setQuietMode(true);

  return {
    templateFormats: ['md', 'njk', 'html', 'liquid'],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: '/',

    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    dir: {
      input: '.',
      includes: '_includes',
      data: '_data',
      output: '_site'
    }
  };
};
