import React from 'react';
import { MeteorCanvas, MeteorPresets, MeteorPerformanceMonitor } from '../components/animations';
import usePerformanceOptimization from '../hooks/usePerformanceOptimization';

const MeteorTest = () => {
  const { performanceLevel, averageFPS, optimizedSettings } = usePerformanceOptimization();
  const [showMonitor, setShowMonitor] = React.useState(false);
  const [preset, setPreset] = React.useState('standard');

  return (
    <div className="min-h-screen bg-primary-bg relative overflow-hidden">
      {/* Meteor Canvas Background */}
      <MeteorCanvas
        className="absolute inset-0"
        {...MeteorPresets[preset]}
      />
      
      {/* Performance Monitor */}
      <MeteorPerformanceMonitor 
        show={showMonitor} 
        performanceLevel={performanceLevel}
        averageFPS={averageFPS}
      />
      
      {/* Controls */}
      <div className="relative z-10 p-8">
        <div className="max-w-md mx-auto bg-black/50 backdrop-blur-sm rounded-lg p-6 text-white">
          <h2 className="text-2xl font-cinzel mb-4">Meteor Canvas Test</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Preset:</label>
              <select 
                value={preset} 
                onChange={(e) => setPreset(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              >
                <option value="minimal">Minimal</option>
                <option value="subtle">Subtle</option>
                <option value="standard">Standard</option>
                <option value="intense">Intense</option>
              </select>
            </div>
            
            <div>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={showMonitor}
                  onChange={(e) => setShowMonitor(e.target.checked)}
                />
                Show Performance Monitor
              </label>
            </div>
            
            <div className="text-sm space-y-1 pt-4 border-t border-gray-600">
              <div>Performance Level: <span className="font-semibold text-primary-blue">{performanceLevel}</span></div>
              <div>Meteors: <span className="font-semibold text-accent-cyan">{optimizedSettings.meteorCount || 'Loading...'}</span></div>
              <div>Glow Intensity: <span className="font-semibold text-accent-cyan">{((optimizedSettings.glowIntensity || 0) * 100).toFixed(0)}%</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeteorTest;