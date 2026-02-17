import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ThemeProvider } from '@/components/providers/theme-provider';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', display: 'swap', weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: { default: 'QADIR Montreal — Modern Perfumery Rooted in Oud Tradition', template: '%s — QADIR Montreal' },
  description: 'Four Signature Blends. Each one a deliberate statement of character. Conceived in Montreal.',
  metadataBase: new URL('https://qadir.com'),
  openGraph: {
    type: 'website',
    siteName: 'QADIR Montreal',
    locale: 'en_CA',
  },
};

const themeScript = `
(function(){
  try{var t=localStorage.getItem('qadir-theme');
  if(t==='dark')document.documentElement.setAttribute('data-theme','dark');
  }catch(e){}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <a href="#main" className="skip-to-content">Skip to content</a>
          <Header />
          <main id="main" className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
