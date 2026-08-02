import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import TravelChatbot from "@/components/chat/TravelChatbot";
import ServiceDetailContent from "@/components/services/ServiceDetailContent";
import {
  getAllServices,
  getServiceById,
  getServiceSlugs,
} from "@/lib/services";
import { BUSINESS } from "@/lib/constants";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceById(slug);
  if (!service) {
    return { title: `Service | ${BUSINESS.name}` };
  }
  return {
    title: `${service.title} | ${BUSINESS.name}`,
    description: service.description,
    openGraph: {
      title: `${service.title} | ${BUSINESS.name}`,
      description: service.description,
      images: [{ url: service.image }],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceById(slug);
  if (!service) notFound();

  const others = getAllServices().filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        <ServiceDetailContent service={service} />

        {others.length > 0 && (
          <section className="border-t border-gray-100 bg-surface py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl text-primary mb-6">
                Explore more services
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {others.map((item) => (
                  <Link
                    key={item.id}
                    href={`/services/${item.id}`}
                    className="rounded-xl bg-white border border-gray-100 p-4 hover:border-gold/30 transition-colors"
                  >
                    <p className="font-semibold text-primary text-sm mb-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-text-secondary line-clamp-2">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <FloatingButtons />
      <TravelChatbot />
    </>
  );
}
