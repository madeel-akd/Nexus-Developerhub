import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, PieChart, Filter, Search, PlusCircle, CreditCard, Video, X, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { EntrepreneurCard } from '../../components/entrepreneur/EntrepreneurCard';
import { useAuth } from '../../context/AuthContext';
import { entrepreneurs } from '../../data/users';
import { getRequestsFromInvestor } from '../../data/collaborationRequests';
import { MeetingCalendar } from './MeetingCalendar'; // Shared component
import { VideoCallingSection } from '../../components/collaboration/VideoCallingSection'; // Shared component

export const InvestorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [isMeetingActive, setIsMeetingActive] = useState(false);
  
  if (!user) return null;
  
  const sentRequests = getRequestsFromInvestor(user.id);
  const industries = Array.from(new Set(entrepreneurs.map(e => e.industry)));

  const filteredEntrepreneurs = entrepreneurs.filter(entrepreneur => {
    const matchesSearch = searchQuery === '' || 
      entrepreneur.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.startupName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(entrepreneur.industry);
    return matchesSearch && matchesIndustry;
  });

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev => prev.includes(industry) ? prev.filter(i => i !== industry) : [...prev, industry]);
  };
  
  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
          <p className="text-gray-600">Discover and manage your startup portfolio</p>
        </div>
        <Link to="/entrepreneurs">
          <Button leftIcon={<PlusCircle size={18} />}>Explore All Startups</Button>
        </Link>
      </div>

      {/* 2. SHARED FEATURE: SUMMARY CARDS (Wallet, Discovery, Connections) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-amber-50 border border-amber-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-amber-100 rounded-full mr-4">
                <CreditCard size={20} className="text-amber-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-700">Investment Wallet</p>
                <h3 className="text-xl font-semibold text-amber-900">$50,000.00</h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-primary-50 border border-primary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-full mr-4">
                <PieChart size={20} className="text-primary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-700">Available Industries</p>
                <h3 className="text-xl font-semibold text-primary-900">{industries.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-accent-50 border border-accent-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-accent-100 rounded-full mr-4">
                <Users size={20} className="text-accent-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent-700">Active Deals</p>
                <h3 className="text-xl font-semibold text-accent-900">
                  {sentRequests.filter(req => req.status === 'accepted').length}
                </h3>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* 3. SEARCH & FILTERS */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search startups or founders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            startAdornment={<Search size={18} />}
          />
        </div>
        <div className="w-full md:w-1/3 flex items-center gap-2 overflow-x-auto pb-2">
          <Filter size={18} className="text-gray-500 shrink-0" />
          {industries.map(industry => (
            <Badge
              key={industry}
              variant={selectedIndustries.includes(industry) ? 'primary' : 'gray'}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => toggleIndustry(industry)}
            >
              {industry}
            </Badge>
          ))}
        </div>
      </div>

      {/* 4. MAIN DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Calendar & Discovery */}
        <div className="lg:col-span-2 space-y-6">
          <MeetingCalendar />
          
          <Card>
            <CardHeader><h2 className="text-lg font-bold">Featured Startups</h2></CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEntrepreneurs.map(entrepreneur => (
                  <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* RIGHT COLUMN: Video Room & Portfolio Summary */}
        <div className="space-y-6">
          {/* SHARED FEATURE: VIRTUAL ROOM CARD */}
          <Card className="border-primary-100 bg-gradient-to-br from-white to-primary-50/50 shadow-sm overflow-hidden">
            <CardBody className="p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary-600 rounded-xl text-white shadow-lg">
                  <Video size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Investor Lounge</h3>
                  <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> HD Quality Active
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-5">
                Join scheduled pitch sessions or conduct private due diligence calls with founders.
              </p>
              <Button 
                className="w-full h-11" 
                onClick={() => setIsMeetingActive(true)}
                rightIcon={<ArrowRight size={18} />}
              >
                Enter Meeting Room
              </Button>
            </CardBody>
          </Card>

          {/* Activity Log */}
          <Card>
            <CardHeader><h2 className="text-md font-bold">Recent Interest</h2></CardHeader>
            <CardBody className="p-0">
                <div className="divide-y divide-gray-100">
                    {sentRequests.slice(0, 4).map(req => (
                        <div key={req.id} className="p-4 flex items-center justify-between">
                            <span className="text-sm text-gray-700 font-medium">Request to {req.entrepreneurId}</span>
                            <Badge variant={req.status === 'accepted' ? 'success' : 'warning'}>{req.status}</Badge>
                        </div>
                    ))}
                </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* SHARED FEATURE: VIDEO MODAL */}
      {isMeetingActive && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-900/95 backdrop-blur-md p-4">
          <button onClick={() => setIsMeetingActive(false)} className="fixed top-6 right-6 z-[110] p-3 bg-white/10 text-white rounded-full"><X size={32} /></button>
          <div className="w-full max-w-4xl">
             <div className="mb-4 text-center text-white"><h2 className="text-xl font-bold">Solifys Secure Deal Room</h2></div>
             <div className="bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <VideoCallingSection onEndCall={() => setIsMeetingActive(false)} />
             </div>
          </div>
        </div>
      )}
    </div>
  );
};