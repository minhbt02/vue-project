import { shallowMount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";

describe("HomeView.vue", () => {
  it("renders empty string when passed", () => {
    const msg = ""
    const wrapper = shallowMount(HomeView, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});