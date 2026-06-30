/** Store de Vercel Blob — los archivos deben subirse con access: 'public' */
const BLOB_STORE_ID = 'hujmjnw3co9arxwz';

export const BLOB_VIDEO_BASE =
  import.meta.env.VITE_BLOB_VIDEO_BASE ??
  `https://${BLOB_STORE_ID}.public.blob.vercel-storage.com/video`;

export function blobVideo(path: string): string {
  return `${BLOB_VIDEO_BASE}/${path}`;
}

export const VIDEOS = {
  faro: {
    mar: blobVideo('faro/Mar.mp4'),
  },
  pareja: {
    mujerAirport: blobVideo('pareja/MujerAirport.mp4'),
    comoSolo: blobVideo('pareja/ComoSolo.mp4'),
    corroAirport: blobVideo('pareja/CorroAirport.mp4'),
    perro: blobVideo('pareja/Perro.mp4'),
    abrazoAirport: blobVideo('pareja/abrazoAirport.mp4'),
    bikes: blobVideo('pareja/Bikes.mp4'),
    tie: blobVideo('pareja/Tie.mp4'),
    chess: blobVideo('pareja/Chess.mp4'),
    bailando: blobVideo('pareja/Bailando.mp4'),
    walks: blobVideo('pareja/Walks.mp4'),
    earphones: blobVideo('pareja/Earphones.mp4'),
  },
  obelisco: {
    ciudad: blobVideo('obelisco/Ciudad.mp4'),
    estadio: blobVideo('obelisco/Estadio.mp4'),
    bar: blobVideo('obelisco/Bar.mp4'),
  },
} as const;