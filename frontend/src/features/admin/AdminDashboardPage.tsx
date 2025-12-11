import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  getLeads,
  getNewsletterSubscribers,
  getDashboardStats,
  deleteLead,
  deleteNewsletterSubscriber,
  Lead,
  NewsletterSubscriber,
  DashboardStats,
  PaginatedResponse
} from '../../api/admin'

type Tab = 'overview' | 'leads' | 'newsletter'

export default function AdminDashboardPage() {
  const { user, logout, isLoading: authLoading } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [leads, setLeads] = useState<PaginatedResponse<Lead> | null>(null)
  const [newsletter, setNewsletter] = useState<PaginatedResponse<NewsletterSubscriber> | null>(null)
  const [leadsPage, setLeadsPage] = useState(1)
  const [newsletterPage, setNewsletterPage] = useState(1)
  const [leadsSearch, setLeadsSearch] = useState('')
  const [newsletterSearch, setNewsletterSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      const data = await getDashboardStats()
      setStats(data)
    } catch (err) {
      console.error('Failed to fetch stats:', err)
    }
  }, [])

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getLeads(leadsPage, 20, leadsSearch || undefined)
      setLeads(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leads')
    } finally {
      setLoading(false)
    }
  }, [leadsPage, leadsSearch])

  const fetchNewsletter = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getNewsletterSubscribers(newsletterPage, 20, newsletterSearch || undefined)
      setNewsletter(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch subscribers')
    } finally {
      setLoading(false)
    }
  }, [newsletterPage, newsletterSearch])

  useEffect(() => {
    if (activeTab === 'overview') {
      fetchStats()
    } else if (activeTab === 'leads') {
      fetchLeads()
    } else if (activeTab === 'newsletter') {
      fetchNewsletter()
    }
  }, [activeTab, fetchStats, fetchLeads, fetchNewsletter])

  const handleDeleteLead = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return
    try {
      await deleteLead(id)
      fetchLeads()
      fetchStats()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete lead')
    }
  }

  const handleDeleteSubscriber = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this subscriber?')) return
    try {
      await deleteNewsletterSubscriber(id)
      fetchNewsletter()
      fetchStats()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete subscriber')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text-main">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-chat-bg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-heading font-bold text-text-main">
              MentorPath AI Admin
            </h1>
            <p className="text-sm text-text-muted">
              Welcome, {user?.username}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-text-muted hover:text-text-main
                     border border-border rounded-lg hover:bg-border/50 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-chat-bg border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {(['overview', 'leads', 'newsletter'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-muted hover:text-text-main'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-error text-sm">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-error/70 hover:text-error text-xs mt-1"
            >
              Dismiss
            </button>
          </div>
        )}

        {activeTab === 'overview' && (
          <OverviewTab stats={stats} loading={loading} />
        )}

        {activeTab === 'leads' && (
          <LeadsTab
            data={leads}
            loading={loading}
            page={leadsPage}
            setPage={setLeadsPage}
            search={leadsSearch}
            setSearch={setLeadsSearch}
            onDelete={handleDeleteLead}
            onRefresh={fetchLeads}
          />
        )}

        {activeTab === 'newsletter' && (
          <NewsletterTab
            data={newsletter}
            loading={loading}
            page={newsletterPage}
            setPage={setNewsletterPage}
            search={newsletterSearch}
            setSearch={setNewsletterSearch}
            onDelete={handleDeleteSubscriber}
            onRefresh={fetchNewsletter}
          />
        )}
      </main>
    </div>
  )
}

