import Header from "@/components/landing-page/header";
import Hero2 from "@/components/landing-page/hero";
import Logos from "@/components/landing-page/logos";
import Problem from "@/components/landing-page/problem";
import Solution from "@/components/landing-page/solution";
import HowItWorks from "@/components/landing-page/how-it-works";
import TestimonialsCarousel from "@/components/landing-page/testimonials-carousel";
import Features from "@/components/landing-page/features";
import Testimonials from "@/components/landing-page/testimonials";
import Pricing from "@/components/landing-page/pricing";
import FAQ from "@/components/landing-page/faq";
import CTA from "@/components/landing-page/cta";
import Footer from "@/components/landing-page/footer";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero2 />
      <Logos />
      <Problem />
      <Solution />
      <HowItWorks />
      <TestimonialsCarousel />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      {/* <Blog /> */}
      <CTA />
      <Footer />
    </main>
  );
}
