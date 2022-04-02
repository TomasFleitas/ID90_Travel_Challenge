export interface CurrentUserI {
  id: number;
  api_id: string;
  airline: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_hire?: any;
  employee_number: string;
  status?: any;
  station?: any;
  password_digest?: any;
  member_type: string;
  token?: any;
  state: string;
  state_changed_at?: any;
  accept_terms_of_service: boolean;
  lang: string;
  identity_id: number;
  id90_user_id: number;
  organization_id: number;
  currency: string;
  tutorial_shown: string;
  utm_source?: any;
  utm_medium?: any;
  confirmation_token?: any;
  confirmed_at: string;
  confirmation_sent_at?: any;
  created_at: string;
  verification_email: string;
  affiliation?: any;
  review_sent: boolean;
  app_downloaded: boolean;
  delete_requested?: any;
  email_opt_out: string;
  profile_image_url: string;
  password_updated_at: string;
  utm_campaign?: any;
  review_denied: boolean;
}

export interface AerolineasI {
  id: number;
  name: string;
  code: string;
  sign_in_available: boolean;
  sign_up_available: boolean;
  display_name: string;
  is_commercial: boolean;
  employee_number_required: boolean;
  partner: boolean;
  lang: string;
  currency: string;
  email_domains: string[];
  airline_blog_uri: string;
  white_label_url: string;
}
