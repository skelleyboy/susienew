import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

import { Link } from "wouter";
import { Checkbox } from "@/components/ui/checkbox";

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      agreement: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    // Create FormData for Netlify submission
    const formData = new FormData();
    formData.append("form-name", formName);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    if (values.message) formData.append("message", values.message);
    if (values["bot-field"]) formData.append("bot-field", values["bot-field"]);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => {
        alert("Thanks for your inquiry! We'll be in touch shortly.");
        form.reset();
      })
      .catch((error) => alert(error));
  }

  return (
    <div className={className}>
      <div className="text-center mb-8">
        <h3 className="font-serif text-3xl mb-3 tracking-tight">{title}</h3>
        <p className="text-muted-foreground text-sm tracking-wide font-light">{subtitle}</p>
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
            <label>
              Don’t fill this out if you’re human: <input {...form.register("bot-field")} />
            </label>
          </p>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="Full Name" 
                    {...field} 
                    className="h-12 rounded-none border-t-0 border-x-0 border-b border-input bg-transparent px-5 focus-visible:ring-0 focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/60 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.15em] text-sm" 
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
                    className="h-12 rounded-none border-t-0 border-x-0 border-b border-input bg-transparent px-5 focus-visible:ring-0 focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/60 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.15em] text-sm" 
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
                    className="h-12 rounded-none border-t-0 border-x-0 border-b border-input bg-transparent px-5 focus-visible:ring-0 focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/60 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.15em] text-sm" 
                  />
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

          <Button type="submit" className="w-full rounded-none bg-primary text-white hover:bg-primary/90 uppercase tracking-[0.2em] text-xs font-medium h-14 mt-8 transition-all duration-300">
            {ctaText}
          </Button>
        </form>
      </Form>
    </div>
  );
}
