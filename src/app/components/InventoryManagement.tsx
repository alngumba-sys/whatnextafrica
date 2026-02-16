import { useState } from 'react';
import { Package, AlertCircle, TrendingUp, TrendingDown, Search, Filter, MapPin, Calendar, DollarSign, Plus } from 'lucide-react';
import { AIInsightCard } from './AIInsightCard';
import { AddInventoryForm } from './AddInventoryForm';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  quantity: number;
  reorderPoint: number;
  unitCost: number;
  location: string;
  projectId?: string;
  projectName?: string;
  lastRestocked: string;
  supplier: string;
}

interface InventoryTransaction {
  id: string;
  itemName: string;
  type: 'purchase' | 'usage' | 'transfer' | 'adjustment';
  quantity: number;
  project?: string;
  date: string;
  cost?: number;
}

export function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddInventory = (data: any) => {
    console.log('New inventory item:', data);
    // In a real app, this would make an API call to save the data
    alert(`✅ Inventory item "${data.name}" added successfully!\n\nQuantity: ${data.quantity} ${data.unit}\nValue: KES ${(parseFloat(data.quantity) * parseFloat(data.unitCost)).toLocaleString()}\nLocation: ${data.location}`);
  };

  // Mock inventory data
  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      name: 'Portland Cement',
      category: 'Materials',
      unit: '50kg bags',
      quantity: 450,
      reorderPoint: 200,
      unitCost: 850,
      location: 'Main Warehouse',
      lastRestocked: '2026-02-10',
      supplier: 'Bamburi Cement Ltd',
    },
    {
      id: '2',
      name: 'Steel Reinforcement Bars (12mm)',
      category: 'Steel',
      unit: 'tonnes',
      quantity: 3.5,
      reorderPoint: 5,
      unitCost: 95000,
      location: 'Main Warehouse',
      lastRestocked: '2026-02-08',
      supplier: 'Devki Steel Mills',
    },
    {
      id: '3',
      name: 'Steel Reinforcement Bars (16mm)',
      category: 'Steel',
      unit: 'tonnes',
      quantity: 2.8,
      reorderPoint: 4,
      unitCost: 98000,
      location: 'Main Warehouse',
      lastRestocked: '2026-02-12',
      supplier: 'Devki Steel Mills',
    },
    {
      id: '4',
      name: 'Ballast (Machine crushed)',
      category: 'Aggregates',
      unit: 'cubic metres',
      quantity: 15,
      reorderPoint: 20,
      unitCost: 3500,
      location: 'Site - Westlands Tower',
      projectId: 'PRJ-001',
      projectName: 'Westlands Tower',
      lastRestocked: '2026-02-11',
      supplier: 'Hass Petroleum Quarries',
    },
    {
      id: '5',
      name: 'Building Sand (River sand)',
      category: 'Aggregates',
      unit: 'cubic metres',
      quantity: 8,
      reorderPoint: 15,
      unitCost: 2800,
      location: 'Site - Westlands Tower',
      projectId: 'PRJ-001',
      projectName: 'Westlands Tower',
      lastRestocked: '2026-02-09',
      supplier: 'Kitui River Sand Suppliers',
    },
    {
      id: '6',
      name: 'Timber Formwork (50x100mm)',
      category: 'Formwork',
      unit: 'pieces',
      quantity: 180,
      reorderPoint: 150,
      unitCost: 320,
      location: 'Main Warehouse',
      lastRestocked: '2026-02-07',
      supplier: 'Raiply Timber',
    },
    {
      id: '7',
      name: 'Plywood Formwork (18mm)',
      category: 'Formwork',
      unit: 'sheets',
      quantity: 65,
      reorderPoint: 50,
      unitCost: 2450,
      location: 'Site - Karen Residence',
      projectId: 'PRJ-002',
      projectName: 'Karen Residence',
      lastRestocked: '2026-02-13',
      supplier: 'Raiply Timber',
    },
    {
      id: '8',
      name: 'Paint - Exterior Emulsion (White)',
      category: 'Finishes',
      unit: '20L buckets',
      quantity: 25,
      reorderPoint: 30,
      unitCost: 4800,
      location: 'Main Warehouse',
      lastRestocked: '2026-02-06',
      supplier: 'Crown Paints Kenya',
    },
    {
      id: '9',
      name: 'Ceramic Floor Tiles (600x600mm)',
      category: 'Finishes',
      unit: 'square metres',
      quantity: 120,
      reorderPoint: 100,
      unitCost: 1850,
      location: 'Main Warehouse',
      lastRestocked: '2026-02-14',
      supplier: 'Johnson Tiles',
    },
    {
      id: '10',
      name: 'PVC Pipes (110mm)',
      category: 'Plumbing',
      unit: '6m lengths',
      quantity: 42,
      reorderPoint: 50,
      unitCost: 1200,
      location: 'Main Warehouse',
      lastRestocked: '2026-02-05',
      supplier: 'Pipeplus Kenya',
    },
  ];

  const recentTransactions: InventoryTransaction[] = [
    {
      id: '1',
      itemName: 'Portland Cement',
      type: 'usage',
      quantity: 120,
      project: 'Westlands Tower',
      date: '2026-02-14',
      cost: 102000,
    },
    {
      id: '2',
      itemName: 'Steel Reinforcement Bars (16mm)',
      type: 'usage',
      quantity: 0.5,
      project: 'Karen Residence',
      date: '2026-02-14',
      cost: 49000,
    },
    {
      id: '3',
      itemName: 'Ballast (Machine crushed)',
      type: 'purchase',
      quantity: 25,
      date: '2026-02-13',
      cost: 87500,
    },
    {
      id: '4',
      itemName: 'Plywood Formwork (18mm)',
      type: 'transfer',
      quantity: 30,
      project: 'Karen Residence',
      date: '2026-02-13',
    },
    {
      id: '5',
      itemName: 'Paint - Exterior Emulsion (White)',
      type: 'usage',
      quantity: 8,
      project: 'Industrial Park Phase 2',
      date: '2026-02-12',
      cost: 38400,
    },
  ];

  // Calculate KPIs
  const totalInventoryValue = inventoryItems.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);
  const lowStockItems = inventoryItems.filter(item => item.quantity <= item.reorderPoint);
  const uniqueCategories = [...new Set(inventoryItems.map(item => item.category))];
  const warehouseItems = inventoryItems.filter(item => item.location.includes('Warehouse'));
  const siteItems = inventoryItems.filter(item => item.location.includes('Site'));

  // Filter inventory
  const filteredInventory = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' ||
                          (filterStatus === 'low' && item.quantity <= item.reorderPoint) ||
                          (filterStatus === 'normal' && item.quantity > item.reorderPoint);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStockStatus = (item: InventoryItem) => {
    if (item.quantity <= item.reorderPoint * 0.5) {
      return { label: 'Critical', color: 'red' };
    } else if (item.quantity <= item.reorderPoint) {
      return { label: 'Low Stock', color: 'amber' };
    } else {
      return { label: 'In Stock', color: 'green' };
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'usage': return <TrendingDown className="w-4 h-4 text-red-400" />;
      case 'transfer': return <Package className="w-4 h-4 text-blue-400" />;
      default: return <Package className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <div className="w-1 h-8 bg-cyan-400 rounded"></div>
            Inventory Management
          </h2>
          <p className="text-slate-400 text-sm mt-1">Track materials, stock levels, and costs across all projects</p>
        </div>
        <div>
          <button
            className="bg-cyan-600 hover:bg-cyan-500 text-white py-2.5 rounded-lg flex items-center gap-2 font-semibold transition-colors shadow-lg px-[16px] py-[5px]"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="w-5 h-5" />
            Add Inventory
          </button>
        </div>
      </div>

      {/* Add Inventory Form Modal */}
      <AddInventoryForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSubmit={handleAddInventory}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-cyan-400 text-sm font-semibold">Total Inventory Value</div>
            <DollarSign className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-white">KES {(totalInventoryValue / 1000000).toFixed(2)}M</div>
          <div className="text-xs text-slate-400 mt-1">{inventoryItems.length} items tracked</div>
        </div>

        <div className="bg-red-950/30 rounded-lg border border-red-600/50 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-red-400 text-sm font-semibold">Low Stock Alerts</div>
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-white">{lowStockItems.length}</div>
          <div className="text-xs text-slate-400 mt-1">Items need reordering</div>
        </div>

        <div className="bg-blue-950/30 rounded-lg border border-blue-600/50 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-blue-400 text-sm font-semibold">Warehouse Stock</div>
            <Package className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">{warehouseItems.length}</div>
          <div className="text-xs text-slate-400 mt-1">Items in central storage</div>
        </div>

        <div className="bg-purple-950/30 rounded-lg border border-purple-600/50 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-purple-400 text-sm font-semibold">Site Inventory</div>
            <MapPin className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white">{siteItems.length}</div>
          <div className="text-xs text-slate-400 mt-1">Items at project sites</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search materials or suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Status</option>
              <option value="low">Low Stock</option>
              <option value="normal">In Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Material</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Unit Cost</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Value</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Supplier</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => {
                const status = getStockStatus(item);
                const totalValue = item.quantity * item.unitCost;
                return (
                  <tr key={item.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-4">
                      <div className="text-white font-medium">{item.name}</div>
                      <div className="text-xs text-slate-400">{item.unit}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/50">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="text-white font-semibold">{item.quantity}</div>
                      <div className="text-xs text-slate-400">Min: {item.reorderPoint}</div>
                    </td>
                    <td className="px-4 py-4 text-right text-white">
                      KES {item.unitCost.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-right text-white font-semibold">
                      KES {totalValue.toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-sm">{item.location}</span>
                      </div>
                      {item.projectName && (
                        <div className="text-xs text-cyan-400 mt-1">{item.projectName}</div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        status.color === 'red' ? 'bg-red-500/20 text-red-400 border border-red-500/50' :
                        status.color === 'amber' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50' :
                        'bg-green-500/20 text-green-400 border border-green-500/50'
                      }`}>
                        {status.color === 'red' || status.color === 'amber' ? (
                          <AlertCircle className="w-3 h-3" />
                        ) : null}
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-300">
                      {item.supplier}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-400" />
          Recent Inventory Transactions
        </h3>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-800 rounded-lg">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <div className="text-white font-medium">{transaction.itemName}</div>
                  <div className="text-sm text-slate-400 flex items-center gap-2 mt-1">
                    <span className="capitalize">{transaction.type}</span>
                    {transaction.project && (
                      <>
                        <span className="text-slate-600">•</span>
                        <span>{transaction.project}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-semibold ${
                  transaction.type === 'purchase' ? 'text-green-400' : 
                  transaction.type === 'usage' ? 'text-red-400' : 'text-blue-400'
                }`}>
                  {transaction.type === 'purchase' ? '+' : transaction.type === 'usage' ? '-' : ''}{transaction.quantity}
                </div>
                {transaction.cost && (
                  <div className="text-sm text-slate-400 mt-1">KES {transaction.cost.toLocaleString()}</div>
                )}
                <div className="text-xs text-slate-500 mt-1">{transaction.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <AIInsightCard 
        insights={[
          {
            id: 'inv1',
            title: 'Bulk Purchase Opportunity - Steel Reinforcement',
            description: 'AI analyzed your steel consumption patterns across 5 projects and detected you\'re ordering 12mm and 16mm rebar separately every 8-12 days. Devki Steel Mills offers 12% discount on orders above 15 tonnes.',
            impact: 'high' as const,
            type: 'opportunity' as const,
            actionable: 'Consolidate next 3 steel orders (projected 18 tonnes over 4 weeks) into single bulk purchase. This will reduce unit cost from KES 95K/tonne to KES 83.6K/tonne and save KES 205K. Ensure adequate warehouse storage space.',
            potentialSavings: 205000,
            timeframe: 'Order by Feb 20 to capture discount',
          },
          {
            id: 'inv2',
            title: 'Wastage Alert - Plywood Formwork Overstock',
            description: 'Karen Residence project is 78% complete but still has 65 sheets of plywood formwork on-site (KES 159K value). Historical data shows formwork usage drops to near-zero after 80% completion.',
            impact: 'medium' as const,
            type: 'warning' as const,
            actionable: 'Transfer 50 sheets (77%) of plywood formwork from Karen site to Westlands Tower project where concrete phase is just starting. This will avoid KES 122K in new purchases and prevent material degradation from weather exposure.',
            potentialSavings: 122000,
            timeframe: 'Transfer within 5 days',
          },
          {
            id: 'inv3',
            title: 'Just-In-Time Optimization - Aggregates',
            description: 'You\'re maintaining 23 cubic metres of aggregates in warehouse (KES 73K carrying cost) while paying for site storage at Westlands. AI detected ballast/sand usage is predictable at 3.2m³/week with 2-day supplier lead time.',
            impact: 'medium' as const,
            type: 'optimization' as const,
            actionable: 'Reduce warehouse aggregate buffer to 6m³ (1-week supply) and implement just-in-time delivery direct to sites. This will free up KES 53K in working capital and eliminate double-handling costs of KES 12K/month.',
            potentialSavings: 53000,
            timeframe: 'Implement over next 2 weeks',
          },
        ]} 
        moduleTitle="Inventory Management" 
      />
    </div>
  );
}