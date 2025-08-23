"use client"

import { useState } from "react"
import PremiumSignup from "@/components/premium-signup"
import DestinationModal from "@/components/destination-modal"

export default function SignupPage() {
  const [showDestinationModal, setShowDestinationModal] = useState(false)

  const handleSignupSuccess = (destination: 'suit-manager' | 'suit-research') => {
    setShowDestinationModal(true)
  }

  return (
    <>
      <PremiumSignup onSuccess={handleSignupSuccess} />
      <DestinationModal 
        isOpen={showDestinationModal} 
        onClose={() => setShowDestinationModal(false)} 
      />
    </>
  )
}