/**
 * Admin API functions for authentication and data access.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Type definitions
export interface LoginRequest {
  username: string
  password: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

export interface AdminUser {
  id: number
  username: string
  is_active: boolean
  created_at: string
  last_login: string | null
}

export interface Lead {
  id: number
  email: string
  persona: string
  source: string
  initial_interest: string | null
  name: string | null
  role: string | null
  company: string | null
  agent_type: string | null
  timeframe: string | null
  created_at: string
  updated_at: string
}

export interface NewsletterSubscriber {
  id: number
  email: string
  source: string
  created_at: string
}

export interface EmailLog {
  id: number
  lead_id: number
  template_name: string
  status: string
  scheduled_at: string
  sent_at: string | null
  error_message: string | null
  created_at: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  page_size: number
  total_pages: number
}

export interface DashboardStats {
  total_leads: number
  total_newsletter_subscribers: number
  leads_today: number
  leads_this_week: number
  leads_by_source: Record<string, number>
  leads_by_persona: Record<string, number>
}

// Token management
const TOKEN_KEY = 'admin_token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function isAuthenticated(): boolean {
  return !!getToken()
}

// Helper function for authenticated requests
async function authenticatedRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken()
  if (!token) {
    throw new ApiError('Not authenticated', 401)
  }

  const url = `${API_BASE_URL}${endpoint}`
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers
  }

  const response = await fetch(url, {
    ...options,
    headers
  })

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`
    let errorData: unknown

    try {
      const data = await response.json()
      errorData = data
      errorMessage = data.detail || data.error || data.message || errorMessage
    } catch {
      // Response is not JSON
    }

    if (response.status === 401) {
      removeToken()
    }

    throw new ApiError(errorMessage, response.status, errorData)
  }

  try {
    return await response.json()
  } catch {
    return {} as T
  }
}

// Auth API
export async function login(credentials: LoginRequest): Promise<TokenResponse> {
  const url = `${API_BASE_URL}/v1/auth/login`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })

  if (!response.ok) {
    let errorMessage = 'Login failed'

    try {
      const data = await response.json()
      errorMessage = data.detail || data.error || data.message || errorMessage
    } catch {
      // Response is not JSON
    }

    throw new ApiError(errorMessage, response.status)
  }

  const data: TokenResponse = await response.json()
  setToken(data.access_token)
  return data
}

export function logout(): void {
  removeToken()
}

export async function getCurrentUser(): Promise<AdminUser> {
  return authenticatedRequest<AdminUser>('/v1/auth/me')
}

export async function verifyAuth(): Promise<boolean> {
  try {
    await authenticatedRequest('/v1/auth/verify')
    return true
  } catch {
    return false
  }
}

// Admin API
export async function getLeads(
  page: number = 1,
  pageSize: number = 20,
  search?: string,
  source?: string,
  persona?: string
): Promise<PaginatedResponse<Lead>> {
  const params = new URLSearchParams({
    page: page.toString(),
    page_size: pageSize.toString()
  })

  if (search) params.append('search', search)
  if (source) params.append('source', source)
  if (persona) params.append('persona', persona)

  return authenticatedRequest<PaginatedResponse<Lead>>(
    `/v1/admin/leads?${params.toString()}`
  )
}

export async function getNewsletterSubscribers(
  page: number = 1,
  pageSize: number = 20,
  search?: string,
  source?: string
): Promise<PaginatedResponse<NewsletterSubscriber>> {
  const params = new URLSearchParams({
    page: page.toString(),
    page_size: pageSize.toString()
  })

  if (search) params.append('search', search)
  if (source) params.append('source', source)

  return authenticatedRequest<PaginatedResponse<NewsletterSubscriber>>(
    `/v1/admin/newsletter?${params.toString()}`
  )
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return authenticatedRequest<DashboardStats>('/v1/admin/stats')
}

export async function getLeadDetail(leadId: number): Promise<Lead> {
  return authenticatedRequest<Lead>(`/v1/admin/leads/${leadId}`)
}

export async function getLeadEmails(leadId: number): Promise<EmailLog[]> {
  return authenticatedRequest<EmailLog[]>(`/v1/admin/leads/${leadId}/emails`)
}

export async function deleteLead(leadId: number): Promise<void> {
  await authenticatedRequest(`/v1/admin/leads/${leadId}`, {
    method: 'DELETE'
  })
}

export async function deleteNewsletterSubscriber(
  subscriberId: number
): Promise<void> {
  await authenticatedRequest(`/v1/admin/newsletter/${subscriberId}`, {
    method: 'DELETE'
  })
}
