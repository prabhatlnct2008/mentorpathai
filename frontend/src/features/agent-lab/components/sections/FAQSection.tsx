import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'Do I need to be a strong coder?',
    answer: 'Basic coding comfort helps (Python or JS), but you don\'t need to be a systems engineer. We\'ll keep the stack as simple as possible while still teaching you real agentic patterns. If you\'ve written scripts or small apps before, you\'ll be fine.'
  },
  {
    question: 'How is this different from self-paced Kaggle or YouTube content?',
    answer: 'Resources like Kaggle\'s Agents Intensive are fantastic, but they\'re self-paced and generic. In Agent Systems Lab, we use similar building blocks, but everything is tailored to your use case, with a mentor reviewing your designs and code each week.'
  },
  {
    question: 'Can I do this alongside a full-time job?',
    answer: 'Yes. The Lab is designed around ~7 hours per week. Many mentees are full-time professionals who want to upskill without pausing their career.'
  },
  {
    question: 'Will I definitely have a production-ready agent at the end?',
    answer: 'You\'ll have a production shaped agent: a working prototype with tools, memory, observability and a clear deployment path. Whether you deploy depends on your environment, data and compliance requirements. We\'ll help you plan a realistic rollout.'
  },
  {
    question: 'How much does it cost?',
    answer: 'Founding cohort pricing will be shared with accepted applicants. Expect it to be in the \'serious professional development\' range, not a $29 course – but far less than a full bootcamp.'
  },
  {
    question: 'How do I know if my use case is a fit?',
    answer: 'When you apply, you\'ll share your context and ideas. If we think Agent Systems Lab isn\'t the right path, we\'ll tell you honestly and suggest alternatives.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-chat-bg">
      <div className="max-w-[900px] mx-auto px-6">
        {/* Headline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-main mb-4">
            Questions about Agent Systems Lab
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#0B1020] rounded-[16px] border border-border overflow-hidden transition-all duration-200 hover:border-primary/30"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-heading font-semibold text-text-main pr-8">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-6 h-6 text-primary transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-6 pt-2">
                  <p className="text-text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
