import type {Metadata} from 'next';
export const metadata:Metadata={
 title:'zancada. · Carreras en Panamá',
 description:'Encuentra carreras, rutas y resultados en Panamá. Prepara tu próxima salida y conserva tu pasaporte personal del corredor.',
 applicationName:'zancada.',
 robots:{index:true,follow:true}
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
 return <html lang="es"><body>{children}</body></html>;
}
