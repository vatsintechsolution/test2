interface FAQItemProps {
  question: string;
  answer?: string;
  isOpen: boolean;
  onClick: () => void;
}

export function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div 
      className={`
        flex flex-col overflow-hidden justify-center items-center px-5 py-4 mt-3 w-full leading-5 
        rounded-xl border border-solid 
        border-gray-200 dark:border-white/10
        min-h-[72px] 
        text-gray-800 dark:text-white/80
        ${isOpen ? 'bg-gray-100 dark:bg-white/10' : 'bg-white dark:bg-transparent'}
        transition-colors
      `}
    >
      <button 
        onClick={onClick}
        className="flex justify-between items-center w-full text-left"
      >
        <h3 className="text-[#3C3A53] dark:text-white/80 text-base ">{question}</h3>
        <span className="text-[#3C3A53] dark:text-white/80 text-2xl">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      
      {isOpen && answer && (
        <div 
          className="mt-4 text-gray-600 dark:text-white/50 w-full faq-content"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      )}

      <style jsx global>{`
        .faq-content ul, .faq-content ol {
          list-style-position: inside;
          margin: 0.5rem 0;
          padding-left: 1rem;
        }
        
        .faq-content ul li {
          list-style-type: disc;
          margin-bottom: 0.25rem;
        }
        
        .faq-content ol li {
          list-style-type: decimal;
          margin-bottom: 0.25rem;
        }
        
        .faq-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        
        .faq-content table th,
        .faq-content table td {
          border: 1px solid #ddd;
          padding: 0.5rem;
          text-align: left;
        }
        
        .faq-content table th {
          background-color: #f5f5f5;
          font-weight: 600;
        }
        
        .dark .faq-content table th {
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .dark .faq-content table th,
        .dark .faq-content table td {
          border-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
} 