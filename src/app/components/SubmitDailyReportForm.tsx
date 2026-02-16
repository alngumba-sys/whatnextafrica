import { useState } from 'react';
import { FileText, Users, Wrench, AlertTriangle, Upload, MapPin, Clock, CheckCircle, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

export function SubmitDailyReportForm() {
  const [laborEntries, setLaborEntries] = useState([
    { trade: 'Carpenters', count: '8' },
    { trade: 'Electricians', count: '4' },
    { trade: 'General Labor', count: '12' },
  ]);

  const [progressEntries, setProgressEntries] = useState([
    { activity: 'Foundation Formwork - Level 3', progress: '100', status: 'complete', notes: 'Quality inspection passed' },
    { activity: 'Rebar Installation - Grid A-D', progress: '65', status: 'active', notes: 'Grid A and B complete' },
  ]);

  const [materialEntries, setMaterialEntries] = useState([
    { material: 'Concrete - Grade M30', quantity: '45 m³', supplier: 'Bamburi Cement', inspected: true },
    { material: 'Reinforcement Steel - 20mm', quantity: '8.5 tons', supplier: 'Steel Masters Kenya', inspected: true },
  ]);

  const [issueEntries, setIssueEntries] = useState([
    { issue: 'Material Delay', description: 'Electrical conduit delivery postponed to tomorrow' },
  ]);

  const [equipmentEntries, setEquipmentEntries] = useState([
    { equipment: 'Tower Crane', quantity: '1 unit' },
    { equipment: 'Concrete Mixer', quantity: '2 units' },
  ]);

  const addLaborEntry = () => {
    setLaborEntries([...laborEntries, { trade: '', count: '' }]);
  };

  const removeLaborEntry = (index: number) => {
    setLaborEntries(laborEntries.filter((_, i) => i !== index));
  };

  const addProgressEntry = () => {
    setProgressEntries([...progressEntries, { activity: '', progress: '', status: 'active', notes: '' }]);
  };

  const removeProgressEntry = (index: number) => {
    setProgressEntries(progressEntries.filter((_, i) => i !== index));
  };

  const addMaterialEntry = () => {
    setMaterialEntries([...materialEntries, { material: '', quantity: '', supplier: '', inspected: false }]);
  };

  const removeMaterialEntry = (index: number) => {
    setMaterialEntries(materialEntries.filter((_, i) => i !== index));
  };

  const addIssueEntry = () => {
    setIssueEntries([...issueEntries, { issue: '', description: '' }]);
  };

  const removeIssueEntry = (index: number) => {
    setIssueEntries(issueEntries.filter((_, i) => i !== index));
  };

  const addEquipmentEntry = () => {
    setEquipmentEntries([...equipmentEntries, { equipment: '', quantity: '' }]);
  };

  const removeEquipmentEntry = (index: number) => {
    setEquipmentEntries(equipmentEntries.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const totalCrew = laborEntries.reduce((sum, entry) => sum + (parseInt(entry.count) || 0), 0);
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Submitting daily report...',
        success: () => {
          return `Daily Report Submitted Successfully!\n\n` +
                 `Total Crew: ${totalCrew} workers\n` +
                 `Progress Entries: ${progressEntries.length}\n` +
                 `Materials Logged: ${materialEntries.length}\n\n` +
                 `Report will be included in tomorrow's executive summary and emailed to stakeholders.`;
        },
        error: 'Failed to submit report',
      }
    );
  };

  return (
    <div className="bg-slate-900/50 rounded-lg p-4 sm:p-6 border border-slate-700 max-h-[calc(100vh-200px)] overflow-y-auto">
      <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2 sticky top-0 bg-slate-900/50 backdrop-blur-sm pb-2 z-10">
        <FileText className="w-5 h-5 text-cyan-400" />
        Submit Daily Report
      </h3>
      
      <div className="bg-cyan-950/30 border border-cyan-600/50 rounded-lg p-3 mb-4 sticky top-12 bg-slate-900/90 backdrop-blur-sm z-10">
        <p className="text-xs text-cyan-400 font-semibold">📝 Data Entry Form</p>
        <p className="text-xs text-slate-300 mt-1">
          Fill out this form daily. All data entered here will appear in the "View Report" modal for stakeholder review.
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Basic Info */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <h4 className="text-sm font-bold text-cyan-400 mb-3">Report Information</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project</label>
              <select className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500">
                <option>Downtown Office Tower</option>
                <option>Riverside Luxury Apartments</option>
                <option>Industrial Warehouse Expansion</option>
                <option>Medical Clinic Renovation</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Date</label>
                <input
                  type="date"
                  defaultValue="2026-02-14"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work Hours</label>
                <input
                  type="text"
                  defaultValue="07:00 - 17:00"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Weather</label>
                <input
                  type="text"
                  placeholder="e.g., Partly Cloudy, 24°C"
                  defaultValue="Partly Cloudy, 24°C"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Superintendent</label>
                <input
                  type="text"
                  defaultValue="Sarah Chen"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* On-Site Labor */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <Users className="w-4 h-4" />
              On-Site Labor
            </h4>
            <button
              onClick={addLaborEntry}
              className="text-xs bg-cyan-600 hover:bg-cyan-500 text-white px-2 py-1 rounded flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Add Trade
            </button>
          </div>
          <div className="space-y-2">
            {laborEntries.map((entry, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Trade (e.g., Carpenters)"
                  value={entry.trade}
                  onChange={(e) => {
                    const newEntries = [...laborEntries];
                    newEntries[idx].trade = e.target.value;
                    setLaborEntries(newEntries);
                  }}
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="number"
                  placeholder="Count"
                  value={entry.count}
                  onChange={(e) => {
                    const newEntries = [...laborEntries];
                    newEntries[idx].count = e.target.value;
                    setLaborEntries(newEntries);
                  }}
                  className="w-20 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={() => removeLaborEntry(idx)}
                  className="p-2 hover:bg-red-600 text-slate-400 hover:text-white rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="pt-2 border-t border-slate-700 flex justify-between text-sm">
              <span className="text-cyan-400 font-semibold">Total Crew:</span>
              <span className="text-cyan-400 font-semibold">
                {laborEntries.reduce((sum, entry) => sum + (parseInt(entry.count) || 0), 0)} workers
              </span>
            </div>
          </div>
        </div>

        {/* Equipment */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Equipment On-Site
            </h4>
            <button
              onClick={addEquipmentEntry}
              className="text-xs bg-cyan-600 hover:bg-cyan-500 text-white px-2 py-1 rounded flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Add Equipment
            </button>
          </div>
          <div className="space-y-2">
            {equipmentEntries.map((entry, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Equipment type"
                  value={entry.equipment}
                  onChange={(e) => {
                    const newEntries = [...equipmentEntries];
                    newEntries[idx].equipment = e.target.value;
                    setEquipmentEntries(newEntries);
                  }}
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="text"
                  placeholder="Qty"
                  value={entry.quantity}
                  onChange={(e) => {
                    const newEntries = [...equipmentEntries];
                    newEntries[idx].quantity = e.target.value;
                    setEquipmentEntries(newEntries);
                  }}
                  className="w-24 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={() => removeEquipmentEntry(idx)}
                  className="p-2 hover:bg-red-600 text-slate-400 hover:text-white rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Work Progress */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Work Progress
            </h4>
            <button
              onClick={addProgressEntry}
              className="text-xs bg-cyan-600 hover:bg-cyan-500 text-white px-2 py-1 rounded flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Add Activity
            </button>
          </div>
          <div className="space-y-3">
            {progressEntries.map((entry, idx) => (
              <div key={idx} className="bg-slate-900/50 rounded p-3 border border-slate-600">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Activity name"
                    value={entry.activity}
                    onChange={(e) => {
                      const newEntries = [...progressEntries];
                      newEntries[idx].activity = e.target.value;
                      setProgressEntries(newEntries);
                    }}
                    className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <input
                    type="number"
                    placeholder="%"
                    value={entry.progress}
                    onChange={(e) => {
                      const newEntries = [...progressEntries];
                      newEntries[idx].progress = e.target.value;
                      setProgressEntries(newEntries);
                    }}
                    className="w-16 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => removeProgressEntry(idx)}
                    className="p-2 hover:bg-red-600 text-slate-400 hover:text-white rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  placeholder="Progress notes..."
                  value={entry.notes}
                  onChange={(e) => {
                    const newEntries = [...progressEntries];
                    newEntries[idx].notes = e.target.value;
                    setProgressEntries(newEntries);
                  }}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Materials Received */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Materials Received
            </h4>
            <button
              onClick={addMaterialEntry}
              className="text-xs bg-cyan-600 hover:bg-cyan-500 text-white px-2 py-1 rounded flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Add Material
            </button>
          </div>
          <div className="space-y-2">
            {materialEntries.map((entry, idx) => (
              <div key={idx} className="bg-slate-900/50 rounded p-3 border border-slate-600">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Material description"
                    value={entry.material}
                    onChange={(e) => {
                      const newEntries = [...materialEntries];
                      newEntries[idx].material = e.target.value;
                      setMaterialEntries(newEntries);
                    }}
                    className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => removeMaterialEntry(idx)}
                    className="p-2 hover:bg-red-600 text-slate-400 hover:text-white rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Quantity"
                    value={entry.quantity}
                    onChange={(e) => {
                      const newEntries = [...materialEntries];
                      newEntries[idx].quantity = e.target.value;
                      setMaterialEntries(newEntries);
                    }}
                    className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <input
                    type="text"
                    placeholder="Supplier"
                    value={entry.supplier}
                    onChange={(e) => {
                      const newEntries = [...materialEntries];
                      newEntries[idx].supplier = e.target.value;
                      setMaterialEntries(newEntries);
                    }}
                    className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={entry.inspected}
                    onChange={(e) => {
                      const newEntries = [...materialEntries];
                      newEntries[idx].inspected = e.target.checked;
                      setMaterialEntries(newEntries);
                    }}
                    className="w-4 h-4 rounded bg-slate-800 border-slate-600"
                  />
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Quality inspected
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Report */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <h4 className="text-sm font-bold text-cyan-400 mb-3">Safety Report</h4>
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Safety Incidents</label>
              <input
                type="number"
                placeholder="0"
                defaultValue="0"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded bg-slate-800 border-slate-600" />
                Morning toolbox talk completed
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded bg-slate-800 border-slate-600" />
                All PPE compliance verified
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded bg-slate-800 border-slate-600" />
                Fall protection inspected
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded bg-slate-800 border-slate-600" />
                Fire extinguishers checked
              </label>
            </div>
          </div>
        </div>

        {/* Issues & Delays */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Issues & Delays
            </h4>
            <button
              onClick={addIssueEntry}
              className="text-xs bg-cyan-600 hover:bg-cyan-500 text-white px-2 py-1 rounded flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Add Issue
            </button>
          </div>
          <div className="space-y-2">
            {issueEntries.map((entry, idx) => (
              <div key={idx} className="bg-slate-900/50 rounded p-3 border border-slate-600">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Issue title"
                    value={entry.issue}
                    onChange={(e) => {
                      const newEntries = [...issueEntries];
                      newEntries[idx].issue = e.target.value;
                      setIssueEntries(newEntries);
                    }}
                    className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => removeIssueEntry(idx)}
                    className="p-2 hover:bg-red-600 text-slate-400 hover:text-white rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  placeholder="Description and impact..."
                  value={entry.description}
                  onChange={(e) => {
                    const newEntries = [...issueEntries];
                    newEntries[idx].description = e.target.value;
                    setIssueEntries(newEntries);
                  }}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Superintendent Notes */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <h4 className="text-sm font-bold text-cyan-400 mb-3">Superintendent Notes</h4>
          <textarea
            placeholder="Overall progress summary, crew morale, coordination notes, weather impact, safety observations..."
            defaultValue="Overall good progress today despite the minor electrical material delay. Crew morale is high and productivity exceeded targets."
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
            rows={4}
          />
        </div>

        {/* Site Photos */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <h4 className="text-sm font-bold text-cyan-400 mb-3">Site Photos</h4>
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-cyan-500 cursor-pointer transition-colors">
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Click or drag photos here</p>
            <p className="text-slate-500 text-xs mt-1">Supports photo markup and annotations</p>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          className="w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          onClick={handleSubmit}
        >
          <CheckCircle className="w-5 h-5" />
          Submit Daily Report
        </button>
      </div>
    </div>
  );
}