import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ProductsView from "@/views/User/ProductsView.vue";
import AboutView from "@/views/AboutView.vue";
import CartView from "@/views/User/CartView.vue";
import ProfileView from "@/views/User/ProfileView.vue";
import AdminOrdersView from "@/views/Admin/AdminOrdersView.vue";
import AdminProductsView from "@/views/Admin/AdminProductsView.vue";
import AdminProductsUpdate from "@/views/Admin/AdminProductsUpdate.vue";
import AdminOrderDetail from "@/views/Admin/AdminOrderDetail.vue";

import { useAccountStore } from "@/stores/account";
import { useProductStore } from "@/stores/product";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/products",
      name: "products",
      component: ProductsView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
    {
      path: "/admin/orders",
      name: "adminOrders",
      component: AdminOrdersView,
    },
    {
      path: "/admin/products",
      name: "adminProducts",
      component: AdminProductsView,
    },
    {
      path: "/admin/products/create",
      name: "adminProductsCreate",
      component: AdminProductsUpdate,
    },
    {
      path: "/admin/products/update/:id",
      name: "adminProductsUpdate",
      component: AdminProductsUpdate,
    },
    {
      path: "/admin/orders/detail/:id",
      name: "adminOrderDetail",
      component: AdminOrderDetail,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const accountStore = useAccountStore();
  const productStore = useProductStore();
  await accountStore.checkAuth();
  await productStore.loadProducts();

  if (to.name.includes("admin") && !accountStore.isAdmin) {
    next({ name: "home" });
  } else if (to.name.includes("login") && accountStore.isLoggedIn) {
    next({ name: "home" });
  } else if ((to.name.includes('cart') || to.name.includes('profile') ) && !accountStore.isLoggedIn) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
