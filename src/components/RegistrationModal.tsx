import React from 'react';
import { X, Check, Mail, Phone, ShieldAlert, Ticket, Sparkles, User, Shield } from 'lucide-react';
import { Activity, Registration } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activities: Activity[];
  preselectedActivityId?: string;
  onRegisterSuccess: (registration: Registration) => void;
  lang: 'EN' | 'FR' | 'ES';
}

export default function RegistrationModal({
  isOpen,
  onClose,
  activities,
  preselectedActivityId,
  onRegisterSuccess,
  lang,
}: RegistrationModalProps) {
  const [step, setStep] = React.useState<'form' | 'success'>('form');
  const [skaterName, setSkaterName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [emergencyContact, setEmergencyContact] = React.useState('');
  const [skaterLevel, setSkaterLevel] = React.useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [skateType, setSkateType] = React.useState<'Inline' | 'Quads' | 'Three-Wheel' | 'Aggressive' | 'Other'>('Inline');
  const [selectedActivityIds, setSelectedActivityIds] = React.useState<string[]>([]);
  const [bilingualPref, setBilingualPref] = React.useState<'EN' | 'FR' | 'ES'>(lang);
  const [ticketCode, setTicketCode] = React.useState('');

  // Handle preselection when modal opens
  React.useEffect(() => {
    if (preselectedActivityId) {
      setSelectedActivityIds([preselectedActivityId]);
    } else {
      setSelectedActivityIds(activities.slice(0, 1).map(a => a.id));
    }
  }, [preselectedActivityId, activities, isOpen]);

  if (!isOpen) return null;

  const toggleActivity = (id: string) => {
    setSelectedActivityIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skaterName || !email) return;

    const randomId = Math.floor(10000 + Math.random() * 90000);
    const code = `MTL-26-${randomId}`;
    setTicketCode(code);

    const newRegistration: Registration = {
      id: code,
      skaterName,
      email,
      phone,
      emergencyContact,
      selectedActivityIds,
      skaterLevel,
      skateType,
      bilingualPref,
      avatarUrl: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(skaterName)}`
    };

    onRegisterSuccess(newRegistration);
    setStep('success');
  };

  const handleReset = () => {
    setStep('form');
    setSkaterName('');
    setEmail('');
    setPhone('');
    setEmergencyContact('');
    setSkaterLevel('Intermediate');
    setSkateType('Inline');
    setSelectedActivityIds([]);
    onClose();
  };

  const t = {
    title: lang === 'EN' ? 'SECURE YOUR SPOT // GRID SYNC' : lang === 'FR' ? 'SÉCURISER VOTRE CRÉNEAU // SYNCHRO' : 'ASEGURA TU LUGAR // SINCRONIZACIÓN DE RED',
    subtitle: lang === 'EN' ? 'Authorize entry onto the MTL ROLL 2026 night grid.' : lang === 'FR' ? 'Autoriser votre entrée sur le réseau nocturne de MTL ROLL 2026.' : 'Autoriza tu entrada a la red nocturna de MTL ROLL 2026.',
    name: lang === 'EN' ? 'Skater Alias / Real Name' : lang === 'FR' ? 'Alias Skater / Nom Réel' : 'Alias del Patinador / Nombre Real',
    email: lang === 'EN' ? 'Email Address' : lang === 'FR' ? 'Adresse Courriel' : 'Correo Electrónico',
    phone: lang === 'EN' ? 'Phone Terminal' : lang === 'FR' ? 'Numéro de Téléphone' : 'Terminal Telefónica',
    emergency: lang === 'EN' ? 'Emergency Contact Info (Required for Rides)' : lang === 'FR' ? 'Contact d\'Urgence (Requis pour les Sorties)' : 'Contacto de Emergencia (Requerido para Rutas)',
    level: lang === 'EN' ? 'Skating Vector Capability' : lang === 'FR' ? 'Niveau de Maîtrise Technique' : 'Nivel de Habilidad del Patinador',
    skate: lang === 'EN' ? 'Frame Configuration' : lang === 'FR' ? 'Configuration des Platines' : 'Configuración del Chasis',
    events: lang === 'EN' ? 'Select Registered Vectors' : lang === 'FR' ? 'Sélectionner vos Vecteurs de Course' : 'Seleccionar Vectores Registrados',
    submit: lang === 'EN' ? 'INITIATE GRID TRANSFER' : lang === 'FR' ? 'INITIALISER LA SYNCHRO' : 'INICIAR TRANSFERENCIA DE RED',
    successTitle: lang === 'EN' ? 'GRID PROTOCOL AUTHORIZED' : lang === 'FR' ? 'PROTOCOLE RÉSEAU AUTORISÉ' : 'PROTOCOLO DE RED AUTORIZADO',
    successSubtitle: lang === 'EN' ? 'Your identity hash is locked into the master register.' : lang === 'FR' ? 'Votre empreinte d\'identité est enregistrée dans le registre principal.' : 'Tu hash de identidad está bloqueado en el registro principal.',
    ticketNo: lang === 'EN' ? 'TICKET ID' : lang === 'FR' ? 'ID BILLET' : 'ID DE BOLETO',
    rfid: lang === 'EN' ? 'RFID ACCORDING' : lang === 'FR' ? 'RFID ENREGISTRÉ' : 'RFID REGISTRADO',
    close: lang === 'EN' ? 'SYNC COMPLETED' : lang === 'FR' ? 'SYNCHRO TERMINÉE' : 'SINCRONIZACIÓN COMPLETADA',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0B0C10]/90 backdrop-blur-md cursor-pointer" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#1F2833] border-2 border-[#9500FF] shadow-[0_0_30px_rgba(149,0,255,0.4)] p-6 md:p-8 overflow-hidden z-10">
        
        {/* Futuristic corner borders */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#E1FD15]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#E1FD15]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#E1FD15]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#E1FD15]" />

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="font-mono text-[10px] text-[#9500FF] tracking-widest block uppercase font-bold">
              &gt; STATUS_SYNC_PENDING // 2026
            </span>
            <h2 className="font-headline text-xl md:text-2xl text-white uppercase font-black tracking-tight">
              {step === 'form' ? t.title : t.successTitle}
            </h2>
            <p className="text-xs text-[#c7c9ac] mt-1">
              {step === 'form' ? t.subtitle : t.successSubtitle}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-[#E1FD15] p-1 cursor-pointer transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-6 text-sm text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Alias / Name */}
              <div>
                <label className="block font-mono text-xs uppercase text-[#c7c9ac] mb-1.5 font-semibold">
                  {t.name} *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#c7c9ac]">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={skaterName}
                    onChange={(e) => setSkaterName(e.target.value)}
                    placeholder="e.g. SlideSlayer / John Doe"
                    className="w-full bg-[#111415] border-b-2 border-[#666666] focus:border-[#E1FD15] py-2 pl-9 pr-3 text-white placeholder-[#666666] outline-none font-sans"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block font-mono text-xs uppercase text-[#c7c9ac] mb-1.5 font-semibold">
                  {t.email} *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#c7c9ac]">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. skater@nightgrid.net"
                    className="w-full bg-[#111415] border-b-2 border-[#666666] focus:border-[#E1FD15] py-2 pl-9 pr-3 text-white placeholder-[#666666] outline-none font-sans"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block font-mono text-xs uppercase text-[#c7c9ac] mb-1.5 font-semibold">
                  {t.phone}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#c7c9ac]">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (514) XXX-XXXX"
                    className="w-full bg-[#111415] border-b-2 border-[#666666] focus:border-[#E1FD15] py-2 pl-9 pr-3 text-white placeholder-[#666666] outline-none font-sans"
                  />
                </div>
              </div>

              {/* Emergency */}
              <div>
                <label className="block font-mono text-xs uppercase text-[#c7c9ac] mb-1.5 font-semibold">
                  {t.emergency}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#9500FF]">
                    <ShieldAlert className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    placeholder="Name + Phone (e.g. Sarah 514-999-9999)"
                    className="w-full bg-[#111415] border-b-2 border-[#666666] focus:border-[#E1FD15] py-2 pl-9 pr-3 text-white placeholder-[#666666] outline-none font-sans"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Level */}
              <div>
                <label className="block font-mono text-xs uppercase text-[#c7c9ac] mb-1.5 font-semibold">
                  {t.level}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Beginner', 'Intermediate', 'Advanced'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSkaterLevel(level)}
                      className={`py-1.5 px-1 font-mono text-[10px] text-center uppercase tracking-tighter border cursor-pointer transition-all ${
                        skaterLevel === level
                          ? 'bg-[#9500FF] border-[#9500FF] text-white font-bold'
                          : 'bg-[#111415] border-[#464932] text-[#c7c9ac] hover:bg-[#111415]/60'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skate Type */}
              <div>
                <label className="block font-mono text-xs uppercase text-[#c7c9ac] mb-1.5 font-semibold">
                  {t.skate}
                </label>
                <div className="grid grid-cols-5 gap-1">
                  {(['Inline', 'Quads', 'Three-Wheel', 'Aggressive', 'Other'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSkateType(type)}
                      className={`py-1.5 px-0.5 font-mono text-[9px] text-center uppercase tracking-tighter border cursor-pointer transition-all ${
                        skateType === type
                          ? 'bg-[#E1FD15] border-[#E1FD15] text-[#0B0C10] font-bold'
                          : 'bg-[#111415] border-[#464932] text-[#c7c9ac] hover:bg-[#111415]/60'
                      }`}
                    >
                      {type === 'Three-Wheel' ? '3-Wheel' : type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Activities Choice */}
            <div>
              <label className="block font-mono text-xs uppercase text-[#c7c9ac] mb-2 font-semibold">
                {t.events} *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                {activities.map((act) => {
                  const isChecked = selectedActivityIds.includes(act.id);
                  return (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => toggleActivity(act.id)}
                      className={`flex items-start gap-3 p-2 text-left border cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-[#1e2021] border-[#9500FF]' 
                          : 'bg-[#111415] border-[#464932] opacity-70 hover:opacity-150'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 flex items-center justify-center border-2 ${
                        isChecked ? 'bg-[#9500FF] border-[#9500FF]' : 'border-[#c7c9ac]'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="font-headline text-xs font-bold text-white truncate uppercase">{act.title}</p>
                        </div>
                        <p className="text-[10px] text-[#c7c9ac] truncate mt-0.5">{act.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#E1FD15] text-[#0B0C10] font-headline py-3 px-6 uppercase tracking-wider hover:shadow-[0_0_20px_rgba(225,253,21,0.8)] transition-all scale-95 active:scale-90 cursor-pointer font-bold border-0 mt-2"
            >
              {t.submit}
            </button>
          </form>
        ) : (
          /* Success Ticket Screen */
          <div className="space-y-6 text-white text-center flex flex-col items-center">
            
            <div className="w-16 h-16 bg-[#E1FD15]/10 rounded-full flex items-center justify-center border-2 border-[#E1FD15] mb-2 animate-bounce">
              <Sparkles className="w-8 h-8 text-[#E1FD15]" />
            </div>

            {/* Hologram Ticket Layout */}
            <div className="w-full max-w-sm bg-[#111415] border border-[#9500FF]/50 p-6 relative rounded-none shadow-[0_0_20px_rgba(149,0,255,0.1)]">
              {/* Ticket side notches */}
              <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#1F2833] rounded-full border-r border-[#9500FF]/50 -translate-y-1/2" />
              <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#1F2833] rounded-full border-l border-[#9500FF]/50 -translate-y-1/2" />

              <div className="border-b border-[#9500FF]/20 pb-4 mb-4 flex justify-between items-start text-left">
                <div>
                  <p className="font-headline text-[#E1FD15] text-lg uppercase tracking-wider">MTL ROLL 2026</p>
                  <p className="font-mono text-[9px] text-[#c7c9ac]">SEPT 11-12-13 // MONTREAL</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[9px] text-white bg-[#9500FF]/40 border border-[#9500FF] px-2 py-0.5 uppercase">
                    {skaterLevel}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-left font-mono text-xs">
                <div>
                  <p className="text-[10px] text-[#c7c9ac] uppercase font-bold">SKATER IDENT</p>
                  <p className="text-white font-headline text-sm font-black uppercase tracking-tight">{skaterName}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] text-[#c7c9ac] uppercase font-bold">{t.ticketNo}</p>
                    <p className="text-white font-bold">{ticketCode}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#c7c9ac] uppercase font-bold">PLATINE</p>
                    <p className="text-[#E1FD15] font-bold">{skateType}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-[#c7c9ac] uppercase font-bold">VECTORS SECURED ({selectedActivityIds.length})</p>
                  <p className="text-white text-[11px] truncate">
                    {selectedActivityIds.map(id => activities.find(a => a.id === id)?.title).join(', ')}
                  </p>
                </div>
              </div>

              {/* Simulated QR barcode */}
              <div className="mt-6 pt-4 border-t border-dashed border-[#9500FF]/30 flex flex-col items-center">
                <div className="w-full h-12 bg-white flex items-center justify-around px-2 py-1 opacity-90 relative overflow-hidden">
                  {/* barcode lines */}
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="bg-[#0B0C10] h-full" 
                      style={{ 
                        width: `${[1, 2, 3, 4, 1, 2][(i + i * 3) % 6]}px`,
                        opacity: i % 7 === 0 ? 0 : 1 
                      }} 
                    />
                  ))}
                </div>
                <p className="font-mono text-[8px] text-[#c7c9ac] tracking-widest mt-1.5 uppercase font-bold">
                  {t.rfid}: SYNC_OK_2026_GRID
                </p>
              </div>
            </div>

            <p className="text-xs text-[#c7c9ac] max-w-sm">
              {lang === 'EN' 
                ? 'Check your inbox for local sync instructions. Print or save this card. RFID tracking beacon is now activated on your mobile app.'
                : lang === 'FR'
                ? 'Vérifiez votre courriel pour les détails de synchronisation. Enregistrez cette carte. Le traqueur RFID est actif sur votre mobile.'
                : 'Revisa tu correo para instrucciones de sincronización local. Imprime o guarda esta tarjeta. El localizador RFID está activo en tu móvil.'}
            </p>

            <button
              onClick={handleReset}
              className="bg-transparent border-2 border-[#E1FD15] text-[#E1FD15] hover:bg-[#E1FD15]/10 font-headline py-2 px-8 uppercase tracking-wider scale-95 active:scale-90 cursor-pointer font-bold transition-all mt-2"
            >
              {t.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
