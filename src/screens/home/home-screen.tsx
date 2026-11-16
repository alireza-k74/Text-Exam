import {
  HomeConsultation,
  HomeExchange,
  HomeHero,
  HomePrices,
  HomeServices,
  HomeWeblog,
} from "~/features/home";

/**
 * Home screen composition (top → bottom):
 * Header (layout) → Hero (headers + slider) → Services → Prices → Exchange → Weblog → Consultation → Footer (layout)
 */
export function HomeScreen() {
  return (
    <>
      <HomeHero />
      <HomeServices />
      <HomePrices />
      <HomeExchange />
      <HomeWeblog />
      <HomeConsultation />
    </>
  );
}
