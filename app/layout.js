import './global.css';

export const metadata = {
  title: 'Happy While Away',
  description: 'A minimal Next.js app with Tailwind CSS v4 and Motion',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
