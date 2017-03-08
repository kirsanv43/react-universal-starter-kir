module.exports = ({ body, title }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title> 
        
      </head>
      
      <body>
        <div id="root">${body}</div>
      </body>
     
      <script src="/static/bundle.js"></script>
    </html>
  `;
};

/*
 ${
            assetsByChunkName && assetsByChunkName.main && assetsByChunkName.main
            .filter(path => path.endsWith('.css'))
            .map(path => `<link rel="stylesheet" href="${path}" />`)
        }


 ${
            assetsByChunkName && assetsByChunkName.main && assetsByChunkName.main
            .filter(path => path.endsWith('.js'))
            .map(path => `<script src="${path}" />`)
        }
*/