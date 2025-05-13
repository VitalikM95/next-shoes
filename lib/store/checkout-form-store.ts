'use client'

import { create } from 'zustand'

// Створюємо сховище для зберігання стану форми
interface FormState {
  isSubmitting: boolean
  isValid: boolean
  setSubmitting: (isSubmitting: boolean) => void
  setValid: (isValid: boolean) => void
}

export const useFormState = create<FormState>((set) => ({
  isSubmitting: false,
  isValid: false,
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  setValid: (isValid) => set({ isValid }),
}))
