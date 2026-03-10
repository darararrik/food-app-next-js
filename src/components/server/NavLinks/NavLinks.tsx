import NavText from "@/components/client/NavText/NavText";
import { NAV_LINKS } from "@/config/navigation";

type NavLinksProps = {
  isMounted: boolean;
  isAuthenticated: boolean;
  onLinkClick?: () => void;
};
const NavLinks: React.FC<NavLinksProps> = ({
  isMounted,
  isAuthenticated,
  onLinkClick,
}: {
  isMounted: boolean;
  isAuthenticated: boolean;
  onLinkClick?: () => void;
}) => (
  <>
    {NAV_LINKS.map((link) => {
      if (link.authRequired && (!isMounted || !isAuthenticated)) {
        return null;
      }
      return (
        <NavText
          key={link.to}
          to={link.to}
          text={link.text}
          onClick={onLinkClick}
        />
      );
    })}
  </>
);
export default NavLinks;
