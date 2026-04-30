import React, { useState } from 'react';
import { CreditCard, ArrowUpRight, ArrowDownLeft, Send, History, Plus } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Sidebar } from '../../components/layout/Sidebar'; // Ensure path is correct
import { Navbar } from '../../components/layout/Navbar';   // Ensure path is correct

export const PaymentsPage: React.FC = () => {
  const [balance, setBalance] = useState(12450.00);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* 1. SIDEBAR */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* 2. NAVBAR */}
        <Navbar />

        {/* 3. MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Payments & Wallet</h1>
                <p className="text-gray-600">Manage your startup funding and transactions</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" leftIcon={<ArrowDownLeft size={18} />}>Withdraw</Button>
                <Button leftIcon={<Plus size={18} />}>Deposit Funds</Button>
              </div>
            </div>

            {/* Wallet Overview & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none shadow-xl">
                <CardBody className="p-8 flex justify-between items-center">
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-1">Available Balance</p>
                    <h2 className="text-4xl font-bold">${balance.toLocaleString()}</h2>
                    <div className="mt-6 flex gap-4">
                      <div className="flex items-center gap-2 text-green-400 text-sm">
                        <ArrowUpRight size={16} /> +12% this month
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block opacity-20">
                    <CreditCard size={120} />
                  </div>
                </CardBody>
              </Card>

              <Card className="border-gray-200">
                <CardHeader className="border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Quick Transfer</h3>
                </CardHeader>
                <CardBody className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Recipient</label>
                    <input 
                        type="text" 
                        placeholder="Recipient ID or Email" 
                        className="w-full mt-1 p-2 border border-gray-200 rounded-md text-sm focus:ring-2 ring-primary-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Amount</label>
                    <input 
                        type="number" 
                        placeholder="0.00" 
                        className="w-full mt-1 p-2 border border-gray-200 rounded-md text-sm focus:ring-2 ring-primary-500 outline-none transition-all"
                    />
                  </div>
                  <Button className="w-full" leftIcon={<Send size={16} />}>Send Money</Button>
                </CardBody>
              </Card>
            </div>

            {/* Transaction History */}
            <Card className="border-gray-200">
              <CardHeader className="border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History size={20} className="text-gray-500" />
                  <h2 className="text-lg font-bold text-gray-900">Transaction History</h2>
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </CardHeader>
              <CardBody className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-wider font-bold">
                      <tr>
                        <th className="px-6 py-4">Transaction ID</th>
                        <th className="px-6 py-4">Entity</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-gray-500">#TX-99281</td>
                        <td className="px-6 py-4 font-medium text-gray-900">TechSeed Ventures</td>
                        <td className="px-6 py-4 text-gray-600">Investment</td>
                        <td className="px-6 py-4 font-bold text-green-600">+$10,000.00</td>
                        <td className="px-6 py-4">
                          <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-[10px] font-bold">SUCCESS</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-gray-500">#TX-99275</td>
                        <td className="px-6 py-4 font-medium text-gray-900">Cloud Hosting</td>
                        <td className="px-6 py-4 text-gray-600">Service Fee</td>
                        <td className="px-6 py-4 font-bold text-gray-900">-$150.00</td>
                        <td className="px-6 py-4">
                          <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-[10px] font-bold">SUCCESS</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};