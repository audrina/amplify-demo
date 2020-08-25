<template>
  <amplify-authenticator>
  <div id="app">
    
        <div class="mx-auto flex mt-4">
          <button v-for="(proposal, index) in proposals" v-bind:key="proposal.id" @click="castVote(proposal.id)"
            v-bind:class="`focus:outline-none flex-1 h-max text-white text-sm sm:text-lg font-semibold py-2 px-2 mx-1 md:h-18 h-18 rounded bg-${proposalColors[index]}-600 hover:bg-${proposalColors[index]}-800`">
            {{proposal.name}}<p>{{proposal.votes}}</p>
          </button>
        </div>

    <div class="text-gray-800 md:text-lg italic font-light">Which fundraiser proposal do you like best?</div>

    <h1 class="text-gray-800 font-bold mt-8 mb-3">Live updates</h1>
    <VoteChart v-bind:chartData="chartData" width="200" height="110"></VoteChart>
  </div>
  </amplify-authenticator>
</template>

<script>
import VoteChart from "./components/VoteChart";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import * as subscriptions from "./graphql/subscriptions";
// import { AmplifyEventBus } from 'aws-amplify-vue'
// import { Auth } from 'aws-amplify'

export default {
  components: { VoteChart },
  data() {
    return {
      proposals: [],
      proposalColors: ["red", "pink", "purple", "indigo", "purple", "pink", "red"]
    };
  },
  // //---------------------------------- auth ---------------------
  //   async beforeCreate() {
  //   try {
  //     const user = await Auth.currentAuthenticatedUser()
  //     this.signedIn = true
  //   } catch (err) {
  //     this.signedIn = false
  //   }
  //   AmplifyEventBus.$on('authState', info => {
  //     if (info === 'signedIn') {
  //       this.signedIn = true
  //     } else {
  //       this.signedIn = false
  //     }
  //   });
  // },
  // //---------------------------------- auth ---------------------
  computed: {
    chartData: function() {
      return {
        labels: this.proposals.map(proposal => proposal.name),
        datasets: [{
            label: false,
            data: this.proposals.map(proposal => proposal.votes),
            backgroundColor: ["red", "pink", "purple", "indigo", "purple", "pink", "red"]
          }]};
    }
  },
  async created() {
    await API.graphql(graphqlOperation(queries.listProposals)).then(
      res => (this.proposals = res.data.listProposals.items)
    );
  },
  methods: {
    castVote(proposalId) {
      const vote = { id: proposalId };
      API.graphql(graphqlOperation(mutations.castVote, { input: vote }));
    }
  },
  mounted() {
    API.graphql(graphqlOperation(subscriptions.onCastVote)).subscribe({
      next: voteCasted => {
        const id = voteCasted.value.data.onCastVote.id;
        const votes = voteCasted.value.data.onCastVote.votes;
        const proposals = this.proposals;
        const proposal = proposals.find(proposal => proposal.id === id);
        proposal.votes = votes;
        this.proposals = proposals;
      }
    });
  }
};
</script>