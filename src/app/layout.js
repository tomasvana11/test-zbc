import './globals.css'
import Footer from './components/Footer'
import Menu from './components/Menu'
import { MenuProvider } from './components/MenuContext' // cesta k MenuContext

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body>
        <MenuProvider>
          <Menu />
          <main>{children}</main>
          <Footer />
        </MenuProvider>
      </body>
    </html>
  )
}
