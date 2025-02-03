import Image from "next/image";
import Link from "next/link";
import { FooterLinkGroup } from "./FooterLinkGroup";

const footerGroups = [
  {
    title: "Products",
    links: [
      "LED Downlighter",
      "LED Spotlight",
      "LED Cob Light",
      "LED Surface",
      "LED Strip & Drivers",
      "LED Rope",
      "LED Batten",
    ],
  },
  {
    title: "Products",
    links: [
      "LED Bulb & T-bulb",
      "LED Flood Light",
      "LED Street Light",
      "LED Troffer",
      "LED Desk Light",
      "Wall Light",
      "Product Catalogue",
    ],
  },
  {
    title: "Products",
    links: [
      "Vayu",
      "Zoom",
      "Cosmo",
      "Celestia",
      "Petal",
      "Imperia",
      "Electra",
      "Product Catalogue",
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto">
      <section className="flex flex-col justify-center items-center">
        <Image src="/logo.svg" alt="EcoLink Logo" width={135} height={65} />

        <div className="social-icons flex gap-4 my-10">
          <Image
            src="/home/icons/facebook.svg"
            alt="Facebook"
            width={36}
            height={36}
          />
          <Image
            src="/home/icons/instagram.svg"
            alt="Instagram"
            width={36}
            height={36}
          />
          <Image
            src="/home/icons/twitter.svg"
            alt="Twitter"
            width={36}
            height={36}
          />
        </div>

        <div className="text-center flex flex-col gap-4">
          <h4 className="text-white/70 text-xl font-medium">Get in Touch</h4>
          <p className="text-white/70 text-sm">
            Address:
            <br />
            Signify Innovations India Limited, c/o Mangalam
            <br />
            Business Center, 22, Camac Street, Block B, 6th
            <br />
            Floor, Kolkata - 700016,
            <br />
            West Bengal, India.
          </p>

          <p className="text-white/70 text-sm">
            Phone: <br />{" "}
            <Link href="tel:+911800120800008">
              1800 120 800 008 (Toll Free)
            </Link>
          </p>
          <p className="text-white/70 text-sm">
            Email: <br />{" "}
            <Link href="mailto:customercare_ecolinklighting@signify.com">
              customercare_ecolinklighting@signify.com
            </Link>
          </p>
        </div>
      </section>

      <div className="text-center w-full">
        {footerGroups.map((group, index) => (
          <FooterLinkGroup key={index} {...group} />
        ))}
      </div>

      <hr className="w-full border-white pt-2" />

      <p className="text-white/90 py-4 text-sm text-center">
        Copyright © EcoLink 2025. All rights reserved.
      </p>
    </footer>
  );
} 