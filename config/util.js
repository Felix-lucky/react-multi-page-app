const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

function setEntry() {

  const files = glob.sync('./src/pages/**/index.jsx');
  const entry = {}

  files.forEach(file => {
    const ret = file.match(/^\.\/src\/pages\/(\S*)\/index\.jsx$/);
    if (ret) {
      entry[ret[1]] = {
        import: file,
      }
    }
  });
  return entry;
}


function getTemplate(name) {

  const files = glob.sync(`./src/pages/${name}/index.html`);
  if (files.length) {
    return files[0];
  }

  return resolveApp('public/index.html');
}

function setHtmlPlugin() {

  const files = glob.sync('./src/pages/**/index.jsx');
  const options = [];

  files.forEach(file => {
    const ret = file.match(/^\.\/src\/pages\/(\S*)\/index\.jsx$/);
    if (ret) {
      const name = ret[1];
      options.push(new HtmlWebpackPlugin({
        filename: `${name}/index.html`,
        chunks: ['react_vendors', name, '[name]/index.css'],
        template: getTemplate(name),
        inject: 'body', // 设置js尾部引入
      }));
    }
  });

  return options;
}


module.exports = {
  setEntry,
  getTemplate,
  setHtmlPlugin
}
