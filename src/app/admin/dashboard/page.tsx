'use client';


import DonationSettings from '@/components/admin/DonationSettings';
import BannerSettings from '@/components/admin/BannerSettings';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { sendEmail } from "@/lib/email";
import { donationVerificationTemplate } from "@/lib/emailTemplates/donationVerification";
import { donationApprovedTemplate } from "@/lib/emailTemplates/donationApproved";
import {
  LayoutDashboard,
  Home,
  BookOpen,
  Award,
  Image as ImageIcon,
  Users,
  Heart,
  CreditCard,
  Mail,
  LogOut,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Check,
  CheckCircle,
  FileText,
  User,
  Sparkles,
  Loader2
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  getHomepageContent,
  updateHomepageContent,
  getPrograms,
  updateProgram,
  getGallery,
  addGalleryImage,
  deleteGalleryImage,
  getVolunteers,
  updateVolunteerStatus,
  getDonations,
  updateDonationStatus,
  getContacts,
  updateContactStatus,
  deleteContact,
  getSuccessStories,
  addSuccessStory,
  updateSuccessStory,
  deleteSuccessStory
} from '@/lib/db';

type Tab =| 'overview'| 'homepage'| 'programs'| 'success'| 'gallery'| 'volunteers'| 'donations'|'banner-settings'|'donation-settings'| 'contacts';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [loading, setLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState('');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [contactSearch, setContactSearch] = useState('');
  const [donationSearch, setDonationSearch] = useState('');
  const [contactFilter, setContactFilter] = useState('all');
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);
  const router = useRouter();


  // Data states
  const [homeData, setHomeData] = useState<any>(null);
  const [programs, setPrograms] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const totalVerifiedDonations = donations
  .filter(d => d.status?.toLowerCase() === 'verified')
  .reduce((sum, d) => sum + Number(d.amount), 0);

  const pendingVolunteers = volunteers.filter(
  v => v.status?.toLowerCase() === 'pending'
  ).length;

  const unreadMessages = contacts.filter(
  c => c.status?.toLowerCase() === 'unread'
  ).length; 

  // Feedback notifications
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Form states
  const [homeForm, setHomeForm] = useState({
    heroTitle: '',
    heroSubtitle: '',
    mission: '',
    vision: '',
    stats: { childrenEducated: '', womenEmpowered: '', mealsServed: '', volunteersCount: '' }
  });

  const [newStoryForm, setNewStoryForm] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'education',
    image_url: '/images/programs/child-education.svg'
  });

  const [newGalleryForm, setNewGalleryForm] = useState({
  title: '',
  category: 'education',
  caption: '',
  image_url: ''
});



  // Verify auth session on load
  useEffect(() => {
    const checkAuth = async () => {
      if (isSupabaseConfigured()) {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/admin/login');
          return;
        }
        setAdminEmail(session.user.email || 'Admin');
      } else {
        const mockSession = localStorage.getItem('kas_admin_session');
        if (mockSession !== 'active') {
          router.push('/admin/login');
          return;
        }
        setAdminEmail(localStorage.getItem('kas_admin_email') || 'editor@khulaaasmansanstha.org');
      }
      
      // Load all database metrics
      await loadAllData();
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  const loadAllData = async () => {
    try {
      const [h, p, s, g, v, d, c] = await Promise.all([
        getHomepageContent(),
        getPrograms(),
        getSuccessStories(),
        getGallery(),
        getVolunteers(),
        getDonations(),
        getContacts()
      ]);

      setHomeData(h);
      if (h) {
        setHomeForm({
          heroTitle: h.heroTitle || '',
          heroSubtitle: h.heroSubtitle || '',
          mission: h.mission || '',
          vision: h.vision || '',
          stats: h.stats || { childrenEducated: '', womenEmpowered: '', mealsServed: '', volunteersCount: '' }
        });
      }
      setPrograms(p);
      setStories(s);
      setGallery(g);
      setVolunteers(v);
      setDonations(d);
      setContacts(c);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      showNotification('Error fetching site content. Verify Supabase tables.', 'error');
    }
  };
  const deleteContact = async (id: string) => {
  const confirmed = window.confirm(
    'Are you sure you want to permanently delete this contact?'
  );

  if (!confirmed) return;

  try {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (error) throw error;

    setContacts((prev) => prev.filter((c) => c.id !== id));

    if (selectedContact?.id === id) {
      setSelectedContact(null);
    }

    setNotification({
      message: 'Contact deleted successfully.',
      type: 'success',
    });
  } catch (error) {
    console.error(error);

    setNotification({
      message: 'Failed to delete contact.',
      type: 'error',
    });
  }
};

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem('kas_admin_session');
      localStorage.removeItem('kas_admin_email');
    }
    router.push('/admin/login');
  };

  // ----------------------------------------------------
  // SUB-ACTIONS
  // ----------------------------------------------------

  const handleSaveHomepage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateHomepageContent(homeForm);
      if (res.success) {
        showNotification('Homepage and stats updated successfully.');
        loadAllData();
      }
    } catch (err) {
      showNotification('Save failed.', 'error');
    }
  };

  const handleAddStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoryForm.title || !newStoryForm.summary || !newStoryForm.content) {
      showNotification('Fill in all fields.', 'error');
      return;
    }
    try {
      const slug = newStoryForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const payload = {
        ...newStoryForm,
        slug,
        created_at: new Date().toISOString()
      };
      const res = await addSuccessStory(payload);
      if (res.success) {
        showNotification('New success story posted.');
        setNewStoryForm({
          title: '',
          summary: '',
          content: '',
          category: 'education',
          image_url: '/images/programs/child-education.svg'
        });
        loadAllData();
      }
    } catch (err) {
      showNotification('Error creating story.', 'error');
    }
  };
  const handleDeleteContact = async (id: string) => {
  await deleteContact(id);
};
  const handleDeleteStory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this story?')) return;
    try {
      const res = await deleteSuccessStory(id);
      if (res.success) {
        showNotification('Story removed.');
        loadAllData();
      }
    } catch (err) {
      showNotification('Delete failed.', 'error');
    }
  };

  const handleAddGallery = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!newGalleryForm.title) {
    showNotification('Please provide a title.', 'error');
    return;
  }

  try {
    const res = await addGalleryImage({
      ...newGalleryForm,
      url: newGalleryForm.image_url
    });

    if (res.success) {
      showNotification('Gallery image added.');

      setNewGalleryForm({
        title: '',
        category: 'education',
        caption: '',
        image_url: '/images/gallery/gallery-1.svg'
      });

      loadAllData();
    }
  } catch (err) {
    showNotification('Upload failed.', 'error');
  }
};

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Remove this photo?')) return;
    try {
      const res = await deleteGalleryImage(id);
      if (res.success) {
        showNotification('Photo removed.');
        loadAllData();
      }
    } catch (err) {
      showNotification('Delete failed.', 'error');
    }
  };

  const handleUpdateVolunteer = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const res = await updateVolunteerStatus(id, status);
      if (res.success) {
        showNotification(`Application marked as ${status}.`);
        loadAllData();
      }
    } catch (err) {
      showNotification('Update failed.', 'error');
    }
  };

  const handleUpdateDonation = async (
  id: string,
  status: "verified" | "rejected" | "pending",
  reason = ""
) => {
  try {
    const donation = donations.find((d) => d.id === id);

    const res = await updateDonationStatus(
      id,
      status,
      reason,
      "",
      adminEmail
    );

    if (!res.success) {
      throw new Error("Update failed");
    }

    if (donation?.email) {
      if (status === "verified") {
        await sendEmail(
          donation.email,
          "Donation Approved",
          donationApprovedTemplate(
            donation.donor_name,
            Number(donation.amount)
          )
        );
      } else if (status === "pending") {
        await sendEmail(
          donation.email,
          "Additional Verification Required",
          donationVerificationTemplate(
            donation.donor_name,
            reason
          )
        );
      } else if (status === "rejected") {
        await sendEmail(
          donation.email,
          "Donation Rejected",
          donationVerificationTemplate(
            donation.donor_name,
            reason || "Your payment could not be verified."
          )
        );
      }
    }

    showNotification(
      `Donation marked as ${status}.`,
      "success"
    );

    await loadAllData();

  } catch (err) {
    console.error(err);

    showNotification(
      "Donation update failed.",
      "error"
    );
  }
};


  const handleMarkContactRead = async (id: string) => {
    try {
      const res = await updateContactStatus(id, 'read');
      if (res.success) {
        showNotification('Inquiry marked as read.');
        loadAllData();
      }
    } catch (err) {
      showNotification('Update failed.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500 mx-auto" />
          <p className="text-slate-400 text-sm">Verifying Admin Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800">
      
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-3 text-white border-b border-slate-800 pb-6 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm">
              KA
            </div>
            <div>
              <h2 className="font-extrabold text-sm tracking-tight leading-none">KHULA AASMAN</h2>
              <span className="text-[9px] tracking-wider uppercase text-orange-500 font-semibold block mt-0.5">ADMIN SHELL</span>
            </div>
          </div>

          <nav className="space-y-1.5">
            
            {[
              { id: 'overview', label: 'Overview Stats', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'homepage', label: 'Manage Homepage', icon: <Home className="w-4 h-4" /> },
              { id: 'programs', label: 'Manage Programs', icon: <BookOpen className="w-4 h-4" /> },
              { id: 'success', label: 'Success Stories', icon: <Award className="w-4 h-4" /> },
              { id: 'gallery', label: 'Gallery Manager', icon: <ImageIcon className="w-4 h-4" /> },
              { id: 'volunteers', label: 'Volunteers Log', icon: <Users className="w-4 h-4" />, count: volunteers.filter(v => v.status === 'pending').length },
              { id: 'donations', label: 'Donations Log', icon: <Heart className="w-4 h-4" /> },
              { id: 'donation-settings',label: 'Donation Settings',icon: <CreditCard className="w-4 h-4" />},     
              { id: 'contacts', label: 'Messages Log', icon: <Mail className="w-4 h-4" />, count: contacts.filter(c => c.status === 'unread').length },
              { id: 'banner-settings',label: 'Hero & Banners',icon: <ImageIcon className="w-4 h-4" />},
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {tab.icon}
                  {tab.label}
                </div>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="bg-orange-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-slate-800 mt-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-semibold">
              <User className="w-4 h-4" />
            </div>
            <div className="truncate">
              <p className="text-xs text-slate-400 font-bold">Logged In As</p>
              <p className="text-[11px] text-slate-300 truncate">{adminEmail}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 text-sm font-semibold transition-colors cursor-pointer border border-transparent hover:border-rose-900/30"
          >
            <LogOut className="w-4 h-4" />
            Logout Session
          </button>
        </div>
      </aside>

      {/* Main Workspace content */}
      <main className="flex-grow pt-24 px-6 pb-10 sm:px-10 relative">
        
        {/* Floating feedback notification */}
        {notification && (
          <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl shadow-xl border text-sm font-semibold transition-all animate-fade-in ${
            notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
              : 'bg-rose-50 border-rose-100 text-rose-800'
          }`}>
            <CheckCircle className="w-4 h-4" />
            <span>{notification.message}</span>
          </div>
        )}

        {/* Tab content shells */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Dashboard Overview</h1>
              <p className="text-slate-500 text-sm mt-1">Live overview of donations, volunteers and website activity.</p>
            </div>

            {/* Simulated indicators grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Total Donations</span>
                <span className="block text-3xl font-black text-slate-800 mt-2">
                  ₹{totalVerifiedDonations.toLocaleString('en-IN')}
                </span>
                <span className="block text-xs text-slate-500 mt-1">Confirmed offline and UPI receipts</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Volunteers Registered</span>
                <span className="block text-3xl font-black text-slate-800 mt-2">{volunteers.length}</span>
                <span className="block text-xs text-slate-500 mt-1">
                  {pendingVolunteers > 0
                    ? `${pendingVolunteers} Pending Approval`
                    : 'All applications processed'}
                </span>               
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Unread Messages</span>
                <span className="block text-3xl font-black text-slate-800 mt-2">
                  {unreadMessages}
                </span>
                <span className="block text-xs text-slate-500 mt-1">Inquiries from Contact Page</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Website Health</span>
                <span className="block text-3xl font-black text-emerald-600 mt-2">100% Uptime</span>
                <span className="block text-xs text-slate-500 mt-1">Next.js 15 routing active</span>
              </div>
            </div>

            {/* Offline notification banner */}
            {!isSupabaseConfigured() && (
              <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl text-sm text-blue-900 flex flex-col sm:flex-row items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-700 flex-shrink-0">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-extrabold text-blue-950">Local Storage Mock DB Active</h4>
                  <p className="text-blue-700/80 text-xs mt-0.5 leading-relaxed">
                    You can test adding success stories, uploading gallery references, approving volunteers, or recording transactions. Changes persist in this browser session. To publish permanently, hook up Supabase.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'homepage' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Manage Homepage Content</h1>
              <p className="text-slate-500 text-sm mt-1">Update general text elements, mission statement, and metrics counters.</p>
            </div>

            <form onSubmit={handleSaveHomepage} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider border-b pb-2">Hero Section</h3>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Hero Title Heading</label>
                  <input
                    type="text"
                    value={homeForm.heroTitle}
                    onChange={(e) => setHomeForm({ ...homeForm, heroTitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Hero Subtitle Paragraph</label>
                  <textarea
                    rows={3}
                    value={homeForm.heroSubtitle}
                    onChange={(e) => setHomeForm({ ...homeForm, heroSubtitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm resize-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider border-b pb-2">Mission & Vision</h3>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Mission Description</label>
                  <textarea
                    rows={2}
                    value={homeForm.mission}
                    onChange={(e) => setHomeForm({ ...homeForm, mission: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Vision Description</label>
                  <textarea
                    rows={2}
                    value={homeForm.vision}
                    onChange={(e) => setHomeForm({ ...homeForm, vision: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm resize-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider border-b pb-2">Impact Statistics Counters</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Kids Educated</label>
                    <input
                      type="text"
                      value={homeForm.stats.childrenEducated}
                      onChange={(e) => setHomeForm({ ...homeForm, stats: { ...homeForm.stats, childrenEducated: e.target.value } })}
                      className="w-full px-4 py-2 rounded-xl border text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Women Empowered</label>
                    <input
                      type="text"
                      value={homeForm.stats.womenEmpowered}
                      onChange={(e) => setHomeForm({ ...homeForm, stats: { ...homeForm.stats, womenEmpowered: e.target.value } })}
                      className="w-full px-4 py-2 rounded-xl border text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Meals Served</label>
                    <input
                      type="text"
                      value={homeForm.stats.mealsServed}
                      onChange={(e) => setHomeForm({ ...homeForm, stats: { ...homeForm.stats, mealsServed: e.target.value } })}
                      className="w-full px-4 py-2 rounded-xl border text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Volunteers Count</label>
                    <input
                      type="text"
                      value={homeForm.stats.volunteersCount}
                      onChange={(e) => setHomeForm({ ...homeForm, stats: { ...homeForm.stats, volunteersCount: e.target.value } })}
                      className="w-full px-4 py-2 rounded-xl border text-xs"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                Save General Content Changes
              </button>
            </form>
          </div>
        )}

        {activeTab === 'programs' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Manage Program Pillars</h1>
              <p className="text-slate-500 text-sm mt-1">Review description texts and media locations for the six program pillars.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b">
                  <tr>
                    <th className="px-6 py-4 font-bold">Pillar Title</th>
                    <th className="px-6 py-4 font-bold">Description Preview</th>
                    <th className="px-6 py-4 font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {programs.map((program) => (
                    <tr key={program.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-bold text-slate-900">{program.title}</td>
                      <td className="px-6 py-4 text-slate-500 line-clamp-2 max-w-sm">{program.description}</td>
                      <td className="px-6 py-4">
                      <span className="text-slate-400 text-sm">—</span>
                    </td>                 
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'success' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900">Success Stories Panel</h1>
                <p className="text-slate-500 text-sm mt-1">Publish and delete stories of change from Varanasi centers.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Block */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-800 text-base">Write New Story</h3>
                <form onSubmit={handleAddStory} className="space-y-4 text-sm">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Story Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Suman Joins College"
                      value={newStoryForm.title}
                      onChange={(e) => setNewStoryForm({ ...newStoryForm, title: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Brief Summary Description</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. A brief single line introduction..."
                      value={newStoryForm.summary}
                      onChange={(e) => setNewStoryForm({ ...newStoryForm, summary: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Full Detailed Story Narrative</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write the full success narrative here..."
                      value={newStoryForm.content}
                      onChange={(e) => setNewStoryForm({ ...newStoryForm, content: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Program Category</label>
                    <select
                      value={newStoryForm.category}
                      onChange={(e) => setNewStoryForm({ ...newStoryForm, category: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border bg-white"
                    >
                      <option value="education">Education</option>
                      <option value="women">Women Empowerment</option>
                      <option value="meals">Meals & Nutrition</option>
                      <option value="rural">Rural Development</option>
                      <option value="environment">Environment</option>
                      <option value="sports">Sports & Skills</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Placeholder Image Path</label>
                    <input
                      type="text"
                      required
                      value={newStoryForm.image_url}
                      onChange={(e) => setNewStoryForm({ ...newStoryForm, image_url: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border text-xs"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Publish Story
                  </button>
                </form>
              </div>

              {/* List Block */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-slate-50 text-slate-500 border-b">
                    <tr>
                      <th className="px-4 py-3 font-bold">Title</th>
                      <th className="px-4 py-3 font-bold">Category</th>
                      <th className="px-4 py-3 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stories.map(story => (
                      <tr key={story.id} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-bold text-slate-800">{story.title}</td>
                        <td className="px-4 py-3 text-slate-500 capitalize">{story.category}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDeleteStory(story.id)}
                            className="text-rose-600 hover:text-rose-800 p-1.5 rounded hover:bg-rose-50 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Gallery Manager</h1>
              <p className="text-slate-500 text-sm mt-1">Upload and catalog photo references.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Block */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-800 text-base">Add Photo Reference</h3>
                <form onSubmit={handleAddGallery} className="space-y-4 text-sm">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Image Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Center Study Session"
                      value={newGalleryForm.title}
                      onChange={(e) => setNewGalleryForm({ ...newGalleryForm, title: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Caption Details (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Children learning computer basics"
                      value={newGalleryForm.caption}
                      onChange={(e) => setNewGalleryForm({ ...newGalleryForm, caption: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Category Pillar</label>
                    <select
                      value={newGalleryForm.category}
                      onChange={(e) => setNewGalleryForm({ ...newGalleryForm, category: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border bg-white"
                    >
                      <option value="education">Education</option>
                      <option value="women">Women Empowerment</option>
                      <option value="meals">Meals & Nutrition</option>
                      <option value="rural">Rural Development</option>
                      <option value="environment">Environment</option>
                      <option value="sports">Sports & Skills</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                    Upload Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                     setNewGalleryForm({
                        ...newGalleryForm,
                       image_url: e.target.files?.[0]?.name || '',
                      })
                    }                    
                    className="w-full px-4 py-2 rounded-xl border text-xs"
                  />                                        
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Register Photo
                  </button>
                </form>
              </div>

              {/* Photo list */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-slate-50 text-slate-500 border-b">
                    <tr>
                      <th className="px-4 py-3 font-bold">Image Title</th>
                      <th className="px-4 py-3 font-bold">Category</th>
                      <th className="px-4 py-3 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {gallery.map((img, index) => (
                      <tr key={img.id || index} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3 font-bold text-slate-800">{img.title}</td>
                        <td className="px-4 py-3 text-slate-500 capitalize">{img.category}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDeleteGallery(img.id)}
                            className="text-rose-600 hover:text-rose-800 p-1.5 rounded hover:bg-rose-50 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'volunteers' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Volunteer Registrations Log</h1>
              <p className="text-slate-500 text-sm mt-1">Review applicant profiles, phone numbers, and approve or reject submissions.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {volunteers.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  No volunteer registrations recorded yet.
                </div>
              ) : (
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-slate-50 text-slate-500 border-b">
                    <tr>
                      <th className="px-6 py-4 font-bold">Name</th>
                      <th className="px-6 py-4 font-bold">Contact Channel</th>
                      <th className="px-6 py-4 font-bold">Skills</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {volunteers.map(vol => (
                      <tr key={vol.id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900">{vol.name}</div>
                          <div className="text-slate-400 text-xs">{vol.address}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div>Email: {vol.email}</div>
                          <div className="text-slate-500">Phone: {vol.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 text-xs max-w-xs truncate" title={vol.skills}>
                          {vol.skills || 'None stated'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block font-extrabold text-[10px] uppercase px-2 py-0.5 rounded-full ${
                            vol.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : vol.status === 'rejected'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {vol.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 space-x-2">
                          {vol.status === 'pending' && (
                            <>
                              <button
                                onClick={() => setSelectedVolunteer(vol)}
                                className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer"
                              >
                                View
                              </button>                              
                              <button
                                onClick={() => handleUpdateVolunteer(vol.id, 'approved')}
                                className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-sm"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleUpdateVolunteer(vol.id, 'rejected')}
                                className="px-2.5 py-1 rounded border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs cursor-pointer"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {activeTab === 'donations' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Donations Ledger</h1>
              <p className="text-slate-500 text-sm mt-1">Review reported payments, UPI reference numbers, and match with bank accounts.</p>
              <div className="mt-4">
  <input
    type="text"
    placeholder="Search by donor name, email or transaction ID..."
    value={donationSearch}
    onChange={(e) => setDonationSearch(e.target.value)}
    className="w-full max-w-md border border-slate-300 rounded-xl px-4 py-2"
  />
</div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {donations.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  No donation records posted yet.
                </div>
              ) : (
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-slate-50 text-slate-500 border-b">
                    <tr>
                      <th className="px-6 py-4 font-bold">Donor Details</th>
                      <th className="px-6 py-4 font-bold">Amount & Type</th>
                      <th className="px-6 py-4 font-bold">Transaction Ref</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {donations
                    .filter((don) => {
                      const search = donationSearch.toLowerCase();

                      return (
                        don.name?.toLowerCase().includes(search) ||
                        don.email?.toLowerCase().includes(search) ||
                        don.transaction_id?.toLowerCase().includes(search)
                      );
                    })
                    .map((don) => (                 
                      <tr key={don.id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900">{don.donor_name}</div>
                          <div className="text-slate-400 text-xs">{don.email} | {don.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-blue-700">₹{don.amount.toLocaleString('en-IN')}</div>
                          <div className="text-slate-400 text-[10px] uppercase font-semibold">
                          {don.payment_method}
                        </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-slate-600">{don.transaction_id}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block font-extrabold text-[10px] uppercase px-2 py-0.5 rounded-full ${
                            don.status === 'verified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : don.status === 'rejected'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {don.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
  <div className="flex gap-2">

    <button
      onClick={() => setSelectedDonation(don)}
      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
    >
      View
    </button>

    <>
  <button
    onClick={() => handleUpdateDonation(don.id, 'verified')}
    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
  >
    {don.status?.toLowerCase() === 'verified'
      ? 'Verified'
      : 'Approve'}
  </button>

  <button
  onClick={() => {
    const reason = prompt(
      'Why is more verification required?\n\nExample:\n- Screenshot not clear\n- Transaction not found\n- Wrong Transaction ID'
    );

    if (reason) {
      handleUpdateDonation(don.id, 'pending', reason);
    }
  }}
  className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold"
>
  Need Verification
</button>

<button
  onClick={() => {
    const reason = prompt('Reason for rejection:');

    if (reason) {
      handleUpdateDonation(don.id, 'rejected', reason);
    }
  }}
  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold"
>
  Reject
</button>
</>

  </div>
</td>                     
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
        {activeTab === 'banner-settings' && (
        <BannerSettings />
)}
        {activeTab === 'donation-settings' && (
        <DonationSettings />
)}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Inquiry Messages</h1>
              <p className="text-slate-500 text-sm mt-1">Read client queries and reply over email channels.</p>
              <div className="mt-4 flex gap-3">

                <input
                  type="text"
                  placeholder="Search by name, email or phone..."
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  className="w-full max-w-md border border-slate-300 rounded-xl px-4 py-2"
                />

                <select
                  value={contactFilter}
                  onChange={(e) => setContactFilter(e.target.value)}
                  className="border border-slate-300 rounded-xl px-4 py-2"
                >
                  <option value="all">All</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                </select>

              </div>              
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {contacts.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  No contact queries in log.
                </div>
              ) : (
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-slate-50 text-slate-500 border-b">
                    <tr>
                      <th className="px-6 py-4 font-bold">Client</th>
                      <th className="px-6 py-4 font-bold">Message</th>
                      <th className="px-6 py-4 font-bold">Status</th>
                      <th className="px-6 py-4 font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
  {contacts
    .filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
        c.email.toLowerCase().includes(contactSearch.toLowerCase()) ||
        c.phone.toLowerCase().includes(contactSearch.toLowerCase());

      const matchesStatus =
        contactFilter === 'all' ? true : c.status === contactFilter;

      return matchesSearch && matchesStatus;
    })
    .map((c) => (
      <tr key={c.id} className="hover:bg-slate-50/50">
        <td className="px-6 py-4">
          <div className="font-bold text-slate-900">{c.name}</div>
          <div className="text-slate-400 text-xs">
            {c.email} | {c.phone}
          </div>
        </td>

        <td className="px-6 py-4 text-xs text-slate-600 max-w-sm whitespace-pre-wrap">
          {c.message}
        </td>

        <td className="px-6 py-4">
          <span
            className={`inline-block font-extrabold text-[10px] uppercase px-2 py-0.5 rounded-full ${
              c.status === 'read'
                ? 'bg-slate-100 text-slate-600'
                : 'bg-orange-100 text-orange-800'
            }`}
          >
            {c.status}
          </span>
        </td>

        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
  <button
    onClick={() => setSelectedContact(c)}
    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
  >
    View
  </button>

  <button
    onClick={() => deleteContact(c.id)}
    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold"
  >
    Delete
  </button>
</div>

            {c.status === 'unread' && (
              <button
                onClick={() => handleMarkContactRead(c.id)}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
              >
                Read
              </button>
            )}
          </div>
        </td>
      </tr>
    ))}
</tbody>
                </table>
              )}
            </div>
          </div>
        )}
      {selectedDonation && (
  <div className="fixed inset-0 z-[9999] bg-black/60 overflow-y-auto">
    <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl mx-auto mt-10 mb-10">

      <h2 className="text-2xl font-bold mb-6">
        Donation Details
      </h2>

      <div className="space-y-3 text-sm">

        <p><strong>Name:</strong> {selectedDonation.donor_name}</p>

        <p><strong>Email:</strong> {selectedDonation.email}</p>

        <p><strong>Phone:</strong> {selectedDonation.phone}</p>

        <p><strong>Amount:</strong> ₹{selectedDonation.amount}</p>

        <p><strong>Payment Type:</strong> {selectedDonation.payment_method}</p>

        <p><strong>Transaction ID:</strong> {selectedDonation.transaction_id}</p>

        <p><strong>Status:</strong> {selectedDonation.status}</p>

        <p><strong>Message:</strong> {selectedDonation.message || 'No message provided'}</p>
        {selectedDonation.proof_image && (
  <div className="mt-6">
    <p className="font-semibold mb-2">Payment Screenshot</p>

    <img
      src={selectedDonation.proof_image}
      alt="Payment Proof"
      className="w-full max-h-[450px] object-contain rounded-xl border border-slate-300"
    />

    <a
      href={selectedDonation.proof_image}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-3 text-blue-600 hover:underline text-sm"
    >
      Open Full Image
    </a>
  </div>
)}
        <hr className="my-4" />

<p>
  <strong>Verification Reason:</strong><br />
  {selectedDonation.verification_reason || "Not Available"}
</p>

<p className="mt-3">
  <strong>Admin Note:</strong><br />
  {selectedDonation.admin_note || "No Note"}
</p>

<p className="mt-3">
  <strong>Verified By:</strong><br />
  {selectedDonation.verified_by || "Not Verified Yet"}
</p>

<p className="mt-3">
  <strong>Verified At:</strong><br />
  {selectedDonation.verified_at
    ? new Date(selectedDonation.verified_at).toLocaleString()
    : "Pending"}
</p>

<p className="mt-3">
  <strong>Email Sent:</strong><br />
  {selectedDonation.email_sent ? "✅ Yes" : "❌ No"}
</p>
      </div>

      <div className="mt-8 flex justify-between">

  <div className="flex gap-2">

    {selectedDonation.status === 'pending' && (
      <>
        <button
          onClick={async () => {
            await handleUpdateDonation(selectedDonation.id, 'verified');
            setSelectedDonation(null);
          }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-semibold"
        >
          Approve
        </button>

        <button
          onClick={async () => {
            await handleUpdateDonation(selectedDonation.id, 'rejected');
            setSelectedDonation(null);
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-semibold"
        >
          Reject
        </button>
      </>
    )}

  </div>

  <button
    onClick={() => setSelectedDonation(null)}
    className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-xl"
  >
    Close
  </button>

</div>

    </div>
  </div>
)}
   {selectedVolunteer && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-start overflow-y-auto z-50 p-6">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Volunteer Profile
      </h2>

      <div className="grid grid-cols-2 gap-5">

        <div>
          <p className="text-xs text-slate-500">Name</p>
          <p className="font-semibold">{selectedVolunteer.name}</p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Email</p>
          <p>{selectedVolunteer.email}</p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Phone</p>
          <p>{selectedVolunteer.phone}</p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Status</p>
          <p className="capitalize">{selectedVolunteer.status}</p>
        </div>

        <div className="col-span-2">
          <p className="text-xs text-slate-500">Address</p>
          <p>{selectedVolunteer.address}</p>
        </div>

        <div className="col-span-2">
          <p className="text-xs text-slate-500">Skills</p>
          <p>{selectedVolunteer.skills || "Not Provided"}</p>
        </div>

        <div className="col-span-2">
          <p className="text-xs text-slate-500">Experience</p>
          <p>{selectedVolunteer.experience || "Not Provided"}</p>
        </div>

      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={() => setSelectedVolunteer(null)}
          className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-xl"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)} 
    {selectedContact && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">

      <h2 className="text-2xl font-bold mb-6">
        Contact Message
      </h2>

      <div className="space-y-4">

        <div>
          <p className="text-xs text-slate-500">Name</p>
          <p className="font-semibold">{selectedContact.name}</p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Email</p>
          <p>{selectedContact.email}</p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Phone</p>
          <p>{selectedContact.phone}</p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Status</p>
          <p className="capitalize">{selectedContact.status}</p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Message</p>

          <div className="mt-2 rounded-xl bg-slate-100 p-4 whitespace-pre-wrap">
            {selectedContact.message}
          </div>
        </div>

      </div>

        <div className="flex justify-between items-center mt-8">

  <div className="flex gap-2">

    <a
      href={`mailto:${selectedContact.email}`}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold"
    >
      Reply
    </a>

    <button
      onClick={() => navigator.clipboard.writeText(selectedContact.email)}
      className="bg-slate-200 hover:bg-slate-300 px-5 py-2 rounded-xl"
    >
      Copy Email
    </button>

  </div>

  <div className="flex gap-2">

    <button
      onClick={async () => {

        if (!confirm('Delete this contact message?')) return;

        await deleteContact(selectedContact.id);

      }}
      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-semibold"
    >
      Delete
    </button>

    <button
      onClick={() => setSelectedContact(null)}
      className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-xl"
    >
      Close
    </button>

      </div>

    </div>

    </div>
  </div>
)} 
      </main>
    </div>
  );
}
