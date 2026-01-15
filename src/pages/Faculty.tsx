import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Calendar, GraduationCap } from "lucide-react";
import type { Faculty } from "@/lib/types";

const Faculty = () => {
  const { data: faculty, isLoading } = useQuery({
    queryKey: ["faculty"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("faculty")
        .select("*")
        .order("date_of_joining");
      if (error) throw error;
      return data as Faculty[];
    },
  });

  const designationColors: Record<string, string> = {
    "Associate Professor": "bg-purple-100 text-purple-800",
    "Assistant Professor": "bg-blue-100 text-blue-800",
    "Teaching Assistant": "bg-green-100 text-green-800",
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our <span className="text-gradient">Faculty</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet our experienced and dedicated faculty members who are committed to excellence in education
            </p>
          </div>

          {/* Faculty Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
                    <Skeleton className="h-5 w-3/4 mx-auto mb-2" />
                    <Skeleton className="h-4 w-1/2 mx-auto mb-3" />
                    <Skeleton className="h-3 w-full mb-2" />
                    <Skeleton className="h-3 w-2/3 mx-auto" />
                  </CardContent>
                </Card>
              ))
            ) : (
              faculty?.map((member) => (
                <Card
                  key={member.id}
                  className="border-0 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <CardContent className="p-6 text-center">
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-primary-foreground" />
                    </div>

                    {/* Name */}
                    <h3 className="font-semibold text-foreground text-lg mb-1">
                      {member.name}
                    </h3>

                    {/* Designation Badge */}
                    <Badge
                      className={`mb-3 ${designationColors[member.designation] || "bg-gray-100 text-gray-800"}`}
                    >
                      {member.designation}
                    </Badge>

                    {/* Qualification */}
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-2">
                      <GraduationCap className="w-4 h-4" />
                      <span>{member.qualification}</span>
                    </div>

                    {/* Date of Joining */}
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>
                        Since{" "}
                        {new Date(member.date_of_joining).toLocaleDateString("en-IN", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-xl mx-auto">
            <div className="text-center p-4 rounded-xl bg-muted">
              <p className="text-2xl font-bold text-primary">
                {faculty?.filter((f) => f.qualification.includes("Ph.D")).length || 0}
              </p>
              <p className="text-sm text-muted-foreground">Ph.D Holders</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted">
              <p className="text-2xl font-bold text-primary">{faculty?.length || 0}</p>
              <p className="text-sm text-muted-foreground">Total Faculty</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted">
              <p className="text-2xl font-bold text-primary">10+</p>
              <p className="text-sm text-muted-foreground">Years Avg. Exp</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Faculty;