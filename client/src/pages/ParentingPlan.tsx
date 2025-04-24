import { useState } from "react";
import { Printer, Edit2, CheckCircle2, Circle, HelpCircle, Send, Share2, Download, AlertTriangle, History, FileText, X } from "lucide-react";
import Header from "@/components/Header";
import { useMobileMenu } from "@/hooks/useMobileMenu";

export default function ParentingPlan() {
  const { openMenu } = useMobileMenu();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeSectionTitle, setActiveSectionTitle] = useState<string>("");
  const [activeSectionContent, setActiveSectionContent] = useState<string>("");
  const [aiMessage, setAiMessage] = useState<string>("");
  const [userMessage, setUserMessage] = useState<string>("");
  const [aiSuggestion, setAiSuggestion] = useState<string>("");
  const [showProposalOption, setShowProposalOption] = useState<boolean>(false);
  // Enhanced version history with timestamps
  const [sectionVersions, setSectionVersions] = useState<Record<string, Array<{
    content: string;
    timestamp: Date;
    author: string;
    note?: string;
  }>>>({});
  
  const [showVersionHistory, setShowVersionHistory] = useState<boolean>(false);
  const [selectedVersionIndex, setSelectedVersionIndex] = useState<number | null>(null);
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [compareVersionIndex, setCompareVersionIndex] = useState<number | null>(null);

  // Mock data for parent information
  const parents = {
    mother: {
      name: "Elizabeth Maria Elliot",
      address: "123 Main Street, Orlando, FL 32801",
      phone: "(407) 555-1234",
      email: "elizabeth@example.com",
      initials: "EME"
    },
    father: {
      name: "Christopher James Frazer",
      address: "456 Oak Avenue, Orlando, FL 32802",
      phone: "(407) 555-5678",
      email: "chris@example.com",
      initials: "CJF"
    }
  };

  // Mock data for children
  const children = [
    { name: "Olivia Grace Frazer", dateOfBirth: "05/12/2015", gender: "Female" },
    { name: "Noah James Frazer", dateOfBirth: "07/18/2017", gender: "Male" }
  ];

  // Status of section completion (which sections have both parents' initials)
  const [sectionStatus, setSectionStatus] = useState({
    "section-1": { mother: true, father: true },
    "section-2": { mother: true, father: true },
    "section-3": { mother: true, father: true },
    "section-4a": { mother: true, father: true },
    "section-4b": { mother: true, father: false },
    "section-4c": { mother: true, father: true },
    "section-4d": { mother: true, father: false },
    "section-5a": { mother: true, father: true },
  });

  const getSectionStatus = (sectionId: string) => {
    const status = sectionStatus[sectionId as keyof typeof sectionStatus];
    if (!status) {
      return {
        icon: <Circle className="h-4 w-4 text-gray-300" />,
        label: "Not Started",
        color: "text-gray-500",
        badge: "bg-gray-100 text-gray-500",
        hasProposedChanges: false,
        missingInitials: false
      };
    }
    
    // Check if there are proposed changes (assuming the most recent version is not the initial one)
    const hasProposedChanges = sectionVersions[sectionId] && sectionVersions[sectionId].length > 1;
    
    // Missing initials when one parent has initialed but the other hasn't
    const missingInitials = (status.mother && !status.father) || (!status.mother && status.father);
    
    if (status.mother && status.father) {
      return {
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
        label: "Approved",
        color: "text-green-600",
        badge: "bg-green-50 text-green-600",
        hasProposedChanges,
        missingInitials: false
      };
    } else if (hasProposedChanges) {
      return {
        icon: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
        label: "Needs Review",
        color: "text-yellow-600",
        badge: "bg-yellow-50 text-yellow-600",
        hasProposedChanges,
        missingInitials
      };
    } else if (missingInitials) {
      return {
        icon: <AlertTriangle className="h-4 w-4 text-red-400" />,
        label: "Missing Initials",
        color: "text-red-500",
        badge: "missing-initials-alert",
        hasProposedChanges: false,
        missingInitials: true
      };
    } else {
      return {
        icon: <Circle className="h-4 w-4 text-gray-300" />,
        label: "Not Approved",
        color: "text-gray-500", 
        badge: "bg-gray-100 text-gray-500",
        hasProposedChanges: false,
        missingInitials: false
      };
    }
  };

  // Mock section content storage
  const [sectionContents, setSectionContents] = useState<Record<string, string>>({
    "section-3": "The United States is the country of habitual residence of the child(ren). The State of Florida is the child(ren)'s home state for the purposes of the Uniform Child Custody Jurisdiction and Enforcement Act. This document is intended to be the basis of a child custody determination for the purposes of the Uniform Child Custody Jurisdiction and Enforcement Act, the International Child Abduction Remedies Act, 42 U.S.C. Sections 11601 et seq., the Parental Kidnapping Prevention Act, and the Convention on the Civil Aspects of International Child Abduction.",
    "section-4a": "We are going to make decisions about our children as co-parents, together, and always with our child(ren)'s best interests as the most important guiding concern. These decisions include all important decisions affecting the welfare of our child(ren), such as decisions about the child(ren)'s education, healthcare, mental health and life-enriching activities. Neither of us will have a superior right or authority when it comes to co-parenting our children. We will treat each other with respect and cooperate in an effort to raise our child(ren) in the most loving, caring environment possible.",
    "section-4b": "If we are ever unable to resolve a disagreement then we will immediately seek professional advice from the most qualified person that is reasonably available to us. This could be a doctor, educator, mental health professional, or someone else that can assist us in properly and diligently considering all of the information that is relevant to any decision. We will try to always keep open minds and respect each other, even when we disagree.",
    "section-4c": "Nothing here is intended to interfere with our respective rights to make decisions regarding the day-to-day care and control of our child(ren) while the child(ren) are with us. Similarly, we both are allowed to make emergency decisions affecting the health or safety of the child(ren) if such a decision is ever necessary. If there is ever such an emergency, then we both commit to notify each other of the situation as soon as reasonably possible.",
    "section-4d": "We agree that extracurricular activities are very important for the development of our child(ren) in many respects. We will discuss all proposed extracurricular activities with each other, and these are the things we agree are important to consider: The child's preference, Geography, Practicality of schedule, Cost, Required Equipment, Academic performance, Travel schedule, and Other factors as they arise.",
    "section-5a": "We will exchange any school and extracurricular activity calendars as soon as we are able to after receiving them. We both acknowledge how important it is for us both to understand our child(ren)'s schedules. We are going to follow the dates set forth on our child(ren)'s school calendars when it comes to understanding academic breaks from school. We agree that some flexibility will be required of both of us and that it is very important that we show each other respect both in asking for flexibility and in granting flexibility. We also understand that maintaining a routine is the best possible thing for our child(ren), so we will each do our best to avoid asking for schedule changes on a regular basis just to accommodate our own personal needs."
  });

  const extractSectionContent = (sectionId: string) => {
    return sectionContents[sectionId] || "";
  };

  const handleSectionClick = (sectionId: string, title: string) => {
    setActiveSection(sectionId);
    setActiveSectionTitle(title);
    const content = extractSectionContent(sectionId);
    setActiveSectionContent(content);
    
    // Reset the AI interaction state
    setAiMessage("What modifications would you like to make to this section?");
    setUserMessage("");
    setAiSuggestion("");
    setShowProposalOption(false);
    setSelectedVersionIndex(null);
    setCompareMode(false);
    setCompareVersionIndex(null);
    
    // Initialize version history if it doesn't exist
    if (!sectionVersions[sectionId] || sectionVersions[sectionId]?.length === 0) {
      const initialVersion = {
        content,
        timestamp: new Date(),
        author: "System",
        note: "Original version"
      };

      setSectionVersions(prev => {
        // Create a new object to trigger React to recognize the change
        const updatedVersions = { ...prev };
        updatedVersions[sectionId] = [initialVersion];
        return updatedVersions;
      });
    }
  };
  
  const handleUserMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value);
  };
  
  const generateAiResponse = () => {
    if (!userMessage.trim()) return;
    
    // Simulate AI generating a response
    setTimeout(() => {
      const suggestion = activeSectionContent + "\n\n" + userMessage;
      setAiSuggestion(suggestion);
      setShowProposalOption(true);
    }, 1000);
  };
  
  const proposeUpdate = () => {
    if (!activeSection || !aiSuggestion) return;
    
    // Update section content
    setSectionContents(prev => ({
      ...prev,
      [activeSection]: aiSuggestion
    }));
    
    // Add to version history with metadata
    setSectionVersions(prev => {
      const newVersion = {
        content: aiSuggestion,
        timestamp: new Date(),
        author: parents.mother.name, // Assuming the mother is making changes
        note: "AI-assisted update"
      };
      
      // Create a new array if it doesn't exist yet
      const existingVersions = prev[activeSection] || [];
      
      return {
        ...prev,
        [activeSection]: [...existingVersions, newVersion]
      };
    });
    
    // Update initials status (remove father's initials)
    if (activeSection) {
      // Create a new object to avoid mutating state directly
      setSectionStatus(prev => {
        // Create a deep copy of the previous state
        const newStatus = JSON.parse(JSON.stringify(prev));
        
        // Update the status for the active section
        newStatus[activeSection] = { mother: true, father: false };
        
        console.log('Updated section status:', activeSection, newStatus[activeSection]);
        console.log('Full status after update:', newStatus);
        
        return newStatus;
      });
    }
    
    setAiMessage("Your changes have been proposed. The other parent will need to review and initial this section again.");
    setShowProposalOption(false);
    setActiveSectionContent(aiSuggestion);
  };
  
  const viewVersionHistory = () => {
    setShowVersionHistory(true);
  };
  
  // Helper for converting string to versioned content format
  const stringToVersionedContent = (content: string, author: string, note?: string) => {
    return {
      content,
      timestamp: new Date(),
      author,
      note
    };
  };

  // Helper to extract content from versioned content
  const getContentFromVersion = (version: any): string => {
    if (typeof version === 'string') {
      return version;
    }
    return version.content || '';
  };
  
  const closeVersionHistory = () => {
    setShowVersionHistory(false);
    setSelectedVersionIndex(null);
    setCompareMode(false);
    setCompareVersionIndex(null);
  };
  
  // Function to handle adding initials
  const handleInitialsClick = (sectionId: string, parentType: 'mother' | 'father') => {
    // Only allow adding initials if there's no active section with pending changes
    if (!aiSuggestion) {
      setSectionStatus(prev => {
        const newStatus = JSON.parse(JSON.stringify(prev));
        // Toggle the initials status
        const currentStatus = newStatus[sectionId] || { mother: false, father: false };
        currentStatus[parentType] = !currentStatus[parentType];
        newStatus[sectionId] = currentStatus;
        
        console.log(`Updated initials for ${parentType} in section ${sectionId}:`, currentStatus);
        return newStatus;
      });
    } else {
      setAiMessage("Please complete or cancel the current proposed changes before adding initials.");
    }
  };

  // Helper component for parent initials
  const ParentInitials = ({ sectionId, parentType }: { sectionId: string; parentType: 'mother' | 'father' }) => {
    const sectionStatusObj = sectionStatus[sectionId as keyof typeof sectionStatus];
    console.log(`Checking initials for ${parentType} in section ${sectionId}:`, sectionStatusObj);
    const isInitialed = sectionStatusObj?.[parentType];
    const parentInfo = parentType === 'mother' ? parents.mother : parents.father;
    const label = parentType === 'mother' ? "Mother's Initials" : "Father's Initials";
    
    return (
      <div className="flex items-center">
        <div className="w-20 font-medium text-sm">{label}</div>
        <div 
          onClick={() => handleInitialsClick(sectionId, parentType)}
          className={`ml-4 ${isInitialed 
            ? 'font-bold text-primary cursor-pointer' 
            : 'missing-initials'}`}
        >
          {isInitialed ? parentInfo.initials : "Click to initial"}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-app flex flex-col w-full overflow-hidden">
      <Header 
        title="Parenting Plan"
        onMenuClick={openMenu}
      />
      
      <div className="flex flex-1">
        <div className="w-full h-full flex flex-col lg:flex-row max-w-[97%] mx-auto mt-5">
          {/* Main document - scrollable */}
          <div className="flex-1 h-full overflow-hidden flex flex-col" style={{ maxHeight: 'calc(100vh - 84px)' }}>
            <div className="bg-white rounded-l-lg shadow-lg p-6 h-full flex flex-col">
              <div className="bg-white z-10 pb-4 mb-2" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                {/* Document header with title and actions side by side */}
                <div className="flex justify-between items-center py-4 border-b border-gray-100">
                  {/* Title, left-justified */}
                  <div className="relative">
                    <h1 className="text-3xl font-bold text-[#2e1a87] relative inline-block">
                      Parenting Partnership Agreement
                      <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#2e1a87]"></span>
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">Last updated: April 24, 2025</p>
                  </div>
                  
                  {/* Action buttons on the right */}
                  <div className="flex space-x-4">
                    <button className="flex items-center px-4 py-2 text-[#2e1a87] bg-white border border-[#2e1a87] text-sm rounded-full hover:bg-[#f5f3ff] hover:shadow transition-all duration-200">
                      <Share2 className="h-4 w-4 mr-2" />
                      <span className="font-medium">Share</span>
                    </button>
                    <button className="flex items-center px-4 py-2 text-[#2e1a87] bg-white border border-[#2e1a87] text-sm rounded-full hover:bg-[#f5f3ff] hover:shadow transition-all duration-200">
                      <Download className="h-4 w-4 mr-2" />
                      <span className="font-medium">Download</span>
                    </button>
                    <button className="flex items-center px-4 py-2 bg-[#2e1a87] text-white text-sm rounded-full hover:shadow-md hover:bg-[#3d2ba0] transition-all duration-200">
                      <Printer className="h-4 w-4 mr-2" />
                      <span className="font-medium">Print</span>
                    </button>
                  </div>
                </div>
                
                {/* Clear break for AI Assistant */}
                <div className="my-4 border-t border-gray-100"></div>
              </div>
            
              <div className="prose max-w-none overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }}>
                <p className="text-gray-600">
                  This is an agreement between the parents named below that is intended to address all of our legal rights and obligations 
                  relating to the child(ren) identified below. We, the parents, agree that it is best for our child(ren) that we determine 
                  how we will parent them following our separation and that the terms below are in our child(ren)'s best interests.
                </p>
                
                <p className="text-gray-600">
                  It is our intention to submit this agreement to the Court in any legal proceeding to determine our parenting rights and obligations. 
                  We both want the Court to adopt this agreement in its entirety.
                </p>
                
                {/* Section 1 - Parents */}
                <div 
                  className={`parenting-plan-section border border-gray-200 rounded-md p-6 my-6 ${activeSection === 'section-1' ? 'active' : ''}`}
                  onClick={() => handleSectionClick('section-1', 'Parents')}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      {getSectionStatus('section-1').icon}
                      <span className="ml-2">SECTION 1 - PARENTS</span>
                    </h2>
                    <div className="flex items-center space-x-3">
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${getSectionStatus('section-1').badge}`}>
                        {getSectionStatus('section-1').label}
                      </div>
                      {sectionVersions['section-1'] && sectionVersions['section-1']?.length > 1 && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSection('section-1');
                            setActiveSectionTitle('Parents');
                            viewVersionHistory();
                          }}
                          className="text-primary hover:text-primary-dark"
                        >
                          <History className="h-5 w-5" />
                        </button>
                      )}
                      <button className="text-primary hover:text-primary-dark">
                        <Edit2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="space-y-2">
                      <p className="font-medium">Mother's Legal Name</p>
                      <p className="text-gray-700">{parents.mother.name}</p>
                      <p className="font-medium mt-2">Address</p>
                      <p className="text-gray-700">{parents.mother.address}</p>
                      <p className="font-medium mt-2">Phone</p>
                      <p className="text-gray-700">{parents.mother.phone}</p>
                      <p className="font-medium mt-2">Email</p>
                      <p className="text-gray-700">{parents.mother.email}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="font-medium">Father's Legal Name</p>
                      <p className="text-gray-700">{parents.father.name}</p>
                      <p className="font-medium mt-2">Address</p>
                      <p className="text-gray-700">{parents.father.address}</p>
                      <p className="font-medium mt-2">Phone</p>
                      <p className="text-gray-700">{parents.father.phone}</p>
                      <p className="font-medium mt-2">Email</p>
                      <p className="text-gray-700">{parents.father.email}</p>
                    </div>
                  </div>
                  
                  <p className="mt-4 text-gray-600">
                    We both agree to keep each other updated of any changes to any of this information, in each instance 
                    immediately upon any change, or as soon as practicable.
                  </p>
                </div>
                
                {/* Section 2 - Children */}
                <div 
                  className={`parenting-plan-section border border-gray-200 rounded-md p-6 my-6 ${activeSection === 'section-2' ? 'active' : ''}`}
                  onClick={() => handleSectionClick('section-2', 'Children')}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      {getSectionStatus('section-2').icon}
                      <span className="ml-2">SECTION 2 - CHILDREN</span>
                    </h2>
                    <div className="flex items-center space-x-3">
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${getSectionStatus('section-2').badge}`}>
                        {getSectionStatus('section-2').label}
                      </div>
                      {sectionVersions['section-2'] && sectionVersions['section-2']?.length > 1 && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSection('section-2');
                            setActiveSectionTitle('Children');
                            viewVersionHistory();
                          }}
                          className="text-primary hover:text-primary-dark"
                        >
                          <History className="h-5 w-5" />
                        </button>
                      )}
                      <button className="text-primary hover:text-primary-dark">
                        <Edit2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-gray-700 font-medium">Name</th>
                          <th className="px-4 py-2 text-left text-gray-700 font-medium">Date of Birth</th>
                          <th className="px-4 py-2 text-left text-gray-700 font-medium">Gender</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {children.map((child, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 text-gray-700">{child.name}</td>
                            <td className="px-4 py-2 text-gray-700">{child.dateOfBirth}</td>
                            <td className="px-4 py-2 text-gray-700">{child.gender}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Section 3 - Jurisdiction */}
                <div 
                  className={`parenting-plan-section border border-gray-200 rounded-md p-6 my-6 ${activeSection === 'section-3' ? 'active' : ''}`}
                  onClick={() => handleSectionClick('section-3', 'Jurisdiction')}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      {getSectionStatus('section-3').icon}
                      <span className="ml-2">SECTION 3 - JURISDICTION</span>
                    </h2>
                    <div className="flex items-center space-x-3">
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${getSectionStatus('section-3').badge}`}>
                        {getSectionStatus('section-3').label}
                      </div>
                      {sectionVersions['section-3'] && sectionVersions['section-3']?.length > 1 && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSection('section-3');
                            setActiveSectionTitle('Jurisdiction');
                            viewVersionHistory();
                          }}
                          className="text-primary hover:text-primary-dark"
                        >
                          <History className="h-5 w-5" />
                        </button>
                      )}
                      <button className="text-primary hover:text-primary-dark">
                        <Edit2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className={`mt-4 space-y-4 ${getSectionStatus('section-3').hasProposedChanges ? 'proposed-content' : ''}`}>
                    <p className="text-gray-700">
                      The United States is the country of habitual residence of the child(ren).
                    </p>
                    <p className="text-gray-700">
                      The State of <span className="font-semibold">Florida</span> is the child(ren)'s home state for the purposes of the Uniform Child Custody Jurisdiction and Enforcement Act. 
                      This document is intended to be the basis of a child custody determination for the purposes of the Uniform Child Custody Jurisdiction and Enforcement Act, 
                      the International Child Abduction Remedies Act, 42 U.S.C. Sections 11601 et seq., the Parental Kidnapping Prevention Act, and the Convention on the Civil Aspects 
                      of International Child Abduction.
                    </p>
                  </div>
                    
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                    <ParentInitials sectionId="section-3" parentType="mother" />
                    <ParentInitials sectionId="section-3" parentType="father" />
                  </div>
                </div>
                
                {/* Section 4 - Parental Responsibility */}
                <div 
                  className={`parenting-plan-section border border-gray-200 rounded-md p-6 my-6 ${activeSection === 'section-4a' ? 'active' : ''}`}
                  onClick={() => handleSectionClick('section-4a', 'Shared Decision-Making')}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      {getSectionStatus('section-4a').icon}
                      <span className="ml-2">SECTION 4 - PARENTAL RESPONSIBILITY & DECISION MAKING</span>
                    </h2>
                    <div className="flex items-center space-x-3">
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${getSectionStatus('section-4a').badge}`}>
                        {getSectionStatus('section-4a').label}
                      </div>
                      {sectionVersions['section-4a'] && sectionVersions['section-4a'].length > 1 && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            viewVersionHistory();
                          }}
                          className="text-primary hover:text-primary-dark"
                        >
                          <History className="h-5 w-5" />
                        </button>
                      )}
                      <button className="text-primary hover:text-primary-dark">
                        <Edit2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className={`mt-4 space-y-4 ${getSectionStatus('section-4a').hasProposedChanges ? 'proposed-content' : ''}`}>
                    <h3 className="font-semibold text-gray-800">A. Shared Decision-Making for Major Decisions.</h3>
                    <p className="text-gray-700">
                      We are going to make decisions about our children as co-parents, together, and always with our child(ren)'s best interests as the most important guiding concern. 
                      These decisions include all important decisions affecting the welfare of our child(ren), such as decisions about the child(ren)'s education, healthcare, 
                      mental health and life-enriching activities. Neither of us will have a superior right or authority when it comes to co-parenting our children. 
                      We will treat each other with respect and cooperate in an effort to raise our child(ren) in the most loving, caring environment possible.
                    </p>
                  </div>
                    
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                    <ParentInitials sectionId="section-4a" parentType="mother" />
                    <ParentInitials sectionId="section-4a" parentType="father" />
                  </div>
                </div>
                
                {/* Section 4B - Disagreements */}
                <div 
                  className={`parenting-plan-section border border-gray-200 rounded-md p-6 my-6 ${activeSection === 'section-4b' ? 'active' : ''}`}
                  onClick={() => handleSectionClick('section-4b', 'Resolving Disagreements')}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      {getSectionStatus('section-4b').icon}
                      <span className="ml-2">B. How We Will Resolve Disagreements.</span>
                    </h2>
                    <div className="flex items-center space-x-3">
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${getSectionStatus('section-4b').badge}`}>
                        {getSectionStatus('section-4b').label}
                      </div>
                      {sectionVersions['section-4b'] && sectionVersions['section-4b'].length > 1 && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            viewVersionHistory();
                          }}
                          className="text-primary hover:text-primary-dark"
                        >
                          <History className="h-5 w-5" />
                        </button>
                      )}
                      <button className="text-primary hover:text-primary-dark">
                        <Edit2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className={`mt-4 space-y-4 ${getSectionStatus('section-4b').hasProposedChanges ? 'proposed-content' : ''}`}>
                    <p className="text-gray-700">
                      If we are ever unable to resolve a disagreement then we will immediately seek professional advice from the most qualified person 
                      that is reasonably available to us. This could be a doctor, educator, mental health professional, or someone else that can assist 
                      us in properly and diligently considering all of the information that is relevant to any decision. We will try to always keep open 
                      minds and respect each other, even when we disagree.
                    </p>
                  </div>
                    
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                    <ParentInitials sectionId="section-4b" parentType="mother" />
                    <ParentInitials sectionId="section-4b" parentType="father" />
                  </div>
                </div>
                
                {/* Section 4C - Day-to-Day Decisions */}
                <div 
                  className={`parenting-plan-section border border-gray-200 rounded-md p-6 my-6 ${activeSection === 'section-4c' ? 'active' : ''}`}
                  onClick={() => handleSectionClick('section-4c', 'Day-to-Day Decisions')}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      {getSectionStatus('section-4c').icon}
                      <span className="ml-2">C. Day-to-Day Decision-Making.</span>
                    </h2>
                    <div className="flex items-center space-x-3">
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${getSectionStatus('section-4c').badge}`}>
                        {getSectionStatus('section-4c').label}
                      </div>
                      {sectionVersions['section-4c'] && sectionVersions['section-4c'].length > 1 && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            viewVersionHistory();
                          }}
                          className="text-primary hover:text-primary-dark"
                        >
                          <History className="h-5 w-5" />
                        </button>
                      )}
                      <button className="text-primary hover:text-primary-dark">
                        <Edit2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className={`mt-4 space-y-4 ${getSectionStatus('section-4c').hasProposedChanges ? 'proposed-content' : ''}`}>
                    <p className="text-gray-700">
                      Nothing here is intended to interfere with our respective rights to make decisions regarding the day-to-day care 
                      and control of our child(ren) while the child(ren) are with us. Similarly, we both are allowed to make emergency 
                      decisions affecting the health or safety of the child(ren) if such a decision is ever necessary. If there is ever 
                      such an emergency, then we both commit to notify each other of the situation as soon as reasonably possible.
                    </p>
                  </div>
                    
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                    <ParentInitials sectionId="section-4c" parentType="mother" />
                    <ParentInitials sectionId="section-4c" parentType="father" />
                  </div>
                </div>
                
                {/* Section 4D - Extra-curricular Activities */}
                <div 
                  className={`parenting-plan-section border border-gray-200 rounded-md p-6 my-6 ${activeSection === 'section-4d' ? 'active' : ''}`}
                  onClick={() => handleSectionClick('section-4d', 'Extra-curricular Activities')}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      {getSectionStatus('section-4d').icon}
                      <span className="ml-2">D. Extra-curricular Activities.</span>
                    </h2>
                    <div className="flex items-center space-x-3">
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${getSectionStatus('section-4d').badge}`}>
                        {getSectionStatus('section-4d').label}
                      </div>
                      {sectionVersions['section-4d'] && sectionVersions['section-4d'].length > 1 && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            viewVersionHistory();
                          }}
                          className="text-primary hover:text-primary-dark"
                        >
                          <History className="h-5 w-5" />
                        </button>
                      )}
                      <button className="text-primary hover:text-primary-dark">
                        <Edit2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className={`mt-4 space-y-4 ${getSectionStatus('section-4d').hasProposedChanges ? 'proposed-content' : ''}`}>
                    <p className="text-gray-700">
                      We agree that extracurricular activities are very important for the development of our child(ren) in many respects. 
                      We will discuss all proposed extracurricular activities with each other, and these are the things we agree are important to consider:
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div className="border border-gray-200 p-2 rounded text-center text-sm">The child's preference</div>
                      <div className="border border-gray-200 p-2 rounded text-center text-sm">Geography</div>
                      <div className="border border-gray-200 p-2 rounded text-center text-sm">Practicality of schedule</div>
                      <div className="border border-gray-200 p-2 rounded text-center text-sm">Cost</div>
                      <div className="border border-gray-200 p-2 rounded text-center text-sm">Required Equipment</div>
                      <div className="border border-gray-200 p-2 rounded text-center text-sm">Academic performance</div>
                      <div className="border border-gray-200 p-2 rounded text-center text-sm">Travel schedule</div>
                      <div className="border border-gray-200 p-2 rounded text-center text-sm">Other</div>
                    </div>
                  </div>
                    
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                    <ParentInitials sectionId="section-4d" parentType="mother" />
                    <ParentInitials sectionId="section-4d" parentType="father" />
                  </div>
                </div>
                
                {/* Section 5 - Time Sharing Schedule */}
                <div 
                  className={`parenting-plan-section border border-gray-200 rounded-md p-6 my-6 ${activeSection === 'section-5a' ? 'active' : ''}`}
                  onClick={() => handleSectionClick('section-5a', 'Time Sharing Schedule')}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                      {getSectionStatus('section-5a').icon}
                      <span className="ml-2">SECTION 5 - TIME SHARING SCHEDULE</span>
                    </h2>
                    <div className="flex items-center space-x-3">
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${getSectionStatus('section-5a').badge}`}>
                        {getSectionStatus('section-5a').label}
                      </div>
                      {sectionVersions['section-5a'] && sectionVersions['section-5a'].length > 1 && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            viewVersionHistory();
                          }}
                          className="text-primary hover:text-primary-dark"
                        >
                          <History className="h-5 w-5" />
                        </button>
                      )}
                      <button className="text-primary hover:text-primary-dark">
                        <Edit2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className={`mt-4 space-y-4 ${getSectionStatus('section-5a').hasProposedChanges ? 'proposed-content' : ''}`}>
                    <h3 className="font-semibold text-gray-800">A. Scheduling and Our Calendar</h3>
                    <p className="text-gray-700">
                      We will exchange any school and extracurricular activity calendars as soon as we are able to after receiving them. 
                      We both acknowledge how important it is for us both to understand our child(ren)'s schedules. We are going to follow 
                      the dates set forth on our child(ren)'s school calendars when it comes to understanding academic breaks from school.
                    </p>
                    
                    <p className="text-gray-700">
                      We agree that some flexibility will be required of both of us and that it is very important that we show each other 
                      respect both in asking for flexibility and in granting flexibility. We also understand that maintaining a routine is 
                      the best possible thing for our child(ren), so we will each do our best to avoid asking for schedule changes on a regular 
                      basis just to accommodate our own personal needs.
                    </p>
                  </div>
                    
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                    <ParentInitials sectionId="section-5a" parentType="mother" />
                    <ParentInitials sectionId="section-5a" parentType="father" />
                  </div>
                </div>
                
                {/* Signatures section */}
                <div className="border-t-2 border-gray-300 mt-12 pt-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">SIGNATURES</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <div className="border-b border-gray-900 pb-1 mb-2"></div>
                      <p className="font-medium">Mother's Signature</p>
                      <p className="text-gray-600 mt-1">Elizabeth Maria Elliot</p>
                      <p className="text-gray-600 mt-4">Date: _______________</p>
                    </div>
                    
                    <div>
                      <div className="border-b border-gray-900 pb-1 mb-2"></div>
                      <p className="font-medium">Father's Signature</p>
                      <p className="text-gray-600 mt-1">Christopher James Frazer</p>
                      <p className="text-gray-600 mt-4">Date: _______________</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* AI Assistant sidebar - connected with a divider */}
          <div className="lg:w-[450px] border-l border-gray-300 flex flex-col overflow-hidden" style={{ height: 'calc(100vh - 84px)' }}>
            <div className="bg-white rounded-r-lg shadow-lg flex-1 flex flex-col overflow-hidden">
              {activeSection ? (
                <>
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center">
                      <h2 className="text-lg font-semibold text-gray-800">Editing: {activeSectionTitle}</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                      {sectionVersions[activeSection] && sectionVersions[activeSection].length > 1 && (
                        <button 
                          onClick={viewVersionHistory}
                          className="text-xs text-primary hover:text-primary-dark flex items-center"
                        >
                          <History className="h-4 w-4 mr-1" />
                          Version History
                        </button>
                      )}
                      <button 
                        onClick={() => setActiveSection(null)}
                        className="text-xs text-gray-600 hover:text-gray-800 flex items-center"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-4 overflow-y-auto">
                    {/* Current section content */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h3 className="text-sm font-medium text-gray-800 mb-2">Current Language:</h3>
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">
                        {activeSectionContent}
                      </p>
                    </div>
                    
                    {/* AI messages */}
                    {aiMessage && (
                      <div className="bg-primary-light rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-800">
                          {aiMessage}
                        </p>
                      </div>
                    )}
                    
                    {/* AI suggestion */}
                    {aiSuggestion && (
                      <div className="bg-gray-100 rounded-lg p-3 mb-4">
                        <h3 className="text-sm font-medium text-gray-800 mb-2">Suggested Language:</h3>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap overflow-y-auto max-h-60">
                          {aiSuggestion}
                        </p>
                        
                        {showProposalOption && (
                          <div className="mt-4">
                            <button 
                              onClick={proposeUpdate}
                              className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark text-sm font-medium"
                            >
                              Propose This Update
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <input 
                        type="text" 
                        value={userMessage}
                        onChange={handleUserMessageChange}
                        placeholder="Type your modifications..."
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button 
                        onClick={generateAiResponse}
                        className="ml-2 bg-primary text-white px-3 py-2 rounded-md hover:bg-primary-dark"
                      >
                        Regenerate
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4">
                    <HelpCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Parenting Plan Assistant</h3>
                  <p className="text-gray-600">
                    Select any section from the document to get AI-powered help with drafting the perfect language for your parenting plan.
                  </p>
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
                    <p className="text-sm font-medium text-gray-700 mb-2">What the assistant can help with:</p>
                    <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                      <li>Suggesting child-centered language</li>
                      <li>Clarifying ambiguous provisions</li>
                      <li>Adding important details you might miss</li>
                      <li>Explaining legal implications</li>
                      <li>Improving cooperative co-parenting terms</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Version History Modal */}
          {showVersionHistory && activeSection && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Version History: {activeSectionTitle}</h2>
                  <div className="flex items-center space-x-4">
                    {compareMode && (
                      <button 
                        onClick={() => setCompareMode(false)}
                        className="text-sm text-primary hover:text-primary-dark"
                      >
                        Exit Comparison Mode
                      </button>
                    )}
                    <button onClick={closeVersionHistory} className="text-gray-500 hover:text-gray-700">
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {!compareMode ? (
                  // List view of all versions
                  <div className="flex-1 p-4 overflow-y-auto">
                    {sectionVersions[activeSection]?.map((version, index) => (
                      <div 
                        key={index} 
                        className={`mb-4 border rounded-lg p-4 ${
                          selectedVersionIndex === index ? 'border-primary bg-primary-light/10' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium text-gray-800">
                            Version {index + 1}
                            {index === 0 && <span className="ml-2 text-xs text-gray-500">(Original)</span>}
                            {index === (sectionVersions[activeSection]?.length || 0) - 1 && index > 0 && (
                              <span className="ml-2 text-xs text-green-500">(Current)</span>
                            )}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">
                              {version.timestamp.toLocaleDateString()} {version.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                            <span className="text-xs font-medium text-gray-700">
                              by {version.author}
                            </span>
                          </div>
                        </div>
                        
                        {version.note && (
                          <div className="bg-gray-50 text-xs text-gray-600 p-2 rounded mb-2">
                            {version.note}
                          </div>
                        )}
                        
                        <p className="text-sm text-gray-600 whitespace-pre-wrap">{version.content}</p>
                        
                        <div className="mt-4 flex justify-between">
                          <div className="space-x-2">
                            {index !== (sectionVersions[activeSection]?.length || 0) - 1 && (
                              <button 
                                onClick={() => {
                                  // Update to this version
                                  setActiveSectionContent(version.content);
                                  setSectionContents(prev => ({
                                    ...prev,
                                    [activeSection]: version.content
                                  }));
                                  closeVersionHistory();
                                }}
                                className="text-xs px-2 py-1 border border-primary text-primary rounded hover:bg-primary hover:text-white"
                              >
                                Restore This Version
                              </button>
                            )}
                            
                            {selectedVersionIndex === index ? (
                              <button 
                                onClick={() => setSelectedVersionIndex(null)}
                                className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                              >
                                Deselect
                              </button>
                            ) : (
                              <button 
                                onClick={() => setSelectedVersionIndex(index)}
                                className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                              >
                                Select
                              </button>
                            )}
                          </div>
                          
                          {selectedVersionIndex !== null && selectedVersionIndex !== index && (
                            <button 
                              onClick={() => {
                                setCompareMode(true);
                                setCompareVersionIndex(index);
                              }}
                              className="text-xs px-2 py-1 bg-primary text-white rounded hover:bg-primary-dark"
                            >
                              Compare with Selected
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Comparison view between two versions
                  <div className="flex-1 p-4 overflow-y-auto">
                    {selectedVersionIndex !== null && compareVersionIndex !== null && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-medium text-gray-800">
                              Version {selectedVersionIndex + 1}
                              {selectedVersionIndex === 0 && <span className="ml-2 text-xs text-gray-500">(Original)</span>}
                            </h3>
                            <div>
                              <span className="text-xs text-gray-500">
                                {sectionVersions[activeSection][selectedVersionIndex].timestamp.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mb-2">
                            Author: {sectionVersions[activeSection][selectedVersionIndex].author}
                          </div>
                          <p className="text-sm text-gray-600 whitespace-pre-wrap bg-gray-50 p-3 rounded max-h-[400px] overflow-y-auto">
                            {sectionVersions[activeSection][selectedVersionIndex].content}
                          </p>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-sm font-medium text-gray-800">
                              Version {compareVersionIndex + 1}
                              {compareVersionIndex === (sectionVersions[activeSection]?.length || 0) - 1 && (
                                <span className="ml-2 text-xs text-green-500">(Current)</span>
                              )}
                            </h3>
                            <div>
                              <span className="text-xs text-gray-500">
                                {sectionVersions[activeSection][compareVersionIndex].timestamp.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mb-2">
                            Author: {sectionVersions[activeSection][compareVersionIndex].author}
                          </div>
                          <p className="text-sm text-gray-600 whitespace-pre-wrap bg-gray-50 p-3 rounded max-h-[400px] overflow-y-auto">
                            {sectionVersions[activeSection][compareVersionIndex].content}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="p-4 border-t border-gray-200 flex justify-between">
                  <button
                    onClick={closeVersionHistory}
                    className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium"
                  >
                    Close
                  </button>
                  
                  {compareMode && (
                    <button
                      onClick={() => setCompareMode(false)}
                      className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark font-medium"
                    >
                      Back to All Versions
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}