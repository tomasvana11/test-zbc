// app/layout.js nebo layout.tsx
import './globals.css'
import Footer from './components/Footer'
import MenuDemo from './components/MenuDemo'
import PageLoader from './components/PageLoader'

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-M8J6P3KH');
            `,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M8J6P3KH"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />

        <PageLoader />
        <MenuDemo />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

