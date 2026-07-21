'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Mic, MicOff, Loader2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const patientSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  idNumber: z.string().min(5, 'Valid ID number required'),
  nhifNumber: z.string().optional(),
  age: z.number().min(0).max(150),
  gender: z.enum(['male', 'female', 'other']),
  phone: z.string().min(10, 'Valid phone number required'),
  address: z.string().min(3, 'Address is required'),
  emergencyContact: z.string().min(10, 'Emergency contact is required'),
  symptoms: z.string().min(5, 'Please describe the symptoms'),
})

type PatientValues = z.infer<typeof patientSchema>

export function PatientForm() {
  const [isRecording, setIsRecording] = useState(false)

  const form = useForm<PatientValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      fullName: '',
      idNumber: '',
      nhifNumber: '',
      age: 0,
      gender: 'male',
      phone: '',
      address: '',
      emergencyContact: '',
      symptoms: '',
    },
  })

  function onSubmit(values: PatientValues) {
    console.log('Patient registered:', values)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register Patient</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Number</FormLabel>
                    <FormControl>
                      <Input placeholder="12345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nhifNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NHIF Number (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="NHIF-XXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="0712345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Full address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergencyContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact</FormLabel>
                  <FormControl>
                    <Input placeholder="Name - Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="symptoms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symptoms</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the patient's symptoms..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Register Patient
              </Button>

              <Button type="button" variant="outline" onClick={toggleRecording}>
                {isRecording ? (
                  <MicOff className="mr-2 h-4 w-4 text-red-500" />
                ) : (
                  <Mic className="mr-2 h-4 w-4" />
                )}
                {isRecording ? 'Stop Recording' : 'Voice Input'}
              </Button>
            </div>

            <div className="rounded-lg border border-dashed bg-muted/30 p-4">
              <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                AI Diagnosis Panel
              </h4>
              <p className="text-sm text-muted-foreground">
                Submit the patient form to trigger AI-powered symptom analysis and
                preliminary diagnosis suggestions.
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
