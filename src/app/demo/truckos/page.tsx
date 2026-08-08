import { Shell } from "./shell";
import { StoreProvider } from "./store";

export default function TruckOsDemoPage() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
