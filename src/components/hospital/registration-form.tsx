'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ArrowLeft, ArrowRight, Loader2, Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
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
import { Textarea } from '@/components/ui/textarea'
import { useRegisterHospital } from '@/hooks/use-hospitals'
import { toast } from 'sonner'

const schema = z.object({
  name: z.string().min(2, 'Hospital name is required'),
  licenseNumber: z.string().min(3, 'License number is required'),
  type: z.string().min(1, 'Select hospital type'),
  county: z.string().min(2, 'County is required'),
  subCounty: z.string().min(2, 'Sub-county is required'),
  ward: z.string().min(2, 'Ward is required'),
  address: z.string().min(3, 'Address is required'),
  phone: z.string().min(10, 'Phone is required'),
  email: z.string().email('Valid email required'),
  latitude: z.string().optional(),
  longitude: z.string().optional(),

  buildings: z.string().min(1, 'Describe buildings and wards'),
  amenities: z.array(z.string()).min(1, 'Select at least one amenity'),

  suppliers: z.string().min(3, 'Supplier info is required'),
  initialStock: z.string().optional(),

  directorName: z.string().min(2, 'Director name is required'),
  directorEmail: z.string().email('Valid email required'),
  directorPhone: z.string().min(10, 'Phone is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  agreeTerms: z.boolean().refine((v) => v === true, { message: 'You must agree' }),
  confirmAccuracy: z.boolean().refine((v) => v === true, { message: 'You must confirm' }),
})

type FormValues = z.infer<typeof schema>

const steps = ['Basic Info', 'Infrastructure', 'Stock & Suppliers', 'Admin Account']

const amenitiesList = [
  'Laboratory',
  'Pharmacy',
  'X-Ray / Imaging',
  'Theatre / Surgery',
  'ICU',
  'Maternity Ward',
  'Mortuary',
  'Blood Bank',
  'Ambulance',
  'Generator / Backup Power',
]

export function RegistrationForm() {
  const [step, setStep] = useState(0)
  const progress = ((step + 1) / steps.length) * 100
  const registerHospital = useRegisterHospital()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      licenseNumber: '',
      type: '',
      county: '',
      subCounty: '',
      ward: '',
      address: '',
      phone: '',
      email: '',
      latitude: '',
      longitude: '',
      buildings: '',
      amenities: [],
      suppliers: '',
      initialStock: '',
      directorName: '',
      directorEmail: '',
      directorPhone: '',
      password: '',
    },
  })

  function onSubmit(values: FormValues) {
    registerHospital.mutate(values, {
      onSuccess: () => {
        toast.success('Hospital registered successfully!')
        form.reset()
        setStep(0)
      },
      onError: (error) => {
        toast.error(`Registration failed: ${error.message}`)
      },
    })
  }

  const next = async () => {
    const valid = await form.trigger(getStepFields(step))
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1))
  }

  const back = () => setStep((s) => Math.max(s - 1, 0))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register Hospital</CardTitle>
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              Step {step + 1} of {steps.length}
            </span>
            <span>{steps[step]}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between">
            {steps.map((s, i) => (
              <span
                key={s}
                className={`text-xs ${
                  i <= step ? 'font-medium text-foreground' : 'text-muted-foreground'
                }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {step === 0 && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Hospital Name</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License Number</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hospital Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="county">County Hospital</SelectItem>
                            <SelectItem value="subcounty">Sub-County Hospital</SelectItem>
                            <SelectItem value="dispen">Dispensary</SelectItem>
                            <SelectItem value="health-centre">Health Centre</SelectItem>
                            <SelectItem value="national">National Referral</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="county"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>County</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subCounty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sub-County</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ward"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ward</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Physical Address</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
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
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GPS Latitude</FormLabel>
                        <FormControl><Input placeholder="-1.2921" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GPS Longitude</FormLabel>
                        <FormControl><Input placeholder="36.8219" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="buildings"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Buildings &amp; Wards</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe hospital buildings and wards (e.g. Building A: Maternity, Paediatrics. Building B: General Ward, ICU)"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amenities"
                  render={() => (
                    <FormItem>
                      <FormLabel>Amenities</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {amenitiesList.map((a) => (
                          <FormField
                            key={a}
                            control={form.control}
                            name="amenities"
                            render={({ field }) => (
                              <label className="flex items-center gap-2 text-sm">
                                <Checkbox
                                  checked={field.value?.includes(a)}
                                  onCheckedChange={(checked) => {
                                    field.onChange(
                                      checked
                                        ? [...(field.value ?? []), a]
                                        : field.value?.filter((v) => v !== a)
                                    )
                                  }}
                                />
                                {a}
                              </label>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="suppliers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suppliers</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List your suppliers with contact info"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="initialStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Stock Inventory (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide current medicine stock details"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 3 && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="directorName"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Hospital Director Name</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="directorEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admin Email</FormLabel>
                        <FormControl><Input type="email" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="directorPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admin Phone</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl><Input type="password" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="agreeTerms"
                  render={({ field }) => (
                    <FormItem>
                      <label className="flex items-start gap-2 text-sm">
                        <Checkbox
                          checked={!!field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5"
                        />
                        I agree to the platform terms of service and data policies.
                      </label>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmAccuracy"
                  render={({ field }) => (
                    <FormItem>
                      <label className="flex items-start gap-2 text-sm">
                        <Checkbox
                          checked={!!field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5"
                        />
                        I confirm all information provided is accurate and verifiable.
                      </label>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={back}
                disabled={step === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              {step < steps.length - 1 ? (
                <Button type="button" onClick={next}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={form.formState.isSubmitting || registerHospital.isPending}>
                  {form.formState.isSubmitting || registerHospital.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="mr-2 h-4 w-4" />
                  )}
                  Register Hospital
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

function getStepFields(step: number): (keyof FormValues)[] {
  switch (step) {
    case 0:
      return ['name', 'licenseNumber', 'type', 'county', 'subCounty', 'ward', 'address', 'phone', 'email']
    case 1:
      return ['buildings', 'amenities']
    case 2:
      return ['suppliers']
    case 3:
      return ['directorName', 'directorEmail', 'directorPhone', 'password', 'agreeTerms', 'confirmAccuracy']
    default:
      return []
  }
}
