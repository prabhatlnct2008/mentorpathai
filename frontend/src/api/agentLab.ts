import api from './index'

export interface AgentLabLeadData {
  email: string
  name: string
  role: string
  company?: string
  agent_type: string
  timeframe: string
  source: string
}

export interface NewsletterData {
  email: string
  source?: string
}

export async function submitAgentLabLead(data: AgentLabLeadData) {
  return api.post('/v1/leads', {
    ...data,
    source: 'agent_systems_lab'
  })
}

export async function subscribeNewsletter(data: NewsletterData) {
  return api.post('/v1/newsletter', {
    ...data,
    source: data.source || 'agent_systems_lab_syllabus'
  })
}
