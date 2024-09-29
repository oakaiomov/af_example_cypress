export {}

declare global {
  namespace User {
    namespace Register {
      type Payload = {
        accept_terms: boolean
        email: string
        lang: string
        password: string
        permanent_login: boolean
        pkce_oauth: null
        sample_projects: 'auto'
        timezone: string
        web_session: boolean
      }

      type Response = {
        auto_reminder: number
        business_account_id: null
        completed_count: number
        completed_today: number
        daily_goal: number
        date_format: number
        days_off: number[]
        email: string
        feature_identifier: string
        features: {
          beta: number
          dateist_inline_disabled: boolean
          dateist_lang: null
          'global.teams': boolean
          has_push_reminders: boolean
          karma_disabled: boolean
          karma_vacation: boolean
          kisa_consent_timestamp: null
          restriction: number
        }
        full_name: string
        has_password: boolean
        id: string
        image_id: null
        inbox_project_id: string
        is_celebrations_enabled: boolean
        is_premium: boolean
        joinable_workspace: null
        joined_at: string
        karma: number
        karma_trend: string
        lang: string
        mfa_enabled: boolean
        next_week: number
        onboarding_sample_projects: 'context'
        premium_status: 'not_premium'
        premium_until: null
        share_limit: number
        sort_order: number
        start_day: number
        start_page: 'today'
        theme_id: '0'
        time_format: number
        token: string
        tz_info: {
          gmt_string: string
          hours: number
          is_dst: number
          minutes: number
          timezone: string
        }
        unique_prefix: number
        verification_status: 'unverified'
        websocket_url: string
        weekend_start_day: number
        weekly_goal: number
      }
    }

    namespace Delete {
      type Payload = {
        current_password: string
        reason: string
      }

      type Response = {
        success: 'user deleted'
      }
    }
  }
}
