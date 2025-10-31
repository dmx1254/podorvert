import React from 'react';
import { X, Mail, Phone, Building, Calendar, MessageSquare, Tag } from 'lucide-react';
import { Partner } from '../../lib/supabase';

interface PartnerDetailsModalProps {
  partner: Partner;
  isOpen: boolean;
  onClose: () => void;
}

const PartnerDetailsModal: React.FC<PartnerDetailsModalProps> = ({ partner, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Détails du Partenaire</h2>
            <p className="text-green-100 text-sm mt-1">Informations complètes</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Tag className="w-4 h-4" />
                <span>Type de Partenaire</span>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <span className="text-green-700 font-semibold">
                  {partner.partner_type || 'Entreprise'}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Building className="w-4 h-4" />
                <span>Organisation</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-gray-900 font-medium">{partner.company || '-'}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <span>Nom et Prénom</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-gray-900 font-medium">{partner.name}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <a
                  href={`mailto:${partner.email}`}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  {partner.email}
                </a>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Phone className="w-4 h-4" />
                <span>Téléphone</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-gray-900 font-medium">{partner.phone || '-'}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Calendar className="w-4 h-4" />
                <span>Date d'envoi</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-gray-900 font-medium">
                  {new Date(partner.created_at).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>

          {partner.message && (
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <MessageSquare className="w-4 h-4" />
                <span>Message</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {partner.message}
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Fermer
            </button>
            <a
              href={`mailto:${partner.email}`}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium py-3 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all text-center"
            >
              Envoyer un email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetailsModal;
