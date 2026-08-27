/**
 * @deprecated
 * This module is deprecated. The ERP backend has migrated from Odoo to BUSY Accounting Software (https://busy.in).
 * Use `@/lib/busy` instead.
 */

import {
  isBusyConfigured,
  getBusyItems,
  mapBusyToProduct,
  createSalesOrder as createBusySaleOrder,
  getBusySalesOrders,
  getBusyStockLevels,
} from "./busy";

export const isOdooConfigured = isBusyConfigured;
export const getOdooProducts = getBusyItems;
export const mapOdooToProduct = mapBusyToProduct;
export const createSaleOrder = createBusySaleOrder;
export const getSaleOrders = getBusySalesOrders;
export const getStockLevels = getBusyStockLevels;
