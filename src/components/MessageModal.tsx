import React from 'react';
import { X, Mail, User, MessageSquare, Calendar } from 'lucide-react';
import { Contact } from '../lib/supabase';

interface MessageModalProps {
  message: Contact;
  isOpen: boolean;
  onClose: () => void;
}

export default function MessageModal({ message, isOpen, onClose }: MessageModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">Message reçu</h2>
            <div className="flex items-center text-blue-100 text-sm">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(message.created_at).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-start">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Nom</p>
                <p className="text-lg font-semibold text-gray-900">{message.name}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Email</p>
                <a
                  href={`mailto:${message.email}`}
                  className="text-lg text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {message.email}
                </a>
              </div>
            </div>

            {/* Subject */}
            {message.subject && (
              <div className="flex items-start">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Sujet</p>
                  <p className="text-lg font-semibold text-gray-900">{message.subject}</p>
                </div>
              </div>
            )}

            {/* Message */}
            <div className="bg-gray-50 rounded-xl p-4 mt-4">
              <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Message</p>
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {message.message}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
