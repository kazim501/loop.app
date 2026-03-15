/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  ShoppingBag, 
  ArrowLeft, 
  Settings, 
  Star, 
  ChevronRight, 
  History, 
  Bell, 
  LogOut, 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  CheckCircle2, 
  Home, 
  Package, 
  Wallet, 
  User,
  PlusCircle,
  Search,
  MessageSquare,
  Zap,
  MoreVertical,
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserRole, Order, CourierStats } from './types';
import { optimizeRoute } from './services/geminiService';

// Mock Data
const MOCK_ORDERS: Order[] = [
  {
    id: 'LP2412251',
    customerName: 'Ahmet Yılmaz',
    address: 'Bağdat Cad. No:124 D:5, Kadıköy, İstanbul',
    status: 'on_way',
    items: [
      { name: 'Süt 1L', quantity: 2, price: 40 },
      { name: 'Tam Buğday Ekmeği', quantity: 1, price: 30 }
    ],
    distance: '1.2 km',
    estimatedTime: '8 dk',
    priority: true,
    price: 156.00,
    earning: 57.50,
    date: 'Bugün, 14:20'
  },
  {
    id: 'LP2412252',
    customerName: 'Mehmet Demir',
    address: 'Şair Nedim Cad. No:45, Beşiktaş, İstanbul',
    status: 'preparing',
    items: [
      { name: 'Elite Runner X-200', quantity: 1, price: 1250 }
    ],
    distance: '2.8 km',
    estimatedTime: '15 dk',
    priority: false,
    price: 245.50,
    earning: 45.00,
    date: 'Bugün, 12:45'
  }
];

const COURIER_STATS: CourierStats = {
  totalDeliveries: 1234,
  successRate: 98.5,
  rating: 4.8,
  dailyEarnings: 1250,
  activeTime: '8s 30dk'
};