// Overview Tab Component
function OverviewTab({
  stats,
  loading
}: {
  stats: DashboardStats | null
  loading: boolean
}) {
  if (loading || !stats) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted">Loading statistics...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Leads" value={stats.total_leads} />
        <StatCard title="Newsletter Subscribers" value={stats.total_newsletter_subscribers} />
        <StatCard title="Leads Today" value={stats.leads_today} />
        <StatCard title="Leads This Week" value={stats.leads_this_week} />
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-chat-bg rounded-card p-6 border border-border">
          <h3 className="text-lg font-heading font-semibold text-text-main mb-4">
            Leads by Source
          </h3>
          {Object.entries(stats.leads_by_source).length > 0 ? (
            <ul className="space-y-2">
              {Object.entries(stats.leads_by_source).map(([source, count]) => (
                <li key={source} className="flex justify-between text-sm">
                  <span className="text-text-muted">{source}</span>
                  <span className="text-text-main font-medium">{count}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-text-muted text-sm">No data yet</p>
          )}
        </div>

        <div className="bg-chat-bg rounded-card p-6 border border-border">
          <h3 className="text-lg font-heading font-semibold text-text-main mb-4">
            Leads by Persona
          </h3>
          {Object.entries(stats.leads_by_persona).length > 0 ? (
            <ul className="space-y-2">
              {Object.entries(stats.leads_by_persona).map(([persona, count]) => (
                <li key={persona} className="flex justify-between text-sm">
                  <span className="text-text-muted">{persona.replace(/_/g, ' ')}</span>
                  <span className="text-text-main font-medium">{count}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-text-muted text-sm">No data yet</p>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-chat-bg rounded-card p-6 border border-border">
      <p className="text-text-muted text-sm">{title}</p>
      <p className="text-3xl font-heading font-bold text-text-main mt-1">
        {value}
      </p>
    </div>
  )
}

// Leads Tab Component
function LeadsTab({
  data,
  loading,
  page,
  setPage,
  search,
  setSearch,
  onDelete,
  onRefresh
}: {
  data: PaginatedResponse<Lead> | null
  loading: boolean
  page: number
  setPage: (p: number) => void
  search: string
  setSearch: (s: string) => void
  onDelete: (id: number) => void
  onRefresh: () => void
}) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email, name, or company..."
          className="flex-1 px-4 py-2 bg-chat-bg border border-border rounded-lg
                   text-text-main placeholder-text-muted
                   focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white
                   rounded-lg transition-colors"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="bg-chat-bg rounded-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Persona
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Source
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Created
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-text-muted">
                    Loading...
                  </td>
                </tr>
              ) : data?.items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-text-muted">
                    No leads found
                  </td>
                </tr>
              ) : (
                data?.items.map((lead) => (
                  <tr key={lead.id} className="hover:bg-background/50">
                    <td className="px-4 py-3 text-sm text-text-main">
                      {lead.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-main">
                      {lead.name || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-muted">
                      {lead.persona.replace(/_/g, ' ')}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-muted">
                      {lead.source}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-muted">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => onDelete(lead.id)}
                        className="text-error hover:text-error/80 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.total_pages > 1 && (
          <div className="px-4 py-3 border-t border-border flex items-center justify-between">
            <p className="text-sm text-text-muted">
              Page {data.page} of {data.total_pages} ({data.total} total)
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                className="px-3 py-1 text-sm border border-border rounded
                         disabled:opacity-50 disabled:cursor-not-allowed
                         hover:bg-border/50 text-text-muted"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= data.total_pages}
                className="px-3 py-1 text-sm border border-border rounded
                         disabled:opacity-50 disabled:cursor-not-allowed
                         hover:bg-border/50 text-text-muted"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Newsletter Tab Component
function NewsletterTab({
  data,
  loading,
  page,
  setPage,
  search,
  setSearch,
  onDelete,
  onRefresh
}: {
  data: PaginatedResponse<NewsletterSubscriber> | null
  loading: boolean
  page: number
  setPage: (p: number) => void
  search: string
  setSearch: (s: string) => void
  onDelete: (id: number) => void
  onRefresh: () => void
}) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email..."
          className="flex-1 px-4 py-2 bg-chat-bg border border-border rounded-lg
                   text-text-main placeholder-text-muted
                   focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white
                   rounded-lg transition-colors"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="bg-chat-bg rounded-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Source
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                  Subscribed
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-text-muted">
                    Loading...
                  </td>
                </tr>
              ) : data?.items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-text-muted">
                    No subscribers found
                  </td>
                </tr>
              ) : (
                data?.items.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-background/50">
                    <td className="px-4 py-3 text-sm text-text-main">
                      {subscriber.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-muted">
                      {subscriber.source}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-muted">
                      {new Date(subscriber.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => onDelete(subscriber.id)}
                        className="text-error hover:text-error/80 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.total_pages > 1 && (
          <div className="px-4 py-3 border-t border-border flex items-center justify-between">
            <p className="text-sm text-text-muted">
              Page {data.page} of {data.total_pages} ({data.total} total)
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                className="px-3 py-1 text-sm border border-border rounded
                         disabled:opacity-50 disabled:cursor-not-allowed
                         hover:bg-border/50 text-text-muted"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= data.total_pages}
                className="px-3 py-1 text-sm border border-border rounded
                         disabled:opacity-50 disabled:cursor-not-allowed
                         hover:bg-border/50 text-text-muted"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
