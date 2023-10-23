import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "Welcome to Vuetify 3 Beta  For help and collaboration with other Vuetify developers, please join our online Discord CommunityWhat's next?Explore componentsRoadmapFrequently Asked QuestionsImportant LinksChatMade with VuetifyTwitterArticlesEcosystemvuetify-loadergithubawesome-vuetify";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});