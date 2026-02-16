import { useState } from 'react';
import { X, Package, AlertCircle } from 'lucide-react';

interface AddInventoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function AddInventoryForm({ isOpen, onClose, onSubmit }: AddInventoryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Materials',
    unit: '',
    quantity: '',
    reorderPoint: '',
    unitCost: '',
    location: 'Main Warehouse',
    supplier: '',
    projectId: '',
    projectName: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock data for dropdowns
  const categories = [
    { id: 'Materials', name: 'Materials' },
    { id: 'Steel', name: 'Steel' },
    { id: 'Aggregates', name: 'Aggregates' },
    { id: 'Timber', name: 'Timber' },
    { id: 'Tools', name: 'Tools' },
    { id: 'Paint & Finishes', name: 'Paint & Finishes' },
    { id: 'Plumbing', name: 'Plumbing' },
    { id: 'Electrical', name: 'Electrical' },
    { id: 'Hardware', name: 'Hardware' },
    { id: 'Other', name: 'Other' },
  ];

  const units = [
    { id: '50kg bags', name: '50kg bags' },
    { id: 'tonnes', name: 'tonnes' },
    { id: 'cubic metres', name: 'cubic metres' },
    { id: 'pieces', name: 'pieces' },
    { id: 'litres', name: 'litres' },
    { id: 'metres', name: 'metres' },
    { id: 'square metres', name: 'square metres' },
    { id: 'rolls', name: 'rolls' },
    { id: 'boxes', name: 'boxes' },
    { id: 'sets', name: 'sets' },
  ];

  const locations = [
    { id: 'Main Warehouse', name: 'Main Warehouse' },
    { id: 'Site - Riverside Residential', name: 'Site - Riverside Residential Complex' },
    { id: 'Site - Westlands Tower', name: 'Site - Westlands Office Tower' },
    { id: 'Site - Karen Mall', name: 'Site - Karen Shopping Mall' },
    { id: 'Site - Industrial Park', name: 'Site - Industrial Park Phase 1' },
    { id: 'Site - Coastal Resort', name: 'Site - Coastal Resort & Spa' },
    { id: 'Secondary Warehouse', name: 'Secondary Warehouse - Mombasa' },
  ];

  const suppliers = [
    { id: 's1', name: 'Bamburi Cement Ltd', type: 'Cement Supplier', phone: '+254 20 123456', idNumber: 'P051234567' },
    { id: 's2', name: 'Devki Steel Mills', type: 'Steel Supplier', phone: '+254 20 234567', idNumber: 'P051234568' },
    { id: 's3', name: 'East African Steel Co.', type: 'Steel Supplier', phone: '+254 20 345678', idNumber: 'P051234569' },
    { id: 's4', name: 'Hass Petroleum Quarries', type: 'Aggregates Supplier', phone: '+254 20 456789', idNumber: 'P051234570' },
    { id: 's5', name: 'Kitui River Sand Suppliers', type: 'Aggregates Supplier', phone: '+254 20 567890', idNumber: 'P051234571' },
    { id: 's6', name: 'Mombasa Timber Merchants', type: 'Timber Supplier', phone: '+254 41 123456', idNumber: 'P051234572' },
    { id: 's7', name: 'Kenya Electricals Ltd', type: 'Electrical Supplier', phone: '+254 20 678901', idNumber: 'P051234573' },
    { id: 's8', name: 'Crown Paints Kenya', type: 'Paint Supplier', phone: '+254 20 789012', idNumber: 'P051234574' },
    { id: 's9', name: 'Pipeplus Kenya', type: 'Plumbing Supplier', phone: '+254 20 890123', idNumber: 'P051234575' },
    { id: 's10', name: 'Nairobi Hardware Supplies', type: 'Hardware Supplier', phone: '+254 20 901234', idNumber: 'P051234576' },
  ];

  const projects = [
    { id: 'PRJ-001', name: 'Riverside Residential Complex', status: 'Active' },
    { id: 'PRJ-002', name: 'Westlands Office Tower', status: 'Active' },
    { id: 'PRJ-003', name: 'Karen Shopping Mall', status: 'Active' },
    { id: 'PRJ-004', name: 'Industrial Park Phase 1', status: 'Active' },
    { id: 'PRJ-005', name: 'Coastal Resort & Spa', status: 'Active' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Item name is required';
    if (!formData.unit) newErrors.unit = 'Unit is required';
    if (!formData.quantity || parseFloat(formData.quantity) <= 0) newErrors.quantity = 'Valid quantity is required';
    if (!formData.reorderPoint || parseFloat(formData.reorderPoint) <= 0) newErrors.reorderPoint = 'Valid reorder point is required';
    if (!formData.unitCost || parseFloat(formData.unitCost) <= 0) newErrors.unitCost = 'Valid unit cost is required';
    if (!formData.supplier) newErrors.supplier = 'Supplier is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
      // Reset form
      setFormData({
        name: '',
        category: 'Materials',
        unit: '',
        quantity: '',
        reorderPoint: '',
        unitCost: '',
        location: 'Main Warehouse',
        supplier: '',
        projectId: '',
        projectName: '',
        notes: '',
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg border border-slate-600 w-full max-w-3xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-4 sm:p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Add New Inventory Item</h2>
              <p className="text-sm text-slate-400">Add materials, tools, or equipment to inventory</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Item Information */}
          <div>
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">Item Information</h3>
            
            <div className="space-y-4">
              {/* Item Name */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Item Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 bg-slate-900 border ${errors.name ? 'border-red-500' : 'border-slate-600'} rounded text-white focus:outline-none focus:border-cyan-500`}
                  placeholder="e.g., Portland Cement, Steel Reinforcement Bars"
                />
                {errors.name && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-red-400">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Category and Unit Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Unit of Measurement <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className={`w-full px-3 py-2 bg-slate-900 border ${errors.unit ? 'border-red-500' : 'border-slate-600'} rounded text-white focus:outline-none focus:border-cyan-500`}
                  >
                    <option value="">Select unit</option>
                    {units.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                  {errors.unit && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-red-400">
                      <AlertCircle className="w-3 h-3" />
                      {errors.unit}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quantity & Costs */}
          <div>
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">Quantity & Costs</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Current Quantity <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className={`w-full px-3 py-2 bg-slate-900 border ${errors.quantity ? 'border-red-500' : 'border-slate-600'} rounded text-white focus:outline-none focus:border-cyan-500`}
                  placeholder="0"
                />
                {errors.quantity && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-red-400">
                    <AlertCircle className="w-3 h-3" />
                    {errors.quantity}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Reorder Point <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.reorderPoint}
                  onChange={(e) => setFormData({ ...formData, reorderPoint: e.target.value })}
                  className={`w-full px-3 py-2 bg-slate-900 border ${errors.reorderPoint ? 'border-red-500' : 'border-slate-600'} rounded text-white focus:outline-none focus:border-cyan-500`}
                  placeholder="0"
                />
                {errors.reorderPoint && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-red-400">
                    <AlertCircle className="w-3 h-3" />
                    {errors.reorderPoint}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Unit Cost (KES) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.unitCost}
                  onChange={(e) => setFormData({ ...formData, unitCost: e.target.value })}
                  className={`w-full px-3 py-2 bg-slate-900 border ${errors.unitCost ? 'border-red-500' : 'border-slate-600'} rounded text-white focus:outline-none focus:border-cyan-500`}
                  placeholder="0.00"
                />
                {errors.unitCost && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-red-400">
                    <AlertCircle className="w-3 h-3" />
                    {errors.unitCost}
                  </div>
                )}
              </div>
            </div>

            {/* Total Value Display */}
            {formData.quantity && formData.unitCost && (
              <div className="mt-3 p-3 bg-cyan-950/30 border border-cyan-600/50 rounded">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300">Total Inventory Value:</span>
                  <span className="text-lg font-bold text-cyan-400">
                    KES {(parseFloat(formData.quantity) * parseFloat(formData.unitCost)).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Location & Assignment */}
          <div>
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">Location & Assignment</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Storage Location <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                >
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Project Assignment (Optional)
                </label>
                <select
                  value={formData.projectId}
                  onChange={(e) => {
                    const project = projects.find(p => p.id === e.target.value);
                    setFormData({ 
                      ...formData, 
                      projectId: e.target.value, 
                      projectName: project?.name || '' 
                    });
                  }}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Select project (if applicable)</option>
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.id}>
                      {proj.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1">Leave empty if this is general warehouse stock</p>
              </div>
            </div>
          </div>

          {/* Supplier Information */}
          <div>
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">Supplier Information</h3>
            
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Supplier <span className="text-red-400">*</span>
              </label>
              <select
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                className={`w-full px-3 py-2 bg-slate-900 border ${errors.supplier ? 'border-red-500' : 'border-slate-600'} rounded text-white focus:outline-none focus:border-cyan-500`}
              >
                <option value="">Select supplier</option>
                {suppliers.map((sup) => (
                  <option key={sup.id} value={sup.name}>
                    {sup.name} - {sup.type}
                  </option>
                ))}
              </select>
              {errors.supplier && (
                <div className="flex items-center gap-1 mt-1 text-xs text-red-400">
                  <AlertCircle className="w-3 h-3" />
                  {errors.supplier}
                </div>
              )}
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500 resize-none"
              placeholder="Any additional information about this inventory item..."
            />
          </div>
        </form>

        {/* Footer Buttons */}
        <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-4 sm:p-6 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors shadow-lg"
          >
            Add Inventory Item
          </button>
        </div>
      </div>
    </div>
  );
}