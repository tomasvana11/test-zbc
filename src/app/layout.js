import './globals.css'
import Footer from './components/Footer'
import Menu from './components/Menu'  // importuj Menu

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
