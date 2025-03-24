import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Instructions = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md">
        <AccordionItem value="instructions">
          <AccordionTrigger className="px-4 py-3 text-gray-800 hover:text-indigo-600">
            How to Play
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 text-gray-600">
            <ol className="list-decimal list-inside space-y-2">
              <li>Click on a tile adjacent to the empty space to move it.</li>
              <li>Rearrange the numbers to match the sequence <strong>80135606</strong>.</li>
              <li>The empty space should be in the bottom-right corner when finished.</li>
              <li>Try to complete the puzzle in as few moves as possible.</li>
              <li>Use the Reset button to start over with a new shuffled board.</li>
            </ol>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Instructions;
