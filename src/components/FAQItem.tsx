interface FAQItemProps {
  question: string;
  answer?: string;
  isOpen: boolean;
  onClick: () => void;
}

export function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className={`flex flex-col overflow-hidden justify-center items-center px-5 py-4 mt-3 w-full leading-5 rounded-xl border border-solid border-white border-opacity-10 min-h-[72px] text-white text-opacity-80 ${isOpen ? 'bg-white bg-opacity-10' : ''}`}>
      <button 
        onClick={onClick}
        className="flex justify-between items-center w-full text-left"
      >
        <h3 className="text-white/70 text-lg">{question}</h3>
        <span className="text-white/70 text-2xl">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      
      {isOpen && answer && (
        <div className="mt-2 text-white/50">
          {answer}
        </div>
      )}
    </div>
  );
} 