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
        <h3 className="text-gray-800 dark:text-white/70 text-lg font-medium">{question}</h3>
        <span className="text-gray-600 dark:text-white/70 text-2xl">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      
      {isOpen && answer && (
        <div className="mt-2 text-gray-600 dark:text-white/50">
          {answer}
        </div>
      )}
    </div>
  );
} 