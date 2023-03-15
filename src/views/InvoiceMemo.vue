<script lang="ts">
import "../assets/chevron_2.png";
import PaymentActions from "../components/PaymentActions.vue";
import apiConfig from "../config/apiConfig";
import dayjs from "dayjs";
import type InvoiceModel from "../models/Invoice";
import { plainToClass } from 'class-transformer';


const Invoice: InvoiceModel | null = null;

export default {
  name: "InvoiceMemo",
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
  <main>
    <div id="invoice-memo-main">
      <section
        class="h-screen bg-gray-50 px-4 pt-10 sm:pt-20 antialiased text-black"
      >
        <div id="loading-or-error" class="flex flex-col justify-center">
          <div
            v-if="loading"
            class="mx-auto w-full max-w-xl rounded-md border border-gray-200 bg-white shadow-lg p-8"
          >

            <div v-if="error" class="mx-auto w-full max-w-xl error">
              {{ error }}
            </div>
            <div v-if="loading" class="mx-auto w-full max-w-xl loading">
              Loading...
            </div>
          </div>

          <div
            id="invoice-memo-containers"
            v-if="invoice"
            class="mx-auto w-full max-w-xl"
          >
            <!-- <div class="flex h-full flex-col justify-center"> -->

            <!-- Logo Holder -->
            <div id="logo-container" class="mx-auto w-full max-w-xl">
              <!-- <svg xmlns="http://www.w3.org/2000/svg" width="200" height="80" viewBox="0 0 888 483.61099" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="m1,421.53481h887v-2H1c-.55228,0-1,.44772-1,1h0c0,.55228.44771,1,1,1Z" fill="#3f3d56"/><path d="m406,438.53481c5,24,33.5-5.5,33.5-5.5l34-4s21.5.5,35.5,11.5,23.5-3.5,23.5-3.5c15.77283,5.2576,35.09692,5.23627,51.83264,3.55252,24.11597-2.42627,43.44604-21.04041,46.76044-45.05038,18.69678-135.44147-84.09314-202.00211-84.09314-202.00211l-30-81s9.5-23.5,12.5-44.5-19-41-46-61c-11.8125-8.75-25.34766-8.12109-36.83716-4.64502-12.88892,3.89946-24.13214,11.9183-32.4397,22.51616-6.88251,8.77995-18.68735,21.21468-31.66315,23.36885-4.48999.73999-8.91998,2.52002-13.06,5.76001-4.28003,3.34998-6.16998,8.94-6.22998,15.89001-.32001,30.35999,24.75,66.90998,46.72998,72.60999,27,7,12.5,73.5,12.5,73.5-44,62-13,131-13,131l-8,56s-.5,11.5,4.5,35.5l.00006-.00003Z" fill="#3f3d56"/><path d="m553,309.53481l-11,137s15,38-36,36-21-80-21-80l16-102" fill="#3f3d56"/><path d="m509.79492,483.61099c-1.24707,0-2.52344-.02539-3.83398-.07715-11.29004-.44238-19.60352-4.60059-24.71094-12.3584-14.60254-22.18164,1.63867-65.90625,2.77832-68.89941l15.9834-101.89648c.08594-.5459.59375-.91309,1.14355-.83301.54492.08594.91797.59766.83301,1.14355l-16,102c-.01172.06934-.0293.1377-.05469.2041-.1748.45215-17.25195,45.55566-3.01172,67.18359,4.73242,7.18652,12.50977,11.04199,23.11719,11.45801,16.65234.64941,27.85254-2.90332,33.29785-10.56836,7.12402-10.02832,1.78711-23.92676,1.73242-24.06641-.05566-.1416-.07812-.29492-.06641-.44629l11-137c.04395-.5498.5166-.95117,1.07715-.91699.55078.04492.96094.52637.91699,1.07715l-10.98242,136.77539c.72656,1.96094,5.28223,15.4043-2.03906,25.72363-5.41699,7.63574-15.89844,11.49707-31.18066,11.49707Z" fill="#2f2e41"/><path d="m462,337.53481s3,127-60,124-6-43-6-43l5.5-15.5" fill="#3f3d56"/><path d="m404.16211,462.58657c-.73145,0-1.4668-.01758-2.20996-.05273-17.98828-.85645-28.15186-4.88672-30.20801-11.97852-3.7041-12.7793,20.43945-30.52148,23.41895-32.65332l5.39453-15.20117c.18457-.52148.75586-.79297,1.27637-.6084s.79297.75586.6084,1.27637l-5.5,15.5c-.06934.19629-.19824.36523-.36816.48438-.26367.18555-26.37744,18.68457-22.90869,30.64551,1.79248,6.18066,11.34131,9.72559,28.38232,10.53711,11.34863.5459,21.29688-3.27051,29.55078-11.3291,30.95215-30.21582,29.4209-110.83789,29.40137-111.64844-.0127-.55176.42383-1.00977.97656-1.02344.52246.00098,1.00977.4248,1.02344.97656.0791,3.3457,1.57227,82.29785-30.00293,113.125-8.12793,7.93555-17.82031,11.9502-28.83496,11.9502Z" fill="#2f2e41"/><path d="m363.27002,69.92484c7.17999.85999,18.41998.81995,27.72998-5.39001,9.96997-6.65002-.38-12.85004-8.44-16.26001-4.48999.73999-8.91998,2.52002-13.06,5.76001-4.28003,3.34998-6.16998,8.94-6.22998,15.89001Z" fill="#2f2e41"/><path d="m479.2984,51.94388s-17.44968-44.81639,7.54245-45.4435,44.73257,38.20994,44.73257,38.20994c0,0,62.72797,114.34248-23.21378,108.17637-85.94171-6.16615-44.87375-51.81067-44.87375-51.81067,0,0,19.60165-24.09928,15.81253-49.13211h-.00003v-.00002h0s0-.00002,0-.00002Z" fill="#2f2e41"/><path d="m575.03857,386.85064c11.06787,4.92365,22.63171,9.948,34.73578,9.46738s24.84155-8.27557,26.72772-20.24146c.97363-6.17697-.95746-12.80396,1.40759-18.59268,3.18213-7.78867,13.44672-10.79233,21.42578-8.12323s13.84076,9.55188,18.04358,16.84058c7.86328,13.63672,11.0141,31.53461,2.58307,44.82779-7.30878,11.52368-21.17084,16.73105-34.06519,21.19748-17.17535,5.94928-36.35114,11.854-52.99396,4.54617-16.7381-7.34964-25.85565-28.58435-19.65753-45.7821" fill="#3f3d56"/><path d="m538.1142,170.92143s22,11,11,23-79,46-104,41-31-20-31-24,1.88583-52.38661,9.88583-50.38661,58.11417,47.38661,114.11417,10.38661Z" fill="#6c63ff"/></svg> -->

              <!-- <p class="flex gap-2">
          Possible Logo here
        </p> -->
            </div>

            <!-- Invoice Memo Card -->

            <div
              id="invoice-memo-card"
              class="mx-auto w-full max-w-xl rounded-md border border-gray-200 bg-white shadow-lg p-8"
            >
              <!-- <header class="border-b border-gray-100 pb-4 mb-4"> -->
              <header class="mb-4">
                <div id="header-inner" class="flex justify-between">
                  <div id="header-left">
                    <h1 class="text-xl sm:text-3xl font-semibold">
                      ${{ invoice.totalOutstanding }}
                    </h1>
                    <p class="text-gray-500 pt-1">
                      Due {{ formatDate(invoice.paymentDueDate) }}
                    </p>
                  </div>

                  <div id="header-right" class="justify-end">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="200" height="80" viewBox="0 0 888 483.61099" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="m1,421.53481h887v-2H1c-.55228,0-1,.44772-1,1h0c0,.55228.44771,1,1,1Z" fill="#3f3d56"/><path d="m406,438.53481c5,24,33.5-5.5,33.5-5.5l34-4s21.5.5,35.5,11.5,23.5-3.5,23.5-3.5c15.77283,5.2576,35.09692,5.23627,51.83264,3.55252,24.11597-2.42627,43.44604-21.04041,46.76044-45.05038,18.69678-135.44147-84.09314-202.00211-84.09314-202.00211l-30-81s9.5-23.5,12.5-44.5-19-41-46-61c-11.8125-8.75-25.34766-8.12109-36.83716-4.64502-12.88892,3.89946-24.13214,11.9183-32.4397,22.51616-6.88251,8.77995-18.68735,21.21468-31.66315,23.36885-4.48999.73999-8.91998,2.52002-13.06,5.76001-4.28003,3.34998-6.16998,8.94-6.22998,15.89001-.32001,30.35999,24.75,66.90998,46.72998,72.60999,27,7,12.5,73.5,12.5,73.5-44,62-13,131-13,131l-8,56s-.5,11.5,4.5,35.5l.00006-.00003Z" fill="#3f3d56"/><path d="m553,309.53481l-11,137s15,38-36,36-21-80-21-80l16-102" fill="#3f3d56"/><path d="m509.79492,483.61099c-1.24707,0-2.52344-.02539-3.83398-.07715-11.29004-.44238-19.60352-4.60059-24.71094-12.3584-14.60254-22.18164,1.63867-65.90625,2.77832-68.89941l15.9834-101.89648c.08594-.5459.59375-.91309,1.14355-.83301.54492.08594.91797.59766.83301,1.14355l-16,102c-.01172.06934-.0293.1377-.05469.2041-.1748.45215-17.25195,45.55566-3.01172,67.18359,4.73242,7.18652,12.50977,11.04199,23.11719,11.45801,16.65234.64941,27.85254-2.90332,33.29785-10.56836,7.12402-10.02832,1.78711-23.92676,1.73242-24.06641-.05566-.1416-.07812-.29492-.06641-.44629l11-137c.04395-.5498.5166-.95117,1.07715-.91699.55078.04492.96094.52637.91699,1.07715l-10.98242,136.77539c.72656,1.96094,5.28223,15.4043-2.03906,25.72363-5.41699,7.63574-15.89844,11.49707-31.18066,11.49707Z" fill="#2f2e41"/><path d="m462,337.53481s3,127-60,124-6-43-6-43l5.5-15.5" fill="#3f3d56"/><path d="m404.16211,462.58657c-.73145,0-1.4668-.01758-2.20996-.05273-17.98828-.85645-28.15186-4.88672-30.20801-11.97852-3.7041-12.7793,20.43945-30.52148,23.41895-32.65332l5.39453-15.20117c.18457-.52148.75586-.79297,1.27637-.6084s.79297.75586.6084,1.27637l-5.5,15.5c-.06934.19629-.19824.36523-.36816.48438-.26367.18555-26.37744,18.68457-22.90869,30.64551,1.79248,6.18066,11.34131,9.72559,28.38232,10.53711,11.34863.5459,21.29688-3.27051,29.55078-11.3291,30.95215-30.21582,29.4209-110.83789,29.40137-111.64844-.0127-.55176.42383-1.00977.97656-1.02344.52246.00098,1.00977.4248,1.02344.97656.0791,3.3457,1.57227,82.29785-30.00293,113.125-8.12793,7.93555-17.82031,11.9502-28.83496,11.9502Z" fill="#2f2e41"/><path d="m363.27002,69.92484c7.17999.85999,18.41998.81995,27.72998-5.39001,9.96997-6.65002-.38-12.85004-8.44-16.26001-4.48999.73999-8.91998,2.52002-13.06,5.76001-4.28003,3.34998-6.16998,8.94-6.22998,15.89001Z" fill="#2f2e41"/><path d="m479.2984,51.94388s-17.44968-44.81639,7.54245-45.4435,44.73257,38.20994,44.73257,38.20994c0,0,62.72797,114.34248-23.21378,108.17637-85.94171-6.16615-44.87375-51.81067-44.87375-51.81067,0,0,19.60165-24.09928,15.81253-49.13211h-.00003v-.00002h0s0-.00002,0-.00002Z" fill="#2f2e41"/><path d="m575.03857,386.85064c11.06787,4.92365,22.63171,9.948,34.73578,9.46738s24.84155-8.27557,26.72772-20.24146c.97363-6.17697-.95746-12.80396,1.40759-18.59268,3.18213-7.78867,13.44672-10.79233,21.42578-8.12323s13.84076,9.55188,18.04358,16.84058c7.86328,13.63672,11.0141,31.53461,2.58307,44.82779-7.30878,11.52368-21.17084,16.73105-34.06519,21.19748-17.17535,5.94928-36.35114,11.854-52.99396,4.54617-16.7381-7.34964-25.85565-28.58435-19.65753-45.7821" fill="#3f3d56"/><path d="m538.1142,170.92143s22,11,11,23-79,46-104,41-31-20-31-24,1.88583-52.38661,9.88583-50.38661,58.11417,47.38661,114.11417,10.38661Z" fill="#6c63ff"/></svg> -->

                    <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-8" fill="none" view-box="0 0 32 32" stroke="currentColor" stroke-width="2">
              <path fill="none" stroke="#1e272b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="22.926" stroke-width="2" d="M25 10v16c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h10l6 6z" clip-rule="evenodd"/>
              <path fill="none" stroke="#1e272b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="22.926" stroke-width="2" d="M19 4v6h6M19 19.999 16 23l-3-3.001M16 23v-8" clip-rule="evenodd"/>

            </svg> -->
                  </div>
                </div>
              </header>

              <!-- <body> -->

              <div class="flex gap-8">
                <div class="">
                  <p class="text-gray-500 mb-1">To</p>
                  <p class="text-gray-500 mb-1">From</p>
                  <p
                    v-if="invoice.paymentInstructions"
                    class="text-gray-500 mb-1"
                  >
                    Memo
                  </p>
                </div>

                <div class="w-10/12">
                  <div class="border-b pb-2 mb-2">
                    <p class="font-semibold mb-1">
                      {{ invoice.clientDetails.contactName }}
                    </p>
                    <p class="mb-1">{{ invoice.billingName }}</p>
                    <p class="mb-1">{{ invoice.biller.operatingName }}</p>
                    <p class="mb-1">
                      {{ invoice.paymentTerms[0].description }}
                    </p>
                    <!-- <p class="mb-1"> {{ invoice.paymentInstructions }} </p> -->
                  </div>
                  <router-link
                    :to="{
                      name: 'detailed-invoice',
                      params: { id: this.$route.params.id },
                    }"
                  >
                    <div class="flex text-gray-500">
                      <div class="gap-2 hover:underline">
                        View detailed invoice
                      </div>
                      <div class="pt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="currentColor"
                          stroke="currentColor"
                          stroke-width="0.3"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9.163 4.516c.418.408 4.502 4.695 4.502 4.695a1.095 1.095 0 0 1 0 1.576s-4.084 4.289-4.502 4.695c-.418.408-1.17.436-1.615 0-.446-.434-.481-1.041 0-1.574L11.295 10 7.548 6.092c-.481-.533-.446-1.141 0-1.576.445-.436 1.197-.409 1.615 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
              <!-- </body> -->
            </div>
            <!-- /Invoice memo card -->

            <!-- Payment deets card -->
            <div
              v-if="paymentsEnabled"
              class="mx-auto w-full max-w-xl rounded-md border border-gray-200 bg-white shadow-lg mt-4"
            >
              <PaymentActions
                pay-now-msg="Make a payment"
                report-payment-msg="Report a Payment"
              />
            </div>
            <!-- / Payment deets card -->

            <!-- received in error -->
            <div class="mx-auto w-full max-w-xl text-center mt-2">
              <a href="" class="text-gray-300 text-xs hover:underline p-8"
                >Received this in error?</a
              >
            </div>
            <!-- /received in error -->

            <!-- /container holder -->
          </div>
        </div>
      </section>
      <!-- <HelloSlick v-if="invoice"  msg="Powered By Slick" /> -->
    </div>
  </main>
</template>
