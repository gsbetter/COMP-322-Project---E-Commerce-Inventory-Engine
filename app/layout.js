import "./globals.css";

export const metadata = {
  title: "GBeauty Inventory Manager",
  description: "A beauty supply inventory management application"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
