import { TourProvider } from "@reactour/tour";

export default function Tour({ children, steps }) {
  return (
    <TourProvider steps={steps} showBadge={false}>
      {children}
    </TourProvider>
  );
}
