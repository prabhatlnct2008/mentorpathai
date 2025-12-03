import api from './index'

export interface LeadData {
  email: string
  persona?: string | null
  interest?: string | null
  source?: string
}

export interface LeadResponse {
  success: boolean
  message?: string
  leadId?: string
}

export async function submitLead(data: LeadData): Promise<LeadResponse> {
  return api.post<LeadResponse>('/v1/leads', {
    ...data,
    source: data.source || 'landing_page',
    timestamp: new Date().toISOString()
  })
}
