import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { Cta } from "@/content/types";

export function IntroBlock({
  title,
  body,
  cta,
  tone = "white",
}: {
  title: string;
  body: string;
  cta?: Cta;
  tone?: "white" | "light";
}) {
  return (
    <section className={`${tone === "light" ? "bg-navy-25" : "bg-white"} py-16 sm:py-24`}>
      <Reveal className="container-page max-w-3xl text-center">
        <span className="eyebrow justify-center">
          <span className="h-px w-8 bg-gold-500" />
          HP Diff
        </span>
        <h2 className="section-title mt-4">{title}</h2>
        <p className="mt-5 text-base leading-8 text-muted">{body}</p>
        {cta && (
          <div className="mt-8 flex justify-center">
            <Button cta={cta} />
          </div>
        )}
      </Reveal>
    </section>
  );
}
