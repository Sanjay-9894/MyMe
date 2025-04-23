"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Download, ChevronRight } from "lucide-react";
import { motion } from "@/lib/framer-motion-mock";

const aboutTabs = [
  { label: "Experience", value: "experience" },
  { label: "Education", value: "education" },
  { label: "Skills", value: "skills" },
];

interface TimelineItem {
  period: string;
  title: string;
  organization: string;
  description: string;
}

const experiences: TimelineItem[] = [
  {
    period: "Sep 2024 - Present",
    title: "Software Developer Intern",
    organization: "Symplify Scheduler",
    description: `• Designed and implemented a robust notification module, enabling real-time updates and enhancing user engagement
                  • Identified and resolved critical frontend issues, improving application responsiveness and reducing bugs
                  • Optimized React component re-renders, leading to smoother UI performance
                  • Improved overall web app performance, resulting in a more efficient and responsive user experience`
  },


  // {
  //   period: "2019 - 2022",
  //   title: "Full-Stack Developer",
  //   organization: "Digital Creations Inc.",
  //   description: "Developed responsive web applications and RESTful APIs. Collaborated with cross-functional teams to deliver high-quality products on schedule."
  // },
  // {
  //   period: "2017 - 2019",
  //   title: "Frontend Developer",
  //   organization: "WebCreators Studio",
  //   description: "Built responsive user interfaces using modern JavaScript frameworks and implemented state management solutions."
  // }
];

const education: TimelineItem[] = [
  {
    period: "2020",
    title: "12-Std StateBoard",
    organization: "SSVM schools",
    description: "Passed with 95.6 percentage."
  },
  {
    period: "2022 - 2026",
    title: "Bachelor of Technology - Smart Manufacturing",
    organization: "Indian Institute of Information Technology, Design and Manufacturing - Jabalpur",
    description: "Graduated with honors. Specialized in web technologies and software engineering."
  },

];

export default function About() {
  const [activeTab, setActiveTab] = useState("experience");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("about");
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight && position.bottom >= 0) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              I'm a passionate full-stack developer with over 1 years of experience building 
              robust applications and solving complex problems with elegant solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden aspect-[4/5] bg-muted">
                <img
                  src="/san_image.jpg"
                  alt="Professional profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-lg -z-10"></div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Sanjy Raj.M</h3>
              <p className="text-primary font-medium mb-4">Full-Stack Developer</p>
              <p className="text-muted-foreground mb-6">
                I'm specialized in creating seamless user experiences and robust backend systems.
                My approach combines technical expertise with creative problem-solving to deliver
                exceptional digital products that meet both user needs and business goals.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {aboutTabs.map((tab) => (
                  <Button 
                    key={tab.value}
                    variant={activeTab === tab.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab(tab.value)}
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>

              {activeTab === "experience" && (
                <div className="space-y-4">
                  {experiences.map((exp, index) => (
                    <TimelineCard key={index} item={exp} />
                  ))}
                </div>
              )}

              {activeTab === "education" && (
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <TimelineCard key={index} item={edu} />
                  ))}
                </div>
              )}

              {activeTab === "skills" && (
                <div className="grid grid-cols-2 gap-3">
                  <SkillTag>React</SkillTag>
                  <SkillTag>Next.js</SkillTag>
                  <SkillTag>Material UI</SkillTag>
                  <SkillTag>Shadcn</SkillTag>
                  <SkillTag>Node.js</SkillTag>
                  <SkillTag>Express.js</SkillTag>
                  <SkillTag>Firebase</SkillTag>
                  <SkillTag>AWS</SkillTag>
                  <SkillTag>Cloudflare</SkillTag>
                  <SkillTag>Git & GitHub</SkillTag>
                </div>
              )}

              <div className="mt-8">
                <a href="/SanjayRaj_resume.pdf" download>
                  <Button variant="default" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download Resume
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TimelineCard({ item }: { item: TimelineItem }) {
  return (
    <div className="border-l-2 border-primary/30 pl-4 py-1">
      <span className="text-sm text-muted-foreground block">{item.period}</span>
      <h4 className="font-medium">{item.title}</h4>
      <p className="text-primary text-sm mb-1">{item.organization}</p>
      <p className="text-sm text-muted-foreground">{item.description}</p>
    </div>
  );
}

function SkillTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm bg-muted px-3 py-1.5 rounded-md">
      <ChevronRight className="h-3 w-3 text-primary" />
      {children}
    </div>
  );
}