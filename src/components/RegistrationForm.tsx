import React, { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { UserType, IndividualRegistrationData, BusinessRegistrationData } from '../types';
import { z } from 'zod';

const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

const individualSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email'),
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

const businessSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  businessEmail: z.string().email('Please enter a valid business email'),
  registrationNumber: z.string().min(1, 'Business registration number is required'),
  contactPerson: z.string().min(2, 'Contact person name is required'),
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

interface RegistrationFormProps {
  userType: UserType;
  onSubmit: (data: IndividualRegistrationData | BusinessRegistrationData) => Promise<void>;
  onLogin: () => void;
}

export function RegistrationForm({ userType, onSubmit, onLogin }: RegistrationFormProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState(
    userType === 'individual'
      ? {
          fullName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      : {
          companyName: '',
          businessEmail: '',
          registrationNumber: '',
          contactPerson: '',
          password: '',
          confirmPassword: ''
        }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      if (userType === 'individual') {
        individualSchema.parse(formData);
      } else {
        businessSchema.parse(formData);
      }
      setLoading(true);
      await onSubmit(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {userType === 'individual' ? (
        <>
          <Input
            label="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            error={errors.fullName}
            placeholder="Enter your full name"
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            placeholder="Enter your email"
          />
        </>
      ) : (
        <>
          <Input
            label="Company Name"
            value={(formData as BusinessRegistrationData).companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            error={errors.companyName}
            placeholder="Enter company name"
          />
          <Input
            label="Business Email"
            type="email"
            value={(formData as BusinessRegistrationData).businessEmail}
            onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
            error={errors.businessEmail}
            placeholder="Enter business email"
          />
          <Input
            label="Business Registration Number"
            value={(formData as BusinessRegistrationData).registrationNumber}
            onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
            error={errors.registrationNumber}
            placeholder="Enter business registration number"
          />
          <Input
            label="Contact Person"
            value={(formData as BusinessRegistrationData).contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            error={errors.contactPerson}
            placeholder="Enter contact person name"
          />
        </>
      )}

      <Input
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        error={errors.password}
        placeholder="Enter password"
      />
      <Input
        label="Confirm Password"
        type="password"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        error={errors.confirmPassword}
        placeholder="Confirm your password"
      />

      <Button type="submit" loading={loading}>
        Create Account
      </Button>

      <p className="text-center mt-4">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onLogin}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}