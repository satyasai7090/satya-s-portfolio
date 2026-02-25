import { useState, useRef, forwardRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/shared/PageHero";
import { AnimatedSection, containerVariants, itemVariants } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EMAILJS_SERVICE_ID = "service_bj7tvcm";
const EMAILJS_TEMPLATE_ID = "template_nfhlzio";
const EMAILJS_PUBLIC_KEY = "ONoT_lt-eA91kFfmc";

const Contact = forwardRef<HTMLDivElement>((_, ref) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!formRef.current) return;
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setIsSubmitted(true);
      toast({ title: "Message sent successfully!", description: "Thank you for reaching out. I'll get back to you soon." });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({ title: "Failed to send message", description: "Please try again or contact me directly via email.", variant: "destructive" });
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

      <section className="section-padding ent-section-1">
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
                <motion.h2 variants={itemVariants} className="heading-subsection gold-text mb-6">
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
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shadow-sm group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 border border-primary/20">
                      <Mail className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors duration-200" />
                    </div>
                    <div>
                      <p className="body-small">Email</p>
                      <p className="text-label text-foreground group-hover:text-primary transition-colors">
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
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shadow-sm group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 border border-primary/20">
                      <Linkedin className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors duration-200" />
                    </div>
                    <div>
                      <p className="body-small">LinkedIn</p>
                      <p className="text-label text-foreground group-hover:text-primary transition-colors">
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
                className="ent-card"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                whileHover={{ y: -4 }}
              >
                <h2 className="heading-subsection gold-text mb-6">Send a Message</h2>

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
                    <h3 className="heading-small text-foreground mb-2">Message Sent!</h3>
                    <p className="body-default">Thank you for reaching out. I'll get back to you within 24-48 hours.</p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        className="mt-6 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-label text-foreground">Name</label>
                        <input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-border bg-muted/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-200 text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-label text-foreground">Email</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-border bg-muted/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-200 text-sm"
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                      <label htmlFor="message" className="text-label text-foreground">Brief Project Description</label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about your documentation needs or opportunity..."
                        rows={4}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-muted/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-200 text-sm resize-none"
                      />
                      <p className="body-small text-xs">
                        A sentence or two is perfect. We can discuss details later.
                      </p>
                    </motion.div>

                    <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(var(--ent-gold)/0.4)] font-semibold px-8 h-12 text-base rounded-xl transition-all duration-300"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : (
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
});
Contact.displayName = "Contact";

export default Contact;
