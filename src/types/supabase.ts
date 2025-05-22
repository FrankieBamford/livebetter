export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "Challenge/Condition_Category": {
        Row: {
          common_search_examples: string | null
          id: number
          name: string
          slug: string | null
        }
        Insert: {
          common_search_examples?: string | null
          id?: number
          name: string
          slug?: string | null
        }
        Update: {
          common_search_examples?: string | null
          id?: number
          name?: string
          slug?: string | null
        }
        Relationships: []
      }
      provider_categories: {
        Row: {
          category_id: number | null
          created_at: string | null
          id: number
          modified_at: string | null
          provider_id: number | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string | null
          id?: never
          modified_at?: string | null
          provider_id?: number | null
        }
        Update: {
          category_id?: number | null
          created_at?: string | null
          id?: never
          modified_at?: string | null
          provider_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "provider_categories_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      providers: {
        Row: {
          created_at: string | null
          description: string | null
          email: string
          google_rating: number[] | null
          google_reviews_count: number | null
          id: number
          is_online: boolean | null
          is_verified: boolean | null
          latitude: number | null
          live_rating: number | null
          live_reviews_count: number | null
          location: string
          logo_url: string | null
          longitude: number | null
          modified_at: string | null
          name: string
          open_now: boolean | null
          phone: string
          requires_referal: boolean | null
          slug: string | null
          social_links: Json | null
          website_url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          email: string
          google_rating?: number[] | null
          google_reviews_count?: number | null
          id?: never
          is_online?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          live_rating?: number | null
          live_reviews_count?: number | null
          location: string
          logo_url?: string | null
          longitude?: number | null
          modified_at?: string | null
          name: string
          open_now?: boolean | null
          phone: string
          requires_referal?: boolean | null
          slug?: string | null
          social_links?: Json | null
          website_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          email?: string
          google_rating?: number[] | null
          google_reviews_count?: number | null
          id?: never
          is_online?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          live_rating?: number | null
          live_reviews_count?: number | null
          location?: string
          logo_url?: string | null
          longitude?: number | null
          modified_at?: string | null
          name?: string
          open_now?: boolean | null
          phone?: string
          requires_referal?: boolean | null
          slug?: string | null
          social_links?: Json | null
          website_url?: string | null
        }
        Relationships: []
      }
      service_subtypes: {
        Row: {
          description: string | null
          id: number
          name: string
          service_type_id: number
        }
        Insert: {
          description?: string | null
          id?: number
          name: string
          service_type_id: number
        }
        Update: {
          description?: string | null
          id?: number
          name?: string
          service_type_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "service_subtypes_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_types_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      service_types_categories: {
        Row: {
          examples: string | null
          id: number
          name: string
          slug: string | null
        }
        Insert: {
          examples?: string | null
          id?: number
          name: string
          slug?: string | null
        }
        Update: {
          examples?: string | null
          id?: number
          name?: string
          slug?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          image: string | null
          token_identifier: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          image?: string | null
          token_identifier: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          image?: string | null
          token_identifier?: string
          updated_at?: string | null
          user_id?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
