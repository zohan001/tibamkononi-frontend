'use client';

import {
  Activity,
  Users,
  Package,
  Bed,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

interface DailyReportProps {
  totalPatients: number;
  newPatients: number;
  dischargedPatients: number;
  bedsAvailable: number;
  totalBeds: number;
  staffPresent: number;
  totalStaff: number;
  criticalStockItems: number;
}

export function DailyReport({
  totalPatients,
  newPatients,
  dischargedPatients,
  bedsAvailable,
  totalBeds,
  staffPresent,
  totalStaff,
  criticalStockItems,
}: DailyReportProps) {

  const occupancy =
    totalBeds > 0
      ? Math.round(((totalBeds - bedsAvailable) / totalBeds) * 100)
      : 0;

  return (

    <div className="space-y-8">

      <div>

        <h2 className="text-3xl font-bold">

          Daily Hospital Report

        </h2>

        <p className="text-slate-500 mt-2">

          Executive summary of today&apos;s hospital operations.

        </p>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <Card>

          <CardContent className="p-6">

            <Activity className="h-8 w-8 text-blue-600 mb-4"/>

            <div className="text-3xl font-bold">

              {totalPatients}

            </div>

            <p className="text-slate-500">

              Patients Today

            </p>

          </CardContent>

        </Card>

        <Card>

          <CardContent className="p-6">

            <Users className="h-8 w-8 text-green-600 mb-4"/>

            <div className="text-3xl font-bold">

              {staffPresent}/{totalStaff}

            </div>

            <p className="text-slate-500">

              Staff Present

            </p>

          </CardContent>

        </Card>

        <Card>

          <CardContent className="p-6">

            <Bed className="h-8 w-8 text-purple-600 mb-4"/>

            <div className="text-3xl font-bold">

              {bedsAvailable}

            </div>

            <p className="text-slate-500">

              Beds Available

            </p>

          </CardContent>

        </Card>

        <Card>

          <CardContent className="p-6">

            <Package className="h-8 w-8 text-orange-600 mb-4"/>

            <div className="text-3xl font-bold">

              {criticalStockItems}

            </div>

            <p className="text-slate-500">

              Critical Stock Alerts

            </p>

          </CardContent>

        </Card>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <Card>

          <CardContent className="p-8">

            <h3 className="text-xl font-bold mb-6">

              Hospital Performance

            </h3>

            <div className="space-y-5">

              <div className="flex justify-between">

                <span>New Patients</span>

                <strong>{newPatients}</strong>

              </div>

              <div className="flex justify-between">

                <span>Discharged Patients</span>

                <strong>{dischargedPatients}</strong>

              </div>

              <div className="flex justify-between">

                <span>Bed Occupancy</span>

                <strong>{occupancy}%</strong>

              </div>

              <div className="flex justify-between">

                <span>Staff Attendance</span>

                <strong>

                  {totalStaff > 0
                    ? Math.round((staffPresent / totalStaff) * 100)
                    : 0}%

                </strong>

              </div>

            </div>

          </CardContent>

        </Card>

        <Card>

          <CardContent className="p-8">

            <div className="flex items-center gap-3 mb-5">

              <Sparkles className="text-blue-600"/>

              <h3 className="text-xl font-bold">

                Gemma AI Summary

              </h3>

            </div>

            <div className="rounded-xl bg-blue-50 p-6 leading-8">

              Hospital activity remains stable today.

              {criticalStockItems > 0 && (
                <>
                  {' '}
                  {criticalStockItems} inventory item(s) require urgent
                  restocking.
                </>
              )}

              {' '}Current bed occupancy is {occupancy}%.

              Staff attendance is

              {' '}
              {totalStaff > 0
                ? Math.round((staffPresent / totalStaff) * 100)
                : 0}
              %.

              Continue monitoring patient flow and inventory
              to maintain efficient healthcare delivery.

            </div>

          </CardContent>

        </Card>

      </div>

      <Card>

        <CardContent className="p-8">

          <div className="flex items-center gap-3 mb-6">

            <TrendingUp className="text-green-600"/>

            <h3 className="text-xl font-bold">

              Operational Highlights

            </h3>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-lg bg-green-50 p-5">

              <div className="text-lg font-bold text-green-700">

                Patient Care

              </div>

              <p className="mt-2 text-sm text-slate-600">

                Patient services are operating normally with
                continuous monitoring.

              </p>

            </div>

            <div className="rounded-lg bg-blue-50 p-5">

              <div className="text-lg font-bold text-blue-700">

                Hospital Capacity

              </div>

              <p className="mt-2 text-sm text-slate-600">

                Available beds and staffing levels support
                current patient demand.

              </p>

            </div>

            <div className="rounded-lg bg-orange-50 p-5">

              <div className="text-lg font-bold text-orange-700">

                Inventory

              </div>

              <p className="mt-2 text-sm text-slate-600">

                Continue monitoring medicine consumption and
                replenish low-stock items promptly.

              </p>

            </div>

          </div>

        </CardContent>

      </Card>

    </div>

  );

}