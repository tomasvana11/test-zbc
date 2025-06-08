import './globals.css'
import Footer from './components/Footer'
import Menu from './components/Menu'  // import Menu

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body>
        {/* Menu je tady, aby overlay měl vysoký z-index a byl nad vším */}
        <Menu />

        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
