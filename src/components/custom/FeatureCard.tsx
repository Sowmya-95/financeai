import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
};

export function FeatureCard({ icon: Icon, title, description, iconColor = "text-primary" }: Props) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="w-12 h-12 flex items-center justify-center bg-muted rounded-lg mb-4">
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
