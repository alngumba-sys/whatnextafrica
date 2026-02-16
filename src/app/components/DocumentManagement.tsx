import { useState } from 'react';
import { documents, Document } from '../data/mockData';
import { FileText, Download, Upload, Eye, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentManagementProps {
  onAddDocument: () => void;
}

export function DocumentManagement({ onAddDocument }: DocumentManagementProps) {
  const [categoryFilter, setCategoryFilter] = useState<'all' | Document['category']>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getCategoryIcon = (category: Document['category']) => {
    return <FileText className="w-5 h-5" />;
  };

  const getCategoryColor = (category: Document['category']) => {
    const colors: Record<Document['category'], string> = {
      'drawings': 'bg-blue-600',
      'specs': 'bg-purple-600',
      'submittals': 'bg-cyan-600',
      'rfis': 'bg-amber-600',
      'contracts': 'bg-green-600',
      'safety': 'bg-red-600',
      'photos': 'bg-pink-600',
      'reports': 'bg-indigo-600',
    };
    return colors[category];
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'current':
        return 'bg-green-950/30 border-green-600/50 text-green-400';
      case 'superseded':
        return 'bg-amber-950/30 border-amber-600/50 text-amber-400';
      case 'void':
        return 'bg-red-950/30 border-red-600/50 text-red-400';
    }
  };

  const filteredDocuments = documents.filter((doc) => {
    if (categoryFilter !== 'all' && doc.category !== categoryFilter) return false;
    if (searchTerm && !doc.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const docStats = {
    total: documents.length,
    current: documents.filter((d) => d.status === 'current').length,
    superseded: documents.filter((d) => d.status === 'superseded').length,
    byCategory: documents.reduce((acc, doc) => {
      acc[doc.category] = (acc[doc.category] || 0) + 1;
      return acc;
    }, {} as Record<Document['category'], number>),
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-xs mb-1">Total Documents</div>
          <div className="text-2xl font-bold text-white">{docStats.total}</div>
        </div>
        <div className="bg-green-950/30 rounded-lg p-4 border border-green-600/50">
          <div className="text-green-400 text-xs mb-1">Current</div>
          <div className="text-2xl font-bold text-green-400">{docStats.current}</div>
        </div>
        <div className="bg-amber-950/30 rounded-lg p-4 border border-amber-600/50">
          <div className="text-amber-400 text-xs mb-1">Superseded</div>
          <div className="text-2xl font-bold text-amber-400">{docStats.superseded}</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-xs mb-1">Drawings</div>
          <div className="text-2xl font-bold text-cyan-400">{docStats.byCategory.drawings || 0}</div>
        </div>
      </div>

      {/* Filters and Upload */}
      <div className="flex flex-wrap gap-2 justify-between">
        <div className="flex flex-wrap gap-2 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Categories</option>
            <option value="drawings">Drawings</option>
            <option value="specs">Specifications</option>
            <option value="submittals">Submittals</option>
            <option value="rfis">RFIs</option>
            <option value="contracts">Contracts</option>
            <option value="safety">Safety</option>
            <option value="photos">Photos</option>
            <option value="reports">Reports</option>
          </select>
        </div>

        <button
          onClick={onAddDocument}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded flex items-center gap-2 text-sm"
        >
          <Upload className="w-4 h-4" />
          <span>Upload</span>
        </button>
      </div>

      {/* Documents Table */}
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="text-left text-slate-300 font-semibold py-3 px-4">Document Name</th>
                <th className="text-left text-slate-300 font-semibold py-3 px-4">Project</th>
                <th className="text-left text-slate-300 font-semibold py-3 px-4">Category</th>
                <th className="text-center text-slate-300 font-semibold py-3 px-4">Version</th>
                <th className="text-left text-slate-300 font-semibold py-3 px-4">Uploaded By</th>
                <th className="text-left text-slate-300 font-semibold py-3 px-4">Date</th>
                <th className="text-center text-slate-300 font-semibold py-3 px-4">Status</th>
                <th className="text-right text-slate-300 font-semibold py-3 px-4">Size</th>
                <th className="text-center text-slate-300 font-semibold py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="border-t border-slate-700 hover:bg-slate-800/70">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(doc.category)}
                      <div>
                        <div className="text-white font-medium">{doc.name}</div>
                        {doc.tags && doc.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {doc.tags.map((tag, idx) => (
                              <span key={idx} className="text-xs px-1.5 py-0.5 bg-slate-700 text-slate-400 rounded">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{doc.project}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs text-white ${getCategoryColor(doc.category)}`}>
                      {doc.category}
                    </span>
                  </td>
                  <td className="text-center py-3 px-4 text-white font-mono">{doc.version}</td>
                  <td className="py-3 px-4 text-slate-300">{doc.uploadedBy}</td>
                  <td className="py-3 px-4 text-slate-300">{doc.uploadDate}</td>
                  <td className="text-center py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded border text-xs font-semibold ${getStatusColor(doc.status)}`}>
                      {doc.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="text-right py-3 px-4 text-slate-300 font-mono text-xs">{doc.size}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => toast.info('Viewing document', { description: doc.name })}
                        className="p-1.5 hover:bg-slate-700 rounded transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4 text-cyan-400" />
                      </button>
                      <button
                        onClick={() => toast.success('Downloading document', { description: doc.name })}
                        className="p-1.5 hover:bg-slate-700 rounded transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4 text-green-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No documents found matching the selected filters</p>
        </div>
      )}
    </div>
  );
}