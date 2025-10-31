"use client"

import React, { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { User, Briefcase, Phone, MapPin, Camera, Upload, X } from "lucide-react"
import { supabase } from "../lib/supabase"

export default function MemberCardModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullname: "",
    function: "",
    phone: "",
    village: "",
  })
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setPhotoFile(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let photoUrl = null

      if (photoFile) {
        try {
          const fileExt = photoFile.name.split('.').pop()
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
          const filePath = `${fileName}`

          const { error: uploadError, data: uploadData } = await supabase.storage
            .from('member-photos')
            .upload(filePath, photoFile)

          if (uploadError) {
            console.warn('⚠️ Photo upload failed:', uploadError)
          } else {
            const { data: { publicUrl } } = supabase.storage
              .from('member-photos')
              .getPublicUrl(filePath)
            photoUrl = publicUrl
          }
        } catch (uploadError) {
          console.warn('❌ Photo upload exception:', uploadError)
        }
      }

      const insertData = {
        full_name: formData.fullname,
        function: formData.function,
        phone: formData.phone,
        village: formData.village,
        photo_url: photoUrl
      }

      const { error, data } = await supabase.from('member_cards').insert([insertData]).select()

      if (error) {
        alert(`❌ Erreur d'insertion: ${error.message}`)
        throw error
      }

      if (!data || data.length === 0) {
        alert('❌ Erreur: Aucune donnée retournée après l\'insertion.')
        throw new Error('Aucune donnée retournée')
      }

      const message = photoUrl
        ? "✅ Votre demande de carte membre avec photo a bien été envoyée!\n\nVous recevrez votre carte dans les prochains jours."
        : "✅ Votre demande de carte membre a bien été envoyée!\n\n⚠️ Aucune photo n'a été incluse."

      alert(message)
      setFormData({ fullname: "", function: "", phone: "", village: "" })
      setPhotoFile(null)
      setPhotoPreview(null)
      setOpen(false)

      const fileInput = document.getElementById('modal-photo-input') as HTMLInputElement
      if (fileInput) fileInput.value = ''
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
        className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-200 hover:shadow-lg"
      >
        Demande de Carte Membre
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] max-w-md sm:max-w-lg max-h-[90vh] p-0 gap-0 overflow-hidden rounded-2xl sm:rounded-3xl border-0">
          <div className="bg-white flex flex-col max-h-[90vh]">
            <div className="flex-shrink-0 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-700">
                  Demande de Carte Membre
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                  Remplissez le formulaire
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                type="button"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 pb-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                    Prénom et Nom
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                      <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                    </div>
                    <input
                      type="text"
                      name="fullname"
                      placeholder="Votre prénom et nom"
                      value={formData.fullname}
                      onChange={handleChange}
                      required
                      className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                    Fonction
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                      <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                    </div>
                    <input
                      type="text"
                      name="function"
                      placeholder="Ex: Agriculteur, Étudiant..."
                      value={formData.function}
                      onChange={handleChange}
                      className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                    Téléphone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                      <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Votre numéro de téléphone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                    Village
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                    </div>
                    <input
                      type="text"
                      name="village"
                      placeholder="Votre village"
                      value={formData.village}
                      onChange={handleChange}
                      className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-1.5">
                    Photo
                  </label>
                  <div className="relative">
                    <input
                      id="modal-photo-input"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="modal-photo-input"
                      className="block w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-green-50 hover:border-green-400 transition-all overflow-hidden"
                    >
                      {photoPreview ? (
                        <div className="relative w-full h-32 sm:h-40 p-2">
                          <img
                            src={photoPreview}
                            alt="Prévisualisation"
                            className="w-full h-full object-contain rounded"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors">
                            <span className="text-xs text-white bg-green-600/90 px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity">
                              Cliquez pour changer
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-6 sm:py-8">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 mb-1.5 sm:mb-2 rounded-full bg-green-100 flex items-center justify-center">
                            <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                          </div>
                          <p className="mb-0.5 sm:mb-1 text-xs sm:text-sm font-medium text-gray-700">
                            Cliquez pour importer
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-500">
                            PNG, JPG, JPEG ou WEBP
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                  {photoFile && (
                    <div className="mt-2 flex items-center justify-between bg-green-50 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-green-200">
                      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                        <Camera className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                        <span className="text-[11px] sm:text-xs font-medium text-green-800 truncate">
                          {photoFile.name}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoFile(null)
                          setPhotoPreview(null)
                          const fileInput = document.getElementById('modal-photo-input') as HTMLInputElement
                          if (fileInput) fileInput.value = ''
                        }}
                        className="text-red-600 hover:text-red-800 text-[11px] sm:text-xs font-medium transition-colors ml-2 flex-shrink-0"
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-2 sm:pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:from-green-400 disabled:to-green-500 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-xs sm:text-sm">Envoi...</span>
                      </span>
                    ) : (
                      'Envoyer ma demande'
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
