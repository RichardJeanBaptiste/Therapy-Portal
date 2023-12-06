import { Inter, Roboto, Shadows_Into_Light, Outfit } from 'next/font/google';
import Head from 'next/head';
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

const inter = Inter({ subsets: ['latin'] })
const outfit  = Outfit({ 
  weight: '300',
  subsets:['latin'], 
})

export const metadata = {
  title: 'Therapy Portal',
  description: 'Connecting Therapists and Clients',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className} style={{ backgroundColor: "#eaf7ff"}}>{children}</body>
    </html>
  )
}
