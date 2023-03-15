<script lang="ts">
import PaymentActions from "../components/PaymentActions.vue";
import apiConfig from "../config/apiConfig";
import dayjs from "dayjs";
import type InvoiceModel from "../models/Invoice";
import { plainToClass } from 'class-transformer';

const Invoice: InvoiceModel | null = null;

export default {
  name: "DetailedInvoice",
  components: { PaymentActions },
  data() {
    return {
      loading: false,
      invoice: Invoice,
      error: null,
      paymentsEnabled: true,
      status: null,
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData();
      },
      { immediate: true }
    );
  },

  methods: {
    fetchData() {
      this.error = null;
      this.loading = true;
      // console.log(this.$route.params.id);
      const options = apiConfig.options;
      const url = apiConfig.baseUrl + "/" + this.$route.params.id + "/render";
      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          this.loading = false;
          return response.json();
        })
        .then((data) => {
          this.invoice = plainToClass(Invoice, data);
          this.invoice = data;
          // console.log(this.invoice);
        })
        .catch((error) => {
          this.error = error.toString();
          console.error("There was a problem fetching the data:", error);
        });
    },

    formatDate(dateString: string) {
      const date = dayjs(dateString);
      // Then specify how you want your dates to be formatted
      return date.format("D MMMM, YYYY");
    },
  },
  computed: {
    invoiceDate() {
      return this.formatDate(this.invoice.invoiceDate);
    },
  },
};
</script>

