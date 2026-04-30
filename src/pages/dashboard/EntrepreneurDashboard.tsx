import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Bell, CreditCard, TrendingUp, AlertCircle, PlusCircle, Video, X, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CollaborationRequestCard } from '../../components/collaboration/CollaborationRequestCard';
import { InvestorCard } from '../../components/investor/InvestorCard';
import { useAuth } from '../../context/AuthContext';
import { CollaborationRequest } from '../../types';
import { getRequestsForEntrepreneur } from '../../data/collaborationRequests';
import { investors } from '../../data/users';
import { MeetingCalendar } from './MeetingCalendar';
import { VideoCallingSection } from '../../components/collaboration/VideoCallingSection';

export const EntrepreneurDashboard: React.FC = () => {
  const { user } = useAuth();
  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>([]);
  const [recommendedInvestors, setRecommendedInvestors] = useState(investors.slice(0, 3));
  const [isMeetingActive, setIsMeetingActive] = useState(false);
  
  useEffect(() => {
    if (user) {
      const requests = getRequestsForEntrepreneur(user.id);
      setCollaborationRequests(requests);
    }
  }, [user]);
  
  const handleRequestStatusUpdate = (requestId: string, status: 'accepted' | 'rejected') => {
    setCollaborationRequests(prevRequests => 
      prevRequests.map(req => req.id === requestId ? { ...req, status } : req)
    );
  };
  
  if (!user) return null;
  
  const pendingRequests = collaborationRequests.filter(req => req.status === 'pending');
  
  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* 1. HEADER SECTION */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
          <p className="text-gray-600">Here's what's happening with your startup today</p>
        </div>
        <Link to="/investors">
          <Button leftIcon={<PlusCircle size={18} />}>Find Investors</Button>
        </Link>
      </div>
      
      {/* 2. SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    
        <Card className="bg-primary-50 border border-primary-100">
          <Card className="bg-amber-50 border border-amber-100">
  <CardBody>
    <div className="flex items-center">
      <div className="p-3 bg-amber-100 rounded-full mr-4">
        <CreditCard size={20} className="text-amber-700" />
      </div>
      <div>
        <p className="text-sm font-medium text-amber-700">Wallet Balance</p>
        <h3 className="text-xl font-semibold text-amber-900">$12,450.00</h3>
      </div>
    </div>
  </CardBody>
</Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-full mr-4">
                <Bell size={20} className="text-primary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-700">Pending Requests</p>
                <h3 className="text-xl font-semibold text-primary-900">{pendingRequests.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>
        {/* (Add other summary cards as in your original code) */}
      </div>

      {/* 3. MAIN DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT & CENTER COLUMN (Calendar & Requests) */}
        <div className="lg:col-span-2 space-y-6">
          <MeetingCalendar />
          
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Collaboration Requests</h2>
              <Badge variant="primary">{pendingRequests.length} pending</Badge>
            </CardHeader>
            <CardBody>
              {collaborationRequests.length > 0 ? (
                <div className="space-y-4">
                  {collaborationRequests.map(request => (
                    <CollaborationRequestCard
                      key={request.id}
                      request={request}
                      onStatusUpdate={handleRequestStatusUpdate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle size={24} className="mx-auto mb-2 opacity-50" />
                  <p>No collaboration requests yet</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
        
        {/* RIGHT COLUMN (Video Join & Investors) */}
        <div className="space-y-6">
          
          {/* FUNCTIONAL JOIN MEETING CARD */}
          <Card className="border-primary-100 bg-gradient-to-br from-white to-primary-50/50 shadow-sm overflow-hidden">
            <CardBody className="p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary-600 rounded-xl text-white shadow-lg shadow-primary-200">
                  <Video size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Virtual Room</h3>
                  <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Available Now
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                Start or join a secure encrypted video call with your potential investors.
              </p>
              <Button 
                className="w-full h-11" 
                onClick={() => setIsMeetingActive(true)}
                rightIcon={<ArrowRight size={18} />}
              >
                Join Meeting Room
              </Button>
            </CardBody>
          </Card>

          {/* Recommended Investors Card */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Recommended</h2>
              <Link to="/investors" className="text-sm font-medium text-primary-600">View all</Link>
            </CardHeader>
            <CardBody className="space-y-4">
              {recommendedInvestors.map(investor => (
                <InvestorCard key={investor.id} investor={investor} showActions={false} />
              ))}
            </CardBody>
          </Card>
        </div>
      </div>

     {isMeetingActive && (
  <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-900/95 backdrop-blur-md p-4 overflow-y-auto">
    
    {/* EXIT BUTTON (Top Right) */}
    <button 
      onClick={() => setIsMeetingActive(false)}
      className="fixed top-6 right-6 z-[110] p-3 bg-white/10 hover:bg-red-500/20 text-white rounded-full transition-all group border border-white/10"
      title="Exit Room"
    >
      <X size={32} className="group-hover:scale-110" />
    </button>

    <div className="w-full max-w-4xl animate-in zoom-in-95 duration-300">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold text-white tracking-tight">Solifys Meeting Room</h2>
        <p className="text-gray-400 text-sm">Secure WebRTC Session</p>
      </div>

      {/* THE VIDEO BLOCK */}
      <div className="bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/5 ring-1 ring-white/10">
        <VideoCallingSection onEndCall={() => setIsMeetingActive(false)} />
      </div>
      
      <p className="mt-4 text-center text-xs text-gray-500 uppercase tracking-widest">
        End the call or click the X to return to dashboard
      </p>
    </div>
  </div>
)}
    </div>
  );
};