import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import axios from "axios";

const AdminContacts = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [isLoadingContacts, setIsLoadingContacts] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        status: "all",
        service: "all",
        search: "",
    });
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0,
    });
    const [selectedContact, setSelectedContact] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Redirect if not authenticated
    if (!isAuthenticated && !isLoading) {
        return <Navigate to="/portal" replace />;
    }

    useEffect(() => {
        loadContacts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [contacts, filters]);

    const loadContacts = async (page = 1) => {
        try {
            setIsLoadingContacts(true);
            setError(null);

            const token = localStorage.getItem("admin_token");
            const response = await axios.get("/admin/contacts", {
                params: {
                    page,
                    per_page: pagination.per_page,
                    ...filters,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            setContacts(response.data.data);
            setPagination({
                current_page: response.data.current_page,
                last_page: response.data.last_page,
                per_page: response.data.per_page,
                total: response.data.total,
            });
        } catch (error) {
            console.error("Failed to load contacts:", error);
            setError(
                error.response?.data?.message || "Failed to load contacts"
            );
        } finally {
            setIsLoadingContacts(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...contacts];

        if (filters.status !== "all") {
            filtered = filtered.filter(
                (contact) => contact.status === filters.status
            );
        }

        if (filters.service !== "all") {
            filtered = filtered.filter(
                (contact) => contact.service === filters.service
            );
        }

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(
                (contact) =>
                    contact.name.toLowerCase().includes(searchLower) ||
                    contact.email.toLowerCase().includes(searchLower) ||
                    contact.subject.toLowerCase().includes(searchLower) ||
                    (contact.organization &&
                        contact.organization
                            .toLowerCase()
                            .includes(searchLower))
            );
        }

        setFilteredContacts(filtered);
    };

    const handleStatusUpdate = async (contactId, newStatus) => {
        try {
            const token = localStorage.getItem("admin_token");
            await axios.patch(
                `/admin/contacts/${contactId}/status`,
                {
                    status: newStatus,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // Update local state
            setContacts(
                contacts.map((contact) =>
                    contact.id === contactId
                        ? { ...contact, status: newStatus }
                        : contact
                )
            );
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const handleDelete = async (contactId) => {
        if (!confirm("Are you sure you want to delete this contact?")) return;

        try {
            const token = localStorage.getItem("admin_token");
            await axios.delete(`/admin/contacts/${contactId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setContacts(contacts.filter((contact) => contact.id !== contactId));
        } catch (error) {
            console.error("Failed to delete contact:", error);
        }
    };

    const openContactModal = (contact) => {
        setSelectedContact(contact);
        setShowModal(true);

        // Mark as read if new
        if (contact.status === "new") {
            handleStatusUpdate(contact.id, "read");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "new":
                return "bg-red-500/20 text-red-400 border-red-500/30";
            case "read":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            case "replied":
                return "bg-blue-500/20 text-blue-400 border-blue-500/30";
            case "resolved":
                return "bg-green-500/20 text-green-400 border-green-500/30";
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        }
    };

    const getServiceLabel = (service) => {
        const serviceLabels = {
            "web-development": "Web Development",
            "ui-ux-design": "UI/UX Design",
            "mobile-development": "Mobile Development",
            "cloud-devops": "Cloud & DevOps",
            "digital-branding": "Digital Branding",
            consulting: "Consulting",
            other: "Other",
        };
        return serviceLabels[service] || service;
    };

    if (isLoading || isLoadingContacts) {
        return (
            <div className="min-h-screen bg-primary-bg flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary-bg">
            {/* Header */}
            <header className="bg-secondary-bg/50 backdrop-blur-lg border-b border-subtle-highlight/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/portal/dashboard"
                                className="text-muted-text hover:text-primary-text transition-colors"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </Link>
                            <h1 className="text-xl font-bold text-primary-text">
                                Contact Management
                            </h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Filters */}
                <div className="bg-secondary-bg/30 backdrop-blur-lg border border-subtle-highlight/30 rounded-xl p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-primary-text mb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search contacts..."
                                value={filters.search}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        search: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2 bg-primary-bg border border-subtle-highlight/50 rounded-lg text-primary-text placeholder-muted-text focus:border-primary-blue focus:outline-none"
                            />
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-primary-text mb-2">
                                Status
                            </label>
                            <select
                                value={filters.status}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        status: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2 bg-primary-bg border border-subtle-highlight/50 rounded-lg text-primary-text focus:border-primary-blue focus:outline-none"
                            >
                                <option value="all">All Status</option>
                                <option value="new">New</option>
                                <option value="read">Read</option>
                                <option value="replied">Replied</option>
                                <option value="resolved">Resolved</option>
                            </select>
                        </div>

                        {/* Service Filter */}
                        <div>
                            <label className="block text-sm font-medium text-primary-text mb-2">
                                Service
                            </label>
                            <select
                                value={filters.service}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        service: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2 bg-primary-bg border border-subtle-highlight/50 rounded-lg text-primary-text focus:border-primary-blue focus:outline-none"
                            >
                                <option value="all">All Services</option>
                                <option value="web-development">
                                    Web Development
                                </option>
                                <option value="ui-ux-design">
                                    UI/UX Design
                                </option>
                                <option value="mobile-development">
                                    Mobile Development
                                </option>
                                <option value="cloud-devops">
                                    Cloud & DevOps
                                </option>
                                <option value="digital-branding">
                                    Digital Branding
                                </option>
                                <option value="consulting">Consulting</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Results Count */}
                        <div className="flex items-end">
                            <div className="text-sm text-muted-text">
                                Showing {filteredContacts.length} of{" "}
                                {pagination.total} contacts
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Contacts Table */}
                <div className="bg-secondary-bg/30 backdrop-blur-lg border border-subtle-highlight/30 rounded-xl overflow-hidden">
                    {filteredContacts.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-primary-bg/50">
                                        <tr>
                                            <th className="text-left py-4 px-6 text-sm font-medium text-primary-text">
                                                Name
                                            </th>
                                            <th className="text-left py-4 px-6 text-sm font-medium text-primary-text">
                                                Subject
                                            </th>
                                            <th className="text-left py-4 px-6 text-sm font-medium text-primary-text">
                                                Service
                                            </th>
                                            <th className="text-left py-4 px-6 text-sm font-medium text-primary-text">
                                                Status
                                            </th>
                                            <th className="text-left py-4 px-6 text-sm font-medium text-primary-text">
                                                Date
                                            </th>
                                            <th className="text-left py-4 px-6 text-sm font-medium text-primary-text">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-subtle-highlight/20">
                                        {filteredContacts.map((contact) => (
                                            <tr
                                                key={contact.id}
                                                className="hover:bg-primary-bg/30 transition-colors"
                                            >
                                                <td className="py-4 px-6">
                                                    <div>
                                                        <div className="text-primary-text font-medium">
                                                            {contact.name}
                                                        </div>
                                                        <div className="text-muted-text text-sm">
                                                            {contact.email}
                                                        </div>
                                                        {contact.organization && (
                                                            <div className="text-muted-text text-xs">
                                                                {
                                                                    contact.organization
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="text-primary-text">
                                                        {contact.subject}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    {contact.service && (
                                                        <span className="px-2 py-1 text-xs rounded-full bg-primary-blue/20 text-primary-blue">
                                                            {getServiceLabel(
                                                                contact.service
                                                            )}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <select
                                                        value={contact.status}
                                                        onChange={(e) =>
                                                            handleStatusUpdate(
                                                                contact.id,
                                                                e.target.value
                                                            )
                                                        }
                                                        className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(
                                                            contact.status
                                                        )} bg-transparent focus:outline-none`}
                                                    >
                                                        <option value="new">
                                                            New
                                                        </option>
                                                        <option value="read">
                                                            Read
                                                        </option>
                                                        <option value="replied">
                                                            Replied
                                                        </option>
                                                        <option value="resolved">
                                                            Resolved
                                                        </option>
                                                    </select>
                                                </td>
                                                <td className="py-4 px-6 text-muted-text text-sm">
                                                    {new Date(
                                                        contact.created_at
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() =>
                                                                openContactModal(
                                                                    contact
                                                                )
                                                            }
                                                            className="text-primary-blue hover:text-blue-300 transition-colors"
                                                        >
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    contact.id
                                                                )
                                                            }
                                                            className="text-red-400 hover:text-red-300 transition-colors"
                                                        >
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <svg
                                className="w-12 h-12 text-muted-text mx-auto mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                            <p className="text-muted-text">
                                No contacts found matching your criteria
                            </p>
                        </div>
                    )}
                </div>
            </main>

            {/* Contact Detail Modal */}
            {showModal && selectedContact && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-secondary-bg border border-subtle-highlight/30 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-xl font-bold text-primary-text">
                                    Contact Details
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-muted-text hover:text-primary-text transition-colors"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-primary-text mb-1">
                                            Name
                                        </label>
                                        <p className="text-muted-text">
                                            {selectedContact.name}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-primary-text mb-1">
                                            Email
                                        </label>
                                        <p className="text-muted-text">
                                            {selectedContact.email}
                                        </p>
                                    </div>
                                    {selectedContact.organization && (
                                        <div>
                                            <label className="block text-sm font-medium text-primary-text mb-1">
                                                Organization
                                            </label>
                                            <p className="text-muted-text">
                                                {selectedContact.organization}
                                            </p>
                                        </div>
                                    )}
                                    {selectedContact.phone && (
                                        <div>
                                            <label className="block text-sm font-medium text-primary-text mb-1">
                                                Phone
                                            </label>
                                            <p className="text-muted-text">
                                                {selectedContact.phone}
                                            </p>
                                        </div>
                                    )}
                                    {selectedContact.service && (
                                        <div>
                                            <label className="block text-sm font-medium text-primary-text mb-1">
                                                Service
                                            </label>
                                            <p className="text-muted-text">
                                                {getServiceLabel(
                                                    selectedContact.service
                                                )}
                                            </p>
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium text-primary-text mb-1">
                                            Status
                                        </label>
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(
                                                selectedContact.status
                                            )}`}
                                        >
                                            {selectedContact.status}
                                        </span>
                                    </div>
                                    {selectedContact.budget && (
                                        <div>
                                            <label className="block text-sm font-medium text-primary-text mb-1">
                                                Budget
                                            </label>
                                            <p className="text-muted-text">
                                                {selectedContact.budget}
                                            </p>
                                        </div>
                                    )}
                                    {selectedContact.timeline && (
                                        <div>
                                            <label className="block text-sm font-medium text-primary-text mb-1">
                                                Timeline
                                            </label>
                                            <p className="text-muted-text">
                                                {selectedContact.timeline}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-primary-text mb-1">
                                        Subject
                                    </label>
                                    <p className="text-muted-text">
                                        {selectedContact.subject}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-primary-text mb-1">
                                        Message
                                    </label>
                                    <div className="bg-primary-bg/50 border border-subtle-highlight/30 rounded-lg p-4">
                                        <p className="text-muted-text whitespace-pre-wrap">
                                            {selectedContact.message}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between text-xs text-muted-text">
                                    <span>
                                        Submitted:{" "}
                                        {new Date(
                                            selectedContact.created_at
                                        ).toLocaleString()}
                                    </span>
                                    <span>ID: {selectedContact.id}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminContacts;
