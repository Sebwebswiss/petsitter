import { useEffect, useRef, useState } from "react";

type FAQ = {
  question: string;
  answer: string | { text: string; plans: { name: string; description: string }[] };
};

const FAQItem: React.FC<{ faq: FAQ; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | number>(0);

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current?.scrollHeight || 'auto');
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div>
      <button
        className="w-full text-left py-4 flex justify-between items-center focus:outline-none border-b text-white"
        onClick={onClick}
      >
        <span className="text-xl font-semibold font-heading">{faq.question}</span>
        <span>{isOpen ? '▴' : '▾'}</span>
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-all duration-500 ease-in-out"
      >
        <div className="text-white text-lg font-body py-5">
          {typeof faq.answer === 'string' ? (
            <p>{faq.answer}</p>
          ) : (
            <>
              <p>{faq.answer.text}</p>
              <ul className="list-disc pl-5">
                {faq.answer.plans.map((plan, index) => (
                  <li key={index} className="mb-2">
                    <strong>{plan.name}:</strong> {plan.description}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
