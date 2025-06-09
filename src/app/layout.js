import './globals.css'
import Footer from './components/Footer'
import MenuDemo from './components/MenuDemo'
import PageLoader from './components/PageLoader' // ⬅️ nový import

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body>
        <PageLoader /> {/* ⬅️ loader nahoře */}
        <MenuDemo />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
