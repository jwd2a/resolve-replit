import { FC } from "react";

interface Consideration {
  title: string;
  icon: string;
  description: string;
}

interface ContentSectionProps {
  title: string;
  content: string;
  processList?: string[];
  considerations?: Consideration[];
}

const IconMap: Record<string, string> = {
  "puzzle-piece": "M3.5 5.5c-.828 0-1.5-.672-1.5-1.5S2.672 2.5 3.5 2.5 5 3.172 5 4s-.672 1.5-1.5 1.5zm3.5 3c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1zm3.5-3c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm3.5 3c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1zm-4-11C8.01 0 7 1.01 7 2.25v2.586c0 .207-.074.398-.213.537l-1.48 1.48A.97.97 0 0 1 4.77 7H2.25C1.01 7 0 8.01 0 9.25s1.01 2.25 2.25 2.25H3v1.543c0 .232-.082.45-.248.614L1.5 14.911A.61.61 0 0 0 1.5 16a.61.61 0 0 0 .854 0l1.106-1.106c.62-.62.947-1.452.947-2.32v-1.076h1.5c.464 0 .909-.184 1.237-.513l1.414-1.414A.25.25 0 0 1 8.735 9.4h2.596c.32 0 .632-.098.893-.282l1.473-1.037c.249-.176.42-.446.467-.744A2.25 2.25 0 0 0 16 5V2.25C16 1.01 14.99 0 13.75 0H10zm-6.5 14a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5zm0-4a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5zm3-2.5a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5zm7 6.5a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5zm0-4a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5zm0-4a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5z",
  "tachometer-alt": "M8 5a1 1 0 110-2 1 1 0 010 2zm-4.737 5.828a5 5 0 017.574-6.566 5 5 0 01.9 7.082l2.83 2.83a1 1 0 11-1.414 1.414l-2.83-2.83a5 5 0 01-7.072-.918l.012-.012zM8 16A8 8 0 108 0a8 8 0 000 16zm3.778-3.535a6 6 0 10-8.243-8.243 6 6 0 008.243 8.243z",
  "shield-alt": "M8 0l-.644.058C3.883.466.604 1.85.17 5.985c-.422 4.018 2.894 7.085 7.103 9.907L8 16l.727-.11c4.209-2.82 7.525-5.886 7.103-9.907C15.396 1.85 12.117.466 8.644.058L8 0zm0 6.5l2.5 2.5-2.5 2.5-2.5-2.5L8 6.5zM8 1c3 0 5.5 1 5.9 4.5.3 3-2.3 5.5-5.9 8-3.6-2.5-6.2-5-5.9-8C2.5 2 5 1 8 1z",
  "universal-access": "M8 0C3.519 0 0 3.519 0 8s3.519 8 8 8 8-3.519 8-8-3.519-8-8-8zm0 1c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.14-7-7 3.14-7 7-7zM8 3a1 1 0 00-1 1 1 1 0 001 1 1 1 0 001-1 1 1 0 00-1-1zM4.5 7.5c.04-1.761 1.521-3.25 3.25-3.5h.5c1.729.25 3.21 1.739 3.25 3.5h1c-.04-2.341-1.947-4.25-4.25-4.5h-.5c-2.303.25-4.21 2.159-4.25 4.5h1zM8 13c1.867 0 2.977-1.6 3.22-3h-6.44c.243 1.4 1.353 3 3.22 3zm-3.5-4h7a3.52 3.52 0 01-.437 1.5h-6.125A3.52 3.52 0 014.5 9z"
};

const ContentSection: FC<ContentSectionProps> = ({
  title,
  content,
  processList,
  considerations
}) => {
  const renderIcon = (iconName: string) => {
    const svgPath = IconMap[iconName] || "";
    
    return (
      <svg className="h-4 w-4 text-blue-500 mr-2" viewBox="0 0 16 16" fill="currentColor">
        <path d={svgPath} />
      </svg>
    );
  };
  
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-300 mb-4">{content}</p>
      
      {processList && processList.length > 0 && (
        <div className="bg-dark-400 border border-gray-700 rounded-lg mb-6">
          <div className="p-4 border-b border-gray-700">
            <h3 className="font-medium text-lg">The Implementation Process</h3>
          </div>
          <div className="p-4">
            <ol className="list-decimal pl-5 space-y-2">
              {processList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
      
      {considerations && considerations.length > 0 && (
        <>
          <h3 className="text-lg font-medium mb-3">Key Considerations</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {considerations.map((consideration, index) => (
              <div key={index} className="bg-dark-300 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  {renderIcon(consideration.icon)}
                  <h4 className="font-medium">{consideration.title}</h4>
                </div>
                <p className="text-sm text-gray-400">
                  {consideration.description}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ContentSection;
