import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="bg-gradient-feature border-border/50 shadow-soft hover:shadow-therapeutic transition-therapeutic hover:scale-105 group">
      <CardContent className="p-6 text-center">
        <div className="text-4xl mb-4 group-hover:scale-110 transition-therapeutic">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};