export interface User {
  id: string;
  email: string;
  name: string;
  onboardingCompleted: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface OnboardingData {
  height: number;
  weight: number;
  targetWeight: number;
  hasDiabetes: boolean;
  hasBloodPressure: boolean;
  monthlyBudget: number;
  preferredPaymentMethods: ('cash' | 'online')[];
}