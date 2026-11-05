import type {Metadata} from 'next';
export const metadata:Metadata={
 title:'ZANCADA · Running Panamá',
 applicationName:'ZANCADA',
 description:'Descubre carreras de Panamá, resultados, mapas, Fasty y tu dorsal personal.',
 manifest:'/manifest.webmanifest',
 appleWebApp:{capable:true,title:'ZANCADA',statusBarStyle:'default'},
 icons:{icon:[{url:'/icon',type:'image/png',sizes:'512x512'}],apple:[{url:'/apple-icon',type:'image/png',sizes:'180x180'}]},
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
 return <html lang="es"><body>{children}</body></html>;
}
