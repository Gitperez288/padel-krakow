import type { Court } from "@/app/_components/CourtMapNew";

export type CourtExtended = Omit<Court, "lat" | "lng"> & {
  lat?: number;
  lng?: number;
  doubles: number;
  singles?: number;
  indoor: boolean | "mixed";
  booking: string;
  photo: string;
  bookingUrl?: string;
  instagram?: string;
  website?: string;
};

// ---------- COURT DATA ----------
export const baseCourts: CourtExtended[] = [
  { id: "ahoj", photo: "/media/courts/ahoj.webp", name: "Ahoj Padel", address: "Staniątki 703B, 32-005 Niepołomice",
    link: "https://maps.google.com/?q=Ahoj+Padel+Niepołomice",
    doubles: 6, indoor: false, lat: 50.0100646, lng: 20.1751186,
    booking: "Padel Mates App",
    instagram: "https://www.instagram.com/ahoj_padel/" },
  { id: "bajada", photo: "/media/courts/bajada.webp", name: "Bajada Sports Club", address: "Tyniecka 215, 30-381 Kraków",
    link: "https://maps.google.com/?q=Bajada+Sports+Club+Kraków",
    doubles: 4, singles: 1, indoor: "mixed", lat: 50.0251188, lng: 19.8333971,
    booking: "Tenis4U App",
    instagram: "https://www.instagram.com/bajada_padel_club/" },
  { id: "bloniasport", photo: "/media/courts/bloniasport.webp", name: "Błonia Sport", address: "al. 3 Maja 57, 30-062 Kraków",
    link: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x47165b02f73011fb:0x4044659970a08be5?sa=X&ved=1t:8290&ictx=111",
    doubles: 4, indoor: true,
    booking: "TwojTenis",
    bookingUrl: "https://app.twojtenis.pl/#/clubs/958662f0-0bd2-4fdc-8bef-bb2d69761adb?tab=bookings",
    instagram: "https://www.instagram.com/bloniasport/" },
  { id: "fame", photo: "/media/courts/fame.webp", name: "Fame Sports Club", address: "Jana Dekerta 21, 30-703 Kraków",
    link: "https://maps.google.com/?q=Fame+Sports+Club+Kraków",
    doubles: 2, indoor: "mixed", lat: 50.0467165, lng: 19.9649943,
    booking: "Tenis4U App",
    instagram: "https://www.instagram.com/famesportclub/" },
  { id: "gardenpadel", photo: "/media/courts/gardenpadel.webp", name: "Garden Padel", address: "Walerego Eljasza-Radzikowskiego 109, 31-342 Kraków",
    link: "https://maps.google.com/?q=Garden+Padel+Kraków",
    doubles: 4, indoor: false, lat: 50.0858436, lng: 19.8843225,
    booking: "Tenis4U App",
    instagram: "https://www.instagram.com/gardenpadel_krakow/" },
  { id: "libertow", photo: "/media/courts/libertow.webp", name: "Libertów Padel Club", address: "Przylesie 41, 30-444 Libertów",
    link: "https://maps.google.com/?q=Przylesie+41+Libertów",
    doubles: 2, indoor: true,
    booking: "Tenis4U App",
    instagram: "https://www.instagram.com/p/DPhGk8ZCsUr/" },
  { id: "morelowa", photo: "/media/courts/morelowa.webp", name: "Morelowa34", address: "Morelowa 34, 30-222 Kraków",
    link: "https://maps.google.com/?q=Morelowa34+Kraków",
    doubles: 2, indoor: "mixed", lat: 50.0703146, lng: 19.8656325,
    booking: "Tenis4U App",
    instagram: "https://www.instagram.com/morelowa34padellounge/" },
  { id: "padelarena", photo: "/media/courts/padelarena.webp", name: "Padel Arena Limanowa", address: "Marka 34A, 34-600 Limanowa",
    link: "https://maps.google.com/?q=Marka+34A+Limanowa",
    doubles: 4, indoor: false,
    booking: "Playpadel.com.pl",
    instagram: "https://www.instagram.com/padel_arena_limanowa/" },
  { id: "padelfactory", photo: "/media/courts/padelfactory.webp", name: "Padel Factory Nowy Targ", address: "osiedle Bohaterów Tobruku 38, 34-400 Nowy Targ",
    link: "https://maps.google.com/?q=osiedle+Bohaterów+Tobruku+38+Nowy+Targ",
    doubles: 3, indoor: false,
    booking: "Online Booking",
    bookingUrl: "https://ffnt.gymmanager.io/public/buy-pass",
    instagram: "https://www.instagram.com/padel_factory_nowy_targ/" },
  { id: "padelhouse", photo: "/media/courts/padelhouse.webp", name: "Padel House", address: "Rzemieślnicza 20A, 30-363 Kraków",
    link: "https://maps.google.com/?q=Padel+House+Kraków",
    doubles: 4, indoor: true, lat: 50.0323975, lng: 19.9331454,
    booking: "Tenis4U App",
    instagram: "https://www.instagram.com/padelhouse_krakow/" },
  { id: "padelspot", photo: "/media/courts/padelspot.webp", name: "Padel Spot", address: "ul. Koralowa 10, Modlniczka",
    link: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x471659d2c37c2b49:0x5085a24a16a1ecb0?sa=X&ved=1t:8290&ictx=111",
    doubles: 6, indoor: true, lat: 50.1145944, lng: 19.8356978,
    booking: "Tenis4U App",
    instagram: "https://www.instagram.com/_spotkrk_/" },
  { id: "sao", photo: "/media/courts/sao.webp", name: "SAO Sports Hub", address: "Piastowska 26, 30-065 Kraków",
    link: "https://maps.google.com/?q=SAO+Sports+Hub+Kraków",
    doubles: 2, indoor: false, lat: 50.0660441, lng: 19.8998069,
    booking: "Tenis4U App",
    instagram: "https://www.instagram.com/saosportshub/" },
  { id: "skawina", photo: "/media/courts/skawina.webp", name: "Squash & Padel Skawina", address: "Józefa Piłsudskiego 7, 32-050 Skawina",
    link: "https://maps.google.com/?q=Squash+%26+Padel+Skawina",
    doubles: 1, indoor: false, lat: 49.9720952, lng: 19.8056069,
    booking: "Tenis4U App",
    website: "https://squashpadel.pl/" },
];
