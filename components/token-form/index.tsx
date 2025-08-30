import { useTokenForm } from "@/providers/token-form";
import { MetadataSection } from "./metadata-section";
import { LinksSection } from "./links-section";
import { ConnectSection } from "./connect-section";
import { SubmitSection } from "./submit-section";
import { SuccessSection } from "./success-section";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";


export const TokenForm = () => {
  const { index, result } = useTokenForm();
  const steps = [
    "Connect Wallet",
    "Token Metadata",
    "Social Links",
    "Create Token",
  ];

  return (
    <div className="min-h-[400px] my-8 sm:my-16 max-w-full sm:max-w-xl mx-auto px-2 sm:px-0">
      <Card className="h-full">
        <CardContent>
          {index !== undefined && (
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-4 sm:space-y-6">
                <Progress
                  value={(index / (steps.length - 1)) * 100}
                  className="h-2"
                />
                <div className="grid grid-cols-4 gap-1 sm:gap-2 relative">
                  <div
                    className="absolute h-[2px] top-5 left-0 bg-border transition-all duration-500 ease-out"
                    style={{
                      width: `${(index / (steps.length - 1)) * 100}%`,
                      backgroundColor: "hsl(var(--primary))",
                      zIndex: 0,
                    }}
                  />
                  {steps.map((step, i) => (
                    <div
                      key={i}
                      className={`relative flex flex-col items-center gap-1 sm:gap-2 pt-1 sm:pt-2 group transition-colors
                        ${
                          i < index
                            ? "text-primary"
                            : i === index
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                    >
                      <div
                        className={`
                          w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2
                          transition-all duration-200 relative z-10 bg-background
                          group-hover:border-primary/70
                          ${
                            i < index
                              ? "border-primary bg-primary text-primary-foreground"
                              : i === index
                              ? "border-primary text-primary scale-110"
                              : "border-muted"
                          }
                        `}
                      >
                        {i < index ? (
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <span className="text-xs sm:text-sm font-medium">{i + 1}</span>
                        )}
                      </div>
                      <span
                        className={`text-xs sm:text-sm font-medium text-center transition-colors
                        ${i === index ? "text-primary" : ""}
                        hidden xs:hidden sm:block
                      `}
                      >
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4 sm:my-6" />
              </div>
            </div>
          )}

          <div className="space-y-4 sm:space-y-6">
            {index === 0 && <ConnectSection />}
            {index === 1 && <MetadataSection />}
            {index === 2 && <LinksSection />}
            {index === 3 && <SubmitSection />}
          </div>

          {result && index === 4 && <SuccessSection />}
        </CardContent>
      </Card>
    </div>
  );
};
