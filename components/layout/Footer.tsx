import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="#home" className="text-2xl font-bold tracking-tight">
              Sanjay <span className="text-primary">Raj.M</span>
            </Link>
            <p className="mt-2 text-muted-foreground max-w-md">
              Full-stack developer specializing in creating exceptional digital experiences
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <Link 
                href="https://github.com/Sanjay-9894" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link 
                href="https://www.linkedin.com/in/sanjay-raj-m/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link 
                href="mailto:contact@sanjyraj.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Sanjay Raj. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}