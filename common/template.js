module.exports = ({ body, title ,assetsByChunkName}) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title> 
         ${
            assetsByChunkName && assetsByChunkName.main && assetsByChunkName.main
            .filter(path => path.endsWith('.css'))
            .map(path => `<link rel="stylesheet" href="${path}" />`)
        }
      </head>
      
      <body>
        <div id="root">${body}</div>
      </body>
      ${
            assetsByChunkName && assetsByChunkName.main && assetsByChunkName.main
            .filter(path => path.endsWith('.js'))
            .map(path => `<script src="${path}" />`)
        }
      <script src="/static/bundle.js"></script>
    </html>
  `;
};