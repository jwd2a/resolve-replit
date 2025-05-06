import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "wouter";
import { NavigationMenu } from "@/components/NavigationMenu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  FileText,
  Video,
  FileQuestion,
  ExternalLink,
  ChevronRight,
  Filter,
  Play,
  Menu,
  Info,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Define resource types
type ResourceFormat = "video" | "pdf" | "article" | "tool";

interface Resource {
  id: number;
  title: string;
  format: ResourceFormat;
  category: string;
  description: string;
  duration?: string; // For videos
  pageCount?: number; // For PDFs/articles
  thumbnailUrl?: string;
  url: string;
  content?: string; // For articles
}

// Sample resource data
const resources: Resource[] = [
  {
    id: 1,
    title: "What is a Parenting Plan",
    format: "video",
    category: "Parenting Plans",
    description: "Learn about what a parenting plan is and why it's important. A parenting plan outlines how parents will continue to care for their children after separation or divorce. It covers various responsibilities including where children live, how decisions about them are made, and how they will communicate with each parent.",
    duration: "5 min",
    thumbnailUrl: "/assets/thumbnails/what-is-parenting-plan.jpg",
    url: "https://vimeo.com/824804226"
  },
  {
    id: 2,
    title: "The Truth About the Family Law System",
    format: "video",
    category: "Legal",
    description: "An overview of the family law system and what to expect. This video provides a comprehensive overview of how family courts work, what factors are considered in parenting decisions, and how to effectively navigate the legal process while keeping children's interests at the center.",
    duration: "8 min",
    thumbnailUrl: "/assets/thumbnails/family-law-system.jpg",
    url: "https://vimeo.com/824804226"
  },
  {
    id: 3,
    title: "Parenting Plan Template",
    format: "pdf",
    category: "Parenting Plans",
    description: "A comprehensive template for creating your own parenting plan. This template covers all essential aspects of co-parenting arrangements including custody schedules, decision-making authority, holiday planning, communication methods, and financial responsibilities. Customize to fit your family's unique needs.",
    pageCount: 24,
    url: "/documents/parenting-plan-template.pdf"
  },
  {
    id: 4,
    title: "Communication Guidelines",
    format: "article",
    category: "Communication",
    description: "Best practices for effective co-parent communication. Learn strategies to maintain clear, child-focused discussions, avoid conflicts, and create healthy boundaries. These guidelines help establish respectful communication patterns that benefit everyone, especially your children.",
    pageCount: 3,
    url: "/articles/communication-guidelines",
    content: "## Effective Co-Parenting Communication\n\nCommunication between co-parents is the foundation of successful shared parenting. These guidelines will help you establish healthy patterns that benefit your children and reduce conflict.\n\n### 1. Keep conversations child-focused\n\nWhen communicating with your co-parent, center conversations around your children's needs, activities, and well-being. Avoid bringing up past relationship issues or personal grievances.\n\n### 2. Use a business-like tone\n\nTreat co-parenting communications like professional exchanges. Be courteous, concise, and factual. This helps maintain emotional boundaries and reduces the chance of conflict.\n\n### 3. Establish regular check-ins\n\nSchedule consistent times to discuss parenting matters, whether weekly or monthly. This creates predictability and ensures important topics aren't overlooked.\n\n### 4. Choose appropriate communication channels\n\nDetermine which method works best for different types of communication:\n- Email: For non-urgent, detailed information\n- Text: For brief, time-sensitive updates\n- Phone calls: For complex discussions that need immediate attention\n- Co-parenting apps: For scheduling, expense tracking, and documented communications\n\n### 5. Practice active listening\n\nWhen discussing matters with your co-parent, listen to understand rather than to respond. Ask clarifying questions and acknowledge their perspective, even when you disagree.\n\n### 6. Take a timeout when needed\n\nIf communications become heated, it's okay to politely end the conversation and resume when emotions have settled. You might say, \"I want to give this the attention it deserves. Let's continue this discussion tomorrow.\"\n\n### 7. Document important agreements\n\nAfter making decisions together, send a follow-up summary to confirm your shared understanding and keep a record for future reference.\n\nRemember, effective communication takes practice. By consistently applying these principles, you'll create a healthier co-parenting relationship that benefits your children's development and emotional well-being."
  },
  {
    id: 5,
    title: "Child Support Calculator",
    format: "tool",
    category: "Financial",
    description: "Calculate estimated child support based on your jurisdiction. This interactive tool helps parents understand potential financial obligations based on income, parenting time, and other relevant factors that courts consider when determining child support amounts.",
    url: "/tools/child-support-calculator"
  },
  {
    id: 6,
    title: "Co-Parenting During Holidays",
    format: "article",
    category: "Holidays",
    description: "Tips for managing holidays and special occasions. Learn how to create meaningful celebrations for your children while navigating the complexities of shared parenting time during special events. This guide offers practical solutions for reducing stress and maximizing joy during these important moments.",
    pageCount: 4,
    url: "/articles/coparenting-during-holidays",
    content: "## Co-Parenting Through Holidays and Special Occasions\n\nHolidays and special occasions can be emotionally challenging when co-parenting, but with thoughtful planning, they can still be joyful and meaningful for everyone involved.\n\n### Planning Ahead\n\nThe key to successful holiday co-parenting is early, detailed planning:\n\n1. **Start discussions early** - Begin holiday conversations at least 1-2 months in advance\n2. **Document agreements** - Put all arrangements in writing to avoid misunderstandings\n3. **Be specific about times** - Clearly define pick-up and drop-off times and locations\n4. **Consider alternating or splitting** - Many families alternate years for major holidays or split the day\n\n### Creating New Traditions\n\nEmbracing change can lead to meaningful new experiences:\n\n- Create new traditions that work within your co-parenting schedule\n- Focus on quality over quantity of time\n- Consider celebrating holidays on alternate dates when necessary\n- Incorporate elements from both households into celebrations\n\n### Managing Emotions\n\nHolidays can intensify feelings for both parents and children:\n\n- Acknowledge that the first few years may be difficult as everyone adjusts\n- Process your own emotions separately from your children\n- Give children permission to enjoy time with both parents\n- Remember that what matters most is that children feel loved and secure\n\n### Communication with Children\n\nClear, positive communication helps children navigate holiday transitions:\n\n- Present the holiday schedule positively and matter-of-factly\n- Avoid making children feel responsible for your happiness\n- Help them prepare for transitions between homes\n- Encourage them to enjoy their time with each parent\n\n### Extended Family Considerations\n\nManaging wider family expectations requires diplomacy:\n\n- Communicate the co-parenting schedule to extended family early\n- Set boundaries when needed about new partners at family gatherings\n- Consider inclusive events when appropriate and comfortable\n- Help grandparents and other relatives understand how to support your children\n\nRemember that the goal is creating positive memories for your children, even if the holidays look different than before. With time, new traditions and arrangements will become familiar, and the focus can remain where it belongs—on celebrating special moments with your children."
  },
  {
    id: 7,
    title: "Custody Schedules Explained",
    format: "pdf",
    category: "Schedules",
    description: "Different types of custody schedules and how they work. This comprehensive guide explains various parenting time arrangements from 50/50 splits to more traditional visitation schedules. It outlines the pros and cons of each approach and helps parents identify which options might best suit their children's needs and family circumstances.",
    pageCount: 15,
    url: "/documents/custody-schedules.pdf"
  },
  {
    id: 8,
    title: "Mediation vs. Litigation",
    format: "video",
    category: "Legal",
    description: "Understand the differences between mediation and litigation. This video compares these two approaches to resolving family disputes, examining the process, costs, timeline, and emotional impact of each option. Learn how to determine which path might be right for your family's specific situation.",
    duration: "10 min",
    thumbnailUrl: "/assets/thumbnails/mediation-litigation.jpg",
    url: "https://vimeo.com/824804226"
  }
];

