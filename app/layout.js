import './global.css';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { CartProvider } from '@/components/CartProvider';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'AwayStack',
  description: 'Frozen lick enrichment tower for dogs — wind-up clock mechanism releases one cup at a time.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-text">
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