<template>
  <!-- <router-link :to="{name: 'detailed-invoice', params: { pageTitle: `${invoice.invoiceNumber}`} }"/> -->
  <main>
    <!-- <div id="invoice-detailed-main" class="h-max bg-gray-50"> -->
    <div id="invoice-detailed-main">
      <section
        class="h-screen bg-gray-50 px-4 pt-10 sm:pt-20 antialiased text-black"
      >
        <div
          id="invoice-detailed-container"
          class="container max-w-4xl mx-auto pb-12 px-4"
        >
          <div
            class="p-6 sm:p-10 rounded-md border border-gray-200 bg-white shadow-lg antialiased text-black text-xs sm:text-base"
          >
            <div v-if="error" class="error">{{ error }}</div>
            <div v-if="loading" class="loading">Loading...</div>

            <div
              v-if="invoice"
              id="minimal-invoice-main"
              class="flex-col justify-center"
            >
              <header
                class="flex gap-8 flex-wrap justify-between mb-4 border-b border-gray-100 pb-6"
              >
                <div id="biller-summary" class="-mb-4">
                  <h1 class="text-base mb-2 sm:text-2xl font-bold">
                    {{ invoice.biller.operatingName }}
                  </h1>
                  <div class="mb-1">
                    <p class="sm:text-sm">{{ invoice.biller.email }}</p>
                  </div>
                  <div class="mb-1">
                    <p class="sm:text-sm">{{ invoice.biller.website }}</p>
                  </div>
                </div>

                <div id="invoice-summary" class="flex gap-4">
                  <!-- Option 1 -->
                  <div class="">
                    <h1
                      v-if="status == 'draft'"
                      class="text-base mb-2 sm:text-xl font-bold"
                    >
                      Draft Invoice
                    </h1>
                    <h1 class="text-base mb-2 sm:text-xl font-bold">Invoice</h1>
                    <p class="sm:text-sm mb-1"><b> Date Issued: </b></p>
                    <p class="sm:text-sm mb-1"><b>Due Date: </b></p>
                  </div>
                  <div>
                    <h1 class="text-base mb-2 sm:text-xl font-bold">
                      {{ invoice.invoiceNumber }}
                    </h1>
                    <p class="sm:text-sm mb-1">
                      {{ formatDate(invoice.dateIssued) }}
                    </p>
                    <p class="sm:text-sm mb-1">
                      {{ formatDate(invoice.paymentDueDate) }}
                    </p>
                  </div>
                </div>
              </header>

              <div id="BillerContact" class="flex gap-2 justify-between mb-4">
                <div id="ClientDetails" class="">
                  <h2 class="font-bold text-gray-500 mb-1">Billed To</h2>
                  <div class="mb-1">
                    <p class="font-bold">
                      {{ invoice.clientDetails.billingName }}
                    </p>
                  </div>
                  <div id="client info container" class="sm:text-sm">
                    <div class="mb-1">
                      <p>{{ invoice.clientDetails.contactName }}</p>
                    </div>
                    <!-- <div class="mb-1 ">
      <p>{{ invoice.clientDetails.phone }}</p>
    </div> -->
                    <div class="mb-1">
                      <p>{{ invoice.clientDetails.email }}</p>
                    </div>
                    <!-- <div class="mb-1 ">
      <p >{{ invoice.clientDetails.address }}</p>
    </div> -->
                  </div>
                </div>

                <!-- <div id="Payment-CTA"> 
    <div class="mb-2">
      <h2 class="text-base sm:text-lg font-bold mb-1">${{ invoice.totalOutstanding }} due on {{ invoice.paymentDueDate }}</h2>
      <a href="#" class="text-blue-600 hover:text-blue-800">Pay now</a>
    </div>

  </div> -->
              </div>

              <div id="InvoiceItems" class="mb-4">
                <!-- <h2 class="text-base sm:text-lg text-gray-500 font-bold mb-2">Items</h2> -->

                <div id="invoiceitemsinner" class="rounded-md overflow-scroll">
                  <table class="table-auto w-full text-left">
                    <thead>
                      <tr class="border-b border-slate-400">
                        <th class="py-2 w-8/12 sm:text-sm">Item</th>
                        <th class="px-4 py-2 w-1/6 sm:text-sm">Qty</th>
                        <th class="px-4 py-2 w-1/6 sm:text-sm">Unit Price</th>
                        <th class="px-4 py-2 w-1/6 sm:text-sm">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="invoiceItem in invoice.lineItems" class="">
                        <td class="py-2">
                          {{ invoiceItem.name }}
                          <p class="sm:text-sm text-gray-500">
                            {{ invoiceItem.description }}
                          </p>
                        </td>
                        <td class="px-4 py-2 align-top">
                          {{ invoiceItem.quantity }}
                        </td>
                        <td class="px-4 py-2 align-top">
                          ${{ invoiceItem.unitPrice }}
                        </td>
                        <td class="px-4 py-2 align-top">
                          ${{ invoiceItem.total }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div
                id="PaymentsAndTotals"
                class="flex gap-2 justify-between mb-6 overflow-scroll"
              >
                <!-- PAYMENT TERMS -->
                <div id="PaymentTerms"></div>

                <!-- INVOICE TOTALS -->
                <div id="InvoiceTotals" class="">
                  <!-- <h2 class="font-bold mb-2">Invoice Totals</h2> -->

                  <div id="TotalsInner" class="flex gap-8">
                    <div id="TotalHeaders" class="">
                      <div class="mb-2">
                        <p class="font-semibold">Subtotal:</p>
                      </div>
                      <div class="mb-2">
                        <p class="font-semibold">Tax:</p>
                      </div>
                      <div class="mb-2">
                        <p class="font-semibold">Total Due:</p>
                      </div>
                      <div class="mb-2">
                        <p class="font-semibold">Amount Paid:</p>
                      </div>
                      <div
                        class="mb-2 pt-2 border-t border-slate-200 border-opacity-70"
                      >
                        <p class="font-semibold">Amount Outstanding:</p>
                      </div>
                    </div>

                    <div id="TotalsData" class="">
                      <div class="mb-2">
                        <p>${{ invoice.subTotal }}</p>
                      </div>
                      <div class="mb-2">
                        <p>${{ invoice.totalTax }}</p>
                      </div>
                      <div class="mb-2">
                        <p>${{ invoice.totalDue }}</p>
                      </div>
                      <div class="mb-2">
                        <p>(${{ invoice.totalPaid }})</p>
                      </div>
                      <div class="mb-2 pt-2.5">
                        <p class="font-bold">${{ invoice.totalOutstanding }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="InvoiceFooter" class="flex justify-between">
                <div id="InvoiceFooterLeft" class="w-1/2">
                  <h2 class="text-lg font-bold mb-5">Notes</h2>
                  <div
                    id="InvoiceFooterLeftInner"
                    class="rounded-md border-opacity-30 border p-4 sm:text-sm"
                  >
                    <p>{{ invoice.paymentTerms[0].description }}</p>
                  </div>
                </div>
              </div>

              <div
                v-if="paymentsEnabled"
                id="Actions"
                class="flex justify-end mt-10"
              >
                <div id="ActionsInner" class="flex gap-4">
                  <PaymentActions />

                  <!-- <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Pay Now
          </button>
          <button class="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
            Download
          </button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <HelloSlick v-if="invoice"  msg="Powered By Slick" /> -->
      </section>
    </div>
  </main>
</template>
