import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, User, Building2, X } from 'lucide-react';

interface SearchableSelectProps {
  options: Array<{
    id: string;
    name: string;
    type?: string;
    role?: string;
    idNumber?: string;
    phone?: string;
  }>;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  required?: boolean;
  type: 'worker' | 'vendor';
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
  label,
  required = false,
  type,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState<typeof options[0] | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on search term
  const filteredOptions = options.filter((option) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      option.name.toLowerCase().includes(searchLower) ||
      option.phone?.includes(searchTerm) ||
      option.idNumber?.includes(searchTerm) ||
      option.type?.toLowerCase().includes(searchLower) ||
      option.role?.toLowerCase().includes(searchLower)
    );
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update selected option when value changes
  useEffect(() => {
    const option = options.find((opt) => opt.name === value);
    setSelectedOption(option || null);
  }, [value, options]);

  const handleSelect = (option: typeof options[0]) => {
    setSelectedOption(option);
    onChange(option.name);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    setSelectedOption(null);
    onChange('');
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-slate-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      {/* Selected Value Display / Search Input */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2.5 bg-slate-900 border rounded-lg cursor-pointer transition-colors ${
          isOpen ? 'border-cyan-500' : 'border-slate-600 hover:border-slate-500'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {type === 'worker' ? (
              <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
            ) : (
              <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
            )}
            
            {selectedOption ? (
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium truncate">{selectedOption.name}</div>
                {(selectedOption.role || selectedOption.phone) && (
                  <div className="text-xs text-slate-400 truncate">
                    {selectedOption.role && <span>{selectedOption.role}</span>}
                    {selectedOption.role && selectedOption.phone && <span> • </span>}
                    {selectedOption.phone && <span>{selectedOption.phone}</span>}
                  </div>
                )}
              </div>
            ) : (
              <span className="text-slate-500">{placeholder}</span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {selectedOption && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="p-1 hover:bg-slate-800 rounded transition-colors"
              >
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            )}
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                isOpen ? 'transform rotate-180' : ''
              }`}
            />
          </div>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-80 overflow-hidden">
          {/* Search Input */}
          <div className="p-3 border-b border-slate-700 sticky top-0 bg-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search by name, phone, ID...`}
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          </div>

          {/* Options List */}
          <div className="overflow-y-auto max-h-64">
            {filteredOptions.length > 0 ? (
              <div className="py-1">
                {filteredOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-colors border-l-2 ${
                      selectedOption?.id === option.id
                        ? 'border-cyan-500 bg-slate-700/30'
                        : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                        {option.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium mb-0.5">{option.name}</div>
                        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                          {option.role && (
                            <span className="px-2 py-0.5 bg-slate-700 rounded">
                              {option.role}
                            </span>
                          )}
                          {option.type && (
                            <span className="px-2 py-0.5 bg-slate-700 rounded">
                              {option.type}
                            </span>
                          )}
                          {option.phone && (
                            <span>{option.phone}</span>
                          )}
                          {option.idNumber && (
                            <span>ID: {option.idNumber}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-slate-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No {type === 'worker' ? 'workers' : 'vendors'} found</p>
                <p className="text-xs mt-1">Try a different search term</p>
              </div>
            )}
          </div>

          {/* Footer - Results Count */}
          <div className="px-4 py-2 border-t border-slate-700 bg-slate-900/50 text-xs text-slate-400">
            Showing {filteredOptions.length} of {options.length} {type === 'worker' ? 'workers' : 'vendors'}
          </div>
        </div>
      )}
    </div>
  );
}
