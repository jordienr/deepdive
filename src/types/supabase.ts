export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      subtopics: {
        Row: {
          created_at: string | null
          description: string
          difficulty: string | null
          id: number
          main_topic_title: string
          public_id: string
          title: string
          topic_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description: string
          difficulty?: string | null
          id?: number
          main_topic_title: string
          public_id?: string
          title: string
          topic_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string
          difficulty?: string | null
          id?: number
          main_topic_title?: string
          public_id?: string
          title?: string
          topic_id?: string
          user_id?: string
        }
      }
      topics: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          public_id: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          public_id?: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          public_id?: string
          title?: string
          user_id?: string
        }
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
