import { motion } from "motion/react";
import FadeInView from "@/components/animation/FadeInView";
import { skillGroups } from "@/data/data";
import type { SkillGroupsProps } from "@/interfaces/DataProps";
import SectionLabel from "@/ui/SectionLabel";

const formatCategoryTitle = (raw: string) =>
  raw
    .replaceAll("_", " ")
    .replace(/\bai\b/gi, "AI")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const chipContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
    },
  },
};

const chipItemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 380,
      damping: 24,
    },
  },
};

const Skills = () => {
  const deployedLabel = (() => {
    const raw = import.meta.env.VITE_DEPLOYED_AT;
    if (!raw) return null;

    const d = new Date(raw);
    const pad = (n: number) => String(n).padStart(2, "0");

    const tzName =
      Intl.DateTimeFormat("en-US", { timeZoneName: "short" })
        .formatToParts(d)
        .find((part) => part.type === "timeZoneName")?.value || "LOCAL";

    return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(
      d.getHours(),
    )}:${pad(d.getMinutes())} ${tzName}`;
  })();

  return (
    <section
      id="skills"
      className="py-24 px-6 relative z-10 border-b border-border bg-surface-low/45"
    >
      <div className="max-w-6xl mx-auto">
        <FadeInView>
          <SectionLabel index="02" label="Skills" />
        </FadeInView>

        <FadeInView>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-12">
            <div className="lg:col-span-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight leading-[1.08]">
                Technical Stack
              </h2>
            </div>
            <p className="lg:col-span-6 text-text-muted font-body text-base sm:text-lg leading-relaxed lg:text-right">
              Technologies and frameworks I use across full-stack web
              development, information retrieval, data mining, and machine
              learning.
            </p>
          </div>
        </FadeInView>

        {/* Ruled 4-Domain Skills Matrix with High-Contrast Popping Chips */}
        <div className="border border-border divide-y divide-border bg-surface rounded-md overflow-hidden shadow-xs">
          {skillGroups.map((group: SkillGroupsProps, gi: number) => {
            const isPrimary = group.accent === "primary";
            const IconComponent = group.icon;
            const title = formatCategoryTitle(group.category);

            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: gi * 0.07, duration: 0.4 }}
                className={`grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 transition-colors border-l-3 ${
                  isPrimary
                    ? "border-l-accent/60 hover:border-l-accent hover:bg-surface-low/35"
                    : "border-l-accent-warm/70 hover:border-l-accent-warm hover:bg-surface-low/35"
                }`}
              >
                {/* Left Domain Column */}
                <div className="md:col-span-4 flex items-center gap-4">
                  <div
                    className={`p-2.5 rounded-md border shrink-0 ${
                      isPrimary
                        ? "bg-accent/12 text-accent border-accent/30"
                        : "bg-accent-warm/15 text-accent-warm-dim dark:text-accent-warm border-accent-warm/35"
                    }`}
                  >
                    <IconComponent size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-text-primary">
                      {title}
                    </h3>
                    <span className="font-mono text-xs text-text-dim tabular-nums">
                      {group.items.length} technologies
                    </span>
                  </div>
                </div>

                {/* Right Popping Skill Chips */}
                <motion.div
                  variants={chipContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="md:col-span-8 flex flex-wrap items-center gap-2.5"
                >
                  {group.items.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={chipItemVariants}
                      whileHover={{ y: -3, scale: 1.04 }}
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 22,
                      }}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-md font-body text-sm font-semibold border transition-colors cursor-default shadow-2xs ${
                        isPrimary
                          ? "bg-accent/8 text-text-primary border-accent/30 hover:bg-accent hover:text-accent-fg hover:border-accent"
                          : "bg-accent-warm/10 text-text-primary border-accent-warm/35 hover:bg-accent-warm hover:text-slate-950 hover:border-accent-warm"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`w-1.5 h-1.5 rounded-full ${
                          isPrimary ? "bg-accent" : "bg-accent-warm"
                        }`}
                      />
                      <span>{skill}</span>
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Clean Deployment Footer */}
        {deployedLabel && (
          <FadeInView delay={0.15}>
            <div className="mt-5 flex items-center justify-end gap-2 font-mono text-xs text-text-dim tabular-nums">
              <span className="w-2 h-2 rounded-full bg-accent-warm inline-block" />
              <span>Last deployed {deployedLabel}</span>
            </div>
          </FadeInView>
        )}
      </div>
    </section>
  );
};

export default Skills;
