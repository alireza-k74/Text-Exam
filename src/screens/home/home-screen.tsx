import {
  HomeConsultation,
  HomeExchange,
  HomeHeaders,
  HomePrices,
  HomeServices,
  HomeSlider,
  HomeWeblog,
} from "~/features/home";

/**
 * Home screen composition (top → bottom):
 * Header (layout) → Headers → Slider → Services → Prices → Exchange → Weblog → Consultation → Footer (layout)
 */
export function HomeScreen() {
  return (
    <>
      <HomeHeaders />
      <HomeSlider />
      <HomeServices />
      <HomePrices />
      <HomeExchange />
      <HomeWeblog />
      <HomeConsultation />
    </>
  );
}
