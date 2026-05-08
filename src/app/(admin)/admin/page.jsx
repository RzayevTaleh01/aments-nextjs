"use client";

import { MainLayout } from "@/admin/components/layouts";
import StatCard from "@/admin/components/ui/StatCard/StatCard";

export default function Page() {
  return (
    <MainLayout>
      <div className="row gap-y-[16px]">
        <div className="col-xl-3 col-lg-4 col-md-6">
          <StatCard label="Aktiv ziyarətçi sayı" value="3" iconName="FaRegClock" />
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <StatCard label="Ümumi ziyarətçi sayı" value="29760" iconName="FaChartLine" />
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <StatCard label="Gündəlik ziyarətçi sayı" value="203" iconName="FaPaperPlane" />
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <StatCard label="Aylıq ziyarətçi sayı" value="1577" iconName="FaRegCalendarAlt" />
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6">
          <StatCard label="Ümumi xəbər sayı" value="76" iconName="FaWaveSquare" />
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <StatCard label="Gələn məktublar" value="1415" iconName="FaInbox" />
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <StatCard label="Qeydiyyat sayı" value="478" iconName="FaUserPlus" />
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <StatCard label="Aktiv istifadəçi sayı" value="3" iconName="FaUsers" />
        </div>
      </div>
    </MainLayout>
  );
}
