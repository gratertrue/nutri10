import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { getStoredData, setStoredData, STORAGE_KEYS } from '@/lib/storage';
import { User, Activity, Heart, Target } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

const Profile = () => {
  const [profile, setProfile] = useState(() => getStoredData(STORAGE_KEYS.USER_PROFILE, {
    name: '',
    age: 25,
    weight: 70,
    height: 175,
    gender: 'male',
    activityLevel: 'moderate',
    calorieGoal: 2000,
    healthConditions: [],
    dietaryRestrictions: []
  }));

  const conditions = ['Diabetes', 'Heart Condition', 'Hypertension', 'Stomach Sensitivity'];
  const diets = ['Vegetarian', 'Vegan', 'Paleo', 'Gluten-Free', 'Keto'];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredData(STORAGE_KEYS.USER_PROFILE, profile);
    showSuccess("Profile updated successfully!");
  };

  const toggleItem = (list: string[], item: string, key: string) => {
    const newList = list.includes(item) 
      ? list.filter(i => i !== item) 
      : [...list, item];
    setProfile({ ...profile, [key]: newList });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Biometric Profile</h2>
        <p className="text-slate-400">Personalize your nutrition intelligence engine.</p>
      </header>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard>
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <User size={20} className="text-cyan-400" />
              Basic Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 uppercase mb-1 block">Full Name</label>
                <input 
                  type="text" 
                  value={profile.name}
                  onChange={e => setProfile({...profile, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 uppercase mb-1 block">Age</label>
                  <input 
                    type="number" 
                    value={profile.age}
                    onChange={e => setProfile({...profile, age: parseInt(e.target.value)})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase mb-1 block">Gender</label>
                  <select 
                    value={profile.gender}
                    onChange={e => setProfile({...profile, gender: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <Activity size={20} className="text-purple-400" />
              Body Metrics
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 uppercase mb-1 block">Weight (kg)</label>
                  <input 
                    type="number" 
                    value={profile.weight}
                    onChange={e => setProfile({...profile, weight: parseInt(e.target.value)})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase mb-1 block">Height (cm)</label>
                  <input 
                    type="number" 
                    value={profile.height}
                    onChange={e => setProfile({...profile, height: parseInt(e.target.value)})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-500 uppercase mb-1 block">Daily Calorie Goal</label>
                <input 
                  type="number" 
                  value={profile.calorieGoal}
                  onChange={e => setProfile({...profile, calorieGoal: parseInt(e.target.value)})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none"
                />
              </div>
            </div>
          </GlassCard>
        </div>

        <GlassCard>
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <Heart size={20} className="text-pink-400" />
            Health & Diet
          </h3>
          <div className="space-y-6">
            <div>
              <label className="text-xs text-slate-500 uppercase mb-3 block">Health Conditions</label>
              <div className="flex flex-wrap gap-2">
                {conditions.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleItem(profile.healthConditions, c, 'healthConditions')}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm transition-all",
                      profile.healthConditions.includes(c) 
                        ? "bg-cyan-500 text-white" 
                        : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-500 uppercase mb-3 block">Dietary Restrictions</label>
              <div className="flex flex-wrap gap-2">
                {diets.map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleItem(profile.dietaryRestrictions, d, 'dietaryRestrictions')}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm transition-all",
                      profile.dietaryRestrictions.includes(d) 
                        ? "bg-purple-500 text-white" 
                        : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-transform"
        >
          Save Profile & Recalculate Goals
        </button>
      </form>
    </div>
  );
};

export default Profile;