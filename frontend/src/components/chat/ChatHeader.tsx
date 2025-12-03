import Badge from '../ui/Badge'

export default function ChatHeader() {
  return (
    <div className="flex flex-col items-center gap-4 mb-8 pb-6 border-b border-border">
      <h1 className="text-3xl font-heading font-bold text-text-main">
        MentorPath AI
      </h1>
      <p className="text-text-muted text-center">
        Your personal GenAI mentor
      </p>
      <Badge variant="online">
        Mentor online
      </Badge>
    </div>
  )
}
