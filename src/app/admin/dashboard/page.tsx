'use client';


import DonationSettings from '@/components/admin/DonationSettings';
import BannerSettings from '@/components/admin/BannerSettings';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { sendEmail } from "@/lib/email";
import toast from "react-hot-toast";
import NotificationsTab from "@/components/admin/NotificationsTab";
import { donationVerificationTemplate } from "@/lib/emailTemplates/donationVerification";
import {
  donationApprovedTemplate,
  volunteerVerificationTemplate,
  volunteerApprovedTemplate,
  volunteerRejectedTemplate,
} from "@/lib/emailTemplates/donationApproved";
import { Pencil } from "lucide-react";
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
  Shield,
  Bell,
  Sparkles,
  Loader2
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  AppNotification,
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
  deleteSuccessStory,
  getNotifications,
  addNotification, 
  updateNotification,
  deleteNotification, 
} from '@/lib/db';

type Tab =| 'overview'| 'homepage'| 'programs'| 'success'| 'achievements' | 'gallery'| 'volunteers'| 'donations'|'banner-settings'|'donation-settings'| 'contacts' | 'admins' | 'notifications';

type Admin = {
  id: string;
  auth_user_id: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  role: string;
  status: string;
  last_login: string | null;
  avatar_url: string | null;
  created_at: string;
};

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
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [adminsLoading, setAdminsLoading] = useState(false);  
  const [adminSearch, setAdminSearch] = useState("");
  const [adminRoleFilter, setAdminRoleFilter] = useState("all");
  const [adminStatusFilter, setAdminStatusFilter] = useState("all");
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [newAdminForm, setNewAdminForm] = useState({
  full_name: "",
  email: "",
  phone: "",
  role: "Admin",
  password: "",
  confirmPassword: "",
});
const [showNotificationModal, setShowNotificationModal] = useState(false);

const [notificationForm, setNotificationForm] = useState({
  title: "",
  message: "",
  priority: "Medium",
});
const [notifications, setNotifications] = useState<AppNotification[]>([]);

const [creatingAdmin, setCreatingAdmin] = useState(false);
const [showEditAdminModal, setShowEditAdminModal] = useState(false);

const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);

const [editAdminForm, setEditAdminForm] = useState({
  id: "",
  full_name: "",
  email: "",
  phone: "",
  role: "",
  status: "",
});

const [updatingAdmin, setUpdatingAdmin] = useState(false);


  // Data states
  const [homeData, setHomeData] = useState<any>(null);
  const [programs, setPrograms] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const admin =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("kas_admin") || "null")
    : null;
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

