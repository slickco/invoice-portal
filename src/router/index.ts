import { createRouter, createWebHistory } from "vue-router";
import InvoiceMemo from "../views/InvoiceMemo.vue";
import DetailedInvoice from "../views/DetailedInvoice.vue";
import SoftLandingView from "../views/SoftLandingView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: SoftLandingView,
    meta: {
      title: "Slick",
    },
  },
  {
    path: "/in/:id",
    name: "invoice-memo",
    component: InvoiceMemo,
    meta: {
      title: "Invoice Memo",
    },
  },
  {
    path: "/in/:id/detailed",
    name: "detailed-invoice",
    props: true,
    component: DetailedInvoice,
    meta: {
      title: "Detailed Invoice",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  document.title = to.meta?.title ?? "Default Title";
});

export default router;
