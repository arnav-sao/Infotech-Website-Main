export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          title: string
          type: string
          year: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          title: string
          type: string
          year: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          title?: string
          type?: string
          year?: number
        }
        Relationships: []
      }
      attendance: {
        Row: {
          attendance_percentage: number
          created_at: string
          id: string
          semester: number
          subject: string
        }
        Insert: {
          attendance_percentage: number
          created_at?: string
          id?: string
          semester: number
          subject: string
        }
        Update: {
          attendance_percentage?: number
          created_at?: string
          id?: string
          semester?: number
          subject?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          description: string
          event_date: string
          external_link: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          created_at?: string
          description: string
          event_date: string
          external_link?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          created_at?: string
          description?: string
          event_date?: string
          external_link?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      faculty: {
        Row: {
          created_at: string
          date_of_joining: string
          designation: string
          id: string
          name: string
          photo_url: string | null
          qualification: string
        }
        Insert: {
          created_at?: string
          date_of_joining: string
          designation: string
          id?: string
          name: string
          photo_url?: string | null
          qualification: string
        }
        Update: {
          created_at?: string
          date_of_joining?: string
          designation?: string
          id?: string
          name?: string
          photo_url?: string | null
          qualification?: string
        }
        Relationships: []
      }
      highlights: {
        Row: {
          created_at: string
          description: string
          icon: string | null
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          icon?: string | null
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      placement_companies: {
        Row: {
          category: string
          created_at: string
          id: string
          logo_url: string | null
          name: string
          package_range: string | null
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          package_range?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          package_range?: string | null
        }
        Relationships: []
      }
      placement_highlights: {
        Row: {
          company: string
          created_at: string
          id: string
          package: number
          photo_url: string | null
          student_name: string
          year: number
        }
        Insert: {
          company: string
          created_at?: string
          id?: string
          package: number
          photo_url?: string | null
          student_name: string
          year: number
        }
        Update: {
          company?: string
          created_at?: string
          id?: string
          package?: number
          photo_url?: string | null
          student_name?: string
          year?: number
        }
        Relationships: []
      }
      placements: {
        Row: {
          average_package: number
          created_at: string
          highest_package: number
          id: string
          placement_percentage: number
          total_placed: number
          year: number
        }
        Insert: {
          average_package: number
          created_at?: string
          highest_package: number
          id?: string
          placement_percentage: number
          total_placed: number
          year: number
        }
        Update: {
          average_package?: number
          created_at?: string
          highest_package?: number
          id?: string
          placement_percentage?: number
          total_placed?: number
          year?: number
        }
        Relationships: []
      }
      queries: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
        }
        Relationships: []
      }
      results: {
        Row: {
          created_at: string
          id: string
          marks: number
          max_marks: number
          semester: number
          subject: string
        }
        Insert: {
          created_at?: string
          id?: string
          marks: number
          max_marks?: number
          semester: number
          subject: string
        }
        Update: {
          created_at?: string
          id?: string
          marks?: number
          max_marks?: number
          semester?: number
          subject?: string
        }
        Relationships: []
      }
      timetable: {
        Row: {
          created_at: string
          day: string
          id: string
          semester: number
          subject: string
          time_slot: number
        }
        Insert: {
          created_at?: string
          day: string
          id?: string
          semester: number
          subject: string
          time_slot: number
        }
        Update: {
          created_at?: string
          day?: string
          id?: string
          semester?: number
          subject?: string
          time_slot?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
