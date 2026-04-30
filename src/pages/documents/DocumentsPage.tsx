import React, { useState } from 'react';
import { FileText, Upload, Download, Trash2, CheckCircle, Clock, PenTool, Loader2, X } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const initialDocs = [
  { id: 1, name: 'Investment_Agreement.pdf', size: '2.4 MB', status: 'Signed', date: '2026-04-20' },
  { id: 2, name: 'Terms_of_Service_Draft.docx', size: '1.1 MB', status: 'Draft', date: '2026-04-28' },
  { id: 3, name: 'Partnership_Contract.pdf', size: '3.2 MB', status: 'In Review', date: '2026-05-01' }
];

export const  DocumentsPage: React.FC = () => {
  const [docs, setDocs] = useState(initialDocs);
  const [isUploading, setIsUploading] = useState(false);
  const [signingDocId, setSigningDocId] = useState<number | null>(null);

  // 1. Fix: Functioning Upload Option
  const handleUpload = () => {
    setIsUploading(true);
    // Simulate a network upload delay
    setTimeout(() => {
      const newDoc = {
        id: Date.now(),
        name: `New_Contract_${docs.length + 1}.pdf`,
        size: '1.5 MB',
        status: 'Draft',
        date: new Date().toISOString().split('T')[0]
      };
      setDocs([newDoc, ...docs]);
      setIsUploading(false);
    }, 1500);
  };

  // 2. Fix: Sign Button Logic
  const handleApplySignature = () => {
    if (signingDocId) {
      setDocs(docs.map(doc => 
        doc.id === signingDocId ? { ...doc, status: 'Signed' } : doc
      ));
      setSigningDocId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Document Processing Chamber</h1>
        <Button 
          onClick={handleUpload} 
          disabled={isUploading}
          leftIcon={isUploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
        >
          {isUploading ? 'Uploading...' : 'Upload Contract'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><h2 className="text-lg font-medium">Active Deals & Contracts</h2></CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-100">
                {docs.map(doc => (
                  <div key={doc.id} className={`flex items-center p-4 transition-colors ${signingDocId === doc.id ? 'bg-primary-50' : 'hover:bg-gray-50'}`}>
                    <FileText className="text-primary-600 mr-4" size={24} />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{doc.name}</h3>
                      <div className="flex gap-3 text-xs text-gray-500 mt-1">
                        <span>{doc.size}</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={doc.status === 'Signed' ? 'success' : doc.status === 'In Review' ? 'warning' : 'secondary'}>
                        {doc.status}
                      </Badge>
                      {doc.status !== 'Signed' && (
                        <Button 
                          size="sm" 
                          variant={signingDocId === doc.id ? "primary" : "outline"} 
                          onClick={() => setSigningDocId(doc.id)}
                          leftIcon={<PenTool size={14}/>}
                        >
                          Sign
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* E-Signature Panel */}
        <div className="lg:col-span-1">
          {signingDocId ? (
            <Card className="border-primary-500 ring-1 ring-primary-500 animate-in fade-in slide-in-from-right-4">
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Sign Document</h2>
                <button onClick={() => setSigningDocId(null)}><X size={18} className="text-gray-400" /></button>
              </CardHeader>
              <CardBody className="space-y-4">
                <p className="text-xs text-gray-500">Signing as: <span className="font-bold text-gray-900">Muhammad Adeel</span></p>
                <div className="border-2 border-dashed border-gray-200 rounded-lg h-32 bg-white flex items-center justify-center relative">
                  <span className="text-gray-300 italic select-none">Draw your signature here</span>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" variant="outline" onClick={() => setSigningDocId(null)}>Cancel</Button>
                  <Button className="flex-1" onClick={handleApplySignature}>Confirm</Button>
                </div>
              </CardBody>
            </Card>
          ) : (
            <div className="h-full border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-8 text-center text-gray-400">
              <PenTool size={48} className="mb-4 opacity-20" />
              <p>Select a "Draft" document to enable the signature pad.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};