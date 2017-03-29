const React = require('react')

class HtmlLayout extends React.Component {
 render() {
   //const initialState = store.getState();
return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8'/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        <title>{this.props.title}</title>
        <link rel="stylesheet" href="http://localhost:3003/main.css"/>
      </head>
      <body>
        {/* insert the content as a string so that it can be rendered separate with its own checksum for proper server-side rendering */}
        <div key={Math.random()} id='root'
          dangerouslySetInnerHTML={{
          __html: this.props.content
        }}>
        </div>
        <script dangerouslySetInnerHTML={{
          __html: `window.__INITIAL_STATE__ = ${JSON.stringify(this.props.initialState)}`
        }}>

       </script>
        <script src='http://localhost:3003/client.js'></script>

      </body>

    </html>
  )
 }

}
export default HtmlLayout;