// Format icon mapping
const getFormatIcon = (format: ResourceFormat) => {
  switch (format) {
    case "video":
      return <Video className="h-5 w-5 text-blue-500" />;
    case "pdf":
      return <FileText className="h-5 w-5 text-red-500" />;
    case "article":
      return <FileText className="h-5 w-5 text-green-500" />;
    case "tool":
      return <FileQuestion className="h-5 w-5 text-purple-500" />;
    default:
      return <FileText className="h-5 w-5 text-gray-500" />;
  }
};

// Format text mapping
const getFormatText = (format: ResourceFormat) => {
  switch (format) {
    case "video":
      return "Video";
    case "pdf":
      return "PDF";
    case "article":
      return "Article";
    case "tool":
      return "Tool";
    default:
      return "Resource";
  }
};

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const params = useParams();
  
  // Filter resources based on selected category
  const filteredResources = selectedCategory === "all" 
    ? resources 
    : resources.filter(r => r.category === selectedCategory || r.format === selectedCategory);

  // Handle resource click in sidebar
  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
    
    // Update URL without navigating
    window.history.pushState({}, "", `/resources/${resource.id}`);
    
    // On mobile, close the menu after selection
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  // Load a resource based on URL parameter or default to first resource
  useEffect(() => {
    if (params.id) {
      // If we have an ID in the URL, try to find that resource
      const resourceId = parseInt(params.id, 10);
      if (!isNaN(resourceId)) {
        const resource = resources.find(r => r.id === resourceId);
        if (resource) {
          setSelectedResource(resource);
          return;
        }
      }
    }
    
    // If no valid ID in URL or no resource found, default to first resource
    if (filteredResources.length > 0 && !selectedResource) {
      setSelectedResource(filteredResources[0]);
    }
  }, [params.id, filteredResources]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Menu */}
      <NavigationMenu />

      {/* Page header - visible on all screens */}
      <div className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#2e1a87]">Resources for Your Journey</h1>
          
          {/* Mobile menu toggle */}
          <button 
            className="md:hidden flex items-center text-gray-600 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          
          {/* Category filter - desktop only */}
          <div className="hidden md:block w-48">
            <Select
              value={selectedCategory}
              onValueChange={value => setSelectedCategory(value)}
            >
              <SelectTrigger className="bg-white">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-[#2e1a87]" />
                  <SelectValue placeholder="Filter by category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="pdf">PDFs</SelectItem>
                <SelectItem value="article">Articles</SelectItem>
                <SelectItem value="tool">Tools</SelectItem>
                
                <SelectItem value="Parenting Plans">Parenting Plans</SelectItem>
                <SelectItem value="Legal">Legal</SelectItem>
                <SelectItem value="Communication">Communication</SelectItem>
                <SelectItem value="Financial">Financial</SelectItem>
                <SelectItem value="Holidays">Holidays</SelectItem>
                <SelectItem value="Schedules">Schedules</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main two-column layout */}
      <div className="max-w-7xl mx-auto pt-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Mobile category filter - visible only on small screens */}
          <div className="md:hidden mb-4 w-full">
            <Select
              value={selectedCategory}
              onValueChange={value => setSelectedCategory(value)}
            >
              <SelectTrigger className="bg-white w-full">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-[#2e1a87]" />
                  <SelectValue placeholder="Filter by category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="pdf">PDFs</SelectItem>
                <SelectItem value="article">Articles</SelectItem>
                <SelectItem value="tool">Tools</SelectItem>
                
                <SelectItem value="Parenting Plans">Parenting Plans</SelectItem>
                <SelectItem value="Legal">Legal</SelectItem>
                <SelectItem value="Communication">Communication</SelectItem>
                <SelectItem value="Financial">Financial</SelectItem>
                <SelectItem value="Holidays">Holidays</SelectItem>
                <SelectItem value="Schedules">Schedules</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Left sidebar - Resource list */}
          <div 
            className={cn(
              "md:w-[280px] flex-shrink-0 bg-white rounded-lg border border-gray-200 overflow-hidden",
              "transition-all duration-300 ease-in-out",
              "md:block md:sticky md:top-4 md:max-h-[calc(100vh-8rem)]", // Desktop: sticky position
              menuOpen ? "block" : "hidden" // Mobile: controlled by menu state
            )}
          >
            {/* Resources list with overflow scroll */}
            <div className="md:max-h-[calc(100vh-8rem)] overflow-y-auto">
              {filteredResources.map((resource) => (
                <div 
                  key={resource.id}
                  className={cn(
                    "p-4 cursor-pointer flex items-start gap-3 border-b border-gray-100",
                    selectedResource?.id === resource.id 
                      ? "bg-indigo-50 border-l-4 border-l-[#2e1a87]" 
                      : "hover:bg-gray-50 border-l-4 border-l-transparent"
                  )}
                  onClick={() => handleResourceClick(resource)}
                >
                  {/* Icon */}
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {resource.format === "video" ? (
                      <Video className="h-4 w-4 text-blue-500" />
                    ) : resource.format === "pdf" ? (
                      <FileText className="h-4 w-4 text-red-500" />
                    ) : resource.format === "article" ? (
                      <FileText className="h-4 w-4 text-green-500" />
                    ) : (
                      <FileQuestion className="h-4 w-4 text-purple-500" />
                    )}
                  </div>
                  
                  {/* Title and metadata */}
                  <div className="flex-1 min-w-0">
                    <h3 className={cn(
                      "font-medium text-sm line-clamp-2",
                      selectedResource?.id === resource.id ? "text-[#2e1a87]" : "text-gray-900"
                    )}>
                      {resource.title}
                    </h3>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span>{getFormatText(resource.format)}</span>
                      {resource.duration && (
                        <span className="ml-1">• {resource.duration}</span>
                      )}
                      {resource.pageCount && (
                        <span className="ml-1">• {resource.pageCount} pages</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right content area - Selected resource view */}
          <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
            {selectedResource ? (
              <div>
                {/* Resource header */}
                <div className="mb-6 border-b border-gray-200 pb-4">
                  <h2 className="text-xl font-bold text-[#2e1a87] mb-2">{selectedResource.title}</h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="flex items-center mr-4">
                      {getFormatIcon(selectedResource.format)}
                      <span className="ml-1 font-medium">{getFormatText(selectedResource.format)}</span>
                    </div>
                    {selectedResource.duration && (
                      <span className="mr-4">{selectedResource.duration}</span>
                    )}
                    {selectedResource.pageCount && (
                      <span className="mr-4">{selectedResource.pageCount} pages</span>
                    )}
                    <span className="text-gray-500">{selectedResource.category}</span>
                  </div>
                </div>
                
                {/* Resource content */}
                <div>
                  <p className="text-gray-700 mb-6">{selectedResource.description}</p>
                  
                  {/* Video player */}
                  {selectedResource.format === "video" && (
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-6">
                      <iframe 
                        src={`${selectedResource.url}?autoplay=0&title=0&byline=0&portrait=0`} 
                        className="w-full h-full" 
                        frameBorder="0" 
                        allow="autoplay; fullscreen" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  
                  {/* PDF viewer */}
                  {selectedResource.format === "pdf" && (
                    <div className="mb-6">
                      <div className="bg-gray-50 rounded-lg p-8 mb-4 flex items-center justify-center border border-gray-200">
                        <div className="text-center">
                          <FileText className="h-12 w-12 text-red-500 mx-auto mb-2" />
                          <h3 className="text-lg font-medium text-gray-900">{selectedResource.title}</h3>
                          <p className="text-sm text-gray-500 mb-4">{selectedResource.pageCount} pages • PDF document</p>
                          <Button className="flex items-center bg-[#2e1a87] hover:bg-[#25156d]">
                            <FileText className="mr-2 h-4 w-4" />
                            View PDF
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Article content */}
                  {selectedResource.format === "article" && (
                    <div className="prose max-w-none">
                      {selectedResource.content ? (
                        <div dangerouslySetInnerHTML={{ 
                          __html: selectedResource.content
                            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                            .replace(/\*(.*)\*/gim, '<em>$1</em>')
                            .replace(/\n/gim, '<br />') 
                        }} />
                      ) : (
                        <p>This is a sample article content. In a real implementation, this would display the full article text.</p>
                      )}
                    </div>
                  )}
                  
                  {/* Tool embed */}
                  {selectedResource.format === "tool" && (
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="text-center">
                        <FileQuestion className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Tool</h3>
                        <p className="text-gray-600 mb-6">This interactive tool would be embedded here in a production environment.</p>
                        <Button className="flex items-center justify-center bg-[#2e1a87] hover:bg-[#25156d]">
                          Launch Tool
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Related resources */}
                  <div className="mt-10">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Related Resources</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {resources
                        .filter(r => r.category === selectedResource.category && r.id !== selectedResource.id)
                        .slice(0, 2)
                        .map(r => (
                          <div 
                            key={r.id} 
                            className="flex items-center gap-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                            onClick={() => handleResourceClick(r)}
                          >
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                              {getFormatIcon(r.format)}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{r.title}</p>
                              <div className="flex items-center text-xs text-gray-500">
                                <span>{getFormatText(r.format)}</span>
                                {r.duration && <span className="ml-1">• {r.duration}</span>}
                                {r.pageCount && <span className="ml-1">• {r.pageCount} pages</span>}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Info className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Select a resource</h3>
                <p className="text-gray-500 max-w-md">
                  Choose a resource from the list to view its content.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}