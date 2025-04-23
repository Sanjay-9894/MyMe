"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Server, Layout, Database, Cloud, Github, Cpu, Globe, Sparkles, Puzzle as PuzzlePiece } from "lucide-react";
import { motion } from "@/lib/framer-motion-mock";

interface Skill {
  category: string;
  icon: React.ReactNode;
  skills: { name: string; level: number }[];
}

const skillsData: Skill[] = [
  {
    category: "Frontend Development",
    icon: <Layout className="h-8 w-8" />,
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Material UI", level: 80 },
      { name: "Shadcn/UI", level: 85 },
      { name: "JavaScript/TypeScript", level: 90 },
      { name: "HTML5/CSS3", level: 95 },
    ]
  },
  {
    category: "Backend Development",
    icon: <Server className="h-8 w-8" />,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "REST API", level: 90 },
      { name: "Bun", level: 75 },
    ]
  },
  {
    category: "Database & Storage",
    icon: <Database className="h-8 w-8" />,
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 75 },
      { name: "Firebase", level: 80 },
      { name: "Redis", level: 70 },
    ]
  },
  {
    category: "DevOps & Cloud",
    icon: <Cloud className="h-8 w-8" />,
    skills: [
      { name: "AWS", level: 75 },
      { name: "Cloudflare", level: 70 },
      { name: "Docker", level: 70 },
      // { name: "CI/CD", level: 75 },
    ]
  },
  {
    category: "Version Control",
    icon: <Github className="h-8 w-8" />,
    skills: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 90 },
    ]
  }
];

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 hero-text">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            My expertise spans both frontend and backend technologies,
            allowing me to build complete, scalable web applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow skill-card">
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="text-primary service-icon">{skill.icon}</div>
                    <h3 className="text-xl font-bold">{skill.category}</h3>
                  </div>
                  <div className="space-y-4">
                    {skill.skills.map((item) => (
                      <div key={item.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className="text-xs text-muted-foreground">{item.level}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={isVisible ? { width: `${item.level}%` } : {}}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Services I Offer</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I provide end-to-end development services to help businesses and individuals 
              create powerful web applications.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Code />} 
              title="Web Development" 
              description="Building responsive, fast, and accessible websites and web applications"
            />
            <ServiceCard 
              icon={<Cpu />} 
              title="API Development" 
              description="Creating robust REST APIs and backend services"
            />
            <ServiceCard 
              icon={<Globe />} 
              title="Cloud Services" 
              description="Deploying and maintaining applications on AWS and other cloud platforms"
            />
            {/* <ServiceCard 
              icon={<PuzzlePiece />} 
              title="Technical Consulting" 
              description="Providing expert advice on architecture and technology choices"
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) {
  return (
    <Card className="group hover:border-primary/50 transition-colors service-card">
      <CardContent className="p-6 text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors service-icon">
          {icon}
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}