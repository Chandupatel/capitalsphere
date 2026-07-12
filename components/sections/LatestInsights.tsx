import { ArrowRight, Banknote, Building2, Rocket, Stamp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { ARTICLES } from "@/constants/data";

const ICONS = [Building2, Rocket, Stamp, Banknote];

export function LatestInsights() {
  return (
    <section id="resources" className="bg-white py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionKicker>Latest Insights</SectionKicker>
            <h2 className="mt-4 font-display text-3xl font-bold text-navy-950 sm:text-4xl">
              Stay Updated with Our Latest Articles
            </h2>
          </div>
          <a
            href="#resources"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 transition-colors hover:text-gold-500"
          >
            View All Blogs <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ARTICLES.map((article, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <a
                key={article.id}
                href={article.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
              >
                <div
                  className={`flex h-36 items-center justify-center ${
                    article.accent === "navy"
                      ? "bg-gradient-to-br from-navy-900 to-navy-700"
                      : "bg-gradient-to-br from-gold-600 to-gold-400"
                  }`}
                >
                  <Icon className={`size-9 ${article.accent === "navy" ? "text-gold-400" : "text-navy-950"}`} />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                    {article.date}
                  </p>
                  <h3 className="text-sm font-semibold leading-snug text-navy-950 group-hover:text-gold-600">
                    {article.title}
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-navy-800">
                    Read More
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
