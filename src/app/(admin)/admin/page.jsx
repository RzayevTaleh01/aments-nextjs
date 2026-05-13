"use client";

import { MainLayout } from "@/admin/components/layouts";
import StatCard from "@/admin/components/ui/StatCard/StatCard";

export default function Page() {
  return (
    <MainLayout>
      <div className="row gap-y-[16px]">
        <div className="col-xl-3 col-lg-4 col-md-6">
          <StatCard label="Məhsul sayı" value="0" iconName="FaShoppingCart" />
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <StatCard label="Sifariş sayı" value="0" iconName="FaShoppingBag" />
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <StatCard label="Kateqoriya sayı" value="0" iconName="FaTags" />
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <StatCard label="Brend sayı" value="0" iconName="FaAward" />
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6">
          <StatCard label="Marka sayı" value="0" iconName="FaBookmark" />
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <StatCard label="Model sayı" value="0" iconName="FaLayerGroup" />
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <StatCard label="Anbar sayı" value="0" iconName="FaWarehouse" />
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <StatCard label="POS sifariş sayı" value="0" iconName="FaCashRegister" />
        </div>
      </div>
    </MainLayout>
  );
}
