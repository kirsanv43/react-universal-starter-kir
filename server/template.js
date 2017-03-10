const React = require('react')

class HtmlLayout extends React.Component {
 render() {
return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8'/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        <title>{this.props.title}</title> 
      </head>
      <body>
        {/* insert the content as a string so that it can be rendered separate with its own checksum for proper server-side rendering */}
        <div key={Math.random()} id='root'
          dangerouslySetInnerHTML={{
          __html: this.props.content
        }}>
        </div>
        <script src='/static/bundle.js'></script>
      </body>
     
      <script src="http://localhost:3003/static/bundle.js"></script>
    </html>
  )
 }
  
}
export default HtmlLayout;