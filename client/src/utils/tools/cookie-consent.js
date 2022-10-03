import CookieConsent from "react-cookie-consent";
import PAGE from "../../utils/constants/page-names";

export default function CookiePermission({ accept }) {
  return (
    <CookieConsent
      location="bottom"
      buttonText="I understand"
      style={{ background: "#2B373B", opacity: 0.8 }}
      onAccept={accept}
      buttonStyle={{
        backgroundColor: "#74b9ff",
        color: "#ffff",
        fontSize: "15px",
        borderRadius: "10px",
      }}
      expires={150}
    >
      By continuing to use this site you agree to our{" "}
      <a href={`${PAGE.COOKIE_POLICY}`} style={{ color: "#74b9ff" }}>
        Cookie Policy
      </a>
      .{" "}
    </CookieConsent>
  );
}
