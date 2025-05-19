'use client'

import { create } from 'zustand'
import { FormState } from '@/types/store.types'

export const useFormState = create<FormState>(set => ({
  isSubmitting: false,
  isValid: false,
  setSubmitting: isSubmitting => set({ isSubmitting }),
  setValid: isValid => set({ isValid }),
}))
