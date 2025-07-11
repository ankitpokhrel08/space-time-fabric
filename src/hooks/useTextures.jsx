import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

export const useTextures = () => {
  const [dayTexture, nightTexture, cloudsTexture] = useLoader(TextureLoader, [
    "/assets/earth_surface_day.jpg",
    "/assets/earth_surface_night.jpg",
    "/assets/earth_clouds.jpg",
  ]);

  return { dayTexture, nightTexture, cloudsTexture };
};
