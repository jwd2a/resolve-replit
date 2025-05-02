import { useState } from "react";
import { useLocation } from "wouter";
import { NavigationMenu } from "@/components/NavigationMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  ArrowRight, 
  Users, 
  Mail, 
  Share2, 
  Copy, 
  Info, 
  CheckCircle,
  Send,
  Link as LinkIcon
} from "lucide-react";

export default function CoParentInvitation() {
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  
  const [coParentEmail, setCoParentEmail] = useState<string>("john.smith@example.com");
  const [message, setMessage] = useState<string>("Hi John, I'm setting up our co-parenting plan on Resolve. Please join me so we can work on this together.");
  const [includeMessage, setIncludeMessage] = useState<boolean>(true);
  const [invitationSent, setInvitationSent] = useState<boolean>(false);
  
  const invitationLink = "https://resolve.com/join/123456";
  
  const sendInvitation = () => {
    if (!coParentEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your co-parent's email address.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send an invitation email to the co-parent
    setInvitationSent(true);
    toast({
      title: "Invitation Sent",
      description: "An invitation has been sent to your co-parent."
    });
  };
  
  const copyInvitationLink = () => {
    navigator.clipboard.writeText(invitationLink);
    toast({
      title: "Link Copied",
      description: "The invitation link has been copied to your clipboard."
    });
  };
  
  const handleContinue = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-[#f9f7fe]">
      <NavigationMenu />
      
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="text-[#2e1a87] hover:text-[#2e1a87]/80 hover:bg-[#f5f0ff]"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#6c54da]/20 p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-5">
              <div className="bg-[#f5f0ff] p-2 rounded-md">
                <Users className="h-5 w-5 text-[#6c54da]" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#2e1a87]">Invite Co-Parent</h1>
                <p className="text-gray-600 text-sm mt-1">
                  Send an invitation to your co-parent to join the platform.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <Info className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-700 mb-2">
                    Both parents need to be registered on the platform to create a complete and
                    effective parenting plan. Your co-parent will be guided through their own setup process.
                  </p>
                  <p className="text-sm text-blue-700">
                    All communication remains respectful and focused on your children's best interests.
                  </p>
                </div>
              </div>
            </div>
            
            {invitationSent ? (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-green-800 text-sm">Invitation Sent</h3>
                      <p className="text-green-700 text-sm mt-1">
                        An invitation has been sent to {coParentEmail}. We'll notify you once they join.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-5">
                  <h3 className="text-[#2e1a87] font-medium mb-4">Share Invitation Link</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    You can also share this invitation link directly with your co-parent:
                  </p>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <div className="bg-gray-100 text-gray-700 px-3 py-2 text-sm rounded-md flex-grow overflow-x-auto whitespace-nowrap">
                      {invitationLink}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-shrink-0"
                      onClick={copyInvitationLink}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
                    <Button 
                      variant="outline"
                      className="w-full sm:w-auto gap-2"
                      onClick={() => window.open(`mailto:${coParentEmail}?subject=Join me on Resolve&body=I've invited you to join Resolve to create our parenting plan. Click here to join: ${invitationLink}`, "_blank")}
                    >
                      <Mail className="h-4 w-4" />
                      Send as Email
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full sm:w-auto gap-2"
                      onClick={() => window.open(`sms:?&body=I've invited you to join Resolve to create our parenting plan. Click here to join: ${invitationLink}`, "_blank")}
                    >
                      <Share2 className="h-4 w-4" />
                      Send as Text
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <Button 
                    variant="link"
                    className="text-[#2e1a87]"
                    onClick={() => setInvitationSent(false)}
                  >
                    Send Another Invitation
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Co-Parent's Email Address</Label>
                    <div className="flex gap-2 mt-1.5">
                      <div className="relative flex-grow">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input 
                          id="email"
                          type="email"
                          className="pl-10"
                          value={coParentEmail}
                          onChange={(e) => setCoParentEmail(e.target.value)}
                          placeholder="Enter email address"
                        />
                      </div>
                      <Button 
                        className="bg-[#2e1a87] hover:bg-[#25156d] gap-2 px-4"
                        onClick={sendInvitation}
                      >
                        <Send className="h-4 w-4" />
                        Send Invitation
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <Switch 
                      id="include-message" 
                      checked={includeMessage}
                      onCheckedChange={setIncludeMessage}
                    />
                    <Label htmlFor="include-message" className="text-sm">Include a personal message</Label>
                  </div>
                  
                  {includeMessage && (
                    <div className="mt-3">
                      <Label htmlFor="message">Personal Message (Optional)</Label>
                      <Textarea 
                        id="message"
                        className="min-h-24 mt-1.5"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Add a personal message to your co-parent..."
                      />
                    </div>
                  )}
                </div>
                
                <div className="border-t border-dashed border-gray-200 pt-6 mt-6">
                  <h3 className="text-[#2e1a87] font-medium mb-4 flex items-center">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Share Invitation Link
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    You can also share this invitation link directly with your co-parent:
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 text-gray-700 px-3 py-2 text-sm rounded-md flex-grow overflow-x-auto whitespace-nowrap">
                      {invitationLink}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-shrink-0"
                      onClick={copyInvitationLink}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between">
              <Button 
                variant="ghost" 
                className="text-[#2e1a87]"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              {invitationSent && (
                <Button 
                  className="bg-[#2e1a87] hover:bg-[#25156d]"
                  onClick={handleContinue}
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}