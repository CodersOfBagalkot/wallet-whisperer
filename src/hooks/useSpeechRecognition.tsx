import { useState, useRef, useCallback } from "react";

interface SpeechResult {
  transcript: string;
  amount?: string;
  description?: string;
  category?: string;
}

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<any>(null);

  const isSupported = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  const parseExpense = useCallback((text: string): SpeechResult => {
    const result: SpeechResult = { transcript: text };

    // Extract amount - look for numbers with optional currency
    const amountMatch = text.match(/(\d+(?:\.\d+)?)/);
    if (amountMatch) result.amount = amountMatch[1];

    // Extract category keywords
    const lower = text.toLowerCase();
    const categoryMap: Record<string, string> = {
      food: "food", eat: "food", snack: "food", breakfast: "food", lunch: "food", dinner: "food",
      grocery: "grocery", groceries: "grocery", supermarket: "grocery",
      travel: "travel", trip: "travel", flight: "travel", train: "travel", bus: "travel",
      shop: "shopping", shopping: "shopping", buy: "shopping", bought: "shopping", purchase: "shopping",
      dining: "dining", restaurant: "dining", cafe: "dining", coffee: "dining",
      movie: "movie", film: "movie", cinema: "movie", theater: "movie",
      bill: "bills", bills: "bills", electricity: "bills", rent: "bills", wifi: "bills", internet: "bills",
      transport: "transport", taxi: "transport", uber: "transport", cab: "transport", fuel: "transport", petrol: "transport",
    };

    for (const [keyword, cat] of Object.entries(categoryMap)) {
      if (lower.includes(keyword)) {
        result.category = cat;
        break;
      }
    }

    // Description is the full transcript minus the amount
    result.description = text.replace(/\d+(?:\.\d+)?/, "").replace(/rupees?|rs\.?|₹|\$/gi, "").trim();

    return result;
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const current = event.results[event.results.length - 1];
      setTranscript(current[0].transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [isSupported]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return { isListening, transcript, isSupported, startListening, stopListening, parseExpense };
};
