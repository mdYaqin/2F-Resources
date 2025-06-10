// data/socials.ts
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

export interface SocialLink {
  name: string;
  url: string;
  icon: IconDefinition;
  ariaLabel: string;
}

export interface ContactInfo {
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  address: string;
  addressHref: string;
  website: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61572212326307",
    icon: faFacebookF,
    ariaLabel: "Facebook",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/2f_resources/",
    icon: faInstagram,
    ariaLabel: "Instagram",
  },
];

export const contactInfo: ContactInfo = {
  phone: "+65 8202 3432",
  phoneHref: "tel:+6582023432",
  email: "Project.sales@2Fresources.com",
  emailHref: "mailto:Project.sales@2Fresources.com",
  address: "51 Goldhill Plaza #07-07, Singapore 308900",
  addressHref:
    "https://www.google.com/maps/place/51+Goldhill+Plaza,+#07-07,+Singapore+308900",
  website: "2fresources.com",
};
