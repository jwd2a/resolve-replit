import { FC, useState } from "react";
import { Copy } from "lucide-react";
import { Toast, useToast } from "@/hooks/use-toast";

interface CodeExampleProps {
  title: string;
  description: string;
  filename: string;
  code: string;
}

const CodeExample: FC<CodeExampleProps> = ({
  title,
  description,
  filename,
  code
}) => {
  const { toast } = useToast();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: `${filename} has been copied to your clipboard.`,
          duration: 2000,
        });
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        toast({
          variant: "destructive",
          title: "Failed to copy",
          description: "Could not copy the code to clipboard.",
          duration: 2000,
        });
      });
  };
  
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-300 mb-4">{description}</p>
      
      <div className="bg-dark-400 border border-gray-700 rounded-lg overflow-hidden">
        <div className="px-4 py-2 bg-dark-900 border-b border-gray-700 flex justify-between items-center">
          <div className="font-mono text-sm">{filename}</div>
          <div className="flex space-x-2">
            <button 
              className="text-xs text-gray-400 hover:text-white"
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
        <pre className="p-4 font-mono text-sm overflow-x-auto text-gray-300">
          {code}
        </pre>
      </div>
    </section>
  );
};

export default CodeExample;
