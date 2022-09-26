import CookieConsent from "react-cookie-consent";
import PAGE from "../../utils/constants/page-names";

export default function LegalNote({ accept }) {
  return (
    <CookieConsent
      location="bottom"
      buttonText="I understand"
      cookieName="refreshToken"
      style={{ background: "#2B373B" }}
      onAccept={accept}
      buttonStyle={{
        backgroundColor: "#74b9ff",
        color: "#ffff",
        fontSize: "13px",
        borderRadius: "10px",
      }}
      expires={150}
    >
      This website uses cookies to enhance the user experience.{" "}
      <span style={{ fontSize: "10px" }}>
        View our{" "}
        <a href={PAGE.TERMS_AND_CONDITIONS} style={{ color: "#74b9ff" }}>
          terms of service
        </a>{" "}
        and{" "}
        <a href={PAGE.PRIVACY_POLICY} style={{ color: "#74b9ff" }}>
          privacy policy
        </a>
      </span>
    </CookieConsent>
  );
}
