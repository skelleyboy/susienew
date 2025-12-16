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
});

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  className?: string;
}

export function LeadForm({ 
  title = "Work with Susie", 
  subtitle = "Ready to start your journey? Let's connect.",
  ctaText = "Submit Request",
  className 
}: LeadFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // In a real app, send to API
    alert("Thanks for your inquiry! We'll be in touch shortly.");
    form.reset();
  }

  return (
    <div className={className}>
      <div className="text-center mb-8">
        <h3 className="font-serif text-2xl mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Full Name" {...field} className="rounded-none border-t-0 border-x-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors" />
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
                  <Input placeholder="Email Address" {...field} className="rounded-none border-t-0 border-x-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors" />
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
                  <Input placeholder="Phone Number" {...field} className="rounded-none border-t-0 border-x-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors" />
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
                    className="rounded-none border-t-0 border-x-0 border-b border-input bg-transparent px-0 min-h-[80px] resize-none focus-visible:ring-0 focus-visible:border-primary transition-colors"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full rounded-none bg-primary text-white hover:bg-primary/90 uppercase tracking-widest text-xs font-bold h-12 mt-4">
            {ctaText}
          </Button>
        </form>
      </Form>
    </div>
  );
}
