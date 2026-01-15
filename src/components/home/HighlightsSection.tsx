import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Award, Building, Briefcase, Lightbulb, Users, Monitor } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Highlight } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  award: Award,
  building: Building,
  briefcase: Briefcase,
  lightbulb: Lightbulb,
  users: Users,
  monitor: Monitor,
};

export function HighlightsSection() {
  const { data: highlights, isLoading } = useQuery({
    queryKey: ["highlights"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("highlights")
        .select("*")
        .order("created_at");
      if (error) throw error;
      return data as Highlight[];
    },
  });

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Departmental <span className="text-gradient">Highlights</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover what makes our IT department stand out
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <Skeleton className="w-12 h-12 rounded-lg mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6 mt-1" />
                </CardContent>
              </Card>
            ))
          ) : (
            highlights?.map((highlight, index) => {
              const Icon = iconMap[highlight.icon] || Award;
              const gradients = [
                "gradient-primary",
                "gradient-accent",
                "bg-secondary",
              ];
              return (
                <Card
                  key={highlight.id}
                  className="border-0 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 rounded-lg ${gradients[index % 3]} flex items-center justify-center mb-4`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}