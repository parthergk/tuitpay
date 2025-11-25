import { Metadata } from "next";
import ContactForm from "../../../../components/LandingPage/contact/ContactForm";

export const metadata:Metadata = {
  title: "Contact Yadxy – Get Support for Fee Tracking Software",
  description:
    "Have questions about Yadxy fee tracking software? Contact our support team for help with automated reminders, UPI payments, and student management.",
  keywords: [
    "contact yadxy",
    "yadxy support",
    "fee tracking help",
    "tuition software support",
    "coaching center software contact",
  ],
  alternates: { canonical: "https://yadxy.com/contact" },
  openGraph: {
    title: "Contact Yadxy – Get Support for Fee Tracking Software",
    description: "Reach out to Yadxy for questions, support, or feedback.",
    url: "https://yadxy.com/contact",
    images: ["https://yadxy.com/main.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Yadxy – Get Support for Fee Tracking Software",
    description: "Get in touch with the Yadxy team for support and inquiries.",
    images: ["https://yadxy.com/main.png"],
  },
};

// Structured Data
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
    "@type": "Organization",
    name: "Yadxy",
    url: "https://yadxy.com",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+917351500283",
      contactType: "Customer Support",
      email: "team@yadxy.com",
      availableLanguage: ["English", "Hindi"],
      areaServed: "IN",
    },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://yadxy.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact",
      item: "https://yadxy.com/contact",
    },
  ],
};

const Contact: React.FC = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema),
        }}
      />

      <section className="relative z-0 flex flex-col bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#E0ECFF_25%,#EAE2FF_50%,#F8E8DB_75%,#FFFFFF_100%)]">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('/image/noise.png')",
            backgroundSize: "128px",
            backgroundRepeat: "repeat",
          }}
        ></div>

        <ContactForm />
      </section>
    </>
  );
};

export default Contact;
