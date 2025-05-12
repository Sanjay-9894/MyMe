"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "@/lib/framer-motion-mock";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, Phone, MapPin, Send, 
  Linkedin, Github, Twitter, 
  Link
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 hero-text">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="card-3d">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <p className="text-muted-foreground mb-8">
              I'm currently available for intern and full-time positions. 
              Feel free to reach out via email or phone.
            </p>
            
            <div className="space-y-6">
              <ContactInfo 
                icon={<Mail className="h-5 w-5 text-primary" />} 
                title="Email"
                value="sanjayraj.dev52@gamil.com"
                href="mailto:sanjayraj.dev52@gamil.com"
              />
              <ContactInfo 
                icon={<Phone className="h-5 w-5 text-primary" />} 
                title="Phone"
                value="+91 7639015336"
                href="+91 7639015336"
              />
              <ContactInfo 
                icon={<MapPin className="h-5 w-5 text-primary" />} 
                title="Location"
                value="TamilNadu, India"
              />
            </div>

            {/* <div className="mt-8">
              <h4 className="text-lg font-medium mb-4">Connect with me</h4>
              <div className="flex gap-4">
                 <Link 
                href="https://github.com/Sanjay-9894" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
                <SocialLink href="https://www.linkedin.com/in/sanjay-raj-m/" icon={<Linkedin />} label="LinkedIn" />
                <SocialLink href="https://github.com/Sanjay-9894" icon={<Github />} label="GitHub" />
                <SocialLink href="https://twitter.com" icon={<Twitter />} label="Twitter" />
              </div>
            </div> */}
          </div>

          <div className="contact-form">
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message"
                          rows={5}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full card-3d" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Send className="h-4 w-4 mr-2" />
                    </motion.div>
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactInfo({ 
  icon, 
  title, 
  value, 
  href 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  href?: string;
}) {
  const content = (
    <div className="flex items-start">
      <div className="mt-1">{icon}</div>
      <div className="ml-4">
        <h4 className="font-medium">{title}</h4>
        <p className="text-muted-foreground">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} className="block hover:text-primary transition-colors">{content}</a>;
  }

  return content;
}

function SocialLink({ 
  href, 
  icon, 
  label 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string;
}) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
      aria-label={label}
    >
      {icon}
    </a>
  );
}