import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";
import { Loader2, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  message: z.string().optional(),
  address: z.string().optional(),
  condition: z.string().optional(),
  timeline: z.string().optional(),
  agreement: z.boolean().default(false).refine((val) => val === true, {
    message: "You must agree to the terms to proceed.",
  }),
  "bot-field": z.string().optional(),
});

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  className?: string;
  formName?: string;
}

export function LeadForm({ 
  title = "Work with Susie", 
  subtitle = "Ready to start your journey? Let's connect.",
  ctaText = "Submit Request",
  className,
  formName = "contact"
}: LeadFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const isValuation = formName === "home-valuation";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      address: "",
      condition: "",
      timeline: "",
      agreement: false,
    },
  });

  const handleNextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await form.trigger(["address"]);
    } else if (step === 2) {
      isValid = await form.trigger(["condition", "timeline"]);
    }
    
    if (isValid) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Create FormData for Netlify submission
    const formData = new FormData();
    formData.append("form-name", formName);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    if (values.message) formData.append("message", values.message);
    if (values.address) formData.append("address", values.address);
    if (values.condition) formData.append("condition", values.condition);
    if (values.timeline) formData.append("timeline", values.timeline);
    if (values["bot-field"]) formData.append("bot-field", values["bot-field"]);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => {
        setIsSuccess(true);
        form.reset();
      })
      .catch((error) => alert(error));
  }

  if (isSuccess) {
    return (
      <div className={cn("text-center py-12", className)}>
        <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
        <h3 className="font-serif text-3xl mb-4 text-primary">Thank You</h3>
        <p className="text-muted-foreground font-light">We have received your information and will be in touch shortly.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="text-center mb-8">
        <h3 className="font-serif text-3xl mb-3 tracking-tight">{title}</h3>
        <p className="text-muted-foreground text-sm tracking-wide font-light">{subtitle}</p>
        
        {isValuation && (
          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3].map(i => (
              <div key={i} className={cn("h-1 w-12 rounded-full transition-colors", step >= i ? "bg-primary" : "bg-gray-200")} />
            ))}
          </div>
        )}
      </div>

      <Form {...form}>
        <form 
          name={formName} 
          method="POST" 
          data-netlify="true" 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-6"
        >
          <input type="hidden" name="form-name" value={formName} />
          <p className="hidden">
            <label>Don’t fill this out if you’re human: <input {...form.register("bot-field")} /></label>
          </p>

          {(!isValuation || (isValuation && step === 1)) && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {isValuation ? (
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Property Address" 
                          {...field} 
                          className="h-14 rounded-none border-t-0 border-x-0 border-b border-input bg-transparent px-5 focus-visible:ring-0 focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/60 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.15em] text-sm" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="How can we help you?" 
                          {...field} 
                          className="rounded-none border-t-0 border-x-0 border-b border-input bg-transparent px-5 min-h-[100px] resize-none focus-visible:ring-0 focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/60 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.15em] text-sm py-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          )}

          {isValuation && step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Property Condition (e.g. Updated, Needs Work)" 
                        {...field} 
                        className="h-14 rounded-none border-t-0 border-x-0 border-b border-input bg-transparent px-5 focus-visible:ring-0 focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/60 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.15em] text-sm" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Selling Timeline (e.g. ASAP, 3-6 months)" 
                        {...field} 
                        className="h-14 rounded-none border-t-0 border-x-0 border-b border-input bg-transparent px-5 focus-visible:ring-0 focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/60 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.15em] text-sm" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {(!isValuation || (isValuation && step === 3)) && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Full Name" 
                        {...field} 
                        className="h-14 rounded-none border-t-0 border-x-0 border-b border-input bg-transparent px-5 focus-visible:ring-0 focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/60 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.15em] text-sm" 
                      />
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
                    <FormControl>
                      <Input 
                        placeholder="Email Address" 
                        {...field} 
                        className="h-14 rounded-none border-t-0 border-x-0 border-b border-input bg-transparent px-5 focus-visible:ring-0 focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/60 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.15em] text-sm" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Phone Number" 
                        {...field} 
                        className="h-14 rounded-none border-t-0 border-x-0 border-b border-input bg-transparent px-5 focus-visible:ring-0 focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/60 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.15em] text-sm" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="agreement"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-xs font-light leading-relaxed text-muted-foreground block">
                        I agree to be contacted by Susie Sharak Realty via call, email, and text. To opt-out, you can reply 'stop' at any time or click the unsubscribe link in the emails. Message and data rates may apply. <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="flex gap-4 pt-4">
            {isValuation && step > 1 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePrevStep}
                className="rounded-none border-primary/20 text-primary hover:bg-primary/5 uppercase tracking-[0.2em] text-xs font-medium h-14 px-6 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            
            {isValuation && step < 3 ? (
              <Button 
                type="button" 
                onClick={handleNextStep}
                className="flex-1 rounded-none bg-primary text-white hover:bg-primary/90 uppercase tracking-[0.2em] text-xs font-medium h-14 transition-all duration-300"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={form.formState.isSubmitting}
                className="flex-1 rounded-none bg-primary text-white hover:bg-primary/90 uppercase tracking-[0.2em] text-xs font-medium h-14 transition-all duration-300"
              >
                {form.formState.isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {ctaText}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
