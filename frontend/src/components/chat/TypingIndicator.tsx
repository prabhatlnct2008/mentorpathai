export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div
        className="
          px-6 py-4
          bg-bubble-bg
          border border-bubble-border
          rounded-tl-[24px]
          rounded-tr-[18px]
          rounded-br-[18px]
          rounded-bl-[6px]
        "
      >
        <div className="flex gap-1">
          <span
            className="w-2 h-2 bg-text-muted rounded-full animate-bounce-dot"
            style={{ animationDelay: '0s' }}
          />
          <span
            className="w-2 h-2 bg-text-muted rounded-full animate-bounce-dot"
            style={{ animationDelay: '0.2s' }}
          />
          <span
            className="w-2 h-2 bg-text-muted rounded-full animate-bounce-dot"
            style={{ animationDelay: '0.4s' }}
          />
        </div>
      </div>
    </div>
  )
}
