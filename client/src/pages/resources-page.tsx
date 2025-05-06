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
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  Video,
  FileQuestion,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog";

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
}

// Sample resource data
const resources: Resource[] = [
  {
    id: 1,
    title: "What is a Parenting Plan",
    format: "video",
    category: "Parenting Plans",
    description: "Learn about what a parenting plan is and why it's important.",
    duration: "5 min",
    thumbnailUrl: "/assets/thumbnails/what-is-parenting-plan.jpg",
    url: "https://vimeo.com/824804226"
  },
  {
    id: 2,
    title: "The Truth About the Family Law System",
    format: "video",
    category: "Legal",
    description: "An overview of the family law system and what to expect.",
    duration: "8 min",
    thumbnailUrl: "/assets/thumbnails/family-law-system.jpg",
    url: "https://vimeo.com/824804226"
  },
  {
    id: 3,
    title: "Parenting Plan Template",
    format: "pdf",
    category: "Parenting Plans",
    description: "A comprehensive template for creating your own parenting plan.",
    pageCount: 24,
    url: "/documents/parenting-plan-template.pdf"
  },
  {
    id: 4,
    title: "Communication Guidelines",
    format: "article",
    category: "Communication",
    description: "Best practices for effective co-parent communication.",
    pageCount: 3,
    url: "/articles/communication-guidelines"
  },
  {
    id: 5,
    title: "Child Support Calculator",
    format: "tool",
    category: "Financial",
    description: "Calculate estimated child support based on your jurisdiction.",
    url: "/tools/child-support-calculator"
  },
  {
    id: 6,
    title: "Co-Parenting During Holidays",
    format: "article",
    category: "Holidays",
    description: "Tips for managing holidays and special occasions.",
    pageCount: 4,
    url: "/articles/coparenting-during-holidays"
  },
  {
    id: 7,
    title: "Custody Schedules Explained",
    format: "pdf",
    category: "Schedules",
    description: "Different types of custody schedules and how they work.",
    pageCount: 15,
    url: "/documents/custody-schedules.pdf"
  },
  {
    id: 8,
    title: "Mediation vs. Litigation",
    format: "video",
    category: "Legal",
    description: "Understand the differences between mediation and litigation.",
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const params = useParams();

  // Get unique categories for filter dropdown - store them directly in the array
  const uniqueCategories = resources.reduce<string[]>((acc, resource) => {
    if (!acc.includes(resource.category)) {
      acc.push(resource.category);
    }
    return acc;
  }, []);
  
  // Check if a resource ID was passed in the URL (/resources/:id)
  useEffect(() => {
    // Check if we have an ID parameter
    if (params.id) {
      const resourceId = parseInt(params.id, 10);
      if (!isNaN(resourceId)) {
        // Find the resource with matching ID
        const resource = resources.find(r => r.id === resourceId);
        if (resource) {
          setSelectedResource(resource);
          setIsDialogOpen(true);
        }
      }
    }
  }, [params.id]);
  
  // Filter resources based on selected category
  const filteredResources = selectedCategory === "all" 
    ? resources 
    : resources.filter(r => r.category === selectedCategory);

  // Filter resources by format
  const filterByFormat = (format: string) => {
    if (format === "all") {
      setSelectedCategory("all");
    } else {
      // This handles filtering by format instead of category
      setSelectedCategory(format);
    }
  };

  // Handle resource click
  const handleResourceClick = (resource: Resource) => {
    setSelectedResource(resource);
    setIsDialogOpen(true);
    
    // Update URL without navigating
    window.history.pushState({}, "", `/resources/${resource.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Menu */}
      <NavigationMenu />

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-[#2e1a87] mb-3">Resources for Your Journey</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Helpful videos, guides, and tools to support your co-parenting journey.
          </p>
        </div>

        {/* Filter controls */}
        <div className="mb-8 flex justify-end">
          <div className="w-48">
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

        {/* Resources grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((resource) => (
            <div 
              key={resource.id}
              className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-start gap-4"
              onClick={() => handleResourceClick(resource)}
            >
              {/* Thumbnail or icon */}
              <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0">
                {resource.format === "video" && resource.thumbnailUrl ? (
                  <div className="relative w-full h-full">
                    <img src={resource.thumbnailUrl} alt={resource.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
                        <Video className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    {getFormatIcon(resource.format)}
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-900">{resource.title}</h3>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <span className="font-medium mr-2">{getFormatText(resource.format)}</span>
                  {resource.duration && (
                    <span>• {resource.duration}</span>
                  )}
                  {resource.pageCount && (
                    <span>• {resource.pageCount} pages</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{resource.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Resource Viewer Dialog */}
        <Dialog 
          open={isDialogOpen} 
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              // When closing, update URL back to base resources page
              window.history.pushState({}, "", "/resources");
            }
          }}
        >
          <DialogContent className="max-w-4xl">
            {selectedResource && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl text-[#2e1a87]">{selectedResource.title}</DialogTitle>
                  <DialogDescription>
                    <div className="flex items-center mt-1">
                      <span className="font-medium mr-2">{getFormatText(selectedResource.format)}</span>
                      {selectedResource.duration && (
                        <span>• {selectedResource.duration}</span>
                      )}
                      {selectedResource.pageCount && (
                        <span>• {selectedResource.pageCount} pages</span>
                      )}
                    </div>
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-4">
                  <p className="text-gray-700 mb-6">{selectedResource.description}</p>
                  
                  {selectedResource.format === "video" && (
                    <div className="aspect-video bg-gray-100 rounded-md overflow-hidden mb-4">
                      <iframe 
                        src={`${selectedResource.url}?autoplay=0&title=0&byline=0&portrait=0`} 
                        className="w-full h-full" 
                        frameBorder="0" 
                        allow="autoplay; fullscreen" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  
                  {selectedResource.format === "pdf" && (
                    <div className="mb-4">
                      <Button className="flex items-center bg-[#2e1a87] hover:bg-[#25156d]">
                        <FileText className="mr-2 h-4 w-4" />
                        View PDF
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  
                  {selectedResource.format === "article" && (
                    <div className="prose max-w-none">
                      <p>This is a sample article content. In a real implementation, this would display the full article text.</p>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
                    </div>
                  )}
                  
                  {selectedResource.format === "tool" && (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-center text-gray-600 mb-4">Interactive tool would be embedded here.</p>
                      <Button className="w-full flex items-center justify-center bg-[#2e1a87] hover:bg-[#25156d]">
                        Launch Tool
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Related Resources</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {resources
                      .filter(r => r.category === selectedResource.category && r.id !== selectedResource.id)
                      .slice(0, 2)
                      .map(r => (
                        <div 
                          key={r.id} 
                          className="flex items-center gap-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                          onClick={() => {
                            setSelectedResource(r);
                            window.history.pushState({}, "", `/resources/${r.id}`);
                          }}
                        >
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            {getFormatIcon(r.format)}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{r.title}</p>
                            <p className="text-xs text-gray-500">{getFormatText(r.format)}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}