export default function App() {
  const [role, setRole] = useState<UserRole>(null);
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [optimizationResult, setOptimizationResult] = useState<string>('');
  const [userData, setUserData] = useState({
    name: 'Enes',
    surname: 'Tevge',
    phone: '0555 123 45 67',
    email: 'enes.tevge@email.com'
  });

  const handleOptimize = async () => {
    const addresses = MOCK_ORDERS.map(o => o.address);
    const result = await optimizeRoute(addresses);
    setOptimizationResult(result);
  };

  // Screen Components
  const HomeScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#f8f6f6]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center w-full max-w-md"
      >
        <div className="w-20 h-20 bg-[#D30000] rounded-2xl flex items-center justify-center shadow-lg mb-4">
          <span className="text-white text-4xl font-light">8</span>
        </div>
        <h1 className="text-[#D30000] text-5xl font-bold mb-1 tracking-tight">LOOP</h1>
        <p className="text-gray-500 text-lg font-medium mb-12">Lojistik Optimizasyon Platformu</p>

        <div className="w-full space-y-4">
          <button 
            onClick={() => { setRole('courier'); setCurrentScreen('courier_profile'); }}
            className="w-full bg-white rounded-2xl p-5 flex items-center text-left shadow-md hover:bg-gray-50 transition-all group"
          >
            <div className="bg-[#D30000]/5 w-16 h-16 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-[#D30000]/10 transition-colors">
              <Truck className="w-8 h-8 text-[#D30000]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">Kurye Girişi</span>
              <span className="text-sm text-gray-500">Teslimatlarınızı yönetin ve rotanızı optimize edin</span>
            </div>
          </button>

          <button 
            onClick={() => { setRole('customer'); setCurrentScreen('customer_profile'); }}
            className="w-full bg-white rounded-2xl p-5 flex items-center text-left shadow-md hover:bg-gray-50 transition-all group"
          >
            <div className="bg-[#D30000]/5 w-16 h-16 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-[#D30000]/10 transition-colors">
              <ShoppingBag className="w-8 h-8 text-[#D30000]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">Müşteri Girişi</span>
              <span className="text-sm text-gray-500">Siparişlerinizi takip edin ve yeni sipariş verin</span>
            </div>
          </button>
        </div>

        <footer className="mt-24 text-gray-400 text-sm font-medium">
          Gerçek zamanlı optimizasyon ile akıllı teslimat
        </footer>
      </motion.div>
    </div>
  );

  const CourierProfile = () => (
    <div className="bg-[#f8f6f6] min-h-screen pb-24">
      <div className="bg-[#c41e3a] px-4 pt-8 pb-16 rounded-b-[2.5rem] shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setRole(null)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-white text-xl font-bold">Profilim</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white">
            <Settings size={20} />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden shadow-xl bg-slate-200">
              <img src="https://picsum.photos/seed/courier/200" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
          </div>
          <h2 className="text-white text-2xl font-bold mt-4">{userData.name} {userData.surname}</h2>
          <p className="text-white/80 text-sm font-medium">Kurye #12345</p>
          <div className="flex items-center gap-1 mt-1 bg-white/20 px-3 py-1 rounded-full">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-white text-sm font-bold">4.8 Rating</span>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-10 mb-6">
        <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-2xl shadow-xl">
          <div className="flex flex-col items-center text-center">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Teslimat</p>
            <p className="text-[#c41e3a] text-xl font-bold mt-1">{COURIER_STATS.totalDeliveries}</p>
          </div>
          <div className="flex flex-col items-center text-center border-x border-slate-100">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Başarı</p>
            <p className="text-[#c41e3a] text-xl font-bold mt-1">{COURIER_STATS.successRate}%</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Puan</p>
            <p className="text-[#c41e3a] text-xl font-bold mt-1">{COURIER_STATS.rating}</p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        <h3 className="text-slate-900 text-lg font-bold px-1">Hesap Bilgileri</h3>
        <div className="space-y-2">
          {[
            { icon: <User size={20} />, title: 'Kişisel Bilgiler', sub: 'Ad, soyad, telefon numarası', screen: 'personal_info' },
            { icon: <History size={20} />, title: 'Teslimat Geçmişi', sub: 'Geçmiş siparişleriniz ve detaylar', screen: 'delivery_history' },
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentScreen(item.screen)}
              className="w-full flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#c41e3a]/10 flex items-center justify-center text-[#c41e3a]">
                {item.icon}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold">{item.title}</p>
                <p className="text-xs text-slate-500">{item.sub}</p>
              </div>
              <ChevronRight size={20} className="text-slate-400" />
            </button>
          ))}
          <button onClick={() => setRole(null)} className="w-full flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100 hover:bg-red-100 transition-colors mt-8 group">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-600">
              <LogOut size={20} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-red-600">Çıkış Yap</p>
              <p className="text-xs text-red-400">Oturumu güvenli bir şekilde kapat</p>
            </div>
            <ChevronRight size={20} className="text-red-300 group-hover:text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );

  const OrderDetail = ({ order }: { order: Order }) => {
    const [isPriority, setIsPriority] = useState(order.priority);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div className="bg-slate-50 min-h-screen pb-32">
        <header className="bg-[#D30000] text-white pt-12 pb-10 px-6 rounded-b-[2.5rem] shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setCurrentScreen('courier_deliveries')} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold">Sipariş Detayı</h1>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
              <MoreVertical size={20} />
            </button>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-red-100 text-[10px] font-medium uppercase tracking-widest">Sipariş No</span>
            <h2 className="text-3xl font-extrabold tracking-tight">#{order.id}</h2>
            <div className="mt-4 px-4 py-1.5 bg-white text-[#D30000] rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
              {order.status === 'on_way' ? 'Teslim Alındı' : 'Hazırlanıyor'}
            </div>
          </div>
        </header>

        <main className="px-4 -mt-6 space-y-4">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="bg-red-50 p-2 rounded-xl text-[#D30000]">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Öncelikli Teslimat</h3>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {isPriority ? 'Bu sipariş öncelikli kapsamdadır.' : 'Standart teslimat seçeneği.'}
                  </p>
                </div>
              </div>
              <div 
                onClick={(e) => { e.stopPropagation(); setIsPriority(!isPriority); }}
                className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${isPriority ? 'bg-[#D30000]' : 'bg-slate-200'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isPriority ? 'translate-x-5' : ''}`} />
              </div>
            </div>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-5 border-t border-slate-50"
                >
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 size={14} className="text-green-500" />
                      <span>Ekstra kazanç: +₺12.50</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 size={14} className="text-green-500" />
                      <span>Teslimat süresi: Max 15 dk</span>
                    </div>
                    <p className="text-[10px] text-slate-400 italic">
                      * Öncelikli teslimatlar yapay zeka tarafından rotada en başa alınır.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-red-50 p-2.5 rounded-2xl text-[#D30000]">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Mesafe</p>
              <p className="font-bold text-slate-800 text-lg">{order.distance}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-red-50 p-2.5 rounded-2xl text-[#D30000]">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Süre</p>
              <p className="font-bold text-slate-800 text-lg">{order.estimatedTime}</p>
            </div>
          </div>
        </div>

        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full h-48 bg-slate-100 rounded-3xl overflow-hidden shadow-sm border border-slate-100 block"
        >
          <img src="https://images.unsplash.com/photo-1569336415962-a4bd9f6dfc0f?auto=format&fit=crop&q=80&w=400&h=200" alt="Istanbul Map" className="w-full h-full object-cover" />
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-white/50">
            <MapPin size={14} className="text-[#D30000]" />
            <span className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">Haritayı Genişlet</span>
          </div>
        </a>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-red-50 overflow-hidden">
              <img src="https://picsum.photos/seed/customer/100" alt="Customer" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800">{order.customerName}</h4>
              <p className="text-xs text-[#D30000] font-medium">Müşteri Puanı: 4.9 ★</p>
            </div>
            <button className="w-10 h-10 rounded-2xl bg-red-50 text-[#D30000] flex items-center justify-center">
              <Phone size={20} />
            </button>
          </div>
          <div className="flex gap-4 pt-4 border-t border-slate-50">
            <div className="text-[#D30000] mt-0.5">
              <Home size={20} />
            </div>
            <div>
              <h5 className="text-[10px] font-bold text-[#D30000] uppercase tracking-widest mb-1">Teslimat Adresi</h5>
              <p className="text-[13px] text-slate-600 leading-relaxed font-medium">{order.address}</p>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 bg-white border-t border-slate-100 flex gap-3">
        <button className="flex-1 h-14 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
          <Navigation size={18} />
          Navigasyon
        </button>
        <button className="flex-1 h-14 bg-[#D30000] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-900/20">
          <CheckCircle2 size={18} />
          Teslim Et
        </button>
      </div>
    </div>
  );
  };

  const EarningsScreen = () => (
    <div className="bg-[#f8f6f6] min-h-screen pb-24">
      <header className="bg-[#c41e3a] px-4 pb-8 pt-6 rounded-b-[2rem] shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setCurrentScreen('courier_profile')} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-white text-xl font-bold">Kazançlarım</h1>
          <div className="w-10" /> {/* Spacer to keep title centered */}
        </div>
        <div className="text-center text-white">
          <p className="text-sm opacity-90 font-medium">Bu Hafta Toplam</p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <h2 className="text-4xl font-bold tracking-tight">₺8.400,00</h2>
            <span className="bg-white/20 text-[10px] px-2 py-1 rounded-full font-bold flex items-center gap-0.5">
              <Zap size={10} /> +12%
            </span>
          </div>
        </div>
      </header>

      <main className="-mt-6 px-4 space-y-6">
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: <Wallet size={18} />, label: 'Günlük Kazanç', val: '₺1.250' },
            { icon: <Truck size={18} />, label: 'Teslimatlar', val: '12' },
            { icon: <Star size={18} />, label: 'Ort. Puan', val: '4.9' },
            { icon: <Clock size={18} />, label: 'Aktif Süre', val: '8s 30dk' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-2 text-[#c41e3a] mb-1">
                {stat.icon}
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">{stat.label}</p>
              </div>
              <p className="text-xl font-bold">{stat.val}</p>
            </div>
          ))}
        </div>

        <section className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-lg mb-4">Haftalık Performans</h3>
          <div className="flex items-end justify-between h-40 gap-2">
            {[
              { h: 60, v: '₺850' },
              { h: 85, v: '₺1.250' },
              { h: 45, v: '₺620' },
              { h: 70, v: '₺980' },
              { h: 95, v: '₺1.420' },
              { h: 30, v: '₺410' },
              { h: 20, v: '₺280' }
            ].map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[8px] font-bold text-slate-500 mb-1">{item.v}</span>
                <div className="w-full bg-[#c41e3a]/10 rounded-t-md relative" style={{ height: `${item.h}%` }}>
                  <div className="bg-[#c41e3a] rounded-t-md w-full absolute bottom-0 h-full" />
                </div>
                <span className="text-[10px] font-bold text-slate-400">{['PZT', 'SAL', 'ÇAR', 'PER', 'CUM', 'CTS', 'PAZ'][i]}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Son Teslimatlar</h3>
            <button className="text-[#c41e3a] text-sm font-bold">Tümünü Gör</button>
          </div>
          <div className="space-y-3">
            {MOCK_ORDERS.map((order) => (
              <div key={order.id} className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="bg-[#c41e3a]/10 text-[#c41e3a] p-2 rounded-lg">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{order.address.split(',')[1].trim()} → {order.address.split(',')[0].trim()}</p>
                    <p className="text-xs text-slate-500">{order.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">₺{order.earning}</p>
                  <span className="text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">Tamamlandı</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );

  const CourierDeliveries = () => (
    <div className="bg-slate-50 min-h-screen pb-24">
      <header className="bg-[#C41E3A] pt-12 pb-6 px-6 text-white rounded-b-[32px] shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold tracking-tight">Teslimatlarim</h1>
          <div className="bg-black/10 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">8</div>
        </div>
        <div className="flex items-center space-x-2 text-xs font-medium text-white/90">
          <span>3 Aktif Teslimat</span>
          <span className="opacity-40">•</span>
          <button onClick={handleOptimize} className="flex items-center hover:underline">
            <Zap size={12} className="mr-1" />
            Optimize Edilmiş Rota
          </button>
        </div>
        {optimizationResult && (
          <div className="mt-4 p-3 bg-white/10 rounded-xl text-xs backdrop-blur-sm border border-white/10">
            <p className="font-bold mb-1">Smart Route Optimization:</p>
            <p>{optimizationResult}</p>
          </div>
        )}
      </header>

      <main className="p-4 space-y-4 -mt-4">
        {MOCK_ORDERS.map((order) => (
          <div 
            key={order.id} 
            onClick={() => { setSelectedOrder(order); setCurrentScreen('order_detail'); }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4 active:scale-[0.98] transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C41E3A]/5 flex items-center justify-center text-[#C41E3A] font-bold text-sm">
                  {order.id.slice(-1)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">#{order.id}</h3>
                  <p className="text-xs text-slate-500">{order.customerName}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                order.status === 'on_way' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
              }`}>
                {order.status === 'on_way' ? 'Teslim Alındı' : 'Hazırlanıyor'}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-slate-400 mt-0.5" />
                <p className="text-[13px] text-slate-600 leading-tight">{order.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-slate-400" />
                <p className="text-[11px] font-medium text-slate-500">{order.estimatedTime} • {order.distance}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-50 flex justify-between items-center text-xs">
              <span className="text-slate-400">{order.items.length} ürün</span>
              <div className="flex gap-3">
                <span className="font-bold text-slate-800">{order.price.toFixed(2)} ₺</span>
                <span className="font-bold text-emerald-500 flex items-center">
                  <Wallet size={12} className="mr-1" /> {order.earning?.toFixed(2)} ₺
                </span>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );

  const CustomerProfile = () => (
    <div className="bg-[#f8f6f6] min-h-screen pb-24">
      <div className="bg-[#D30000] pt-8 pb-12 px-6 rounded-b-[2.5rem] shadow-lg relative">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setRole(null)} className="text-white hover:bg-white/20 p-2 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-white text-xl font-bold">Profilim</h2>
          <button className="text-white hover:bg-white/20 p-2 rounded-full transition-colors">
            <Settings size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-4 border-white/30 overflow-hidden bg-white shadow-xl">
              <img src="https://picsum.photos/seed/customer_p/200" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 bg-white text-[#D30000] p-1.5 rounded-full shadow-lg border border-[#D30000]/10 flex items-center justify-center">
              <PlusCircle size={14} />
            </button>
          </div>
          <div className="mt-4 text-center">
            <h1 className="text-white text-2xl font-bold tracking-tight">{userData.name} {userData.surname}</h1>
            <p className="text-white/80 text-sm font-medium">{userData.email}</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6 flex-1">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex justify-around p-4 mb-6">
          <div className="text-center">
            <p className="text-[#D30000] font-bold text-lg">12</p>
            <p className="text-slate-500 text-xs">Siparişlerim</p>
          </div>
          <div className="w-px bg-slate-100 h-8 self-center"></div>
          <div className="text-center">
            <p className="text-[#D30000] font-bold text-lg">250</p>
            <p className="text-slate-500 text-xs">Puanlarım</p>
          </div>
          <div className="w-px bg-slate-100 h-8 self-center"></div>
          <div className="text-center">
            <p className="text-[#D30000] font-bold text-lg">3</p>
            <p className="text-slate-500 text-xs">Kuponlarım</p>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest px-2 mb-2">Hesap Yönetimi</h3>
          {[
            { icon: <User size={20} />, title: 'Kişisel Bilgiler', screen: 'personal_info' },
            { icon: <MapPin size={20} />, title: 'Adres Defteri', screen: 'customer_profile' },
            { icon: <Zap size={20} />, title: 'Güvenlik ve Şifre', screen: 'customer_profile' },
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentScreen(item.screen)}
              className="w-full flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 hover:border-[#D30000]/20 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-[#D30000] group-hover:bg-[#D30000] group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <span className="flex-1 font-semibold text-slate-700 text-sm text-left">{item.title}</span>
              <ChevronRight size={20} className="text-slate-400" />
            </button>
          ))}
        </div>

        <button onClick={() => setRole(null)} className="w-full bg-red-50 hover:bg-[#D30000] text-[#D30000] hover:text-white py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all group mb-10 border border-[#D30000]/20">
          <LogOut size={20} />
          Çıkış Yap
        </button>
      </div>
    </div>
  );

  const BottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around items-center px-4 pb-8 pt-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
      <button 
        onClick={() => setCurrentScreen(role === 'courier' ? 'courier_deliveries' : 'customer_home')}
        className={`flex flex-col items-center gap-1 group ${currentScreen.includes('deliveries') || currentScreen.includes('home') ? 'text-[#D30000]' : 'text-slate-400'}`}
      >
        <div className={`w-16 h-10 rounded-2xl flex items-center justify-center transition-transform ${currentScreen.includes('deliveries') || currentScreen.includes('home') ? 'bg-[#D30000]/5' : ''}`}>
          <MapPin size={24} />
        </div>
        <span className="text-[10px] font-bold">Teslimatlar</span>
      </button>
      <button 
        onClick={() => setCurrentScreen(role === 'courier' ? 'earnings' : 'wallet')}
        className={`flex flex-col items-center gap-1 group ${currentScreen === 'earnings' ? 'text-[#D30000]' : 'text-slate-400'}`}
      >
        <div className={`w-16 h-10 flex items-center justify-center transition-transform ${currentScreen === 'earnings' ? 'bg-[#D30000]/5' : ''}`}>
          <Wallet size={24} />
        </div>
        <span className="text-[10px] font-bold">Kazançlar</span>
      </button>
      <button 
        onClick={() => setCurrentScreen(role === 'courier' ? 'courier_profile' : 'customer_profile')}
        className={`flex flex-col items-center gap-1 group ${currentScreen.includes('profile') ? 'text-[#D30000]' : 'text-slate-400'}`}
      >
        <div className={`w-16 h-10 flex items-center justify-center transition-transform ${currentScreen.includes('profile') ? 'bg-[#D30000]/5' : ''}`}>
          <User size={24} />
        </div>
        <span className="text-[10px] font-bold">Profil</span>
      </button>
    </nav>
  );

  // Main Router
  const renderScreen = () => {
    if (!role) return <HomeScreen />;
    
    switch (currentScreen) {
      case 'courier_profile': return <CourierProfile />;
      case 'courier_deliveries': return <CourierDeliveries />;
      case 'order_detail': return selectedOrder ? <OrderDetail order={selectedOrder} /> : <CourierDeliveries />;
      case 'earnings': return <EarningsScreen />;
      case 'customer_profile': return <CustomerProfile />;
      case 'personal_info': return <PersonalInfoScreen />;
      case 'delivery_history': return <DeliveryHistoryScreen />;
      default: return role === 'courier' ? <CourierDeliveries /> : <CustomerProfile />;
    }
  };

  const PersonalInfoScreen = () => {
    const [formData, setFormData] = useState(userData);

    const handleSave = () => {
      setUserData(formData);
      setCurrentScreen(role === 'courier' ? 'courier_profile' : 'customer_profile');
    };

    return (
      <div className="bg-[#f8f6f6] min-h-screen pb-24">
        <header className="bg-[#c41e3a] px-4 pt-8 pb-6 rounded-b-[2rem] shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => setCurrentScreen(role === 'courier' ? 'courier_profile' : 'customer_profile')} 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-white text-xl font-bold">Kişisel Bilgiler</h1>
            <div className="w-10" />
          </div>
        </header>

        <main className="p-4 space-y-4 -mt-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Ad</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[#c41e3a]/30 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Soyad</label>
              <input 
                type="text" 
                value={formData.surname}
                onChange={(e) => setFormData({...formData, surname: e.target.value})}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[#c41e3a]/30 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Telefon Numarası</label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[#c41e3a]/30 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">E-posta</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[#c41e3a]/30 transition-colors"
              />
            </div>

            <button 
              onClick={handleSave}
              className="w-full bg-[#c41e3a] text-white py-4 rounded-xl font-bold shadow-lg shadow-red-900/20 active:scale-95 transition-all"
            >
              Değişiklikleri Kaydet
            </button>
          </div>
        </main>
      </div>
    );
  };

  const DeliveryHistoryScreen = () => {
    const history = [
      { id: 'LP9901', date: '11 Mart 2026', customer: 'Ayşe Kaya', address: 'Nişantaşı, İstanbul', price: '₺120.00', earning: '₺45.00' },
      { id: 'LP9902', date: '10 Mart 2026', customer: 'Caner Öz', address: 'Etiler, İstanbul', price: '₺245.00', earning: '₺65.00' },
      { id: 'LP9903', date: '09 Mart 2026', customer: 'Selin Ak', address: 'Kadıköy, İstanbul', price: '₺85.00', earning: '₺35.00' },
      { id: 'LP9904', date: '08 Mart 2026', customer: 'Burak Yılmaz', address: 'Şişli, İstanbul', price: '₺310.00', earning: '₺80.00' },
    ];

    return (
      <div className="bg-[#f8f6f6] min-h-screen pb-24">
        <header className="bg-[#c41e3a] px-4 pt-8 pb-6 rounded-b-[2rem] shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => setCurrentScreen('courier_profile')} 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-white text-xl font-bold">Teslimat Geçmişi</h1>
            <div className="w-10" />
          </div>
        </header>

        <main className="p-4 space-y-3 -mt-4">
          {history.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-[#c41e3a] bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-widest">#{item.id}</span>
                <span className="text-[10px] font-bold text-slate-400">{item.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <User size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-800">{item.customer}</h4>
                  <p className="text-xs text-slate-500">{item.address}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-50 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Sipariş Tutarı</span>
                  <span className="text-sm font-bold text-slate-800">{item.price}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Kazancınız</span>
                  <span className="text-sm font-bold text-emerald-500">{item.earning}</span>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto relative min-h-screen bg-white shadow-2xl overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
      {role && <BottomNav />}
    </div>
  );
}
