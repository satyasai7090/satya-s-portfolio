import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedSection, AnimatedText } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Linkedin, Mail, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-narrow">
          <AnimatedText>
            <p className="label-caps mb-4">Get in Touch</p>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <h1 className="heading-display text-foreground mb-6">
              Let's Connect
            </h1>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="body-large">
              Open to new opportunities, collaborations, and interesting 
              documentation challenges. I'd love to hear from you.
            </p>
          </AnimatedText>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding surface-warm">
        <div className="container-narrow">
          <div className="grid md:grid-cols-5 gap-12 md:gap-16">
            {/* Direct Contact */}
            <AnimatedSection className="md:col-span-2">
              <div>
                <h2 className="heading-subsection text-foreground mb-6">
                  Direct Contact
                </h2>
                <div className="space-y-6">
                  <a 
                    href="mailto:sarah.mitchell@example.com"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <Mail className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                        sarah.mitchell@example.com
                      </p>
                    </div>
                  </a>
                  
                  <a 
                    href="https://linkedin.com/in/sarahmitchell"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <Linkedin className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">LinkedIn</p>
                      <p className="font-medium text-foreground group-hover:text-accent transition-colors">
                        linkedin.com/in/sarahmitchell
                      </p>
                    </div>
                  </a>
                </div>
                
                <div className="divider my-8" />
                
                <p className="text-sm text-muted-foreground">
                  Based in the United States, available for remote work globally.
                </p>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection delay={0.1} className="md:col-span-3">
              <div className="card-elevated">
                <h2 className="heading-subsection text-foreground mb-6">
                  Send a Message
                </h2>
                
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-display font-medium text-foreground mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. I'll get back to you within 24-48 hours.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-6"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="Your name"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          placeholder="your@email.com"
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Brief Project Description</Label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        placeholder="Tell me about your documentation needs or opportunity..."
                        rows={4}
                        required 
                      />
                      <p className="text-xs text-muted-foreground">
                        A sentence or two is perfect. We can discuss details later.
                      </p>
                    </div>
                    
                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full sm:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
