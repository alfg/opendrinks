const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const { SitemapStream, streamToPromise } = require('sitemap');

const HOSTNAME = 'https://opendrinks.netlify.com';
const SITEMAP_XML = 'public/sitemap.xml';

const getRecipe = files => {
  const r = [];

  files.forEach(file => {
    const contents = fs.readFileSync(`${__dirname}/../src/recipes/${file}`, 'utf8');

    let jsonContents;
    try {
      jsonContents = JSON.parse(contents);
      const filename = file.replace('./', '').replace('.json', '');
      jsonContents.filename = filename;
      r.push(jsonContents);
    } catch (error) {
      console.log(`Error reading: ${file}!`);
      process.exit(1);
    }
  });
  return r;
};

const findRecipeFiles = callback => {
  fs.readdir(`${__dirname}/../src/recipes`, (err, files) => {
    if (err) {
      return callback(err);
    }

    const recipes = getRecipe(files.filter(file => file.endsWith('.json')));
    return callback(null, recipes);
  });
};

function buildSitemap(recipes) {
  const sitemap = new SitemapStream({ hostname: HOSTNAME });
  sitemap.write({ url: '/', changefreq: 'daily' });
  sitemap.write({ url: '/featured', changefreq: 'daily' });
  sitemap.write({ url: '/random', changefreq: 'daily' });
  sitemap.write({ url: '/explore', changefreq: 'daily' });
  sitemap.write({ url: '/keywords', changefreq: 'daily' });
  sitemap.write({ url: '/search', changefreq: 'daily' });

  recipes.forEach(file => {
    sitemap.write({ url: `/recipe/${file.filename}`, changefreq: 'weekly' });
  });

  sitemap.end();

  streamToPromise(sitemap)
    .then(sm => fs.writeFileSync(SITEMAP_XML, sm.toString()))
    .catch(console.error);
}

function init() {
  findRecipeFiles((err, recipes) => {
    if (err) {
      process.exit(1);
    }

    console.log('done', recipes.length);
    buildSitemap(recipes);
  });
}

// Start.
init();
