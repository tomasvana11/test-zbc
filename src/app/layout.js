import './globals.css'
import Footer from './components/Footer'
import MenuDemo from './components/MenuDemo';

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body>
        <MenuDemo />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
