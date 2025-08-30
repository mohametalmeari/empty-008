import { useTokenForm } from "@/providers/token-form";
import Image from "next/image";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UploadIcon } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Token name is required"),
  symbol: z.string().min(1, "Token symbol is required"),
  description: z.string().optional(),
  supply: z.number().min(1, "Supply must be greater than 0"),
  decimals: z.number(),
});

export const MetadataSection = () => {
  const {
    setValue: setContextValue,
    handleBack,
    handleNext,
    title,
    symbol,
    description,
    supply,
    decimals,
    logo,
  } = useTokenForm();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      symbol,
      description,
      supply,
      decimals,
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
          <div className="grid gap-4 sm:grid-cols-2 items-start">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm">
                    Token Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. My Amazing Token"
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
              name="symbol"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <FormLabel className="text-sm">
                      Token Symbol <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormDescription className="text-xs">
                      Max. 5 chars
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="e.g. MAT"
                      {...field}
                      maxLength={5}
                      className="h-9 placeholder:text-primary/70"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-sm">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your token"
                    className="resize-none h-20 placeholder:text-primary/70"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="supply"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm">
                    Total Supply <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="h-9 placeholder:text-primary/70"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="decimals"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm">
                    Decimals <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={(val: string) => field.onChange(Number(val))}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select decimal places" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="6">6 (standard)</SelectItem>
                      <SelectItem value="9">9 (common)</SelectItem>
                      <SelectItem value="0">0 (no decimals)</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormItem className="space-y-1">
            <div className="flex items-baseline justify-between">
              <FormLabel className="text-sm">Token Logo</FormLabel>
            </div>
            <Card className="border-dashed">
              <CardContent className="p-4">
                <div className="flex items-center justify-center">
                  <Input
                    type="file"
                    onChange={(e) =>
                      setContextValue({ logo: e.target.files?.[0] })
                    }
                    accept="image/*"
                    className="hidden"
                    id="logo-upload"
                  />
                  {logo ? (
                    <div className="relative w-16 h-16">
                      <Image
                        src={URL.createObjectURL(logo)}
                        alt="Logo Preview"
                        fill
                        className="object-contain rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="absolute -top-2 -right-2 rounded-full w-5 h-5 text-xs"
                        onClick={() => setContextValue({ logo: null })}
                      >
                        ✕
                      </Button>
                    </div>
                  ) : (
                    <label
                      htmlFor="logo-upload"
                      className="flex flex-col items-center gap-1.5 cursor-pointer py-3"
                    >
                      <div className="p-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <UploadIcon />
                      </div>
                    </label>
                  )}
                </div>
              </CardContent>
            </Card>
          </FormItem>
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
