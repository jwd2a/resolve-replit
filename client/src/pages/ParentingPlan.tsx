import { useState } from "react";
import { Printer, Edit2, CheckCircle2, Circle, HelpCircle, Send } from "lucide-react";
import Header from "@/components/Header";
import { useMobileMenu } from "@/hooks/useMobileMenu";

export default function ParentingPlan() {
  const { openMenu } = useMobileMenu();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeSectionTitle, setActiveSectionTitle] = useState<string>("");

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
  const sectionStatus = {
    "section-3": { mother: true, father: true },
    "section-4a": { mother: true, father: true },
    "section-4b": { mother: true, father: false },
    "section-4c": { mother: true, father: true },
    "section-4d": { mother: false, father: true },
    "section-4e": { mother: true, father: true },
    "section-4f": { mother: true, father: true },
    "section-4g": { mother: false, father: false },
    "section-5a": { mother: true, father: true },
    "section-5b": { mother: false, father: false },
    "section-5c": { mother: false, father: false },
    "section-5d": { mother: false, father: false },
    "section-5e": { mother: false, father: false },
  };

  const getSectionStatusIcon = (sectionId: string) => {
    const status = sectionStatus[sectionId as keyof typeof sectionStatus];
    if (!status) return <Circle className="h-4 w-4 text-gray-300" />;
    
    if (status.mother && status.father) {
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    } else if (status.mother || status.father) {
      return <HelpCircle className="h-4 w-4 text-yellow-500" />;
    } else {
      return <Circle className="h-4 w-4 text-gray-300" />;
    }
  };

  const handleSectionClick = (sectionId: string, title: string) => {
    setActiveSection(sectionId);
    setActiveSectionTitle(title);
  };

  return (
    <div className="min-h-screen bg-app flex flex-col w-full overflow-x-hidden">
      <Header 
        title="Resolve"
        sectionTitle="Parenting Plan"
        onMenuClick={openMenu}
      />
      
      <div className="flex flex-1 p-4 lg:p-8 bg-white">
        <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-8">
          {/* Main document */}
          <div className="flex-1 bg-white rounded-lg shadow-lg p-8 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Parenting Partnership Agreement</h1>
              <button className="flex items-center text-primary hover:text-primary-dark">
                <Printer className="h-5 w-5 mr-1" />
                <span>Print</span>
              </button>
            </div>
            
            <div className="prose max-w-none">
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
                    {getSectionStatusIcon('section-1')}
                    <span className="ml-2">SECTION 1 - PARENTS</span>
                  </h2>
                  <Edit2 className="h-5 w-5 text-primary" />
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
                    {getSectionStatusIcon('section-2')}
                    <span className="ml-2">SECTION 2 - CHILDREN</span>
                  </h2>
                  <Edit2 className="h-5 w-5 text-primary" />
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
                    {getSectionStatusIcon('section-3')}
                    <span className="ml-2">SECTION 3 - JURISDICTION</span>
                  </h2>
                  <Edit2 className="h-5 w-5 text-primary" />
                </div>
                
                <div className="mt-4 space-y-4">
                  <p className="text-gray-700">
                    The United States is the country of habitual residence of the child(ren).
                  </p>
                  <p className="text-gray-700">
                    The State of <span className="font-semibold">Florida</span> is the child(ren)'s home state for the purposes of the Uniform Child Custody Jurisdiction and Enforcement Act. 
                    This document is intended to be the basis of a child custody determination for the purposes of the Uniform Child Custody Jurisdiction and Enforcement Act, 
                    the International Child Abduction Remedies Act, 42 U.S.C. Sections 11601 et seq., the Parental Kidnapping Prevention Act, and the Convention on the Civil Aspects 
                    of International Child Abduction.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center">
                      <div className="w-20 font-medium text-sm">Mother's Initials</div>
                      <div className="ml-4 font-bold text-primary">{parents.mother.initials}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-20 font-medium text-sm">Father's Initials</div>
                      <div className="ml-4 font-bold text-primary">{parents.father.initials}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Section 4 - Parental Responsibility */}
              <div 
                className={`border border-gray-200 rounded-md p-6 my-6 transition-all ${activeSection === 'section-4a' ? 'ring-2 ring-primary' : 'hover:border-primary cursor-pointer'}`}
                onClick={() => handleSectionClick('section-4a', 'Shared Decision-Making')}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    {getSectionStatusIcon('section-4a')}
                    <span className="ml-2">SECTION 4 - PARENTAL RESPONSIBILITY & DECISION MAKING</span>
                  </h2>
                  <Edit2 className="h-5 w-5 text-primary" />
                </div>
                
                <div className="mt-4 space-y-4">
                  <h3 className="font-semibold text-gray-800">A. Shared Decision-Making for Major Decisions.</h3>
                  <p className="text-gray-700">
                    We are going to make decisions about our children as co-parents, together, and always with our child(ren)'s best interests as the most important guiding concern. 
                    These decisions include all important decisions affecting the welfare of our child(ren), such as decisions about the child(ren)'s education, healthcare, 
                    mental health and life-enriching activities. Neither of us will have a superior right or authority when it comes to co-parenting our children. 
                    We will treat each other with respect and cooperate in an effort to raise our child(ren) in the most loving, caring environment possible.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center">
                      <div className="w-20 font-medium text-sm">Mother's Initials</div>
                      <div className="ml-4 font-bold text-primary">{parents.mother.initials}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-20 font-medium text-sm">Father's Initials</div>
                      <div className="ml-4 font-bold text-primary">{parents.father.initials}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Section 4B - Disagreements */}
              <div 
                className={`border border-gray-200 rounded-md p-6 my-6 transition-all ${activeSection === 'section-4b' ? 'ring-2 ring-primary' : 'hover:border-primary cursor-pointer'}`}
                onClick={() => handleSectionClick('section-4b', 'Resolving Disagreements')}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    {getSectionStatusIcon('section-4b')}
                    <span className="ml-2">B. How We Will Resolve Disagreements.</span>
                  </h2>
                  <Edit2 className="h-5 w-5 text-primary" />
                </div>
                
                <div className="mt-4 space-y-4">
                  <p className="text-gray-700">
                    If we are ever unable to resolve a disagreement then we will immediately seek professional advice from the most qualified person 
                    that is reasonably available to us. This could be a doctor, educator, mental health professional, or someone else that can assist 
                    us in properly and diligently considering all of the information that is relevant to any decision. We will try to always keep open 
                    minds and respect each other, even when we disagree.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center">
                      <div className="w-20 font-medium text-sm">Mother's Initials</div>
                      <div className="ml-4 font-bold text-primary">{parents.mother.initials}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-20 font-medium text-sm">Father's Initials</div>
                      <div className="ml-4 text-gray-400 italic">Not initialed</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional sections would be added here */}
              {/* I'm adding a truncated version for demonstration */}
              
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
          
          {/* AI Assistant sidebar */}
          {activeSection && (
            <div className="lg:w-96 bg-white rounded-lg shadow-lg flex flex-col h-auto lg:h-[calc(100vh-12rem)]">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Editing: {activeSectionTitle}</h2>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600">
                    This AI assistant can help you craft the perfect wording for your parenting plan. 
                    Write your questions or explain what you're looking for, and I'll provide suggestions.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-primary-light rounded-lg p-3">
                    <p className="text-sm text-gray-800">
                      I need help clarifying who will make healthcare decisions in emergencies when we can't reach each other.
                    </p>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm text-gray-800">
                      You could add this language: "In emergency situations where immediate medical decisions are required and we cannot reach each other, the parent who is with the child at that time has full authority to make necessary healthcare decisions. The other parent must be informed as soon as possible."
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center">
                  <input 
                    type="text" 
                    placeholder="Type your question..."
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="ml-2 bg-primary text-white p-2 rounded-md hover:bg-primary-dark">
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}