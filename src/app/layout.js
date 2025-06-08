import './globals.css'
import Footer from './components/Footer'

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
