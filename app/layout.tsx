import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'ZANCADA · Running Panamá', description: 'Tu próximo reto comienza aquí: descubre carreras, planifica y registra tu progreso.' };
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) { return <html lang="es"><body>{children}</body></html>; }
