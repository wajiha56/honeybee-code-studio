import { motion } from 'motion/react';
import AIAvatarTriage from './AIAvatarTriage';

export default function ShafishifaLookbook() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <div className="flex items-center space-x-2 text-honey mb-4">
        <span className="bg-honey/20 px-2 py-1 text-xs">Shafishifa Verified Practitioner</span>
      </div>
      <h1 className="text-5xl font-batman mb-10">Dr. Sarah Ahmed</h1>
      
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-slate-900 p-6 border border-white/10">
          <p>Specialty: Histopathology</p>
          <p>Located In: Satellite Medical Complex</p>
          <a href="#" className="block mt-4 bg-green-600 text-white p-3 text-center">Book via WhatsApp</a>
        </div>
        <AIAvatarTriage />
      </div>
    </div>
  );
}
