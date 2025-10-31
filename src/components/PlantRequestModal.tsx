"use client"

import React, { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Leaf, Building2, User, Mail, Phone, MapPin, Calendar, Hash, Users, Target, MessageSquare, X, Sparkles } from "lucide-react"
import { supabase } from "../lib/supabase"

export default function PlantRequestModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    organizationName: "",
    groupmentType: "",
    responsibleName: "",
    email: "",
    phone: "",
    location: "",
    plannedDate: "",
    quantityRequested: "",
    plantSpecies: "",
    activityObjective: "",
    additionalMessage: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const insertData = {
        organization_name: formData.organizationName,
        groupment_type: formData.groupmentType,
        responsible_name: formData.responsibleName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        planned_date: formData.plannedDate,
        quantity_requested: parseInt(formData.quantityRequested),
        plant_species: formData.plantSpecies,
        activity_objective: formData.activityObjective,
        additional_message: formData.additionalMessage || null,
      }

      const { error, data } = await supabase.from('plant_requests').insert([insertData]).select()

      if (error) {
        alert(`❌ Erreur lors de l'envoi: ${error.message}`)
        throw error
      }

      if (!data || data.length === 0) {
        alert('❌ Erreur: Aucune donnée retournée après l\'envoi.')
        throw new Error('Aucune donnée retournée')
      }

      alert("✅ Votre demande a bien été envoyée à Podor Vert.\n\nMerci pour votre engagement pour la nature !")
      setFormData({
        organizationName: "",
        groupmentType: "",
        responsibleName: "",
        email: "",
        phone: "",
        location: "",
        plannedDate: "",
        quantityRequested: "",
        plantSpecies: "",
        activityObjective: "",
        additionalMessage: "",
      })
      setOpen(false)
    } catch (error: any) {
      const errorMessage = error?.message || 'Erreur inconnue'
      alert(`❌ Une erreur est survenue:\n\n${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden group"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
        <span className="relative flex items-center gap-2">
          <Leaf className="w-5 h-5 animate-pulse" />
          Demande de Plantes
          <Sparkles className="w-4 h-4" />
        </span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[90vw] sm:w-[85vw] md:w-[75vw] lg:w-[65vw] max-w-3xl h-auto max-h-[85vh] sm:max-h-[90vh] p-0 gap-0 overflow-hidden rounded-xl sm:rounded-2xl border-0">
          <div className="bg-white flex flex-col max-h-[85vh] sm:max-h-[90vh]">
            <div className="flex-shrink-0 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200 flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-green-800 flex items-center gap-1.5 sm:gap-2">
                  <Leaf className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" />
                  <span className="truncate">Demande de Plantes</span>
                </h2>
                <p className="text-[10px] sm:text-xs md:text-sm text-green-700 mt-0.5">
                  Formulaire de demande de plants
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 sm:p-2 hover:bg-white/50 rounded-full transition-colors flex-shrink-0"
                type="button"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-green-700" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5">
              <div className="bg-green-50 border border-green-200 rounded-lg p-2.5 sm:p-3 md:p-4 mb-3 sm:mb-4 md:mb-5">
                <p className="text-[11px] sm:text-xs md:text-sm text-green-800 leading-relaxed">
                  <strong>Podor Vert</strong> met à disposition des plants pour vos activités de reboisement et de sensibilisation environnementale. Remplissez ce formulaire pour faire votre demande, notre équipe vous contactera dans les plus brefs délais.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3 md:space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                      Nom de l'organisation / structure *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                      </div>
                      <input
                        type="text"
                        name="organizationName"
                        placeholder="Ex: Association Bambara"
                        value={formData.organizationName}
                        onChange={handleChange}
                        required
                        className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                      Type de groupement *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                        <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                      </div>
                      <select
                        name="groupmentType"
                        value={formData.groupmentType}
                        onChange={handleChange}
                        required
                        className="block w-full pl-9 sm:pl-10 pr-8 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none bg-white"
                      >
                        <option value="">Sélectionnez...</option>
                        <option value="Association">Association</option>
                        <option value="Amicale">Amicale</option>
                        <option value="École">École</option>
                        <option value="Entreprise">Entreprise</option>
                        <option value="ONG">ONG</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                      Nom et prénom du responsable *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                      </div>
                      <input
                        type="text"
                        name="responsibleName"
                        placeholder="Votre nom complet"
                        value={formData.responsibleName}
                        onChange={handleChange}
                        required
                        className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                      Email *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="exemple@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                      Téléphone *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+221 77 123 45 67"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                      Lieu / commune du projet *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                      </div>
                      <input
                        type="text"
                        name="location"
                        placeholder="Ex: Podor, Ndioum..."
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                      Date prévue de la plantation *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                      </div>
                      <input
                        type="date"
                        name="plannedDate"
                        value={formData.plannedDate}
                        onChange={handleChange}
                        required
                        className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                      Nombre de plants souhaités *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Hash className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                      </div>
                      <input
                        type="number"
                        name="quantityRequested"
                        placeholder="Ex: 100"
                        value={formData.quantityRequested}
                        onChange={handleChange}
                        required
                        min="1"
                        className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                    Espèces d'arbres/plantes demandées *
                  </label>
                  <div className="relative">
                    <div className="absolute top-2 sm:top-3 left-3 flex items-start pointer-events-none">
                      <Leaf className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                    </div>
                    <input
                      type="text"
                      name="plantSpecies"
                      placeholder="Ex: Neem, Eucalyptus, Moringa..."
                      value={formData.plantSpecies}
                      onChange={handleChange}
                      required
                      className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                    Objectif de l'activité *
                  </label>
                  <div className="relative">
                    <div className="absolute top-2 sm:top-3 left-3 flex items-start pointer-events-none">
                      <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                    </div>
                    <textarea
                      name="activityObjective"
                      placeholder="Ex: Journée culturelle, reboisement communautaire, sensibilisation scolaire..."
                      value={formData.activityObjective}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                    Message complémentaire (optionnel)
                  </label>
                  <div className="relative">
                    <div className="absolute top-2 sm:top-3 left-3 flex items-start pointer-events-none">
                      <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                    </div>
                    <textarea
                      name="additionalMessage"
                      placeholder="Informations supplémentaires..."
                      value={formData.additionalMessage}
                      onChange={handleChange}
                      rows={3}
                      className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="mt-4 sm:mt-5 md:mt-6 pb-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:from-green-400 disabled:to-green-500 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-xs sm:text-sm">Envoi en cours...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Leaf className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">Envoyer ma demande</span>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
