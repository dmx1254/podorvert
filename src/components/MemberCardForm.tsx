import React, { useState } from "react"
import { supabase } from "../lib/supabase"
import { User, Briefcase, Phone, MapPin, Camera, Upload } from "lucide-react"

export default function MemberCardForm() {
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

    console.log('🚀 Starting form submission...')
    console.log('📝 Form data:', formData)
    console.log('📷 Photo file:', photoFile?.name)

    try {
      let photoUrl = null

      if (photoFile) {
        console.log('📤 Starting photo upload...')
        try {
          const fileExt = photoFile.name.split('.').pop()
          const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
          const filePath = `${fileName}`

          console.log('📁 Uploading to path:', filePath)

          const { error: uploadError, data: uploadData } = await supabase.storage
            .from('member-photos')
            .upload(filePath, photoFile)

          if (uploadError) {
            console.warn('⚠️ Photo upload failed:', uploadError)
          } else {
            console.log('✅ Photo uploaded successfully:', uploadData)
            const { data: { publicUrl } } = supabase.storage
              .from('member-photos')
              .getPublicUrl(filePath)
            photoUrl = publicUrl
            console.log('🔗 Public URL:', photoUrl)
          }
        } catch (uploadError) {
          console.warn('❌ Photo upload exception:', uploadError)
        }
      }

      console.log('💾 Starting database insert...')
      const insertData = {
        full_name: formData.fullname,
        function: formData.function,
        phone: formData.phone,
        village: formData.village,
        photo_url: photoUrl
      }
      console.log('📊 Insert data:', insertData)

      const { error, data } = await supabase.from('member_cards').insert([insertData]).select()

      if (error) {
        console.error('❌ Database insert error:', error)
        console.error('Error details:', JSON.stringify(error, null, 2))
        alert(`❌ Erreur d'insertion: ${error.message}\n\nDétails: ${JSON.stringify(error, null, 2)}\n\nVeuillez contacter l'administrateur.`)
        throw error
      }

      console.log('✅ Member card inserted successfully:', data)

      if (!data || data.length === 0) {
        console.error('❌ No data returned from insert!')
        alert('❌ Erreur: Aucune donnée retournée après l\'insertion. Veuillez réessayer.')
        throw new Error('Aucune donnée retournée après l\'insertion')
      }

      console.log('✅ Insertion confirmée avec ID:', data[0].id)

      const message = photoUrl
        ? "✅ Votre demande de carte membre avec photo a bien été envoyée!\n\nVous recevrez votre carte dans les prochains jours."
        : "✅ Votre demande de carte membre a bien été envoyée!\n\n⚠️ Aucune photo n'a été incluse.\n\nVous recevrez votre carte dans les prochains jours.";

      alert(message)
      setFormData({ fullname: "", function: "", phone: "", village: "" })
      setPhotoFile(null)
      setPhotoPreview(null)

      const fileInput = document.getElementById('photo-input') as HTMLInputElement
      if (fileInput) fileInput.value = ''
    } catch (error: any) {
      console.error('❌ Error submitting member card request:', error)
      const errorMessage = error?.message || 'Erreur inconnue'
      alert(`❌ Une erreur est survenue lors de l'envoi de votre demande:\n\n${errorMessage}\n\nVeuillez réessayer ou contacter l'administrateur.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="px-8 py-10 sm:px-12 sm:py-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-3">
                Demande de Carte Membre
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto mb-3 rounded-full"></div>
              <p className="text-gray-600 text-sm sm:text-base">
                Veuillez remplir le formulaire ci-dessous
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Prénom et Nom
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Votre prénom et nom"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                    className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fonction
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-green-600" />
                  </div>
                  <input
                    type="text"
                    name="function"
                    placeholder="Ex: Agriculteur, Étudiant..."
                    value={formData.function}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Téléphone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Votre numéro de téléphone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Village
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <input
                    type="text"
                    name="village"
                    placeholder="Votre village"
                    value={formData.village}
                    onChange={handleChange}
                    className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Photo
                </label>
                <div className="relative">
                  <input
                    id="photo-input"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="photo-input"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-green-50 hover:border-green-400 transition-all duration-200"
                  >
                    {photoPreview ? (
                      <div className="relative w-full h-full p-2">
                        <img
                          src={photoPreview}
                          alt="Prévisualisation"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center">
                          <Camera className="h-8 w-8 text-white opacity-0 hover:opacity-100 transition-opacity duration-200" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="w-16 h-16 mb-4 rounded-full bg-green-100 flex items-center justify-center">
                          <Upload className="h-8 w-8 text-green-600" />
                        </div>
                        <p className="mb-2 text-sm font-medium text-gray-700">
                          Cliquez pour importer votre photo
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, JPEG ou WEBP (MAX. 10MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
                {photoFile && (
                  <div className="mt-3 flex items-center justify-between bg-green-50 px-4 py-3 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2">
                      <Camera className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        {photoFile.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoFile(null)
                        setPhotoPreview(null)
                        const fileInput = document.getElementById('photo-input') as HTMLInputElement
                        if (fileInput) fileInput.value = ''
                      }}
                      className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:from-green-400 disabled:to-green-500 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                  </span>
                ) : (
                  'Envoyer ma demande'
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Vos données sont sécurisées et ne seront utilisées que pour la création de votre carte membre.
          </p>
        </div>
      </div>
    </div>
  )
}
