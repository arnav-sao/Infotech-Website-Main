import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ExternalLink, Clock } from "lucide-react";
import type { Event } from "@/lib/types";

const Events = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: false });
      if (error) throw error;
      return data as Event[];
    },
  });

  const today = new Date();
  const upcomingEvents = events?.filter((e) => new Date(e.event_date) >= today) || [];
  const pastEvents = events?.filter((e) => new Date(e.event_date) < today) || [];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const isUpcoming = (dateStr: string) => new Date(dateStr) >= today;

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="text-gradient">Events</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with departmental events, workshops, and activities
            </p>
          </div>

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Upcoming Events
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {upcomingEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="border-0 shadow-md hover:shadow-lg transition-all overflow-hidden"
                  >
                    <div className="gradient-primary p-4">
                      <Badge className="bg-white/20 text-white border-0">
                        Upcoming
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {event.name}
                      </h3>
                      <div className="flex items-center gap-2 text-primary mb-4">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {formatDate(event.event_date)}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">{event.description}</p>
                      {event.external_link && (
                        <Button asChild>
                          <a
                            href={event.external_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View More / Register
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Events */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" />
              {upcomingEvents.length > 0 ? "Past Events" : "All Events"}
            </h2>
            <div className="grid gap-4">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Card key={i} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Skeleton className="w-16 h-16 rounded-lg" />
                        <div className="flex-1">
                          <Skeleton className="h-6 w-1/2 mb-2" />
                          <Skeleton className="h-4 w-1/4 mb-2" />
                          <Skeleton className="h-3 w-full" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (upcomingEvents.length > 0 ? pastEvents : events)?.length ? (
                (upcomingEvents.length > 0 ? pastEvents : events)?.map((event) => (
                  <Card
                    key={event.id}
                    className="border-0 shadow-md hover:shadow-lg transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        {/* Date Box */}
                        <div className="w-16 h-16 rounded-lg bg-muted flex flex-col items-center justify-center flex-shrink-0">
                          <span className="text-2xl font-bold text-primary">
                            {new Date(event.event_date).getDate()}
                          </span>
                          <span className="text-xs text-muted-foreground uppercase">
                            {new Date(event.event_date).toLocaleDateString("en-IN", {
                              month: "short",
                            })}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">
                              {event.name}
                            </h3>
                            <Badge
                              variant={isUpcoming(event.event_date) ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {isUpcoming(event.event_date) ? "Upcoming" : "Past"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {event.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(event.event_date)}
                          </p>
                        </div>

                        {/* Action */}
                        {event.external_link && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={event.external_link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View More
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No events found.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;