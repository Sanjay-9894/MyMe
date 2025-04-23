"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "@/lib/framer-motion-mock";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projectsData: Project[] = [
 
  {
    id: 1,
    title: "Chatbot",
    description: "Design and implementation of scalable cloud infrastructure for enterprise applications.",
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: ["backend", "frontend"],
    technologies: ["Nextjs", "Expressjs", "Material UI","vercel"],
    liveUrl: "https://chatbot-hzui796g7-sanjay-rajs-projects-4c65e846.vercel.app/",
    githubUrl: "https://github.com/Sanjay-9894/chatbot",
  },
  {
    id: 2,
    title: "Project Management WebApp",
    description: "A Webapp for project management with task tracking, team collaboration and analytics.",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: ["frontend","Backend", "fullstack"],
    technologies: ["Nextjs", "Expressjs", "Material UI","AWS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Sanjay-9894/project-management-application",
  },
  {
    id: 3,
    title: "Talksy-Chat App",
    description: "A social networking application with real-time messaging and content sharing.",
    image: "https://images.pexels.com/photos/33999/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: ["frontend", "fullstack"],
    technologies: ["Reactjs", "Expressjs","Socket.io","Firebase", "Node.js"],
    githubUrl: "https://github.com/Sanjay-9894/Talksy-Chatapp",
  },
];

// const categories = [
//   { value: "all", label: "All Projects" },
//   { value: "frontend", label: "Frontend" },
//   { value: "backend", label: "Backend" },
//   { value: "fullstack", label: "Full-Stack" },
// ];

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

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

    const element = document.getElementById("projects");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(
        projectsData.filter(project => project.category.includes(filter))
      );
    }
  }, [filter]);

  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 hero-text">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Here are some of the projects I've worked on. Each project demonstrates different skills and technologies.
          </p>
        </div>

        {/* <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={filter === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category.value)}
              className="mb-2 card-3d"
            >
              {category.label}
            </Button>
          ))}
        </div> */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="project-card"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden group h-full flex flex-col hover:shadow-lg transition-shadow">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-6 pt-0 flex-grow">
        <div className="flex flex-wrap gap-2 mt-2">
          {project.technologies.map((tech, index) => (
            <span 
              key={index} 
              className="text-xs bg-secondary px-2 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
          <CardFooter className="border-t pt-4 flex gap-2">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button variant="default" size="sm" className="w-full card-3d flex items-center justify-center gap-1" asChild={false}>
            <>
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </>
          </Button>
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1"
        >
          <Button variant="outline" size="sm" className="w-full card-3d flex items-center justify-center gap-1" asChild={false}>
            <>
              <Github className="h-4 w-4" />
              Code
            </>
          </Button>
        </a>
      )}
    </CardFooter>


    </Card>
  );
}