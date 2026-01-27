import { useState } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedSection, containerVariants, itemVariants } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Linkedin, Mail, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: { name, email, message },
      });

      if (error) {
        console.error("Error sending email:", error);
        throw new Error(error.message || "Failed to send message");
      }

      if (!data?.success) {
        throw new Error(data?.error || "Failed to send message");
      }

      setIsSubmitted(true);
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
    } catch (error: any) {
      console.error("Contact form error:", error);
      toast({
        title: "Error sending message",
        description: error.message || "Please try again or email directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <PageHero
        label="Get in Touch"
        title="Let's Connect"
        description="Open to new opportunities, collaborations, and interesting documentation challenges. I'd love to hear from you."
      />

      {/* Contact Content */}
      <section className="section-padding surface-cool">
        <div className="container-narrow">
          <div className="grid md:grid-cols-5 gap-12 md:gap-16">
            {/* Direct Contact */}
            <AnimatedSection className="md:col-span-2">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h2 
                  variants={itemVariants}
                  className="heading-subsection text-foreground mb-6"
                >
                  Direct Contact
                </motion.h2>
                <div className="space-y-6">
                  <motion.a 
                    variants={itemVariants}
                    href="mailto:satyasai7090@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                    whileHover={{ x: 8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <Mail className="w-5 h-5 text-foreground group-hover:text-primary transition-colors duration-200" />
                    </div>
                    <div>
                      <p className="body-small">Email</p>
                      <p className="text-label text-foreground group-hover:text-accent-foreground transition-colors">
                        satyasai7090@gmail.com
                      </p>
                    </div>
                  </motion.a>
                  
                  <motion.a 
                    variants={itemVariants}
                    href="https://www.linkedin.com/in/satya-sai-pasupuleti-7090pj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                    whileHover={{ x: 8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <Linkedin className="w-5 h-5 text-foreground group-hover:text-primary transition-colors duration-200" />
                    </div>
                    <div>
                      <p className="body-small">LinkedIn</p>
                      <p className="text-label text-foreground group-hover:text-accent-foreground transition-colors">
                        linkedin.com/in/satya-sai-pasupuleti-7090pj
                      </p>
                    </div>
                  </motion.a>
                </div>
                
                <motion.div variants={itemVariants} className="divider my-8" />
                
                <motion.p variants={itemVariants} className="body-small">
                  Based in India, available for remote work globally.
                </motion.p>
              </motion.div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection delay={0.1} className="md:col-span-3">
              <motion.div
                className="card-elevated card-hover-glow"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                whileHover={{ y: -4, scale: 1.01 }}
              >
                <h2 className="heading-subsection text-foreground mb-6">
                  Send a Message
                </h2>
                
                {isSubmitted ? (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
                    >
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h3 className="heading-small text-foreground mb-2">
                      Message Sent!
                    </h3>
                    <p className="body-default text-muted-foreground">
                      Thank you for reaching out. I'll get back to you within 24-48 hours.
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="outline" 
                        className="mt-6"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.form 
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-4">
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
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="message">Brief Project Description</Label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        placeholder="Tell me about your documentation needs or opportunity..."
                        rows={4}
                        required 
                      />
                      <p className="body-small text-xs">
                        A sentence or two is perfect. We can discuss details later.
                      </p>
                    </motion.div>
                    
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
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
                    </motion.div>
                  </motion.form>
                )}
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;