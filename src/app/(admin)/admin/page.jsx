"use client";

import { MainLayout } from "@/admin/components/layouts";
import { SgButton } from "@/admin/components/ui/Button";
import StatCard from "@/admin/components/ui/StatCard/StatCard";
import { FaChevronRight } from "react-icons/fa";

export default function Page() {
  return (
    <MainLayout>
      <div className="row gap-y-[16px]">
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="d-flex flex-column gap-2">
            <StatCard label="Məhsul sayı" value="0" iconName="FaShoppingCart" />
            <SgButton
              type="link"
              to="/admin/products"
              color="secondary-outline"
              size="sm"
              block={true}
              icon={FaChevronRight}
              reverse={true}
            >
              Məhsullar
            </SgButton>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="d-flex flex-column gap-2">
            <StatCard label="Sifariş sayı" value="0" iconName="FaShoppingBag" />
            <SgButton
              type="link"
              to="/admin/orders"
              color="secondary-outline"
              size="sm"
              block={true}
              icon={FaChevronRight}
              reverse={true}
            >
              Sifarişlər
            </SgButton>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="d-flex flex-column gap-2">
            <StatCard label="Kateqoriya sayı" value="0" iconName="FaTags" />
            <SgButton
              type="link"
              to="/admin/categories"
              color="secondary-outline"
              size="sm"
              block={true}
              icon={FaChevronRight}
              reverse={true}
            >
              Kateqoriyalar
            </SgButton>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="d-flex flex-column gap-2">
            <StatCard label="Brend sayı" value="0" iconName="FaAward" />
            <SgButton
              type="link"
              to="/admin/brands"
              color="secondary-outline"
              size="sm"
              block={true}
              icon={FaChevronRight}
              reverse={true}
            >
              Brendlər
            </SgButton>
          </div>
        </div>

        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="d-flex flex-column gap-2">
            <StatCard label="Marka sayı" value="0" iconName="FaBookmark" />
            <SgButton
              type="link"
              to="/admin/marks"
              color="secondary-outline"
              size="sm"
              block={true}
              icon={FaChevronRight}
              reverse={true}
            >
              Markalar
            </SgButton>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="d-flex flex-column gap-2">
            <StatCard label="Model sayı" value="0" iconName="FaLayerGroup" />
            <SgButton
              type="link"
              to="/admin/models"
              color="secondary-outline"
              size="sm"
              block={true}
              icon={FaChevronRight}
              reverse={true}
            >
              Modellər
            </SgButton>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6">
          <div className="d-flex flex-column gap-2">
            <StatCard label="Anbar sayı" value="0" iconName="FaWarehouse" />
            <SgButton
              type="link"
              to="/admin/storages"
              color="secondary-outline"
              size="sm"
              block={true}
              icon={FaChevronRight}
              reverse={true}
            >
              Anbarlar
            </SgButton>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
