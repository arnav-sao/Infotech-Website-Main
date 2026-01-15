import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Award, GraduationCap, User } from "lucide-react";
import type { Achievement } from "@/lib/types";

const Achievements = () => {
  const { data: achievements, isLoading } = useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order("year", { ascending: false });
      if (error) throw error;
      return data as Achievement[];
    },
  });

  const studentAchievements = achievements?.filter((a) => a.type === "student") || [];
  const facultyAchievements = achievements?.filter((a) => a.type === "faculty") || [];

  const AchievementCard = ({ achievement }: { achievement: Achievement }) => (
    <Card className="border-0 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
            {achievement.type === "student" ? (
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            ) : (
              <User className="w-6 h-6 text-primary-foreground" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-foreground">{achievement.name}</h3>
              <Badge variant="outline" className="text-xs">
                {achievement.year}
              </Badge>
            </div>
            <p className="text-primary font-medium mb-2">{achievement.title}</p>
            {achievement.description && (
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="text-gradient">Achievements</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Celebrating excellence and accomplishments of our students and faculty
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
            <Card className="border-0 shadow-md text-center">
              <CardContent className="p-4">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{achievements?.length || 0}</p>
                <p className="text-xs text-muted-foreground">Total Awards</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md text-center">
              <CardContent className="p-4">
                <GraduationCap className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{studentAchievements.length}</p>
                <p className="text-xs text-muted-foreground">Student Awards</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md text-center">
              <CardContent className="p-4">
                <User className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{facultyAchievements.length}</p>
                <p className="text-xs text-muted-foreground">Faculty Awards</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md text-center">
              <CardContent className="p-4">
                <Award className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">2024</p>
                <p className="text-xs text-muted-foreground">Latest Year</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="students" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="students" className="gap-2">
                <GraduationCap className="w-4 h-4" />
                Student Achievements
              </TabsTrigger>
              <TabsTrigger value="faculty" className="gap-2">
                <User className="w-4 h-4" />
                Faculty Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="students">
              <div className="grid gap-4">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i} className="border-0 shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Skeleton className="w-12 h-12 rounded-lg" />
                          <div className="flex-1">
                            <Skeleton className="h-5 w-1/3 mb-2" />
                            <Skeleton className="h-4 w-1/2 mb-2" />
                            <Skeleton className="h-3 w-full" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : studentAchievements.length > 0 ? (
                  studentAchievements.map((achievement) => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No student achievements found.
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="faculty">
              <div className="grid gap-4">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="border-0 shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Skeleton className="w-12 h-12 rounded-lg" />
                          <div className="flex-1">
                            <Skeleton className="h-5 w-1/3 mb-2" />
                            <Skeleton className="h-4 w-1/2 mb-2" />
                            <Skeleton className="h-3 w-full" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : facultyAchievements.length > 0 ? (
                  facultyAchievements.map((achievement) => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No faculty achievements found.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Achievements;