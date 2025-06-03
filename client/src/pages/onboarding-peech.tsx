import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Heart, CheckCircle, Mail, Target, Shield, Calendar, Users, DollarSign, FileText } from "lucide-react";

// Types for onboarding data
interface EmotionalIntroData {
  feeling: string[];
  situation: string;
  priority: string[];
}

interface UserData {
  legalName: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phoneNumber: string;
  email: string;
}

interface CoParentData {
  legalName: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phoneNumber: string;
  email: string;
  inviteNow: boolean;
}

interface Child {
  fullName: string;
  dateOfBirth: string;
  gender: string;
}

interface OnboardingData {
  emotionalIntro: EmotionalIntroData;
  userData: UserData;
  coParentData: CoParentData;
  children: Child[];
  jurisdiction: string;
}

// Part 1: Emotionally Aware Intro Flow (NO PROGRESS BAR)
function PartOneIntroFlow({ onComplete, data, onDataUpdate }: {
  onComplete: () => void;
  data: EmotionalIntroData;
  onDataUpdate: (data: EmotionalIntroData) => void;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFeelings = (value: string) => {
    const newFeelings = data.feeling.includes(value)
      ? data.feeling.filter(f => f !== value)
      : [...data.feeling, value];
    onDataUpdate({ ...data, feeling: newFeelings });
  };

  const updatePriorities = (value: string) => {
    const newPriorities = data.priority.includes(value)
      ? data.priority.filter(p => p !== value)
      : [...data.priority, value];
    onDataUpdate({ ...data, priority: newPriorities });
  };

  const updateSituation = (value: string) => {
    onDataUpdate({ ...data, situation: value });
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1: return data.feeling.length > 0;
      case 2: return data.situation !== '';
      case 3: return data.priority.length > 0;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* NO PROGRESS BAR for emotional check-in */}
        
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            {currentStep === 1 && (
              <div className="text-center space-y-8">
                <div className="mb-8">
                  <Heart className="h-16 w-16 text-[#2e1a87] mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    How are you feeling about creating a co-parenting plan today?
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Select all that apply - we want to meet you where you are.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { emoji: "😟", text: "Nervous and unsure", value: "nervous" },
                    { emoji: "😐", text: "Just getting started", value: "starting" },
                    { emoji: "🙂", text: "Hopeful", value: "hopeful" },
                    { emoji: "😭", text: "Overwhelmed", value: "overwhelmed" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateFeelings(option.value)}
                      className={`w-full p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center min-h-[120px] ${
                        data.feeling.includes(option.value)
                          ? 'border-[#2e1a87] bg-purple-100 shadow-lg transform scale-105'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                      }`}
                    >
                      <div className="text-4xl mb-3">{option.emoji}</div>
                      <div className="font-semibold text-lg text-center">{option.text}</div>
                      {data.feeling.includes(option.value) && (
                        <CheckCircle className="h-5 w-5 text-[#2e1a87] mt-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="text-center space-y-8">
                <div className="mb-8">
                  <Users className="h-16 w-16 text-[#2e1a87] mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    What best describes your current situation with your co-parent?
                  </h2>
                  <p className="text-gray-600 text-lg">
                    This helps us understand your starting point.
                  </p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { text: "Still living together", value: "together" },
                    { text: "Recently separated", value: "recent" },
                    { text: "Living apart", value: "apart" },
                    { text: "Never lived together", value: "never" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateSituation(option.value)}
                      className={`w-full p-6 rounded-xl border-2 transition-all duration-200 flex items-center justify-center min-h-[80px] ${
                        data.situation === option.value
                          ? 'border-[#2e1a87] bg-purple-100 shadow-lg'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                      }`}
                    >
                      <div className="font-semibold text-lg text-center">{option.text}</div>
                      {data.situation === option.value && (
                        <CheckCircle className="h-5 w-5 text-[#2e1a87] ml-3" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center space-y-8">
                <div className="mb-8">
                  <Target className="h-16 w-16 text-[#2e1a87] mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    What's most important to you right now?
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Select all that apply - we'll prioritize features that matter most.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { emoji: "🎯", text: "Avoiding court", value: "avoid-court" },
                    { emoji: "👶", text: "Protecting my child(ren)", value: "protect-kids" },
                    { emoji: "🕊️", text: "Finishing quickly", value: "finishing-quickly" },
                    { emoji: "💰", text: "Saving money", value: "saving-money" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updatePriorities(option.value)}
                      className={`w-full p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center min-h-[120px] ${
                        data.priority.includes(option.value)
                          ? 'border-[#2e1a87] bg-purple-100 shadow-lg transform scale-105'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                      }`}
                    >
                      <div className="text-4xl mb-3">{option.emoji}</div>
                      <div className="font-semibold text-lg text-center">{option.text}</div>
                      {data.priority.includes(option.value) && (
                        <CheckCircle className="h-5 w-5 text-[#2e1a87] mt-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}



            {/* Navigation */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center text-lg px-6 py-3"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!isStepComplete()}
                className="bg-[#2e1a87] hover:bg-[#3d2a9b] flex items-center text-lg px-6 py-3"
              >
                {currentStep === totalSteps ? 'Continue to Details' : 'Next'}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Part 2: Structured Profile Form (WITH PROGRESS BAR starting at Step 1 of 5)
function PartTwoProfileForm({ onComplete, data, onDataUpdate }: {
  onComplete: () => void;
  data: Omit<OnboardingData, 'emotionalIntro'>;
  onDataUpdate: (data: Omit<OnboardingData, 'emotionalIntro'>) => void;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateUserData = (field: keyof UserData | string, value: string) => {
    if (field === 'address.street' || field === 'address.city' || field === 'address.state' || field === 'address.zip') {
      const addressField = field.split('.')[1] as keyof UserData['address'];
      onDataUpdate({
        ...data,
        userData: {
          ...data.userData,
          address: {
            ...data.userData.address,
            [addressField]: value
          }
        }
      });
    } else {
      onDataUpdate({
        ...data,
        userData: {
          ...data.userData,
          [field]: value
        }
      });
    }
  };

  const updateCoParentData = (field: keyof CoParentData | string, value: string | boolean) => {
    if (field === 'address.street' || field === 'address.city' || field === 'address.state' || field === 'address.zip') {
      const addressField = field.split('.')[1] as keyof CoParentData['address'];
      onDataUpdate({
        ...data,
        coParentData: {
          ...data.coParentData,
          address: {
            ...data.coParentData.address,
            [addressField]: value
          }
        }
      });
    } else if (field === 'inviteNow') {
      onDataUpdate({
        ...data,
        coParentData: {
          ...data.coParentData,
          inviteNow: value === 'true' || value === true
        }
      });
    } else {
      onDataUpdate({
        ...data,
        coParentData: {
          ...data.coParentData,
          [field]: value
        }
      });
    }
  };

  const addChild = () => {
    onDataUpdate({
      ...data,
      children: [...data.children, { fullName: '', dateOfBirth: '', gender: '' }]
    });
  };

  const updateChild = (index: number, field: keyof Child, value: string) => {
    const updatedChildren = [...data.children];
    updatedChildren[index] = { ...updatedChildren[index], [field]: value };
    onDataUpdate({ ...data, children: updatedChildren });
  };

  const removeChild = (index: number) => {
    const updatedChildren = data.children.filter((_, i) => i !== index);
    onDataUpdate({ ...data, children: updatedChildren });
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return data.userData.legalName && data.userData.address.street && 
               data.userData.address.city && data.userData.address.state && 
               data.userData.address.zip && data.userData.phoneNumber && 
               data.userData.email;
      case 2:
        return data.coParentData.legalName && data.coParentData.address.street && 
               data.coParentData.address.city && data.coParentData.address.state && 
               data.coParentData.address.zip && data.coParentData.phoneNumber && 
               data.coParentData.email;
      case 3:
        return data.children.length > 0 && data.children.every(child => 
          child.fullName && child.dateOfBirth && child.gender
        );
      case 4:
        return data.jurisdiction !== '';
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress indicator - ONLY for Legal Profile steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-[#2e1a87] font-medium">Building your profile</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#2e1a87] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-900">
              {currentStep === 1 && "Your Information"}
              {currentStep === 2 && "Co-Parent Information"}
              {currentStep === 3 && "Children Information"}
              {currentStep === 4 && "Legal Jurisdiction"}
              {currentStep === 5 && "All Set!"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="legalName">Legal Name *</Label>
                  <Input
                    id="legalName"
                    value={data.userData.legalName}
                    onChange={(e) => updateUserData('legalName', e.target.value)}
                    placeholder="Enter your full legal name"
                    className="mt-2"
                  />
                </div>
                
                <div className="space-y-4">
                  <Label>Legal Address *</Label>
                  <Input
                    value={data.userData.address.street}
                    onChange={(e) => updateUserData('address.street', e.target.value)}
                    placeholder="Street Address"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      value={data.userData.address.city}
                      onChange={(e) => updateUserData('address.city', e.target.value)}
                      placeholder="City"
                    />
                    <Input
                      value={data.userData.address.state}
                      onChange={(e) => updateUserData('address.state', e.target.value)}
                      placeholder="State"
                    />
                  </div>
                  <Input
                    value={data.userData.address.zip}
                    onChange={(e) => updateUserData('address.zip', e.target.value)}
                    placeholder="ZIP Code"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    value={data.userData.phoneNumber}
                    onChange={(e) => updateUserData('phoneNumber', e.target.value)}
                    placeholder="(555) 123-4567"
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Your Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.userData.email}
                    onChange={(e) => updateUserData('email', e.target.value)}
                    placeholder="your-email@example.com"
                    className="mt-2"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="coParentLegalName">Co-Parent Legal Name *</Label>
                  <Input
                    id="coParentLegalName"
                    value={data.coParentData.legalName}
                    onChange={(e) => updateCoParentData('legalName', e.target.value)}
                    placeholder="Enter co-parent's full legal name"
                    className="mt-2"
                  />
                </div>
                
                <div className="space-y-4">
                  <Label>Co-Parent Address *</Label>
                  <Input
                    value={data.coParentData.address.street}
                    onChange={(e) => updateCoParentData('address.street', e.target.value)}
                    placeholder="Street Address"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      value={data.coParentData.address.city}
                      onChange={(e) => updateCoParentData('address.city', e.target.value)}
                      placeholder="City"
                    />
                    <Input
                      value={data.coParentData.address.state}
                      onChange={(e) => updateCoParentData('address.state', e.target.value)}
                      placeholder="State"
                    />
                  </div>
                  <Input
                    value={data.coParentData.address.zip}
                    onChange={(e) => updateCoParentData('address.zip', e.target.value)}
                    placeholder="ZIP Code"
                  />
                </div>
                
                <div>
                  <Label htmlFor="coParentPhone">Co-Parent Phone Number *</Label>
                  <Input
                    id="coParentPhone"
                    value={data.coParentData.phoneNumber}
                    onChange={(e) => updateCoParentData('phoneNumber', e.target.value)}
                    placeholder="(555) 123-4567"
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="coParentEmail">Co-Parent Email Address *</Label>
                  <Input
                    id="coParentEmail"
                    type="email"
                    value={data.coParentData.email}
                    onChange={(e) => updateCoParentData('email', e.target.value)}
                    placeholder="coparent-email@example.com"
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Required regardless of when you invite them
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Label className="text-lg">Would you like to invite your co-parent now?</Label>
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => updateCoParentData('inviteNow', 'true')}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-start ${
                        data.coParentData.inviteNow
                          ? 'border-[#2e1a87] bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-start">
                          <div className="text-2xl mr-3">📨</div>
                          <div className="text-left">
                            <div className="font-medium">Send invitation now</div>
                            <div className="text-sm text-gray-600">We'll help you send them an invitation to collaborate</div>
                          </div>
                        </div>
                        {data.coParentData.inviteNow && (
                          <CheckCircle className="h-5 w-5 text-[#2e1a87] ml-3" />
                        )}
                      </div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => updateCoParentData('inviteNow', 'false')}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-start ${
                        !data.coParentData.inviteNow
                          ? 'border-[#2e1a87] bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-start">
                          <div className="text-2xl mr-3">🕓</div>
                          <div className="text-left">
                            <div className="font-medium">I'll invite them later</div>
                            <div className="text-sm text-gray-600">Focus on building your plan first</div>
                          </div>
                        </div>
                        {!data.coParentData.inviteNow && (
                          <CheckCircle className="h-5 w-5 text-[#2e1a87] ml-3" />
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <Label className="text-lg">Children Information *</Label>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addChild}
                    className="text-[#2e1a87]"
                  >
                    Add Another Child
                  </Button>
                </div>
                
                {/* Show one child by default */}
                {data.children.length === 0 && (
                  <div className="border rounded-lg p-4 space-y-4">
                    <h4 className="font-medium">Child 1</h4>
                    
                    <Input
                      value=""
                      onChange={(e) => {
                        if (data.children.length === 0) {
                          onDataUpdate({
                            ...data,
                            children: [{ fullName: e.target.value, dateOfBirth: '', gender: '' }]
                          });
                        } else {
                          updateChild(0, 'fullName', e.target.value);
                        }
                      }}
                      placeholder="Child's Full Name"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Date of Birth</Label>
                        <Input
                          type="date"
                          value=""
                          onChange={(e) => {
                            if (data.children.length === 0) {
                              onDataUpdate({
                                ...data,
                                children: [{ fullName: '', dateOfBirth: e.target.value, gender: '' }]
                              });
                            } else {
                              updateChild(0, 'dateOfBirth', e.target.value);
                            }
                          }}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label>Gender</Label>
                        <Select value="" onValueChange={(value) => {
                          if (data.children.length === 0) {
                            onDataUpdate({
                              ...data,
                              children: [{ fullName: '', dateOfBirth: '', gender: value }]
                            });
                          } else {
                            updateChild(0, 'gender', value);
                          }
                        }}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
                
                {data.children.map((child, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Child {index + 1}</h4>
                      {data.children.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeChild(index)}
                          className="text-red-600"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    
                    <Input
                      value={child.fullName}
                      onChange={(e) => updateChild(index, 'fullName', e.target.value)}
                      placeholder="Child's Full Name"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Date of Birth</Label>
                        <Input
                          type="date"
                          value={child.dateOfBirth}
                          onChange={(e) => updateChild(index, 'dateOfBirth', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label>Gender</Label>
                        <Select value={child.gender} onValueChange={(value) => updateChild(index, 'gender', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="jurisdiction">What U.S. state will you be filing for divorce or separation? *</Label>
                  <Select value={data.jurisdiction} onValueChange={(value) => onDataUpdate({ ...data, jurisdiction: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AL">Alabama</SelectItem>
                      <SelectItem value="AK">Alaska</SelectItem>
                      <SelectItem value="AZ">Arizona</SelectItem>
                      <SelectItem value="AR">Arkansas</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="CO">Colorado</SelectItem>
                      <SelectItem value="CT">Connecticut</SelectItem>
                      <SelectItem value="DE">Delaware</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="GA">Georgia</SelectItem>
                      <SelectItem value="HI">Hawaii</SelectItem>
                      <SelectItem value="ID">Idaho</SelectItem>
                      <SelectItem value="IL">Illinois</SelectItem>
                      <SelectItem value="IN">Indiana</SelectItem>
                      <SelectItem value="IA">Iowa</SelectItem>
                      <SelectItem value="KS">Kansas</SelectItem>
                      <SelectItem value="KY">Kentucky</SelectItem>
                      <SelectItem value="LA">Louisiana</SelectItem>
                      <SelectItem value="ME">Maine</SelectItem>
                      <SelectItem value="MD">Maryland</SelectItem>
                      <SelectItem value="MA">Massachusetts</SelectItem>
                      <SelectItem value="MI">Michigan</SelectItem>
                      <SelectItem value="MN">Minnesota</SelectItem>
                      <SelectItem value="MS">Mississippi</SelectItem>
                      <SelectItem value="MO">Missouri</SelectItem>
                      <SelectItem value="MT">Montana</SelectItem>
                      <SelectItem value="NE">Nebraska</SelectItem>
                      <SelectItem value="NV">Nevada</SelectItem>
                      <SelectItem value="NH">New Hampshire</SelectItem>
                      <SelectItem value="NJ">New Jersey</SelectItem>
                      <SelectItem value="NM">New Mexico</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="NC">North Carolina</SelectItem>
                      <SelectItem value="ND">North Dakota</SelectItem>
                      <SelectItem value="OH">Ohio</SelectItem>
                      <SelectItem value="OK">Oklahoma</SelectItem>
                      <SelectItem value="OR">Oregon</SelectItem>
                      <SelectItem value="PA">Pennsylvania</SelectItem>
                      <SelectItem value="RI">Rhode Island</SelectItem>
                      <SelectItem value="SC">South Carolina</SelectItem>
                      <SelectItem value="SD">South Dakota</SelectItem>
                      <SelectItem value="TN">Tennessee</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="UT">Utah</SelectItem>
                      <SelectItem value="VT">Vermont</SelectItem>
                      <SelectItem value="VA">Virginia</SelectItem>
                      <SelectItem value="WA">Washington</SelectItem>
                      <SelectItem value="WV">West Virginia</SelectItem>
                      <SelectItem value="WI">Wisconsin</SelectItem>
                      <SelectItem value="WY">Wyoming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Why we need this information</p>
                      <p>Each state has different laws regarding parenting plans and custody arrangements. This helps us provide you with accurate, state-specific guidance.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="text-center space-y-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                <h3 className="text-2xl font-bold text-gray-900">You're all set!</h3>
                <p className="text-gray-600 text-lg">
                  Thank you for completing the onboarding process. We now have everything we need to help you create a comprehensive co-parenting plan.
                </p>
                
                <div className="bg-purple-50 p-6 rounded-lg text-left">
                  <h4 className="font-semibold text-[#2e1a87] mb-3">What happens next:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      Access your personalized dashboard
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      Begin building your parenting plan
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      Invite your co-parent when you're ready
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      Get guidance tailored to your state's laws
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!isStepComplete()}
                className="bg-[#2e1a87] hover:bg-[#3d2a9b] flex items-center"
              >
                {currentStep === totalSteps ? 'Get Started' : 'Next'}
                {currentStep !== totalSteps && <ArrowRight className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Main Onboarding Container
export default function OnboardingPeech() {
  const [currentPart, setCurrentPart] = useState<1 | 2>(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    emotionalIntro: {
      feeling: [],
      situation: '',
      priority: []
    },
    userData: {
      legalName: '',
      address: { street: '', city: '', state: '', zip: '' },
      phoneNumber: '',
      email: ''
    },
    coParentData: {
      legalName: '',
      address: { street: '', city: '', state: '', zip: '' },
      phoneNumber: '',
      email: '',
      inviteNow: false
    },
    children: [],
    jurisdiction: ''
  });

  const handlePartOneComplete = () => {
    setCurrentPart(2);
  };

  const handlePartTwoComplete = () => {
    // Handle completion - could redirect to dashboard, save data, etc.
    console.log('Onboarding complete:', onboardingData);
    // For now, just redirect to home
    window.location.href = '/';
  };

  const updateEmotionalIntroData = (data: EmotionalIntroData) => {
    setOnboardingData(prev => ({ ...prev, emotionalIntro: data }));
  };

  const updateProfileData = (data: Omit<OnboardingData, 'emotionalIntro'>) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  };

  return (
    <>
      {currentPart === 1 && (
        <PartOneIntroFlow
          onComplete={handlePartOneComplete}
          data={onboardingData.emotionalIntro}
          onDataUpdate={updateEmotionalIntroData}
        />
      )}
      
      {currentPart === 2 && (
        <PartTwoProfileForm
          onComplete={handlePartTwoComplete}
          data={{
            userData: onboardingData.userData,
            coParentData: onboardingData.coParentData,
            children: onboardingData.children,
            jurisdiction: onboardingData.jurisdiction
          }}
          onDataUpdate={updateProfileData}
        />
      )}
    </>
  );
}