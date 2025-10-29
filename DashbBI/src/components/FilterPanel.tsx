import { useFilterStore } from '../stores/filterStore';
import { useDataStore } from '../stores/dataStore';

export const FilterPanel = () => {
  const {
    selectedGender,
    selectedOccupations,
    selectedDisorders,
    ageRange,
    setGenderFilter,
    setOccupationFilter,
    setDisorderFilter,
    setAgeRange,
    resetFilters,
  } = useFilterStore();

  const { sleepData } = useDataStore();

  // Extract unique values for filters
  const uniqueOccupations = [...new Set(sleepData.map((d) => d.Occupation))].sort();
  const uniqueDisorders = [...new Set(sleepData.map((d) => d.Sleep_Disorder))].sort();

  const toggleGender = (gender: string) => {
    if (selectedGender.includes(gender)) {
      setGenderFilter(selectedGender.filter((g) => g !== gender));
    } else {
      setGenderFilter([...selectedGender, gender]);
    }
  };

  const toggleOccupation = (occupation: string) => {
    if (selectedOccupations.includes(occupation)) {
      setOccupationFilter(selectedOccupations.filter((o) => o !== occupation));
    } else {
      setOccupationFilter([...selectedOccupations, occupation]);
    }
  };

  const toggleDisorder = (disorder: string) => {
    if (selectedDisorders.includes(disorder)) {
      setDisorderFilter(selectedDisorders.filter((d) => d !== disorder));
    } else {
      setDisorderFilter([...selectedDisorders, disorder]);
    }
  };

  return (
    <div className="w-72 bg-gradient-to-b from-indigo-50/95 to-purple-50/95 backdrop-blur-md border-r border-purple-200/30 p-6 overflow-y-auto h-screen shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
            🎯
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Filters
          </h2>
        </div>
        <button
          onClick={resetFilters}
          className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all"
        >
          Reset
        </button>
      </div>

      {/* Gender Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full"></div>
          <h3 className="text-sm font-bold text-gray-800">Gender</h3>
        </div>
        <div className="space-y-3 ml-3">
          {['Male', 'Female'].map((gender) => (
            <label key={gender} className="flex items-center cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedGender.includes(gender)}
                  onChange={() => toggleGender(gender)}
                  className="w-5 h-5 appearance-none border-2 border-gray-300 rounded checked:border-purple-500 checked:bg-gradient-to-br checked:from-purple-500 checked:to-indigo-600 transition-all cursor-pointer"
                />
                {selectedGender.includes(gender) && (
                  <svg className="w-3 h-3 text-white absolute top-1 left-1 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">{gender}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Age Range Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full"></div>
          <h3 className="text-sm font-bold text-gray-800">Age Range</h3>
        </div>
        <div className="ml-3">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 text-xs font-bold rounded-full">
              {ageRange[0]}
            </span>
            <span className="text-gray-400 text-xs">to</span>
            <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 text-xs font-bold rounded-full">
              {ageRange[1]}
            </span>
          </div>
          <div className="space-y-3">
            <input
              type="range"
              min="27"
              max="60"
              value={ageRange[0]}
              onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
              className="w-full h-2 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-purple-500 [&::-webkit-slider-thumb]:to-indigo-600 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <input
              type="range"
              min="27"
              max="60"
              value={ageRange[1]}
              onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-purple-500 [&::-webkit-slider-thumb]:to-indigo-600 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Occupation Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full"></div>
          <h3 className="text-sm font-bold text-gray-800">Occupation</h3>
        </div>
        <div className="space-y-3 max-h-48 overflow-y-auto ml-3 pr-2 scrollbar-thin">
          {uniqueOccupations.map((occupation) => (
            <label key={occupation} className="flex items-center cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedOccupations.includes(occupation)}
                  onChange={() => toggleOccupation(occupation)}
                  className="w-5 h-5 appearance-none border-2 border-gray-300 rounded checked:border-purple-500 checked:bg-gradient-to-br checked:from-purple-500 checked:to-indigo-600 transition-all cursor-pointer"
                />
                {selectedOccupations.includes(occupation) && (
                  <svg className="w-3 h-3 text-white absolute top-1 left-1 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">{occupation}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sleep Disorder Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full"></div>
          <h3 className="text-sm font-bold text-gray-800">Sleep Disorder</h3>
        </div>
        <div className="space-y-3 ml-3">
          {uniqueDisorders.map((disorder) => (
            <label key={disorder} className="flex items-center cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedDisorders.includes(disorder)}
                  onChange={() => toggleDisorder(disorder)}
                  className="w-5 h-5 appearance-none border-2 border-gray-300 rounded checked:border-purple-500 checked:bg-gradient-to-br checked:from-purple-500 checked:to-indigo-600 transition-all cursor-pointer"
                />
                {selectedDisorders.includes(disorder) && (
                  <svg className="w-3 h-3 text-white absolute top-1 left-1 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">{disorder}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
