<script lang="ts">
import TestModal from './Modal.vue'


export default {
    name: 'PaymentActions',
    components: {
        TestModal
    },
    props: {
        payNowMsg: {
            type: String,
            required: false
        },
        reportPaymentMsg: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            loading: false,
            showModal: false,
        }
    }
}

</script>


<template> 
      <div id="payment-details-inner" class="p-8"> 
        <p class="mb-4 font-semibold">Payment Options</p>
        <div id="Actions" class="flex justify-start">
            <div id="ActionsInner" class="flex gap-4 mb-4">
                <button v-if=payNowMsg @click="showModal=true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {{ payNowMsg }}
                </button>
                <button v-if=!payNowMsg @click="showModal=true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Pay Now
                </button>
                <button v-if=reportPaymentMsg @click="showModal=true" class="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
                    {{reportPaymentMsg}}
                </button>
                <button v-if=!reportPaymentMsg @click="showModal=true" class="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
                    Report a Payment
                </button>
    
                <TestModal v-if="showModal" title="Confirm Action" width="lg" v-on:close="showModal = false">
                    <p class="text-gray-800 text-base">
                         Message for payment here
                    </p>

                    <div class="text-right mt-4">
                    <button @click="showModal = false" class="px-4 py-2 text-base text-gray-600 focus:outline-none hover:underline">Cancel</button>
                    <button class="mr-2 px-4 py-2 rounded text-white text-base bg-blue-500 focus:outline-none hover:bg-blue-400">Pay</button>
                    </div>
                </TestModal>


            </div>
        </div>
        </div>
</template>