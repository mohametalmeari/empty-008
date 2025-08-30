import { useTokenForm } from "@/providers/token-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const urlSchema = z
  .string()
  .url("Please enter a valid URL")
  .or(z.string().length(0));

const formSchema = z.object({
  website: urlSchema,
  twitter: urlSchema,
  discord: urlSchema,
});

export const LinksSection = () => {
  const {
    handleBack,
    handleNext,
    setValue: setContextValue,
    website,
    twitter,
    discord,
  } = useTokenForm();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: website || "",
      twitter: twitter || "",
      discord: discord || "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setContextValue(values);
    handleNext();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <FormLabel className="text-sm">Website</FormLabel>
                </div>
                <FormControl>
                  <Input
                    placeholder="https://your-website.com"
                    {...field}
                    className="h-9 placeholder:text-primary/70"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <FormLabel className="text-sm">Twitter/X</FormLabel>
                </div>
                <FormControl>
                  <Input
                    placeholder="https://twitter.com/your-handle"
                    {...field}
                    className="h-9 placeholder:text-primary/70"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discord"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <FormLabel className="text-sm">Discord</FormLabel>
                </div>
                <FormControl>
                  <Input
                    placeholder="https://discord.gg/your-server"
                    {...field}
                    className="h-9 placeholder:text-primary/70"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </Form>
  );
};
