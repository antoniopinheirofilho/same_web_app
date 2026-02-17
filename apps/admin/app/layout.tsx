import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nexus Admin Dashboard",
  description: "Admin interface for managing the Nexus platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
