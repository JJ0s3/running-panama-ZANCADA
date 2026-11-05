import type {MetadataRoute} from 'next';
export default function manifest():MetadataRoute.Manifest {
 return {name:'ZANCADA · Running Panamá',short_name:'ZANCADA',description:'Carreras, rutas, resultados y tu dorsal personal.',start_url:'/',display:'standalone',background_color:'#F5F7F4',theme_color:'#0E1C34',lang:'es-PA',icons:[{src:'/icon',sizes:'512x512',type:'image/png',purpose:'any'}]};
}