const [selectedImage, setSelectedImage] = useState<File | null>(null);



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

  useEffect(() => {
  if (activeTab === "admins") {
    loadAdmins();
  }
}, [activeTab]);

  const loadAllData = async () => {
    try {
      const [h, p, s, g, v, d, c, n] = await Promise.all([
  getHomepageContent(),
  getPrograms(),
  getSuccessStories(),
  getGallery(),
  getVolunteers(),
  getDonations(),
  getContacts(),
  getNotifications(),
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
      setNotifications(n);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      showNotification('Error fetching site content. Verify Supabase tables.', 'error');
    }
  };

  const loadAdmins = async () => {
  try {
    setAdminsLoading(true);

    const { data, error } = await supabase
      .from("admins")
      .select(`
        id,
        auth_user_id,
        full_name,
        email,
        phone,
        role,
        status,
        last_login,
        avatar_url,
        created_at
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    setAdmins(data || []);
  } catch (error) {
    console.error("Error loading admins:", error);
    showNotification("Failed to load administrators.", "error");
  } finally {
    setAdminsLoading(false);
  }
};

const createAdmin = async () => {
  if (
    !newAdminForm.full_name ||
    !newAdminForm.email ||
    !newAdminForm.role ||
    !newAdminForm.password
  ) {
    toast.error("Please fill all required fields.");
    return;
  }

  if (newAdminForm.password !== newAdminForm.confirmPassword) {
    toast.error("Passwords do not match.");
    return;
  }

  try {
    setCreatingAdmin(true);

    const response = await fetch("/api/admin/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAdminForm),
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    setShowAddAdminModal(false);

    setNewAdminForm({
      full_name: "",
      email: "",
      phone: "",
      role: "Admin",
      password: "",
      confirmPassword: "",
    });

    await loadAdmins();

  } catch (error) {
    console.error(error);
    toast.error("Something went wrong.");
  } finally {
    setCreatingAdmin(false);
  }
};

const updateAdmin = async () => {
  console.log("updateAdmin called");
toast("Button clicked");
  if (
    !editAdminForm.full_name ||
    !editAdminForm.role ||
    !editAdminForm.status
  ) {
    toast.error("Please fill all required fields.");
    return;
  }

  try {
    setUpdatingAdmin(true);

    const response = await fetch("/api/admin/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editAdminForm),
    });

    const result = await response.json();
    console.log("Response Status:", response.status);
console.log("API Result:", result);

    if (!response.ok) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    setShowEditAdminModal(false);

    setEditingAdmin(null);

    await loadAdmins();

  } catch (error) {
    console.error(error);
    toast.error("Something went wrong.");
  } finally {
    setUpdatingAdmin(false);
  }
};

const openEditAdmin = (admin: Admin) => {
toast.success("Edit clicked");
  setEditingAdmin(admin);

  setEditAdminForm({
    id: admin.id,
    full_name: admin.full_name,
    email: admin.email,
    phone: admin.phone || "",
    role: admin.role,
    status: admin.status,
  });

  setShowEditAdminModal(true);
};

const filteredAdmins = admins.filter((admin) => {
  const matchesSearch =
    admin.full_name.toLowerCase().includes(adminSearch.toLowerCase()) ||
    admin.email.toLowerCase().includes(adminSearch.toLowerCase());

  const matchesRole =
    adminRoleFilter === "all" ||
    admin.role === adminRoleFilter;

  const matchesStatus =
    adminStatusFilter === "all" ||
    admin.status === adminStatusFilter;

  return matchesSearch && matchesRole && matchesStatus;
});

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

  const handlePublishNotification = async () => {
  if (!notificationForm.title.trim()) {
    toast.error("Please enter notification title.");
    return;
  }

  if (!notificationForm.message.trim()) {
    toast.error("Please enter notification message.");
    return;
  }

  const result = await addNotification({
    title: notificationForm.title,
    message: notificationForm.message,
    priority: notificationForm.priority,
    created_by: "Admin",
    is_active: true,
  });

  if (!result.success) {
    toast.error("Failed to publish notification.");
    return;
  }

  toast.success("Notification published successfully!");

  if (!result.success || !result.data) {
  console.log(result);
  toast.error("Failed to publish notification.");
  return;
}

setNotifications((prev) => [result.data, ...prev]);

  setNotificationForm({
    title: "",
    message: "",
    priority: "Medium",
  });

  setShowNotificationModal(false);
};
const handleDeleteNotification = async (id: string) => {
  await deleteNotification(id);
  await loadAllData();
};

const handleEditNotification = async (notification: AppNotification) => {

  const title = prompt("Title", notification.title);

  if (title === null) return;

  const message = prompt("Message", notification.message);

  if (message === null) return;

  const priority =
    prompt("Priority (Low/Medium/High)", notification.priority) ??
    notification.priority;

  await updateNotification(notification.id, {
    title,
    message,
    priority,
  });

  await loadAllData();
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

  if (
    !newStoryForm.title ||
    !newStoryForm.summary ||
    !newStoryForm.content
  ) {
    showNotification("Fill in all fields.", "error");
    return;
  }

  if (!selectedImage) {
    showNotification("Please select an image.", "error");
    return;
  }

  try {
    const fileName = `${Date.now()}-${selectedImage.name}`;

    const { error: uploadError } = await supabase.storage
      .from("achievements")
      .upload(fileName, selectedImage, {
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("achievements")
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    const slug = newStoryForm.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const payload = {
      ...newStoryForm,
      image_url: imageUrl,
      slug,
      created_at: new Date().toISOString(),
    };
    
    

    const res = await addSuccessStory(payload);

    if (res.success) {
      showNotification("Achievement added successfully.");

      setNewStoryForm({
        title: "",
        summary: "",
        content: "",
        category: "education",
        image_url: "",
      });

      setSelectedImage(null);

      loadAllData();
    }
  } catch (err) {
    console.error(err);
    showNotification("Failed to add achievement.", "error");
  }
};

const handleVolunteerVerificationEmail = async (
  volunteerName: string,
  volunteerEmail: string
) => {
  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: volunteerEmail,
        subject: "Volunteer Application - Document Verification",
        html: volunteerVerificationTemplate(volunteerName),
      }),
    });

    
    const data = await res.json();

if (data.success) {
  const volunteer = volunteers.find(
    (v) => v.email === volunteerEmail
  );

 console.log("Volunteer Found:", volunteer);

if (volunteer) {
  const { data, error } = await supabase
  .from("volunteers")
  .update({
    status: "verification_requested",
    verification_requested_at: new Date().toISOString(),
    verification_reminder_count:
      (volunteer.verification_reminder_count ?? 0) + 1,
  })
  .eq("id", volunteer.id)
    .select();
    const { data: updatedVolunteer } = await supabase
  .from("volunteers")
  .select(
    "verification_requested_at, verification_reminder_count"
  )
  .eq("id", volunteer.id)
  .single();

console.log(updatedVolunteer);

  console.log("Update Data:", data);
  console.log("Update Error:", error);
  await supabase.from("activity_logs").insert({
  entity_type: "volunteer",
  entity_id: volunteer.id,
  action: "verification_requested",
  description:
    (volunteer.verification_reminder_count ?? 0) === 0
      ? "Documents requested from volunteer."
      : `Reminder #${(volunteer.verification_reminder_count ?? 0) + 1} sent to volunteer.`,
  admin_id: admin?.id,
  admin_name: admin?.full_name,
});

  loadAllData();
}
  showNotification("Verification email sent successfully.");
} else {
  showNotification("Failed to send email.", "error");
}
  } catch (err) {
    console.error(err);
    showNotification("Failed to send email.", "error");
  }
};
  const handleDeleteContact = async (id: string) => {
  await deleteContact(id);
};
  const handleDeleteStory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this achievement?')) return;
    try {
      const res = await deleteSuccessStory(id);
      if (res.success) {
        showNotification('Achievement deleted successfully.');
        loadAllData();
      }
    } catch (err) {
      showNotification('Failed to delete achievement.', 'error');
    }
  };
  
 

 const handleAddGallery = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!newGalleryForm.title) {
    showNotification("Please provide a title.", "error");
    return;
  }

  if (!selectedImage) {
    showNotification("Please select an image.", "error");
    return;
  }

  try {
    const fileName = `${Date.now()}-${selectedImage.name}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, selectedImage);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    const res = await addGalleryImage({
      title: newGalleryForm.title,
      category: newGalleryForm.category,
      caption: newGalleryForm.caption,
      image_url: imageUrl,
      url: imageUrl,
    });

    if (res.success) {
      showNotification("Gallery image added successfully.");

      setNewGalleryForm({
        title: "",
        category: "education",
        caption: "",
        image_url: "",
      });

      setSelectedImage(null);
      loadAllData();
    }
  } catch (error) {
    console.error(error);
    showNotification("Upload failed.", "error");
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
      showNotification('Failed to delete achievement.', 'error');
    }
  };

  const handleVolunteerApproval = async (
  volunteerId: string,
  volunteerName: string,
  volunteerEmail: string
) => {
  try {
    await updateVolunteerStatus(volunteerId, "approved");

    const res = await sendEmail(
      volunteerEmail,
      "Volunteer Application Approved",
      volunteerApprovedTemplate(volunteerName)
    );

    if (res.success) {
      showNotification("Volunteer approved successfully.");
      
    } else {
      showNotification("Failed to send approval email.", "error");
    }
  } catch (err) {
    console.error(err);
    showNotification("Something went wrong.", "error");
  }
};


  const handleUpdateVolunteer = async (
  id: string,
  status: "approved" | "rejected"
) => {
  try {
    const volunteer = volunteers.find((v) => v.id === id);

    const res = await updateVolunteerStatus(id, status);

    if (!res.success) {
      throw new Error("Update failed");
    }

    if (status === "approved" && volunteer?.email) {
      await sendEmail(
        volunteer.email,
        "Volunteer Application Approved",
        volunteerApprovedTemplate(volunteer.name)
      );
    }
    if (status === "rejected" && volunteer?.email) {
  await sendEmail(
    volunteer.email,
    "Volunteer Application Update",
    volunteerRejectedTemplate(volunteer.name)
  );
}

    showNotification(`Application marked as ${status}.`);
    loadAllData();
  } catch (err) {
    showNotification("Update failed.", "error");
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
              { id: 'success', label: 'Achievements', icon: <Award className="w-4 h-4" /> },
              { id: 'gallery', label: 'Gallery Manager', icon: <ImageIcon className="w-4 h-4" /> },
              { id: 'volunteers', label: 'Volunteers Log', icon: <Users className="w-4 h-4" />, count: volunteers.filter(v => v.status === 'pending').length },
              { id: 'donations', label: 'Donations Log', icon: <Heart className="w-4 h-4" /> },
              { id: 'donation-settings',label: 'Donation Settings',icon: <CreditCard className="w-4 h-4" />},     
              { id: 'contacts', label: 'Messages Log', icon: <Mail className="w-4 h-4" />, count: contacts.filter(c => c.status === 'unread').length },
              {
    id: 'admins',
    label: 'Admin Management',
    icon: <Shield className="w-4 h-4" />
},
{
  id: "notifications",
  label: "Notifications",
  icon: <Bell className="w-4 h-4" />
},
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
                    You can test adding Achievements, uploading gallery references, approving volunteers, or recording transactions. Changes persist in this browser session. To publish permanently, hook up Supabase.
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
        <h1 className="text-3xl font-extrabold text-slate-900">
          Achievements Management
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Add, manage and showcase the achievements and impact of Khula Aasman Sanstha.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Form Block */}
      <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
        <h3 className="font-bold text-slate-800 text-base">
          Add Achievement
        </h3>

        <form onSubmit={handleAddStory} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              Achievement Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. National NGO Excellence Award 2026"
              value={newStoryForm.title}
              onChange={(e) =>
                setNewStoryForm({
                  ...newStoryForm,
                  title: e.target.value,
                })
              }
              className="w-full px-4 py-2 rounded-xl border"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              Achievement Summary
            </label>
            <input
              type="text"
              required
              placeholder="A short description of the achievement"
              value={newStoryForm.summary}
              onChange={(e) =>
                setNewStoryForm({
                  ...newStoryForm,
                  summary: e.target.value,
                })
              }
              className="w-full px-4 py-2 rounded-xl border"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              Achievement Details
            </label>
            <textarea
              rows={4}
              required
              placeholder="Describe the achievement..."
              value={newStoryForm.content}
              onChange={(e) =>
                setNewStoryForm({
                  ...newStoryForm,
                  content: e.target.value,
                })
              }
              className="w-full px-4 py-2 rounded-xl border resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              Achievement Category
            </label>
            <select
              value={newStoryForm.category}
              onChange={(e) =>
                setNewStoryForm({
                  ...newStoryForm,
                  category: e.target.value,
                })
              }
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
              Achievement Image
            </label>
            <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  }}
  className="w-full px-4 py-2 rounded-xl border text-xs"
/>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Achievement
          </button>
        </form>
      </div>

      {/* List Block */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-4 py-4 border-b bg-slate-50">
          <h3 className="font-bold text-slate-800">
            All Achievements
          </h3>
        </div>

        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-slate-50 text-slate-500 border-b">
            <tr>
              <th className="px-4 py-3 font-bold">Achievement Title</th>
              <th className="px-4 py-3 font-bold">Category</th>
              <th className="px-4 py-3 font-bold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {stories.map((story) => (
              <tr key={story.id} className="hover:bg-slate-50/50">
                <td className="px-4 py-3 font-bold text-slate-800">
                  {story.title}
                </td>

                <td className="px-4 py-3 text-slate-500 capitalize">
                  {story.category}
                </td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDeleteStory(story.id)}
                    className="text-rose-600 hover:text-rose-800 p-1.5 rounded hover:bg-rose-50 cursor-pointer"
                    title="Delete Achievement"
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
  onChange={(e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  }}
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

        {activeTab === 'admins' && (
  <div className="space-y-6">

    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Admin Management
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Manage administrator accounts, roles and permissions.
        </p>
      </div>

      <button
  onClick={() => setShowAddAdminModal(true)}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
>
  + Add Admin
</button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
  <div className="bg-white rounded-xl border p-4 shadow-sm">

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

    <input
      type="text"
      placeholder="Search by name or email..."
      value={adminSearch}
      onChange={(e) => setAdminSearch(e.target.value)}
      className="border rounded-lg px-4 py-2"
    />

    <select
      value={adminRoleFilter}
      onChange={(e) => setAdminRoleFilter(e.target.value)}
      className="border rounded-lg px-4 py-2"
    >
      <option value="all">All Roles</option>
      <option value="Super Admin">Super Admin</option>
      <option value="Admin">Admin</option>
      <option value="Editor">Editor</option>
    </select>

    <select
      value={adminStatusFilter}
      onChange={(e) => setAdminStatusFilter(e.target.value)}
      className="border rounded-lg px-4 py-2"
    >
      <option value="all">All Status</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
      <option value="suspended">Suspended</option>
    </select>

  </div>

</div>
  <div className="bg-white rounded-xl border p-5 shadow-sm">
    <p className="text-sm text-gray-500">Total Admins</p>

    <h3 className="text-3xl font-bold mt-2">
      {admins.length}
    </h3>
  </div>

  <div className="bg-white rounded-xl border p-5 shadow-sm">
    <p className="text-sm text-gray-500">Active</p>

    <h3 className="text-3xl font-bold text-green-600 mt-2">
      {admins.filter(a => a.status === "active").length}
    </h3>
  </div>

  <div className="bg-white rounded-xl border p-5 shadow-sm">
    <p className="text-sm text-gray-500">Suspended</p>

    <h3 className="text-3xl font-bold text-red-600 mt-2">
      {admins.filter(a => a.status === "suspended").length}
    </h3>
  </div>

  <div className="bg-white rounded-xl border p-5 shadow-sm">
    <p className="text-sm text-gray-500">Never Logged In</p>

    <h3 className="text-3xl font-bold text-blue-600 mt-2">
      {admins.filter(a => !a.last_login).length}
    </h3>
  </div>

</div>
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr>

            <th className="text-left px-6 py-4">Name</th>

            <th className="text-left px-6 py-4">Email</th>

            <th className="text-left px-6 py-4">Role</th>

            <th className="text-left px-6 py-4">Status</th>

            <th className="text-left px-6 py-4">Last Login</th>

            <th className="text-right px-6 py-4">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>
  {adminsLoading ? (
    <tr>
      <td colSpan={6} className="text-center py-8">
        Loading administrators...
      </td>
    </tr>
  ) : admins.length === 0 ? (
    <tr>
      <td colSpan={6} className="text-center py-8 text-gray-500">
        No administrators found.
      </td>
    </tr>
  ) : (
    filteredAdmins.map((admin) => (
      <tr key={admin.id} className="border-t hover:bg-gray-50">
        <td className="px-6 py-4 font-medium">
          {admin.full_name}
        </td>

        <td className="px-6 py-4">
          {admin.email}
        </td>

        <td className="px-6 py-4">
          {admin.role}
        </td>

        <td className="px-6 py-4">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              admin.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {admin.status}
          </span>
        </td>

        <td className="px-6 py-4">
          {admin.last_login
            ? new Date(admin.last_login).toLocaleString()
            : "Never"}
        </td>

        <td className="px-6 py-4 text-right">
          <button
          onClick={() => openEditAdmin(admin)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Edit
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

      </table>

    </div>

  </div>
)}

{activeTab === "notifications" && (
  <NotificationsTab
    notifications={notifications}
    onCreate={() => {
      setShowNotificationModal(true);
    }}
    onEdit={handleEditNotification}
    onDelete={handleDeleteNotification}
  />
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
                          {(vol.status === 'pending' ||
                            vol.status === 'verification_requested') && (
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
                              <button
  onClick={() =>
    handleVolunteerVerificationEmail(
      vol.name,
      vol.email
    )
  }
  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs"
>
  {vol.status === "pending"
    ? "Request Docs"
    : "Send Reminder"}
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

      <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4">

  <h3 className="font-semibold text-slate-800 mb-3">
    Application Progress
  </h3>

  <div className="space-y-2 text-sm">

    <div className="flex items-center gap-2">
      <span className="text-green-600">✅</span>
      <span>Application Submitted</span>
    </div>

    <div className="flex items-center gap-2">
      <span>
        {selectedVolunteer.status === "verification_requested" ||
        selectedVolunteer.status === "approved"
          ? "✅"
          : "⚪"}
      </span>

      <span>Documents Requested</span>
    </div>

    <div className="flex items-center gap-2">
      <span>
        {selectedVolunteer.status === "approved"
          ? "✅"
          : selectedVolunteer.status === "rejected"
          ? "❌"
          : "🟡"}
      </span>

      <span>
        {selectedVolunteer.status === "approved"
          ? "Volunteer Approved"
          : selectedVolunteer.status === "rejected"
          ? "Application Rejected"
          : "Waiting for Documents"}
      </span>
    </div>

  </div>

</div>

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
        <div>
  <p className="text-xs text-slate-500">Application Submitted</p>
  <p>
    {selectedVolunteer.created_at
      ? new Date(selectedVolunteer.created_at).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "N/A"}
  </p>
</div>

<div>
  <p className="text-xs text-slate-500">Last Document Request</p>
  <p>
    {selectedVolunteer.verification_requested_at
      ? new Date(
          selectedVolunteer.verification_requested_at + "Z"
        ).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium",
          timeStyle: "medium",
        })
      : "Not Requested Yet"}
  </p>
</div>
<div>
  <p className="text-xs text-slate-500">Reminders Sent</p>
  <p>
    {selectedVolunteer.verification_reminder_count ?? 0}
  </p>
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

{showAddAdminModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-full max-w-lg p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          Add Administrator
        </h2>

        <button
          onClick={() => setShowAddAdminModal(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Full Name"
          value={newAdminForm.full_name}
          onChange={(e) =>
            setNewAdminForm({
              ...newAdminForm,
              full_name: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          type="email"
          placeholder="Email"
          value={newAdminForm.email}
          onChange={(e) =>
            setNewAdminForm({
              ...newAdminForm,
              email: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          type="text"
          placeholder="Phone"
          value={newAdminForm.phone}
          onChange={(e) =>
            setNewAdminForm({
              ...newAdminForm,
              phone: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-2"
        />

        <select
          value={newAdminForm.role}
          onChange={(e) =>
            setNewAdminForm({
              ...newAdminForm,
              role: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-2"
        >
          <option>Super Admin</option>
          <option>Admin</option>
          <option>Editor</option>
        </select>

        <input
          type="password"
          placeholder="Password"
          value={newAdminForm.password}
          onChange={(e) =>
            setNewAdminForm({
              ...newAdminForm,
              password: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={newAdminForm.confirmPassword}
          onChange={(e) =>
            setNewAdminForm({
              ...newAdminForm,
              confirmPassword: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-2"
        />

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setShowAddAdminModal(false)}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
  onClick={createAdmin}
  disabled={creatingAdmin}
  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg"
>
  {creatingAdmin ? "Creating..." : "Create Admin"}
</button>

      </div>

    </div>
  </div>
)}
{showEditAdminModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-full max-w-lg p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          Edit Administrator
        </h2>

        <button
          onClick={() => setShowEditAdminModal(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Full Name"
          value={editAdminForm.full_name}
          onChange={(e) =>
            setEditAdminForm({
              ...editAdminForm,
              full_name: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          type="email"
          value={editAdminForm.email}
          readOnly
          className="w-full border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
        />

        <input
          type="text"
          placeholder="Phone"
          value={editAdminForm.phone}
          onChange={(e) =>
            setEditAdminForm({
              ...editAdminForm,
              phone: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-2"
        />

        <select
          value={editAdminForm.role}
          onChange={(e) =>
            setEditAdminForm({
              ...editAdminForm,
              role: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-2"
        >
          <option>Super Admin</option>
          <option>Admin</option>
          <option>Editor</option>
        </select>

        <select
          value={editAdminForm.status}
          onChange={(e) =>
            setEditAdminForm({
              ...editAdminForm,
              status: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setShowEditAdminModal(false)}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
  onClick={updateAdmin}
  disabled={updatingAdmin}
  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg"
>
  {updatingAdmin ? "Saving..." : "Save Changes"}
</button>

      </div>

    </div>
  </div>
)}
{showNotificationModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-full max-w-lg p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          Create Notification
        </h2>

        <button
          onClick={() => setShowNotificationModal(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Notification Title"
          value={notificationForm.title}
          onChange={(e) =>
            setNotificationForm({
              ...notificationForm,
              title: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-2"
        />

        <textarea
          rows={5}
          placeholder="Notification Message"
          value={notificationForm.message}
          onChange={(e) =>
            setNotificationForm({
              ...notificationForm,
              message: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-2"
        />

        <select
          value={notificationForm.priority}
          onChange={(e) =>
            setNotificationForm({
              ...notificationForm,
              priority: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-2"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => setShowNotificationModal(false)}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
  type="button"
  onClick={handlePublishNotification}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
>
  Publish
</button>

      </div>

    </div>
  </div>
)}

      </main>
    </div>
  );
}
